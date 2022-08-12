const {
  getRegularDate,
  format,
  getDateOfExcel,
  calcDate,
  isLeapYear,
  getDays,
  getLengthOfTime,
  sortDate,
  sortDateByKey,
} = require('.');

console.log_ = console.log;
console.log = function () {
  let name = arguments.callee.caller.name;
  !console.log.obj && (console.log.obj = {});
  if (!name) {
    name = 'noName';
  }
  !console.log.obj[name] && console.log_(`\r\n————${name}————: `);
  console.log.obj[name] = 1;
  console.log_(...arguments);
};

function getRegularDateTest() {
  console.log(getRegularDate('2022-02-08T06:51:31.000Z').toLocaleString());
  console.log(getRegularDate('2022-02-08T06:51Z').toLocaleString());
  console.log(getRegularDate('2020-12-12 11:22:33').toLocaleString());
  console.log(getRegularDate('1278930470649').toLocaleString());
  console.log(getRegularDate('/Date(1278930470649)/').toLocaleString());
  console.log(getRegularDate(1278930470649).toLocaleString());
  console.log(getRegularDate(new Date()).toLocaleString());
}
function formatTest() {
  console.log(format(new Date(), 'YYYY-MM-DD hh:mm:ss.MS W'));
  console.log(format('2012/12/25 20:17:11.111', 'YYYY-MM-DD hh:mm:ss.MS W'));
}
function formatTest1() {
  console.log(new Date().format('YYYY-MM-DD hh:mm:ss.MS W'));
  console.log(new Date('2012/12/25 20:17:11.111').format('YYYY-MM-DD hh:mm:ss.MS W'));
}
function getDate2XLSXTest() {
  console.log(getDateOfExcel(44352.2919791667).toLocaleString());
}
function calcDateTest() {
  console.log(calcDate(new Date(), '10000ms').toLocaleString());
  console.log(calcDate(new Date(), '24h,10000ms').toLocaleString());
  console.log(calcDate(new Date(), '12h,10m,20s').toLocaleString());
  console.log(calcDate(new Date(), '1M').toLocaleString());
  console.log(calcDate(new Date(), '1y').toLocaleString());
  console.log(calcDate(new Date(), '1d').toLocaleString());
}
function isLeapYearTest() {
  console.log(isLeapYear(2000));
}
function getDaysTest() {
  console.log(getDays('2020-4'));
}
function getLengthOfTimeTest() {
  console.log(getLengthOfTime('0m'));
  console.log(getLengthOfTime('29.25h'));
  console.log(getLengthOfTime('124m'));
  console.log(getLengthOfTime('12000s'));
  console.log(getLengthOfTime('12224m'));
}
function sortDateTest() {
  console.log(sortDate(['3999-01-01 00:00:00', '3020-08-04 14:56:46', '3970-01-19 19:28:43']));
  console.log(sortDate([1594361486000, 1594363486000, 1594362486000]));
  console.log(sortDate(['/Date(1594361486000)/', '/Date(1594363486000)/', '/Date(1594362486000)/']));
}
function sortDateByKeyTest() {
  console.log(
    sortDateByKey(
      [
        { id: 1, time: '3999-01-01 00:00:00' },
        { id: 2, time: '3020-08-04 14:56:46' },
        { id: 3, time: '3970-01-19 19:28:43' },
      ],
      'time'
    )
  );
}

getRegularDateTest();
formatTest();
formatTest1();
getDate2XLSXTest();
sortDateTest();
sortDateByKeyTest();
calcDateTest();
isLeapYearTest();
getDaysTest();
getLengthOfTimeTest();
