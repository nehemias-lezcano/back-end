console.log('estamos aca')
 const form = document.querySelector('#cookieForm')

 form.addEventListener('submit',(e)=> {
    e.preventDefault()

    const data = newFormData(form)

    const obj ={}
    data.forEach((value,key)=> obj[key] = value)

    fetch('pruebas/getcookieuser', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
    })
    .then(respuesta => respuesta.json())
    .then(respuesta => console.log(respuesta))
 })

 const getCookie = ()=>{
    console.log(document.cookie)
 }