import {RawData, WebSocket, OPEN} from 'ws'
import {Server} from "http"
import Logger from './utils/logger';
import {IncomingMessage} from "http"
import { WSMiddleware } from './middlewares/ws.middleware';

const log =  Logger("WS")
const webSocketServer = new WebSocket.Server({
  noServer: true,
  path: "/ws",
  perMessageDeflate: true,
  maxPayload: Number(process.env.WS_MAX_PAYLOAD) || 2*1024*1024  //2Mb
});

webSocketServer.on(
  "connection",
  function connection(ws, connectionRequest:IncomingMessage) {
    ws.on("message", async (msg:RawData) => {
      //handle message middleware (message (post, get, delete) data, notify)
      await WSMiddleware.handlePacket(ws, msg, connectionRequest)
    });
    ws.on("error",(err:any) => {
      if(err.code){
        handleErrorProtocol(err)
      }
    })
    ws.on("close",()=>{
      log.info("Websocket close")
    })
  }
);
function handleErrorProtocol(err:any){
  switch(err.code){
    case "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH":
      log.error('Kích thước tải trọng vượt quá giới hạn được hỗ trợ'); 
      break;
    case "WS_ERR_EXPECTED_FIN":
      log.error('A WebSocket frame was received with the FIN bit not set when it was expected'); 
      break;
    case "WS_ERR_EXPECTED_MASK":
      log.error('An unmasked WebSocket frame was received by a WebSocket server'); 
      break;
    case "WS_ERR_INVALID_CLOSE_CODE":
      log.error('A WebSocket close frame was received with an invalid close code'); 
      break;
    case "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH":
      log.error('A control frame with an invalid payload length was received'); 
      break;
    case "WS_ERR_INVALID_OPCODE":
      log.error('A WebSocket frame was received with an invalid opcode'); 
      break;
    case "WS_ERR_INVALID_UTF8":
      log.error('A text or close frame was received containing invalid UTF-8 data'); 
      break;
    case "WS_ERR_UNEXPECTED_MASK":
      log.error('A masked WebSocket frame was received by a WebSocket client'); 
      break;
    case "WS_ERR_UNEXPECTED_RSV_1":
      log.error('A WebSocket frame was received with the RSV1 bit set unexpectedly'); 
      break;
    case "WS_ERR_UNEXPECTED_RSV_2_3":
      log.error('A WebSocket frame was received with the RSV2 or RSV3 bit set unexpectedly'); 
      break;
    case "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH":
      log.error('A data frame was received with a length longer than the max supported length (2^53 - 1, due to JavaScript language limitations)'); 
      break;
  }
}
function broadcast(msg:RawData){
  for (const client of webSocketServer.clients) {
    if (client.readyState === OPEN) {
        client.send(msg)
    }
  }
}
//server event
webSocketServer.on("error",(err)=>{
  if(err.stack) log.error("Websocket start error:", err.stack)
  log.error("Websocket start error:", err.message)
})
webSocketServer.on("close",()=>{
  log.error("Websocket closed")
})
webSocketServer.on("listening",()=>{
  log.error("Websocket start listening")
})
export default async (server:Server)=>{
  server.on("upgrade", (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, (websocket) => {
      webSocketServer.emit("connection", websocket, request);
    });
  });
}