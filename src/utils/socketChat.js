
const socketChat = (io) => {
    let messages = []
    io.on('connection', socket => {
      console.log('Nuevo cliente conectado')
         //console.log(socket.id);
         //recibimos el mensaje  
      socket.on('message',data => {
       //console.log(data)
        messages.push(data)
       //se lo enviamos a todos
       io.emit('messageLogs' , messages)
     }) 
 
     socket.on ('authenticated',data =>{
         socket.broadcast.emit('newUserConnected', data)
     })
   })
 }

 
export default socketChat