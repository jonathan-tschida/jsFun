const context = {
  exerciseA() {
    const fly = () => {
      console.log(this);
    };

    class SpaceProbe {
      constructor(title, classification) {
        this.title = title;
        this.classification = classification;
        this.fly = fly;
      }
    }

    const ship = new SpaceProbe('voyager', 'classy');


    // What is the value of `this` when we call ship.fly()?
    const result = 'global window object';
    return result;

    // Annotation:
    // ES6 notation makes 'this' the global object since thats where it was declared
  },

  exerciseB() {
    function fn() {
      const value = 2;
      return this.value;
    }

    // What is the value of `this` when we call fn()?
    const result = 'global window object';
    return result;

    // Annotation:
    //  fn() is executed in the global object, so that's what 'this' will be
  },

  exerciseC() {
    const car = {
      make: 'Tesla',
      getInfo: function(){
        console.log(this);
      }
    };

    const el = document.getElementById('btn');
    el.addEventListener('click', car.getInfo);

    // What is the value of `this` when a user clicks on our element and car.getInfo() is triggered?
    const result = 'el';
    return result;

    // Annotation:
    // the element is calling the addEventListener() method, making it 'this'
  },

  exerciseD() {
    const dog = {
      breed: 'Chihuahua',
      getBreed: function(){

        const innerFunction = function() {
          console.log(this.breed);
        };

        return innerFunction;
      }
    };

    var breed = dog.getBreed();

    // What is the value of `this` when we call breed()?
    const result = 'global window object';
    return result;

    // Annotation:
    // innerFunction is calling the console.log
    // which is not actually a method of the object
    // therefore 'this' will be the global object instead of dog
  },

  exerciseE() {

    const fn = () => {
      value = 21;
      return this.value;
    };


    // What is the value of `this` when we call fn()?
    const result = 'global window object';
    return result;

    // Annotation:
    // ES6 notation makes 'this' the global object
  },

  exerciseF() {
    class Hero {
      constructor(name, power, canFly = false) {
        this.name = name;
        this.power = power;
        this.canFly = canFly;
      }

      identifyHero() {
        return this;
      }
    }

    const storm = new Hero('Ororo', 'weather control', true);

    // What is the value of `this` when we call storm.identifyHero()?
    const result = 'instance of Hero';
    return result;

    // Annotation:
    // identifyHero() is a method, so 'this' would be storm
  },

  exerciseG() {
    class Game {
      constructor(title) {
        this.title = title;
      }

      resetGame() {
        console.log('Clearing the board and starting over');
      }

      restart() {
        setTimeout(function() {
          console.log(`Restarting ${this.title}...`);
        }, 1000);
      }
    }

    const monopoly = new Game('Monopoly');


    // What is the value of `this` when we call monopoly.restart()?
    const result = 'global window object';
    return result;

    // Annotation:
    // setTimeout is running the callback function where 'this' is being used
    // which means 'this' will be the global object, since that's where setTimeout runs
  },

  exerciseH() {
    const obj = {
      arrowFunction: null,
      method: function() {
        this.arrowFunction = () => {
          return this;
        };
      }
    };

    obj.method();

    // What is the value of `this` when we call obj.arrowFunction()?
    const result = 'obj';
    return result;

    // Annotation:
    // arrowFunction is ES6 notation
    // and it is declared inside of the obj(method)
    // making the obj the context for 'this'
  },

  exerciseI() {
    const poets = [{
      name: 'Sappho'
    }, {
      name: 'Maya'
    }, {
      name: 'Emily'
    }, {
      name: 'Audre'
    }];

    poets.map(function(poet) {
      return this;
    }, poets);

    // What is the value of `this` that gets returned on each iteration of poets.map()?
    const result = 'poets';
    return result;

    // Annotation:
    // map() has two arguments it can take, the callBack and thisArg
    // which tells map which context to work in
  },

  exerciseJ() {
    const el = $('#btn');
    el.on('click', function() {
      console.log($(this));
    });

    // What is the value of `this` when a user clicks on our #btn element and the callback is triggered?
    const result = 'el';
    return result;

    // Annotation:
    // the element is running the function, making it the context for 'this'
  },

  exerciseK() {
    var store = {
      fruit: 'grapes',
      sellMe: function() {
        return this.fruit;
      }
    };

    // What is the value of `this` when we call store.sellMe()?
    const result = 'store';
    return result;

    // Annotation:
    // sellMe() is a method of store, making it the context of 'this'
  },

  exerciseL() {
    const dog = {
      breed: 'Chihuahua',
      getBreed: function(){
        var _this = this;

        setTimeout(function() {
          console.log('Your dog is a ' + _this.breed);
        });
      }
    };

    // What is the value of `this` when we call dog.getBreed()?
    const result = 'dog';
    return result;

    // Annotation:
    // again, since its a method, the object running it is the context
    // we then pass 'this' to the setTimeout() function
  },

  exerciseM() {
    const robert = {
      name: 'Bobo',
      occupation: 'instructor'
    };

    const william = {
      name: 'will',
      occupation: 'instructor'
    };

    function makeBirdNoise() {
      console.log('My name is ' + this.name + ' ... caw! caw!');
    }

    // What is the value of `this` when we call makeBirdNoise.call(robert);
    const result = 'robert';
    return result;

    // Annotation:
    // call() is a prototype method that lets you set the value of this for a given function
  },

  exerciseN() {
    class Bird {
      constructor(name, species) {
        this.name = name;
        this.species = species;
      }

      delayNoise() {
        setTimeout(this.makeNoise.bind(this), 1000);
      }

      makeNoise() {
        console.log('caw, caw');
      }
    }

    var firstBird = new Bird('Calvin', 'budgie');

    // What is the value of `this` when we call firstBird.delayNoise();
    const result = 'instance of Bird';
    return result;

    // Annotation:
    // we are using bind() to set the value of 'this' for setTimeout
  },

  exerciseO() {
    const button = document.getElementById('submit');

    button.addEventListener('click', () => {
      console.log(this);
      this.classList.toggle('on');
    });

    // What is the value of `this` when a user clicks on our button element and the callback is triggered?
    const result = 'global window object';
    return result;

    // Annotation:
    // ES6 notation for the callback function makes 'this' the global object
  },

  exerciseP() {
    const child = {
      totalScreams : 4,
      scream: () => {
        this.totalScreams++;
      }
    };

    const result = 'global window object';
    return result;

    // What is the value of `this` when we call child.scream();
    // Annotation:
    // ES6 notation, the function was declared in the global context
  }
};

module.exports = context;
