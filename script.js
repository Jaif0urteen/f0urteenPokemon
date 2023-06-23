

const listPokemon = document.getElementById('listPokemon')
let bottonsHeader = document.querySelectorAll('.btn_header')


const searchInput = document.querySelector("[data-search]")
searchInput.addEventListener("input" , e => {
    const namVal = e.target.value.toLowerCase()

    function showName(data){
        var nameVal = data.name
        if (namVal == nameVal) {
            dataPokemon(data)
        }
        

    }
    listPokemon.innerHTML = ""
    for (let i = 1; i <= 150; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then((response) => response.json())
            .then(data =>showName(data) )
    }

    
})

bottonsHeader.forEach(h_btn => h_btn.addEventListener("click", (event) => {
    const btnId = event.currentTarget.id;

    listPokemon.innerHTML = ""

    for (let i = 1; i <= 150; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then((response) => response.json())
            .then(data => {

                if (btnId === "home") {
                    dataPokemon(data)
                } else {
                    const lists = data.types.map(type => type.type.name)
                    if (lists.some(list => list.includes(btnId))) {
                        dataPokemon(data)
                    }
                }
            })
    }
}))





function dataPokemon(poke) {
    let abitlity = poke.types.map((type) => `
  <p class="${type.type.name} type">${type.type.name}</p>
   `)
    abitlity = abitlity.join("")



    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId
    }





    const div = document.createElement("div")
    console.log(div);
    div.classList.add("pokemon")
    div.innerHTML = `
    <p class="pokemon-id-back">#0${poke.id}</p>
                    <div class="pokemon-imag">
                        <img src="${poke.sprites.other['official-artwork'].front_default}"
                            alt="${poke.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="number-container">
                            <p class="pokemon-id">#0${poke.id}</p>
                            <h2 class="pokemon-name">${poke.name}</h2>
                        </div>
                        <div class="pokemon-type">
                           ${abitlity}
                        </div>
                        <div class="pokemon-state">
                            <p class="state">${poke.height}M</p>
                            <p class="state">${poke.weight}KG</p>
                        </div>
                    </div>
                </div>
    `
    listPokemon.append(div)
}



function pokemonAPI() {
    for (let i = 1; i <= 150; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then((response) => response.json())
            .then(data => dataPokemon(data))
    }
}


pokemonAPI()

























































