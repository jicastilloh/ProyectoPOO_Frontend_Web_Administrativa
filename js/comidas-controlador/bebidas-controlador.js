let eliminarBeb = false;
let actualizarBeb = false;

let bebidas = document.getElementById('bebidas');
bebidas.addEventListener('click', mostrarBebidas);

function mostrarBebidas(){
    
    const http = new XMLHttpRequest();
    const url = `http://127.0.0.1:3000/bebidas`;
    
    http.onreadystatechange = function(){
    
        if(this.readyState == 4 && this.status == 200){
            
            let respuestaBebidas = JSON.parse(this.responseText);
            

            let verBebidas = document.getElementById('contenido-bebidas');
            verBebidas.innerHTML = '';
            
            for(let i = 0; i < respuestaBebidas.length; i++){
                
                verBebidas.innerHTML += `
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="input-group mb-2">
                                <span class="input-group-text">Nombre</span>
                                <input id="nameBebida" type="text" class="form-control" value="${respuestaBebidas[i].nombre}">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-group mb-2">
                                <span class="input-group-text">Precio</span>
                                <input id="priceBebida" type="number" class="form-control" value="${respuestaBebidas[i].precio}">
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-around">
                        <button onclick="actualizarBebida('${respuestaBebidas[i]._id}')" class="btn btn-warning">Actualizar</button>
                        <button onclick="eliminarBebida('${respuestaBebidas[i]._id}')" class="btn btn-danger">Eliminar</button>
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

eliminarBeb = true;
if(eliminarBeb){

    function eliminarBebida(id){
        const http = new XMLHttpRequest();
        const url = `http://127.0.0.1:3000/bebidas/${id}`;

        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                
                alert(`Se eliminó la bebida con el id: ${id}`);
                console.log(`Se eliminó la bebida con el id: ${id}`)
                
            }
        }
        
        http.open('DELETE', url);
        http.send();
    
    }


}

actualizarBeb = true;
if(actualizarBeb){

    function actualizarBebida(id){
        console.log(`Actualizando: ${id}`)
        const http = new XMLHttpRequest();
        const url = `http://127.0.0.1:3000/bebidas/${id}`;
    
        let data = `nombre=${document.getElementById('nameBebida').value}&precio=${document.getElementById('priceBebida').value}`;

        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log(JSON.parse(this.responseText));
                alert('Bebida actualizada correctamente');
            }
        }
        
        http.open('PUT', url);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        http.send(data);
    }

}

let addBebida = false;
let mostrarFormBebida = document.getElementById('contenido-agregando-bebidas');
mostrarFormBebida.innerHTML = '';
mostrarFormBebida.innerHTML += `
<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="input-group mb-2">
                <span class="input-group-text">Nombre</span>
                <input id="nombreBebida" type="text" class="form-control">
            </div>
        </div>
        <div class="col-12">
            <div class="input-group mb-2">
                <span class="input-group-text">Precio</span>
                <input id="precioBebida" type="number" class="form-control">
            </div>
        </div>
    </div>
    <div class="row justify-content-around">
        <button id="enviar-datos-bebida" class="btn btn-primary">Agregar</button>
    </div>
</div>
`

addBebida = true;
if(addBebida){

    let agregandoBebida = document.getElementById('enviar-datos-bebida');
    agregandoBebida.addEventListener('click', agregarBebida);
    
    function agregarBebida(){

        const http = new XMLHttpRequest();
        const url = `http://127.0.0.1:3000/bebidas/`;
    
        let data = `nombre=${document.getElementById('nombreBebida').value}&precio=${document.getElementById('precioBebida').value}`;

        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                alert('Bebida agregada correctamente');
            }
        }
        
        http.open('POST', url);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        http.send(data);
    
    }

}