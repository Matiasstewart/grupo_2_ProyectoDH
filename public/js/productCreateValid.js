window.addEventListener('load', function(){
    let formulario = document.querySelector(".new-product-form");
    let nombre = document.querySelector("#name");
    let descripcion = document.querySelector("#description");
    let imagen = document.querySelector("#image");

    nombre.focus();

    formulario.addEventListener("submit",function(e){
        let errors = [];
        
        let errorName = document.querySelector(".error-name");
        let errorDescription = document.querySelector(".error-description");
        let errorImage = document.querySelector(".error-image");


        if(nombre.value == ""){
            errorName.innerText = 'Debes escribir el nombre del producto';
            errors.push("Este campo no debe estar vacío");
            nombre.classList.add("is-invalid");
        }
        nombre.addEventListener('blur',function(){
            if(nombre.value.length < 5){
                errorName.innerText = 'El nombre del producto debe tener mas de 5 caracteres';
                errors.push('El nombre del producto debe tener mas de 5 caracteres');
                nombre.classList.add("is-invalid");
            }else{
                errorName.innerText = '';
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
                descripcion.focus();
            };
        })
        


        if(descripcion.value == ""){
            errorDescription.innerText = 'Debes escribir una descripción';
            errors.push("Este campo no debe estar vacío");
            descripcion.classList.add("is-invalid");
        }
        descripcion.addEventListener('blur',function(){
            if(descripcion.value.length < 20){
                errorDescription.innerText = 'La descripción debe tener mas de 20 caracteres';
                errors.push('La descripción debe tener mas de 20 caracteres');
                descripcion.classList.add("is-invalid");
            }else{
                errorDescription.innerText = '';
                descripcion.classList.add('is-valid');
                descripcion.classList.remove('is-invalid');
                imagen.focus();
            };
        })
        

        if(imagen.value.length == 0){
            errorImage.innerText = 'Debes subir una imagen';
            errors.push("Este campo no debe estar vacío");
            imagen.classList.add("is-invalid");
        }else{
            errorImage.innerText = '';
            imagen.classList.add('is-valid');
            imagen.classList.remove('is-invalid');
        };


        if(errors.length > 0){
            e.preventDefault();
            console.log("errores: " + errors);
        } else {
            formulario.submit();
        }
    })
})


