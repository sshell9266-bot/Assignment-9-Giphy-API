console.log("script.js loaded");

// Giphy API key for this assignment.
const apiKey = "HH893KzFMnLU8dSDFMsyRKBAJps0eGLN";

// Select the HTML elements used by the application.
const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");
const statusMessage = document.querySelector("#status-message");

// Fetch GIF URLs from the Giphy API using a search term.
async function fetchGifs(searchTerm) {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=12`;

    const response = await fetch(endpoint);

    // Check whether the API request was successful.
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Check that the response contains a valid GIF array.
    if (!Array.isArray(data.data)) {
        throw new Error("Invalid response from the Giphy API.");
    }

    // Extract the original GIF URLs into an array.
    const images = data.data
        .map(gif => gif.images?.original?.url)
        .filter(Boolean);

    console.log(images);

    return images;
}

// Display the GIFs inside the gallery.
function displayGifs(images) {
    // Remove GIFs from the previous search.
    gifContainer.innerHTML = "";

    // Handle searches that return no GIFs.
    if (images.length === 0) {
        statusMessage.textContent = "No GIFs found. Try another search!";
        return;
    }

    // Create an image for each URL.
    for (const image of images) {
        gifContainer.innerHTML += `
            <div class="col-3 mb-3 gif-item">
                <img src="${image}" alt="Giphy search result" loading="lazy">
            </div>
        `;
    }
}

// Fetch and display GIFs when the button is clicked.
fetchButton.addEventListener("click", async () => {
    const searchTerm = searchInput.value.trim() || "cats";

    // Show a loading message and prevent repeated clicks.
    statusMessage.textContent = "Loading GIFs...";
    fetchButton.disabled = true;

    try {
        const images = await fetchGifs(searchTerm);

        statusMessage.textContent = "";

        displayGifs(images);
    } catch (error) {
        // Display a friendly message if the request fails.
        console.error("Error fetching GIFs:", error);

        gifContainer.innerHTML = "";
        statusMessage.textContent = "Unable to load GIFs. Please try again.";
    } finally {
        // Re-enable the button after the request finishes.
        fetchButton.disabled = false;
    }
});