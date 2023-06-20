import {RawData, WebSocket, OPEN} from 'ws'
import {IncomingMessage} from "http"
import Logger from '../utils/logger'
const log= Logger('WSMiddleware')
const MAX_SIZE = 2*1024*1024

const handlePacket =  (ws:WebSocket, msg:RawData ,connectionRequest:IncomingMessage)=>{
  try{
    const data = JSON.parse(Buffer.from(msg as ArrayBuffer).toString())
    
  }catch(e){
    ws.emit(e.stack)
  }
}

export const WSMiddleware={handlePacket}