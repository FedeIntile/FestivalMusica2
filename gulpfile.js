// ejemplo en package.js: "scripts": {"sass": "sass --hola" }
                                //   {"nombre del scrip": "busca la dependencia en node_modul/bin --nombre de la funcion que esta exportando(la buscan en gulpfile)"}        
// los scripts se mandan a llamar desde la consola como:npm run name-script
//export la manda a llamar de package.js
//------------------------------------------------------------------
import path from 'path'
import fs from 'fs'
import {glob} from 'glob'

import {src, dest, watch, series} from 'gulp'
import * as dartSass from 'sass' //depencia de sass, * significa importar todo de sass, 'as' es para darle un mombre, en este caso es dartSass 

import gulpSass from 'gulp-sass' // dependencia gulp-sass para usar sass en archivo gulpfile
 // va a la carpeta de node_modul y extrae la dependencia con todas sus funciones en este archivo

                                
const sass = gulpSass(dartSass) //gulpsass tiene que usar funciones de sass
                                // va a compilar sass utilizando las dependencias de gulp-sass

import sharp from 'sharp'

    
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

export async function crop(done) { //esto es codigo de node.js no es de gulp, que va a bajar la calidad de las imagenes que estan en la galeria, hasta que las abramos
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true }) //fs es una dependencia de node.js
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) // sharp es una dependencia de node.js
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}

// este codigo convierte las imagenes a webp
export async function imagenes(done) { // esta funcion busca las imagenes
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}


export function dev(){ // no se pasa el done() para que finalice por que va estar escuchando todo el tiempo
    watch('src/img/scss/**/*.scss', css)
    watch('src/img/js/**/*.js', js)
    
} // esta funcion va a estar observando el archivo que le pasamos y cuando alla cambios ejecuta la funcion css

export default series(crop, js, css, dev)