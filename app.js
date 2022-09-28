const api={
    key:"70b10fbcbdc3aba2345733a0c7f1f946",
    base:"https://api.openweathermap.org/data/2.5/"
}

const search=document.querySelector(".search");
const btn=document.querySelector(".btn");

btn.addEventListener('click', getInput);


function getInput(e){
e.preventDefault();
if(e.type=="click"){
    getData(search.value);
}
}

function getData(){
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then((res)=>{
       return res.json();
    })
    .then((data)=>{
       if(data.cod=="404"){
        const error=document.querySelector(".error");
        error.textContent="Enter Valid City name";
        search.value="";
       }else{
        const city=document.querySelector('.city');
        city.innerHTML=`${data.name}, ${data.sys.country}`;
        const today=new Date();
        const date=document.querySelector('.date');
        date.innerHTML=dateFuction(today);
        const temp=document.querySelector('.temp');
        const weather=document.querySelector('.weather');
        weather.innerHTML=`Weather: ${data.weather[0].main}`;
        const temprange=document.querySelector('.temp-range');
        temprange.innerHTML=`Temp Range: ${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`;
        temp.innerHTML=`Temp: ${Math.round(data.main.temp)} <span>°C</span>`
        const icon=document.querySelector('.weather-icon');
        const icon_url="https://openweathermap.org/img/w/";
        icon.src=icon_url+data.weather[0].icon+".png";
        search.value="";
       }
    })
}


function dateFuction(d){
    let months= ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
}