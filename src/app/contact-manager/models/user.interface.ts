import { Note } from "./note.interface"

export interface User {
  id: number
  birthDate: Date
  name: string
  avatar: string
  bio: string
  notes: Note[]
}
