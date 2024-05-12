
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

    // Advanced way of creating a separate function as a click listener
    function pokemonClickListener(pokemon) {
        return function() {
            showDetails(pokemon);
        };
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button');

        // Advanced way of creating a separate function as a click listener
        button.addEventListener('click', pokemonClickListener(pokemon));

        // original event listener that runs showDetails() function when clicked
        /* button.addEventListener('click', function() {
            showDetails(pokemon);
        }); */    

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }

    function showDetails(pokemon) {
        console.log(pokemon.name);
    } 
    

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    }
})()




// 'for each' loop function to call objects in pokemonList array 
function callPokemon(pokemon) {
    pokemonRepository.addListItem(pokemon);
}

pokemonRepository.getAll().forEach(callPokemon)

