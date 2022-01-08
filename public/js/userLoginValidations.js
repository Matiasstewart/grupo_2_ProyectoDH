window.addEventListener('load', function(){

    let form = document.querySelector('.form')
    let email = document.querySelector('#e-mail')
    let password= document.querySelector('#password')

    email.focus();

    form.addEventListener('submit', function(e){
        let messages = [];

        let errorEmail = document.querySelector(".error-email");
        let errorPassword = document.querySelector(".error-password");

        let regexEmail = /\S+@\S+\.\S+/;

        function setError(error, message, input){
            error.innerText = message;
            messages.push(message);
            input.classList.add('is-invalid')
        }

        function setOk(error,message, input, nextInput){
            error.innerText = message;
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
            nextInput.focus();
        }

        // Input Email
        if (email.value === '' || email.value == null) {
            setError(errorEmail, 'Debes ingresar tu email', email)
        }
        email.addEventListener('blur',function(){
            if (regexEmail.test(email.value) == false){
                setError(errorEmail, 'Debes ingresar un email válido', email)
            } else{
                setOk(errorEmail,'',email, password)
            }
        }) 
        

        /* if (password.value === '') {
            messages.push('Debes ingresar una contraseña')
        } else if (password.value.length < 8 ) {
            messages.push('La contraseña debe tener mas de 8 caracteres')
        } */

        if(password.value == ""){
            setError(errorPassword,'Debes ingresar tu contraseña',password);
        }else{
            setOk(errorPassword,'',password,null)
        };
        
        if(messages.length > 0) {
            e.preventDefault();
        }else{
            form.submit();
        }
    })
});