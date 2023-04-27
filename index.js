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

// ------------------------------------console.log(TextColors)------------------------------------------------ //

let defaultText = "\033[39m";
let greenText = "\033[32m";
let yellowText = "\033[0;33m";
let redText = "\033[91m";
let blueText = "\033[94m";
let grayText = "\033[90m";

// -------------------------------------MovementStateMachine------------------------------------------------ //

const bldgMap = {
  car: ["driveway", "deliverance"],
  porch: ["driveway", "foyer"],
  driveway: ["porch", "car"],
  foyer: ["porch", "hall", "stairs", "dining"],
  dining: ["foyer", "kitchen"],
  stairs: ["foyer"],
  hall: ["foyer", "kitchen"],
  kitchen: ["dining", "hall"],
};

//function to move between locations

function move(newLocation) {
  let possMoves = bldgMap[currentLocation];
  console.log(possMoves);

  if (!possMoves.includes(newLocation)) {
    console.log(
      `Unfortumantely, you can not go to ${newLocation} from ${currentLocation}`
    );
  } else {
    console.log(`Moving to ${newLocation}... `);
    currentLocation = newLocation;
  }
}

// ---------------------------------Room Classes--------------------------------------------------- //

//Room Class
class Room {
  constructor(name, what, Item, locked) {
    this.name = name;
    this.what = what;
    this.Item = [];
    this.locked = locked;
  }

  look() {
    console.log(this.what);
  }
}

const driveway = new Room(
  "Driveway",
  "You look back at where you parked your car and hope you won't have to leave it idling too long...",
  ["car", "salvation"],
  true
);
const car = new Room(
  "Car",
  "A late model Kia Sorrento, idling obediently, lights on -with some muted music wafting from a slightly ajar window.",
  ["cellphone", "uber_eats"],
  true
);
const frontPorch = new Room(
  "Porch",
  "The area before the entrance could better be described as a sidewalk",
  ["Keypad"],
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
  ["Painting"],
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
const stairs = new Room(
  "Stairs between 1st & 2nd Floor",
  "A grand wooden staircase, the steps are just slightly too tall, as if made for someone a little taller than you are.",
  ["Railling", "Skateboard"],
  true
);

const deliverance = new Room(
  "Deliverance",
  "The open road, on to the next adventure!",
  ["Freedom"],
  true
);

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
  possibleMoves: ["w", "where"],
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
  console.log(player.inventory);
}

function take() {
  player.inventory.addItem(item);
}

function drop() {
  player.inventory.slice(item);
  newLocation.Item.push(item);
}

function use() {
  //Placeholder
}

function lookRoom() {
  // let lookRoom = Room(currentLocation)

  console.log(Room.look());

  // console.log(currentLocation.what)
  // console.log(Room(currentLocation).look)
  // console.log(lookRoom.what)
  // console.log(newLocation.what);
}

function lookItem() {
  console.log(item.what);
}

function help() {}

function menu() {}

function quit() {
  console.log("Thanks for Playing");
  process.exit();
}

// ---------------------------------------InventoryAndPlayer----------------------------------------------- //

class Item {
  constructor(name, what) {
    this.name = name;
    this.what = what;
  }
}

let player = {
  inventory: [],
};

// ---------------------------------GameFiles--------------------------------------------------- //
var gameStatus = "pending";

const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. The doorknob has a keypad built-in.
On the door is a handwritten sign. \nNO UNAUTHORIZED VISITORS -This means you Carl
You are meant to Deliver the Uber Eats to someone at this address.`;

const prompt = `What do you do? >_`;

// ---------------------------------AsyncInterfaceLoop(s)-------------------------------------------------- //

let currentLocation = "car";
start();

async function start() {
  gameStatus = "start";

  console.log(welcomeMessage);

  while (gameStatus !== "end") {
    let answer = await ask(prompt);

    // -----------------------------------SplittingResponseInto2Words--------------------------------------------------- //

    var parseAnswer = [];
    parseAnswer.push(answer.toLowerCase().split(" "));

    var words = parseAnswer[0];
    var word1 = words[0];
    var word2 = words[1];

    //if for inventory
    if (commands.inventory.includes(word1)) {
      inventory();

      //else if for possMoves
    } else if (commands.possibleMoves.includes(word1)) {
      console.log(`You are currently in ${currentLocation}.`);
      console.log(bldgMap[currentLocation]);
      console.log(JSON.stringify(bldgMap[currentLocation]));

      //else if for menu
    } else if (answer == "menu") {
      console.log("menu");

      // else if for look
    } else if (commands.look.includes(word1)) {
      lookRoom();

      //else if for take
    } else if (commands.take.includes(word1)) {
      console.log("take");

      //else if for drop
    } else if (commands.drop.includes(word1)) {
      console.log("drop");

      //else if for use
    } else if (commands.use.includes(word1)) {
      console.log("use");

      //else if for move
    } else if (commands.move.includes(word1)) {
      move(word2);

      console.log("move");

      //else if for Help!
    } else if (commands.helpList.includes(word1)) {
      console.log("help");

      //Should include list of commands and directions on how to use two word answers

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
