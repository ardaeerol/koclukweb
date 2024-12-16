import React, { useEffect, useState, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const { auth } = useContext(AuthContext); // Retrieve user data from AuthContext
  const fetchBookings = async () => {
    try {
      if (!auth.userId) {
        console.error('User ID is not defined in auth context');
        return;
      }

      const response = await api.get(`/bookings/get-by-coach-user-id/${auth.userId}`); // Use userId instead of id
      setBookings(response.data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  useEffect(() => { 
    fetchBookings();
  }, [auth.userId]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      await api.post(`/bookings/updateStatus`, {"id":bookingId,"status" : status.toUpperCase() });
      setBookings(
        bookings?.map((booking) =>
          booking.bookingId === bookingId ? { ...booking, status } : booking
        )
      );
      fetchBookings();
    } catch (err) {
      console.error('Failed to update booking status:', err);
    }
  };
console.log("bookings: ",bookings)
return (
  <div className="booking-management">
    <h2>Booking Management</h2>
    <table>
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Student</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(bookings) && bookings.map(booking => {return(
          <tr key={booking.id}>
            <td>{booking.id}</td>
            <td>{booking.student.user.fullName}</td>
            <td>{new Date(booking.bookingDate).toLocaleString()}</td>
            <td>
              <span
                className={`status ${
                  booking.status.toLowerCase()
                }`}
              >
                {booking.status}
              </span>
            </td>
            <td>
              {booking.status === 'PENDING' && (
                <>
                  <button onClick={() => handleStatusChange(booking.id, 'confirmed')}>Confirm</button>
                  <button onClick={() => handleStatusChange(booking.id, 'cancelled')}>Cancel</button>
                </>
              )}
            </td>
          </tr>
        );})}
      </tbody>
    </table>
  </div>
);
};

export default BookingManagement;
