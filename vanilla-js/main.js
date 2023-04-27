const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);

// ==============================================

const rows = qsa('.row');
console.log('rows: ', rows);

// ==============================================


let prev_idx;
let tl_prev = null;

// ==============================================

rows.forEach((row, idx) => {
  
  const a = row.querySelector('.a');
  const arrow = row.querySelector('.arrow');
  const height = row.offsetHeight + a.offsetHeight + 16; // + 1rem margin-bottom
  console.log('a: ', a);
  console.log('row: ', row);
  console.log('arrow: ', arrow);
  console.log('height: ', height);
  
  // --------------------------------------------

  row.addEventListener('click', (e) => {

    console.log('clicked row: ', idx);

    if (tl_prev !== null) tl_prev.reverse();

    if (idx !== prev_idx) {

      const tl = gsap.timeline();
      const duration = 0.33;

      tl.to(arrow, {
        rotate: "180deg",
        onStart: () => {
          // disableClicks();
        },
        duration
      });

      tl.to(
        row,
        {
          height: `${height}px`,
          color: "#40bf57",
          onComplete: () => {
            tl_prev = tl;
            prev_idx = idx;
            // enableClicks();
          },
          duration
        },
        "<="
      );
    }

  });

  //---------------------------------------------
  
});

// ==============================================