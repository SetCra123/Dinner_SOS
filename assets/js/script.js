const api = `AIzaSyB2xJTNdvozzeQXnSXSVt9o5hApjh1Jj-s`;
const searchinput = document.getElementById(`searchinput`);
const searchButton = document.getElementById(`searchButton`);
const apiUrl = `https://places.googleapis.com/v1/places/GyuEmsRBfy61i59si0?fields=addressComponents&key=AIzaSyB2xJTNdvozzeQXnSXSVt9o5hApjh1Jj-s`;       


function getdata(){     
    fetch(apiUrl)
    .then(function (response) {
         return response.json();
    })
    
    .then(function (data) {
         console.log(data);
    })
    
    .catch(function (error) {
         console.error(error);
})
}