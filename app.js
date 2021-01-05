const API = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generate_pokemon_promises = () => Array(150).fill().map((_, index) => fetch(API(index + 1)).then(response => response.json()))

const generate_HTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => 
    {const element_types = types.map(typeInfo => typeInfo.type.name)
        
        accumulator += `
        <li class="card ${element_types[0]}">
            <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />
            <h2 class="card-title">${id}. ${name}<h2>
            <p class="card-subtitle">${element_types.join(' | ')}</p>
        </li>
        `
        
        return accumulator
    }, '')


const insert_pokemons_into_page = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}
   
const pokemon_promises = generate_pokemon_promises()

Promise.all(pokemon_promises)
    .then(generate_HTML)
    .then(insert_pokemons_into_page)

