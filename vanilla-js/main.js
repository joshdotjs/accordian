console.log('hello world');

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);


const rows = qsa('.row');
console.log('rows: ', rows);

rows.forEach((row, idx) => {
  row.addEventListener('click', (e) => {

    console.log('clicked row: ', idx);

    gsap.to(row, {
      x: '100px'
    });
  });
});