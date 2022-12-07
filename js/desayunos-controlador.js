

let eliminarDesayuno = false;
let actualizarDes = false;
let desayunos = document.getElementById('desayunos');
desayunos.addEventListener('click', mostrarDesayunos);

function mostrarDesayunos(){
    
    const http = new XMLHttpRequest();
    const url = `http://127.0.0.1:3000/desayunos`;
    
    http.onreadystatechange = function(){
    
        if(this.readyState == 4 && this.status == 200){
            
            let respuestaDesayunos = JSON.parse(this.responseText);
            
            

            let mostrarDesayunos = document.getElementById('contenido-desayunos');
            mostrarDesayunos.innerHTML = '';
            
            for(let i = 0; i < respuestaDesayunos.length; i++){
                
                mostrarDesayunos.innerHTML += `
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="input-group mb-2">
                                <span class="input-group-text">Nombre</span>
                                <input id="nameDes" type="text" class="form-control" value="${respuestaDesayunos[i].nombre}">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-group mb-2">
                                <span class="input-group-text">Precio</span>
                                <input id="priceDes" type="number" class="form-control" value="${respuestaDesayunos[i].precio}">
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-around">
                        <button onclick="actDes('${respuestaDesayunos[i]._id}')" class="btn btn-warning">Actualizar</button>
                        <button onclick="eliminarDes('${respuestaDesayunos[i]._id}')" class="btn btn-danger">Eliminar</button>
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

eliminarDesayuno = true;
if(eliminarDesayuno){

    function eliminarDes(id){
        console.log(`Eliminando desayuno con el id: ${id}`)
        const http = new XMLHttpRequest();
        const url = `http://127.0.0.1:3000/desayunos/${id}`;

        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                
                alert(`Se eliminó el desayuno con el id: ${id}`);
                console.log(`Se eliminó el desayuno con el id: ${id}`)
                
            }
        }
        
        http.open('DELETE', url);
        http.send();
    
    }


}

actualizarDes = true;
if(actualizarDes){

    function actDes(id){
        console.log(`Actualizando: ${id}`)
        const http = new XMLHttpRequest();
        const url = `http://127.0.0.1:3000/desayunos/${id}`;
    
        let data = `nombre=${document.getElementById('nameDes').value}&precio=${document.getElementById('priceDes').value}`;

        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log(JSON.parse(this.responseText));
                alert('Desayuno actualizado correctamente');
            }
        }
        
        http.open('PUT', url);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        http.send(data);
    }

}

let addDesayuno = false;
let mostrarForm = document.getElementById('contenido-agregando-desayunos');
mostrarForm.innerHTML = '';
mostrarForm.innerHTML += `
<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="input-group mb-2">
                <span class="input-group-text">Nombre</span>
                <input id="nombreDesayuno" type="text" class="form-control">
            </div>
        </div>
        <div class="col-12">
            <div class="input-group mb-2">
                <span class="input-group-text">Precio</span>
                <input id="precioDesayuno" type="number" class="form-control">
            </div>
        </div>
    </div>
    <div class="row justify-content-around">
        <button id="enviar-datos" class="btn btn-primary">Agregar</button>
    </div>
</div>
`

addDesayuno = true;
if(addDesayuno){

    let agregandoDesayuno = document.getElementById('enviar-datos');
    agregandoDesayuno.addEventListener('click', agregarDesayuno);
    
    function agregarDesayuno(){
        
        // console.log(document.getElementById('nombreDesayuno'))

        const http = new XMLHttpRequest();
        const url = `http://127.0.0.1:3000/desayunos/`;
    
        let data = `nombre=${document.getElementById('nombreDesayuno').value}&precio=${document.getElementById('precioDesayuno').value}`;

        http.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                alert('Desayuno agregado correctamente');
            }
        }
        
        http.open('POST', url);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        http.send(data);
    
    }

}