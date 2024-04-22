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
    },
];


for (let i = 0; i < pokemonList.length; i++) {
    //loop through each object in the array
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + 'ft)');
    //check the height of each pokemon
    if (pokemonList[i].height > 6) {
        document.write(' -Wow. That\'s big!')
    };
    document.write('<br>')
}

