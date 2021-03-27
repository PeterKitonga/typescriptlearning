const button = document.getElementById("calculator-add-button");
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

const add = (num1: number, num2: number) => {
    return num1 + num2;
}

button.addEventListener("click", () => {
    const calculator_result_span = document.getElementById("calculator-result-span");
    calculator_result_span.innerText = `RESULT: ${add(+input1.value, +input2.value)}`;
});