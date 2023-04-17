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
On the door is a handwritten sign.`;
  let answer = await ask(welcomeMessage);
  console.log('Now write your code to make this work!');
  process.exit();
}


//questions about state machines


* The current room
  * Room description (immutable)
  * Room connection (immutable)
  * Room inventory (mutable)
* Other rooms
  * Room description (immutable)
  * Room connection (immutable)
  * Room inventory (mutable)
* The player
  * Player inventory (mutable)
  * Player status (mutable)

//Room Class
class Room {
  constructor (name, connections, itemsOfInterest) {
    this.name = name
    this.connections = connections
    this.itemsOfInterest = location
  }
}

class Floor {
  constructor (name, elevation, statusEffect) {
    this.name = name
    this.elevation = elevation
    this.statusEffect = statusEffect
  }
}

// class Reality extends Location {
//   constructor (name, mutable?, immutable?) {
//     this.name = name
//   }



// -------------------------------------ClassDeclaration-------------------------------------------------- //
class Room {

  constructor (name, currOpen, location) {
    this.name = name
    
    this.currOpen = currOpen  // boolean
    this.location = location  // instance of Location class
    this.inventory = new Inventory(this)
  }

  addInv (Inv) {
    total = 0
    for (const quantitem of Inv) {
      const [item, quantity] = quantitem
      if (this.inventory.items[item.id] < quantity) {
        // console.log('Cannot process cart, not enough of some item(s)')
        // return
      }
      // total += (item.cost + (item.cost * this.location.taxpct).toPrecision(2)) * quantity

    }
  }
}

class Inventory {
  constructor (store) {
    this.store = store
    this.items = {}   // object storing {item id: quantity}
  }

  AddItem (item, quantity) {
    if (item.id in this.items) {
      this.items[item.id] += quantity
    } else {
      this.items[item.id] = quantity
    }
  }
}

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