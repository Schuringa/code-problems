var form_el = document.getElementById('my-form');
var black_el = document.getElementById('element');
var width = document.getElementById('width');
var height = document.getElementById('height');
var xAxis = document.getElementById('x-axis');
var yAxis = document.getElementById('y-axis');

form_el.addEventListener('submit', function(evt) {
  evt.preventDefault();
  manipulate();
});

function manipulate() {
  if (width.value) {
    black_el.style.width = width.value;
  } else {
    black_el.style.width = 0;
  }
  if (height.value) {
    black_el.style.height = height.value;
  } else {
    black_el.style.height = 0;
  }
  if (xAxis.value) {
    black_el.style.left = xAxis.value;
  } else {
    black_el.style.left = 0;
  }
  if (yAxis.value) {
    black_el.style.bottom = yAxis.value;
  } else {
    black_el.style.bottom = 0;
  }
}
