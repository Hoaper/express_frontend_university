
export function formatDate(inputDate: Date): string {
    console.log(inputDate)
    const formatter = new Intl.DateTimeFormat('ru-RU', {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });

    return formatter.format(inputDate);
}