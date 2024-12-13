import { Pagination, PaginationInput } from '@/models'

// todo. añadir jsdocs
export interface Favorito {
  idFavorito: number
  idUsuario: number
  idTipoAccion: number
  cDatabase: string
  cSchema: string
  cNombreObjeto: string
  dFecha: string | Date
  lVigente: boolean
}

export type FavoritoInput = Omit<Favorito, 'idFavorito' | 'dFecha' | 'lVigente'>
export type FavoritoGetInput = Pick<Favorito, 'idUsuario' | 'idTipoAccion' | 'cDatabase'>

export type FavoritoRes = Pick<Favorito, 'idFavorito' | 'cSchema' | 'cNombreObjeto' | 'dFecha'>

export interface FavoritoResponse {
  data: FavoritoRes[]
  meta: {
    pagination: Pagination
  }
}

export interface ForRetrievingFavorito {
  registrarFavorito(favorito: FavoritoInput): Promise<boolean | undefined>
  encontrarFavorito(favorito: Favorito): Promise<number | undefined>
  eliminarFavorito(id: number): Promise<boolean | undefined>
  obtenerFavoritos(favorito: FavoritoGetInput, pagination: PaginationInput): Promise<FavoritoResponse | undefined>
}
