// Room objects
const rooms = [
  {
    name: "Living Room",
    currTemp: 32,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/living-room.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp: function(temp) {
      this.currTemp = temp;
    },

    setColdPreset: function(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset: function(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp: function() {
      this.currTemp--;
    },

    increaseTemp: function() {
      this.currTemp++;
    },
    toggleAircon: function() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
    setAirconState:function(state){
      this.airConditionerOn = state
    }
  },
  {
    name: "Kitchen",
    currTemp: 29,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/kitchen.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp: function(temp) {
      this.currTemp = temp;
    },

    setColdPreset: function(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset: function(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp: function() {
      this.currTemp--;
    },

    increaseTemp: function() {
      this.currTemp++;
    },
    toggleAircon: function() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
    //new object to change the aircon state.
    setAirconState:function(state){
      this.airConditionerOn = state
    }
  },
  {
    name: "Bathroom",
    currTemp: 30,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bathroom.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp: function(temp) {
      this.currTemp = temp;
    },

    setColdPreset: function(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset: function(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp: function() {
      this.currTemp--;
    },

    increaseTemp: function() {
      this.currTemp++;
    },
    toggleAircon: function() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
    setAirconState:function(state){
      this.airConditionerOn = state
    }
  },
  {
    name: "Bedroom",
    currTemp: 31,
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/bedroom.jpg",
    airConditionerOn: false,
    startTime: '16:30',
    endTime: '20:00',

    setCurrTemp: function(temp) {
      this.currTemp = temp;
    },

    setColdPreset: function(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset: function(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp: function() {
      this.currTemp--;
    },

    increaseTemp: function() {
      this.currTemp++;
    },
    toggleAircon: function() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
    setAirconState:function(state){
      this.airConditionerOn = state
    }
  },
];

const coolOverlay= `linear-gradient(
    to bottom,
    rgba(141, 158, 247, 0.2),
    rgba(194, 197, 215, 0.1)
  )`;

const warmOverlay = `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;

const setInitialOverlay = () => {
  document.querySelector(".room").style.backgroundImage = `${
    rooms[0].currTemp < 25 ? coolOverlay : warmOverlay
  },url('${rooms[0].image}')`;
};

const setOverlay = (room) => {

  document.querySelector(".room").style.backgroundImage = `${
    room.currTemp < 25 ? coolOverlay : warmOverlay
  }, url('${room.image}')`;
};

// Set svg accordingly
const svgPoint = document.querySelector(".point");
const angleOffset = 86;
const calculatePointPosition = (currTemp) => {
  const normalizedTemp = (currTemp - 10) / (32 - 10);
  const angle = normalizedTemp * 180 + angleOffset;

  const radians = (angle * Math.PI) / 180;
  const radius = 116;

  const translateX = radius * Math.cos(radians);
  const translateY = radius * Math.sin(radians);

  return { translateX, translateY };
};

const setIndicatorPoint = (currTemp) => {
  const position = calculatePointPosition(currTemp);
  svgPoint.style.transform = `translate(${position.translateX}px, ${position.translateY}px)`;
};

// Handle the dropdown data
const roomSelect = document.getElementById("rooms");

const currentTemp = document.getElementById("temp");

let selectedRoom = rooms[0].name;


// Set default temperature
currentTemp.textContent = `${rooms[0].currTemp}°`;

setInitialOverlay();

function createSelectOptions(room){
  const option = document.createElement("option");
  option.value = room.name;
  option.textContent = room.name;
  roomSelect.appendChild(option);
}

  document.querySelector(".currentTemp").innerText = `${rooms[0].currTemp}°`;
// Add new options from rooms array
rooms.forEach((room) => {
  createSelectOptions(room)
});


// Set current temperature to currently selected room

const setSelectedRoom = (selectedRoom) => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  setIndicatorPoint(room.currTemp);

  //   set the current stats to current room temperature
  currentTemp.textContent = `${room.currTemp}°`;

  // Set the current room image
  setOverlay(room);

  // Set the current room name
  document.querySelector(".room-name").innerText = selectedRoom;

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
};

roomSelect.addEventListener("change", function () {
  selectedRoom = this.value;

  setSelectedRoom(selectedRoom);
});

function updateUI(room,tempType){
  setIndicatorPoint(room.currTemp);
  currentTemp.textContent = `${room.currTemp}°`;

  generateRooms();

  setOverlay(room);
  if(tempType == 'warm'){
    warmBtn.style.backgroundImage = warmOverlay;
    coolBtn.style.backgroundImage = "none";
  }
  else if(tempType == 'cool'){
    warmBtn.style.backgroundImage = "none";
    coolBtn.style.backgroundImage = coolOverlay;
  }
  else{
    warmBtn.style.backgroundImage = "none";
    coolBtn.style.backgroundImage = "none";
  }

  document.querySelector(".currentTemp").innerText = `${room.currTemp}°`;
}

// Set preset temperatures
const defaultSettings = document.querySelector(".default-settings");
defaultSettings.addEventListener("click", function (e) {
  
  if(e.target.id == 'cool'){
    const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
    room.setCurrTemp(room.coldPreset) 

    updateUI(room,e.target.id)
    //added.changed background color to image and changed the color
    
  }
  if(e.target.id == 'warm'){
    const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
    room.setCurrTemp(room.warmPreset) 
    updateUI(room,e.target.id)

  }
});

// Increase and decrease temperature
document.getElementById("increase").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  const increaseRoomTemperature = room.increaseTemp();

  if (room.currTemp < 32) {
    increaseRoomTemperature;
  }

 updateUI(room,'warm')
 
});

document.getElementById("reduce").addEventListener("click", () => {
  const room = rooms.find((currRoom) => currRoom.name === selectedRoom);
  const decreaseRoomTemperature = room.decreaseTemp();

  if (room.currTemp > 10) {
    decreaseRoomTemperature;
  }

  updateUI(room,'cool')

});

const coolBtn = document.getElementById("cool");
const warmBtn = document.getElementById("warm");


const inputsDiv = document.querySelector(".inputs");
// Toggle preset inputs
document.getElementById("newPreset").addEventListener("click", () => {
  if (inputsDiv.classList.contains("hidden")) {
    inputsDiv.classList.remove("hidden");
  }
});

// close inputs
document.getElementById("close").addEventListener("click", () => {
  inputsDiv.classList.add("hidden");
});

// handle preset input data
document.getElementById("save").addEventListener("click", () => {
  const coolInput = document.getElementById("coolInput");
  const warmInput = document.getElementById("warmInput");
  const errorSpan = document.querySelector(".error");
  //added to remove error message when the temparature values fit the requirement
  errorSpan.innerText =  ''

  if (coolInput.value && warmInput.value) {
    // Validate the data
    if (coolInput.value < 10 || coolInput.value > 25) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid cool temperatures (10° - 25°)";
      //return added to prevent updating the preset when there is an error in the input values
      return;
    }

    if (warmInput.value < 25 || warmInput.value > 32) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid warm temperatures (26° - 32°)";
      return;
    }
    // Validation passed
    // Set current room's presets
    const currRoom = rooms.find((room) => room.name === selectedRoom);

    currRoom.setColdPreset(coolInput.value);
    currRoom.setWarmPreset(warmInput.value);

    coolInput.value = "";
    warmInput.value = "";
  }
});

// Rooms Control
// Generate rooms
const generateRooms = () => {
  const roomsControlContainer = document.querySelector(".rooms-control");
  let roomsHTML = "";
  //added ans switch cool amd warm
  rooms.forEach((room) => {
    roomsHTML += `
    <div class="room-control" id="${room.name}">
          <div class="top">
            <h3 class="room-name">${room.name} - ${room.currTemp}°</h3>
            <button class="switch">
              <ion-icon name="power-outline" class="${
                room.airConditionerOn ? "powerOn" : ""
              }"></ion-icon>
            </button>
          </div>

          ${displayTime(room)}
         
          <span class="room-status" style="display: ${
            room.airConditionerOn ? "" : "none"
          }">${room.currTemp > 25 ?  "Warming room to: ": "Cooling room to: "}${
      room.currTemp
    }°</span>
        </div>
    `;
  });

  roomsControlContainer.innerHTML = roomsHTML;
};
const displayTime = (room) => {
  return `
      <div class="time-display">
        <span class="time">${room.startTime}</span>
        <div class="bars">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <span class="time">${room.endTime}</span>
      </div>
  `
}

generateRooms();

document.querySelector(".rooms-control").addEventListener("click", (e) => {
  if (e.target.classList.contains("switch")) {
    const room = rooms.find(
      (room) => room.name === e.target.parentNode.parentNode.id
    );
    room.toggleAircon();
    generateRooms();
  }

  if (e.target.classList.contains("room-name")) {
    setSelectedRoom(e.target.parentNode.parentNode.id);
  }
});

// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("add-room");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.addEventListener('click',()=> {
  modal.style.display = "block";
}) 

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//modal form eventlistener
const form  = document.getElementById('modal-form')
const newRoomName = document.getElementById('room-name')
const newRoomTemparature = document.getElementById('room-temp');
const newStartTime = document.getElementById('start-time')
const newEndTime = document.getElementById('end-time')
form.addEventListener('submit',event => {
  event.preventDefault()
  //adding the new room data to that old one.
  let newRoom = {
    name: newRoomName.value,
    currTemp: parseInt(newRoomTemparature.value),
    coldPreset: 20,
    warmPreset: 32,
    image: "./assets/living-room.jpg",
    airConditionerOn: false,
    startTime: newStartTime.value,
    endTime: newEndTime.value,

    setCurrTemp: function(temp) {
      this.currTemp = temp;
    },

    setColdPreset: function(newCold) {
      this.coldPreset = newCold;
    },

    setWarmPreset: function(newWarm) {
      this.warmPreset = newWarm;
    },

    decreaseTemp: function() {
      this.currTemp--;
    },

    increaseTemp: function() {
      this.currTemp++;
    },
    toggleAircon: function() {
      this.airConditionerOn
        ? (this.airConditionerOn = false)
        : (this.airConditionerOn = true);
    },
    setAirconState:function(state){
      this.airConditionerOn = state
    }
  }
  //add new room
  rooms.push(newRoom)
  //add new room option
  createSelectOptions(newRoom)
  generateRooms()
  form.reset()
})

// Check every minute for less pollingto check whether start time is up.500ms was used for testing.
setInterval(checkTimeAndDisplay, 500); 
  function checkTimeAndDisplay() {
    const now = new Date();
    const currentHour = now.getUTCHours();
    const currentMinute = now.getUTCMinutes();
    
    //calculating currenttime in minutes
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    rooms.forEach((room) => {
      const startTimeInMinutes = parseInt(room.startTime.slice(0,2)) * 60 + parseInt(room.startTime.slice(-2));
      const endTimeInMinutes = parseInt(room.endTime.slice(0,2)) * 60 + parseInt(room.endTime.slice(-2));

      if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
        //turnig the aircon on if the start time is reached
        room.setAirconState(true)
      }
    }
  )
    //redisplay the rooms to turn the ac on
      generateRooms();
  }
