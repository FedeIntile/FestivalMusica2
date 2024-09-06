document.addEventListener('DOMContentLoaded', function(){
    navegacionFija()
    crearGaleria()
    resaltarEnlace()
    scrollNav()
})

function navegacionFija(){
    const header = document.querySelector('.header')//selecciona la seccion header a traves de su clase
    const sobreFestival = document.querySelector('.sobre-festival')//seleciona la seccion de sobre-festival para que quede fijo el header una vez que hagamos scroll y pasemos esta seccion

    window.addEventListener('scroll', function(){//windows es mas global que document(que tambien funciona)
        // vamos a revisar cuando pasemos por festival 
        if(sobreFestival.getBoundingClientRect().bottom <1){//este metodo a traves de coordenadas permite saber si superamos la seccion que queremos
            header.classList.add('fixed') // se agrega la clase fixed
        } else {
            header.classList.remove('fixed') // en el caso de que aun lo pasemos la sacamos
        }
    })


}
    

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

function resaltarEnlace(){
    document.addEventListener('scroll', function(){
        const sections = document.querySelectorAll('section');//selecciona todas las etiquetas section
        const navLinks = document.querySelectorAll('.navegacion-principal a') // selecciona todos los enlaces
        
        let actual = ''
        sections.forEach(section => {            
            const sectionTop = section.offsetTop //offsetTop toma la distancia que hay desde la parte superior de esa seccion hasta el principio de su contenedor,en este caso el body
            const sectionHeight = section.clientHeight // ClienteHeight dice cuando px mide esa seccion en el navegador
           
            if(window.scrollY >= (sectionTop - sectionHeight / 3)){ // se divide entre 3 la altura de la seccion para permitir ver que elemento se muestra mas
                                // toda esta operacion permite ver que section esta mas visible en el navegador
                actual = section.id
              }
        }); 

        navLinks.forEach(link => {   // se recorre los link de navegacion
            if (link.getAttribute('href') === '#' + actual){
                link.classList.add('active')
            } else {
                link.classList.remove('active')
            }
        
        })





                
    
    })
}

function scrollNav(){ //funcion para que recorra hasta la seccion selecionada de forma mas lenta
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach(link =>{
        link.addEventListener('click', evento => {
            evento.preventDefault() /// esto lo que hace es quitar la accion por defecto que al hacer click en el link del navegador nos envia a la seccion correspondiente
            const sectionScroll = evento.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'}) // se le pasa este objeto con esta propiedad
        })
    })
}