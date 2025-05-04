/**
 * @jest-environment jsdom
 */
const {rooms,coolOverlay,warmOverlay,setOverlay,increaseTemp,decreaseTemp,setPreset,addRoom,ACScheduler} = require('./thermostat.js')



describe('Testing overlays',()=> {
beforeEach(() => {
document.body.innerHTML = `
<div class='room' id='room'>
Room
</div>
`
});

test('cold overlay when room\'s temperature is cold',()=> {
    // Test case 1: currTemp < 25 should apply coolOverlay
    const roomDiv = document.getElementById('room');
    const room= rooms[0];
    room.setCurrTemp(20)
    setOverlay(room, roomDiv);
    expect(roomDiv.getAttribute('style')).toContain(`${coolOverlay}, url('${rooms[0].image}')`)
    })

    // Test case 1: currTemp < 30 should apply warmlOverlay
    test('warm room\'s overlay',()=> {
        // Test case 1: currTemp < 25 should apply coolOverlay
        const roomDiv = document.getElementById('room');
        const room= rooms[1];
        setOverlay(room, roomDiv);
        expect(roomDiv.getAttribute('style')).toContain(`${warmOverlay}, url('${rooms[1].image}')`)
    })
}


);

describe('test ',() => {
    test('test structure of room',()=> {
        //testing the object structure of first room and second room in rooms object
        const room = rooms[0]
        expect(Object.keys(room)).toEqual(Object.keys(rooms[1]))

        //testing the object structure of first room and a random room in rooms object
        const randomObject = {name:'Bedroom',currTemp:20}
        expect(Object.keys(room)).not.toEqual(Object.keys(randomObject))
    });

    test('test the initialstate of the ac',() => {
        expect(rooms[0].airConditionerOn).toBe(false)
    });

    test('setting the current temperature of a room',() => {
        const room = rooms[0]
        room.setCurrTemp(20)
        expect(room.currTemp).toBe(20);
        const room1 = rooms[1]
        room1.setCurrTemp(15)
        expect(room1.currTemp).toBe(15);
    });

    test('toggling the aircon of a room',() => {
        const room = rooms[0]
        room.toggleAircon()
        expect(room.airConditionerOn).toBe(true);
     
    })
    test('toggling the AC again',() => {
        const room = rooms[0]
        room.toggleAircon()
        expect(room.airConditionerOn).toBe(false);
    })

    //testing to increase the temperature
    test('increase the room\'s temperature',() => {
        const room = rooms[1]
        room.setCurrTemp(20)
        increaseTemp(room)
        expect(room.currTemp).toBe(21)
    })

    //testing to increase the temperature when the room's temperature is at its limit
    test('increase the room\'s temperature',() => {
        const room = rooms[1]
        room.setCurrTemp(32)
        increaseTemp(room)
        expect(room.currTemp).toBe(32)
    })

     //testing to decrease the temperature
     test('increase the room\'s temperature',() => {
        const room = rooms[1]
        room.setCurrTemp(20)
       room.decreaseTemp(room)
        expect(room.currTemp).toBe(19)
    })

    //testing to increase the temperature when the room's temperature is at its lowest limit
    test('increase the room\'s temperature',() => {
        const room = rooms[1]
        room.setCurrTemp(10)
        decreaseTemp(room)
        expect(room.currTemp).toBe(10)
    })
})

describe('changing default preset',()=> {
    beforeEach(() => {
        document.body.innerHTML = `
        <div>
            <div class='errormsg' id='errormsg'></div>
            <input type='number' placeholder='Cold' id='coldtemp'>
            <input type='number' placeholder='warm' id='warmtemp'>
            <button id='save'>Save</button>
            <div id='warnDiv'></div>
        </div>
        `
    })
    test('when the cold preset input of a romm is value not in the cold input range',()=> {
        const room = rooms[0]
        const cool = document.getElementById('coldtemp')
        const warm = document.getElementById('warmtemp')
        const save = document.getElementById('save')
        const warnDiv = document.getElementById('warnDiv')
        save.dispatchEvent(new Event('input',{bubbles: true}))

        cool.value = 9
        warm.value = 27
   
        setPreset(room,cool.value,warm.value,warnDiv)
        expect(warnDiv.textContent).toContain('Enter valid cool temperatures (10° - 25°)')
    })

    test('when the warm preset input of a romm is value not in the warm input range',()=> {
        const room = rooms[0]
        const cool = document.getElementById('coldtemp')
        const warm = document.getElementById('warmtemp')
        const save = document.getElementById('save')
        const warnDiv = document.getElementById('warnDiv')
        save.dispatchEvent(new Event('input',{bubbles: true}))

        cool.value = 15
        warm.value = 38
   
        setPreset(room,cool.value,warm.value,warnDiv)
        expect(warnDiv.textContent).toContain('Enter valid warm temperatures (26° - 32°)')
    })

    test('when the preset inputs of a romm are in the specified range',()=> {
        const room = rooms[0]
        const cool = document.getElementById('coldtemp')
        const warm = document.getElementById('warmtemp')
        const save = document.getElementById('save')
        const warnDiv = document.getElementById('warnDiv')
        save.dispatchEvent(new Event('input',{bubbles: true}))

        cool.value = 15
        warm.value = 30
   
        setPreset(room,cool.value,warm.value,warnDiv)
        expect(warnDiv.textContent).toContain('')
        expect(room.coldPreset).toBe(15)
        expect(room.warmPreset).toBe(30)
    })
})

//test for adding a room
test('adding a new room',() =>{
    const room = {name:'Guestroom',
        currTemp: 27,
        coldPreset: 20,
        warmPreset: 29
    }

    addRoom(room,rooms)
    expect(rooms.length).toBe(5)
})

describe('A scheduler for the rooms',() => {
    
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setTimeout');
    // Mock room object with time parameters and aircon control
     
    })
    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    })
    test('when the time for turning the AC on is up',() =>{
        const time= new Date("2025-05-04T18:45:00")
        const room = rooms[0]
        ACScheduler(room,'18:45')
    
        // Trigger interval callback
        jest.advanceTimersByTime(100);
        
        expect(room.airConditionerOn).toBe(true);

    })

    test('when the time for turning the AC on is not up',() =>{
        const time= new Date("2025-05-04T15:45:00")
        const room = rooms[0]
        ACScheduler(room,'15:45')
    
        // Trigger interval callback
        jest.advanceTimersByTime(100);
        
        expect(room.airConditionerOn).toBe(false);

    })
})