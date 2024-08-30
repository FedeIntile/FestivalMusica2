document.addEventListener('DOMContentLoaded', function(){
    crearGaleria()
})

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes')

    const CANTIDAD_IMAGENES = 16;    
   
    for(let i=1;i<=CANTIDAD_IMAGENES; i++){
       const imagen = document.createElement('IMG') 
       imagen.src = `src/img/gallery/full/${i}.jpg`;
       imagen.alt = "imagen Galeria";

       // Event Handler(Controlador de eventos)-- detecta y responde a una interaccion del usuario
       // en este caso va a ser un click
       imagen.onclick = function(){
            mostrarImagen(i)
       }

       galeria.appendChild(imagen); // agrega las imagenes a la galeria
    }
}

function mostrarImagen(i){
  // generar el modal 
  const modal = document.createElement('DIV'); // se crea el modal
  modal.classList.add('modal') // se le agrega una clase al modal

    //cerrar el modal
    modal.onclick = cerrarModal // no hace falta pasarlo como funcion por que no toma parametros


    // agregar al HTML
    const body = document.querySelector('body'); // selecciono el body
    body.appendChild(modal) // agrego al body el modal
}

function cerrarModal(){
    const modal = document.querySelector('.modal')

    modal?.remove(); // si existe el modal lo elimina

    // if(modal){
    //     modal.remove()  // esto se hacia antes que es lo mismo a lo anterior
    // }
}