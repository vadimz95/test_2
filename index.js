let eventList = [
    {start: 0, duration: 15, title: 'event1'},
    {start: 0, duration: 17, title: 'event2'},
    {start: 60, duration: 12, title: 'event3'},
    {start: 90, duration: 25, title: 'event4'},
    {start: 91, duration: 30, title: 'Krakozybra'},
    {start: 120, duration: 15, title: 'event5'}
].sort((a, b) => a.start > b.start ? 1 : -1)
eventList.forEach((item, index) => {
    item.id = index
})
const staticEventList = eventList;
const minTime = 8;
let maxTime = minTime + eventList[eventList.length - 1].start / 60; // fix to 24h system

let grid = document.getElementsByTagName('div');

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
    eventList.forEach((item, index) => {
        const defaultHeight = 2; // 2px
        item.forEach((el, index) => {
            grid[0].innerHTML += `
        <div class="event" id="${el.id}" 
        style="
            width: ${200 / item.length}px;
            height: ${el.duration * defaultHeight}px;
            left: ${!index ? 30 : 200 / item.length + 50}px;
            top: ${el.start * 2}px" onClick="onEdit(event)">
            <span class="delete-item" onClick="removeItem(event)">X</span>
            <h3 class="title">${el.title}</h3>
        </div>
    `
        })
    })
}


function createCalendar() {
    resolveConflictsInEvents()
    renderTimeLine();
    renderEvent();
}

grid[0].addEventListener('click', function (event) {
    const popup = document.getElementsByClassName('popup')[0];
    if (!event.target.classList.contains('event') && !event.target.classList.contains('title') && !event.target.classList.contains('delete-item')) {
        popup.classList.remove('hide');
        popup.classList.add('show');
        popup.innerHTML =
            `
            <div class="create">
                <input type="text" id="title" placeholder="Title" value="">
                <input type="text" id="start" placeholder="Start time" value="">
                <input type="text" id="duration" placeholder="Duration" value="">
                <button onClick="onCreate()">Save</button>
            </div>
        `
    }
});



function onCreate() {
    const popup = document.getElementsByClassName('popup')[0];
    let title = document.getElementById('title').value;
    let start = document.getElementById('start').value;
    let duration = document.getElementById('duration').value;
    eventList.push({start: start, duration: duration, title: title});
    popup.classList.add('hide');
    popup.classList.remove('show');
    createCalendar();
}

function removeItem(event) {
    if(event.target.classList.contains('delete-item')) {
        grid[0].removeChild(event.target.parentNode);
        console.log('grid', grid);
    }
}

function onEdit(event) {
    staticEventList.forEach((item) => {
       if (item.id.toString() === event.target.offsetParent.id) {
           console.log('item', item);
           const popup = document.getElementsByClassName('popup')[0];
           popup.classList.remove('hide');
           popup.classList.add('show');
           popup.innerHTML =
               `
            <div class="create" id="${item.id}">
                <input type="text" id="title" placeholder="Title" value="${item.title}">
                <input type="text" id="start" placeholder="Start time" value="${item.start}">
                <input type="text" id="duration" placeholder="Duration" value="${item.duration}">
                <button onClick="onUpdate(event)">Save</button>
            </div>
        `

       }
    });
}

function onUpdate(event) {
    console.log('======item======', event.target.parentElement.id);
    const popup_2 = document.getElementsByClassName('popup')[0];
    let title = document.getElementById('title').value;
    let start = document.getElementById('start').value;
    let duration = document.getElementById('duration').value;
    console.log(title, start, duration);
    staticEventList.forEach((el, index) => {
        if (el.id.toString() === event.target.parentElement.id) {
            el.title = title;
            el.start = start;
            el.duration = duration;
        }
    })
    popup_2.classList.add('hide');
    popup_2.classList.remove('show');
    resolveConflictsInEvents()
    renderEvent();
}

createCalendar();
