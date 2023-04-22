const { lookup } = require("dns");
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

let defaultText = "\033[39m";
let greenText = "\033[32m";
let yellowText = "\033[0;33m";
let redText = "\033[91m";
let blueText = "\033[94m";
let grayText = "\033[90m";

// ---------------------------------------ClassPlayerAndRelated----------------------------------------------- //

class Player {
  constructor(name, mainSkill, dispo, chi, currentLocation, Inventory) {
    this.name = name;
    this.mainSkill = mainSkill;
    this.dispo = dispo;
    this.chi = chi;
    this.currentLocation = currentLocation;
    this.Inventory = Inventory;
  }
}

// -------------------------------------ClassPlayerInventory-------------------------------------------------- //

class Inventory extends Player {
  constructor() {
    this.item = []; // array of two-element arrays, [[item, quant], [item, quant], etc.]
  }

  // -------------------------------------PlayerAddInventoryFunction-------------------------------------------------- //
  addItem(item, quantity) {
    this.items.push([item, quantity]);
  }
}

const playerOne = new Player(
  "Chuck",
  "Willful Ignorance",
  "Smug",
  40000,
  "Front Porch",
  ["cellphone, 1", "uber eats, 1"]
);

// ---------------------------------GameFiles--------------------------------------------------- //
var gameStatus = "pending"


const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. The doorknob has a keypad built-in.
On the door is a handwritten sign. \nNO UNAUTHORIZED VISITORS -This means you Carl
You are meant to Deliver the Uber Eats to someone at this address.`;

const prompt = `What do you do? >_`;

// ---------------------------------AsyncInterfaceLoop(s)-------------------------------------------------- //

start();

async function start() {
  
  gameStatus = "start"

  console.log(welcomeMessage)

  while (gameStatus !== "end") {
    let answer = await ask(prompt);
    
    if (answer == "checkStatus") {
    console.log(playerOne.dispo);

    //else if for menu
    } else if (answer == "menu") {
    console.log("menu");

    // else if for where?
    } else if (answer == "where") {
    console.log(playerOne.currentLocation);

    //else for help
    } else {
    console.log(`type "help" for a list commands`);
    }



}
//else for exit
process.exit();
}
// -------------------------------------MovementStateMachine------------------------------------------------ //


const bldgMap = {
  "Front Porch": { 
    Driveway: 000,
    Foyer: 250
  },
  Driveway: {
    "Front Porch": 250,
    Car: 000
  },
  Foyer: {
    "Front Porch": 250,
    Hall: 250,
    "Stairs btw 1st and 2nd": 5000,
    Dining: 250,
  },
  Dining: {
    Foyer: 250,
    Kitchen: 250
  },



  //method to move between locations

  move(newLocation) {
    const possMoves = bldgMap[this.currentLocation];
    if (newLocation in possMoves) {
      if (possMoves[newLocation] > this.chi) {
        console.log("Alas, Grasshopper, you are not ready to move here. ");
        //chi refers to the value of the key of whatever newLocation they're referring
      } else {
        console.log(`Moving to ${newLocation}... `);
        this.currentLocation = newLocation;
      }
    } else {
      console.log(`Cannot move to ${newLocation}. Try Again. `);
    }
  },

  //method to list possible moves from current location
  //doesn't work yet
  getMoves() {
    const possMoves = bldgMap[this.currentLocation];
    for (const m in possMoves) {
      if (possMoves[m] <= this.chi) {
        console.log(m.toLowerCase());
      } else {
        console.log("there are no moves, you are trapped\nGaMe OvEr!!!?!!?");
        process.exit();
      }
    }
  }
}


// playerOne.move("Driveway");

// console.log(playerOne.currentLocation);
// console.log(playerOne.chi);

// console.log(playerOne.getMoves);




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
  constructor(name, connections, RoomItem, locked, elevation) {
    this.name = name;
    this.connections = connections; //mutable?
    this.RoomItem = RoomItem; //extended to different class
    this.locked = Boolean;
    this.elevation = elevation;
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

class RoomItem extends Room {
  constructor(id, name, value, weight) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.weight = weight;
  }
}

// -------------------------------------playerInput------------------------------------------------- //

// should take a 2 word command and then differentiate between action and item

// async function await ask

// ------------------------------------PlayerCommands------------------------------------------------ //

let commands = {
  inventory: ["i", "inventory", "inv"],
  possibleMoves: ["where to"],
  move: ["move"],
  take: ["take"],
  drop: ["drop"],
  use: ["use"],
  look: ["l", "look"],
  helpList: ["h", "help"],
  checkStatus: ["status", "check status"],
  menu: ["m", "menu"]
};
