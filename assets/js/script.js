const api = `AIzaSyB2xJTNdvozzeQXnSXSVt9o5hApjh1Jj-s`;
const searchinput = document.getElementById(`searchinput`);
const searchButton = document.getElementById(`searchButton`);
const apiUrl = `https://places.googleapis.com/v1/places/GyuEmsRBfy61i59si0?fields=addressComponents&key=AIzaSyB2xJTNdvozzeQXnSXSVt9o5hApjh1Jj-s`;       


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
    const apiUrl = `https://floating-headland-95050.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=AIzaSyB2xJTNdvozzeQXnSXSVt9o5hApjh1Jj-s`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
                //displayResults(data.results, map);
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
        placeDiv.classList.add('card', 'mb-3');
        placeDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${place.name}</h5>
                <p class="card-text">Address: ${place.formatted_address}</p>
                <p class="card-text">Rating: ${place.rating}</p>
            </div>
        `;
        resultsDiv.appendChild(placeDiv);

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

