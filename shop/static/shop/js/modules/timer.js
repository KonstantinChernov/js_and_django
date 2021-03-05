//Timer

function getZero(num) {
    return (num < 10 && num >= 0) ? `0${num}`: num;
}

function timer(deadline) {


    function getTimeRemaining(endtime) {
        let time = new Date(endtime) - new Date();
        const days = Math.floor(time / (24 * 60 * 60 * 1000)),
                hours = Math.floor((time / (60 * 60 * 1000)) % 24),
                minutes = Math.floor((time / (60 * 1000)) % 60),
                seconds = Math.floor((time / 1000) % 60);

        return {
            time: time,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
       }
   }

    function updateTimer(timeStamp) {
        const days = document.querySelector("#days"),
                hours = document.querySelector("#hours"),
                minutes = document.querySelector("#minutes"),
                seconds = document.querySelector("#seconds");

        days.innerHTML = getZero(timeStamp.days);
        hours.innerHTML = getZero(timeStamp.hours);
        minutes.innerHTML = getZero(timeStamp.minutes);
        seconds.innerHTML = getZero(timeStamp.seconds);   

       if (timeStamp.time <= 1000) {
           clearTimeout(timerStart);
           
           days.innerHTML = getZero(0);
           hours.innerHTML = getZero(0);
           minutes.innerHTML = getZero(0);
           seconds.innerHTML = getZero(0);
       }
    }

    let timerStart = setTimeout(function start() {
        updateTimer(getTimeRemaining(deadline));
        setTimeout(start, 1000);
    }, 1000);

    updateTimer(getTimeRemaining(deadline));
}

export default timer;
export { getZero };