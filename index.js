// function f() {
let eventList = [
    {start: 0, duration: 15, title: 'event1'},
    {start: 0, duration: 17, title: 'event2'},
    {start: 60, duration: 12, title: 'event3'},
    // {start: 65, duration: 12, title: 'eventTERTY'},
    {start: 90, duration: 25, title: 'event4'},
    {start: 91, duration: 30, title: 'Krakozybra'},
    {start: 120, duration: 15, title: 'event5'}
].sort((a, b) => a.start > b.start ? 1 : -1);
const minTime = 8;
let maxTime = minTime + eventList[eventList.length - 1].start / 60; // fix to 24h system

let grid = document.getElementsByTagName('div');
let timeLine = document.getElementsByClassName('time-line')

function renderTimeLine() {
    for (let step = minTime; step <= maxTime; step += 0.5) {
        let subStep = step - .2; // upd
        grid[0].innerHTML += `
        <div class="time-line">
            <span class="time">${Number.isInteger(step) ? step : subStep}</span> 
        </div>
    `
    }
}

function resolveConflictsInEvents() {
    let prevEvent = null;
    let arr = [];
    eventList.forEach((item, index) => {
        if (prevEvent) {
            if (item.start - prevEvent.start < 30) {
                if (Math.floor(item.start / 60) === Math.floor(prevEvent.start / 60)) {
                    arr.push([prevEvent, item]);
                } else {
                    arr.push([item]);
                }
            } else {
                arr.push([item]);
            }

        }
        prevEvent = item;

        return item;
    });
    eventList = arr;
}

// function resolveConflictsInEvents() {
//     let prevEvent = null;
//     eventList.forEach((item, index) => {
//         if (prevEvent) {
//             // console.log(item.start + item.duration, prevEvent.start + prevEvent.duration)
//             if (Math.floor(item.start / 60) === Math.floor(prevEvent.start / 60)) {
//                 console.log('------>>>>>>', item);
//                 prevEvent.isConflict ? item.isConflict = false : item.isConflict = true;
//             }
//         }
//         prevEvent = item;
//         return item;
//     });
//     // console.log('=====>>>', newArray);
//     console.log(eventList)
// }

// если есть конфликты в ивентах то нужно уменьшить ширину ивента на количество конфликтов + 1

function renderEvent() {
    console.log('======>>>>>', eventList)
    eventList.forEach((item) => {
        const defaultHeight = 2; // 2px
        item.forEach((el, index) => {
            console.log(index);
            grid[0].innerHTML += `
        <div class="event" 
        style="
            width: ${200 / item.length}px;
            height: ${el.duration * defaultHeight}px;
            left: ${!index ? 30 : 200 / item.length + 50}px;
            top: ${el.start * 2}px">
            <h3>${el.title}</h3>
        </div>
    `
        })
    })
}

function create() {
    timeLine[0].addEventListener('click', function () {

    })
}

function start() {
    resolveConflictsInEvents()
    renderTimeLine();
    renderEvent();
}

start();
