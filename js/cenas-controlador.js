let eliminarCen = false;
let actualizarCen = false;

let cenas = document.getElementById('cenas');
cenas.addEventListener('click', mostrarCenas);

function mostrarCenas(){
    
    const http = new XMLHttpRequest();
    const url = `http://127.0.0.1:3000/cenas`;
    
    http.onreadystatechange = function(){
    
        if(this.readyState == 4 && this.status == 200){
            
            let respuestaCenas = JSON.parse(this.responseText);
            

            let verCenas = document.getElementById('contenido-cenas');
            verCenas.innerHTML = '';
            
            for(let i = 0; i < respuestaCenas.length; i++){
                
                verCenas.innerHTML += `
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="input-group mb-2">
                                <span class="input-group-text">Nombre</span>
                                <input id="nameCena" type="text" class="form-control" value="${respuestaCenas[i].nombre}">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-group mb-2">
                                <span class="input-group-text">Precio</span>
                                <input id="priceCena" type="number" class="form-control" value="${respuestaCenas[i].precio}">
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-around">
                        <button onclick="actualizarCena('${respuestaCenas[i]._id}')" class="btn btn-warning">Actualizar</button>
                        <button onclick="eliminarCena('${respuestaCenas[i]._id}')" class="btn btn-danger">Eliminar</button>
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

eliminarCen = true;
if(eliminarCen){

    function eliminarCena(id){
        const http = new XMLHttpRequest();
        const url = `http://127.0.0.1:3000/cenas/${id}`;

        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                
                alert(`Se eliminó la cena con el id: ${id}`);
                console.log(`Se eliminó la cena con el id: ${id}`)
                
            }
        }
        
        http.open('DELETE', url);
        http.send();
    
    }


}

actualizarCen = true;
if(actualizarCen){

    function actualizarCena(id){
        console.log(`Actualizando: ${id}`)
        const http = new XMLHttpRequest();
        const url = `http://127.0.0.1:3000/cenas/${id}`;
    
        let data = `nombre=${document.getElementById('nameCena').value}&precio=${document.getElementById('priceCena').value}`;

        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log(JSON.parse(this.responseText));
                alert('Cena actualizada correctamente');
            }
        }
        
        http.open('PUT', url);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        http.send(data);
    }

}

let addCena = false;
let mostrarFormCena = document.getElementById('contenido-agregando-cenas');
mostrarFormCena.innerHTML = '';
mostrarFormCena.innerHTML += `
<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="input-group mb-2">
                <span class="input-group-text">Nombre</span>
                <input id="nombreCena" type="text" class="form-control">
            </div>
        </div>
        <div class="col-12">
            <div class="input-group mb-2">
                <span class="input-group-text">Precio</span>
                <input id="precioCena" type="number" class="form-control">
            </div>
        </div>
    </div>
    <div class="row justify-content-around">
        <button id="enviar-datos-cena" class="btn btn-primary">Agregar</button>
    </div>
</div>
`

addCena = true;
if(addCena){

    let agregandoCena = document.getElementById('enviar-datos-cena');
    agregandoCena.addEventListener('click', agregarCena);
    
    function agregarCena(){

        const http = new XMLHttpRequest();
        const url = `http://127.0.0.1:3000/cenas/`;
    
        let data = `nombre=${document.getElementById('nombreCena').value}&precio=${document.getElementById('precioCena').value}`;

        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                alert('Cena agregada correctamente');
            }
        }
        
        http.open('POST', url);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        http.send(data);
    
    }

}