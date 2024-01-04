const htpp = require ('http')    // importa la libreria http, nativa de node

const server = htpp.createServer/* metodo al cual se le pasa una callback*/((peticion, respuesta)=>{
    respuesta.end('Hola Coder, funciona mejor que la app')//respuesta del server
})

server.listen(8000,()=>{  // se queda escuchando un puerto determinado 

console.log('Escuchando el puerto 8000')
})