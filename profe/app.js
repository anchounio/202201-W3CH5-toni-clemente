async function app() {
    console.log('App loaded');
    const URL_SERIES = 'http://localhost:3000/series/';
    const data = await initiateSeries();
    render();

    async function initiateSeries() {
        const resp = await fetch(URL_SERIES, {
            mode: 'cors',
        });
        return resp.json();
    }

    function showData(data, section) {
        console.log(data);
        let template = '';
        data.forEach((itemSeries) => {
            template += `
                <li class="serie">
                    <img
                        class="serie__poster"
                        src="${itemSeries.poster}"
                        alt="${itemSeries.name}"
                        data-id="${itemSeries.id}"
                    />
                    <h4 class="serie__title">${itemSeries.name}</h4>
                    <p class="serie__info">${itemSeries.creator} (${itemSeries.year})</p>
                    <ul class="score">
            `;
            for (let i = 1; i <= itemSeries.score; i++) {
                template += `
                 <li class="score__star">
                            <i
                                class="icon--score fas fa-star"
                                title="${i}/5"
                            ></i>
                        </li>
                `;
            }

            template += `        </ul>
                    <i class="fas fa-times-circle icon--delete"></i>
                </li>`;
        });
        document
            .querySelector(section)
            .querySelector('.series-list').innerHTML = template;
    }

    function render() {
        showData(
            data.filter((item) => {
                return !item.watched;
            }),
            '.series-pending'
        );
        showData(
            data.filter((item) => {
                return item.watched;
            }),
            '.series-watched'
        );
        document
            .querySelectorAll('.serie__poster')
            .forEach((poster) => poster.addEventListener('click', handleState));
    }

    function handleState(ev) {
        const id = ev.target.dataset.id;
        console.log(id);
        const index = data.findIndex((item) => item.id === +id);
        console.log(index);
        data[index].watched = !data[index].watched;
        const body = {
            watched: data[index].watched,
        };
        fetch(URL_SERIES + id, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            mode: 'cors',
        })
            .then((resp) => {
                console.log(resp);
                return resp.json();
            })
            .then((data) => console.log(data));
        render();
    }
}

document.addEventListener('DOMContentLoaded', app);
