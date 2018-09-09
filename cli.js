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
    });

    return arr;
}

const validate = (array) =>{
    array.map((content) =>{
        for(const property in content){
            if(property === 'link'){
                fetch(content[property])
                .then((response) => {
                    content["status"] = response.status;
                    content['text status'] = response.statusText;
                    console.log(content);
                    return content;
                })
                .catch((error) => {
                    return error;
                });
            }
          }
    })
}

const stats = (array) =>{
    array.map((content) =>{
        for(const property in content){
            if(property === 'link'){
                fetch(content[property])
                .then((response) => {
                    if(response.status === 200){
                      console.log();

                    }
                    return content;
                })
                .catch((error) => {
                    return error;
                });
            }
          }
    })
}

const mdLinks = (file) => {
    stats(convertFile(file));
    validate(convertFile(file));
    // minimist
    // filter includes
}

module.exports = {
    mdLinks
}
