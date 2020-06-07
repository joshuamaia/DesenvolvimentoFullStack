window.addEventListener("load", init);

function init() {
  console.log("load");

  var red = document.querySelector("#redInput");
  var green = document.querySelector("#greenInput");
  var blue = document.querySelector("#blueInput");
  var redValue = document.querySelector("#redInputValue");
  var greenValue = document.querySelector("#greenInputValue");
  var blueValue = document.querySelector("#blueInputValue");
  var titulo = document.querySelector("#titulo");

  red.value = 0;
  green.value = 0;
  blue.value = 0;
  redValue.value = 0;
  greenValue.value = 0;
  blueValue.value = 0;

  titulo.textContent = `RGB(${redValue.value},${greenValue.value},${blueValue.value})`;
}

function changeRGB(event) {
  var red = document.querySelector("#redInput");
  var green = document.querySelector("#greenInput");
  var blue = document.querySelector("#blueInput");
  var redValue = document.querySelector("#redInputValue");
  var greenValue = document.querySelector("#greenInputValue");
  var blueValue = document.querySelector("#blueInputValue");
  var titulo = document.querySelector("#titulo");

  redValue.value = red.value;
  greenValue.value = green.value;
  blueValue.value = blue.value;

  var quadradoRGB = document.querySelector("#quadradoRGB");

  titulo.textContent = `RGB(${redValue.value},${greenValue.value},${blueValue.value})`;
  titulo.style.color = `rgb(${redValue.value},${greenValue.value},${blueValue.value})`;
  quadradoRGB.style.backgroundColor = `rgb(${redValue.value},${greenValue.value},${blueValue.value})`;
}
