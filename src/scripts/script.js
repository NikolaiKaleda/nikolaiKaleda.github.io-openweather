document.addEventListener("DOMContentLoaded", function () {

    var input = document.querySelector('.formSubmit');
    var stop = document.querySelector('.stopInterval');
    var interval = null;
    //    var location = window.location;

    input.addEventListener('click', function () {
        interval = setInterval(clickListener, 1000);
        window.onbeforeunload = function (e) {
            return 'Are you sure you want to leave this page?';
        };
    });

    function clickListener() {
        var latitude = document.querySelector('#latitude').value;
        var longitude = document.querySelector('#longitude').value;
        if (latitude == "" || longitude == "") {
            getCurrentLocation();
        } else {
            checkValid(latitude, longitude);
        }
    }

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            getData(latitude, longitude);
        });
    };

    function checkValid(latitude, longitude) {
        var regCoord = /-?\d{1,3}\.\d+/;
        if (regCoord.test(latitude) && regCoord.test(longitude)) {
            submitForm(latitude, longitude);
        } else {
            alert('Enter valid data');
        }
    }

    function submitForm(latitude, longitude) {
        getData(latitude, longitude);
    }

    function getData(latitude, longitude) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '139&APPID=79db73bf448b423ff3b6dd802029981d', false);
        xhr.send();
        if (xhr.status != 200) {
            alert(xhr.status + ', ' + xhr.statusText);
        } else {
            console.log(JSON.parse(xhr.responseText));
        }
    };

    stop.addEventListener('click', function () {
        clearInterval(interval);
        window.onbeforeunload = null;
    });




});
