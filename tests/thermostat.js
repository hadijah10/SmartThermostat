//rooms
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
  
const coolOverlay= 'linear-gradient(to bottom,rgba(141, 158, 247, 0.2),rgba(194, 197, 215, 0.1))';

const warmOverlay = `linear-gradient(to bottom, rgba(236, 96, 98, 0.2), rgba(248, 210, 211, 0.13))`;

//function to change a room's background
  const setOverlay= (room,roomDiv) => {
   
   const styleString = `background-image:${room.currTemp < 25 ? coolOverlay : warmOverlay}, url('${room.image}')`;
   roomDiv.setAttribute('style',styleString)

  };
  const increaseTemp= (room)=> {
    if(room.currTemp<32){
      room.increaseTemp()
    }
  }
  const decreaseTemp= (room)=> {
    if(room.currTemp>10){
      room.decreaseTemp()
    }
  }
  const setPreset= (room,coolInput,warmInput,warnDiv) => {
    if (coolInput && warmInput) {
      if(coolInput<10 || coolInput>25){
        warnDiv.textContent = 'Enter valid cool temperatures (10° - 25°)'
        return;
      }
      else if(warmInput < 25 || warmInput > 32){
        warnDiv.textContent = 'Enter valid warm temperatures (26° - 32°)'
        return;
      }
      room.setColdPreset(parseInt(coolInput));
      room.setWarmPreset(parseInt(warmInput));

    coolInput = "";
    warmInput = "";
    }
   
  }

  const ACScheduler = (room,currentTime) => {
    const currentTimeInMinutes = parseInt(currentTime.slice(0,2)) * 60 + parseInt(currentTime.slice(-2));
    const startTimeInMinutes = parseInt(room.startTime.slice(0,2)) * 60 + parseInt(room.startTime.slice(-2));
    const endTimeInMinutes = parseInt(room.endTime.slice(0,2)) * 60 + parseInt(room.endTime.slice(-2));

    setInterval(() => {
      if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) {
        //turnig the aircon on if the start time is reached
        room.setAirconState(true)
      }
      else{
        room.setAirconState(false)
      }
    },100)
  }

  const addRoom =(room,rooms) => {
    rooms.push(room)
  }

module.exports =  {rooms,coolOverlay,warmOverlay,setOverlay,decreaseTemp,increaseTemp,setPreset,addRoom,ACScheduler}