// How many staff are there?
// How many students are there?
// How many schedules exist?
// How many schedules have bookings?
// Do all staff have schedules?
// Did all students book a schedule?

fetch('/api/staff_members/').then(res => {
  return res.json();
}).then(json => {
  console.log(json);
});

fetch('/api/students/').then(res => {
  return res.json();
}).then(json => {
  console.log(json);
});

fetch('/api/schedules/').then(res => {
  return res.json();
}).then(json => {
  console.log(json);
});

fetch('/api/bookings/').then(res => {
  return res.json();
}).then(json => {
  console.log(json);
});

// Not sure if possible



// Not sure if possible