const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function pageTransitions(){
  // Button click active class
  for (let i = 0; i < sectBtn.length; i++){
    sectBtn[i].addEventListener('click' , function() {
      let currentBtn = document.querySelectorAll('.active-btn');
      // only one element with active-btn so we take [0]
      currentBtn[0].className = currentBtn[0].className.replace('active-btn', ''); 
      // this refers to element that triggered the event (clicked button) - note 'this' keyword doesnt exist in arrow fxns
      this.className += ' active-btn'
    });
  }

  // Sections active class
  allSections.addEventListener('click', (e) => {
    const id = e.target.dataset.id; 
    if (id) {
      // remove selected from the other btns
      sectBtns.forEach((btn) => {
        btn.classList.remove('active');
      });
      // add active to clicked butn
      e.target.classList.add('active');
     
      // hide other sections
      sections.forEach((section) => {
         section.classList.remove('active');
      });

      const element = document.getElementById(id);
      element.classList.add('active');
    }
  });

  // To Toggle Theme
  const themeBtn = document.querySelector('.js-theme-btn');
  themeBtn.addEventListener('click', () => {
    let element = document.body;
    element.classList.toggle('light-mode');
  });
}

pageTransitions();