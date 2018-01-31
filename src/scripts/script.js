window.onload = function () {

    var interval = null;

    document.getElementById('start').onclick = function () {
        getWeather();
        interval = setInterval(getWeather, 15000);
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
            document.getElementById('result').innerHTML = "Name: " + data.name + " temp: " + data.main.temp;
        }
    };
};
