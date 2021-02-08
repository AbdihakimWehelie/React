import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import ErrorIcon from "@material-ui/icons/Error";
import getLocationWeather from "./getLocationWeather";

const useStyles = makeStyles(theme => ({
    headerLine: {
        display: "flex",
        alignItems: "center",
    },
    location: {
        flex: 1,
    },
    detailLine: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    description: {
        flex: 1,
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));




function LocationWeather({weather}){

const classes= useStyles();

const[weatherData, setWeatherData]= React.useState({});

React.useEffect(() =>{
	const getWeather = async () =>{
		
		const result = await getLocationWeather(location);
		setWeatherData(result.success ? result.data : {});
	};
	
	getWeather();
	

},[location]);

const {flagIcon, countryCode} = React.useMemo(() => {
	
	return{
		flagIcon: weatherData.sys ? `https://www.countryflags.io/${weatherData.sys.country}/shiny/32.png` : "",
        countryCode: weatherData.sys ? weatherData.sys.country : "",
	};

},[weatherData]);


return(
	<>
		<div className={classes.headerLine}>
			<Typography className={classes.location} variant="h4">
				{location}
			</Typography>
			{flagIcon && <img alt={countryCode} src={flagIcon}
		</div>
	</>
);

}



export default LocationWeather;