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
  crearPerfil: 12,
  modificarPerfil: 13,
  borrarPerfil: 14,  
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
export const idioma = {
  castellano: 1,
  euskera: 2,
}
export const estadosEnvio = {
  pendiente: 0,
  enviado: 1,
}
export const tiposPerfil = {
  general: 1,
  informador: 3,
  liquidador: 8,
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
export const arrIdioma = [
  { id: 1, des: 'CASTELLANO' },
  { id: 2, des: 'EUSKERA' },
]
export const arrEstadosEnvio = [
  { id: 0, des: 'PENDIENTE' },
  { id: 1, des: 'ENVIADO' },
]
export const arrTiposPerfil = [
  { id: 1, des: 'GENERAL' },
  { id: 3, des: 'INFORMADOR' },
  { id: 8, des: 'LIQUIDADOR' },
]