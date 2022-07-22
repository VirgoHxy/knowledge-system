const {
  getRegularTime,
  getDate2XLSX,
  format,
  convertJson,
  convertToStamp,
  convertStamp,
  sortDate,
  getCalcDate,
  getDateDiff,
  isLeapYear,
  getDays,
  getDesignDate,
  getDateStr,
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

function getRegularTimeTest() {
  console.log(getRegularTime('2022-02-08T06:51:31.000Z').toLocaleString());
  console.log(getRegularTime('2020-12-12 11:22:33').toLocaleString());
  console.log(getRegularTime(1278930470649).toLocaleString());
  console.log(getRegularTime(new Date()).toLocaleString());
}
function getDate2XLSXTest() {
  console.log(getDate2XLSX(44352.2919791667));
  console.log(getDate2XLSX(44352.2919791667).toLocaleString());
}
function formatTest() {
  console.log(format(new Date(), 'YYYY-MM-DD hh:mm:ss.MS W'));
  console.log(format('2012/12/25 20:17:11.111', 'YYYY-MM-DD hh:mm:ss.MS W'));
}
function convertJsonTest() {
  console.log(convertJson(/Date(1278930470649)/));
}
function convertToStampTest() {
  console.log(convertToStamp(new Date()));
}
function convertStampTest() {
  console.log(convertStamp(Date.now()));
}
function sortDateTest() {
  console.log(sortDate([/Date(1594361486000)/, /Date(1594363486000)/, /Date(1594362486000)/]));
  console.log(sortDate([1594361486000, 1594363486000, 1594362486000]));
  console.log(sortDate(['3999-01-01 00:00:00', '3020-08-04 14:56:46', '3970-01-19 19:28:43']));
}
function getCalcDateTest() {
  console.log(
    getCalcDate(new Date(), {
      type: 'ms',
      value: 10000,
    })
  );
  console.log(
    getCalcDate(new Date(), [
      {
        type: 'ms',
        value: 10000,
      },
      {
        type: 'h',
        value: 24,
      },
    ])
  );
}
function getDateDiffTest() {
  console.log(getDateDiff(['2020-06-02 14:24:23.000Z', '2020-08-08 15:23:24.000Z']));
  console.log(getDateDiff(['2020-06-02 14:24:23', '2020-06-04 15:25:24']));
  console.log(getDateDiff(['2020-06-02 14:24:23', '2020-06-04 15:25:24'], 'date'));
  console.log(getDateDiff(['2020-06-02 14:24:23', '2020-06-04 15:25:24'], 'hour'));
  console.log(getDateDiff(['2020-06-02 14:24:23', '2020-06-04 15:25:24'], 'minute'));
  console.log(getDateDiff(['2020-06-02 14:24:23', '2020-06-04 15:25:24'], 'minute'));
}
function isLeapYearTest() {
  console.log(isLeapYear(2000));
}
function getDaysTest() {
  console.log(getDays('2020-4'));
}
function getDesignDateTest() {
  console.log(getDesignDate(1, 'd', false));
  console.log(getDesignDate(-1, 'mm', false));
}
function getDateStrTest() {
  console.log(getDateStr(0, 'm'));
  console.log(getDateStr(124, 'm'));
  console.log(getDateStr(124));
  console.log(getDateStr(12224, 'm'));
}

getRegularTimeTest();
getDate2XLSXTest();
formatTest();
convertJsonTest();
convertToStampTest();
convertStampTest();
sortDateTest();
getCalcDateTest();
getDateDiffTest();
isLeapYearTest();
getDaysTest();
getDesignDateTest();
getDateStrTest();
