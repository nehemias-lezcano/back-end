const socket = io()
let formulario = document.querySelector('#formProduct')

formulario.addEventListener('submit', evt =>{
  evt.preventDefault()
  let title = formulario.elements.title.value
        console.log(title)
        if(title !== ''){
        socket.emit('addProduct',{
            title
         })
            formulario.reset()
        }
    
})

socket.on('productos', data => {
    console.log(data)

    let div = document.getElementById("listProducts")
    let productos =''
    data.forEach((product) => {
    productos += `<div>${product.title} precio ${product.price}</div>`
    
   })
  div.innerHTML = productos
})
