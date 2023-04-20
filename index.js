const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign. `;
  let answer = await ask(welcomeMessage);



  console.log('Now write your code to make this work! ');
  process.exit();
}


//questions about state machines
// -------------------------------------MovementStateMachine------------------------------------------------ //

const bldgMap = {
  'Front Porch': {'Driveway': 000, 'Foyer': 250},
    'Driveway': {'Front Porch': 250, 'Car' : 000},
    'Foyer': {'Front Porch': 250, 'Hall': 250, 'Stairs btw 1st and 2nd': 5000, 'Dining': 250},
    'Dining': {'Foyer': 250, 'Kitchen': 250}

}


class Player {
  constructor (name, mainSkill, dispo, chi, currentLocation) {
  this.name = name
  this.mainSkill = mainSkill
  this.dispo = dispo
  this.chi = chi
  this.currentLocation = currentLocation
 
  }
//method to move between locations
  move (newLocation) {
      const possMoves = bldgMap[this.currentLocation]
      if (newLocation in possMoves) {

          if (possMoves[newLocation] > this.chi) {
          console.log('Alas, Grasshopper, you are not ready to move here. ')
          //chi refers to the value of the key of whatever newLocation they're referring
          } else {

          console.log(`Moving to ${newLocation}... `)
          this.currentLocation = newLocation
          }
      } else {

        console.log(`Cannot move to ${newLocation}. Try Again. `) 
      }
  }
//method to list possible moves from current location
//doesn't work yet
  getMoves () {
      const possMoves = bldgMap[this.currentLocation]
      for (const m in possMoves) {
          if (possMoves[m] <= this.chi) {
              console.log(m.toUpperCase())
          }
      }
  }        
}      

  


//add method to move  somewhere else

const playerOne = new Player('Chuck', 'Willful Ignorance', 'Smug', 40000, 'Front Porch')

console.log(playerOne)

console.log(playerOne.currentLocation.getMoves)

playerOne.move('Driveway')

console.log(playerOne.currentLocation)
console.log(playerOne.chi)

console.log(playerOne.getMoves)

playerOne.move('Front Porch')

console.log(playerOne.currentLocation)
console.log(playerOne.chi)

console.log(playerOne.getMoves)

playerOne.move('Foyer')

console.log(playerOne.currentLocation)
console.log(playerOne.chi)

console.log(playerOne.getMoves)


// * The current room
//   * Room description (immutable)
//   * Room connection (immutable)
//   * Room inventory (mutable)
// * Other rooms
//   * Room description (immutable)
//   * Room connection (immutable)
//   * Room inventory (mutable)
// * The player
//   * Player inventory (mutable)
//   * Player status (mutable)

// ---------------------------------Room Classes--------------------------------------------------- //

//Room Class
class Room {
  constructor (name, connections, itemsOfInterest, elevation) {
    this.name = name
    this.connections = connections //mutable?
    this.itemsOfInterest = location
    this.elevation = elevation

  }
}


// class Floor extends Room {
//   constructor (name, elevation, statusEffect) {
//     this.name = name
//     this.elevation = elevation
//     this.statusEffect = statusEffect
//   }
// }

// class Reality extends Location {
//   constructor (name, mutable?, immutable?) {
//     this.name = name
//   }



// -------------------------------------Item ClassDeclaration-------------------------------------------------- //



class RoomItems {
  constructor (id, name, value, weight) {
    this.id = id
    this.name = name
    this.value = value
    this.weight = weight
  }
}


// -------------------------------------ClassPlayerInventory-------------------------------------------------- //

class Inventory {
  constructor () {
    this.items = []  // array of two-element arrays, [[item, quant], [item, quant], etc.]
  }
// -------------------------------------PlayerAddInventoryFunction-------------------------------------------------- //
  addItem (item, quantity) {
    this.items.push([item, quantity])
  }
}


// -------------------------------------playerInput------------------------------------------------- //

// should take a 2 word command and then differentiate between action and item

// async function await ask 

