var clientId = "eMyjvqyyWzQ8t7aDg0So5XDcWGCvmxsJ3qM3t6RUHgbuk2aCrn";
var secret = "aWV5jwQBJnkFks98afBWwFAl1vrEUNtLtl7ekKRB";
var token = "";
const main = document.querySelector("#main")
let pick = ""

fetch("https://api.petfinder.com/v2/oauth2/token", {
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST" 
   })
        .then (function(response) {
        return response.json();
     })
        .then(function (data) {
            token = data.access_token;
   })





document.addEventListener('DOMContentLoaded', function() {
    
    var images = document.querySelectorAll('.image-container img');

    images.forEach(function(image) {
        image.addEventListener('click', function() {
            pick += this.alt
            getData()
        });
    });
});


const getData = () => {

    fetch(`https://api.petfinder.com/v2/animals/?special_needs=1&type=${pick}&limit=50`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(function(response) {
        return response.json();
    }).then (function (data) {
    // console.log(data)
    getPets(data.animals)
    })
    }
    
    function getPets(pets) {
        main.innerHTML = "";
        pets.forEach((pet) => {
            let {name, description, url } = pet
            let photo = ""
            
            if (pet.primary_photo_cropped === null) {
                photo = "./assets/pics/silhouette.jpg"
            }
            else {
                photo = pet.primary_photo_cropped["full"]
            }
    
            const petEl = document.createElement('div')
            petEl.classList.add('pet')
    
            petEl.innerHTML = `
            <div class="pet">
                <a href = "${url}" target = "_blank"><img src=${photo}></a>
                <div class="pet-info">
                <div class="pet-name">
                    <h3>${name}</h3>
                </div>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${description}
                </div>
            </div>
            </div>
            `
    
            main.appendChild(petEl)
            pick = ""
        })
    }