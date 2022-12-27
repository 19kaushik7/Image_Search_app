const inputEl = document.querySelector('#inputEl');
const buttonEl = document.querySelector('#buttonSearchEl');
const nextEl = document.querySelector('.next');
const GalleryEl = document.querySelector('.Gallery');
const auth = '563492ad6f91700001000001798834d0c92e4ed8bd057fac54486116 ';
let page = 1;
let search = false;
let query = '';

async function curatedPhoto() {
    if (search == false && query == "") {
        const data = await fetch(
            `https://api.pexels.com/v1/curated?per_page=18&page=${page}`,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: auth,
                },
            }
        )
        const result = await data.json();
        result.photos.forEach(photo => {
            const pic = document.createElement('div');
            pic.innerHTML = `<img src=${photo.src.large}>
            <p>Photo : ${photo.photographer}</p>
            <a href=${photo.src.large}>Download</a>`;
            GalleryEl.appendChild(pic);
        });
    }

else {
    const data = await fetch(
        `https://api.pexels.com/v1/search?query=${query}/curated?per_page=18&page=${page}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: auth,
            },
        }
    )
    const result = await data.json();
    result.photos.forEach(photo => {
        const pic = document.createElement('div');
        pic.innerHTML = `<img src=${photo.src.large}>
        <p>Photo : ${photo.photographer}</p>
        <a href=${photo.src.large}>Download</a>`;
        GalleryEl.appendChild(pic);
    });
}
}
 let loaderSec = document.querySelector('.loader-sec');
// search button 
buttonEl.addEventListener('click', function(e) {
    e.preventDefault();
    query = inputEl.value;
    console.log(query);
    loaderSec.style.display = 'flex'
    setTimeout(() => {
        loaderSec.style.display = 'none'
    }, 1000);
    GalleryEl.innerHTML = '';
    curatedPhoto();
    inputEl.value = '';
})

// Next Button 
nextEl.addEventListener('click', () => {
    page++;
    curatedPhoto();
})
curatedPhoto();