//SVG Icons Map
const icons = {
  // All from icons1
  'snow': "snowySVG",
  'rain': "rainySVG",
  'fog': "foggySVG",
  'wind': "windySVG",
  'cloudy': "cloudySVG",
  'partly-cloudy-day': "partlyCloudyDaySVG",
  'partly-cloudy-night': "partlyCloudyNightSVG",
  'clear-day': "clearDaySVG",
  'clear-night': "clearNightSVG",
  'snow-showers-day': "snowyShowersDaySVG",
  'snow-showers-night': "snowyShowersNightSVG",
  'thunder-rain': "thunderRainSVG",
  'thunder-showers-day': "thunderShowersDaySVG",
  'thunder-showers-night': "thunderShowersNightSVG",
  'showers-day': "showersDaySVG",
  'showers-night': "showersNightSVG"
};

//Document Nodes
const mainSearchBtn = document.getElementById("mainSearchBtn");

//Helper Functions
const winDirTranslate = function(deg){
    let dir;
    console.log(deg);
    console.log("condition: ? ", 90 < deg < 180)
    deg == 0? dir = 'n': 90 > deg > 0? dir = 'ne': deg == 90? 'e': 90 < deg < 180? dir = 'se': deg == 180? dir = 's': 180 < deg < 270? dir = 'sw': deg == 270? dir = 'w': 270 < deg < 360? dir = 'nw': dir = 'err';
    return dir;
}

const fahrToCelsius = function(deg){
    return (deg - 32 * (5/9)).toFixed();
}
const createIcon = function(iconId, cls = null, id = null, width = 50, height = 50){
    //Define SVG Namespace
    const svgNS = "http://www.w3.org/2000/svg";
    //Creates SVG container element
    const svg = document.createElementNS(svgNS, "svg");
    //Adds a class name if provided
    if (cls) svg.classList.add(cls);
    //Adds an ID if provided
    if (id) svg.setAttribute("id", id);
    //Set Dimension constraints
    svg.style.width = width +'px';
    svg.style.height = height +'px';
    //Creates inner use element 
    const use = document.createElementNS(svgNS, "use");
    //Sets the source of the use element to the exact SVG ID
    use.setAttribute("href", `./assets/icons.svg#${iconId}`);
    //Assemble the elements
    svg.append(use);
    //returns the newly created element
    return svg;    
}
const extractData = function(data){
    let polishedData = {};
    const extractHours = function(hours){
        let hrs = [];
        hours.forEach((hour)=>{
            let polishedHour = {};
            polishedHour["hour"] = hour.datetime;
            polishedHour["icon"] = hour.icon;
            polishedHour["temp"] = hour.temp;
            hrs.push(polishedHour);
        })
        return hrs
    }

    const extractDays = function(days){
        let dys = [];
        days.forEach(day => {
            let polishedDay = {};
            polishedDay["date"] = day.datetime;
            polishedDay["description"] = day.description;
            polishedDay["feelslike"] = day.feelslike;
            polishedDay["temp"] = day.temp;
            polishedDay["tempmax"] = day.tempmax;
            polishedDay["tempmin"] = day.tempmin;
            polishedDay["icon"] = day.icon;
            polishedDay["sunrise"] = day.sunrise;
            polishedDay["sunset"] = day.sunset;
            polishedDay["humidity"] = day.humidity;
            polishedDay["precipprob"] = day.precipprob;
            polishedDay["precip"] = day.precip;
            polishedDay["precipcover"] = day.precipcover;
            polishedDay["pressure"] = day.pressure;
            polishedDay["snow"] = day.snow;
            polishedDay["snowdepth"] = day.snowdepth;
            polishedDay["uvindex"] = day.uvindex;
            polishedDay["visibility"] = day.visibility;
            polishedDay["windspeed"] = day.windspeed;
            polishedDay["winddir"] = day.winddir;
            polishedDay["hours"] = extractHours(day.hours);
            dys.push(polishedDay);
        });
        return dys;
    }
    polishedData = {
        location: data.resolvedAddress,
        time: data.currentConditions.datetime,
        description: data.days[0].description,
        feelslike: data.currentConditions.feelslike,
        temp: data.currentConditions.temp,
        tempmax: data.days[0].tempmax,
        tempmin: data.days[0].tempmin,
        icon: data.currentConditions.icon,
        sunrise: data.currentConditions.sunrise,
        sunset: data.currentConditions.sunset,
        humidity: data.currentConditions.humidity,
        precipprob: data.currentConditions.precipprob || 0,
        precip: data.currentConditions.precip || 0,
        precipcover: data.currentConditions.precipcover || 0,
        pressure: data.currentConditions.pressure,
        snow: data.currentConditions.snow || 0,
        snowdepth: data.currentConditions.snowdepth || 0,
        uvindex: data.currentConditions.uvindex,
        visibility: data.currentConditions.visibility,
        windspeed: data.currentConditions.windspeed,
        winddir: data.currentConditions.winddir,
        days: extractDays(data.days)
    }
    console.log(polishedData);
    console.log(polishedData);
    return polishedData
}

//UI Component functions
//Header
const renderHeader = function(){
    const header = document.createElement('header');
    const logo = document.createElement("h2");
    const searchContainer = document.createElement('form');
    const searchBar = document.createElement('input');
    const searchBtn = document.createElement('button');
    const searchSVG = createIcon("searchSVG", ".containSVG")

    searchBar.setAttribute("name", "search")
    logo.textContent = "Weather App";
    searchBtn.addEventListener("click", handleClick);

    header.classList.add("headerContainer");
    searchContainer.classList.add("searchBarContainer");
    searchBar.classList.add("searchBar");
    searchBtn.classList.add("searchBtn");

    searchBtn.append(searchSVG);
    searchContainer.append(searchBar, searchBtn);
    header.append(logo, searchContainer);
    return header;
}

//1-of-3 main component (Quick Data)
const renderQuickData = function(data){
    //section container
    const container = document.createElement("section");
    //1-of-3 element (Tempreture + IMG + Cels/Fahr)
    const tempContainer = document.createElement("div");
    const conditionSVG = createIcon(icons[data.icon], undefined, "PrimarySVG", 120, 120);
    console.log("Here!");
    const temp = document.createElement("span");
    const tempButtonsContainer = document.createElement("div");
    const celsius = document.createElement("button");
    const fahrenheit = document.createElement("button");
    const divider = document.createElement("span");
    //2-of-3 element (UV Index + Humidity + Wind Speed + Wind Direction)
    const humContainer = document.createElement("div");
    const humidity = document.createElement("span");
    const wind = document.createElement("span");
    const uvIndex = document.createElement("span");
    //3-of-3 element (Location + Condition)
    const locContainer = document.createElement("div");
    const location = document.createElement("span");
    const condition = document.createElement("p");

    //style
    container.setAttribute("id", "quickRenderContainer");

    tempContainer.setAttribute("id", "tempContainer");
    temp.setAttribute("id", "primaryTemp");
    tempButtonsContainer.setAttribute("id", "tempButtonsContainer");
    celsius.classList.add("toggleUnit");
    fahrenheit.classList.add("toggleUnit");
    divider.classList.add('divide');
    
    humContainer.setAttribute("id", "humContainer");
    humidity.classList.add("metric");
    wind.classList.add("metric");
    uvIndex.classList.add("metric");

    locContainer.setAttribute("id", "locContainer");
    location.setAttribute("id", "location");
    condition.setAttribute("id", "condition");

    //inject data
    //1-of-3
    temp.textContent = data.temp;
    celsius.textContent = '°C';
    fahrenheit.textContent = '°F';
    divider.textContent = "|";
    //2-of-3
    humidity.textContent = "Humidity: " + data.humidity + "%";
    wind.textContent = "Wind: " + data.windspeed + " km/h"+ " "+ winDirTranslate(data.winddir);
    uvIndex.textContent = "UV Index: " + data.uvindex;
    //3-of-3
    location.textContent = data.location.split(',')[0];
    condition.textContent =  data.description;

    //Append
    // 1-of-3
    tempButtonsContainer.append(celsius, divider, fahrenheit)
    tempContainer.append(conditionSVG, temp, tempButtonsContainer);
    //2-of-3
    humContainer.append(humidity, wind, uvIndex);
    //3-of-3
    locContainer.append(location, condition);
    //Append to primary container
    container.append(tempContainer, humContainer, locContainer);
    return container;
}   


//Main
const renderMain = function(){

}



//Main Renderer
const renderContent = function (data = null){
    let p = document.createElement("p");
    p.textContent = JSON.stringify(data);
    //Instantiate Page Components
    let header = renderHeader();
    let quick = renderQuickData(data);
    let main = document.createElement("main");
    //Re-Draw Screen
    main.append(header, quick);
    document.body.replaceChildren(main);
    //Tiny Fixes
    document.body.style.alignItems = "flex-start";
}

//Query Search handler
const handleClick = async function(e){
    e.preventDefault();
    let data;
    const form = document.querySelector(".searchBarContainer");
    let city = new FormData(form).get("search");
    try{
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}}?unitGroup=metric&key=VD6KDW2MS5Z3366THPX3UUF5T`);
        let text = await response.text();
        if(!response.ok) throw new Error(text);
        data = JSON.parse(text);
        let polishedData = extractData(data);
        console.log()
        renderContent(polishedData);
    } catch(err){ 
        console.error(err);
        //Further Handle Errors (Show on Screen)
        return
    }
    console.log(data);
    let x = data;
    return x;
}

//Search Button (Main Trigger for the Fetch)
mainSearchBtn.addEventListener("click", handleClick)