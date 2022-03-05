console.log("Loaded");
const fetch = require('node-fetch');


fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})

//const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', () => {
    console.log('testing');
})

fetch('weather?address=mumbai').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log("No data");
        } else {
            console.log(data.name);
        }
    })
})