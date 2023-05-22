let search = document.querySelector('#search');

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    search.value = localStorage.getItem('searchValue');
    showAlbum(search.value);
})

let btnSearch = document.querySelector('#btnSearch');
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem('searchValue', search.value);
    let storedSearchValue = localStorage.getItem('searchValue');
    showAlbum(storedSearchValue);
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

const showAlbum = async (search) => {
    const dataAll = await getDataSearched(search);
    let contenedorAlbum = document.querySelector('#contenedorAlbum');
    contenedorAlbum.innerHTML = "";
    for(let i=0; i<dataAll.data.length; i++){
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