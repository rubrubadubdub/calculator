const keys = document.querySelectorAll('.key');
const colorPop = document.getElementById("color-popout");
const color_picker = document.getElementById("color-picker");
const r = document.querySelector(':root');


// Update Pen Color
color_picker.onchange = function() {
    r.style.setProperty('--pen-color', color_picker.value);
}
function showColorPop() {
    colorPop.classList.toggle('hideColorBox');
    color_picker.classList.toggle('hideColorBox');
}

function addTransition(e) {
        this.classList.add('pressed');
        //e.target.addEventListener('click', makeChoice);
}

function removeTransition(e) {
    const thisTarget = this;
    setTimeout(function(e){
    thisTarget.classList.remove('pressed');
    //e.target.removeEventListener('click', makeChoice);
    },150);
}

keys.forEach(key => key.addEventListener('mousedown', addTransition));
keys.forEach(key => key.addEventListener('mouseleave', removeTransition));
keys.forEach(key => key.addEventListener('mouseup', removeTransition));
