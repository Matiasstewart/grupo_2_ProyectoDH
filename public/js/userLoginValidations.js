window.addEventListener('load', function(){

    let form = document.querySelector('.form')
    let email = document.querySelector('.email')
    let password= document.querySelector('.psw')
    let showErrors = document.querySelector('ul.errores')

    

    let regexEmail = /\S+@\S+\.\S+/;

    form.addEventListener('submit', function(e){
        let messages = [];
        showErrors.innerHTML = '';

        if (email.value === '' || email.value == null) {
            messages.push('Debes ingresar un email')
        } else if (regexEmail.test(email.value) == false){
            messages.push('Debes ingresar un mail valido')
        }

       /*  if (password.value === '') {
            messages.push('Debes ingresar una contraseña')
        } else if (password.value.length < 8 ) {
            messages.push('La contraseña debe tener mas de 8 caracteres')
        } */


        
        if(messages.length > 0) {
            e.preventDefault();
            for(let i = 0; i < messages.length; i++){
                showErrors.innerHTML += "<li>" + messages[i] + "</li>"
            }
        }
        console.log(messages)
    })
    
});