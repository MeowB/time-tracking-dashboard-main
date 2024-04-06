const dailyBtn = document.querySelector("#daily");
const monthlyBtn = document.querySelector("#monthly");
const weeklyBtn = document.querySelector("#weekly");

dailyBtn.addEventListener("click", () => setValues(dailyBtn.id))
monthlyBtn.addEventListener("click", () => setValues(monthlyBtn.id))
weeklyBtn.addEventListener("click", () => setValues(weeklyBtn.id))




async function setValues(timeframe) {
	const response = await fetch("./data.json");
	const times = await response.json();
	const divUl = document.querySelector("body > main > ul");
	const previousWhat = {
		daily: "day", 
		weekly: "week" , 
		monthly: "month"
	};


	divUl.innerHTML = ''
	times.forEach(element => {
		if (timeframe) {
			const formatedTitle = element.title.toLowerCase().replace(/\s+/g, '-')
			const divStructure = `
			<li class="card" id="${formatedTitle}">
				<div class="background" id="background-${formatedTitle}" >
					<span></span>
					<div class="wrapper">
						<div class ="left">
							<h2>${element.title}</h2>
							<div>${element.timeframes[timeframe].current}hrs</div>
						</div>
						
						<div class="right">
							<img src="./images/icon-ellipsis.svg" alt="ellipsis">
							<div>${previousWhat[timeframe] == 'day' ? "yesterday" : `Last ${previousWhat[timeframe]}` } - ${element.timeframes[timeframe].previous}hrs</div>
						</div>
					</div>
				</div>
			</li>`;
			divUl.innerHTML += divStructure;
		} else {			
			const formatedTitle = element.title.toLowerCase().replace(/\s+/g, '-')
			var divStructure = `
			<li class="card" id="${formatedTitle}">
				<div id="background-${formatedTitle}" class="background">
					<span></span>
					<div class="wrapper">
						<div class ="left">
							<h2>${element.title}</h2>
							<div>${element.timeframes.weekly.current}hrs</div>
						</div>
						
						<div class="right">
							<img src="./images/icon-ellipsis.svg" alt="ellipsis">
							<div>Last month - ${element.timeframes.weekly.previous}hrs</div>
						</div>
					</div>
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