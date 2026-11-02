console.log("script.js loaded");

const apiKey = "HH893KzFMnLU8dSDFMsyRKBAJps0eGLN";

const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=cats&limit=10`;

const gifContainer = document.querySelector("#gif-container");

const fetchButton = document.querySelector("#fetch-gif-btn");

async function fetchGifs() {
    const response = await fetch(endpoint);

    const data = await response.json();

    const images = data.data.map(gif => gif.images.original.url);

    console.log(images);

    return images;
}

fetchButton.addEventListener("click", async () => {
    const images = await fetchGifs();

    gifContainer.innerHTML = "";

    for (const image of images) {
        gifContainer.innerHTML += `<img src="${image}" class="col-3 mb-3" alt="Giphy GIF">`;
    }
});