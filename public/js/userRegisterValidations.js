
window.addEventListener('load', function(){

    let form = document.querySelector('#form');
    let name = document.querySelector('#name');
    let lastname = document.querySelector('#lastname');
    let email = document.querySelector('#email');
    let image = document.querySelector('#image');
    let password = document.querySelector('#psw');
    let showErrors = document.querySelector('ul.errores')

    let regexName = /^[A-Z]+$/i
    let regexEmail = /\S+@\S+\.\S+/;
    let regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,}$/;

    form.addEventListener('submit', function(e){
        let messages = [];
        showErrors.innerHTML = '';
        
        

       /*  name.addEventListener('blur', function (){
            
        }) */

        if (name.value === '' || name.value == null) {
            messages.push('Debes ingresar un nombre')
        } else if (name.value.length < 2) {
            messages.push('El nombre debe tener mas de 2 letras')
        } else if (regexName.test(name.value) == false){
            messages.push('El nombre debe contener solo letras')
        }
       

        if (lastname.value === '' || lastname.value == null){
            messages.push('Debes ingresar un apellido')
        } else if (lastname.value.length < 2) {
            messages.push('El apellido debe tener mas de 2 letras')
        } else if (regexName.test(lastname.value) == false){
            messages.push('El apellido debe contener solo letras')
        }

        if (email.value === '' || email.value == null) {
            messages.push('Debes ingresar un email')
        } else if (regexEmail.test(email.value) == false){
            messages.push('Debes ingresar un mail valido')
        }

        if (password.value === '' || password.value == null) {
            messages.push('Debes ingresar una contraseña')
        } else if (password.value.length < 8 ) {
            messages.push('La contraseña debe tener mas de 8 caracteres')
        }

       /*  if (image.files.name.match(/.(jpg|jpeg|png|gif)$/i)) {
            messages.push('La imagen deberá ser de formato JPG, JPEG, PNG o GIF')
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