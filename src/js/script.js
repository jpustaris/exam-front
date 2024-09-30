const activities = [
    {
    productname: 'Barangay Clearance',
    productnumber: '85743',
    actstatus: 'Due',
    status: 'Pending'
    },
    {
        productname: 'Barangay Indigency',
        productnumber: '97245',
        actstatus: 'Not Resident',
        status: 'Declined'
    },
    {
        productname: 'Barangay Business Permits',
        productnumber: '85743',
        actstatus: 'Pass',
        status: 'Active'
    },
]

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n){
    showSlides(slideIndex += n);
}

function currentSlides(n){
    showSlides(slideIndex = n);
}

function showSlides(n){
    var i;
    var slides = document.getElementsByClassName("myslides");
    var dots   = document.getElementsByClassName("dot");
    if (n > slides.length){slideIndex = 1}
    if (n < 1){slideIndex = slides.length}
    for (i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    for(i = 0; i < dots.length; i++ ){
        dots[i].className = dots[i].className.replace("active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += "active";
}


var slideIndex = 0;
showSlides();

function showSlides() {
    var i;

    var slides = document.getElementsByClassName("myslides");
    for (i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    slideIndex++;

    if(slideIndex > slides.length){
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000);
}


let time = document.getElementById('current-time');

setInterval(() => {
let currentTime = date.toLocaleTimeString();
time.innerHTML = currentTime;
}, 1000);

const currentDate = document.querySelector('current-date'),
daysTag = document.querySelector('days'),
prevNextIcon = document.querySelectorAll('icons span');
        
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
const renderCalendar = () => {
let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
LastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
let liTag = "";
        
for (let i = firstDayofMonth; i > 0; i--){
liTag += `<li class="inactive">${LastDateofMonth - i + 1}</li>`;
}

for (let i = 1; i <= LastDateofMonth; i++){
let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
liTag += `<li class="${isToday}">${i}</li>`;
}
        
for (let i = lastDayofMonth; i < 6; i++){
liTag += `<li class="inactive">${i - lastDateofLastMonth + 1}</li>`;
}
currentDate.innerText = `${months[currMonth]} ${currYear}`;
daysTag.innerHTML = liTag;
}
 renderCalendar();
prevNextIcon.forEach(icon => {
icon.addEventListener("click", () => {
currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        
if (currMonth < 0 || currMonth > 11){
date = new Date(currYear, currMonth);
currYear = date.getFullYear();
currMonth = date.getMonth(); 
} else {
date = new Date();}
renderCalendar();
});
});
         