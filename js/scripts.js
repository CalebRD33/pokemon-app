
let pokemonRepository = (function () {   
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function showModal(pokemon) {  

    // load pokemon name and details into HTML Bootstrap modal
    let modalBody = $('.modal-body');    
    modalBody.empty();

    let pokemonName = $('<h3></h3>').text(pokemon.name);
    let pokemonTypes = $('<p></p>').text('Type: ' + pokemon.types);
    let pokemonHeight = $('<p></p>').text('Height: ' + pokemon.height);      
    let pokemonWeight = $('<p></p>').text('Weight: ' + pokemon.weight);  
    let pokemonIMG = $('<img>')
      .attr('src', pokemon.imageUrl)
      .attr('alt', 'Picture of ' + pokemon.name);

    modalBody.append(pokemonName);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonIMG);
  } 

  // adds pokemon objects to pokemonList array
  function add(pokemon) {
    // conditional to make sure that objects can only be added to the pokemonList array
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
      console.log("Pokemon added successfully!")
    } else {
      console.log("Error: Pokemon is not the correct format.")
    }        
  } 

  function getAll() {
    return pokemonList;
  }
 
  // adds pokemon to the div in HTML with a button for each
  function addListItem(pokemon) {
    let pokemonList = $('.list-group');
    let button = $('<button></button>')
      .addClass('btn btn-info')
      .attr('id', 'pokemon-button')
      .attr('data-toggle', 'modal')
      .attr('data-target', '#pokemon-modal')
      .attr('type', 'button')
      .text(pokemon.name)
      .click(() => showDetails(pokemon));
   
    pokemonList.append(button);
  }


  function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
  }
  
  // Loads the list of pokemon names and detailsUrl from the API (Fetch and Promise function)
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

  //loads individual details from the detailsUrl (Fetch and Promise function)
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

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
