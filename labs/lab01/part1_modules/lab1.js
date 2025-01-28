var holidays = [
    { 'name': 'Christmas', 'date': new Date('December 25, 2025') },
    { 'name': 'Halloween', 'date': new Date('October 31, 2025') },
    { 'name': 'New Years', 'date': new Date('January 1, 2026') },
    { 'name': 'Canada Day', 'date': new Date('July 1, 2025') }
];

var lodash = require('lodash');

const today = new Date();
holidays.forEach(_ => console.log("Days between "+_.name+" and today: "+((_.date.getTime() - today.getTime())/(1000*3600*24))+" days."))

console.log(lodash.sample(holidays))
console.log(lodash.findIndex(holidays, function(_) { return _.name == 'Christmas'}))
console.log(lodash.findIndex(holidays, function(_) { return _.name == 'Canada Day'}))