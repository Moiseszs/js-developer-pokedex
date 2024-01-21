const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const detailSection = document.getElementById('details')
const MainSection = document.getElementById('content')
const backButton = document.getElementById('back')


const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="showDetails(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function fillDetails(pokemon){
    return `
        <div class="banner ${pokemon.type}">
            <div>
                <button id="back" onclick="goBack()"> &larr;</button>
            </div>
            <div class="presentation">
                <div>
                    <h1>${pokemon.name}</h1>
                </div>
                <div>
                    <h3 style="color: #e3e8e3; padding-right: 3rem">#${pokemon.number}</h3>
                </div>
            </div>
            <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
            </ol>

            <div class="photo">
                <img src="${pokemon.photo}">
            </div> 
        </div>
        <div style="margin-bottom: -320px; background-color: white">
            <div class="${pokemon.type}" style="width: 7%; height: 100px;border-bottom-right-radius: 0.40%; "> </div>
            <div style="background-color: #f6f8fc; transform: translate(-1px, -100px);  width: 10%; height: 100px; border-top-left-radius: 60%; padding: 10px; "></div>
            <div class="${pokemon.type}" style="transform: translate(90vw, -200px);  width: 10%; height: 100px; border-bottom-left-radius: 89%; padding: 1px;"></div>
            <div style="overflow: hidden;background-color: inherit;transform: translate(90vw, -300px);  width: 10%; height: 100px; border-top-right-radius: 80%; padding-left: 100px;"></div>
        </div>
        <div class="info" style="background-color: white; color: #292b29; padding: 1rem">
            <div>
                <h3>About: </h3>
                <div style="padding-left: 10px;">
                    <p>Height: ${pokemon.height / 10} cm</p>
                    <p>Weight: ${pokemon.weight} lb </p>
                    <p>Abilities: ${pokemon.types.map((ability) => ` ${ability}`)}
                </div>
                
            </div>
        </div>
    `
}

function loadDetails(pokemon){
    const html = fillDetails(pokemon)
    MainSection.style.display = 'None'
    console.log(html)
    detailSection.innerHTML = html;
    detailSection.style.display = 'inherit'
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


const showDetails = (number) =>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`).
    then(res => res.json())
    .then(res => convertPokeApiDetailToPokemon(res))
    .then(pokemon => loadDetails(pokemon))
}

const goBack = () =>{
    MainSection.style.display = 'block'
    detailSection.style.display = 'none'
}