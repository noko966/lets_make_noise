/*1 */
let z1;
let z2;
const x = 3;
const y = 7;

if(y < 10){
  z1 = x + y;
}
else{
  z1 = x * y;
}

z2 = (y < 10) ? (x + y) : (x * y);



/*2*/
let task2;
const alpha = 3;
const beta = 7;
const operator = "add";

switch (operator) {
  case 'add':
    task2 = alpha + beta;
    break;
  case 'subtract':
    task2 = alpha - beta;
    break;
  case 'multiply':
    task2 = alpha * beta;
    break;
  case 'divide':
    task2 = alpha / beta;
    break;
  default:
    console.log(`wrong operator`);
}

/*3 */

const redemption = 420;
let discount;

if(redemption > 0 && redemption <= 350){
  discount = 0;
}
else if(redemption > 0 && redemption <= 350){
  discount = 0;
}


// * - 0 - 350: 0
// * - 351 - 1350: 15
// * - 1351 - 2700: 30
// * - 2701 - 6500: 45