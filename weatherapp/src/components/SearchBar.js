import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react'

const API_ROOT_CITY ='https://api.openweathermap.org/data/2.5/weather?';

const API_KEY=process.env. REACT_APP_TEST_KEY;

const SearchBar=() => {

	const [term, setTerm]= useState('Toronto, Canada');
	const [results, setResults] = useState([]);
	const [debouncedTerm, setDebouncedTerm] = useState(term);
	const [errorMessage, setErrorMessage]=useState('')
	//pieces of state used to hold the input and results





	useEffect(()=>{

		const setTimer= setTimeout(() => {
			setDebouncedTerm(term);
		}, 1000);

		return() =>{
			clearTimeout(setTimer);
		};

	}, [term]);
	//used to make debounced text that limit api requests




	//a function for rendering the search results
	const renderedResults = results.map(result => {

		if(errorMessage != '')
		{
			return(<div>{errorMessage}</div>)
		}

		return (
      <div className="ui center aligned container" key={result.id}>

				<img src={`http://openweathermap.org/img/w/${result.weather[0].icon}.png`}/>
				<h2>{result.weather[0].description}</h2>
				<h3>Temprature:</h3>{Math.round(result.main.temp)}°
				<h3>Feels like:</h3>{Math.round(result.main.feels_like)}°
				<h3>Min/Max temp:</h3>{Math.round(result.main.temp_min)}°/{Math.round(result.main.temp_max)}°
				<h3>Country:</h3><img src={`https://www.countryflagicons.com/${result.sys.country}/shiny/64.png`}/>
      </div>
    );
  });



//used to call the openweathermap API to get the weather data
	const searchWeather= async ()=> {

	try{
		const { data } = await axios.get(
			 API_ROOT_CITY,
			 { params: {
				q: debouncedTerm,
				appid: API_KEY,
				units:'metric',
				format: 'json',

			 },

			});

		setResults([data]);
		setErrorMessage('');
	}catch (e) {
		setErrorMessage(e.message);
		console.log(e.name);
		console.log(errorMessage);
}

	};


	//Gets returned to the app component
	//// TODO: pass props to weatherCard
	return(

	<div>
		<div className="ui segment">
			<div className="ui form">
			<div className = "field">
				<label >Enter a city</label>
					<input
						value={term}
						onChange={(e)=> setTerm(e.target.value)}
						className="input"
						placeholder="Search for a city..."
					/>
					<br/>
					<Button primary onClick={searchWeather}>Find</Button>
			</div>
		</div>
		</div>
		{renderedResults}
	</div>
	)


}





export default SearchBar
