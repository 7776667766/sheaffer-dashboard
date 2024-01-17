export const getMyBusinessBooking = "get-my-business-booking";
// Delete BookingApi
export const deleteBookingApi =(id)=>`booking/delete/${id}`
// Cancel Booking
export const cancelBookingApi =(id)=>`booking/cancel/${id}`
// Complete Booking Api
export const complateBookingApi =(id)=>`/booking/completed/${id}`
// Resheduled Booking Api
export const reseheduledBookingApi =(id)=>`/booking/rescheduled/${id}`
// Booked Time Slots
export const getbookedslotsApi = "get-booking-Slots";