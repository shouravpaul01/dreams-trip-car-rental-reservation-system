const matchedBookingandCurrentDate = (startDate: Date, startTime: string) => {
  const datePart = new Date(startDate).toISOString().split("T")[0]; // Extract date part
  const combinedDateTimeString = `${datePart}T${startTime}:00.000Z`;
  const bookingDate = new Date(combinedDateTimeString);

  bookingDate.setHours(bookingDate.getHours()-6)

  // Get the current date and time
  const currentDate = new Date();
 
  // Check if the current time is over the booking time
  if (currentDate > bookingDate) {
    
    return false;
  } else {
  
    return true;
  }
};

export default matchedBookingandCurrentDate;
