import axios from 'axios';
import react from 'react'


//takes props from SearchBar to diplay the data in a weatherCard
// TODO: find out how to make a card that fade in
const weatherCard=({temp, temp_min, temp_max, feels_like, country, description, icon})=>{

  return (
    <div className="ui center aligned container" key={result.id}>

      <img src={`http://openweathermap.org/img/w/${icon}.png`}/>
      <h3>Temprature:</h3>{Math.round(temp)}°
      <h3>Feels like:</h3>{Math.round(feels_like)}°
      <h3>Min/Max temp:</h3>{Math.round(temp_min)}°/{Math.round(temp_max)}°
      <h3>Country:</h3>{country}
      <h3>Discription:</h3>{description}
    </div>
  );




}


export default weatherCard
