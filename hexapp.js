let colorSample = null;
let answers = [];
let correctColorCode = null;
let score = 0;
let total = 0;

// add a service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
 
 
// initialize page
window.onload = function() {
  colorSample = document.getElementById("colorSample");
  
  // initialize array of elements with all possible answers
  answers.push(document.getElementById("a"));
  answers.push(document.getElementById("b"));
  answers.push(document.getElementById("c"));
  answers.push(document.getElementById("d"));
  
  // add onclick events to all possible answers
  for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', function() {markIt(this)});  
  } 
  
  loadNewQuestion();
};

// create random hex code
function getRandomHexCode() {
  let result = [];
  let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  result.push('#');
  
  for (let n = 0; n < 6; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join('');
} // getRandomHexCode

// creates a new color and answers
function loadNewQuestion() {
  
    let colorCode = getRandomHexCode();
    let solution = Math.floor(Math.random()*4); // random location of correct answer
    colorSample.innerHTML = "";
    colorSample.style.backgroundColor =  colorCode;
    for (let i = 0; i < answers.length; i++) {
        if (i == solution) answers[i].innerHTML = colorCode;
        else answers[i].innerHTML = getRandomHexCode();
    }
    correctColorCode = colorCode;
    console.log("ANSWER: " + correctColorCode);
       
} // loadNewQuestion

// marks the current question
function markIt(elem) {
    let gotItRight = false;
    total++;
    console.log("Comparing: " + elem.innerHTML + " to " + correctColorCode);
    if (elem.innerHTML == correctColorCode) { 
      score++;
      gotItRight = true;
    }
    document.getElementById("score").innerHTML = score + " / " + total;
    
    window.setTimeout(function() { 
      if (gotItRight == true) colorSample.innerHTML = "Correct!";
      else colorSample.innerHTML = "Incorrect!";
    }, 100);
    window.setTimeout(function() { 
      loadNewQuestion();
      
    }, 1300);
} // markIt
    
    