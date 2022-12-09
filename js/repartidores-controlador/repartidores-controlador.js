let verInfo = false;
let prueba = false;
(() => {

    const http = new XMLHttpRequest();
    const url = `http://127.0.0.1:3000/repartidors`;

    http.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            let respuestaRep = JSON.parse(this.responseText); 
            let verRepartidores = document.getElementById('mostrar-repartidores');

            verRepartidores.innerHTML = '';

            for(let i = 0; i < respuestaRep.length; i++){

                
                
                verRepartidores.innerHTML += `
                <tr class="table-secondary tamanio-texto">
                    <td>${i+1}</td>
                    <td>${respuestaRep[i]._id}</td>
                    <td>${respuestaRep[i].nombre}</td>
            
                    <td><button onclick="eliminandoRep('${respuestaRep[i]._id}')" style="color: white;" type="button" class="btn estilos-eliminar">X</button></td>

                    <td><button data-bs-toggle="modal" data-bs-target="#repartidoresModal" onclick="mostrandoInfo('${respuestaRep[i]._id}')" id="verInformacion" style="color: white;" type="button" class="btn estilos-info">Ver</button></td>
                </tr>
                `
            }


        }

    }

    http.open('GET', url);
    http.send();

})()


function mostrandoInfo(id){

    const http = new XMLHttpRequest();
    const url = `http://127.0.0.1:3000/repartidors/${id}`;

    http.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            let infoRepartidores = JSON.parse(this.responseText); 

            let datosRepartidor = document.getElementById('datos-repartidor');
            datosRepartidor.innerHTML = '';

            datosRepartidor.innerHTML += `
            <h4>ID: ${infoRepartidores._id}</h4>
            <h4>Nombre: ${infoRepartidores.nombre}</h4>
            <h4>Usuario: ${infoRepartidores.nameUser}</h4>
            <h4>Contraseña: ${infoRepartidores.pass}</h4>
            `


        }

    }

    http.open('GET', url);
    http.send();

}

function eliminandoRep(id){

    console.log(`Eliminando repartidor con el id: ${id}`)
    const http = new XMLHttpRequest();
    const url = `http://127.0.0.1:3000/repartidors/${id}`

    http.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            alert(`Se eliminó el repartidor con el id: ${id}`);

            console.log(JSON.parse(this.responseText));

        }

    }

    http.open('DELETE', url);
    http.send();

}


let guardarMotorista = document.getElementById('enviar-datos');
guardarMotorista.addEventListener('click', function(){
    
    
    const http = new XMLHttpRequest();
    const url = `http://127.0.0.1:3000/repartidors/`;
    
    let data = `nombre=${document.getElementById('nombreRep').value}&nameUser=${document.getElementById('userRep').value}&pass=${document.getElementById('passRep').value}`;
    
    http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            alert('Repartidor agregado correctamente');
        }
    }
    
    http.open('POST', url);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    http.send(data);
    
})
