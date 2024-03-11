export default function dateFormater(date: string) {
    let cleanedDate = date.replace("Z", ""); // remove the Z at the end
    let dateTimeParts = cleanedDate.split('T'); // split the date and time part

    let timeParts = dateTimeParts[1].split(':'); // split the time part into hours, minutes, and seconds
    let time = `${timeParts[0]}:${timeParts[1]}`; // rebuild the time string with only hours and minutes

    // Create a new Date object with the date and time
    let dateObject = new Date(`${dateTimeParts[0]}T${time}`);

    // Add one hour to the date
    dateObject.setHours(dateObject.getHours() + 1);

    // Format the time string with the new hour
    let hours = dateObject.getHours().toString().padStart(2, '0');
    let minutes = dateObject.getMinutes().toString().padStart(2, '0');
    let newTime = `${hours}:${minutes}`;

    let result = {
        date: dateTimeParts[0], // assign the date part
        time: newTime  // assign the time part with the new hour
    }

    return result;
}