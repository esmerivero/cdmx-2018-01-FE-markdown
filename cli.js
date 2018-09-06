const fs = require('fs'); // fs o file system, librería nativa de node
const md = require('markdown-it')({ // Nos permite convertir el markdown en formato html
    html: true,
    linkify: true
});
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fetch = require('node-fetch');

const convertFile = (file) =>{
    let arr = [];
    const str = fs.readFileSync(file, 'utf8');  // Aquí se lee el archivo    
    const result = md.render(str); // Se convierte a formato html
    const dom = new JSDOM(result); // Simula crear elementos del dom
    const labels = dom.window.document.querySelectorAll('a'); // Busca todos las etiquetas "a"
    labels.forEach((content) => {
        let obj = {
            link: content.href,
            description: content.textContent,
        };

        arr.push(obj);
        /*fetch(content.href)
        .then((response) => {
            response.status     //=> number 100–599
            response.statusText //=> String
            console.log(content.href, content.textContent, response.status, response.statusText);
            
            // return response.text()
        }, function(error) {
            error.message //=> String
            });*/
    }); 
     return arr;
}

const doFetch = (url) =>{
    fetch(url)
    .then((response) => {        
        return response.status
    })
    .catch((error) =>{
        return error
    })
}

const validate = (array) =>{
    array.map((content) =>{
        for(const j in content){
            if(j === 'link'){
                fetch(content[j])
                .then((response) => {
                    content["status"] = response.status;
                    console.log(content);
                }).catch((error) => {
                    return error;
                });
            }
          }
          
          
    })
}



const mdLinks = (file) => {
    validate(convertFile(file));
}

module.exports = {
    mdLinks
}