const API_ROOT_CITY ='https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
  const cityInput= 'Chicago,Illinois';
  const API_KEY='&appid=88bcfe9b8586144cdab20a4845e59c40';
  
  
  
  export default async location => {
  
    const Url=API_ROOT_CITY+cityInput+API_KEY;
	  
	
	const data= await fetch(Url);
	
	const weather= await data.json();
	
	console.log("Raw weather:");
	console.log(weather);
	
	setWeather(weather.main);
	
	console.log("Weather main:");
	console.log(weather.main);
	
	return weather;
	
  };