console.log('Socket')
const socket = io()
let user
let chatbox =document.querySelector('#chatbox')


/*   funcionamiento del chat
socket.emit('message', 'Hola me estoy comunicando desde un cliente socket')

socket.on('evento-para-socket-individual', data => {
    console.log(data)
})

socket.on('evt-p-todo-menos-el-socket-actual', data => {
    console.log(data)
})

socket.on('evt-para-todos', data => {
    console.log(data)
})

const input = document.getElementById('text')
const log = document.getElementById('mensajes')

input.addEventListener('keyup', evt =>{
    if(evt.key ==="Enter"){
        socket.emit('message2',input.value)
        input.value=""
    }
})

socket.on('log',data =>{
    let logs =''
    data.logs.forEach(log => {  
      logs +=`<li>"${log.socket} dice: ${log.message}</li>`
        
    })

    log.innerHTML=logs
})

*/

//confirmamos y verificamos que se ingrese el nombre de usuario
Swal.fire({
    title:'Identificate',
    input:'text',
    text:'Ingresar el nombre de usuario',
    inputValidator:(value)=>{
        return !value && "El nombre de usuario es obligatorio"
    },
    allowOutsideClick:false
}).then(result =>{
    user = result.value
    socket.emit('authenticated', user)
})

// escuchando el evento en nuestro input y mandamos y emitimos ese mensaje
chatbox.addEventListener('keyup', evt =>{
    if(evt.key =='Enter') {
        if(chatbox.value.trim().length>0){
            socket.emit('message',{
                user, message:chatbox.value
                
            })
            chatbox.value=''
        }
    }
})
//escuchamos el mensaje
socket.on('messageLogs',data => {
   // console.log(data);
   let log = document.getElementById('messageLogs')
   let mensajes =''
   data.forEach(({user, message}) => {
    mensajes += `<li>${user} dice: ${message}</li>`
    
   })
   log.innerHTML = mensajes
})

socket.on('newUserConnected', user =>{
    if(!user){
        return
    }
    Swal.fire({
        toast:true,
        position: 'top-right',
        showConfirmButton: false,
        timer:10000,
        title:`${user} se unio al chat`,
        icon:'success'
    })
})