console.log("script.js loaded");

const apiKey = "HH893KzFMnLU8dSDFMsyRKBAJps0eGLN";

const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=cats&limit=10`;

async function fetchGifs() {
    const response = await fetch(endpoint);

    const data = await response.json();

    const images = data.data.map(gif => gif.images.original.url);

    console.log(images);
}

fetchGifs();