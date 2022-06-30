let searchInput = document.querySelector('.input-group > input');
let searchButton = document.querySelector('.input-group > .btn');
searchButton.addEventListener('click', () => {
	window.localStorage.setItem('city', searchInput.value);
});

fetch('https://api.openweathermap.org/data/2.5/forecast?q=annaba&appid=cd557f36e34aa72fef4e9503370d552f')
	.then(response => response.json())
	.then(response => {
		let currentDayWeather = [];
		let dayOneWeather = [];
		let dayTwoWeather = [];
		let dayThreeWeather = [];
		let dayFourWeather = [];
		let dayFiveWeather = [];
		let emptyArray = [];
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
	})
	.catch(err => console.error(`The error is ${err}`));