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

let blueText = "\033[94m";
let defaultText = "\033[39m";
let grayText = "\033[90m";
let greenText = "\033[32m";
let redText = "\033[91m";
let yellowText = "\033[0;33m";

// -------------------------------------MovementStateMachine------------------------------------------------ //

const bldgMap = {
  car: ["driveway", "deliverance"],
  dining: ["foyer", "kitchen"],
  driveway: ["porch", "car"],
  foyer: ["porch", "hall", "stairs", "dining"],
  hall: ["foyer", "kitchen"],
  kitchen: ["dining", "hall"],
  porch: ["driveway", "foyer"],
  stairs: ["foyer"],
};

// ---------------------------------Room Classes--------------------------------------------------- //

//Room Class
class Room {
  constructor(name, what, locked) {
    this.name = name;
    this.what = what;
    // this.Item = Item;
    this.locked = locked;
  }
}

const car = new Room(
  "car",
  "A late model Kia Sorrento, idling obediently, lights on -with some muted music wafting \nfrom a slightly ajar window. Your cellphone battery is too low to remove from the charger,\nThe order of Uber Eats is on the passenger seat.",
  // [cellphone, uber_eats],
  false
);

const deliverance = new Room(
  "deliverance",
  "The open road, on to the next adventure!",
  // ["freedom"],
  true
);

const dining = new Room(
  "dining room",
  "A formal dining room, not the kind for everyday eating, covered in periodicals \nand office supplies.",
  // ["outdoor_life_magazine", "ink_pen"],
  false
);
const driveway = new Room(
  "driveway",
  "You look back at where you parked your car and hope you won't have to leave it idling \ntoo long...",
  // ["gravel", "cigarette_butts"],
  false
);

const foyer = new Room(
  "foyer",
  "Or, antechamber, looks deserted only the sound of a distant television betrays the\nprescence of other humans. There is a stair going up and a hall to your left.",
  // ["directory"],
  true
);

const hall = new Room(
  "hallway",
  "A well lit hallway leading around the staircase going up to the second floor, there\nare doors closed doors leading off to the right and it makes a left hand turn\n into shadow...",
  // ["painting"],
  false
);

const kitchen = new Room(
  "kitchen",
  "A lovely and well kept kitchen, nobody cooks here",
  // ["Fridge", "cabinet_under_sink", "microwave", "silverware_drawer"],
  false
);

const porch = new Room(
  "porch",
  "The area before the entrance could better be described as a sidewalk",
  // [keypad],
  false
);

const stairs = new Room(
  "stairs",
  "A grand wooden staircase, the steps are just slightly too tall, as if made for \nsomeone a little taller than you are.",
  // [railing, "skateboard"],
  true
);

// -----------------------------------room/LookUpTable------------------------------------------------------ //

let roomLookUp = {
  car: car,
  deliverance: deliverance,
  dining: dining,
  driveway: driveway,
  foyer: foyer,
  hall: hall,
  kitchen: kitchen,
  porch: porch,
  stairs: stairs,
};

// -------------------------------------Item ClassDeclaration-------------------------------------------------- //

class Item {
  constructor(name, what, util, inv, place) {
    this.name = name;
    this.what = what;
    this.util = util;
    this.inv = inv;
    this.place = place;
  }
}

const cellphone = new Item(
  "cellphone",
  "Your cellphone, battery at an abysmmal 1%, will only function when plugged into you car \ncharger.",
  false,
  false,
  "car"
);

const uber_eats = new Item(
  "uber_eats",
  "A bag of late night grub for your hungry customer inside, the note on the ticket provides\nthe entrance code: 93378.",
  false,
  true,
  "car"
);

const keypad = new Item(
  "keypad",
  "The door code keypad, typical 10 key numeric, you will need to input the right \ncode to unlock the door.",
  true,
  false,
  "porch"
);

const railing = new Item(
  "railing",
  "A strong wooden railing, this will allow you to safely ascend the staircase.",
  true,
  false,
  "stairs"
);

// ------------------------------------PlayerCommands------------------------------------------------ //

let commands = {
  drop: ["d", "drop"],
  helpList: ["h", "help"],
  inventory: ["i", "inventory", "inv"],
  look: ["l", "look"],
  menu: ["m", "menu"],
  move: ["m", "move"],
  possibleMoves: ["w", "where"],
  quit: ["x", "q", "exit", "end", "quit"],
  use: ["u", "use"],
  take: ["t", "take"],
};

// ---------------------------------------InventoryAndPlayer----------------------------------------------- //

let player = {
  inventory: [],
};

// --------------------------------------commandFunctions-------------------------------------------------- //

function drop() {
  player.inventory.slice(item);
  newLocation.Item.push(item);
}

function help() {
  console.log(`You are currently at ${currentLocation}`);
}

function inventory() {
  console.log(player.inventory);
}

function lookItem() {
  console.log(item.what);
}
//function to look at rooms
function look(objOfInt) {
 

 
  if (objOfInt == currentLocation) {
    if (roomLookUp.car.name.includes(objOfInt)) {
      console.log(roomLookUp.car.what);
    } else if (roomLookUp.deliverance.name.includes(objOfInt)) {
      console.log(roomLookUp.deliverance.what);
    } else if (roomLookUp.driveway.name.includes(objOfInt)) {
      console.log(roomLookUp.driveway.what);
    } else if (roomLookUp.foyer.name.includes(objOfInt)) {
      console.log(roomLookUp.foyer.what);
    } else if (roomLookUp.hall.name.includes(objOfInt)) {
      console.log(roomLookUp.hall.what);
    } else if (roomLookUp.kitchen.name.includes(objOfInt)) {
      console.log(roomLookUp.kitchen.what);
    } else if (roomLookUp.porch.name.includes(objOfInt)) {
      console.log(roomLookUp.porch.what);
    } else if (roomLookUp.stairs.name.includes(objOfInt)) {
      console.log(roomLookUp.stairs.what);
    }
  } else if (itemLookUp.cellphone.name.includes(objOfInt)) {
    if (itemLookUp.cellphone.place.includes(currentLocation)) {
        console.log(cellphone.what)
    } else {
        console.log(`${objOfInt} is not at ${currentLocation}.`)
    }
  } else if (itemLookUp.uber_eats.name.includes(objOfInt)) {
    if (itemLookUp.uber_eats.place.includes(currentLocation)) {
      console.log(uber_eats.what)
    } else {
      console.log(`${objOfInt} is not at ${currentLocation}.`)
    };
  // } else if (itemLookUp.Item.name.includes(objOfInt)) {
  //   if (itemLookUp.item.place.includes(currentLocation)) {
  //     console.log(Item.what);
  //   } else {
  //     console.log(`${objOfInt} is not at ${currentLocation}.`)
  //   }
  
    
  
} else {
  console.log(`You can not see ${objOfInt} from ${currentLocation}`);
     
}
}

function menu() {
  //placeholder
}

//function to move between locations

function move(newLocation) {
  let possMoves = bldgMap[currentLocation];

  if (!possMoves.includes(newLocation)) {
    console.log(
      `Unfortumantely, you can not go to ${newLocation} from ${currentLocation}`
    );
  } else if (roomLookUp.foyer.name.includes(newLocation)) {
    if (foyer.locked === true) {
   console.log(`The front door is locked, use keypad to enter.`)
    } else {
      console.log(`You enter the building.`)
      currentLocation = newLocation
    }
  } else {
    console.log(`Moving to ${newLocation}... `);
    currentLocation = newLocation;
  }
}
function possibleMoves() {
  console.log(`You are currently in ${currentLocation}.`);
  let poss = JSON.stringify(bldgMap[currentLocation]);
  console.log(`From here you can go to: ${poss}`);
}

function take(addItem) {
  if (
    itemLookUp.name.includes(addItem) &&
    roomLookUp.Item.includes(currentLocation)
  ) {
    player.inventory.addItem(addItem);
  }
}

function use(useItem) {
  //Placeholder
}

function quit() {
  console.log("Thanks for Playing");
  process.exit();
}
// ---------------------------------GameFiles--------------------------------------------------- //tiaint
var gameStatus = "pending";

let currentLocation = "car";

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
      possibleMoves();

      //else if for menu
    } else if (answer == "menu") {
      console.log("menu");

      // else if for look
    } else if (commands.look.includes(word1)) {
      look(word2);

      //else if for take
    } else if (commands.take.includes(word1)) {
      console.log("take");
      take(word2);

      //else if for drop
    } else if (commands.drop.includes(word1)) {
      console.log("drop");
      drop(word2);

      //else if for use
    } else if (commands.use.includes(word1)) {
      console.log("use");

      //else if for move
    } else if (commands.move.includes(word1)) {
      move(word2);

      //else if for Help!
    } else if (commands.helpList.includes(word1)) {
      console.log("help");
      help()

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

let itemLookUp = {
  // cabinet_under_sink: cabinet_under_sink,
  cellphone: cellphone,
  // cigarette_butts: cigarette_butts,
  // directory: directory,
  // freedom: freedom,
  // fridge: fridge,
  // gravel: gravel,
  // ink_pen: ink_pen,
  keypad: keypad,
  // microwave: microwave,
  // outdoor_life_magazine: outdoor_life_magazine,
  // painting: painting,
  railing: railing,
  // silverware_drawer: silverware_drawer,
  // skateboard: skateboard,
  uber_eats: uber_eats,
}
