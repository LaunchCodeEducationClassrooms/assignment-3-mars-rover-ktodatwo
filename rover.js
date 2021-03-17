
   // Write code here!

class Rover {
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorwatts = 110;
  }

  receiveMessage = function(message) {
   let results = [];
    
    for (let i=0; i<message.commands.length; i++){

      if (message.commands[i].commandType === 'MOVE') {
         if (this.mode === 'LOW_POWER') {
           results.push({'completed': false})

         } else if (this.mode === 'NORMAL'){
           this.position = message.commands[i].value;
           results.push({'completed': true})
         }
      } 
     else if (message.commands[i].commandType === 'MODE_CHANGE') {

          if (message.commands[i].value === 'LOW_POWER') {
            this.mode='LOW_POWER';

          } else if (message.commands[i].value === 'NORMAL') {
            this.mode='NORMAL';
          }
          results.push({'completed': true})

      } 
     
      else  if (message.commands[i].commandType === 'STATUS_CHECK') {
        results.push(
          {'completed': true,
          'roverStatus' : {mode: this.mode, generatorWatts: this.generatorwatts, position: this.position}}
        );
      } 
      else {
        results = [{'completed': false}];
      }
    }
    return {message:message.name, results}
  }
}

module.exports = Rover;