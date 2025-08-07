export const retrieveForecast = async function retrieveForecastWeather(
	location,
	units = 'metric'
) {
	const promise = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=${units}&elements=datetime%2Ctempmax%2Ctempmin%2Cconditions%2Cicon&include=days&key=BJAE6JWBDH7WPY5BL3ZEC9MUC&contentType=json`,
		{ mode: 'cors' }
	);

	const forecast = await promise.json();

	return forecast;
};

export const retrieveHourly = async function retrieveHourlyWeather(
	location,
	units = 'metric'
) {
	const promise = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next12hours?unitGroup=${units}&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cicon&include=hours%2Cfcst%2Ccurrent&key=BJAE6JWBDH7WPY5BL3ZEC9MUC&options=nonulls&contentType=json`,
		{ mode: 'cors' }
	);

	const hourly = await promise.json();

	return hourly;
};

export const retrieveCurrent = async function retrieveCurrentWeather(
	location,
	units = 'metric'
) {
	const promise = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=${units}&elements=datetime%2CresolvedAddress%2Ctempmax%2Ctempmin%2Ctemp%2Csunrise%2Csunset%2Cconditions%2Cdescription&include=current%2Cdays&key=BJAE6JWBDH7WPY5BL3ZEC9MUC&contentType=json`,
		{ mode: 'cors' }
	);

	const current = await promise.json();

	return current;
};
