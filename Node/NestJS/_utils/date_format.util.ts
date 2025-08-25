export const buildClassicDateFormat = (date: Date): string => {
  return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
};

export const buildDateHourDateFormat = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${date.getFullYear()}/${month.toString().length === 1 ? `0` : ''}${month}/${day.toString().length === 1 ? '0' : ''}${day} ${hour.toString().length === 1 ? '0' : ''}${hour}:${minute.toString().length === 1 ? '0' : ''}${minute}`;
};

export const buildISODate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const sec = date.getSeconds();
  return `${date.getFullYear()}-${month.toString().length === 1 ? `0` : ''}${month}-${day.toString().length === 1 ? '0' : ''}${day}T${hour.toString().length === 1 ? '0' : ''}${hour}:${minute.toString().length === 1 ? '0' : ''}${minute}:${sec.toString().length === 1 ? '0' : ''}${sec}.000`;
};

export const buildTZDate = (date: Date | string): string => {
  if (typeof date !== 'string') date = date.toDateString();
  return new Date(date).toLocaleString('en-GB', { timeZone: 'America/Bogota' });
};

export const buildTZDateWithOutHours = (date: Date | string): string => {
  return buildTZDate(date).split(',')[0];
};

export const getNowUTCString = () => new Date().toUTCString();

export const buildDateByUTCString = (utcString: string) => new Date(utcString);

export const getLastDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};
