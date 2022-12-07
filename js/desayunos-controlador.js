
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
                                <input type="text" class="form-control" value="${respuestaDesayunos[i].nombre}">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-group mb-2">
                                <span class="input-group-text">Precio</span>
                                <input type="text" class="form-control" value="${respuestaDesayunos[i].precio}">
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-around">
                        <button class="btn btn-warning">Actualizar</button>
                        <button class="btn btn-danger">Eliminar</button>
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