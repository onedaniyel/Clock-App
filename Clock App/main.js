// Variables
let second = document.querySelector(".second");
let minute = document.querySelector(".minute");
let hour = document.querySelector(".hour");
let start = document.querySelector(".start");
let stop = document.querySelector(".stop");
let reset = document.querySelector(".reset");
let time;
let clicked = true;

// Stopwatch functionality
start.addEventListener("click", () => {
  if (clicked) {
    time = setInterval(updateStopwatch, 1000);
    clicked = false;
  }
});

stop.addEventListener("click", () => {
  clearInterval(time);
  clicked = true;
});

reset.addEventListener("click", () => {
  clearInterval(time);
  second.textContent = "00";
  minute.textContent = "00";
  hour.textContent = "00";
  clicked = true;
});

function updateStopwatch() {
  let secondNum = +second.textContent;
  let minuteNum = +minute.textContent;
  let hourNum = +hour.textContent;

  if (secondNum === 59) {
    secondNum = 0;
    minuteNum++;
    if (minuteNum === 60) {
      minuteNum = 0;
      hourNum++;
    }
  } else {
    secondNum++;
  }

  second.textContent = secondNum.toString().padStart(2, "0");
  minute.textContent = minuteNum.toString().padStart(2, "0");
  hour.textContent = hourNum.toString().padStart(2, "0");
}

// Clock functionality
let clockHandHour = document.querySelector(".clockHand-hour");
let clockHandMinute = document.querySelector(".clockHand-minute");
let clockHandSecond = document.querySelector(".clockHand-second");
let clock__numbers = document.querySelectorAll(".clock__numbers");
let clock__number = document.querySelectorAll(".clock__number");
clock__numbers.forEach((num) => {
  let number = Number(num.innerHTML);
  num.style.transform = `rotate(${-number * 30}deg)`;
});
clock__number.forEach((num) => {
  let number = Number(num.innerHTML);
  num.style.transform = `rotate(${number * 30}deg)`;
});

function updateClock() {
  let now = new Date();
  let currentSecond = now.getSeconds();
  let currentMinute = now.getMinutes();
  let currentHour = now.getHours();

  clockHandSecond.style.transform = `rotate(${currentSecond * 6}deg)`;
  clockHandMinute.style.transform = `rotate(${currentMinute * 6}deg)`;
  clockHandHour.style.transform = `rotate(${
    currentHour * 30 + currentMinute * 0.5
  }deg)`;
}
setInterval(updateClock, 1000);
// Timer functionality
let timerHour = document.querySelector(".timer__hour");
let timerMinute = document.querySelector(".timer__minute");
let timerSecond = document.querySelector(".timer__second");
let selectionHour = document.querySelector(".selection__hour");
let selectionMinute = document.querySelector(".selection__minute");
let selectionSecond = document.querySelector(".selection__second");
let playBtn = document.querySelector(".timerBtn-start");
let resetBtn = document.querySelector(".timerBtn-reset");
let pauseBtn = document.querySelector(".timerBtn-pause");
let timerInterval;
let timerActive = false;

playBtn.addEventListener("click", () => {
  if (!timerActive) {
    initializeTimer();
    timerInterval = setInterval(decrementTimer, 1000);
    timerActive = true;
  }
});

pauseBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerActive = false;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerHour.textContent = "00";
  timerMinute.textContent = "00";
  timerSecond.textContent = "00";
  selectionHour.value = "";
  selectionMinute.value = "";
  selectionSecond.value = "";
  timerActive = false;
});

function initializeTimer() {
  let hourValue = Math.max(0, +selectionHour.value || 0);
  let minuteValue = Math.max(0, +selectionMinute.value || 0);
  let secondValue = Math.max(0, +selectionSecond.value || 0);

  if (hourValue === 0 && minuteValue === 0 && secondValue === 0) {
    alert("Please enter a positive number");
    return;
  }

  let totalSeconds = hourValue * 3600 + minuteValue * 60 + secondValue;
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  timerHour.textContent = hours.toString().padStart(2, "0");
  timerMinute.textContent = minutes.toString().padStart(2, "0");
  timerSecond.textContent = seconds.toString().padStart(2, "0");
}

function decrementTimer() {
  let hours = +timerHour.textContent;
  let minutes = +timerMinute.textContent;
  let seconds = +timerSecond.textContent;

  if (hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(timerInterval);
    timerActive = false;
    return;
  }

  if (seconds === 0) {
    if (minutes === 0) {
      hours--;
      minutes = 59;
      seconds = 59;
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    seconds--;
  }

  timerHour.textContent = hours.toString().padStart(2, "0");
  timerMinute.textContent = minutes.toString().padStart(2, "0");
  timerSecond.textContent = seconds.toString().padStart(2, "0");
}
// date converter functionality
let date__input = document.querySelector(".date__input");
let convert__btn = document.querySelector(".convert__btn");
let convert__result = document.querySelector(".convert__result");
convert__btn.addEventListener("click", () => {
  let gregorianDate = new Date(`${date__input.value}`);
  let solarDate = new persianDate(gregorianDate).format("YYYY-MM-DD");
  convert__result.textContent = solarDate;
});

// Tab Switching Functionality
let tabs = {
  stopwatch: document.querySelector(".stopwatch"),
  clock: document.querySelector(".clock"),
  alarm: document.querySelector(".alarm"),
  timer: document.querySelector(".timer"),
  dateConverter: document.querySelector(".date-converter"),
};

let buttons = {
  stopwatch: document.querySelector(".stopwatchBtn"),
  clock: document.querySelector(".clockBtn"),
  alarm: document.querySelector(".alarmBtn"),
  timer: document.querySelector(".timerBtn"),
  dateConverter: document.querySelector(".dateConverterBtn"),
};

Object.entries(buttons).forEach(([key, button]) => {
  button.addEventListener("click", () => {
    Object.values(tabs).forEach((tab) => tab.classList.remove("show"));
    tabs[key].classList.add("show");
  });
});
Object.entries(buttons).forEach(([key, button]) => {
  button.addEventListener("click", () => {
    Object.values(buttons).forEach((btn) => btn.classList.remove("selected"));
    buttons[key].classList.add("selected");
  });
});
