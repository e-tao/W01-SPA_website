var myLunch = [{ text: "obj1" }, { text: "obj2" }];
let newObj = { text: "obj3" };
localStorage.setItem('myLunch', JSON.stringify(myLunch));


// Get the existing data
var existing = JSON.parse(localStorage.getItem('myLunch'));

// If no existing data, create an array
// Otherwise, convert the localStorage string to an array


// Add new data to localStorage Array
existing[myLunch.length] = newObj;

let selected = 'obj2';
// Save back to localStorage
localStorage.setItem('myLunch', JSON.stringify(existing));
//console.log(JSON.parse(localStorage.getItem('myLunch')));

let readyRm = JSON.parse(localStorage.getItem('myLunch'));
console.log(readyRm);
for (let i = 0; i < readyRm.length; i++) {
    if (readyRm[i].text == selected) {
        readyRm.splice(i, 1)
    }
}
console.log(readyRm);
localStorage.setItem('myLunch', JSON.stringify(readyRm));

console.log(JSON.parse(localStorage.getItem('myLunch')));




