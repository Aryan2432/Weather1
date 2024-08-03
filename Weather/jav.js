const button = document.getElementById("btn");
const input = document.getElementById("city");
const cityname1 = document.getElementById("cityname");
const localtime1 = document.getElementById("localtime");
const currenttemp1 = document.getElementById("currenttemp");
const additionaldata = document.getElementById("additionaldata");
const select = document.getElementById("data");

async function getWeatherData(city) {
    try {
        const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=7d8aadfb24cb48af8e565132240807&q=${city}&aqi=yes`
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

button.addEventListener('click', async () => {
    const cityValue = input.value;
    const result = await getWeatherData(cityValue);
    if (result) {
        cityname1.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
        localtime1.innerText = `Last Updated: ${result.current.last_updated}`;
        currenttemp1.innerText = `Temperature: ${result.current.temp_c} °C`;

        const selectedOption = select.value;
        if (selectedOption === 'wind_kph') {
            additionaldata.innerText = `Winds(kmph): ${result.current.wind_kph}`;
        } else if (selectedOption === 'pressure_in') {
            additionaldata.innerText = `Pressure: ${result.current.pressure_in} inches`;
        } else if(selectedOption=='humidity'){
            additionaldata.innerText = `Humidity:${result.current.humidity}`;
        }
        else if(selectedOption=='o3'){
            additionaldata.innerText = `Ozone level:${result.current.air_quality.o3}`;
        }
        else {
            additionaldata.innerText = '';
        }
    }
});