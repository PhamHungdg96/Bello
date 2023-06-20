import { RawData } from "ws"

export type METHOD = "GET" | "UPDATE" | "DELETE" | "SYNC" | "SEE" //sync change object if updateAt change

export interface Header{
  method:METHOD
  path:string //object forcus ex:/users
  _num:number //number of packet MAX 1000
  _end:boolean // false - not end of packet and combine of payload
}

export interface Packet{
  header:Header
  payload: string | RawData
}
export interface PacketEx extends Packet{
  tmp:string
}