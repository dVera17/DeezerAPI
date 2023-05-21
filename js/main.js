let search = document.querySelector('#search');
let btnSearch = document.querySelector('#btnSearch');
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    let busqueda = search.value;
    showBestResult(busqueda);
    showSongs(busqueda);
    showAlbum(busqueda);
})

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd4c45a2ccemsh4c7f0da2d8647eap1d8471jsnbd7511e676db',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

const getDataSearched = async (search) => {
    let res = await (await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`, options)).json();
    return res;
}

const getInfoArtist = async (id) => {
    let res = await (await fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}`, options)).json();
    return res;
}

const showBestResult = async (search) => {
    let imgArtist = document.querySelector('#imgArtist');
    let nameArtist = document.querySelector('#nameArtist');
    let fansArtist = document.querySelector('#fansArtist');
    const dataAll = await getDataSearched(search);
    const infoArtist = await getInfoArtist(dataAll.data[0].artist.id)
    imgArtist.src = dataAll.data[0].artist.picture;
    nameArtist.textContent = dataAll.data[0].artist.name;
    fansArtist.textContent = infoArtist.name;
}

const showSongs = async (search) => {
    let contenedorCanciones = document.querySelector('#contenedorCanciones')
    const dataAll = await getDataSearched(search);
    console.log(dataAll);
    contenedorCanciones.innerHTML = "";
    for(let i=0; i<6; i++){
        let div = document.createElement('div')
        div.classList = "content-cancion";
        div.innerHTML = `
        <div class="column-1">
            <div class="left-cancion">
                <figure>
                    <img src="${dataAll.data[i].album.cover}" alt="">
                </figure>
                <p>${dataAll.data[i].title}</p>
            </div>
            <div class="btn-microfono">
                <button class="btnMicrofono" id="btnAudio">
                    <svg viewBox="0 0 16 16" focusable="false" class="chakra-icon css-1yk3h4a e3mndjk0" data-testid="MicrophoneStandIcon" aria-hidden="true"><path d="M15 4.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0zm1 0a4.5 4.5 0 0 1-5.099 4.46L3.048 15 0 12l7-7.58v.08a4.5 4.5 0 1 1 9 0zM7.166 5.715l-5.774 6.252 1.736 1.71 6.57-5.053a4.511 4.511 0 0 1-2.532-2.91z"></path></svg>
                </button>
            </div>
        </div>
        <div class="column-other">
            <div class="column-2">
                <span>${dataAll.data[i].artist.name}</span>
            </div>
            <div class="column-3">
                <span>${dataAll.data[i].album.title}</span>
            </div>
            <div class="column-4">
                <span>${calculateDuration(dataAll.data[i].duration)}m</span>
            </div>
        </div>
        `;
        contenedorCanciones.appendChild(div);
    }    
}

const showAlbum = async (search) => {
    const dataAll = await getDataSearched(search);
    let contenedorAlbum = document.querySelector('#contenedorAlbum');
    contenedorAlbum.innerHTML = "";
    for(let i=0; i<4; i++){
        let div = document.createElement('div');
        div.classList = "card-ind";
        div.innerHTML = `
        <figure>
            <img src="${dataAll.data[i].album.cover_medium}" alt="">
        </figure>
        <div class="thumbnail-caption">
            <div class="heading-4">
                <span>${dataAll.data[i].album.title}</span>                                          
            </div>
        </div>                       
        <div class="heading-4-sub">
            <span>de <span>${dataAll.data[i].artist.name}</span></span>
        </div>
        `;
        contenedorAlbum.appendChild(div)
    }
}

const calculateDuration = (duration) => {
    return (parseInt(duration)/60).toFixed(1);
}
