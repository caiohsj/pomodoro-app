var count = localStorage.getItem('count');
var timerPomodoro = document.getElementById('timer-pomodoro');
var timerInterval = document.getElementById('timer-interval');
var labelMinutes = document.querySelector('.timer .minutes');
var labelSeconds = document.querySelector('.timer .seconds');
var button = document.querySelector('.btn-play'); 
var interval;

if (count == null) {
    count = 0;
    setCount(count);
}

button.addEventListener('click', function(event) {
    event.preventDefault();
    initLabelMinutesAndLabelSeconds();
    interval = setInterval(decreaseSecond, 1000);
    event.target.style.display = 'none';
});

function initLabelMinutesAndLabelSeconds() {
    labelMinutes.innerHTML = timerPomodoro.value - 1;
    labelSeconds.innerHTML = 59;
}

function setLabelMinutesAndLabelSeconds() {
    labelMinutes.innerHTML = labelMinutes.textContent - 1;
    labelSeconds.innerHTML = 59;
}

function setCount(value) {
    localStorage.setItem('count', value);
}

function decreaseSecond() {
    if (labelMinutes.textContent >= 0 && labelSeconds.textContent > 0) {
        if (labelSeconds.textContent > 0) {
            labelSeconds.innerHTML = labelSeconds.textContent - 1;
        } else {
            setLabelMinutesAndLabelSeconds();
        }
    } else {
        if (count < 3) {
            count++;
        } else {
            alert('ora do intervalo');
            count = 0;
        }
        setCount(count);
        button.style.display = 'block';
        clearInterval(interval);
    }
}