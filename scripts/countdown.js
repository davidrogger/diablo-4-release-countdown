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

function createElementWithClass(element, className) {
  const newElement = document.createElement(element);
  newElement.className = className;
  return newElement;
}

function updateElements(location, newTime) {
  if (location.day.innerText != newTime.day) {
    location.day.innerText = newTime.day;
  }
  if (location.hour.innerText != newTime.hour) {
    location.hour.innerText = newTime.hour;
  }
  if (location.minute.innerText != newTime.minute) {
    location.minute.innerText = newTime.minute;
  }
  if (location.second.innerText != newTime.second) {
    location.second.innerText = newTime.second;
  }
}

function createCountdown(type, location) {
  const day = createElementWithClass('span', `${type}-day`);
  const hour = createElementWithClass('span', `${type}-hour`);
  const minute = createElementWithClass('span', `${type}-minute`);
  const second = createElementWithClass('span', `${type}-second`);

  [day, hour, minute, second].forEach((element) => {
    location.appendChild(element)
  })
}

function getElements(type, location) {
  if(!location.querySelector(`.${type}-day`)) {
    createCountdown(type, location)
  }
  return {
    day: document.querySelector(`.${type}-day`),
    hour: document.querySelector(`.${type}-hour`),
    minute: document.querySelector(`.${type}-minute`),
    second: document.querySelector(`.${type}-second`),
  }
}


function startCountdown() {
  const EARLY_RELEASE = new Date('2023-06-01T20:00:00-03:00');
  const RELEASE = new Date('2023-06-05T20:00:00-03:00');

  const [earlyContainer, releaseContainer] = document.querySelectorAll('.countdown-container');

  const earlyTime = {};
  const releaseTime = {};

  const earlyElement = getElements('early', earlyContainer);
  const releaseElement = getElements('release', releaseContainer);

  let interval = null
  
  interval = setInterval(() => {
  const timeNow = new Date()
  const EARLY_COUNTDOWN = EARLY_RELEASE - timeNow
  const RELEASE_COUNTDOWN = RELEASE - timeNow
  

  updateTime(EARLY_COUNTDOWN, earlyTime);
  updateTime(RELEASE_COUNTDOWN, releaseTime);

    if (needToUpdate(earlyTime)) {
      updateElements(earlyElement, earlyTime);
    } else {
      earlyContainer.innerText = 'ONLINE';
    }

    if (needToUpdate(releaseTime)) {
      updateElements(releaseElement, releaseTime);
    } else {
      releaseContainer.innerText = 'ONLINE';
  
    }

    if (!needToUpdate(earlyTime) && !needToUpdate(releaseTime)) {
      clearInterval(interval)
    }

  }, 1000)
}

window.onload = () => {
  startCountdown()
}

