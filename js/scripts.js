
let pokemonRepository = (function () {
   
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        // conditional to make sure that objects can only be added to the pokemonList array
        if (typeof pokemon === 'object' &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
            console.log("Pokemon added successfully!")
        } else {
            console.log("Error: Pokemon is not the correct format.")
        }        
    } 

    function getAll() {
        return pokemonList;
    }
    
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button');

        // Advanced way of using an event listener
        button.addEventListener("click", () => showDetails(pokemon));

        /*
        // original event listener that runs showDetails() function when clicked
         button.addEventListener('click', function() {
            showDetails(pokemon);
        }); 
        */

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
    }
    
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
    }

      function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }  

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails      
    }
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });

/*
// 'for each' loop function to call objects in pokemonList array 
function callPokemon(pokemon) {
    pokemonRepository.addListItem(pokemon);
}

pokemonRepository.getAll().forEach(callPokemon)
*/
