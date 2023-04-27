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
  
  const disableClick = () => row.style.pointerEvents = "none"; // disable clicks
  const enableClick  = () => row.style.pointerEvents = "auto"; // disable clicks
  
  const a = row.querySelector('.a');
  const arrow = row.querySelector('.arrow');
  // console.log('a: ', a);
  // console.log('row: ', row);
  // console.log('arrow: ', arrow);
  
  row.addEventListener('click', (e) => {

    console.log('clicked row: ', idx);

    // want to re-calculate the height just in case user resized window
    const height = row.offsetHeight + a.offsetHeight + 16; // + 1rem margin-bottom
    console.log('height: ', height);

    if (tl_prev !== null) {
      disableClick();
      tl_prev.reverse();
    }

    if (idx !== prev_idx) {

      const tl = gsap.timeline();
      const duration = 0.33;

      disableClick();

      tl.to(arrow, {
        rotate: "180deg",
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
            console.log('complete');
            enableClick();
          },
          onReverseComplete: () => {
            console.log('reverse complete');
            enableClick();
          },
          duration
        },
        "<="
      );
    } else {
      prev_idx = null; // allow to click same element after reverse on itself
      tl_prev = null; // don't reverse twice in a row
    } // if / else

  });

  //---------------------------------------------
  
});

// ==============================================

// Adjust height if user resizes window
const setHeight = () => {
  rows.forEach((row) => {
    const q = row.querySelector('.q');
    row.style.height = `${q.offsetHeight + 2 * 16}px`; // + 1rem margin-bottom + 1rem margin-top
  });
};

// ==============================================

function debounce(func){
  let timer;
  return function(event){
    if(timer) clearTimeout(timer);
    timer = setTimeout(func, 20, event);
  };
}

// ==============================================

window.addEventListener("resize", debounce( setHeight ));

// ==============================================

// -The correct way to do this is to avoid position absolute completely.
// -Rule of thumb: If you need to use position absolute when dealing with height, you're doing it wrong.
// -Instead, use CSS grid and position the rows on top of eachoter instead of absolute positioning.
// -This one is slightly different because i don't need two items on top of eachoter.
// -I instead need one of the items to go outside of the parent container.