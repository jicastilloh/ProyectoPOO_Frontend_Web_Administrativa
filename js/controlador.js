// Creando un arreglo vacio de administradores
const administradores = [];

// Generando 4 administradores utilizando un ciclo "for"
function generarAdministradores(){

    for(let i = 0; i < 4; i++){
        let nuevoAdministrador = {
            id: i,
            usuario:  `aUser${i.toString()}`,
            clave: `aPass${i.toString()}`
        }
        administradores.push(nuevoAdministrador);
    }

    console.log(administradores);
}

// Llamando nuestra funcion
generarAdministradores();