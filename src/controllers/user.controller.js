import axios from 'axios'
import nodemailer from 'nodemailer';
import ejs from 'ejs'
import { puertoAPI, serverAPI } from '../config/settings'

const transport = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: '587',
  auth: {
    user: 'jess.casper@ethereal.email',
    pass: '7d1KED3TGxuB9bhn2P'
  }
});

export const mainPage = async (req, res) => {
  const user = req.user

  const dir = req.query.dir ? req.query.dir : 'next'
  const limit = req.query.limit ? req.query.limit : 10
  const part = req.query.part ? req.query.part.toUpperCase() : ''

  let hasPrevCartas = false
  let cursor = req.query.cursor ? JSON.parse(req.query.cursor) : null
  let context = {}

  if (cursor) {
    hasPrevCartas = true
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: JSON.parse(convertCursorToNode(JSON.stringify(cursor))),
      part,
    }
  } else {
    context = {
      limit: limit + 1,
      direction: dir,
      cursor: {
        next: 0,
        prev: 0,
      },
      part,
    }
  }

  try {
    const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cartas`, {
      context,
    })

    let cartas = result.data.data
    let hasNextCartas = cartas.length === limit +1
    let nextCursor = 0
    let prevCursor = 0
    
    if (hasNextCartas) {
      const nextCursorCarta = dir === 'next' ? cartas[limit - 1] : cartas[0]
      const prevCursorCarta = dir === 'next' ? cartas[0] : cartas[limit - 1]
      nextCursor = nextCursorCarta.IDCART
      prevCursor = prevCursorCarta.IDCART

      cartas.pop()
    } else {
      if (dir === 'prev') {
        context = {
          limit: limit + 1,
          direction: 'next',
          cursor: {
            next: 0,
            prev: 0
          },
          part,
        }
        
        const result = await axios.post(`http://${serverAPI}:${puertoAPI}/api/cartas`, {
          context,
        })
        
        cartas = result.data.data
        hasNextCartas = cartas.length === limit + 1
        
        if (hasNextCartas) {
          const nextCursorCarta = cartas[limit - 1]
          const prevCursorCarta = cartas[0]
          nextCursor = nextCursorCarta.IDCART
          prevCursor = prevCursorCarta.IDCART
          
          cartas.pop()
        }
        
        hasPrevCartas = false
      } else {
        if (cursor) {
          const prevCursorCarta = cartas[0]
          prevCursor = prevCursorCarta.IDCART
          hasPrevCartas = true
        } else {
          hasPrevCartas = false
        }
        
        hasNextCartas = false
      }
    }
    
    cursor = {
      next: nextCursor,
      prev: prevCursor,
    }
    const datos = {
      user,
      limit,
      cartas,
      hasPrevCartas,
      hasNextCartas,
      cursor: convertNodeToCursor(JSON.stringify(cursor)),
    }


    res.render('user/', { user, datos })
  } catch (error) {
    if (error.response?.status === 400) {
      res.render("user/error400", {
        alerts: [{ msg: error.response.data.msg }],
      });
    } else {
      res.render("user/error500", {
        alerts: [{ msg: error }],
      });
    }
  }
}

export const sendEmail = async (req, res) => {
  const receiver = req.body.email
  const subject = "Renta 2022 Asesoria El Pino"
  const url = `https://www.bizkaia.eus/es/renta2022`

  console.log('receiver...', receiver);
  ejs.renderFile(__dirname + '/../public/templates/welcome.ejs', { url }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var mailOptions = {
        from: 'noreply@bizkaia.eus',
        to: receiver,
        subject: subject,
        html: data
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
    }
  });

  //mainPage()
};

// helpers
const hash = async (password) => {
  return new Promise((resolve, reject) => {
    scrypt(password, secreto, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('base64'))
    });
  })
}
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}