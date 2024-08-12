const menu = document.querySelector('.acordeon');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPasta = document.querySelector('.pasta');
const btnPizza = document.querySelector('.pizza');
const btnPostres = document.querySelector('.postres');
const contenedorFotones = document.querySelector('.fotones');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    fotones();
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    // while(navegacion.children[5]){
    //     navegacion.removeChild(navegacion.children[5]);
    // }
    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar,overlay);
    
}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        }); 
});


imagenes.forEach(imagen=>{
   
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const fotones = () =>{
    let fotonesArreglo = [];
    const fotones = document.querySelectorAll('.foton');

    fotones.forEach(foton=> fotonesArreglo = [...fotonesArreglo,foton]);

    const ensaladas = fotonesArreglo.filter(ensalada=> ensalada.getAttribute('data-foton') === 'ensalada');
    const pastas = fotonesArreglo.filter(pasta => pasta.getAttribute('data-foton') === 'pasta');
    const pizzas = fotonesArreglo.filter(pizza => pizza.getAttribute('data-foton') === 'pizza');
    const postres = fotonesArreglo.filter(postre=> postre.getAttribute('data-foton') === 'postre');

    mostrarFotones(ensaladas, pastas, pizzas, postres, fotonesArreglo);

}

const mostrarFotones = (ensaladas, pastas, pizzas, postres, todos) =>{
    btnEnsaladas.addEventListener('click', ()=>{
        limpiarHtml(contenedorFotones);
        ensaladas.forEach(ensalada=> contenedorFotones.appendChild(ensalada));
    });

    btnPasta.addEventListener('click', ()=>{
        limpiarHtml(contenedorFotones);
         pastas.forEach(pasta=> contenedorFotones.appendChild(pasta));
    });

    btnPizza.addEventListener('click', ()=>{
        limpiarHtml(contenedorFotones);
        pizzas.forEach(pizza=> contenedorFotones.appendChild(pizza));
    });
    btnPostres.addEventListener('click', ()=>{
        limpiarHtml(contenedorFotones);
        postres.forEach(postre=> contenedorFotones.appendChild(postre));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorFotones);
        todos.forEach(todo=> contenedorFotones.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}