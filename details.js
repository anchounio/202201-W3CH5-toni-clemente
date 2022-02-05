async function app() {
    console.log('App loaded');
    const pokemonName = window.location.search.split('=')[1];
    console.log(pokemonName);
    let URL_POKEAPI = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let data = await initiatePokeApi();
    showData(data);
    paint(data);

    async function initiatePokeApi() {
        const resp = await fetch(URL_POKEAPI, {
            mode: 'cors',
        });
        return resp.json();
    }

    function showData(data) {
        console.log(data);
    }

    function paint(data) {
        let template = `${data.species.name}
        <img src="${data.sprites.front_default}">
        `;
        document.querySelector('.pokemon-details').innerHTML = template;
    }

    function addFav() {}

    function delFav() {}

    document.querySelector('#Add').addEventListener('click', addFav);
    document.querySelector('#Delete').addEventListener('click', delFav);
}
document.addEventListener('DOMContentLoaded', app);
