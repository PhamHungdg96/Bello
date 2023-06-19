let ws
const btnConnect = document.getElementById("btnConnectAndTest")
const btnDisconnect = document.getElementById("btnDisconnect")


btnConnect.onclick=(e)=>{
  ws= new WebSocket("ws://localhost:5000/ws?userID=1234")
  ws.onopen=(ev)=>{
    console.log("Connect to server", ev)
    ws.send("hello")
  }
  ws.onmessage=(ev)=>{
    console.log("data", ev.data)
  }
  
}
btnDisconnect.onclick=(e)=>{
  ws.close()
}
