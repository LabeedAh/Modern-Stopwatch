function Stopwatch({
	startBtn,
	stopBtn,
	resumeBtn,
	hoursSpan,
	minutesSpan,
	secondsSpan,
	millisecondsSpan,
}) {
	this.startTimer;
	this.hr = this.min = this.sec = this.ms = "0" + 0;

	this.putValue = () => {
		millisecondsSpan.innerText = this.ms;
		secondsSpan.innerText = this.sec;
		minutesSpan.innerText = this.min;
		hoursSpan.innerText = this.hr;
	};

	this.startInterval = () => {
		return setInterval(() => {
			this.ms++;
			this.ms = this.ms < 10 ? "0" + this.ms : this.ms;

			if (this.ms == 100) {
				this.sec++;
				this.sec = this.sec < 10 ? "0" + this.sec : this.sec;
				this.ms = "0" + 0;
			}
			if (this.sec == 60) {
				this.min++;
				this.min = this.min < 10 ? "0" + this.min : this.min;
				this.sec = "0" + 0;
			}
			if (this.min == 60) {
				this.hr++;
				this.hr = this.hr < 10 ? "0" + this.hr : this.hr;
				this.min = "0" + 0;
			}
			this.putValue();
		}, 10);
	};

	this.start = () => {
		startBtn.classList.add("active");
		stopBtn.classList.remove("active");

		this.startTimer = this.startInterval();
	};

	this.stop = () => {
		stopBtn.classList.add("active");
		resumeBtn.classList.remove("active");
		clearInterval(this.startTimer);
	};

	this.resume = () => {
		resumeBtn.classList.add("active");
		stopBtn.classList.remove("active");
		this.startTimer = this.startInterval();
	};

	this.reset = () => {
		stopBtn.classList.add("active");
		resumeBtn.classList.add("active");
		startBtn.classList.remove("active");
		clearInterval(this.startTimer);
		this.hr = this.min = this.sec = this.ms = "0" + 0;
		this.putValue();
	};
}

function drawStopWatch() {
	const wrapperDiv = document.createElement("div");
	wrapperDiv.classList.add("wrapper");

	const timeDiv = document.createElement("div");
	timeDiv.classList.add("time");

	const hoursSpan = document.createElement("span");
	hoursSpan.classList.add("hours");
	hoursSpan.innerText = "00";

	const colonSpan1 = document.createElement("span");
	colonSpan1.classList.add("colon");
	colonSpan1.innerText = ":";

	const minutesSpan = document.createElement("span");
	minutesSpan.classList.add("minutes");
	minutesSpan.innerText = "00";

	const colonSpan2 = colonSpan1.cloneNode(true);

	const secondsSpan = document.createElement("span");
	secondsSpan.classList.add("seconds");
	secondsSpan.innerText = "00";

	const colonSpan3 = colonSpan1.cloneNode(true);
	colonSpan3.classList.add("this.ms-colon");

	const millisecondsSpan = document.createElement("span");
	millisecondsSpan.classList.add("milliseconds");
	millisecondsSpan.innerText = "00";

	timeDiv.appendChild(hoursSpan);
	timeDiv.appendChild(colonSpan1);
	timeDiv.appendChild(minutesSpan);
	timeDiv.appendChild(colonSpan2);
	timeDiv.appendChild(secondsSpan);
	timeDiv.appendChild(colonSpan3);
	timeDiv.appendChild(millisecondsSpan);

	const buttonsDiv = document.createElement("div");
	buttonsDiv.classList.add("buttons");

	const startBtn = document.createElement("button");
	startBtn.classList.add("btn_start");
	startBtn.innerText = "Start";

	const resumeBtn = document.createElement("button");
	resumeBtn.classList.add("btn_resume");
	resumeBtn.classList.add("active");
	resumeBtn.innerText = "Resume";

	const stopBtn = document.createElement("button");
	stopBtn.classList.add("btn_stop");
	stopBtn.classList.add("active");
	stopBtn.innerText = "Stop";

	const resetBtn = document.createElement("button");
	resetBtn.classList.add("btn_reset");
	resetBtn.innerText = "Reset";

	buttonsDiv.appendChild(startBtn);
	buttonsDiv.appendChild(resumeBtn);
	buttonsDiv.appendChild(stopBtn);
	buttonsDiv.appendChild(resetBtn);

	wrapperDiv.appendChild(timeDiv);
	wrapperDiv.appendChild(buttonsDiv);

	const root = document.body;
	root.appendChild(wrapperDiv);

	let stopwatch = new Stopwatch({
		startBtn,
		stopBtn,
		resumeBtn,
		hoursSpan,
		minutesSpan,
		secondsSpan,
		millisecondsSpan,
	});

	startBtn.addEventListener("click", stopwatch.start);
	stopBtn.addEventListener("click", stopwatch.stop);
	resumeBtn.addEventListener("click", stopwatch.resume);
	resetBtn.addEventListener("click", stopwatch.reset);
}

(function () {
	drawStopWatch();

	const addClockBtn = document.querySelector(".btn_add_clock");
	addClockBtn.addEventListener("click", drawStopWatch);
})();
