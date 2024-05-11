
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
        pokemonList.push(pokemon);
    } 

    return {
        getAll: getAll,
        add: add
    }
})()

// 'for each' loop function to call objects in pokemonList array 
function callPokemon(pokemon) {
    document.write(pokemon.name + ' (height: ' + pokemon.height + 'ft)');
    //check the height of each pokemon
    if (pokemon.height > 6) {
        document.write(' - Wow. That\'s big!')
    };
    document.write('<br>')
}

pokemonRepository.getAll().forEach(callPokemon)
