import React, {useEffect, useState} from "react";
import "./style.css";
import WeatherDetails from "./WeatherDetails";



function SearchMain() {
    const [searchTerm, setSearchTerm] = useState("Ibadan");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
      try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=60f9074cda49e49e5124f351024510d4`

        let res = await fetch(url);
        let data = await res.json();
        const {temp, humidity, pressure} = data.main;
        const {main: weatherType} = data.weather[0];
        const {name} = data;
        const {speed} = data.wind;
        const {country, sunset} = data.sys;

        const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weatherType,
          name,
          speed,
          country,
          sunset,
        };

        setTempInfo(myNewWeatherInfo);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getWeatherInfo();
    }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
            <input 
              type="search" 
              placeholder="Enter your search" 
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button  
              className="searchButton" 
              onClick={getWeatherInfo}> Search
            </button>
        </div>
      </div>
      {/* This is weather details page */}
      <WeatherDetails {...tempInfo} />
    </>
  );
}

export default SearchMain;