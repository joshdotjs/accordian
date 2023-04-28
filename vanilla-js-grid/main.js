const rows = document.querySelectorAll('.row');

const duration = 0.33;
const REM = 16;

// ==============================================

const h = (elem) => elem?.offsetHeight;

// can set a data attribute to store if open or closed
// -then check the data attribute to see if open or closed
// -that avoids adding some JS state here
// -probably better to keep the HTML in sync like this
//  as opposed to storing all the state in JS solely.

// ==============================================

function openRow(row) {
  
  // const row = rows[idx];
  const q_container = row.querySelector('.q-container');
  const q = q_container.querySelector('.q'); 
  const arrow = q_container.querySelector('.arrow'); 
  const a = row.querySelector('.a');

  const height = `${h(q) + h(a) + 3 * REM}px`; // 2 padding + 1 gap

  gsap.to(arrow, { rotate: "180deg" });
  gsap.to( row, {
      height,
      onComplete: () => row.dataset.open = true,
    },
  ); // gsap.to()
} // openRow()

// ==============================================

function closeRow(row) {
  
  // const row = rows[idx];
  const q_container = row.querySelector('.q-container');
  const q = q_container.querySelector('.q'); 
  const arrow = q_container.querySelector('.arrow'); 

  const height = `${h(q) + 2 * REM}px`;

  gsap.to(arrow, { rotate: "-180deg" });
  gsap.to( row, {
      height,
      onComplete: () => row.dataset.open = '',
    },
  ); // gsap.to()
} // closeRow()

// ==============================================

rows.forEach((row, idx) => {
  
  row.addEventListener('click', (e) => {
    console.clear();

    const is_open = row.dataset.open;
    console.log('is_open: ', is_open, '\ttypeof is_open: ', typeof is_open);

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