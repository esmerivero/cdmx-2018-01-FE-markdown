const fs = require('fs'); // fs o file system, librería nativa de node
const md = require('markdown-it')({ // Nos permite convertir el markdown en formato html
    html: true,
    linkify: true
});
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch =require('node-fetch');

const convertFile = (file) =>{
    const str = fs.readFileSync(file, 'utf8');  // Aquí se lee el archivo
    const result = md.render(str); // Se convierte a formato html
    const dom = new JSDOM(result); // Simula crear elementos del dom
    const labels = dom.window.document.querySelectorAll('a'); // Busca todos las etiquetas "a"
    labels.forEach((content) => {
         // Para cada etiqueta de a, trae su contenido de href y el text
        fetch(content.href)
        .then(function(response) {
            response.status     //=> number 100–599
            response.statusText //=> String
            response.headers    //=> Headers
            response.url        //=> String
            console.log(content.href, content.textContent, response.status, response.statusText);
            
            return response.text()
        }, function(error) {
            error.message //=> String
            });
    }); 
    // return str;
}

module.exports = {
    convertFile
}


// ex.js
// const countLines = require('./lib/data.js')


// //./lib/data.js

// const fs = require('fs');

// // const readReadme = (callBack) => {
// //   fs.readFile('./README.md', 'utf8', (err, data) =>{
// //     if(err){
// //       console.log('error')
// //     }else { 
// //       callBack(data);
// //     }
// //   })
// // }

// // readReadme( callBack = data => console.log(data));



// // fs.watch('./', (eventType, fileName) => {
// //     console.log('tipo de evento' + eventType);
// //     if(fileName){
// //       console.log('En el archivo:' + fileName)
// //     } else {
// //       console.log('no tienes cambios en archivos')
// //     }
// // })

// // const data = fs.readFileSync('./README.md', 'utf8');

// exports = countLine = function (err, data) {
//   if(err){
//     console.log('No tienes README.md')
//   } else { 
//     let lines = data.split('\n').length
//     console.log(' El archivo tiene: ' + lines + ' lineas');
//     return ' El archivo tiene: ' + lines + ' lineas'

//   }
// }

// fs.readFile('./README.md', 'utf8', countLine);