import axios from 'axios'; 
import champions from './assets/champions.js'
import fs from 'fs'
let champs = champions.data; 
let names = Object.keys(champs);
let storeNames = JSON.stringify(names);
fs.writeFile('./assets/names.json', storeNames, 'utf-8', (err)=>{
    console.error(err)
})