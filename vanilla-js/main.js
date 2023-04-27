console.log('hello world');

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);


const rows = qs('.row');
console.log('rows: ', rows);