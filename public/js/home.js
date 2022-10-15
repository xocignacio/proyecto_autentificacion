const btn = document.getElementById('logoutbtn')

btn.addEventListener('click',evt=>{
    fetch('/api/sessions/logout').then(result=>result.json()).then(json=>console.log(json));
})

alert(' ✨ Logeado con exito, Bienvenido 🎉')
console.log ('Logeado con exito')
