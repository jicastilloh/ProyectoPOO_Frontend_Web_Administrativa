// // Creando un arreglo vacio de administradores
// const administradores = [];

// // Generando 4 administradores utilizando un ciclo "for"
// function generarAdministradores(){

//     for(let i = 0; i < 4; i++){
//         let nuevoAdministrador = {
//             id: i,
//             usuario:  `aUser${i.toString()}`,
//             clave: `aPass${i.toString()}`
//         }
//         administradores.push(nuevoAdministrador);
//     }

//     console.log(administradores);
// }

// // Llamando nuestra funcion
// generarAdministradores();

document.getElementById('aEnviar').addEventListener('click', function(e){

    const http = new XMLHttpRequest();
    const url = `http://127.0.0.1:3000/administradors`;
    
    http.onreadystatechange = function(){
    
        if(this.readyState == 4 && this.status == 200){
            // Creando variable para determinar si debemos redireccionar al usuario a la sig. página
            let resultado;

            // Guardando las respuesta en una variable
            let respuestaAdmins = (JSON.parse(this.responseText));
            
            // Guardando los datos que nos provee el usuario desde el frontend
            let obtenerUsuario = document.querySelector("#aUsuario").value;
            let obtenerClave = document.querySelector("#aClave").value;

            // Variables para validar que los usuarios existen
            let valorDeUsuario;
            let valorDeClave;

            // Recorriendo el arreglo de los usuarios en la base de datos para saber si está registrado
            for(let i = 0; i < respuestaAdmins.length; i++){
                valorDeUsuario = respuestaAdmins[i].nameUser;
                valorDeClave = respuestaAdmins[i].pass;
                
                if(valorDeUsuario == obtenerUsuario && valorDeClave == obtenerClave){
                    console.log("Correcto");

                    // Limpiando el error del html 
                    let mostrarError = document.getElementById('error-show');
                    mostrarError.innerHTML = '';

                    // Enviando al usuario a la página de inicio
                    window.location.href = '../paginas/inicio.html'
                    resultado = true;
                    break;
                }else{
                    resultado = false
                    if(!resultado){
                        // Agrendo un error en el html en caso de que no exista el ususario
                        let mostrarError = document.getElementById('error-show');
                        mostrarError.innerHTML = '';
                        mostrarError.innerHTML += `
                        <p>
                            Usuario no existe
                        </p>`;
                    }
                }
            }

        }
    
    }

    http.open('GET', url);
    http.send()

});
