let calculation = localStorage.getItem('calculation') || '';

displayCalculation();

console.log(localStorage.getItem('calculation'))

function updateCalculation (calculationNumber) {
  calculation += `${calculationNumber}`;
  console.log(calculation)
  localStorage.setItem('calculation', calculation);
  displayCalculation()
}

function displayCalculation (calculationInput) {
  document.querySelector('.js-calculation-display').innerHTML = calculation
}