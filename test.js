function splitExpression(expression) {
    const tokens = [];
    let currentNumber = "";
  
    for (let char of expression) {
      if (/[+\-\*\%/c]/.test(char)) { // Check if it's an operator
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
  
    return tokens;
  }
  
  const expression = "12.3+47+0.26-100/5*75%7c";
  const tokens = splitExpression(expression);
  console.log(tokens); 