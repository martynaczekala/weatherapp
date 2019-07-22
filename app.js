
      function addWeatherIcon(element) {
        document.querySelector("img").src = `https://openweathermap.org/img/w/${element}.png`;
      }
  
      function calculate(kelvin) {
        //round temp
        return Math.ceil(kelvin - 272.15);
      }
  
      var url = 'https://ipinfo.io/json';
  
      var result = fetch(url)
        .then(function (response) {
          return response.json(); // pass the data as promise to next then block
        })
        .then(function (userIP) {
          // info from user IP - city, region, country
          var city = userIP.city;
          var region = userIP.region;
          var country = userIP.country;
          document.getElementById("weather-city").innerHTML = city;
          document.getElementById("weather-country").innerHTML = country;
          return fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + region + country + '&appid=ae76d0efed32d9f29c4d54a5738b80ca'); // make a 2nd request and return a promise
        })
        .then(function (response) {
          return response.json();
        })
        .catch(function (error) {
          console.log('Request failed', error)
        })
  
  
      result.then(function (r) {
        var main = r.main;
        var temperature = main.temp;
        var humidity = main.humidity;
        var pressure = main.pressure
        var description = r.weather[0].description;
        var icon = r.weather[0].icon;
        /*addWeatherData(calculate(temperature) + ' ℃');
        addWeatherData(pressure + ' hPa');
        addWeatherData(humidity + ' %');
        addWeatherDescription(description); */
        addWeatherIcon(icon);
        document.getElementById("weather-temperature").innerHTML = calculate(temperature);
        document.getElementById("weather-description").innerHTML = description;
        document.getElementById("weather-humidity").innerHTML = humidity + ' %';
        document.getElementById("weather-pressure").innerHTML = pressure + ' hPa';
      });