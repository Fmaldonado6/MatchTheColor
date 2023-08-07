const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");

const redSliderValue = document.getElementById("redValue");
const greenSliderValue = document.getElementById("greenValue");
const blueSliderValue = document.getElementById("blueValue");

const answerContainer = document.getElementById("answer");
const targetContainer = document.getElementById("target");

const resultTemplate = document.getElementById("result-template");
const resultContainer = document.getElementById("result-container");

const answerButton = document.getElementById("answer-button");
const restartButton = document.getElementById("restart-button");
const closeButton = document.getElementById("close-button");

const attemptsCounter = document.getElementById("attempts-counter");

const dialog = document.getElementById("dialog");

let colorAnswer = {
  r: 50,
  g: 50,
  b: 50,
};

let target = generateRandomColor();

let attempts = 0;

init();

function init() {
  colorAnswer = { r: 50, g: 50, b: 50 };
  attempts = 0;
  target = generateRandomColor();
  updateTargetColor();
  updateAnswerColor();
  updateAttempts();

  redSliderValue.innerText = colorAnswer.r;
  greenSliderValue.innerText = colorAnswer.g;
  blueSlider.innerText = colorAnswer.b;

  redSlider.value = colorAnswer.r;
  greenSlider.value = colorAnswer.g;
  blueSlider.value = colorAnswer.b;

  resultContainer.replaceChildren(resultTemplate);
}

redSlider.oninput = (e) => {
  colorAnswer.r = Number.parseInt(e.target.value);
  redSliderValue.innerText = colorAnswer.r;
  vibrate(10);

  updateAnswerColor();
};

greenSlider.oninput = (e) => {
  colorAnswer.g = Number.parseInt(e.target.value);
  greenSliderValue.innerText = colorAnswer.g;
  vibrate(10);
  updateAnswerColor();
};

blueSlider.oninput = (e) => {
  colorAnswer.b = Number.parseInt(e.target.value);
  blueSliderValue.innerText = colorAnswer.b;
  vibrate(10);
  updateAnswerColor();
};

closeButton.onclick = () => {
  dialog.style.display = "none";
};

answerButton.onclick = (e) => {
  if (attempts == 5) return;

  const result = addResult();
  const directions = validateAnswer();

  const resultChildren = [...result.childNodes].filter((e) =>
    e.classList?.contains("result")
  );

  const red = [...resultChildren[0].childNodes].filter(
    (e) => e.tagName == "SPAN"
  );
  const green = [...resultChildren[1].childNodes].filter(
    (e) => e.tagName == "SPAN"
  );
  const blue = [...resultChildren[2].childNodes].filter(
    (e) => e.tagName == "SPAN"
  );

  red[directions.r].style.display = "initial";
  green[directions.g].style.display = "initial";
  blue[directions.b].style.display = "initial";

  attempts++;
  updateAttempts();

  if (attempts == 5) {
    setTimeout(() => {
      alert(
        `You lose! correct answer: R:${target.r}, G:${target.g}, B:${target.b}`
      );
    }, 200);

    return;
  }

  for (let direction of Object.values(directions)) {
    if (direction != 0) return;
  }

  alert("You win!");
};

restartButton.onclick = (e) => {
  init();
};

function vibrate(ms){
const canVibrate = window.navigator.vibrate
if (canVibrate) window.navigator.vibrate(ms)
}

function updateAnswerColor() {
  answerContainer.style.backgroundColor = `rgb(${colorAnswer.r},${colorAnswer.g},${colorAnswer.b})`;
}

function updateTargetColor() {
  targetContainer.style.backgroundColor = `rgb(${target.r},${target.g},${target.b})`;
}

function generateRandomColor() {
  const r = Math.round((Math.random() * 255) / 15) * 15;
  const g = Math.round((Math.random() * 255) / 15) * 15;
  const b = Math.round((Math.random() * 255) / 15) * 15;
  return { r, g, b };
}

function addResult() {
  let result = resultTemplate.cloneNode(true);
  result.classList.remove("hidden");

  resultContainer.appendChild(result);

  return result;
}

function validateAnswer() {
  let direction = { r: 0, g: 0, b: 0 };

  if (target.r > colorAnswer.r) direction.r = 1;
  else if (target.r < colorAnswer.r) direction.r = 2;

  if (target.g > colorAnswer.g) direction.g = 1;
  else if (target.g < colorAnswer.g) direction.g = 2;

  if (target.b > colorAnswer.b) direction.b = 1;
  else if (target.b < colorAnswer.b) direction.b = 2;

  return direction;
}

function updateAttempts() {
  attemptsCounter.innerText = `Attempts: ${attempts}/5`;
}

generateRandomColor();
