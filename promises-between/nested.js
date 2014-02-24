var rollDice = function() {
  var value = Math.floor(Math.random() * 6) + 1
  return value;
};

console.log(rollDice());


try {
  console.log(rollDice());
} catch (ex) {
  console.log("caught error...", ex)
}



var rollDiceAsync = function(callback) {
  setTimeout(function() {
    var value = Math.floor(Math.random() * 6) + 1
    callback(null, value);
  }, 50);
};





try {
  rollDiceAsync(function(err, value) {
    console.log("err", err)
    console.log("value", value);
  });
} catch (ex) {
  console.log("error", ex)
}

try {
  console.log(rollDice());
} catch (ex) {
  console.log("caught error...", ex)
}
