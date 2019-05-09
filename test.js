var RouletteWheel = require('./roulette-wheel.js');

var fitnesses = [
    {name:"a", val:100},
    {name:"b", val:10},
    {name:"c", val:1},
    {name:"d", val:0.1},
    {name:"e", val:0.01}

]
var rw = new RouletteWheel({fitnesses:fitnesses, precision:0})

//add a counter
for(var i=0; i<fitnesses.length; i++){
    fitnesses[i].count = 0;
}

//spin it a bunch
var spins = 100000;
for(var i=0; i<spins; i++){
   fitnesses[rw.spin().index].count++;
}

console.log("-------------\nAfter "+spins+" spins: \n", fitnesses,"\n-------------\n");

//too big fitness
//rw.insert("f",Number.MAX_SAFE_INTEGER);
