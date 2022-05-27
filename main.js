// Define Const
const keys = document.querySelectorAll(".key");
const colorPop = document.getElementById("color-popout");
const color_picker = document.getElementById("color-picker");
const screenOut = document.getElementById("calcBox");
const memOut = document.getElementById("memBox");
const r = document.querySelector(":root");

//Define default values
let memArray = [];
let $eval = false;
let $operation = false;
let screenPrint = new String("");
let memPrint = new String("");

// Setup Init
function init() {
  screenOut.textContent = screenPrint;
  memOut.textContent = memPrint;
}

// Update Pen Color
color_picker.onchange = function () {
  r.style.setProperty("--pen-color", color_picker.value);
};
function showColorPop() {
  colorPop.classList.toggle("hideColorBox");
  color_picker.classList.toggle("hideColorBox");
}

//Button Transitions
function addTransition(e) {
  e.classList.add("pressed");
}

function removeTransition(e) {
  const thisTarget = this;
  setTimeout(function (e) {
    thisTarget.classList.remove("pressed");
  }, 150);
}

//Register Keypresses

function registerKey(e) {
  //set func var
  const numpad = this.dataset.key;
  let opcode = null;

  //transition button
  addTransition(this);

  //check key operation and run correct func
  if (isNaN(numpad)) {
    opcode = runOperation(numpad);
    } else {
        //clear screen since operator is present
        if($operation){screenPrint = "";}
      //no operation, add a new number to a screen.
      console.log("No operation")
      opcode = String(numpad);
      screenPrint += opcode;
      $operation = false;
    }

  //update strings
  if (opcode) {
      console.log("opcode present");

    updateMem(opcode);
    //print to screen
    runPrint();
  }
}

function runOperation(op) {
    let opVal = new String();
  const lastEntry = memArray.length - 1;
  if (op == "clear") {
    screenOut.textContent = 'CLEAR';
    setTimeout(function (e) {
      screenPrint = "";
      memArray = [];
      memPrint = "";
      screenOut.textContent = screenPrint;
      memOut.textContent = memPrint;
    }, 300);
  }

  if (isNaN(memArray[lastEntry])) {
    return;
  } else {
      console.log($eval);
        if (op == "equals" || $eval == true) {
        equateFunction();
      }

    if(op == "invert"){
        let invNum = memArray.join('');
        let $invNum = invNum * -1;
        screenPrint = $invNum;
        memArray = [];
        memArray.push($invNum);
        $eval = false;
        $operation = false;
        memArray.push($invNum);
        runPrint();
        return; 
    }
    if (op == "divide") {
      opVal = "/";
      $eval = true;
    }
    if (op == "multiply") {
        opVal = "*";
        $eval = true;
    }
    if (op == "add") {
        opVal = "+";
        $eval = true;
    }
    if (op == "subtract") {
        opVal = "-";
        $eval = true;
    }
    if (op == "percent") {
        opVal = "%";
        $eval = true;
    }
    $operation = true;
    return opVal;
  }

}
function equateFunction() {
    let equatedNum = null;
    equatedNum = eval(memArray.join(""));
    screenPrint = equatedNum
    memArray = [];
    memArray.push(equatedNum);
    runPrint();
    return;
}

function updateMem(code) {
  memArray.push(code);
  if (memArray.length > 10) {
    memArray.pop();
  }
  memPrint = memArray.join("");
  console.log(memArray);
}

function runPrint() {
  memOut.textContent = memPrint;
  screenOut.textContent = screenPrint;
}

//Listeners
keys.forEach((key) => key.addEventListener("mousedown", registerKey));
keys.forEach((key) => key.addEventListener("mouseleave", removeTransition));
keys.forEach((key) => key.addEventListener("mouseup", removeTransition));

// Run init
init();
