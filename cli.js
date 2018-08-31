const fs = require('fs'); //fs o file system, librería nativa de node
var md = require('markdown-it')({ // Nos permite convertir el markdown en formato html
    html: true,
    linkify: true
});
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const convertFile = (file) =>{
    var str = fs.readFileSync(file, 'utf8');  //Aquí se lee el archivo
    var result = md.render(str); // Se convierte a formato html
    const dom = new JSDOM(result); // Simula crear elementos del dom
    var labels = dom.window.document.querySelectorAll('a'); // Busca todos las etiquetas "a"
    labels.forEach(function(content){
        console.log(content.href, content.textContent);
    }); // Para cada etiqueta de a, trae su contenido de href y el text
    // return str;
}

module.exports = {
    convertFile
}