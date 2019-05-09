var MersenneTwister = require('mersenne-twister');
var generator = new MersenneTwister();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(generator.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

class RouletteWheel {
    constructor(opts) {
        this.fitnesses = []; //plural to remove confusion :P
        this.precision = 3;
        this.wheel = [];
        this.wheelMaxSlot = 0;
        if (!opts) opts = {};
        if (Number.isInteger(opts.precision))
            this.precision = opts.precision;
        if (opts.fitnesses && opts.fitnesses.constructor === Array) {
            for (var i = 0; i < opts.fitnesses.length; i++) {
                if (opts.fitnesses[i].name && opts.fitnesses[i].val) {
                    //copy val instead of reference
                    this.fitnesses.push({
                        name: opts.fitnesses[i].name,
                        val: opts.fitnesses[i].val
                    })
                } else {
                    throw new TypeError('Fitness format unexpected. Expected an array of: [{name:_name_, val:_val_},...]')
                }
            }
        }
        this.computeWheel();
    }

    insert(name, val) {
        if (name && val) {
            this.fitnesses.push({
                name: name,
                val:val
            });
        } else {
            throw new TypeError('Missing name or fitness');
        }
        this.computeWheel();
    }

    spin(numSpins) {
        var target = getRandomInt(0,this.wheelMaxSlot);
        var targetInSlot = this.wheel.length-1;
        for(var i=targetInSlot; i>=0; i--){
            if(target < this.wheel[i].slot_val){
                targetInSlot = i;
            }else{
                break;
            }
        }
        return {index:targetInSlot, target:this.fitnesses[targetInSlot]};
    }

    print() {
        console.log(this.fitnesses, this.wheel);
    }

    computeWheel() {
        var sum = 0;
        var multiplier = Math.pow(10, this.precision);
        this.wheel = [];
        var sum = 0;
        for(var i=0; i<this.fitnesses.length; i++){
            sum+=Math.round(this.fitnesses[i].val*multiplier);
            if(sum >=Number.MAX_SAFE_INTEGER)
                throw new TypeError('unsafe number detected');
            this.wheel[i] = {"slot_val":sum, "fitness_index":i}; //note that the value in the slot value is exclusive since we are using 0 index
        }
        this.wheelMaxSlot = sum;
    }
}
module.exports = RouletteWheel