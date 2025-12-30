const strips = [...document.querySelectorAll(".strip")];
const numberSize = "4"; 

var lastTime = new Array(-1, -1, -1);

// --- THEME LOGIC ---
function updateTheme(hours) {
    const body = document.body;
    body.classList.remove("morning", "day", "sunset", "night");

    if (hours >= 6 && hours < 10) {
        body.classList.add("morning");
    } else if (hours >= 10 && hours < 16) {
        body.classList.add("day");
    } else if (hours >= 16 && hours < 19) {
        body.classList.add("sunset");
    } else {
        body.classList.add("night");
    }
}

function highlight(strip, d) {
    // 1. Select all numbers in this specific strip
    const numbersInStrip = strips[strip].querySelectorAll('.number');
    
    // 2. Remove the 'pop' class from ALL of them first
    numbersInStrip.forEach(num => num.classList.remove('pop'));

    // 3. Add the 'pop' class ONLY to the current number
    // We use d + 1 because nth-of-type is 1-indexed (1, 2, 3...) not 0-indexed
    const targetNumber = strips[strip].querySelector(`.number:nth-of-type(${d + 1})`);
    if (targetNumber) {
        targetNumber.classList.add("pop");
    }
}

function stripSlider(strip, id, number) {
    let d1 = Math.floor(number / 10);
    let d2 = number % 10;

    // We check if the time has changed to avoid unnecessary re-calculations
    if (lastTime[id] === -1 || lastTime[id] !== number) {
        strips[strip].style.transform = `translateY(${d1 * -numberSize}rem)`;
        strips[strip + 1].style.transform = `translateY(${d2 * -numberSize}rem)`;

        highlight(strip, d1);
        highlight(strip + 1, d2);
        lastTime[id] = number;
    }
}

function updateClock() {
    const time = new Date();
    const hours = time.getHours();
    const mins = time.getMinutes();
    const secs = time.getSeconds();

    updateTheme(hours);

    stripSlider(0, 0, hours);
    stripSlider(2, 1, mins);
    stripSlider(4, 2, secs);
}

// Run immediately, then every second
updateClock();
setInterval(updateClock, 1000);