// 🔑 Marvel API keys
const publicKey = "15f59758de2dc90ae0e263bf806565b9";
const privateKey = "fec7157899e4e4f3645cbe71d010f4dbf5da95c7";

const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

// Elements
const searchInput = document.getElementById("searchInput");
const filterDropdown = document.getElementById("filterDropdown");
const loader = document.getElementById("loader"); // 👈 add a loader div in HTML
let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

// Show/hide loader
function showLoader() {
  if (loader) loader.style.display = "flex";
}
function hideLoader() {
  if (loader) loader.style.display = "none";
}

// Fetch comics from Marvel API
async function fetchMarvelComics(searchValue = "", filterValue = "") {
  try {
    showLoader();

    let url = `https://gateway.marvel.com/v1/public/comics?limit=20&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    // Add search parameter (title starts with)
    if (searchValue) {
      url += `&titleStartsWith=${encodeURIComponent(searchValue)}`;
    }

    // Add filter (format like comic, magazine, etc.)
    if (filterValue) {
      url += `&format=${filterValue}`;
    }

    const response = await fetch(url);
    const json = await response.json();
    const comics = json.data.results.map(c => ({
      id: c.id,
      title: c.title,
      author: c.creators.items.length > 0 ? c.creators.items[0].name : "Unknown",
      category: c.format,
      image: `${c.thumbnail.path}.${c.thumbnail.extension}`
    }));

    renderCards(comics);
  } catch (error) {
    console.error("Error fetching Marvel comics:", error);
  } finally {
    hideLoader();
  }
}

// Fetch comics by IDs (for favourites page)
async function fetchComicsByIds(ids) {
    try {
      showLoader();
  
      if (!ids.length) {
        renderCards([], "favouritesContainer");
        hideLoader();
        return;
      }
      console.log("jfjd",ids);
      // Fetch all comics in parallel
      const promises = ids.map(async (id) => {
        const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        const response = await fetch(url);
        const json = await response.json();
        if (json.data.results.length > 0) {
          const c = json.data.results[0];
          return {
            id: c.id,
            title: c.title,
            author: c.creators.items.length > 0 ? c.creators.items[0].name : "Unknown",
            category: c.format,
            image: `${c.thumbnail.path}.${c.thumbnail.extension}`
          };
        }
        return null;
      });
  
      const comics = (await Promise.all(promises)).filter(c => c !== null);
  
      renderCards(comics, "favouritesContainer");
    } catch (error) {
      console.error("Error fetching favourites:", error);
    } finally {
      hideLoader();
    }
  }
  

// Render comic cards
function renderCards(data, containerId = "cardsContainer") {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `<p>No comics found</p>`;
    return;
  }

  data.forEach(book => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
      <i class="favorite fa-heart ${favourites.includes(book.id) ? "fas active" : "far"}" data-id="${book.id}"></i>
    `;

    // Navigate to details page
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("favorite")) return;
      window.location.href = `details.html?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&category=${encodeURIComponent(book.category)}&image=${encodeURIComponent(book.image)}`;
    });

    // Toggle favourite
    card.querySelector(".favorite").addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(e.target.dataset.id);
      if (favourites.includes(id)) {
        favourites = favourites.filter(fav => fav !== id);
      } else {
        favourites.push(id);
      }
      console.log("jdjd",favourites);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      renderCards(data, containerId); // re-render to update icon
    });

    container.appendChild(card);    
  });
}

// Render favourites page
function renderFavourites() {
  favourites = favourites.filter(id => id !== 1);
  if (!favourites.length) {
    renderCards([], "favouritesContainer");
  } else {
    fetchComicsByIds(favourites);
  }
}

// Init (only on index.html)
if (searchInput && filterDropdown) {
  searchInput.addEventListener("input", () => {
    fetchMarvelComics(searchInput.value.toLowerCase(), filterDropdown.value);
  });

  filterDropdown.addEventListener("change", () => {
    fetchMarvelComics(searchInput.value.toLowerCase(), filterDropdown.value);
  });

  // Initial load
  fetchMarvelComics();
}
