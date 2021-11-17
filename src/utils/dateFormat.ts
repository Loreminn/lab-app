export const formatDate = (stringDate: Date): string => {
    const date = new Date(stringDate);
    return date.toLocaleString('ru', {year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'});
}
