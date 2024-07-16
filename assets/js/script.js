const api = `AIzaSyB2xJTNdvozzeQXnSXSVt9o5hApjh1Jj-s`;
const searchinput = document.getElementById(`searchinput`);
const searchButton = document.getElementById(`searchButton`);
const apiUrl = `https://places.googleapis.com/v1/places/GyuEmsRBfy61i59si0?fields=addressComponents&key=AIzaSyB2xJTNdvozzeQXnSXSVt9o5hApjh1Jj-s`;      
const storedFoodTypes = JSON.parse(localStorage.getItem("Cuisine")) || []; 
const foodTypeButtonContainer = document.getElementById("foodTypeButtonContainer");
const container = document.getElementById("container");

//global variable to get the value of the modal pop-up button (hungry)
const modalPop = $('#modal-pop')

//on click function that opens modal when hungry button is clicked
$(modalPop).on('click', function () {
    const modal = $('.modal');
    modal.css('display', 'block');
});

//on click function that closes modal when search, pick for me ia clicked
$('.buttons').click(function() {
    $('.modal').css('display', 'none');
});


searchButton.addEventListener("click", function () {
     const foodType = searchinput.value.trim();
     fetchApiData(foodType);
   });

(g => {
    var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
    b = b[c] || (b[c] = {});
    var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => h = n(Error(p + " could not load."));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a)
    }));
    d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))
})({
    key: "AIzaSyA_mJahPyLw6StJycvImkWbF8CrBlLFo1o",
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
});

// Initialize the map and places service
function initialize() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.866, lng: 151.196 },
        zoom: 15,
    });

    document.getElementById('searchButton').addEventListener('click', () => {
        const query = document.getElementById('food-input').value;
        if (query) {
            fetchApiData(query, map);
        } else {
            alert("Please enter a type of food.");
        }
    });
}

// Fetch API data and display results
function fetchApiData(query, map) {
    storeSearchHistory(query);
    const apiUrl = `https://floating-headland-95050.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}?pageSize=2&key=AIzaSyB2xJTNdvozzeQXnSXSVt9o5hApjh1Jj-s`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayResults(data.results, map);
        }
        )
        .catch(err => {
            console.error(err);
        });
 
}


// Display search results and place markers on the map
function displayResults(places, map) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    places.forEach(place => {
        const placeDiv = document.createElement('div');
        placeDiv.classList.add('col', 's4');
        placeDiv.innerHTML = `
             // <img class="hoverable image-border">${place.rating}</img>
        <h6 class="restaurant-name">${place.name}</h6>
        `;
        // iffy about this up here (place.rating)
        resultsDiv.appendChild(placeDiv);
            console.log(place)
        if (place.geometry && place.geometry.location) {
            const marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
            });

            const infowindow = new google.maps.InfoWindow();
            marker.addListener('click', () => {
                infowindow.setContent(`
                    <div>
                        <h2>${place.name}</h2>
                        <p>${place.formatted_address}</p>
                        <p>Rating: ${place.rating}</p>
                    </div>
                `);
                infowindow.open(map, marker);
            });
        }
    });
}

// Initialize the map when the Google Maps API is loaded
window.google.maps.__ib__ = initialize;



container.innerHTML = "";

function storeSearchHistory(foodType) {
    if (!storedFoodTypes.includes(foodType)) {
      storedFoodTypes.push(foodType);
      localStorage.setItem("Cuisine", JSON.stringify(storedFoodTypes));
      renderSearchHistoryButtons();
    }
  }
  
  
  function renderSearchHistoryButtons() {
    foodTypeButtonContainer.innerHTML = '';
    storedFoodTypes.forEach(foodType => {
      const button = document.createElement("button");
      button.textContent = foodType;
      button.classList.add("history-btn");
      button.addEventListener("click", () => fetchApiData(foodType));
      foodTypeButtonContainer.appendChild(button);
    });
  }
  
  
  renderSearchHistoryButtons();
