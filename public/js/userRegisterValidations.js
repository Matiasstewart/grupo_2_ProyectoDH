
window.addEventListener('load', function(){

    let form = document.querySelector('#form');
    let name = document.querySelector('#name');
    let lastname = document.querySelector('#lastname');
    let email = document.querySelector('#email');
    let image = document.querySelector('#avatar');
    let category = this.document.querySelector('#category')
    let password = document.querySelector('#psw');

    let numberAdmin = document.querySelector('.admin-code');

    let regexName = /^[A-Z]+$/i
    let regexEmail = /\S+@\S+\.\S+/;
    let regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,}$/;

    name.focus();

    let errorName = document.querySelector(".error-name");
    let errorLastname = document.querySelector(".error-lastname");
    let errorEmail = document.querySelector(".error-email");
    let errorImage = document.querySelector(".error-image");
    let errorCategory = document.querySelector(".error-category");
    let errorPassword = document.querySelector(".error-password");
    let errorRequired = document.querySelector('.p-register');

    category.addEventListener('change',function(){
        if(category.options[1].selected){
            numberAdmin.innerHTML = '<label for="title-label admin-label">Código de administrador</label>';
            numberAdmin.innerHTML += '<input type="number" name="number" class="text-register-form" id="number">'
            let numberInput = document.querySelector('#number');
            numberInput.focus();
        }else{
            numberAdmin.innerHTML = '';
            category.classList.add('is-valid');
            category.classList.remove('is-invalid');
            password.focus();
        }
    })

    form.addEventListener('submit', function(e){
        let messages = [];

        

        function setError(error,input,message){
            error.innerText = message;
            input.classList.add('is-invalid')
        }

        function setOk(error,input,message,nextImput){
            error.innerText = message;
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
            nextImput.focus();
        }

        //  Image validation
        function fileValidation(imageValue) {
   
            // Allowing file type
            var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
       
            if (!allowedExtensions.exec(imageValue)){
                return false;
            }
            return true
        }

       /*  name.addEventListener('blur', function (){
            
        }) */

        // Input Name
        if (name.value === '' || name.value == null) {
            messages.push('Debes ingresar un nombre');
            setError(errorName,name,'Debes ingresar un nombre')
        }
        name.addEventListener('blur',function(){
            if (name.value.length < 2) {
                messages.push('El nombre debe tener mas de 2 letras')
                setError(errorName,name,'El nombre debe tener mas de 2 letras')
            } else if (regexName.test(name.value) == false){
                messages.push('El nombre debe contener solo letras')
                setError(errorName,name,'El nombre debe tener sólo letras')
            } else{
                setOk(errorName,name,'',lastname)
            }
        }) 
        
       
        // Input Lastname
        if (lastname.value === '' || lastname.value == null){
            messages.push('Debes ingresar un apellido');
            setError(errorLastname,lastname,'Debes ingresar un apellido')
        }
        lastname.addEventListener('blur',function(){
            if (lastname.value.length < 2) {
                messages.push('El apellido debe tener mas de 2 letras');
                setError(errorLastname,lastname,'El apellido debe tener mas de 2 letras')
            } else if (regexName.test(lastname.value) == false){
                messages.push('El apellido debe contener solo letras')
                setError(errorLastname,lastname,'El apellido debe contener sólo letras')
            }else{
                setOk(errorLastname,lastname,'',email)
            }
        })
        
        
        // Input Email
        if (email.value === '' || email.value == null) {
            messages.push('Debes ingresar un email');
            setError(errorEmail,email,'Debes ingresar un email')
        } 
        email.addEventListener('blur',function(){
            if (regexEmail.test(email.value) == false){
                messages.push('Debes ingresar un mail valido');
                setError(errorEmail,email,'Debes ingresar un mail válido')
            } else{
                setOk(errorEmail,email,'',image)
            }
        })
        
        

        // Input Image
        if(image.value.length == 0){
            messages.push("Este campo no debe estar vacío");
            setError(errorImage,image,'Debes subir una foto');
        }
        image.addEventListener('blur',function(){
            if(!fileValidation(image.value)){
                messages.push('El archivo no es válido');
                setError(errorImage,image,'El archivo no es válido');
            }else if(fileValidation(image.value)){
                setOk(errorImage,image,'',category)
            };
        })
        

        // Input Category
        if(category.value.length == 0){
            messages.push("Selecciona una opción");
            setError(errorCategory,category,'Este campo debe estar completo');
        }
        category.addEventListener('change',function(){
            if(category.options[1].selected){
                errorCategory.innerText = '';
                numberAdmin.innerHTML = '<label for="title-label admin-label">Código de administrador</label>'
                numberAdmin.innerHTML += '<input type="number" name="number" class="text-register-form">'
            }else{
                numberAdmin.innerHTML = '';
                setOk(errorCategory,category,'',password);
            };
        })

        // Input Password
        if (password.value === '' || password.value == null) {
            messages.push('Debes ingresar una contraseña')
            setError(errorPassword,password,'Debes ingresar una contraseña')
        } else if (password.value.length < 8 ) {
            messages.push('La contraseña debe tener mas de 8 caracteres')
            setError(errorPassword,password,'La contraseña debe tener mas de 8 caracteres')
        } else if(regexPass.test(password.value) == false){
            messages.push('El nombre debe contener al menos una letra mayúscula y un número')
            setError(errorPassword,password,'La contraseña debe contener al menos una letra mayúscula y un número')
        }
        else {
            setOk(errorPassword,password,'',null)
        }

      /*   if ((/.(jpg|jpeg|png|gif)$/i).test(image.value) && image.value != '') {
            messages.push('La imagen deberá ser de formato JPG, JPEG, PNG o GIF')
        } */

        if(messages.length > 0) {
            e.preventDefault();
            errorRequired.innerText = 'Campos requeridos'
            console.log('errores: ' + messages)
        }else{
            form.submit();
        }

        
    })
});