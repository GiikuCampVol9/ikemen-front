function updateOutput() {
    var rangeInput = document.getElementById('range-price');
    var output = document.getElementById('output-value');
    output.value = rangeInput.value + "円以内";
}

function distanceOutput() {
    var rangeInput = document.getElementById('range-distance');
    var output = document.getElementById('output-distance');
    output.value = rangeInput.value > 0 ? rangeInput.value + "m以内" : "指定しない";
}