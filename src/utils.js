export function formatDateToDDWW(inputDateString) {
    const inputDate = new Date(inputDateString);

    // Define an array of day names
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Extract day of the week and day from the Date object
    const dayOfWeek = dayNames[inputDate.getDay()];
    const day = inputDate.getDate().toString().padStart(2, "0");

    // Create the formatted date string in "DD, Day of Week" format
    return `${day}, ${dayOfWeek}`;
}

export const dateStringToNumber = (dateString) => {
    const day = dateString.split(', ')[0];
    return parseInt(day, 10);;
};
