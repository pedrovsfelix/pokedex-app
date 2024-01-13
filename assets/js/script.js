const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon');
const form = document.querySelector('.pokemon-search');
const input = document.querySelector('.info-pokemon');
const btNext = document.querySelector('.btn-next');
const btPrev = document.querySelector('.btn-prev');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
     if (APIResponse.status == 200){

    const data = await APIResponse.json();
    return data;
}
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'carregando ...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if (data){
    pokemonImage.style.display = 'block';    
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    input.value = '';
    searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'não encontrado.'
        pokemonNumber.innerHTML = '';
    }
}


form.addEventListener('submit', (event) =>{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

});

btPrev.addEventListener('click', () =>{
    if (searchPokemon > 1) {
        searchPokemon -= 1;
         renderPokemon(searchPokemon);
    }
});


btNext.addEventListener('click', () =>{
    searchPokemon += 1;
     renderPokemon(searchPokemon);
    });

renderPokemon(searchPokemon);


// ---- GSAP ----

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {


  var tl1 = gsap.timeline();
    
  tl1
  .to('.screen-loading', {
    duration: 2,
    opacity: 0, 
    delay: 3,
    ease: "power4.out",
  })
  .from(".text-pokemon", {
    duration: 2, 
    opacity: 0,
    y: 400, 
    stagger:{each: 0.1},
    ease: "power4.out",
  }, '-=1.0')
  .from(".div-pokedex", {
    duration: 1, 
    opacity: 0, 
    stagger:{each: 0.1},
    ease: "power4.out",
  }, '-=1.0')
  .from(".div-pokemon .pokemon", {
    duration: 2, 
    opacity: 0, 
    y: 20,
    stagger:{each: 0.2},
    ease: "back.out(1.7)",
  }, '-=0.5')
  .from(".pokemon-content", {
    duration: 2, 
    opacity: 0, 
    y: 200,
    stagger:{each: 0.2},
    ease: "back.out(1.7)",
  }, '-=1.7')
  .from(".buttons", {
    duration: 2, 
    opacity: 0, 
    y: 200,
    stagger:{each: 0.2},
    ease: "back.out(1.7)",
  }, '-=1.7')
  .from(".pokemon-search", {
    duration: 2, 
    opacity: 0, 
    y: 200,
    stagger:{each: 0.2},
    ease: "back.out(1.7)",
  }, '-=1.7')
    
});

ScrollTrigger.addEventListener("scrollStart", () => {
  ScrollTrigger.refresh();
});