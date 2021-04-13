'use strict';
{
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const reset = document.getElementById('reset');
    const tbody = document.getElementById("rap");


    let startTime;
    let timeoutId;
    let elapsedTime = 0;
    let isRunning = false;

    let rapId = 1;
    let isRapFirst = true;
    let rapStartTime;
    let rapTimeoutId;
    let rapElapsedTime = 0;


    function countUp () {
        const d = Date.now() - startTime + elapsedTime;
        const h = String(Math.floor(d/1000/3600)%24).padStart(2, 0);
        const m = String(Math.floor(d/1000/60)%60).padStart(2, 0);
        const s = String(Math.floor(d/1000)%60).padStart(2, 0);
        const ms = String(Math.floor(d/10)%100).padStart(2, 0);
        timer.textContent = `${h}:${m}:${s}.${ms}`;

        timeoutId = setTimeout(() =>{
            countUp();
        }, 10);
    }

    function rapCountUp () {
        const rapNow = document.getElementById('rap-now');
        const d = Date.now() - rapStartTime + rapElapsedTime;
        const h = String(Math.floor(d/1000/3600)%24).padStart(2, 0);
        const m = String(Math.floor(d/1000/60)%60).padStart(2, 0);
        const s = String(Math.floor(d/1000)%60).padStart(2, 0);
        const ms = String(Math.floor(d/10)%100).padStart(2, 0);
        rapNow.textContent = `${h}:${m}:${s}.${ms}`;

        rapTimeoutId = setTimeout(() =>{
            rapCountUp();
        }, 10);
    }

    function addRap () {
        let elm = document.querySelector('#rap-now');
        if (elm) elm.removeAttribute('id');
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');

        td1.textContent = `ラップ${rapId}`;
        td2.id = 'rap-now';

        tbody.insertBefore(tr, tbody.firstChild);
        tr.appendChild(td1);
        tr.appendChild(td2);
        rapStartTime = Date.now();
        rapCountUp();
    }
    
    start.addEventListener('click', ()=>{
        isRunning = !isRunning;
        if (isRunning) {
            start.classList.add('stop');
            start.textContent = "停止";
            reset.classList.add('rap');
            reset.textContent = "ラップ";
            startTime = Date.now();
            countUp();

            rapStartTime = Date.now();
            if (isRapFirst) {
                addRap();
                isRapFirst = false;
            }
            else rapCountUp();
        } else {
            start.classList.remove('stop');
            start.textContent = "開始";
            reset.classList.remove('rap');
            reset.textContent = "リセット";
            
            clearTimeout(timeoutId);
            elapsedTime += Date.now() - startTime; //動いている時間を合算
            
            clearTimeout(rapTimeoutId);
            rapElapsedTime += Date.now() - rapStartTime; //動いている時間を合算
        }
    });
    reset.addEventListener('click', ()=>{
        if (reset.classList.contains('inactive') === true) {
            return;
        }
        if (isRunning) {
            rapId++;
            clearTimeout(rapTimeoutId);
            addRap();
        } else {
            // setButtonStateInitial();
            const trs = tbody.querySelectorAll('tr');
            trs.forEach(tr => {
                tr.remove();
            });
            timer.textContent = '00:00:00.00';
            rapElapsedTime = 0;
            rapId = 1;
            isRunning = false;
            isRapFirst = true;
        }
    });
}