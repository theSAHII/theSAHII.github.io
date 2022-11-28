// scroll planes & prices
function scrollPlansPrice() {
    let cards_container = document.querySelector("#plansPrice .cards")
    if (cards_container.scrollHeight < 300) return
    cards_container.scrollTop += 230
    console.log(cards_container.scrollHeight, cards_container.scrollTop)
    if (cards_container.scrollHeight - cards_container.scrollTop < 250)
        cards_container.scrollTop -= cards_container.scrollHeight
}
setInterval(scrollPlansPrice, 5000)


// amenities slideshow
let amenitiesSlideIndex = 1;
setInterval(function () {
    amenitiesSlide(amenitiesSlideIndex++)
}, 3000)

function amenitiesSlideShowIndex(n) {
    amenitiesSlide(amenitiesSlideIndex += n);
}

function amenitiesSlide(n) {
    let i,
        x = document.getElementsByClassName("amenities_img_slide"),
        y = document.getElementsByClassName("amenities_text_slide");
    if (n >= x.length) { amenitiesSlideIndex = 1 }
    if (n < 1) { amenitiesSlideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        y[i].style.display = "none";
    }
    x[amenitiesSlideIndex - 1].style.display = "block";
    y[amenitiesSlideIndex - 1].style.display = "block";
    document.getElementById("amenities_slider_count").innerText = `${amenitiesSlideIndex}/${x.length}`
}

// life at palava slideshow
let slideShowIndex = 1;
lifeAtPalavaSlide(slideShowIndex);
setInterval(function () {
    lifeAtPalavaSlide(slideShowIndex++)
}, 3000)

function lifeAtPalavaSlideIndex(n) {
    lifeAtPalavaSlide(slideShowIndex += n);
}

function lifeAtPalavaSlide(n) {
    let i;
    let x = document.getElementsByClassName("slideshow_card");
    if (n >= x.length) { slideShowIndex = 1 }
    if (n < 1) { slideShowIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideShowIndex - 1].style.display = "block";
}

// fetch data file
let obj;
fetch('data.json')
    .then(response => response.json())
    .then(data => COUNTRY(data))
    .catch(err => console.log(err));

function COUNTRY(data) {
    obj = data
    let countryTag = document.getElementById("country")
    for (let country in data) {
        if (country == "India") CITY(country)
        else {
            countryTag.innerHTML += `<option value ="${country}" data-code="${data[country]["code"]}" data-dial="${data[country]["dail_code"]}">${country}</option>`
        }
    }
    countryTag.onchange = function (e) {
        CITY(countryTag.value)
    }
}

function CITY(countryName) {
    document.querySelector("form input[name='country_code']").value = (obj[countryName]["dial_code"])

    let cityTag = document.getElementById("city")
    let cities = obj[countryName]["cities"]
    cityTag.innerHTML = ``
    if (!cities) {
        cityTag.innerHTML = `<option value ="Others">Others</option>`
        return
    }
    for (let city of cities) cityTag.innerHTML += `<option value ="${city}">${city}</option>`
}


function datepicker(val) {
    if (val == "visit") {
        document.getElementById("fdatetimepicker").style.display = "initial"
        document.getElementById("fdatetimepicker").setAttribute("required", true)
    }
    else {
        document.getElementById("fdatetimepicker").style.display = "none"
        document.getElementById("fdatetimepicker").removeAttribute("required")
    }
}

document.querySelector("body>nav>button.primary_btn").onclick = function () {
    let form = document.querySelector("form")
    console.log(
        form.style.display
    )
    if (form.style.display != "none") form.scrollIntoView(true)
    if (!form.style.display) form.classList.add("visible")
    else if (form.classList.contains("visible")) alert("ko")
}

document.getElementById("closeForm").onclick = function () {
    let form = document.querySelector("form")
    form.classList.remove("visible")
    form.reset()
}
//
