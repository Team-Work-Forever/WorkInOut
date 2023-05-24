export function convertToMinutesSeconds(floatValue: number) {
    const minutes = Math.floor(floatValue);
    const seconds = Math.round((floatValue - minutes) * 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function convertToHoursMinutes(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}h${minutes}m`;
}
