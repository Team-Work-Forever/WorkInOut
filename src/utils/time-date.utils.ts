export function convertToMinutesSeconds(floatValue: number) {
    const minutes = Math.floor(floatValue);
    const seconds = Math.round((floatValue - minutes) * 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
