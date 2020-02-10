const app = require('./app');
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Interface
const questionA = function() {
  const methods = [1,2,3,4];
  const error = `Must be a either ${[...methods]}.`;
  rl.question("Please choose which method (1,2,3 or 4): ", function(method) {
    if(parseInt(method)) {
      if(methods.includes(parseInt(method))) {
        questionB(parseInt(method));
      } else {
        console.log(error);
        questionA();
      }
    } else {
      console.log(error);
      questionA();
    }
  });
}

const questionB = function(int) {
  rl.question("How many steps in the staircase? ", function(size) {
    if(parseInt(size)) {
      size = parseInt(size);
      questionC(int,size);
    } else {
      questionA();
    }
  });
}

const questionC = function(int,size) {
  rl.question("How many steps can you climb at once? Multiples, separate with comma: ", function(steps) {
    steps = steps.split(',').filter(item => {
      if(parseInt(item)) {
        return parseInt(item);
      } else {
        console.log(`warning! ${item} is not a number, value was ignored.`);
      }
    });
    let out;
    switch(int) {
      case 1: out = app.staircase(size); break;
      case 2: out = app.staircase2(size); break;
      case 3: out = app.staircase3(size,steps); break;
      case 4: out = app.staircase4(size,steps); break;
      default: app.staircase(size); break;
    }
    console.log(`${out}, is the maximum number of combinations.`);
    rl.question("Try again? (y): ", (item => {
      if(item==="y") {
        questionA();
      } else {
        console.log('Thanks for being a good sport.');
        process.exit(0);
      }
    }));
  });
}

questionA();
