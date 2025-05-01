# Documentation of Bugs found, how they were fixed.

## Bug one

There was a syntax error in the rooms array on line 13,17,21, 25, 29, 32 and for subsiquent objects. The setCurrent, setColdPreset, setWarmPreset, decreaseTemp, increaseTemp, toggleAircon functions in each object missed a key , hence the key(setCurrTemp or other) had to be separated from the function to fix the syntax error. The bug was identified because the functions had no keys in the object.


## Bug Two

There is also a logical error in the assignment of the cool and warm overlay on line 145 and 151. The bug was identified as warm temperature room images displayed a cold tint and cold temperature images displayed a warm tint. The variable names were interchanged during assignment. To fix the bug, the coolOverlay variable was interchanged with the warmOverlay variable name and vice versa.


## Bug Three

There was a logical error in the setInitalOverlay function on line 154 where the implementation inside of it was duplicated which could result in inconsistencies hence the inconsistent function was removed.


## Bug Four.

There was type error in assignment of the value of an option created on line 202. The value for the option was set to the room object. The bug was identified in the dev tools html options tag. Also selected room's value was logged onto the console in the roomSelect eventListener and displayed an object instead of the room's name. This indicated a bug from the options.


## Bug Five

There was a syntax error on line 280, 283, 292,295. The bug was identified because the increaseTemp key for each room pointed to a function and not a value hence the function would have to be called when accessing the increaseTemp or decreaseTemp key. Also the variable to whom decreaseTemp or increaseTemp has been assign wouldnt have to be called as a function to execute the decrese or increaseTemp function. THis fixed the increasement and decreament of a room's temperature.


## Bug Six

There was a bug on line 310, 315. This bug was identified as there was no change in error messages should the user input invalid temperatures or should the preset be changed successfully after many wrong entry tries. It was fixed by changing the error message that reflect the error instance and also a return to break out of the if loop. The error message was also cleared should the user entry be valid.


## Refactoring of code.

A new finction for updating the user interface was created and refactored into all instances where the UI would be updated.


## Bug Seven

On line 351 a bug was identified as the message displayed when the AC is turned on. Should the temperature be less than 25 and the Ac turn on, the message displays 'warming to..' and the temperature be greater than 25 and the AC turn on, the message displays 'cooling to..' which should not be the case, hence the message was switch for the respective scenario.
