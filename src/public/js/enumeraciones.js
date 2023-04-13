export const tiposMovimiento = {
  crearUsuario: 3,
  modificarUsuario: 4,
  borrarUsuario: 5,
  crearOficina: 6,
  modificarOficina: 7,
  borrarOficina: 8,
  crearCarta: 9,
  modificarCarta: 10,
  borrarCarta: 11,
}
export const tiposRol = {
  usuario: 1,
  responsable: 2,
  admin: 3,
}
export const estadosUsuario = {
  reserva: 0,
  activo: 1,
}
export const estadosEnvio = {
  pendiente: 0,
  enviado: 1,
}

/* arrays */
export const arrTiposRol = [
  { id: 1, des: 'USUARIO' },
  { id: 2, des: 'RESPONSABLE' },
  { id: 3, des: 'ADMINISTRADOR' },
]
export const arrEstadosUsuario = [
  { id: 0, des: 'RESERVA' },
  { id: 1, des: 'ACTIVO' },
]
export const arrEstadosEnvio = [
  { id: 0, des: 'PENDIENTE' },
  { id: 1, des: 'ENVIADO' },
]
