var limit = 20
var offset = 0
var index = 10

function get(){
    let baseUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    offset += index
    
    fetch(baseUrl)
        .then((res) => res.json())
        .then((body) => body.results)
        .then((pokemonList) => {
            pokemonList.forEach(pokemon => {
                buildPokemonData(pokemon.url)
            });
        })
}

function buildTypes(slots){
    let typeHtml = ''
    slots.forEach((slot) => {
        typeHtml +=
            `<li class="type ${capitalize(slot.type.name)}-type">
                <img src="./assets/icons/${capitalize(slot.type.name)}.svg" class="type-image" alt=""/>
                <div class="type-name">
                    ${capitalize(slot.type.name)}
                </div>
            </li>`
    })
    return typeHtml
}

function capitalize(string =''){
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function buildPokemonData(pokemonUrl){
    var html
    let pokemonHtmlList = document.getElementById("pokemons-list")

    fetch(pokemonUrl)
    .then((response) => response.json())
    .then((pokemonInfo) => {
        html = `
        <li class="pokemon ${capitalize(pokemonInfo.types[0].type.name)}">
        <h3 class="pokemon-name">${capitalize(pokemonInfo.name)}</h3>
        <section class="details">
            <ul class="pokemon-types">
            ${buildTypes(pokemonInfo.types)}
            </ul>
            <img class="pokemon-image" src="${pokemonInfo.sprites.front_default}"/>
        </section>
        </li>
        `
        pokemonHtmlList.innerHTML += html
    })
}

get()