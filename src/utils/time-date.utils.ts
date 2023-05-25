export function convertToMinutesSeconds(floatValue: number) {
    const minutes = Math.floor(floatValue);
    const seconds = Math.round((floatValue - minutes) * 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function convertToHoursMinutes(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${hours}h${minutes}m`;
}

export function convertToYearMonthDay(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    return `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}T00:00:00`;
}

export function getMinDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}T00:00:00`;
    return minDate;
}
