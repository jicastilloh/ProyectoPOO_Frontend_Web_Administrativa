let eliminarAlmuerzo = false;
let actualizarAlm = false;

let almuerzos = document.getElementById('almuerzos');
almuerzos.addEventListener('click', mostrarAlmuerzos);

function mostrarAlmuerzos(){
    
    const http = new XMLHttpRequest();
    const url = `http://127.0.0.1:3000/almuerzos`;
    
    http.onreadystatechange = function(){
    
        if(this.readyState == 4 && this.status == 200){
            
            let respuestaAlmuerzos = JSON.parse(this.responseText);
            

            let verAlmuerzos = document.getElementById('contenido-almuerzos');
            verAlmuerzos.innerHTML = '';
            
            for(let i = 0; i < respuestaAlmuerzos.length; i++){
                
                verAlmuerzos.innerHTML += `
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="input-group mb-2">
                                <span class="input-group-text">Nombre</span>
                                <input id="nameAlm" type="text" class="form-control" value="${respuestaAlmuerzos[i].nombre}">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-group mb-2">
                                <span class="input-group-text">Precio</span>
                                <input id="priceAlm" type="number" class="form-control" value="${respuestaAlmuerzos[i].precio}">
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-around">
                        <button onclick="actAlm('${respuestaAlmuerzos[i]._id}')" class="btn btn-warning">Actualizar</button>
                        <button onclick="eliminarAlm('${respuestaAlmuerzos[i]._id}')" class="btn btn-danger">Eliminar</button>
                    </div>
                </div>
                <hr>
                ` 

            }

            
            
        }
    
    }

    http.open('GET', url);
    http.send()
}

eliminarAlmuerzo = true;
if(eliminarAlmuerzo){

    function eliminarAlm(id){
        const http = new XMLHttpRequest();
        const url = `http://127.0.0.1:3000/almuerzos/${id}`;

        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                
                alert(`Se eliminó el almuerzo con el id: ${id}`);
                console.log(`Se eliminó el almuerzo con el id: ${id}`)
                
            }
        }
        
        http.open('DELETE', url);
        http.send();
    
    }


}

actualizarAlm = true;
if(actualizarAlm){

    function actAlm(id){
        console.log(`Actualizando: ${id}`)
        const http = new XMLHttpRequest();
        const url = `http://127.0.0.1:3000/almuerzos/${id}`;
    
        let data = `nombre=${document.getElementById('nameAlm').value}&precio=${document.getElementById('priceAlm').value}`;

        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log(JSON.parse(this.responseText));
                alert('Almuerzo actualizado correctamente');
            }
        }
        
        http.open('PUT', url);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        http.send(data);
    }

}

let addAlmuerzo = false;
let mostrarFormAlmuerzo = document.getElementById('contenido-agregando-almuerzos');
mostrarFormAlmuerzo.innerHTML = '';
mostrarFormAlmuerzo.innerHTML += `
<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="input-group mb-2">
                <span class="input-group-text">Nombre</span>
                <input id="nombreAlmuerzo" type="text" class="form-control">
            </div>
        </div>
        <div class="col-12">
            <div class="input-group mb-2">
                <span class="input-group-text">Precio</span>
                <input id="precioAlmuerzo" type="number" class="form-control">
            </div>
        </div>
    </div>
    <div class="row justify-content-around">
        <button id="enviar-datos-almuerzo" class="btn btn-primary">Agregar</button>
    </div>
</div>
`

addAlmuerzo = true;
if(addAlmuerzo){

    let agregandoAlmuerzo = document.getElementById('enviar-datos-almuerzo');
    agregandoAlmuerzo.addEventListener('click', agregarAlmuerzo);
    
    function agregarAlmuerzo(){

        const http = new XMLHttpRequest();
        const url = `http://127.0.0.1:3000/almuerzos/`;
    
        let data = `nombre=${document.getElementById('nombreAlmuerzo').value}&precio=${document.getElementById('precioAlmuerzo').value}`;

        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                alert('Almuerzo agregado correctamente');
            }
        }
        
        http.open('POST', url);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        http.send(data);
    
    }

}