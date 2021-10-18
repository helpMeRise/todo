export const calc = () => {
  
  const firstInput = document.querySelector('#x');
  const secondInput = document.querySelector('#y');
  const result = document.querySelector('.calc__result');
  const btns = document.querySelectorAll('.calc__btn');
  const calcForm = document.querySelector('.calc__form');

  for ( let i=0; i < btns.length; i++ ) {
    const calcBtn = event => {
      let target = event.target;
      
      if (target.textContent == '+') {
        result.textContent = +firstInput.value + +secondInput.value
      } else if (target.textContent == '-') {
        result.textContent = firstInput.value - secondInput.value
      } else if (target.textContent == 'х') {
        result.textContent = firstInput.value * secondInput.value
      } else if (target.textContent == '÷') {
        if (secondInput.textContent == 0) {
          result.textContent = 'на ноль делить нельзя';
        } else {
          result.textContent = firstInput.value / secondInput.value
        }
        
      }
      calcForm.reset();
    }

    btns[i].addEventListener('click', calcBtn);
  }
}
