document.addEventListener("DOMContentLoaded", function () {




    var input = document.querySelector('.formSubmit');

    input.addEventListener('click', function (ev) {
        var latitude = document.querySelector('#latitude').value;
        var longitude = document.querySelector('#longitude').value;

        if (latitude == "" || longitude == "") {
            getCurrentLocation();
        } else {
            checkValid(latitude, longitude);
        }
    });


    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            getData(latitude, longitude);
        });
    };


    function checkValid (latitude, longitude) {
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
            alert(xhr.status + ', ' + xhr.statusText); // пример вывода: 404: Not Found
        } else {
            //                    alert(JSON.parse(xhr.responseText)); // responseText -- текст ответа.
            console.log(JSON.parse(xhr.responseText));
        }
    };
});
