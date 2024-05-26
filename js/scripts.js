
let pokemonRepository = (function () {
   
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // adds pokemon objects to pokemonList array
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
    
    // adds pokemon to the ul in HTML with a button for each
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button');

        button.addEventListener("click", () => showDetails(pokemon));

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          pokemonModalRepository.showModal(pokemon);
        });
    }
    
    // Loads the list of pokemon names and detailsUrl from the API
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

    //loads individual details from the detailsUrl
      function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types.map(type => type.type.name);
          item.weight = details.weight;
        }).catch(function (e) {
          console.error(e);
        });
    }  
    
    return {
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails,
        showDetails      
    }
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


let pokemonModalRepository = (function() {
    
  function showModal(pokemon) {

  let modalContainer = document.querySelector('#pokemon-modal');

  //clears anything in the HTML container
  modalContainer.innerHTML = '';

  // now we create what we want in the container 
  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'x';
  closeButtonElement.addEventListener('click', hideModal);

  let pokemonName = document.createElement('h1');
  pokemonName.innerText = pokemon.name;

  let pokemonTypes = document.createElement('p');
  pokemonTypes.innerText = 'Type: ' + pokemon.types;
  
  let pokemonHeight = document.createElement('p');
  pokemonHeight.innerText = 'Height: ' + pokemon.height;

  let pokemonWeight = document.createElement('p');
  pokemonWeight.innerText = 'Weight: ' + pokemon.weight;

  let pokemonIMG = document.createElement('img');
  pokemonIMG.src = pokemon.imageUrl;
  //pokemonIMG.alt = pokemon.name;

  // Here we add all the creations made to the div in HTML
  modal.appendChild(closeButtonElement);
  modal.appendChild(pokemonName);
  modal.appendChild(pokemonTypes);
  modal.appendChild(pokemonHeight);
  modal.appendChild(pokemonWeight);
  modal.appendChild(pokemonIMG);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');

  //event listener to allow user to exit modal by clicking outside of it
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    } 
  });
}

//function used to hide Modal when you want to exit 
function hideModal() {
  let modalContainer = document.querySelector('#pokemon-modal');
  modalContainer.classList.remove('is-visible');
}

//event listener to allow user to exit modal by hitting the escape button
window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#pokemon-modal');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

return {
  showModal
}

})();





