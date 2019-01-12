const ws =require('ws').Server;
const PORT = 801;
const wss =new ws({
    port:PORT
})
class SocketServer {
    constructor(){
        this.id=1;
    }
    start(){
        console.log(`start port ${PORT}`);
        try{
            wss.on('connection',ws=>{
                ws.on('message',message => {
                    let req;
                    try {
                        req=JSON.parse(message);
                    }catch(e){
                        console.error(e);
                    }

                    ws.send(this.sendMsg(req));
                });
                ws.on('error',function(e){
                    console.error('socket error',e);
                })
            });
        }catch(e){
            console.error(e);
        }
    }

    sendMsg(req){
        return JSON.stringify(req);
    }
}
module.exports = new SocketServer();