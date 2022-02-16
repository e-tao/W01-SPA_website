var myLunch = ['turkey', 'bbq'];

localStorage.setItem('myLunch', JSON.stringify(myLunch));
let today = new Date()


// Get the existing data
var existing = JSON.parse(localStorage.getItem('myLunch'));

// If no existing data, create an array
// Otherwise, convert the localStorage string to an array

console.log(typeof existing);
// Add new data to localStorage Array
existing.push("yummy");

// Save back to localStorage
localStorage.setItem('myLunch', JSON.stringify(existing));

var newlocal = JSON.parse(localStorage.getItem('myLunch'));
console.log(newlocal);