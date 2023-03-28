import axios from "axios"
import { useState } from "react"
import './ApiRequest.css'
import humidity from './assets/humidity.jpg'
import wind from './assets/wind-speed.png'

const requestWeather = async (location) => {
    try{
        const data = await axios.get(`https://api.weatherapi.com/v1/current.json?key=77252c96c8d24a31980161429232603&q=${location}&aqi=no`);
        console.log(data);
        return data
    } catch(e) {
        console.log(e);
        return "Enter a place"
    }
}

function Weather() {

    const [location, setLocation] = useState("Enter a place");

    async function handleButtonSubmmit() {
        const response = await requestWeather(document.getElementById("location").value);
        console.log(response);
        document.getElementById("body").className = "home";
        setLocation(response);
    }

    function indiceUv(value) {
        let uv;
        switch(value){
            case 1 || 2:
                uv = "low";
                break;
            case 3 || 4 || 5:
                uv = "moderate";
                break;
            case 6 || 7:
                uv = "high";
                break;
            case 8 || 9 || 10:
                uv = "very high";
                break;
            default:
                uv = "extreme";
                break;
        }
        return uv
    }

    return (
        <div className="Weather">
            <div>
                <input type="text" id="location" className="search-box" placeholder="Type a city name, Zipcode or Postcode"></input>
                <button onClick={handleButtonSubmmit}>
                    Search
                </button>
            </div>
            {location != "Enter a place" ? (
                <div>
                    <h2 align="right"><img src="https://pngimg.com/uploads/gps/small/gps_PNG66.png" height="30"></img> <a href={`https://www.google.com/maps/place/${location?.data?.location?.name.split(' ').join('+')},+${location?.data?.location?.country}`} target="_blank">{location?.data?.location?.name} - {location?.data?.location?.region} - {location?.data?.location?.country.toUpperCase()}</a></h2>
                    <h1>{location?.data?.location?.localtime.substring(11,location?.data?.location?.localtime.length)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src={location?.data?.current?.condition?.icon} alt="weather-image" className="icon"></img> {location?.data?.current?.temp_c} °C / {location?.data?.current?.temp_f} F</h1>
                    <h4 align="right">UV index: {indiceUv(location?.data?.current?.uv)}</h4>
                    <h2>
                    <img src={humidity} height="40px" align="left" className="details"></img> 
                    <div align="left" height="40px">Humidity {location?.data?.current?.humidity}%</div>
                    </h2>
                    <h2>
                    <img src={wind} height="40px" align="left" className="details"></img>
                    <div align="left">Wind Speed {location?.data?.current?.wind_kph} kph / {location?.data?.current?.wind_mph} mph</div>
                    </h2>
                </div>
            ) :("")}
        </div>
    )
}
export default Weather