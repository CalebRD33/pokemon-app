
let pokemonRepository = (function () {
   
    let pokemonList = [
        {
            name: 'Charizard',
            height: 5.58,
            types: ['Fire', 'Flying'],
            weaknesses: ['Water', 'Electric', 'Rock']
        },
        {
            name: 'Venusaur',
            height: 6.58,
            types: ['Grass', 'Poison'],
            weaknesses: ['Fire', 'Ice', 'Flying', 'Psychic']
        },
        {
            name: 'Beedrill',
            height: 3.25,
            types:['Bug', 'Poison'],
            weaknesses: ['Fire', 'Flying', 'Psychic', 'Rock']
        }
    ]

    function getAll () {
        return pokemonList;
    }

    function add (pokemon) {
        // conditional to make sure that objects can only be added to the pokemonList array
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon);
            console.log("Pokemon added successfully!")
        } else {
            console.log("Error: Only objects can be added to the pokemonList.")
        }        
    } 

    return {
        getAll: getAll,
        add: add
    }
})()

// tested conditional to make sure the parameters in the add function are working properly
pokemonRepository.add({name: 'Charmander', height: '3.33', types: 'Fire'});
pokemonRepository.add("Charmander");

// 'for each' loop function to call objects in pokemonList array 
function callPokemon(pokemon) {
    document.write(pokemon.name + ' (height: ' + pokemon.height + 'ft)');
    //conditional to check the height of each pokemon
    if (pokemon.height > 6) {
        document.write(' - Wow. That\'s big!')
    };
    document.write('<br>')
}

pokemonRepository.getAll().forEach(callPokemon)
