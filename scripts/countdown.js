const EARLY_RELEASE = new Date('2023-06-01T20:00:00-03:00');
const RELEASE = new Date('2023-06-05T20:00:00-03:00');
const TODAY = new Date();

const EARLY_COUNTDOWN = EARLY_RELEASE - TODAY
const RELEASE_COUNTDOWN = RELEASE - TODAY

const [earlyContainer, releaseContainer] = document.querySelectorAll('.countdown-container');

const earlyTime = {};
const releaseTime = {};

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

function updateTime(time, releaseType) {
  const miliseconds = 1000; // milesegundos para segundos
  const seconds = 60; // segundos para um minuto
  const minutes = 60; // minutos para uma hora
  const hours = 24; // horas para um dia
  
  const timeCalc = {
    day: time / (miliseconds * seconds * minutes * hours),
    hour: time % (miliseconds * seconds * minutes * hours) / (miliseconds * seconds * minutes),
    minute: time % (miliseconds * seconds * minutes) / (miliseconds * minutes),
    second: time % (miliseconds * seconds) / miliseconds,
  };

  Object.keys(timeCalc).forEach((key) => {
    releaseType[key] = formatTime(Math.floor(timeCalc[key]));
  })
}

function needToUpdate(time) {
  const isValidDay = Number(time.day) > 0;
  const isValidHour = Number(time.hour) > 0;
  const isValidMinute = Number(time.minute) > 0;
  const isValidSecond = Number(time.second) > 0;

  return isValidDay || isValidHour || isValidMinute || isValidSecond
}

function createElement(selector) {
  return {
    day: document.querySelector(`.${selector}-day`),
    hour: document.querySelector(`.${selector}-hour`),
    minute: document.querySelector(`.${selector}-minute`),
    second: document.querySelector(`.${selector}-second`),
  }
}


function updateElements() {
  let interval = null
  
  interval = setInterval(() => {
  const timeNow = new Date()
  const EARLY_COUNTDOWN = EARLY_RELEASE - timeNow
  const RELEASE_COUNTDOWN = RELEASE - timeNow
  
  const earlyElement = createElement('early');
  const releaseElement = createElement('release');

  updateTime(EARLY_COUNTDOWN, earlyTime);
  updateTime(RELEASE_COUNTDOWN, releaseTime);

    if (needToUpdate(earlyTime)) {
      earlyElement.day.innerText = earlyTime.day;
      earlyElement.hour.innerText = earlyTime.hour;
      earlyElement.minute.innerText = earlyTime.minute;
      earlyElement.second.innerText = earlyTime.second;
    } else {
      earlyContainer.innerText = 'ONLINE';
    }

    if (needToUpdate(releaseTime)) {
      releaseElement.day.innerText = releaseTime.day;
      releaseElement.hour.innerText = releaseTime.hour;
      releaseElement.minute.innerText = releaseTime.minute;
      releaseElement.second.innerText = releaseTime.second;
    } else {
      releaseContainer.innerText = 'ONLINE';
  
    }

    if (!needToUpdate(earlyTime) && !needToUpdate(releaseTime)) {
      clearInterval(interval)
    }

  }, 1000)
}

updateElements()
