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
    
    const imagen = document.createElement('IMG') 
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = "imagen Galeria";

  // generar el modal y se le agrega la imagen
  const modal = document.createElement('DIV'); // se crea el modal
  modal.classList.add('modal') // se le agrega una clase al modal
  modal.onclick = cerrarModal // no hace falta pasarlo como funcion por que no toma parametros


  // Botón cerrar modal
  const cerrarModalBtn = document.createElement('BUTTON');
  cerrarModalBtn.textContent = 'X'
  cerrarModalBtn.classList.add('btn-cerrar')
  cerrarModalBtn.onclick = cerrarModal

  modal.appendChild(imagen) // se le agrega la imagen
  modal.appendChild(cerrarModalBtn) // se le agrega la imagen
    //cerrar el modal
 


    // agregar al HTML
    const body = document.querySelector('body'); // selecciono el body
    body.classList.add('overflow-hidden') // saca el scroll cuando seleccionamos una imagen
    body.appendChild(modal) // agrego al body el modal
}

function cerrarModal(){
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')
   
   

    setTimeout(()=>{
        modal?.remove()// si existe el modal lo elimina 

        const body = document.querySelector('body'); //seleciona el body
        body.classList.remove('overflow-hidden'); // para luego eliminarlo       
    }, 500); // settimeout retrasa la ejecucion 5 segundos 
    

    // if(modal){
    //     modal.remove()  // esto se hacia antes que es lo mismo a lo anterior
    // }
}