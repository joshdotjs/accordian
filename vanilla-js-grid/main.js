import { debounce } from './utils.js';

// ==============================================

const accordion = document.querySelector('#accordion');
const rows = accordion.querySelectorAll('.row');

const REM = 16;

// ==============================================

const h = (elem) => elem?.offsetHeight;

// -We set a data attribute to store if open or closed
//  --then check the data attribute to see if open or closed
//  --that avoids adding some JS state here
//  --probably better to keep the HTML in sync like this
//   as opposed to storing all the state in JS solely.

// -When the user changes the screen size we revert 
//  the animation to reset the styling added during the animation
//  because the added styling is based on the previous screen size (stale data).
//  --The simplest way to do this is to just restart all animations...

// ==============================================

function openRow(row, duration=0.33) {
  
  // const row = rows[idx];
  const q_container = row.querySelector('.q-container');
  const q = q_container.querySelector('.q'); 
  const arrow = q_container.querySelector('.arrow'); 
  const a = row.querySelector('.a');

  const height = `${h(q) + h(a) + 3 * REM}px`; // 2 padding + 1 gap

  const tl = gsap.timeline();

  tl.to(arrow, { rotate: "0deg", duration });
  tl.to( row, {
      height,
      onComplete: () => row.dataset.open = true,
      duration,
    },
    "<=",
  ); // gsap.to()

  row.gsap_tl = tl;
} // openRow()

// ==============================================

function closeRow(row, duration=0.33) {
  
  // const row = rows[idx];
  const q_container = row.querySelector('.q-container');
  const q = q_container.querySelector('.q'); 
  const arrow = q_container.querySelector('.arrow'); 

  const height = `${h(q) + 2 * REM}px`;

  const tl = gsap.timeline();

  tl.to(arrow, { rotate: "180deg", duration });
  tl.to( row, {
      height,
      onComplete: () => row.dataset.open = '',
      duration,
    },
    "<=",
  ); // gsap.to()

  row.gsap_tl = tl;
} // closeRow()

// ==============================================

rows.forEach((row, idx) => {
  
  row.addEventListener('click', (e) => {
    console.clear();

    const is_open = row.dataset.open;

    // if we allow multiple rows to be open at once then we don't need to close the previous row
    // -hence, we can simply pass in the reference to the row to the functions to not have to search the DOM again.
    if (is_open) {
      console.log('closing row idx: ', idx);
      closeRow(row);
    } else {
      console.log('opening row idx: ', idx);
      openRow(row);
    } // if (is_open)

  }); // row.addEventListener()

}); // rows.forEach()

// ==============================================

const load = () => {
  gsap.fromTo(accordion, { opacity: 0 }, { opacity: 1 });
};
load();

// ==============================================

const reset = () => {
  rows.forEach((row) => {

    const { gsap_tl } = row;
    if (gsap_tl) gsap_tl.revert();
    
    const {startOpen} = row.dataset;
    if (startOpen) {
      row.dataset.open = true;
    } else {
      row.dataset.open = '';
      closeRow(row, 0);
    }
  });
};
reset();

window.addEventListener("resize", debounce( reset ));