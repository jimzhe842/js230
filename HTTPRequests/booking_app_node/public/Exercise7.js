function cancelSchedule(scheduleId) {
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', `/api/schedules/${scheduleId}`);
  xhr.addEventListener('load', event => {
    if (xhr.status === 204) {
      alert('Schedule deleted.');
    } else {
      alert(`Deleting failed: ${xhr.responseText}`);
    }
  });
  xhr.send();
}

function cancelBooking(bookingId) {
  let xhr = new XMLHttpRequest();
  xhr.open('PUT', `/api/bookings/${bookingId}`);
  xhr.addEventListener('load', event => {
    if (xhr.status === 204) {
      alert('Booking cancelled');
    } else {
      alert(`Canceling failed: ${xhr.responseText}`);
    }
  });
  xhr.send();
}