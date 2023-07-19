var animals = [
    { name: 'Fluffykins', species: 'rabbit' },
    { name: 'Caro', species: 'dog' },
    { name: 'Hamilton', species: 'dog' },
    { name: 'Harold', species: 'fish' },
    { name: 'Ursula', species: 'cat' },
    { name: 'Jimmy', species: 'fish' }
]

var names = animals.map((x) => x.name + ' is a ' + x.species)
// var names = animals.map((animal) => animal.name + ' is a ' + animal.species)

// Without ECMAS6
// var names = animals.map(function(animal) {
//     return animal.name + ' is a ' + animal.species
// })

// Manual For loop
// var names = []
// for (var i = 0; i < animals.length; i++) {
//     names.push(animals[i].name)
// }

console.log(animals);
console.log(names);