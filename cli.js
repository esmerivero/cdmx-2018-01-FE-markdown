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
    var els = dom.window.document.querySelectorAll('a'); // Busca todos los elementos a
    els.forEach(function(e){console.log(e.href, e.textContent);}); // Para cada etiqueta de a, trae su contenido de href
    // return str;
}

module.exports = {
    convertFile
}