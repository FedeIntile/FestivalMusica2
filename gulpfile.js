// ejemplo en package.js: "scripts": {"sass": "sass --hola" }
                                //   {"nombre del scrip": "busca la dependencia en node_modul/bin --nombre de la funcion que esta exportando(la buscan en gulpfile)"}        
// los scripts se mandan a llamar desde la consola como:npm run name-script
//export la manda a llamar de package.js
//------------------------------------------------------------------
import {src, dest, watch, series} from 'gulp'
import * as dartSass from 'sass' //depencia de sass, * significa importar todo de sass, 'as' es para darle un mombre, en este caso es dartSass 

import gulpSass from 'gulp-sass' // dependencia gulp-sass para usar sass en archivo gulpfile
 // va a la carpeta de node_modul y extrae la dependencia con todas sus funciones en este archivo

                                
const sass = gulpSass(dartSass) //gulpsass tiene que usar funciones de sass
                                // va a compilar sass utilizando las dependencias de gulp-sass
    
export function js(done){
    src('src/img/js/app.js')// encuentra el archivo
        .pipe(dest('build/js')) // y lo lleva a la carpeta build

    done()
}     

export function css(done){
    src('src/img/scss/app.scss', {sourcemaps: true})  // busca el arhivo // sourcemaps es genera un archivo que permite saber en que linea de codigo de scss esta
        .pipe(sass().on('error',sass.logError))  //compila sass a css pero si hay un error nos avisa
        .pipe(dest('build/css', {sourcemaps: true}))  // lo ubica en destino con el formato css
    done()
}

export function dev(){ // no se pasa el done() para que finalice por que va estar escuchando todo el tiempo
    watch('src/img/scss/**/*.scss', css)
    watch('src/img/js/**/*.js', js)
} // esta funcion va a estar observando el archivo que le pasamos y cuando alla cambios ejecuta la funcion css

export default series(js, css, dev)