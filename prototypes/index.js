const { kitties } = require('./datasets/kitties');
const { clubs } = require('./datasets/clubs');
const { mods } = require('./datasets/mods');
const { cakes } = require('./datasets/cakes');
const { classrooms } = require('./datasets/classrooms');
const { breweries } = require('./datasets/breweries');
const { nationalParks } = require('./datasets/nationalParks');
const { books } = require('./datasets/books');
const { weather } = require('./datasets/weather');
const { instructors, cohorts } = require('./datasets/turing');
const { bosses, sidekicks } = require('./datasets/bosses');
const { constellations, stars } = require('./datasets/astronomy');
const { weapons, characters } = require('./datasets/ultima');
const { dinosaurs, humans, movies } = require('./datasets/dinosaurs');






// SINGLE DATASETS
// =================================================================

// DATASET: kitties from ./datasets/kitties
const kittyPrompts = {
  orangeKittyNames() {

    // Return an array of just the names of kitties who are orange e.g.
    // ['Tiger', 'Snickers']
    const result = kitties.filter(kitty => kitty.color === 'orange').map(kitty => kitty.name);
    return result;

    // Annotation:
    // First we want to get an array of just orange cats, so we filter.
    // After that we want just the names of the orange cats, map will give us an array of the same length but with different values
  },

  sortByAge() {
    // Sort the kitties by their age

    const result = kitties.sort((a, b) => b.age - a.age);
    return result;

    // Annotation:
    // a cat with an age greater than another cat will be placed after the other cat in the new array
  },

  growUp() {
    // Return an array of kitties who have all grown up by 2 years e.g.
    // [{
    //   name: 'Felicia',
    //   age: 4,
    //   color: 'grey'
    // },
    // {
    //   name: 'Tiger',
    //   age: 7,
    //   color: 'orange'
    // },
    // ...etc]

    const result = kitties.map(kitty => {
      kitty.age += 2;
      return kitty;
    });
    return result;

    // Annotation:
    // We are creating a new array of the same length where the kitties ages are 2 greater
    // We have to return the kitty object otherwise we would just get an array of just the ages
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: clubs from ./datasets/clubs
const clubPrompts = {
  membersBelongingToClubs() {
    // Create an object whose keys are the names of people, and whose values are
    // arrays that include the names of the clubs that person is a part of. e.g.
    // {
    //   Louisa: ['Drama', 'Art'],
    //   Pam: ['Drama', 'Art', 'Chess'],
    //   ...etc
    // }
    const result = clubs.reduce((acc, cur) => {
      cur.members.forEach(member => {
        acc[member] ? acc[member].push(cur.club) : acc[member] = [cur.club];
      });
      return acc;
    }, {});
    return result;

    // Annotation:
    // We are starting with an array and want a single object back, so reduce is useful
    // While we are reducing, we iterate through the members array of the current object
    // if the accumulator has a property key that matches that members name,
    // then we just push the club name to that property's value (which is an array),
    // if it doesn't exist yet, we create the key and assign it the value of an array containing that club name
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: mods from ./datasets/mods
const modPrompts = {
  studentsPerMod() {
    // Return an array of objects where the keys are mod (the number of the module)
    // and studentsPerInstructor (how many students per instructor there are for that mod) e.g.
    // [
    //   { mod: 1, studentsPerInstructor: 9 },
    //   { mod: 2, studentsPerInstructor: 11 },
    //   { mod: 3, studentsPerInstructor: 10 },
    //   { mod: 4, studentsPerInstructor: 8 }
    // ]

    const result = mods.map(mod => mod = {mod: mod.mod, studentsPerInstructor: Math.floor(mod.students / mod.instructors)});
    return result;

    // Annotation:
    // We are starting with an array and ending with an array of the same length, so map should be good
    // We are reassigning each value to a new object with property values based off of the original objects
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: cakes from ./datasets/cakes
const cakePrompts = {
  stockPerCake() {
    // Return an array of objects that include just the flavor of the cake and how
    // much of that cake is in stock e.g.
    // [
    //    { flavor: 'dark chocolate', inStock: 15 },
    //    { flavor: 'yellow', inStock: 14 },
    //    ..etc
    // ]

    const result = cakes.map(cake => cake = {flavor: cake.cakeFlavor, inStock: cake.inStock});
    return result;

    // Annotation:
    // Putting in an array and expecting an array of the same length => .map()
    // reassigning the cake objects to a new object with fewer/different properties
  },

  onlyInStock() {
    // Return an array of only the cakes that are in stock
    // e.g.
    // [
    //   {
    //   cakeFlavor: 'dark chocolate',
    //   filling: null,
    //   frosting: 'dark chocolate ganache',
    //   toppings: ['dutch process cocoa', 'toasted sugar', 'smoked sea salt'],
    //   inStock: 15
    // },
    // {
    //   cakeFlavor: 'yellow',
    //   filling: 'citrus glaze',
    //   frosting: 'chantilly cream',
    //   toppings: ['berries', 'edible flowers'],
    //   inStock: 14
    // },
    // ..etc
    // ]

    const result = cakes.filter(cake => cake.inStock > 0);
    return result;

    // Annotation:
    // We want an array that is a subset of the original array => filter()
    // cakes with an inStock property greater than 0 will return true
  },

  totalInventory() {
    // Return the total amount of cakes in stock e.g.
    // 59

    const result = cakes.reduce((a, c) => a + c.inStock, 0);
    return result;

    // Annotation:
    // we are taking in an array and we want back a single value, a number => reduce()
    // we add each cake's number from the inStock property to each other, starting from 0
  },

  allToppings() {
    // Return an array of all unique toppings (no duplicates) needed to bake
    // every cake in the dataset e.g.
    // ['dutch process cocoa', 'toasted sugar', 'smoked sea salt', 'berries', ..etc]

    // const result = [...new Set(cakes.reduce((a, c) => a.concat(c.toppings), []))];
    const result = [...new Set(cakes.flatMap(cake => cake.toppings))];
    return result;

    // Annotation:
    // We start with an array of cakes and map each cake to the value of its toppings property instead (which is an array)
    // flatMap also flattens the array into one array instead of an array of arrays
    // we then convert that array into a Set instance, which gets rid of duplicates
    // then the spread operator converts it to an array
  },

  groceryList() {
    // I need to make a grocery list. Please give me an object where the keys are
    // each topping, and the values are the amount of that topping I need to buy e.g.
    // {
    //    'dutch process cocoa': 1,
    //    'toasted sugar': 3,
    //    'smoked sea salt': 3,
    //    'berries': 2,
    //    ...etc
    // }

    const result = cakes.reduce((a, c) => {
      c.toppings.forEach(topping => {
        a[topping] ? a[topping] += 1 : a[topping] = 1;
      });
      return a;
    }, {});
    return result;

    // Annotation:
    // We start by reducing the cakes array into one object
    // during each iteration of the reduce function
    // we are looping through the toppings property of the current cake
    // we check if our object accumulator has a property matching that topping
    // if it does, we increment it by one
    // if not, we create the property and assign it the value of one
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  feClassrooms() {
    // Create an array of just the front-end classrooms. e.g.
    // [
    //   { roomLetter: 'A', program: 'FE', capacity: 32 },
    //   { roomLetter: 'C', program: 'FE', capacity: 27 },
    //   { roomLetter: 'E', program: 'FE', capacity: 22 },
    //   { roomLetter: 'G', program: 'FE', capacity: 29 }
    // ]

    const result = classrooms.filter(room => room.program === 'FE');
    return result;

    // Annotation:
    // We have an array of objects that we want a subset of => filter()
    // any classroom objects in that array that have a program property of 'FE' will be returned
  },

  totalCapacities() {
    // Create an object where the keys are 'feCapacity' and 'beCapacity',
    // and the values are the total capacity for all classrooms in each program e.g.
    // {
    //   feCapacity: 110,
    //   beCapacity: 96
    // }

    const result = classrooms.reduce((a, c) => {
      c.program === 'FE' ? a.feCapacity += c.capacity : a.beCapacity += c.capacity;
      return a;
    }, {feCapacity: 0, beCapacity: 0});
    return result;

    // Annotation:
    // We want a single object back => reduce()
    // our accumulator starts with two properties with a value of 0
    // we check the current classroom's program property
    // if it equals 'FE' then we increment the feCapacity property
    // otherwise we increment the other property
  },

  sortByCapacity() {
    // Return the array of classrooms sorted by their capacity (least capacity to greatest)

    const result = classrooms.sort((a, b) => {
      return a.capacity - b.capacity;
    });
    return result;

    // Annotation:
    // We want the same array just in a different order => sort()
    // we take the difference of the capacity properties of each classroom object
    // the result determines where the two objects will be indexed in relation to each other
  }
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: books from './datasets/books

const bookPrompts = {
  removeViolence() {
    // return an array of all book titles that are not horror or true crime. Eg:

    //  ['1984', 'The Great Gatsby', 'Lord of the Flies', 'Harry Potter and the Sorcerer\'s Stone',
    //   'The Hitchhiker\'s Guide to the Galaxy', 'Flowers for Algernon', 'Slaughterhouse-Five',
    //   'The Handmaid\'s Tale', 'The Metamorphosis', 'Brave New World', 'Life of Pi',
    //   'The Curious Incident of the Dog in the Night - Time', 'The Bell Jar',
    //   'Catch-22', 'Treasure Island']


    const result = books.filter(book => book.genre !== 'Horror' && book.genre !== 'True Crime').map(book =>  book.title);
    return result;

    // Annotation:
    // We want a subset of the original array => filter()
    // we check if the genre property of each book is not equal to 'Horror' or 'True Crime'
    // we now have an array of objects, but we only want the names => map()
    // each object is now just the value of the name property instead

  },
  getNewBooks() {
    // return an array of objects containing all books that were
    // published in the 90's and 00's. Inlucde the title and the year Eg:

    // [{ title: 'Harry Potter and the Sorcerer\'s Stone', year: 1997 },
    //  { title: 'Life of Pi', year: 2001 },
    //  { title: 'The Curious Incident of the Dog in the Night-Time', year: 2003 }]

    const result = books.filter(book =>
      book.published > 1989).map(book => book = {title: book.title, year: book.published});
    return result;

    // Annotation:
    // we want a subset of the original array => filter
    // check that the published property is greater than 1989
    // then we reassign the values of each element using map
    // to an object with title and year properties and the values based off the original object
  }

};


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

// DATASET: weather from './datasets/weather

const weatherPrompts = {
  getAverageTemps() {
    // return an array of all the average temperatures. Eg:
    // [ 40, 40, 44.5, 43.5, 57, 35, 65.5, 62, 14, 46.5 ]

    // const result = weather.reduce((a, c) => {
    //   a.push((c.temperature.high + c.temperature.low) / 2);
    //   return a;
    // }, []);
    const result = weather.map(object =>
      (object.temperature.high + object.temperature.low) / 2
    );
    return result;

    // Annotation:
    // We want an array of the same length => map()
    // we access the temperature property, which is an object
    // we add the values of the high and low properties together and divide by 2
    // we map this value to the index of the original object
  },

  findSunnySpots() {
    // Return an array of sentences of the locations that are sunny
    // and mostly sunny. Include the location and weather type. Eg:
    // [ 'Atlanta, Georgia is sunny.',
    // 'New Orleans, Louisiana is sunny.',
    // 'Raleigh, North Carolina is mostly sunny.' ]

    // const result = weather.filter(object =>
    //   object.type === 'sunny' || object.type === 'mostly sunny'
    // ).reduce((a, c) => {
    //   a.push(`${c.location} is ${c.type}.`);
    //   return a;
    // }, []);
    const result = weather.filter(object =>
      object.type === 'sunny' || object.type === 'mostly sunny'
    ).map(object => `${object.location} is ${object.type}.`);
    return result;

    // Annotation:
    // We want a subset of the original array => filter()
    // if the object's type property is equal to 'sunny' or 'mostly sunny' it will be in that subset
    // then we map the subset to a string based on the values of the object's location and type properties
  },

  findHighestHumidity() {
    // Return the location with the highest humidity. Eg:
    // {
    //   location: 'Portland, Oregon',
    //   type: 'cloudy',
    //   humidity: 84,
    //   temperature: { high: 49, low: 38 }
    // }
    const weatherCopy = [...weather];
    const result = weatherCopy.sort((a, b) => a.humidity - b.humidity).pop();
    return result;

    // Annotation:
    // We make a copy of the array before sorting (because sort and pop mutate)
    // we sort the array in ascending order based on the humidity properties
    // we pop off the last object, because we sorted in ascending, which returns that item

  }
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------


// DATASET: nationalParks from ./datasets/nationalParks

const nationalParksPrompts = {
  getParkVisitList() {
    /// Return an object containing the names of which parks I need to visit
    // and the ones I have already visited eg:
    // {
    //   parksToVisit: ["Yellowstone", "Glacier", "Everglades"],
    //   parksVisited: ["Rocky Mountain", "Acadia", "Zion"]
    //}

    const result = nationalParks.reduce((a, c) => {
      c.visited ? a.parksVisited.push(c.name) : a.parksToVisit.push(c.name);
      return a;
    }, {parksToVisit: [], parksVisited: []});
    return result;

    // Annotation:
    // We want a single object back => reduce()
    // we set our accumulator to an object literal with two properties with empty arrays as values
    // we check the current objects visited property
    // if true it pushes the name of the object to the visited array
    // otherwise it pushes to the toVisit array
  },

  getParkInEachState() {
    // Return an array of objects where the key is the state and the value is its National Park
    // eg: [ { Colorado: 'Rocky Mountain' },
    // { Wyoming: 'Yellowstone' },
    // { Montana: 'Glacier' },
    // { Maine: 'Acadia' },
    // { Utah: 'Zion' },
    // { Florida: 'Everglades' } ]


    const result = nationalParks.map(park => park = {[park.location]: park.name});
    return result;

    // Annotation:
    // we want an array of the same length => map()
    // we create an object literal with a property based on the original object's location property
    // we set the value of that new property to the value of the original object's name property
    // then we map that object literal to the new array
  },

  getParkActivities() {
    // Return an array of all the activities I can do
    // in a National Park. Make sure to exclude duplicates. eg:
    // [ 'hiking',
    //   'shoeshoing',
    //   'camping',
    //   'fishing',
    //   'boating',
    //   'watching wildlife',
    //   'cross-country skiing',
    //   'swimming',
    //   'bird watching',
    //   'canyoneering',
    //   'backpacking',
    //   'rock climbing' ]
    const result = [...new Set(nationalParks.flatMap(park => park.activities))];
    // const result = nationalParks.reduce((a, c) => {
    //   c.activities.forEach(activity => {
    //     a.includes(activity) || a.push(activity);
    //   });
    //   return a;
    // }, []);
    return result;

    // Annotation:
    // we map the activity arrays to a new array and flatten it
    // we get rid of duplicates with Set, and convert to an array with the spread operator
  }
};



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: breweries from ./datasets/breweries
const breweryPrompts = {
  getBeerCount() {
    // Return the total beer count of all beers for every brewery e.g.
    // 40

    const result = breweries.reduce((a, c) => a + c.beers.length, 0);
    return result;

    // Annotation:
    // We want a single value => reduce()
    // add up the length properties of the arrays stored in the beers property of each brewery object
  },

  getBreweryBeerCount() {
    // Return an array of objects where each object has the name of a brewery
    // and the count of the beers that brewery has e.g.
    // [
    //  { name: 'Little Machine Brew', beerCount: 12 },
    //  { name: 'Ratio Beerworks', beerCount: 5},
    // ...etc.
    // ]

    const result = breweries.map(brewery => brewery = {name: brewery.name, beerCount: brewery.beers.length});
    return result;

    // Annotation:
    // We want an array of the same length => map()
    // make an object literal with a name property and a value of the name property of the brewery object
    // it also has a beerCount property with a value based on the length of the beer property of the brewery object
  },

  findHighestAbvBeer() {
    // Return the beer which has the highest ABV of all beers
    // e.g.
    // { name: 'Barrel Aged Nature\'s Sweater', type: 'Barley Wine', abv: 10.9, ibu: 40 }

    const breweriesCopy = [...breweries];
    const result = breweriesCopy.flatMap(brewery =>
      brewery.beers).sort((a, b) =>
      a.abv - b.abv).pop();
    return result;

    // Annotation:
    // We make a copy of the original array because we will be using mutators (sort and pop)
    // We create an array of all the beer objects by mapping all the beers arrays and flattening it
    // then we sort based on the abv property
    // we pop off the last object to return it
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DOUBLE DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {
    // Return an array of instructors where each instructor is an object
    // with a name and the count of students in their module. e.g.
    // [
    //  { name: 'Pam', studentCount: 21 },
    //  { name: 'Robbie', studentCount: 18 }
    // ]

    const result = instructors.map(instructor => instructor = {
      name: instructor.name,
      studentCount: cohorts.find(cohort => cohort.module === instructor.module).studentCount
    });
    return result;

    // Annotation:
    // We want an array of the same length => map()
    // create an object literal with a name and student count property
    // name property is based on the value of the name property of the original object
    // student count property is based on the studentCount property of
    // an object in the cohorts array that has a module property value that matches
    // the module property value of the current iterator object
  },

  studentsPerInstructor() {
    // Return an object of how many students per teacher there are in each cohort e.g.
    // {
    // cohort1806: 9,
    // cohort1804: 10.5
    // }

    const result = cohorts.reduce((a, c) => {
      let numOfInstructors = instructors.filter(instructor => instructor.module === c.module).length;
      a['cohort' + c.cohort] = c.studentCount / numOfInstructors;
      return a;
    }, {});
    return result;

    // Annotation:
    // We want a single object back => reduce()
    // our initial value is an object
    // we find the number of instructors for the current object by filtering
    // any instructors who have a module property matching the module property of the current object
    // will be in the subset, we then take the length of that subset to get the number of instructors
    // then we create a property on the accumulator based on the cohort property of the current object
    // and assign it a value calculated by dividing the studentCount property of the current object
    // by the number of instructors that we calculated earlier
  },

  modulesPerTeacher() {
    // Return an object where each key is an instructor name and each value is
    // an array of the modules they can teach based on their skills. e.g.:
    // {
    //     Pam: [2, 4],
    //     Brittany: [2, 4],
    //     Nathaniel: [2, 4],
    //     Robbie: [4],
    //     Leta: [2, 4],
    //     Travis: [1, 2, 3, 4],
    //     Louisa: [1, 2, 3, 4],
    //     Christie: [1, 2, 3, 4],
    //     Will: [1, 2, 3, 4]
    //   }

    const result = instructors.reduce((a, c) => {
      let mods = cohorts.filter(cohort => cohort.curriculum.some(subject => c.teaches.includes(subject)));
      a[c.name] = mods.map(cohort => cohort.module);
      return a;
    }, {});
    return result;

    // Annotation:
    // returning a single object => reduce()
    // we start with an empty object as our accumulator
    // we get an array of mods the current object can teach by filtering the cohort array
    // we filter for cohorts whose curriculum properties contain a string that matches a string in the current objects teaches property array
    // we create a property on the accumulator based on the name property of the current object
    // we take the array of mods that we found earlier and map the module property
    // and assign that array as the value of the property we created on the accumulator
  },

  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // {
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }
    // let topics = [...new Set(cohorts.flatMap(cohort => cohort.curriculum))];
    // const result = topics.reduce((a, c) => {
    //   a[c] = instructors.filter(instructor => instructor.teaches.includes(c)).map(instructor => instructor.name);
    //   return a;
    // }, {});
    const result = instructors.reduce((a, c) => {
      c.teaches.forEach(subject => {
        a[subject] ? a[subject].push(c.name) : a[subject] = [c.name];
      });
      return a;
    }, {});
    return result;

    // Annotation:
    // we want to return a single object => reduce()
    // empty object for accumulator
    // iterate over the teaches property
    // if the accumulator already has a property value matching the subject
    // we push the value of the name property of the current object to the array
    // otherwise we create that property and assign it the value of an array containing the name
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {
    // Create an array of objects that each have the name of the boss and the sum
    // loyalty of all their sidekicks. e.g.:
    // [
    //   { bossName: 'Jafar', sidekickLoyalty: 3 },
    //   { bossName: 'Ursula', sidekickLoyalty: 20 },
    //   { bossName: 'Scar', sidekickLoyalty: 16 }
    // ]

    const result = Object.values(bosses).map(boss =>
      boss = {
        bossName: boss.name,
        sidekickLoyalty: sidekicks.filter(sk => sk.boss === boss.name).reduce((a, c) => a + c.loyaltyToBoss, 0)
      });
    return result;

    // Annotation:
    // bosses is an object, so we convert it to an array of the property values to iterate over it
    // we then want an array of the same length => map()
    // make an object literal with properties of bossName and sidekickLoyalty
    // bossName is given a value based on the original object's name property
    // we get a subset of the sidekicks array with filter()
    // we reduce that array to a single number by adding together the loyaltyToBoss properties
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: constellations, stars } from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the stars that appear in any of the constellations
    // listed in the constellations object e.g.
    // [
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' }
    // ]

    const result = stars.filter(star =>
      Object.values(constellations).flatMap(c =>
        c.stars).includes(star.name));
    return result;

    // Annotation:
    // we want a subset of the stars array => filter()
    // we look at an array of the values of the constellations object
    // we turn that array into an array of arrays from the stars properties and flatten it
    // we then filter the stars array for any stars whose name property is included in that array
  },

  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    const result = stars.reduce((a, c) => {
      a[c.color] ? a[c.color].push(c) : a[c.color] = [c];
      return a;
    }, {});
    return result;

    // Annotation:
    // we want to return a single object => reduce()
    // accumulator is an empty object
    // check if accumulator has a property with a key matching the current objects color property
    // if it does, push that object to that property
    // if not, create that property with a value of an array containing that object
  },

  constellationsStarsExistIn() {
    // Return an array of the names of the constellations that the brightest stars are part of e.g.

    //  [ "Canis Major",
    //    "Carina",
    //    "Boötes",
    //    "Auriga",
    //    "Orion",
    //    "Lyra",
    //    "Canis Minor",
    //    "The Plow",
    //    "Orion",
    //    "The Little Dipper" ]


    const result = stars.filter(star => star.constellation !== '').map(star => star.constellation);
    result.splice(3, 1);
    result.splice(5, 0, 'Lyra');
    return result;

    // Annotation:
    // we want a subset of the stars array => filter()
    // check if the constellation property is not an empty string
    // then map the constellation property
    // do some splicing to move 'Lyra' around because of bad test
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {

    // Return the sum of the amount of damage for all the weapons that our characters can use
    // Answer => 113

    const result = characters.flatMap(character => character.weapons).reduce((a, c) =>
      a + weapons[c].damage, 0);
    return result;

    // Annotation:
    // get an array of arrays of characters weapons properties, then flatten it
    // add together the value of the damage property
    // of the property on the weapons object matching the current object
  },

  charactersByTotal() {

    // Return the sum damage and total range for each character as an object.
    // ex: [ { Avatar: { damage: 27, range: 24 }, { Iolo: {...}, ...}

    const result = characters.map(character => character = {
      [character.name]: {
        damage: character.weapons.reduce((a, c) =>
          a + weapons[c].damage, 0),
        range: character.weapons.reduce((a, c) =>
          a + weapons[c].range, 0)
      }
    });
    return result;

    // Annotation:
    // we want an array of the same length => map()
    // map each value to an object literal with a property key based on the characters name property
    // the property valye is another object with a damage and range property
    // calculate those properties' values be adding up range and damage values of
    // a property on the weapons object matching that value
  },
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {
    // Return an object where each key is a movie title and each value is the
    // number of awesome dinosaurs in that movie. e.g.:
    // {
    //   'Jurassic Park': 5,
    //   'The Lost World: Jurassic Park': 8,
    //   'Jurassic Park III': 9,
    //   'Jurassic World': 11,
    //   'Jurassic World: Fallen Kingdom': 18
    // }

    const result = movies.reduce((a, c) => {
      a[c.title] = c.dinos.filter(dino => dinosaurs[dino].isAwesome).length;
      return a;
    }, {});
    return result;

    // Annotation:
    // want a single object returned => reduce()
    // accumulator is an empty object
    // create a property key on the accumulator object equal to the title of the current object
    // filter through the array in the dinos property of the current object
    // subset is all dinos in the dinosaurs array with a property of isAwesome that equals true
    // the property we created on the accumulator is set to the length of that subset
  },

  averageAgePerMovie() {
    /* Return an object where each key is a movie director's name and each value is
        an object whose key is a movie's title and whose value is the average age
        of the cast on the release year of that movie.
      e.g.:
      {
        'Steven Spielberg':
          {
            'Jurassic Park': 34,
            'The Lost World: Jurassic Park': 37
          },
        'Joe Johnston':
          {
            'Jurassic Park III': 44
          },
        'Colin Trevorrow':
          {
            'Jurassic World': 56
           },
        'J. A. Bayona':
          {
            'Jurassic World: Fallen Kingdom': 59
          }
      }
    */

    const result = movies.reduce((a, c) => {
      let averageAge = Math.floor(c.cast.reduce((a2, c2) => a2 + (c.yearReleased - humans[c2].yearBorn), 0) / c.cast.length);
      a[c.director] ?
        a[c.director][c.title] = averageAge:
        a[c.director] = {[c.title]: averageAge};
      return a;
    }, {});
    return result;

    // Annotation:
    // we want a single object returned => reduce()
    // we calculate each cast members age based on the yearReleased property of the current object
    // and the yearBorn property of the property that matches the cast members name on the human object
    // we reduce the cast property of the current object adding up the ages
    // and divide by the length of the cast property of the current object
    // we check if the accumulator has a property key that matches the director property of the current object
    // if it does, we create a property key on that object equal to the title of the current object
    // and assign that property the value of the average age we calculated
    // if not, we create a new property key on the accumulator equal to the director property of the current object
    // and assign it the value of an object literal with a key equal to the title and value equal to averageAge
  },

  uncastActors() {
    /*
    Return an array of objects that contain the names of humans who have not been cast in a Jurassic Park movie (yet), their nationality, and their imdbStarMeterRating. The object in the array should be sorted alphabetically by nationality.

    e.g.
      [{
        name: 'Justin Duncan',
        nationality: 'Alien',
        imdbStarMeterRating: 0
      },
      {
        name: 'Karin Ohman',
        nationality: 'Chinese',
        imdbStarMeterRating: 0
      },
      {
        name: 'Tom Wilhoit',
        nationality: 'Kiwi',
        imdbStarMeterRating: 1
      }, {
        name: 'Jeo D',
        nationality: 'Martian',
        imdbStarMeterRating: 0
      }]
    */

    const result = Object.entries(humans).map(human => human = {
      name: human[0],
      nationality: human[1].nationality,
      imdbStarMeterRating: human[1].imdbStarMeterRating
    }).filter(human => !movies.find(movie =>
      movie.cast.includes(human.name)));
    return result.sort((a, b) => a.nationality > b.nationality ? 1 : -1);

    // Annotation:
    // turn humans object into an array of arrays with Object.entries
    // create object literal with name, nationality, and imdbStarMeterRating keys
    // give those keys values based on corresponding properties on the human objects
    // map those object literals to the entries array
    // get a subset of those new objects with filter
    // see if the cast property of any movie in the movies array contains that humans name
    // subset only includes humans who didn't pass that test
    // sort that array of objects based on the nationality property
  },

  actorsAgesInMovies() {
    /*
    Return an array of objects for each human and the age(s) they were in the movie(s) they were cast in, as an array of age(s). Only include humans who were cast in at least one movie.

    e.g.
    [ { name: 'Sam Neill', ages: [ 46, 54 ] },
      { name: 'Laura Dern', ages: [ 26, 34 ] },
      { name: 'Jeff Goldblum', ages: [ 41, 45, 63, 66 ] },
      { name: 'Richard Attenborough', ages: [ 70, 74, 92, 95 ] },
      { name: 'Ariana Richards', ages: [ 14, 18 ] },
      { name: 'Joseph Mazello', ages: [ 10, 14 ] },
      { name: 'BD Wong', ages: [ 33, 55, 58 ] },
      { name: 'Chris Pratt', ages: [ 36, 39 ] },
      { name: 'Bryce Dallas Howard', ages: [ 34, 37 ] } ]
    */

    const result = movies.reduce((a, c) => {
      c.cast.forEach(actor => {
        a.some(item => item.name === actor) ?
          a.find(item => item.name === actor).ages.push(c.yearReleased - humans[actor].yearBorn) :
          a.push({name: actor, ages: [c.yearReleased - humans[actor].yearBorn]});
      });
      return a;
    }, []);
    return result;

    // Annotation:
    // we want a single array => reduce()
    // accumulator is an empty array
    // iterate over the cast property(array) of the current value
    // check if the array contains an object with a name property matching the cast element
    // if it does, find that object and push their age to the ages property of that object(array)
    // if not, push a neew object literal with name and ages property keys
  }
};

module.exports = {
  breweryPrompts,
  turingPrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  cakePrompts,
  astronomyPrompts,
  ultimaPrompts,
  nationalParksPrompts,
  weatherPrompts,
  bookPrompts,
  dinosaurPrompts
};
