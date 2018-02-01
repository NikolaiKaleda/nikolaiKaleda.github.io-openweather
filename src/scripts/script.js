window.onload = function () {

    var interval = null;
    var intervalValue = 15000;

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
        var latitude = document.querySelector('#latitude').value;
        var longitude = document.querySelector('#longitude').value;
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
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                var location = {
                    latitude: latitude,
                    longitude: longitude,
                };
                resolve(location)
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
        xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '139&APPID=79db73bf448b423ff3b6dd802029981d', false);
        xhr.send();
        if (xhr.status != 200) {
            alert(xhr.status + ', ' + xhr.statusText);
        } else {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            var cityName = data.name;
            var region = data.sys.country;
            var correctImgRequest = getCorrectIcon(data);
            var weatherImgPos = correctImgRequest[0];
            var mainBgImg = correctImgRequest[1];
            var temperature = data.main.temp;
            var weatherName = data.weather[0].description;
            var cloudines = data.clouds.all;
            var windSpeed = data.wind.speed;
            var windDeg = data.wind.deg;
            var visibility = data.visibility;
            var sunrise = data.sys.sunrise;
            var sunset = data.sys.sunset;

            var pressure = data.main.pressure;
            useData(cityName, region, weatherImgPos, mainBgImg, temperature, weatherName, cloudines, windSpeed, windDeg, visibility, pressure, sunrise, sunset);
        }
    };


    function getCorrectIcon(data) {
        var weatherImgCode = data.weather[0].icon;
        var imgId;
        var mainImg;
        if (weatherImgCode == "01d") {
            imgId = "0 0";
            mainImg = "img/bg_img/01d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "02d") {
            imgId = "-100px 0";
            mainImg = "img/bg_img/02d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "03d") {
            imgId = "-600px -240px";
            mainImg = "img/bg_img/03d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "04d") {
             imgId = "-500px -240px";
            mainImg = "img/bg_img/04d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "09d") {
             imgId = "-300px -80px";
            mainImg = "img/bg_img/09d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "10d") {
            imgId = "-400px 0";
            mainImg = "img/bg_img/10d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "11d") {
            imgId = "-600px -240px";
            mainImg = "img/bg_img/11d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "13d") {
            imgId = "-400px -160px";
            mainImg = "img/bg_img/13d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "50d") {
            imgId = "-600px -160px";
            mainImg = "img/bg_img/50d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "01n") {
            imgId = "-200px 0";
            mainImg = "img/bg_img/01n.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "02n") {
            imgId = "-100px -160px";
            mainImg = "img/bg_img/02n.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "03n") {
            imgId = "-600px -240px";
            mainImg = "img/bg_img/03d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "04n") {
            imgId = "-500px -240px";
            mainImg = "img/bg_img/04d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "09n") {
            imgId = "-300px -80px";
            mainImg = "img/bg_img/09d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "10n") {
            imgId = "0 -320px";
            mainImg = "img/bg_img/10d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "11n") {
            imgId = "-600px -240px";
            mainImg = "img/bg_img/11d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "13n") {
            imgId = "-400px -160px";
            mainImg = "img/bg_img/13d.jpg";
            return [imgId, mainImg];
        } else if (weatherImgCode == "50n") {
            imgId = "-600px -160px";
            mainImg = "img/bg_img/50d.jpg";
            return [imgId, mainImg];
        } else {
            alert("Invalid data with server");
        }
    }


    function useData(cityName, region, weatherImgPos, mainBgImg, temperature, weatherName, cloudines, windSpeed, windDeg, visibility, pressure, sunrise, sunset) {
        var cityNameElement = document.getElementById('locationName');
        var weatherImg = document.getElementById('skyImg');
        var tempElement = document.getElementById('temperature');
        var weatherNameElement = document.getElementById('weatherName');
        var updateMomentElement = document.getElementById('updateMoment');
        var cloudsPercent = document.getElementById('cloudsPercent');
        var windSpeedElement = document.getElementById('windSpeed');
        var windDegElement = document.getElementById('windDeg');
        var visibilityElement = document.getElementById('visibility');
        var pressureElement = document.getElementById('pressure');
        var sunriseElement = document.getElementById('sunrise');
        var sunsetElement = document.getElementById('sunset');
        var mainBgElement = document.getElementById('weatherBgImg');

        var noMoment = objToday = new Date().toLocaleString();

        cityNameElement.innerHTML = cityName + ", " + region;
        tempElement.innerHTML = (temperature - 273.15) + "&#176;" + "C";
        weatherImg.style.background = "url(img/weather.png) no-repeat";
        weatherImg.style.backgroundPosition = weatherImgPos;
        updateMomentElement.innerHTML = "updated as of " + noMoment;
        cloudsPercent.innerHTML = "cloudines: " + cloudines + "%";
        windSpeedElement.innerHTML = "Wind: " + windSpeed + "m/s";
        var windPosition = degToCompass(windDeg);
        windDegElement.style.background = "url(img/wind_arrow.png) no-repeat";
        windDegElement.style.backgroundPosition = windPosition;
        weatherNameElement.innerHTML = weatherName;
        visibilityElement.innerHTML = "visibility: " + visibility + "m";
        pressureElement.innerHTML = "pressure: " + pressure + " hPa";
        var sunriseTime = getSunrise(sunrise);
        sunriseElement.innerHTML = "sunrise: " + sunriseTime;
        var sunsetTime = getSunrise(sunset);
        sunsetElement.innerHTML = "sunset: " + sunsetTime;
        mainBgElement.style.background = "url(" + mainBgImg + ") no-repeat";
    }


    function degToCompass(num) {
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        var arrow = arr[(val % 16)];
        var windArrow;
        if (arrow == "N") {
            return windArrow = "0 0";
        } else if (arrow == "NNE") {
            return windArrow = "-50px 0";
        } else if (arrow == "NE") {
            return windArrow = " -200px";
        } else if (arrow == "ENE") {
            return windArrow = "-50px -200px";
        } else if (arrow == "E") {
            return windArrow = "0 -150px";
        } else if (arrow == "ESE") {
            return windArrow = "-50px -150px";
        } else if (arrow == "SE") {
            return windArrow = "0 -250px";
        } else if (arrow == "SSE") {
            return windArrow = "-50px -250px";
        } else if (arrow == "S") {
            return windArrow = "0 -50px";
        } else if (arrow == "SSW") {
            return windArrow = "-50px -50px";
        } else if (arrow == "SW") {
            return windArrow = "0 -300px";
        } else if (arrow == "WSW") {
            return windArrow = "-50px -300px";
        } else if (arrow == "W") {
            return windArrow = "0 -100px";
        } else if (arrow == "WNW") {
            return windArrow = "-50px -100px";
        } else if (arrow == "NW") {
            return windArrow = "0 -350px";
        } else if (arrow == "NNW") {
            return windArrow = "-50px -350px";
        } else {
            alert("Invalid data with server");
        }
    }


    function getSunrise(sunriseTime) {
        var date = new Date(sunriseTime * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime;
        return formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }





};
