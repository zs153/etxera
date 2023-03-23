import { puertoAUTH, serverAUTH, puertoWEB, serverWEB } from "../config/settings";

export const mainPage = async (req, res) => {
  const strUrl = encodeURIComponent(`${serverWEB}:${puertoWEB}`);

  res.redirect(`http://${serverAUTH}:${puertoAUTH}/log/login/?valid=${strUrl}`)
};

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
};