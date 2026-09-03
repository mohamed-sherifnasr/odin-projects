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
  'snow-showers-day': "snowySVG",
  'snow-showers-night': "snowySVG",
  'thunder-rain': "thunderRainSVG",
  'thunder-showers-day': "thunderShowersDaySVG",
  'thunder-showers-night': "thunderShowersNightSVG",
  'showers-day': "showersDaySVG",
  'showers-night': "rainySVG"
};

//Document Nodes
const mainSearchBtn = document.getElementById("mainSearchBtn");
const mainContainer = document.getElementById("mainContainer");

//Holding Response for Future Mutation
let serverResponse;

//Helper Functions
const winDirTranslate = function(deg){
    let dir;
    deg == 0? dir = 'n': 90 > deg > 0? dir = 'ne': deg == 90? 'e': 90 < deg < 180? dir = 'se': deg == 180? dir = 's': 180 < deg < 270? dir = 'sw': deg == 270? dir = 'w': 270 < deg < 360? dir = 'nw': dir = 'err';
    return dir.toUpperCase();
}

const celsiusToFahr = function(deg){
    return (deg * (9/5) + 32).toFixed();
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
const convertHours = function(time){
    const timeAry = time.split(":");
    return ((timeAry[0] % 12) + ":" + timeAry[1])
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
        feelslike: data.currentConditions.feelslike.toFixed(),
        temp: data.currentConditions.temp.toFixed(),
        tempmax: data.days[0].tempmax.toFixed(),
        tempmin: data.days[0].tempmin.toFixed(),
        icon: data.currentConditions.icon,
        sunrise: convertHours(data.currentConditions.sunrise),
        sunset: convertHours(data.currentConditions.sunset),
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
    const searchSVG = createIcon("searchSVG", ".containSVG", undefined, 30, 30);

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

//1-of-4 main component (Quick Data)
const renderQuickData = function(data, cel = true){
    //section container
    const container = document.createElement("section");
    //1-of-3 element (Tempreture + IMG + Cels/Fahr)
    const tempContainer = document.createElement("div");
    const conditionSVG = createIcon(icons[data.icon], undefined, "primarySVG", 100, 100);
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
    // 1-of-3
    tempContainer.setAttribute("id", "tempContainer");
    temp.setAttribute("id", "primaryTemp");
    tempButtonsContainer.setAttribute("id", "tempButtonsContainer");
    celsius.setAttribute("id", "celsius");
    fahrenheit.setAttribute("id", "fahrenheit");
    if (cel == true){
        celsius.classList.add("toggleUnit", "toggled")
        fahrenheit.classList.add("toggleUnit", "unToggledUnit");
    } else {
        fahrenheit.classList.add("toggleUnit", "toggled")
        celsius.classList.add("toggleUnit", "unToggledUnit");
    }
    divider.classList.add('divide');
    // 2-of-3
    humContainer.setAttribute("id", "humContainer");
    humidity.classList.add("metric");
    wind.classList.add("metric");
    uvIndex.classList.add("metric");
    // 3-of-3
    locContainer.setAttribute("id", "locContainer");
    location.setAttribute("id", "location");
    condition.setAttribute("id", "condition");

    //inject data
    //1-of-3
    if (cel == true){
        temp.textContent = data.temp;
    } else {
        temp.textContent = celsiusToFahr(data.temp)
    }
    celsius.textContent = '°C';
    fahrenheit.textContent = '°F';
    divider.textContent = "|";
    //2-of-3
    humidity.textContent = "Humidity: " + data.humidity + "%";
    wind.textContent = "Wind: " + data.windspeed + " KM/H"+ " "+ winDirTranslate(data.winddir);
    uvIndex.textContent = "UV Index: " + data.uvindex;
    //3-of-3
    console.log(data, " ", data.location);
    location.textContent = data.location.split(',')[0];
    condition.textContent =  "~ " + data.description;

    //Interactivity
    const toggleUnit = function(e){
        console.log('clicked!');
        if(e.target.classList.contains("toggled")) {console.log("element is toggled! Returning ..."); return;}
        if(e.target.classList.contains("unToggledUnit")){
            console.log("Element is untoggled! Transversing ...")
            if(e.target.id == "fahrenheit"){
                console.log("Fahrenheit that isn't toggled! Rendering! ...");
                renderMain(serverResponse, false);
            } else {console.log("Celsius that isn't toggled! Rendering ..."); renderMain(serverResponse)}
        }
    }
    fahrenheit.addEventListener("click", toggleUnit, {once: true});
    celsius.addEventListener("click", toggleUnit, {once: true});
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
// 2-of-4 main component (Secondary Data)
const renderSecondaryData = function(data, cel = true){
    //create container Elements
    const container = document.createElement("div");
    const feelsLikeCon = document.createElement("div");
    const highCon = document.createElement("div");
    const lowCon = document.createElement("div");
    const pressureCon = document.createElement("div");
    const sunRiseCon = document.createElement("div");
    const sunSetCon = document.createElement("div");
    //create Internal Elements
    const feelsLike = document.createElement("p");
    const feelsLikeValue = document.createElement("p");
    
    const high = document.createElement("p");
    const highValue = document.createElement("p");
    
    const low = document.createElement("p");
    const lowValue = document.createElement("p");
    
    const pressure = document.createElement("p");
    const pressureValue = document.createElement("p");
    
    const sunRise = document.createElement("p");
    const sunRiseValue = document.createElement("p");

    const sunSet = document.createElement("p");
    const sunSetValue = document.createElement("p");
    //style
    //Containers
    container.classList.add("secondaryDataContainer")
    console.log('running!');
    [feelsLikeCon, highCon, lowCon, pressureCon, sunRiseCon, sunSetCon].forEach(el=>{
        el.classList.add('secondaryDataElementContainer');
    });
    //Titles
    [feelsLike, high, low, pressure, sunRise, sunSet].forEach(el=>{
        el.classList.add('secondaryDataTitle');
    });
    //Values
    [feelsLikeValue, highValue, lowValue, pressureValue, sunRiseValue, sunSetValue].forEach(el=>{
        el.classList.add('secondaryDataValue');
    });

    //inject Data
    // Titles
    feelsLike.textContent = "Feels Like";
    high.textContent = "High";
    low.textContent = "Low";
    pressure.textContent = "Pressure";
    sunRise.textContent = "Sun Rise";
    sunSet.textContent = "Sun Set";
    //Data
    feelsLikeValue.textContent = cel == true? data.feelslike + "°C": celsiusToFahr(data.feelslike) + "°F";
    highValue.textContent = cel == true? data.tempmax + "°C": celsiusToFahr(data.tempmax) + "°F";
    lowValue.textContent = cel == true? data.tempmin + "°C": celsiusToFahr(data.tempmin) + "°F";
    pressureValue.textContent = data.pressure + " hPa";
    sunRiseValue.textContent = data.sunrise + " AM";
    sunSetValue.textContent = data.sunset + " PM";
    //Append
    feelsLikeCon.append(feelsLike, feelsLikeValue);
    highCon.append(high, highValue);
    lowCon.append(low, lowValue);
    pressureCon.append(pressure, pressureValue);
    sunRiseCon.append(sunRise, sunRiseValue);
    sunSetCon.append(sunSet, sunSetValue);
    container.append(feelsLikeCon, highCon, lowCon, pressureCon, sunRiseCon, sunSetCon);

    //return
    return container;
}

//Main Renderer
const renderMain = function (data = null, cel = true){
    //Instantiate Page Components
    let header = renderHeader();
    let quick = renderQuickData(data, cel);
    let secondary = renderSecondaryData(data, cel)
    let main = document.createElement("main");
    //Re-Draw Screen
    main.append(header, quick, secondary);
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
        serverResponse = extractData(data);
        renderMain(serverResponse);
    } catch(err){ 
        console.error(err);

    }
}

//Search Button (Main Trigger for the Fetch)
mainSearchBtn.addEventListener("click", handleClick)