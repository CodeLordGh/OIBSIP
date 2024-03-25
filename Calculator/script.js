const root = document.getElementById("root");
const display = document.createElement("div");
const board = document.createElement("div");
const buttonContainer = document.createElement("div");
const Name = document.createElement("div");
let result = document.createElement("p");
let text = document.createElement("p");

result.textContent = 0;
const numbers = [
  "c","+/-","%","+",
  7, 8, 9, "x",
  4, 5, 6, "-",
  1, 2, 3, "/",
  0, ".", "=",
];


function splitExpression(expression) {
  const tokens = [];
  let currentNumber = "";

  for (let char of expression) {
    if (/[+\-\*\%/µ]/.test(char)) { // Check if it's an operator
      if (currentNumber.length > 0) {
        tokens.push(currentNumber);
        currentNumber = "";
      }
      tokens.push(char); // Add the operator directly
    } else {
      currentNumber += char; // Append digits and decimal point to current number
    }
  }

  // Add the last number if it exists
  if (currentNumber.length > 0) {
    tokens.push(currentNumber);
  }
console.log(tokens)
  return tokens;
}

const calculate = (result, number) => {
  let operand2;


  // / Split the string into an array of numbers and operators
  const tokens =splitExpression(text.textContent); // Split based on operators
  // Initialize variables
  let operand1 = Number(tokens[0]); // First operand
  let operator; // Current operator
  
  // Loop through each token
  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];

console.log(token)
    if (!isNaN(token)) {
      // If it's a number
      operand2 = Number(token);

      switch (operator) {
        case "+":
          operand1 += operand2;
          break;
        case "-":
          operand1 -= operand2;
          break;
        case "x":
          operand1 *= operand2;
          break;
        case "/":
          if (operand2 === 0) {
            return "Error: Division by zero"; // Handle division by zero
          }
          operand1 = operand1 / operand2;
          break;
        case "$":
          operand1 *= -1;
          text.textContent = "";
          break;
        case "%":
            if (operand2 === 0) {
              operand1 /= 100; // Handle modulus by zero
            }
            else operand1 = operand1 % operand2;  
          break;
        case "=":
          result.textContent = operand1;
          text.textContent = ''
          break;
        case "µ":
          operand1 = 0;
          text.textContent = "";
          break;
      }
    } else {
      // If it's an operator
      operator = token;
    }
    
  }

  
  result.textContent = operand1; // Return the final result
};


root.style = ` display: flex; align-items: center; justify-content: center `;
display.style = `max-width: 459px; height: 559px; background-color: #6670be; border-radius: 20px; display: flex; padding: 0; align-items:center;  flex-direction: column `;
board.style = `background-color: #464e87; height: 57px; width: 90%; display: flex; align-items: center; margin-top: 40px; border-radius: 10px; margin-bottom: 20px; justify-content: space-between; font-weight: bold; font-size: 25px `;
text.style = `overflow: hidden; max-width: 70%`
buttonContainer.style = `display: flex; align-items: center; flex-wrap: wrap; width: 90%; gap: 13px;`;
Name.style = `margin-top: 35px; text-decoration: underline; font-size: 20px; font-weight: bold`;

if (text.style.width === '70%') {
    alert('board full')
}
numbers.forEach((number) => {
  const button = document.createElement("button");
  let util;
  button.textContent = number;
  button.style = `background-color: #464e87; height: 57px; width: calc(20% + 10px); border-radius: 10px; font-weight: bold; font-size: 20px `;

  button.innerText = number;

  text.style.maxWidth = '70%'

  button.addEventListener("click", () => {

     if (number === "+/-") {
      util = "$";
      text.textContent += util;
    }else if (number === "=") {
      text.textContent = ''
    } else {
      util = number;
      text.textContent += number;
    }

    calculate(result, util);
  });
  if (number === "=") {
    button.style.width = "calc(50% - 10px)"; // Double width for '=' button
  }
  buttonContainer.appendChild(button);
});

Name.innerHTML = `<p>Code by <q>Kash</q></p>`;

root.appendChild(display);
display.appendChild(board);
display.appendChild(buttonContainer);
display.appendChild(Name);
board.appendChild(text);
board.appendChild(result);

