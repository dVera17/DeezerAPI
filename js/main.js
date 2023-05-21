let search = document.querySelector('#search');
let btnSearch = document.querySelector('#btnSearch');
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(search.value);
})