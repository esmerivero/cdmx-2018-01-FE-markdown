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
  const promise = new Promise((resolve, reject) => {
    if(!array) {
      return reject('Error en encontrar el arreglo');
    }
    else {
      return resolve (
        array.map((content) =>{ // Extrae la info del arreglo
          return fetch(content.link)
          .then((response) => {
            content['status'] = response.status; // Agrega al objeto status y el texto del status
            content['text status'] = response.statusText;
            return (content);
          })
          .catch((error) => {
            return error;
          });
        })
      );
    }
  })


  promise
  .then((response) => {
    return Promise.all(response)
  })
  .then((response) => {
    console.log(response);
    return response;
  })
  .catch((err) => {
    console.error(`ERROR: ${err}`);
  });
}

const stats = (array) =>{
  const arrayForLinks = [];
  array.map((content) =>{
    for(const property in content){
      const element = content[property];
      if(property === 'link'){
        arrayForLinks.push(element); // Si la propiedad coincide con 'link' lo agregará en un array
      }
    }
  })

  let linkRep=0; // Links repetidos
  let unique=arrayForLinks.length;
  for (let i = 0; i < arrayForLinks.length; i++) {
    for (let j = i + 1; j < arrayForLinks.length; j++) { // Se recorre cada link y se comparan
      if (arrayForLinks[i] === arrayForLinks[j]){ // Si son iguales linkRepetido se incrementará
        linkRep++;
      }
    }
  }
  console.log(`Links únicos: ${unique-linkRep}`);
  console.log(`Total de links: ${arrayForLinks.length}`);
}

const mdLinks = (file) => {
    // stats(convertFile(file));
    // validate(convertFile(file));
    // minimist
    // filter includes

  const promise = new Promise((resolve, reject) => {
    if(!file) {
      return reject(`No se reconoce el archivo ${file}`);
    }
    else {
      return resolve (validate(convertFile(file)));
    }
  })


  promise
  .then((response) => {
    return response;
  })
  .catch((err) => {
    console.error(`ERROR: ${err}`);
  });
}

module.exports = {
    mdLinks
}
