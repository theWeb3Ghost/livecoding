// Each exercise: a single function, up to 5 editable variables, one console.log
// so students can see their program's output immediately after clicking Run.

const EXERCISES = [
  {
    id: "addition",
    title: "Simple Addition",
    tagline: "Store two numbers, write one function, print the total.",
    instructions: [
      "Look at <code>addNumbers</code> — it takes two parameters and returns their sum.",
      "Change the values stored in <code>firstNumber</code> and <code>secondNumber</code> (you have up to 5 variables to play with).",
      "Click <strong>Run code</strong> and check the console output matches what you expect.",
    ],
    hint: "The function only does the maths. Nothing prints until you call <code>console.log(result)</code> — that's the line that shows you the answer.",
    starterCode: `// Exercise 1: Simple Addition
function addNumbers(num1, num2) {
  let sum = num1 + num2;
  return sum;
}

// Up to 5 variables — try changing these
let firstNumber = 10;
let secondNumber = 25;
let thirdNumber = 0;
let fourthNumber = 0;
let fifthNumber = 0;

let result = addNumbers(firstNumber, secondNumber);
console.log(result);
`,
  },
  {
    id: "wallet",
    title: "Wallet Balance",
    tagline: "Practice let vs const while a function updates a running balance.",
    instructions: [
      "<code>walletBalance</code> uses <code>let</code> because it changes. <code>ownerName</code> uses <code>const</code> because it doesn't.",
      "The function <code>spend</code> takes the current balance and an amount, then returns what's left.",
      "Change the starting balance or the amount spent, then run the code.",
    ],
    hint: "If you try to reassign <code>ownerName</code> directly, JavaScript will throw an error — that's <code>const</code> doing its job.",
    starterCode: `// Exercise 2: Wallet Balance
function spend(balance, amount) {
  let remaining = balance - amount;
  return remaining;
}

const ownerName = "Faith";
let walletBalance = 2000;
let amountSpent = 650;
let secondPurchase = 0;
let notes = "";

let newBalance = spend(walletBalance, amountSpent);
console.log(newBalance);
`,
  },
  {
    id: "pass-fail",
    title: "Pass or Fail",
    tagline: "Use if / else inside a function to make a decision.",
    instructions: [
      "<code>gradeStudent</code> checks a score and returns a grade — read the if / else if / else chain carefully.",
      "Change <code>studentScore</code> to test different outcomes (try above 70, between 50-69, and below 50).",
      "Run the code and see which branch fires.",
    ],
    hint: "Only one branch of an if / else if / else chain ever runs. JavaScript checks each condition top to bottom and stops at the first one that's true.",
    starterCode: `// Exercise 3: Pass or Fail
function gradeStudent(score) {
  if (score >= 70) {
    return "A";
  } else if (score >= 50) {
    return "B";
  } else {
    return "F";
  }
}

let studentScore = 62;
let passMark = 50;
let subject = "Mathematics";
let attempt = 1;
let extra = 0;

let grade = gradeStudent(studentScore);
console.log(grade);
`,
  },
  {
    id: "average",
    title: "Average Score",
    tagline: "Use all 5 variables together inside one function.",
    instructions: [
      "This time all 5 variables are test scores, and the function averages them.",
      "Change any of the 5 scores and watch the average update when you run the code.",
      "Notice how the function stays exactly the same — only the data changes.",
    ],
    hint: "Average = add everything up, then divide by how many numbers there are. Here that's always 5.",
    starterCode: `// Exercise 4: Average Score
function averageOfFive(a, b, c, d, e) {
  let total = a + b + c + d + e;
  let average = total / 5;
  return average;
}

let score1 = 78;
let score2 = 65;
let score3 = 90;
let score4 = 72;
let score5 = 88;

let classAverage = averageOfFive(score1, score2, score3, score4, score5);
console.log(classAverage);
`,
  },
  {
    id: "trip-cost",
    title: "Function Calling a Function",
    tagline: "One function reused twice inside a bigger function.",
    instructions: [
      "<code>calculateFare</code> is the small helper. <code>totalTripCost</code> calls it twice — once for each leg of the trip.",
      "Change the distances or the fare rate and run the code.",
      "This is the same pattern you'll use to build bigger backend logic out of small functions.",
    ],
    hint: "totalTripCost never does its own multiplying — it just asks calculateFare to do the work twice, then adds the two answers together.",
    starterCode: `// Exercise 5: Function Calling a Function
function calculateFare(distanceKm) {
  let farePerKm = 50;
  return distanceKm * farePerKm;
}

function totalTripCost(distanceThere, distanceBack) {
  let goFare = calculateFare(distanceThere);
  let returnFare = calculateFare(distanceBack);
  return goFare + returnFare;
}

let distanceThere = 10;
let distanceBack = 8;
let passengers = 1;
let discount = 0;
let notes2 = "";

let total = totalTripCost(distanceThere, distanceBack);
console.log(total);
`,
  },
];
