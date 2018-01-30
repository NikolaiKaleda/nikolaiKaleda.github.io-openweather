document.addEventListener("DOMContentLoaded", function () {

    //    var input = document.querySelector('.test');
    //
    //    input.addEventListener('change', function (ev) {
    //        console.log(ev);
    //    });


    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            alert(latitude + ',' + longitude);

            function getData() {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '139&APPID=79db73bf448b423ff3b6dd802029981d', false);
                xhr.send();
                if (xhr.status != 200) {
                    alert(xhr.status + ',  ' + xhr.statusText); // пример вывода: 404: Not Found
                } else {
                    alert(JSON.parse(xhr.responseText)); // responseText -- текст ответа.
                    console.log(JSON.parse(xhr.responseText));
                }
            }
            getData();
        });
    }
    getCurrentLocation();









});
