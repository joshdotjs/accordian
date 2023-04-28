const rows = document.querySelectorAll('.row');

// ==============================================

const h = (elem) => elem?.offsetHeight;

// ==============================================

function openRow(idx) {
  console.log('opening row idx: ', idx);

  const row = rows[idx];
  const q_container = row.querySelector('.q-container');
  const q = q_container.querySelector('.q'); 
  const arrow = q_container.querySelector('.arrow'); 
  const a = row.querySelector('.a');

  const height = `${h(q) + h(a) + 2 * 16}px`;

  gsap.to(arrow, { rotate: "180deg" });
  gsap.to( row, {
      height,
    },
  ); // gsap.to()
}

// ==============================================

function closeRow(idx) {
  console.log('closing row idx: ', idx);

  const row = rows[idx];
  const q_container = row.querySelector('.q-container');
  const q = q_container.querySelector('.q'); 
  const arrow = q_container.querySelector('.arrow'); 

  const height = `${h(q) + 2 * 16}px`;

  gsap.to(arrow, { rotate: "-180deg" });
  gsap.to( row, {
      height,
    },
  ); // gsap.to()
}

// ==============================================

rows.forEach((row, idx) => {
  
  row.addEventListener('click', (e) => {
    console.log('clicked');

    //openRow(idx);
    closeRow(idx);
  }); // row.addEventListener()

}); // rows.forEach()