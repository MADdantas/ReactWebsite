import axios from "axios"
import { useState } from "react"
import './ApiRequest.css'

const requestWeather = async (location) => {
    try{
        const data = await axios.get(`http://api.weatherapi.com/v1/current.json?key=77252c96c8d24a31980161429232603&q=${location}&aqi=no`);
        console.log(data);
        return data
    } catch(e) {
        console.log(e);
        return e
    }
}

function Weather() {

    const [location, setLocation] = useState();

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
                <input type="text" id="location" size={40} placeholder="Type a city name, Zipcode or Postcode"></input>
                <button onClick={handleButtonSubmmit}>
                    Search
                </button>
            </div>
            {location && (
                <div>
                    <h2 className="hltext" align="right"><img src="https://pngimg.com/uploads/gps/small/gps_PNG66.png" height="30"></img> {location?.data?.location?.name} - {location?.data?.location?.region} - {location?.data?.location?.country.toUpperCase()}</h2>
                    <h1 className="hltext">{location?.data?.location?.localtime.substring(11,location?.data?.location?.localtime.length)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src={location?.data?.current?.condition?.icon} alt="weather-image" className="icon"></img> {location?.data?.current?.temp_c} °C / {location?.data?.current?.temp_f} F</h1>
                    <h4 className="hltext" align="right">UV index: {indiceUv(location?.data?.current?.uv)}</h4>
                </div>
            )}
        </div>
    )
}
export default Weather