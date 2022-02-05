async function app() {
    console.log('App loaded');
    const pokemonId = window.location.search.split('=')[1];
    console.log(pokemonId);
    let URL_POKEAPI = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
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
        let template = `${data.weight}`;
        document.querySelector('.pokemon-details').innerHTML = template;
    }
}
document.addEventListener('DOMContentLoaded', app);

//data-id="${item.index}"
