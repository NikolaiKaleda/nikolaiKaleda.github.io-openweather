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
            var weatherImgPos = getCorrectIcon(data);
            var temperature = data.main.temp;
            var weatherName = data.weather[0].description;
            useData(cityName, region, weatherImgPos, temperature, weatherName);
        }
    };

    
    function getCorrectIcon (data) {
        var weatherImgCode = data.weather[0].icon;
        var imgId;
        if ( weatherImgCode == "01d" ) {
            return imgId = "0 0";
            
        } else if ( weatherImgCode == "02d" ) {
            return imgId = "-100px 0";
            
        } else if ( weatherImgCode == "03d" ) {
            return imgId = "-600px -240px";
            
        } else if ( weatherImgCode == "04d" ) {
            return imgId = "-500px -240px";
            
        } else if ( weatherImgCode == "09d" ) {
            return imgId = "-300px -80px";
            
        } else if ( weatherImgCode == "10d" ) {
            return imgId = "-400px 0";
            
        } else if ( weatherImgCode == "11d" ) {
            return imgId = "-600px -240px";
            
        } else if ( weatherImgCode == "13d" ) {
            return imgId = "-400px -160px";
            
        } else if ( weatherImgCode == "50d" ) {
            return imgId = "-600px -160px";
            
        } else if ( weatherImgCode == "01n" ) {
            return imgId = "-200px 0";
            
        } else if ( weatherImgCode == "02n" ) {
            return imgId = "-100px -160px";
            
        } else if ( weatherImgCode == "03n" ) {
            return imgId = "-600px -240px";
            
        } else if ( weatherImgCode == "04n" ) {
            return imgId = "-500px -240px";
            
        } else if ( weatherImgCode == "09n" ) {
            return imgId = "-300px -80px";
            
        } else if ( weatherImgCode == "10n" ) {
            return imgId = "0 -320px";
            
        } else if ( weatherImgCode == "11n" ) {
            return imgId = "-600px -240px";
            
        } else if ( weatherImgCode == "13n" ) {
            return imgId = "-400px -160px";
            
        } else if ( weatherImgCode == "50n" ) {
            return imgId = "-600px -160px";
        }
    }
    
    
    function useData (cityName, region, weatherImgPos, temperature, weatherName) {
        var cityNameElement = document.getElementById('locationName');
        var weatherImg = document.getElementById('skyImg');
        var tempElement = document.getElementById('temperature');
        var weatherNameElement = document.getElementById('weatherName');
        var updateMomentElement = document.getElementById('updateMoment');
        
        var noMoment = objToday = new Date().toLocaleString();
        
        console.log(noMoment);
        
        cityNameElement.innerHTML = cityName + ", " + region;
        tempElement.innerHTML = temperature + "&#176;" + "F";
        weatherImg.style.background = "url(img/weather.png) no-repeat";
        weatherImg.style.backgroundPosition = weatherImgPos;
        updateMomentElement.innerHTML = "Updated as of " + noMoment;

        weatherNameElement.innerHTML = weatherName;
    }
    
    
    
    
    
};
