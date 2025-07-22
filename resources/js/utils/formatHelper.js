export const formatNumber = (number) => new Intl.NumberFormat().format(number);

export const getDate = (date) => new Date(date).toLocaleDateString("en-UK");
