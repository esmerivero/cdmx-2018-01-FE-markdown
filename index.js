#!/usr/bin/env node

const mdLinks = require('./cli.js');

// const convertFile = mdLinks.convertFile(process.argv[2]);

// console.log(convertFile);

const md = mdLinks.mdLinks(process.argv[2]);
