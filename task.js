class AlarmClock {
    constructor() {
    this.alarmCollection = [];
    this.timerId = null;
}


addClock(time, callback, id) {
  if(!id) {
    throw new Error('параметр не передан');
} else if(this.alarmCollection.find(clock => clock.id === id)) {
    return console.error('звонок уже существует');
} else {
    return this.alarmCollection.push({id, time, callback});
}
}


removeClock(id) {
    for(let element of this.alarmCollection) {
        if(element.id === id) {
             this.alarmCollection.splice(element, 1)[0];
        }
    }
}


getCurrentFormattedTime() {
    return new Date().toTimeString().slice(0, 5);
}


start() {
let checkClock = (element) => {
    let clock = this.getCurrentFormattedTime();
    if(element.time === clock) {
      return element.callback();
    }
}
    if (this.timerId === null) {
        this.timerId = setInterval(() => {
            this.alarmCollection.forEach(element => checkClock(element));
        }, 2000);
    }
    return;   
}


stop() {
    if(this.timerId !== null) {
        clearInterval(this.timerId);
        this.timerId = null;
    }
}


printAlarms() {
    this.alarmCollection.forEach(element => console.log(`Будильник номер ${element.id} заведен на ${element.time}`));
}


clearAlarms() {
    this.stop();
    this.alarmCollection = [];
}
}


function testCase() {
    const phoneAlarm = new AlarmClock();
    phoneAlarm.addClock('07:00', () => console.log('Доброе утро'), 1);
    phoneAlarm.addClock('07:01', () => {console.log('Подьем'); phoneAlarm.removeClock(2)},2);
    phoneAlarm.addClock('07:02', () => console.log('Вставай'), 3);
    phoneAlarm.printAlarms();
    phoneAlarm.removeClock(3);
    phoneAlarm.removeClock(1);
    phoneAlarm.removeClock(2);
    phoneAlarm.printAlarms();
}
testCase();
