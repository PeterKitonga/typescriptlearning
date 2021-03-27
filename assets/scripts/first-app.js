var button = document.getElementById("calculator-add-button");
var input1 = document.getElementById("num1");
var input2 = document.getElementById("num2");
var add = function (num1, num2) {
    return num1 + num2;
};
button.addEventListener("click", function () {
    var calculator_result_span = document.getElementById("calculator-result-span");
    calculator_result_span.innerText = "RESULT: " + add(+input1.value, +input2.value);
});
