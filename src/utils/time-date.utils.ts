export function convertToMinutesSeconds(floatValue: number) {
    const minutes = Math.floor(floatValue);
    const seconds = Math.round((floatValue - minutes) * 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function convertToHoursMinutes(timeString) {
    const [_, minutes, hours] = timeString.split(':');

    const hoursText = parseInt(hours) > 0 ? `${parseInt(hours)}h` : '';
    const minutesText = parseInt(minutes) > 0 ? `${parseInt(minutes)}min` : '';

    return `${hoursText}${minutesText}`;
}
