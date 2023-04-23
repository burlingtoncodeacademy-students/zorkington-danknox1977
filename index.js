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

class Item {
  constructor(name, what) {
    this.name = name;
    this.what = what;
  }
}

class Player {
  constructor(name, mainSkill, dispo, chi, Room, Inventory) {
    this.name = name;
    this.mainSkill = mainSkill;
    this.dispo = dispo;
    this.chi = chi;
    this.Room = Room;
    this.Inventory = Inventory;
  }

  //method to move between locations

  move(newLocation) {
    const possMoves = bldgMap[this.Room];
    if (newLocation in possMoves) {
      if (possMoves[newLocation] > this.chi) {
        console.log("Alas, Grasshopper, you are not ready to move here. ");
        //chi refers to the value of the key of whatever newLocation they're referring
      } else {
        console.log(`Moving to ${newLocation}... `);
        this.Room = newLocation;
      }
    } else {
      console.log(`Cannot move to ${newLocation}. Try Again. `);
    }
  }

  //method to list possible moves from current location
  //doesn't work yet
  getMoves() {
    const possMoves = bldgMap[this.Room];
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

// -----------------------------------PlayerOne------------------------------------------------------ //

const playerOne = new Player(
  "Chuck",
  "Willful Ignorance",
  "Smug",
  40000,
  "Front Porch",
  ["cellphone", "uber eats"]
);

// -------------------------------------ClassPlayerInventory-------------------------------------------------- //

class Inventory extends Player {
  constructor(item) {
    this.item = item;
  }

  // -------------------------------------PlayerAddInventoryMethod-------------------------------------------------- //
  addItem(item) {
    this.Inventory.push(item);
  }
}

// ---------------------------------GameFiles--------------------------------------------------- //
var gameStatus = "pending";

const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. The doorknob has a keypad built-in.
On the door is a handwritten sign. \nNO UNAUTHORIZED VISITORS -This means you Carl
You are meant to Deliver the Uber Eats to someone at this address.`;

const prompt = `What do you do? >_`;

// ---------------------------------AsyncInterfaceLoop(s)-------------------------------------------------- //

start();

async function start() {
  gameStatus = "start";

  console.log(welcomeMessage);

  while (gameStatus !== "end") {
    let answer = await ask(prompt);

    // -----------------------------------AnswerLogic--------------------------------------------------- //

    var parseAnswer = [];
    parseAnswer.push(answer.toLowerCase().split(" "));
    // var parseAnswerB = [];
    // parseAnswerB = parseAnswer.map(element => {
    //   return element.toLowerCase();
    // });


  

    console.log(parseAnswer);
  
    console.log(word1)
    console.log(word2)
    
    
    //if for inventory
    if (commands.inventory.includes(word1)) {
      inventory();

      //else if for getMoves
    } else if (commands.possibleMoves.includes(word1)) {
      console.log(playerOne.getMoves());

      //else if for menu
    } else if (answer == "menu") {
      console.log("menu");

      // else if for look
    } else if (commands.look.includes(word1)) {
      console.log(playerOne.Room.what);

      //else if for status
    } else if (commands.checkStatus.includes(word1)) {
      console.log(playerOne.dispo);

      //else if for take
    } else if (commands.take.includes(word1)) {
      console.log("menu");

      //else if for drop
    } else if (commands.drop.includes(word1)) {
      console.log("menu");

      //else if for use
    } else if (commands.use.includes(word1)) {
      console.log("menu");

      //else if for move
    } else if (commands.move.includes(word1)) {
      console.log("menu");

      //else if for Help!
    } else if (commands.helpList.includes(word1)) {
      console.log("menu");

      //else if for quit
    } else if (commands.quit.includes(word1)) {
      quit();

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
  frontPorch: {
    driveway: 000,
    foyer: 250,
  },
  driveway: {
    frontPorch: 250,
    car: 000,
  },
  foyer: {
    frontPorch: 250,
    hall: 250,
    stairs1st2nd: 5000,
    dining: 250,
  },
  dining: {
    foyer: 250,
    kitchen: 250,
  },
};

// ---------------------------------Room Classes--------------------------------------------------- //

//Room Class
class Room {
  constructor(name, connections, what, Item, locked) {
    this.name = name;
    this.what = what;
    this.Item = [];
    this.locked = locked;
  }
}

const driveway = new Room(
  "Driveway",
  "You look back at where you parked your car and hope you won't have to leave it idling too long...",
  ["car", "salvation"],
  true
);
const car = new Room(
  "Your Car",
  "A late model Kia Sorrento, idling obediently, lights on -with some muted music wafting from a slightly ajar window.",
  ["Deliverence", "gasoline", "Best Of Queen cassette tape"],
  true
);
const frontPorch = new Room(
  "Front Porch",
  "The area before the entrance could better be described as a sidewalk",
  ["Front Door"],
  false
);

const foyer = new Room(
  "Foyer",
  "Or, antechamber, looks deserted only the sound of a distant television betrays the\n prescence of other humans. There is a stair going up and a hall to your left.",
  ["Directory"],
  true
);
const hall = new Room(
  "Hallway",
  "A well lit hallway leading around the staircase going up to the second floor, there\n are doors closed doors leading off to the right and it makes a left hand turn\n into shadow...",
  ["Front Door"],
  false
);
const dining = new Room(
  "Dining Room",
  "A formal dining room, not the kind for everyday eating, covered in periodicals and office supplies.",
  ["Outdoor Life Magazine", "Ink Pen"],
  false
);
const kitchen = new Room(
  "Kitchen",
  "A lovely and well kept kitchen, nobody cooks here",
  ["Fridge", "cabinet under sink", "microwave", "silverware drawer"],
  false
);
const stairs1st2nd = new Room(
  "Stairs between 1st & 2nd Floor",
  "A grand wooden staircase, the steps are just slightly too tall, as if made for someone a little taller than you are.",
  ["Railling", "Skateboard"],
  true
);
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

// class Item {
//   constructor(id, name, value, weight, pickup) {
//     this.id = id;
//     this.name = name;
//     this.value = value;
//     this.weight = weight;
//     this.pickup = pickup;
//   }
// }

// ------------------------------------PlayerCommands------------------------------------------------ //

let commands = {
  inventory: ["i", "inventory", "inv"],
  possibleMoves: ["where to", "where can I go", "possible moves"],
  move: ["m", "move"],
  take: ["t", "take"],
  drop: ["d", "drop"],
  use: ["u", "use"],
  look: ["l", "look"],
  helpList: ["h", "help"],
  checkStatus: ["status", "check status"],
  menu: ["m", "menu"],
  quit: ["exit", "end", "quit"],
};

function inventory() {
  console.log(playerOne.Inventory);
}

function move() {
  playerOne.Room = newLocation;
}

function take() {
  playerOne.Inventory.addItem(item);
}

function drop() {
  playerOne.Inventory.slice(item);
  newLocation.Item.push(item);
}

function use() {
  //Placeholder
}

function lookRoom() {
  console.log(newLocation.what);
}

function lookItem() {
  console.log(item.what);
}

function checkStatus() {
  console.log(playerOne.dispo);
}

function help() {}

function menu() {}

function quit() {
  console.log(`Thanks for Playing ${playerOne.name}!`);
  process.exit();
}
