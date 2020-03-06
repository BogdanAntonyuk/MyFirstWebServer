const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)));

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is some helpful text.',
		title: 'Help',
		name: 'boba',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'bob',
	});
});

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'boba',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.adress) {
		return res.send({
			error: 'You must provide an adress!',
		});
	}
	geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({
				error,
			});
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error,
				});
			}
			res.send({
				forecast: forecastData,
				location,
				adress: req.query.adress,
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term!',
		});
	}

	console.log(req.query.search);

	res.send({
		products: [],
	});
});

app.get('/help/*', (req, res) => {
	res.render('404page', {
		title: '404 error!',
		errorText: 'Help article not found',
		name: 'boba',
	});
});

app.get('*', (req, res) => {
	res.render('404page', {
		title: '404 error!',
		errorText: 'Page not found',
		name: 'boba',
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
