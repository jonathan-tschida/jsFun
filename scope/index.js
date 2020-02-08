const scope = {
  exerciseA() {
    let personA = 'Paul';
    let personB = 'Ben';
    let personC = 'Tom';

    function changePerson() {
      if (personA === 'Paul') {
        person = 'CardiB';
        beautifyPerson();
      }

      function beautifyPerson() {
        // Log A: personB

        if (personB.includes('B')) {
          personB = person;
          personC = personB;
          // Log B: personC
        }
      }

      personC = personA;

      // Log C: personB
    }

    changePerson();

    // Log D: personC

    const result =  [{A: 'Ben'}, {B: 'CardiB'}, {C: 'CardiB'}, {D: 'Paul'}];
    return result;

    // Annotation:
    // A: PersonB is 'Ben' because we haven't reassigned it since declaring it
    // B: PersonC is 'CardiB' because we reassigned it to the value of personB, which points to person
    // C: PersonB is 'CardiB' because we reasigned it previously
    // D: PersonC is 'Paul' because changePerson() finished running and we're back in the global scope
  },

  exerciseB() {
    let number = 30;

    function numberFunction() {
      let number = 75;

      if (number === 75) {
        let number = 28;
      }

      // Log A: number

      function newNumber() {
        number = 64;

        // Log B: number
      }

      newNumber();

      // Log C: number
    }

    numberFunction();

    // Log D: number

    const result = [{A: 75}, {B: 64}, {C: 64}, {D: 30}];
    return result;

    // Annotation:
    // A is 75 because let is block scoped (it reverts back to the function scope after the if block)
    // B is 64 because we're still in that function scope
    // C stays at 64 because newNumber was also declared inside numberFunction
    // D is 30 because we're back in global scope
  },

  exerciseC() {
    let greeting = 'Hello';

    function greetingFunction() {
      var greeting = 'Yo';

      if (greeting === 'Yo') {
        let greeting = 'Howdy';
      }

      // Log A: greeting

      function newPhrase() {
        greeting = 'Hey';

        // Log B: greeting
      }

      newPhrase();

      // Log C: greeting
    }

    greetingFunction();

    // Log D: greeting

    const result = [{A: 'Yo'}, {B: 'Hey'}, {C: 'Hey'}, {D: 'Hello'}];
    return result;

    // Annotation:
    // A: let is block scoped so we revert to the function scope here
    // B: we're in the newPhrase() functional scope
    // C: since newPhrase was declared in this function, we're sharing scope
    // D: back in the global scope
  },

  exerciseD() {
    let greeting = 'howdy';

    const greetingGenerator = () => {
      let greeting = 'hi';

      if (greeting === 'hi') {
        let greeting = 'hello';
      }

      // Log A: greeting

      const newGreeting = ()  => {
        greeting = 'welcome';

        // Log B: greeting
      };

      newGreeting();

      // Log C: greeting
    };

    greetingGenerator();

    // Log D: greeting

    const result = [{A: 'hi'}, {B: 'welcome'}, {C: 'welcome'}, {D: 'howdy'}];
    return result;

    // Annotation:
    // A: function scope
    // B: inner function scope
    // C: scope inheritence
    // D: global
  },

  exerciseE() {
    let name = 'Brittany';

    function sayName() {
      let name = 'Pam';

      if (name === 'Pam') {
        name = 'Nathaniel';

        if (name.length > 0) {
          let name = 'Brittany';
        }

        // Log A: name
      }

      // Log B: name
    }

    // Log C: name

    sayName();

    // Log D: name

    const result = [{C: 'Brittany'}, {A: 'Nathaniel'}, {B: 'Nathaniel'}, {D: 'Brittany'}];
    return result;

    // Annotation:
    // A: we are in the outer block scope
    // B: var is the default declaration and is leaking out of the block
    // C: global
    // D: global
  },

  exerciseF() {
    var dog = 'Spot';

    function petDog() {
      // Log A: dog

      if (dog === 'Spot') {
        let dog = 'Fluffy';
      }

      function rollOver() {
        // Log B: dog

        dog = 'Biscuit';

        // Log C: dog

      }

      rollOver();

      // Log D: dog
    }

    petDog();

    // Log E: dog

    const result = [{A: 'Spot'}, {B: 'Spot'}, {C: 'Biscuit'}, {D: 'Biscuit'}, {E: 'Biscuit'}];
    return result;

    // Annotation:
    // A: no function variable named dog so we look globally
    // B: same as A
    // C: we've reassigned global dog to 'Biscuit'
    // D: same as C
    // E: same as C
  },

  exerciseG() {
    var fruit = 'apple';

    function eatFruit() {

      if (fruit !== 'kiwi') {
        var fruit = 'mango';

        if (fruit) {
          // Log A: fruit
          const fruit = 'strawberry';
        }

        // Log B: fruit
      }

      // Log C: fruit
    }

    eatFruit();

    // Log D: fruit

    const result = [{A: 'reference error'}, {B: 'mango'}, {C: 'mango'}, {D: 'apple'}];
    return result;

    // Annotation:
    // A: we haven't defined fruit in the scope, only declared it
    // B: mango was assigned in this block
    // C: mango leaks out
    // D: global
  },

  exerciseH() {
    let num = 6;

    const fn1 = function() {
      let num = 4;

      // Log A: num

      if (num < 5) {
        const num = 9;

        fn2(num);

        const newNum = num;

        // Log B: newNum
      }

      newNum = num;

      // Log C: newNum
    };

    const fn2 = function(num){
      // Log D: num

      num = num + 1;

      // Log E: num
    };

    fn1();

    const result = [{A: 4}, {D: 9}, {E: 10}, {B: 9}, {C: 4}];
    return result;

    // Annotation:
    // A: function scope
    // D: passed num of 9 to the function
    // E: 9 + 1 is 10
    // B: 9 again because fn2 didn't change anything in this scope
    // C: back to function scope
  },

  exerciseI() {
    var hunger = 100;

    function eatSnack() {
      hunger -= 25;
      // Log A: hunger
      gorgeYourself();

      function gorgeYourself() {
        const hunger = 0;
        // Log B: hunger
      }

      // Log C: hunger
    }

    eatSnack();

    hunger += 5;
    // Log D: hunger

    eatSnack();
    // Log E: hunger

    const result = [{A: 75}, {B: 0}, {C: 75}, {D: 80}, {A: 55}, {B: 0}, {C: 55}, {E: 55}];
    return result;

    // Annotation:
    // A: modifying the global variable
    // B: functional scope
    // C: back to that modified global variable
    // D: modify the global again
    // E: repeat A-C again, modifying the global one more time
  },

  exerciseJ() {
    let sandwich = 'ketchup sandwich';

    // Log A: sandwich

    const addChipotle = () => {
      // Log B: toppings
      var toppings = 'chipotle sauce';

      if (toppings === 'chipotle sauce') {
        sandwich = 'not a mediocre sandwich';
      }

      // Log C: sandwich
    };

    const addCheese = () => {
      let cheeseTopping = 'gouda';
      // Log D: cheeseTopping

      const shesTheManReference = () => {
        amandaBynes = 'National Treasure';
      };

      shesTheManReference();
    };

    cheeseTopping = 'kraft';
    addCheese();

    addChipotle();
    // Log E: sandwich
    // Log F: amandaBynes

    const result = [{A: 'ketchup sandwich'}, {D: 'gouda'}, {B: undefined}, {C: 'not a mediocre sandwich'}, {E: 'not a mediocre sandwich'}, {F: 'National Treasure'}];
    return result;

    // Annotation:
    // A: global
    // D: function scope
    // B: declared but not defined yet
    // C: modifying global variable
    // E: same modified global
    // F: hoisted
  },

  exerciseK() {
    let num = 10;

    function foo() {
      if (num > 5) {
        num = 7;
      }
      // Log A: num
    }

    foo();

    // Log B: num

    const result = [{A: 7}, {B: 7}];
    return result;

    // Annotation:
    // reassigning global variable inside the if block
  },

  exerciseL() {
    let grade = 100;

    function losePoints() {
      grade = 90;

      function addPoints() {
        const grade = 95;

        if (grade === 95) {
          let grade = 97;
        }

        // Log A: grade
      }

      addPoints();

      // Log B: grade
    }

    losePoints();

    // Log C: grade

    const result = [{A: 95}, {B: 90}, {C: 90}];
    return result;

    // Annotation:
    // A: inner function scope
    // B: modified global variable
    // C: same as B
  },

  exerciseM() {
    var num = 5;

    function first() {
      // Log A: num
      num = 6;
      // Log B: num
    }

    function second() {
      // Log C: num
      let num = 7;
    }

    first();
    second();

    // Log D: num

    const result = [{A: 5}, {B: 6}, {C: 'reference error'}, {D: 6}];
    return result;

    // Annotation:
    // A: look at global variable
    // B: modified global variable
    // C: num hasn't been defined yet
    // D: same modified global variable
  },

  exerciseN() {
    var instructor = 'Pam';

    function changeInstructor() {

      // Log A: instructor

      if (instructor === 'Brittany') {
        const instructor = 'Nathaniel';
      } else {
        let instructor = 'Brittany';
      }

      // Log B: instructor

      function rename() {
        instructor = 'Louisa';
        // Log C: instructor
      }

      rename();

      // Log D: instructor

    }

    // Log E: instructor

    changeInstructor();

    // Log F: instructor

    const result = [{E: 'Pam'}, {A: 'Pam'}, {B: 'Pam'}, {C: 'Louisa'}, {D: 'Louisa'}, {F: 'Louisa'}];
    return result;

    // Annotation:
    // E: global
    // A: still that global variable
    // B: STILL global
    // C: reassigned global to 'Louisa'
    // D: that new global value
    // F: still that new value
  },

  exerciseO() {
    var shoe = 'flipflop';

    function putOnShoe() {
      // Log A: shoe
      var shoe = 'boot';
    }

    // Log B: shoe
    putOnShoe();
    // Log C: shoe

    const result = [{B: 'flipflop'}, {A: undefined}, {C: 'flipflop'}];
    return result;

    // Annotation:
    // B: global
    // A: declared but not defined yet
    // C: back to global
  },

  exerciseP() {
    let lunch;
    function orderLunch() {
      if (lunch) {
        // Log A: lunch
        let lunch = 'sandwich';
      }

      if (typeof lunch === 'undefined') {
        lunch = 'soup';
      }

      // Log B: lunch
    }

    orderLunch();

    // Log C: lunch

    const result = [{B: 'soup'}, {C: 'soup'}];
    return result;

    // Annotation:
    // B: reassigned global (never get to A because undefined is falsey)
    // C: same reassigned global
  },

  exerciseQ(){
    let myKid = 'Pandora';
    let wildKids = ['Antigone'];

    let myCrazyKidAntics = kid => {
      // Log A: kid
      wildKids.push(kid);
      // Log B: wildKids

      let drawOnTheWall = () => {
        let myKid = 'Mandy';
        // Log C: myKid
        return `That wild kid ${myKid}, drew on the wall!`;
      };

      drawOnTheWall();

      let myAmazingKid = () => {
        let myKid = wildKids.shift();
        // Log D: myKid
        return `That kid ${myKid}, is AMAZING!`;
      };

      myAmazingKid();
      // Log E: myKid;
      return `All these kids are wild, especially, ${myKid}!`;
    };

    myCrazyKidAntics(myKid);

    const result = [{A: 'Pandora'}, {B: ['Antigone', 'Pandora']}, {C: 'Mandy'}, {D: 'Antigone'}, {E: 'Pandora'}];
    return result;

    // Annotation:
    // A: global
    // B: modified global
    // C: functional
    // D: functional
    // E: global
  },

  exerciseR() {
    let myName = 'Rody';
    // Log A: myName

    const parentFunc = () => {
      myName += 'Toy';
      // Log B: myName

      let innerFunc = () => {
        let myName = 'Tesla';
        // Log C: myName
      };

      innerFunc();
      myName += 'Daniels';
    };

    parentFunc();
    // Log D: myName

    const result = [{A: 'Rody'}, {B: 'RodyToy'}, {C: 'Tesla'}, {D: 'RodyToyDaniels'}];
    return result;

    // Annotation:
    // A: global
    // B: modified global
    // C: functional
    // D: modified global again
  }
};

module.exports = scope;
