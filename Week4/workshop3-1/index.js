const operation = require('./operation');

console.log("Add (4, 5):", operation('add', 4, 5));
console.log("Subtract (10, 3):", operation('subtract', 10, 3));
console.log("multiply (5, 6):", operation('multiply', 5, 6));
console.log("divide (8, 2):", operation('divide', 8, 2));

console.log( operation('x', 10, 2));