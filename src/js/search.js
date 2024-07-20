function updateOutput() {
    var rangeInput = document.getElementById('range-price');
    var output = document.getElementById('output-value');
    output.value = rangeInput.value + "円以内";
}