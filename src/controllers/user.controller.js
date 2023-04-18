import axios from 'axios'
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import ejs from 'ejs'
import { puertoAPI, serverAPI, serverWEB, puertoWEB, serverAUTH, puertoAUTH } from '../config/settings'
import { tiposMovimiento } from '../public/js/enumeraciones';

const transport = nodemailer.createTransport(smtpTransport({
  host: 'posta.bizkaia.eus',
  port: 25,
  tls: {
    rejectUnauthorized: false
  }
}));


// page
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
export const logoutPage = async (req, res) => {
  const options = {
    path: "/",
    sameSite: true,
    maxAge: 1,
    httpOnly: true,
  };

  res.clearCookie("x-access_token");
  res.cookie("auth", undefined, options);
  res.cookie("verPan", undefined, options);

  res.redirect('/')
}
export const perfilPage = async (req, res) => {
  const user = req.user
  const context = {
    USERID: user.userid,
  }

  try {
    const usuario = await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuario`, {
      context,
    })
    const datos = {
      usuario: usuario.data.data,
    }

    res.render('user/perfil', { user, datos })
  } catch (error) {
    const msg = 'No se ha podido acceder a los datos de la aplicación.'

    res.render('user/error400', {
      alerts: [{ msg }],
    })
  }
}

// proc
export const sendEmail = async (req, res) => {
  const context = {
    IDCART: req.body.idcart,
  }
  const receiver = req.body.email
  const subject = "Renta 2022"

  try {
    const carta = await axios.post(`http://${serverAPI}:${puertoAPI}/api/carta`, {
      context
    })

    ejs.renderFile(__dirname + `/../public/templates/${carta.data.data.FICCAR}.ejs`, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: 'etxera@bizkaia.eus',
          to: receiver,
          subject: subject,
          html: data,
          attachments: [{
              filename: 'logoDFB.jpg',
              path: __dirname + '/../public/img/logoDFB.jpg',
              cid: 'unique@dfb'
            }]
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
        });
      }
    });
  } catch (error) {
    return console.log(error);
  }

  res.redirect('/user')
};
export const changePassword = async (req, res) => {
  const strUrl = encodeURIComponent(`${serverWEB}:${puertoWEB}`);
  const options = {
    path: "/",
    sameSite: true,
    maxAge: 1,
    httpOnly: true,
  };

  res.clearCookie("x-access_token");
  res.cookie("auth", undefined, options);
  res.cookie("noVer", undefined, options);

  res.redirect(`http://${serverAUTH}:${puertoAUTH}/log/change/?valid=${strUrl}`)
}
export const updatePerfil = async (req, res) => {
  const user = req.user
  const usuario = {
    IDUSUA: user.id,
    USERID: user.userid,
    NOMUSU: req.body.nomusu.toUpperCase(),
    EMAUSU: req.body.emausu,
    TELUSU: req.body.telusu,
  }
  const movimiento = {
    USUMOV: user.id,
    TIPMOV: tiposMovimiento.modificarPerfil,
  }

  try {
    await axios.post(`http://${serverAPI}:${puertoAPI}/api/usuarios/perfil`, {
      usuario,
      movimiento,
    })

    res.redirect('/user')
  } catch (error) {
    res.redirect('/')
  }
}

// helpers
const convertNodeToCursor = (node) => {
  return new Buffer.from(node, 'binary').toString('base64')
}
const convertCursorToNode = (cursor) => {
  return new Buffer.from(cursor, 'base64').toString('binary')
}