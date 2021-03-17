const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];
  message = new Message('Test message with two commands', commands);
  rover = new Rover(98382);
  response = rover.receiveMessage(message);

  //console.log(response);

  //test 7
  it ("constructor sets position and default values for mode and generatorWatts", function () {
    expect (rover.mode).toEqual('NORMAL');
    expect (rover.generatorwatts).toEqual(110);
  });

//test 8
  it ("response returned by receiveMessage contains name of message", function() {
    expect(response.message).toEqual('Test message with two commands');
  });

  //test 9
  it ("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    expect(rover.receiveMessage(message).results.length).not.toEqual(1);
  });

  //test 10
  it ("responds correctly to status check command", function () {
    expect(response.results).toEqual([ Object({ completed: true }), Object({ completed: true, roverStatus: Object({ mode: 'NORMAL', generatorWatts: 110, position: 98382 }) }) ]);
  });


  //test 11
 it ("responds correctly to mode change command", function () {
  let test11command = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let test11message = new Message('Test message with mode change command', test11command);
  let test11rover = new Rover(112233);
  let test11response = test11rover.receiveMessage(test11message);
   expect(test11response.results).toEqual( [ { completed: true } ])
 });


  //test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
  let test12command = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE')];
  let test12message = new Message('Message to test false move for lower power', test12command);
  let test12rover = new Rover(445566);
  let test12response = test12rover.receiveMessage(test12message);
  expect(test12response.results).toEqual( [ { completed: true }, { completed: false } ])
  });


   //test 13
  it("responds with position for move command", function(){
    let test13command = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 221100)];
  let test13message = new Message('Message to test position for move command', test13command);
  let test13rover = new Rover(778899);
  let test13response = test13rover.receiveMessage(test13message);

  expect(test13response.results).toEqual( [ { completed: true }, { completed: true } ])
  expect(test13rover.position).toEqual(221100);
  });

});
