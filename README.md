## Roulette Wheel Selection / Fitness proportionate selection

See [this](https://en.wikipedia.org/wiki/Fitness_proportionate_selection)

## Usage
```javascript
var RouletteWheel = require('./roulette-wheel.js');

//requires each individual have a name and val for fitness
var fitnesses = [
    {name:"a", val:100},
    {name:"b", val:10},
    {name:"c", val:1},
    {name:"d", val:0.1},
    {name:"e", val:0.01}
]

//optionally pass in precision
var rw = new RouletteWheel({fitnesses:fitnesses, precision:3})

//insert another fitness
rw.insert("f",0.001);

//returns the selected individual and the index in your original fitness array
//ex: { index: 0, target: { name: 'a', val: 100 } }
console.log(rw.spin());