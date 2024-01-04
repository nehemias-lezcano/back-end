function listNumber(...numbers) {
    const types = numbers.map(nro => typeof nro)
    console.log(types)
    if (types.includes('string') || types.includes('boolean')){
   console.error(`parametro invalido:${types}`)
   process.exitCode = -4
}else{
    console.log(numbers);
}
process.on('exit', code =>{
     if(code === -4){
        console.log('Proceso finalizado por un argumento valido');
     }
})

}

listNumber(1,2,3,4,'cinco')
//listNumbers(1,2,3,4)