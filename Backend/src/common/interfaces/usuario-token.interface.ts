/** Datos que viajan dentro del JWT y quedan disponibles en `request.usuario`. */
export interface UsuarioToken {
    tipoDocumento: string;
    numeroDocumento: string;
    rol: string;
}
