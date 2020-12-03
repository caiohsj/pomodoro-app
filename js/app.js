var count = localStorage.getItem('count');
var amountOfPomodoros = localStorage.getItem('amountOfPomodoros');
var timerPomodoro = document.getElementById('timer-pomodoro');
var timerInterval = document.getElementById('timer-interval');
var alarm = document.getElementById('sound');
var labelMinutes = document.querySelector('.timer .minutes');
var labelSeconds = document.querySelector('.timer .seconds');
var labelAmountOfPomodoros = document.querySelector('.amount-pomodoros');
var button = document.querySelector('.btn-play');
var buttonInterval = document.querySelector('.btn-play-interval'); 
var interval;
var activeInterval = false;

Notification.requestPermission().then(function(result) {});

if (count == null) {
    count = 0;
    setCount(count);
}

if (amountOfPomodoros == null) {
    amountOfPomodoros = 0;
    setAmountOfPomodoros(amountOfPomodoros);
}

setLabelAmountOfPomodoros(amountOfPomodoros);

button.addEventListener('click', function(event) {
    event.preventDefault();
    initLabelMinutesAndLabelSecondsForPomodoro();
    interval = setInterval(decreaseSecond, 1000);
    event.target.style.display = 'none';
    buttonInterval.style.display = 'none';
});

buttonInterval.addEventListener('click', function(event) {
    event.preventDefault();
    activeInterval = true;
    initLabelMinutesAndLabelSecondsForInterval();
    interval = setInterval(decreaseSecond, 1000);
    event.target.style.display = 'none';
    button.style.display = 'none';
});

function initLabelMinutesAndLabelSecondsForPomodoro() {
    labelMinutes.innerHTML = timerPomodoro.value - 1;
    labelSeconds.innerHTML = 59;
}

function initLabelMinutesAndLabelSecondsForInterval() {
    labelMinutes.innerHTML = timerInterval.value - 1;
    labelSeconds.innerHTML = 59;
}

function setLabelMinutesAndLabelSeconds() {
    labelMinutes.innerHTML = labelMinutes.textContent - 1;
    labelSeconds.innerHTML = 5;
}

function setLabelAmountOfPomodoros(value) {
    labelAmountOfPomodoros.innerHTML = '('+value+')';
}

function setCount(value) {
    localStorage.setItem('count', value);
}

function setAmountOfPomodoros(value) {
    localStorage.setItem('amountOfPomodoros', value);
}

function showButtons() {
    buttonInterval.style.display = 'inline';
    button.style.display = 'inline';
}

function sendNotifications() {
    alert('Sugerimos que descanse 10 minutos agora');
    if (Notification.permission === 'granted') {
        new Notification('Sugerimos que descanse 10 minutos agora');
    }
}

function decreaseSecond() {
    if (labelMinutes.textContent >= 0 && labelSeconds.textContent >= 0) {
        if (labelSeconds.textContent > 0) {
            labelSeconds.innerHTML = labelSeconds.textContent - 1;
        } else if (labelMinutes.textContent > 0) {
            setLabelMinutesAndLabelSeconds();
        } else {
            let soundedAlarm = false;
            if (count < 3 && activeInterval == false) {
                count++;
            } else if (count == 3 && activeInterval == false) {
                alarm.play();
                soundedAlarm = true;
                sendNotifications();
                count = 0;
            }

            if (activeInterval == false) {
                amountOfPomodoros++;
                setAmountOfPomodoros(amountOfPomodoros);
            }
            activeInterval = false;
            setCount(count);
            showButtons();
            setLabelAmountOfPomodoros(amountOfPomodoros);
            if (soundedAlarm == false) {
                alarm.play();
            }
            clearInterval(interval);
        }
    }
}