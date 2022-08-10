export const timeFormat = (date) => {
  return (
    date.getFullYear() +
    '-' +
    zeroFormat(date.getMonth()) +
    '-' +
    zeroFormat(date.getDay()) +
    ' ' +
    zeroFormat(date.getHours()) +
    ':' +
    zeroFormat(date.getMinutes()) +
    ':' +
    zeroFormat(date.getSeconds())
  );
};

const zeroFormat = (get) => {
  if (get < 9) {
    return '0' + get;
  } else {
    return get;
  }
};
