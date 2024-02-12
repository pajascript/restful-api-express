export interface IBook {
  title: string
  author: string
  genre: string
  read: boolean
}

export interface IBookQuery {
  genre?: string
}
