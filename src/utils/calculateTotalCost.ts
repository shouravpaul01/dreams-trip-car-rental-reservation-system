export const calculateTotalCost = (
  startDateTime: Date,
  startTime: string,
  hourlyRate: number
) => {
  // Convert startDateTime to a Date object and replace the time with startTime
  const start: any = new Date(startDateTime);
  const [hours, minutes] = startTime.split(":").map(Number);
  console.log(startTime, hours);
  start.setHours(hours, minutes, 0, 0); // Update the time part of startDate
  console.log(start);
  // Get the current date and time
  const current: any = new Date();

  // Check if the current date and time is the same or later than the booking time
  const isBookingTimeReached = current >= start;

  if (isBookingTimeReached) {
    // Calculate the difference in time if booking time is reached
    const diffInMs = current - start; // Difference in milliseconds
    const totalHours = diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours
    const totalTime = `${Math.floor(totalHours)}:${Math.floor(
      (totalHours - Math.floor(totalHours)) * 60
    )}`;
    // Calculate total cost, rounding up to the nearest hour
    const totalCost = Math.ceil(totalHours) * hourlyRate;

    return { totalCost, totalTime };
  } else {
    // If the current time is before the booking time, return zero cost and zero hours
    return { totalCost: 0, totalTime: 0 };
  }
};
