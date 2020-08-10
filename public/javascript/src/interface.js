$( document ).ready(function() {
    var thermostat = new Thermostat();
    updateTemperature();

    $('#increase').on('click', function() {
        thermostat.up();
        updateTemperature();
    })

    $('#decrease').on('click', function() {
       thermostat.down();
       updateTemperature();
    });

    $('#toggle').on('click', function () {
        thermostat.togglePowerSavings();
        updatePowerSavingText()
        updateTemperature();
    });

    $('#reset').on('click', function () {
        thermostat.reset();
        updateTemperature();
    });

    function updateTemperature() {
        $( '#temperature_bar').text(thermostat.temperature).attr('class', thermostat.usage());
    }

    function updatePowerSavingText() {
        let powerSavingText = thermostat.isSavingPower ? "ON" : "OFF";
        $( '#toggle' ).text("Power saving: " + powerSavingText);
    }

    displayWeather('London');

    $('#current_city').change(function(event){
        event.preventDefault();
        let city = $('#current_city').val();
        displayWeather(city);
    });

    function displayWeather(city) {
        let url = "http://api.openweathermap.org/data/2.5/weather?q=";
        let units = "&units=metric";
        let token = "&appid=14edc0f8ceb66aa0deac044d2f036d84";
        $.get(url + city + units + token, function(response){
            let outside_temperature = response['main']['temp'] + " °C";
            let weather = response['weather'][0]['description'];
            let location = response['name'];
            weather = weather.charAt(0).toUpperCase()  + weather.slice(1);
            $('#location').text(location);
            $('#outside_temperature').text(outside_temperature + "  (" + weather + ")");
        });
    }



});