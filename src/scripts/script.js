window.onload = function () {

    
    var interval = null,
        intervalValue = 15000;

    
    document.getElementById('start').onclick = function () {
        getWeather();
        interval = setInterval(getWeather, intervalValue);
        window.onbeforeunload = function (e) {
            return 'Are you sure you want to leave this page?';
        };
    };

    
    document.getElementById('stop').onclick = function () {
        clearInterval(interval);
        window.onbeforeunload = null;
    };


    function getWeather() {
        var latitude = document.getElementById('latitude').value,
            longitude = document.getElementById('longitude').value;
        if (latitude == "" || longitude == "") {
            var location = getCurrentLocation().then(function (res) {
                getWeatherData(res.latitude, res.longitude);
            });
        } else {
            if (checkValid(latitude, longitude)) {
                getWeatherData(latitude, longitude);
            }
        }
    }

    
    function getCurrentLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude,
                    longitude = position.coords.longitude;

                var location = {
                    latitude: latitude,
                    longitude: longitude,
                };
                resolve(location);
            });
        });
    };

    
    function checkValid(latitude, longitude) {
        var regCoord = /-?\d{1,3}\.\d+/;
        if (regCoord.test(latitude) && regCoord.test(longitude)) {
            return true;
        } else {
            alert('Enter valid data');
            return false;
        }
    }


    function getWeatherData(latitude, longitude) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=79db73bf448b423ff3b6dd802029981d', false);
        xhr.send();
        if (xhr.status != 200) {
            alert(xhr.status + ', ' + xhr.statusText);
        } else {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            var cityName = data.name,
                region = data.sys.country,
                correctImgRequest = getCorrectIcon(data),
                weatherImgPos = correctImgRequest[0],
                mainBgImg = correctImgRequest[1],
                temperature = data.main.temp,
                weatherName = data.weather[0].description,
                cloudines = data.clouds.all,
                windSpeed = data.wind.speed,
                windDeg = data.wind.deg,
                visibility = data.visibility,
                sunrise = data.sys.sunrise,
                sunset = data.sys.sunset,
                pressure = data.main.pressure;
            console.log(sunrise + "   dsfsdg   " + sunset);
            var responseData = {
                cityName: cityName,
                region: region,
                weatherImgPos: weatherImgPos,
                mainBgImg: mainBgImg,
                temperature: temperature,
                weatherName: weatherName,
                cloudines: cloudines,
                windSpeed: windSpeed,
                windDeg: windDeg,
                visibility: visibility,
                pressure: pressure,
                sunrise: sunrise,
                sunset: sunset
            };
            useData(responseData);
        }
    };


    function getCorrectIcon(data) {
        var weatherImgCode = data.weather[0].icon,
            imgId,
            mainImg;        
        switch (weatherImgCode) {
            case "01d":
                imgId = "0 0";
                mainImg = "img/bg_img/01d.jpg";
                break;
            case "02d":
                imgId = "-100px 0";
                mainImg = "img/bg_img/02d.jpg";
                break;
            case "03d":
                imgId = "-600px -240px";
                mainImg = "img/bg_img/03d.jpg";
                break;
            case "04d":
                imgId = "-500px -240px";
                mainImg = "img/bg_img/04d.jpg";
                break;
            case "09d":
                imgId = "-300px -80px";
                mainImg = "img/bg_img/09d.jpg";
                break;
            case "10d":
                imgId = "-400px 0";
                mainImg = "img/bg_img/10d.jpg";
                break;
            case "11d":
                imgId = "-600px -240px";
                mainImg = "img/bg_img/11d.jpg";
                break;
            case "13d":
                imgId = "-400px -160px";
                mainImg = "img/bg_img/13d.jpg";
                break;
            case "50d":
                imgId = "-600px -160px";
                mainImg = "img/bg_img/50d.jpg";
                break;
            case "01n":
                imgId = "-200px 0";
                mainImg = "img/bg_img/01n.jpg";
                break;
            case "02n":
                imgId = "-100px -160px";
                mainImg = "img/bg_img/02n.jpg";
                break;
            case "03n":
                imgId = "-600px -240px";
                mainImg = "img/bg_img/03d.jpg";
                break;
            case "04n":
                imgId = "-500px -240px";
                mainImg = "img/bg_img/04d.jpg";
                break;
            case "09n":
                imgId = "-300px -80px";
                mainImg = "img/bg_img/09d.jpg";
                break;
            case "10n":
                imgId = "0 -320px";
                mainImg = "img/bg_img/10d.jpg";
                break;
            case "11n":
                imgId = "-600px -240px";
                mainImg = "img/bg_img/11d.jpg";
                break;
            case "13n":
                imgId = "-400px -160px";
                mainImg = "img/bg_img/13d.jpg";
                break;
            case "50n":
                imgId = "-600px -160px";
                mainImg = "img/bg_img/50d.jpg";
                break;
            default:
                alert("Invalid data with server");
        }
        return [imgId, mainImg];
    }


    function useData(responseData) {
        var cityNameElement = document.getElementById('locationName'),
            weatherImg = document.getElementById('skyImg'),
            tempElement = document.getElementById('temperature'),
            weatherNameElement = document.getElementById('weatherName'),
            updateMomentElement = document.getElementById('updateMoment'),
            cloudsPercent = document.getElementById('cloudsPercent'),
            windSpeedElement = document.getElementById('windSpeed'),
            windDegElement = document.getElementById('windDeg'),
            visibilityElement = document.getElementById('visibility'),
            pressureElement = document.getElementById('pressure'),
            sunriseElement = document.getElementById('sunrise'),
            sunsetElement = document.getElementById('sunset'),
            mainBgElement = document.getElementById('weatherBgImg'),
            noMoment = objToday = new Date().toLocaleString();

        cityNameElement.innerHTML = responseData.cityName + ", " + responseData.region;
        tempElement.innerHTML = (responseData.temperature - 273.15) + "&#176;" + "C";
        weatherImg.style.background = "url(img/weather.png) no-repeat";
        weatherImg.style.backgroundPosition = responseData.weatherImgPos;
        updateMomentElement.innerHTML = "updated as of " + noMoment;
        cloudsPercent.innerHTML = "cloudines: " + responseData.cloudines + "%";
        windSpeedElement.innerHTML = "Wind: " + responseData.windSpeed + "m/s";
        var windPosition = degToCompass(responseData.windDeg);
        windDegElement.style.background = "url(img/wind_arrow.png) no-repeat";
        windDegElement.style.backgroundPosition = responseData.windPosition;
        weatherNameElement.innerHTML = responseData.weatherName;
        visibilityElement.innerHTML = "visibility: " + responseData.visibility + "m";
        pressureElement.innerHTML = "pressure: " + responseData.pressure + " hPa";
        var sunriseTime = getSunrise(responseData.sunrise);
        sunriseElement.innerHTML = "sunrise: " + sunriseTime;
        var sunsetTime = getSunrise(responseData.sunset);
        sunsetElement.innerHTML = "sunset: " + sunsetTime;
        mainBgElement.style.background = "url(" + responseData.mainBgImg + ") no-repeat";
        mainBgElement.style.backgroundSize = "cover";
    }


    function degToCompass(num) {
        var val = Math.floor((num / 22.5) + 0.5),
            arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"],
            arrow = arr[(val % 16)],
            windArrow;
        switch (arrow) {
            case "N":
                windArrow = "0 0";
                break;
            case "NNE":
                windArrow = "-50px 0";
                break;
            case "NE":
                windArrow = " -200px";
                break;
            case "ENE":
                windArrow = "-50px -200px";
                break;
            case "E":
                windArrow = "0 -150px";
                break;
            case "ESE":
                windArrow = "-50px -150px";
                break;
            case "SE":
                windArrow = "0 -250px";
                break;
            case "SSE":
                windArrow = "-50px -250px";
                break;
            case "S":
                windArrow = "0 -50px";
                break;
            case "SSW":
                windArrow = "-50px -50px";
                break;
            case "SW":
                windArrow = "0 -300px";
                break;
            case "WSW":
                windArrow = "-50px -300px";
                break;
            case "W":
                windArrow = "0 -100px";
                break;
            case "WNW":
                windArrow = "-50px -100px";
                break;
            case "NW":
                windArrow = "0 -350px";
                break;
            case "NNW":
                windArrow = "-50px -350px";
                break;
            default:
                alert("Invalid data with server");
        }
        return windArrow;
    }


    function getSunrise(sunriseTime) {
        var date = new Date(sunriseTime * 1000),
            hours = date.getHours(),
            minutes = "0" + date.getMinutes(),
            seconds = "0" + date.getSeconds(),
            formattedTime;
        
        console.log(sunriseTime  );
        return formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
};
