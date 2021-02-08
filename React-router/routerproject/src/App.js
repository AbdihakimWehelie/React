import React, {useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import './App.css';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
    },
    containerGrid: {
        flex: 1,
        overflowY: "auto",
        padding: "2em",
    },
    addButton: {
        position: "absolute",
        margin: "1em",
        right: 0,
        bottom: 0,
    },
}));

const LOCAL_STORAGE_KEY = "city";
function saveToLocalStorage(city) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(city));
}

function readFromLocalStorage() {
    const storedLocations = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedLocations ? JSON.parse(storedLocations) : [];
}




function App() {
  
  useEffect( () => {
	
	fetchItems();
  
  }, []);
  
  const [weather, setWeather]= useState([]);
  
  
  
  
  // when the button is hit, calls the components
  const handleAddClick = () => setWeatherLocations([...weatherLocations, ""]);
  
   
  return (
    <div className={classes.root}>// div takes the css class "root" to use its properites 
	
		<AppBar position="static">// Uses materials UI to make an navbar
			<Toolbar>
				<Typography variant="h4" color="inherit">
					React Weather App 
				</Typography>
			</Toolbar>
		</AppBar>
	
		<Grid container spacing={3} classes.containerGrid}>//Contains the card for the weather.
			{weatherLocations.map((location, index) =>(
				<Grid key={location} xs={12} sm={6} md={4} lg={3} item>
				<WeatherCard
					location={location}
					canDelete={!location || canAddOrRemove}
					onDelete={removeAtIndex(index)}
					onUpdate={updateAtIndex(index)}
				/>
				</Grid>
			))}
		</Grid>	
	
		<Fab// Floating action button to enter the location
			onclick={handleAddClick}
			aria-label="add weather location" 
			className={classes.addButton} // uses css class addButton
			color="secondary"
			disabled={!canAddOrRemove}
		>
		<AddIcon />
		</Fab>
	
	</div>
  );
}
export default App;
