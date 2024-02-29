export default function dateFormater(date: string) {
    let cleanedDate = date.replace("Z", ""); // remove the Z at the end
    let dateTimeParts = cleanedDate.split('T'); // split the date and time part

    let timeParts = dateTimeParts[1].split(':'); // split the time part into hours, minutes, and seconds
    let time = `${timeParts[0]}:${timeParts[1]}`; // rebuild the time string with only hours and minutes

    let result = {
        date: dateTimeParts[0], // assign the date part
        time: time  // assign the time part
    }

    return result;
}