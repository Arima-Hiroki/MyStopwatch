'use strict';
{
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const reset = document.getElementById('reset');

    let startTime;
    let timeoutId;
    let elapsedTime = 0;


    function setButtonStateInitial () {
        start.classList.remove('inactive');
        reset.classList.remove('inactive');
    }


    function countUp () {
        const d = new Date(Date.now() - startTime + elapsedTime);
        const h = String(d.getUTCHours()).padStart(2, 0);
        const s = String(d.getSeconds()).padStart(2, 0);
        const m = String(d.getMinutes()).padStart(2, 0);
        const ms = String(d.getMilliseconds()).padStart(3, 0);
        timer.textContent = `${h}:${m}:${s}.${ms}`;

        timeoutId = setTimeout(() =>{
            countUp();
        }, 10);
    }

    setButtonStateInitial();

    start.addEventListener('click', ()=>{
        start.classList.toggle('stop');
        if (start.classList.contains('stop') === true) {
            start.textContent = "Stop";
            startTime = Date.now();
            countUp();
        } else {
            start.textContent = "Start";
            clearTimeout(timeoutId);
            elapsedTime += Date.now() - startTime; //動いている時間を合算
        }
    });
    reset.addEventListener('click', ()=>{
        if (reset.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateInitial();
        timer.textContent = '00:00:00.000';
        elapsedTime = 0;
    });
}