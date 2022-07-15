// let searchInput = document.querySelector('.input-group > input');
// let searchButton = document.querySelector('.input-group > .btn');
// searchButton.addEventListener('click', () => {
// 	window.localStorage.setItem('city', searchInput.value);
// });

const kelvinToCelsius = (degree) => {
	return Math.round(degree - 273,15);
};

fetch('https://api.openweathermap.org/data/2.5/forecast?q=annaba&appid=cd557f36e34aa72fef4e9503370d552f')
	.then(response => response.json())
	.then(response => {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		let currentDayWeather = [];
		let dayOneWeather = [];
		let dayTwoWeather = [];
		let dayThreeWeather = [];
		let dayFourWeather = [];
		let dayFiveWeather = [];
		let CurrentDaytempDegrees = [];
		let dayOnetempDegrees = [];
		let dayTwotempDegrees = [];
		let dayThreetempDegrees = [];
		let dayFourtempDegrees = [];
		let dayFivetempDegrees = [];
		let {list} = response;
		let i = 0;
		let date = new Date(list[0].dt_txt);
		let currentDay = date.getDate();
		let dayOne = new Date(date.setDate(currentDay + 1)).getDate();
		let dayTwo = new Date(date.setDate(dayOne + 1)).getDate();
		let dayThree = new Date(date.setDate(dayTwo + 1)).getDate();
		let dayFour = new Date(date.setDate(dayThree + 1)).getDate();
		let dayFive = new Date(date.setDate(dayFour + 1)).getDate();
		while(i < list.length && new Date(list[i].dt_txt).getDate() === currentDay){
			currentDayWeather.push(list[i]);
			i++;
		}
		while(i < list.length && new Date(list[i].dt_txt).getDate() === dayOne){
			dayOneWeather.push(list[i]);
			i++;
		}
		while(i < list.length && new Date(list[i].dt_txt).getDate() === dayTwo){
			dayTwoWeather.push(list[i]);
			i++;
		}
		while(i < list.length && new Date(list[i].dt_txt).getDate() === dayThree){
			dayThreeWeather.push(list[i]);
			i++;
		}
		while(i < list.length && new Date(list[i].dt_txt).getDate() === dayFour){
			dayFourWeather.push(list[i]);
			i++;
		}
		while(i < list.length && new Date(list[i].dt_txt).getDate() === dayFive){
			dayFiveWeather.push(list[i]);
			i++;
		}
		for(let i = 0; i < currentDayWeather.length; i++){
			CurrentDaytempDegrees.push(kelvinToCelsius(currentDayWeather[i].main.temp))
		}
		for(let i = 0; i < dayOneWeather.length; i++){
			dayOnetempDegrees.push(kelvinToCelsius(dayOneWeather[i].main.temp))
		}
		for(let i = 0; i < dayTwoWeather.length; i++){
			dayTwotempDegrees.push(kelvinToCelsius(dayTwoWeather[i].main.temp))
		}
		for(let i = 0; i < dayThreeWeather.length; i++){
			dayThreetempDegrees.push(kelvinToCelsius(dayThreeWeather[i].main.temp))
		}
		for(let i = 0; i < dayFourWeather.length; i++){
			dayFourtempDegrees.push(kelvinToCelsius(dayFourWeather[i].main.temp))
		}
		for(let i = 0; i < dayFiveWeather.length; i++){
			dayFivetempDegrees.push(kelvinToCelsius(dayFiveWeather[i].main.temp))
		}

		// Creating the title
		let title = document.createElement('div');
		title.classList.add('title');
		title.classList.add('pt-4');
		title.innerHTML = `<div class="container d-flex justify-content-between align-items-center">
								<div class="location-and-time">
									<div class="h1 mb-0">${response.city.name}, ${response.city.country}</div>
									<p class="lh-1">${days[new Date(list[0].dt_txt).getDay()]} ${new Date(list[0].dt_txt).getDate()} ${months[new Date(list[0].dt_txt).getMonth()]}</p>
								</div>
								<div class="input-group">
									<input type="search" class="form-control border-0 border-bottom shadow-none" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
									<button type="button" class="btn btn-outline-light">search</button>
								</div>
							</div>`;
		document.body.appendChild(title);

		//Creating today info
		let todayInfo = document.createElement('div');
		todayInfo.classList.add('today-info');
		todayInfo.innerHTML = `<div class="container">
									<div class="row">
										<div class="col-md-6 row">
											<div class="col-6 p-2 p-md-5"><img class="img-fluid p-4" src="./icons/${currentDayWeather[0].weather[0].icon}.png" alt="Weather icon"></div>
											<div class="col-6 d-flex flex-column justify-content-center align-items-center">
												<p class="temp mb-0 lh-1">${kelvinToCelsius(currentDayWeather[0].main.temp)}°</p>
												<p class="mb-0 fs-4">${currentDayWeather[0].weather[0].description}</pstyle=>
											</div>
										</div>
										<div class="col-md-6 pt-4 pt-md-0 row text-center align-items-center">
											<div class="col-4 mb-3 mb-md-0">
												<p class="high fs-3 mb-0 lh-1">${Math.max(...CurrentDaytempDegrees)}°</p>
												<p class="mb-0">High</pstyle=>
											</div>
											<div class="col-4 mb-3 mb-md-0">
												<p class="wind fs-3 mb-0 lh-1">${Math.round(currentDayWeather[0].wind.speed * 3600 / 1000)}km/h</p>
												<p class="mb-0">Wind</pstyle=>
											</div>
											<div class="col-4 mb-3 mb-md-0">
												<p class="sunrise fs-3 mb-0 lh-1">${new Date(response.city.sunrise * 1000).getHours()}:${new Date(response.city.sunrise * 1000).getMinutes()}</p>
												<p class="mb-0">Sunrise</pstyle=>
											</div>
											<div class="col-4 mb-3 mb-md-0">
												<p class="low fs-3 mb-0 lh-1">${Math.min(...CurrentDaytempDegrees)}°</p>
												<p class="mb-0">Low</pstyle=>
											</div>
											<div class="col-4 mb-3 mb-md-0">
												<p class="rain fs-3 mb-0 lh-1">${currentDayWeather[0].main.humidity}%</p>
												<p class="mb-0">Humidity</pstyle=>
											</div>
											<div class="col-4 mb-3 mb-md-0">
												<p class="sunset fs-3 mb-0 lh-1">${new Date(response.city.sunset * 1000).getHours()}:${new Date(response.city.sunset * 1000).getMinutes()}</p>
												<p class="mb-0">Sunset</pstyle=>
											</div>
										</div>
									</div>
								</div>`;
		document.body.appendChild(todayInfo);

		//Creating today weather
		let todayWeather = document.createElement('div');
		todayWeather.classList.add('today-weather');
		todayWeather.classList.add('d-none');
		todayWeather.classList.add('d-md-block');
		todayWeather.innerHTML = `<div class="container">
									<div class="h3 mb-3">Today's weather</div>
									<div class="d-flex justify-content-center">
									</div>
								</div>`;
		document.body.appendChild(todayWeather);
		let todayWeatherWidgets = document.querySelector('.today-weather .container div:last-child');
		for(let i = 0; i < currentDayWeather.length; i++){
			let widget = document.createElement('div');
			widget.classList.add('px-4');
			widget.classList.add('text-center');
			widget.classList.add('border');
			widget.classList.add('rounded');
			widget.classList.add('mx-lg-4');
			widget.classList.add('mx-md-2');
			widget.innerHTML = `<div class="hour">${new Date(currentDayWeather[i].dt * 1000).getHours() <= 12 ? new Date(currentDayWeather[i].dt * 1000).getHours() : new Date(currentDayWeather[i].dt * 1000).getHours() - 12}pm</div>
								<img style="width: 44px; height: 44px;" src="./icons/${currentDayWeather[i].weather[0].icon}.png" alt="Weather icon">
								<div class="deg">${kelvinToCelsius(currentDayWeather[i].main.temp)}°</div>`;
			todayWeatherWidgets.appendChild(widget);
		}

		//Creating large screens next days
		let nextDays = document.createElement('div');
		nextDays.classList.add('next-days');
		nextDays.classList.add('d-none');
		nextDays.classList.add('d-md-block');
		nextDays.classList.add('mt-5');
		nextDays.classList.add('pb-5');
		nextDays.innerHTML = `<div class="container">
									<div class="h3 mb-3">Next 5 days</div>
								</div>`;
		document.body.appendChild(nextDays);
		let nextDaysTable = document.querySelector('.next-days .container div:last-child');
		nextDaysTable.innerHTML = `<div class="border-top d-flex justify-content-between py-2">
										<div class="text-center">
											<p class="day-name fs-3 mb-0 lh-1">${days[new Date(dayOneWeather[0].dt_txt).getDay()].substring(0,3)}</p>
											<p class="mb-0">${new Date(dayOneWeather[0].dt_txt).getDate()}/${new Date(dayOneWeather[0].dt_txt).getMonth() + 1}</p>
										</div>
										<img style="width: 44px; height: 44px;" src="./icons/${dayOneWeather[4].weather[0].icon}.png" alt="Weather icon">
										<div class="text-center">
											<p class="low fs-3 mb-0 lh-1">${Math.min(...dayOnetempDegrees)}°</p>
											<p class="mb-0">Low</p>
										</div>
										<div class="text-center">
											<p class="high fs-3 mb-0 lh-1">${Math.max(...dayOnetempDegrees)}°</p>
											<p class="mb-0">High</p>
										</div>
										<div class="text-center">
											<p class="wind fs-3 mb-0 lh-1">${Math.round(dayOneWeather[4].wind.speed * 3600 / 1000)}km/h</p>
											<p class="mb-0">Wind</p>
										</div>
										<div class="text-center">
											<p class="rain fs-3 mb-0 lh-1">${dayOneWeather[0].main.humidity}%</p>
											<p class="mb-0">Humidity</p>
										</div>
									</div>
									<div class="border-top d-flex justify-content-between py-2">
										<div class="text-center">
											<p class="day-name fs-3 mb-0 lh-1">${days[new Date(dayTwoWeather[0].dt_txt).getDay()].substring(0,3)}</p>
											<p class="mb-0">${new Date(dayTwoWeather[0].dt_txt).getDate()}/${new Date(dayTwoWeather[0].dt_txt).getMonth() + 1}</p>
										</div>
										<img style="width: 44px; height: 44px;" src="./icons/${dayTwoWeather[4].weather[0].icon}.png" alt="Weather icon">
										<div class="text-center">
											<p class="low fs-3 mb-0 lh-1">${Math.min(...dayTwotempDegrees)}°</p>
											<p class="mb-0">Low</p>
										</div>
										<div class="text-center">
											<p class="high fs-3 mb-0 lh-1">${Math.max(...dayTwotempDegrees)}°</p>
											<p class="mb-0">High</p>
										</div>
										<div class="text-center">
											<p class="wind fs-3 mb-0 lh-1">${Math.round(dayTwoWeather[4].wind.speed * 3600 / 1000)}km/h</p>
											<p class="mb-0">Wind</p>
										</div>
										<div class="text-center">
											<p class="rain fs-3 mb-0 lh-1">${dayTwoWeather[0].main.humidity}%</p>
											<p class="mb-0">Humidity</p>
										</div>
									</div>
									<div class="border-top d-flex justify-content-between py-2">
										<div class="text-center">
											<p class="day-name fs-3 mb-0 lh-1">${days[new Date(dayThreeWeather[0].dt_txt).getDay()].substring(0,3)}</p>
											<p class="mb-0">${new Date(dayThreeWeather[0].dt_txt).getDate()}/${new Date(dayThreeWeather[0].dt_txt).getMonth() + 1}</p>
										</div>
										<img style="width: 44px; height: 44px;" src="./icons/${dayThreeWeather[4].weather[0].icon}.png" alt="Weather icon">
										<div class="text-center">
											<p class="low fs-3 mb-0 lh-1">${Math.min(...dayThreetempDegrees)}°</p>
											<p class="mb-0">Low</p>
										</div>
										<div class="text-center">
											<p class="high fs-3 mb-0 lh-1">${Math.max(...dayThreetempDegrees)}°</p>
											<p class="mb-0">High</p>
										</div>
										<div class="text-center">
											<p class="wind fs-3 mb-0 lh-1">${Math.round(dayThreeWeather[4].wind.speed * 3600 / 1000)}km/h</p>
											<p class="mb-0">Wind</p>
										</div>
										<div class="text-center">
											<p class="rain fs-3 mb-0 lh-1">${dayThreeWeather[0].main.humidity}%</p>
											<p class="mb-0">Humidity</p>
										</div>
									</div>
									<div class="border-top border-bottom d-flex justify-content-between py-2">
										<div class="text-center">
											<p class="day-name fs-3 mb-0 lh-1">${days[new Date(dayFourWeather[0].dt_txt).getDay()].substring(0,3)}</p>
											<p class="mb-0">${new Date(dayFourWeather[0].dt_txt).getDate()}/${new Date(dayFourWeather[0].dt_txt).getMonth() + 1}</p>
										</div>
										<img style="width: 44px; height: 44px;" src="./icons/${dayFourWeather[4].weather[0].icon}.png" alt="Weather icon">
										<div class="text-center">
											<p class="low fs-3 mb-0 lh-1">${Math.min(...dayFourtempDegrees)}°</p>
											<p class="mb-0">Low</p>
										</div>
										<div class="text-center">
											<p class="high fs-3 mb-0 lh-1">${Math.max(...dayFourtempDegrees)}°</p>
											<p class="mb-0">High</p>
										</div>
										<div class="text-center">
											<p class="wind fs-3 mb-0 lh-1">${Math.round(dayFourWeather[4].wind.speed * 3600 / 1000)}km/h</p>
											<p class="mb-0">Wind</p>
										</div>
										<div class="text-center">
											<p class="rain fs-3 mb-0 lh-1">${dayFourWeather[0].main.humidity}%</p>
											<p class="mb-0">Humidity</p>
										</div>
									</div>`;

	//Creating small screens next days
	let nextDaysSmall = document.createElement('div');
	nextDaysSmall.classList.add('next-days-mobile');
	nextDaysSmall.classList.add('d-block');
	nextDaysSmall.classList.add('d-md-none');
	nextDaysSmall.classList.add('mb-5');
	nextDaysSmall.classList.add('pt-4');
	nextDaysSmall.innerHTML = `<div class="container">
									<div class="h3 mb-3">Next 5 days</div>
									<div class="d-flex justify-content-center"></div>
								</div>`;
		document.body.appendChild(nextDaysSmall);
		let nextDaysRow = document.querySelector('.next-days-mobile .container div:last-child');
		nextDaysRow.innerHTML = `<div class="px-4 text-center border rounded mx-lg-4 mx-2">
									<div class="day">${days[new Date(dayOneWeather[0].dt_txt).getDay()].substring(0,3)}</div>
									<img style="width: 44px; height: 44px;" src="./icons/${dayOneWeather[4].weather[0].icon}.png" alt="Weather icon">
									<div class="deg">${Math.max(...dayOnetempDegrees)}°</div>
								</div>
								<div class="px-4 text-center border rounded mx-lg-4 mx-2">
									<div class="day">${days[new Date(dayTwoWeather[0].dt_txt).getDay()].substring(0,3)}</div>
									<img style="width: 44px; height: 44px;" src="./icons/${dayTwoWeather[4].weather[0].icon}.png" alt="Weather icon">
									<div class="deg">${Math.max(...dayTwotempDegrees)}°</div>
								</div>
								<div class="px-4 text-center border rounded mx-lg-4 mx-2">
									<div class="day">${days[new Date(dayThreeWeather[0].dt_txt).getDay()].substring(0,3)}</div>
									<img style="width: 44px; height: 44px;" src="./icons/${dayThreeWeather[4].weather[0].icon}.png" alt="Weather icon">
									<div class="deg">${Math.max(...dayThreetempDegrees)}°</div>
								</div>
								<div class="px-4 text-center border rounded mx-lg-4 mx-2">
									<div class="day">${days[new Date(dayFourWeather[0].dt_txt).getDay()].substring(0,3)}</div>
									<img style="width: 44px; height: 44px;" src="./icons/${dayFourWeather[4].weather[0].icon}.png" alt="Weather icon">
									<div class="deg">${Math.max(...dayFourtempDegrees)}°</div>
								</div>`;
	})
	.catch(err => console.error(`The error is ${err}`));