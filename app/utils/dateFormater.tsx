export function dateFormater(date: string) {
  let cleanedDate = date.replace("Z", ""); // remove the Z at the end
  let dateTimeParts = cleanedDate.split("T"); // split the date and time part

  let timeParts = dateTimeParts[1].split(":"); // split the time part into hours, minutes, and seconds
  let time = `${timeParts[0]}:${timeParts[1]}`; // rebuild the time string with only hours and minutes

  // Create a new Date object with the date and time
  let dateObject = new Date(`${dateTimeParts[0]}T${time}`);

  // Add one hour to the date
  dateObject.setHours(dateObject.getHours() + 1);

  // Format the time string with the new hour
  let hours = dateObject.getHours().toString().padStart(2, "0");
  let minutes = dateObject.getMinutes().toString().padStart(2, "0");
  let newTime = `${Number(hours) + 1}:${minutes}`;

  let result = {
    date: dateTimeParts[0], // assign the date part
    time: newTime, // assign the time part with the new hour
  };

  return result;
}

export function convertTime(days: number) {
  const years = Math.floor(days / 365);
  let remainingDays = days % 365;
  const months = Math.floor(remainingDays / 30);
  remainingDays %= 30;
  const weeks = Math.floor(remainingDays / 7);
  remainingDays %= 7;

  let result = "";

  if (years > 0) {
    result = `${years} année${years > 1 ? "s" : ""}`;
    console.log("result ConvertTime", result);
    return result;
  }

  if (months > 0) {
    result = `${months} mois`;
    console.log("result ConvertTime", result);
    return result;
  }

  if (weeks > 0) {
    result = `${weeks} semaine${weeks > 1 ? "s" : ""}`;
    console.log("result ConvertTime", result);
    return result;
  }

  if (remainingDays > 0) {
    result = `${remainingDays} jour${remainingDays > 1 ? "s" : ""}`;
    console.log("result ConvertTime", result);
    return result;
  }

  console.log("result ConvertTime", result);
  return result;
}

export function getNumbersOnly(result: string) {
  console.log("Only numbers", result.replace(/\D/g, ""));
  return result.replace(/\D/g, "");
}

export function getNonNumbers(result: string) {
  console.log("Non numbers", result.replace(/\d/g, ""));
  return result.replace(/\d/g, "");
}
