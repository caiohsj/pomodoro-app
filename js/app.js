var count = localStorage.getItem('count');
var timerPomodoro = document.getElementById('timer-pomodoro').value;
var timerInterval = document.getElementById('timer-interval').value;
var labelMinutes = document.querySelector('.timer .minutes');
var labelSeconds = document.querySelector('.timer .seconds');
var button = document.querySelector('.btn-play'); 

if (count == null) {
    count = 0;
    setCount(count);
}

button.addEventListener('click', function(event) {
    event.preventDefault();
    if (count < 4) {
        count++;
    } else {
        count = 0;
    }
    setCount(count);
});

function setCount(value) {
    localStorage.setItem('count', value);
}