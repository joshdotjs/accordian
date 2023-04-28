function debounce(func){
  let timer;
  return function(event){
    if(timer) clearTimeout(timer);
    timer = setTimeout(func, 10, event);
  };
}

export {debounce };