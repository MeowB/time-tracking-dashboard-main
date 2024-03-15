const dailyBtn = document.querySelector("#daily");
const monthlyBtn = document.querySelector("#monthly");
const weeklyBtn = document.querySelector("#weekly");

dailyBtn.addEventListener("click", () => setValues(dailyBtn.id))
monthlyBtn.addEventListener("click", () => setValues(monthlyBtn.id))
weeklyBtn.addEventListener("click", () => setValues(weeklyBtn.id))




async function setValues(timeframe) {
	const response = await fetch("./data.json");
	const times = await response.json();
	console.log();
	const divUl = document.querySelector("body > main > ul")
	divUl.innerHTML = ''
	times.forEach(element => {
		if (timeframe) {
			const formatedTitle = element.title.toLowerCase().replace(/\s+/g, '-')
			const divStructure = `
			<li class="card" id="${formatedTitle}">
				<div class="background" id="background-${formatedTitle}" ><img src="./images/icon-${formatedTitle}.svg"></div>
				<div class ="left">
					<h2>${element.title}</h2>
					<div>${element.timeframes[timeframe].current}</div>
				</div>
				
				<div class="right">
					<img src="./images/icon-ellipsis.svg" alt="ellipsis">
					<div>${element.timeframes[timeframe].previous}</div>
				</div>
			</li>`;
			divUl.innerHTML += divStructure;
		} else {			
			const formatedTitle = element.title.toLowerCase().replace(/\s+/g, '-')
			var divStructure = `
			<li class="card" id="${formatedTitle}">
				<div id="background-${formatedTitle}" class="background"><img src="./images/icon-${formatedTitle}.svg"></div>
				<div class ="left">
					<h2>${element.title}</h2>
					<div>${element.timeframes.weekly.current}</div>
				</div>
				
				<div class="right">
					<img src="./images/icon-ellipsis.svg" alt="ellipsis">
					<div>${element.timeframes.weekly.previous}</div>
				</div>
			</li>`;
			divUl.innerHTML += divStructure;
			for (let i = 0; i < element.timeframes.length; i++) {
				const element = element.timeframes[i];
			}
		}
	});

	const buttons = document.querySelectorAll(`button`)
	for (let index = 0; index < buttons.length; index++) {
		const element = buttons[index];
		if (element.id == timeframe) {
			buttons[index].style.color = "white"
			console.log();
		} else {
			buttons[index].style.color = "hsl(235, 45%, 61%)"
		}
	}

}

function getTimeframe(element) {

}

setValues()