// fetch('/api/schedules')
//   .then(res => res.json())
//   .then(data => {
//     return data.filter(data => data.student_email !== undefined);
//   });
function retrieveSchedules() {
  let xhr = new XMLHttpRequest();
  xhr.timeout = 5000;
  xhr.responseType = 'json';
  xhr.open('GET', '/api/schedules');
  xhr.addEventListener('load', event => {
    let schedules = xhr.response;
    let staffs = [];
    let tally = [];

    if (schedules.length > 0) {
      schedules.forEach(schedule => {
        let staff_id = schedule.staff_id;
        const key = `staff ${staff_id}`; 
        if (!staffs.includes(key)) {
          staffs.push(key);
          tally.push(1);
        } else {
          tally[staffs.indexOf(key)] += 1;
        }
      });
      alert(tally.map((key, index) => `${staffs[index]}: ${tally[index]}`).join("\n"));
    } else {
      alert('No available schedules');
    }
    console.log(availableSchedules);
  });
  xhr.addEventListener("timeout", event => {
    alert('It is taking longer than usual, please try again later.');
  });
  xhr.addEventListener("loadend", event => {
    alert('The request has completed.');
  });
  xhr.send();
}
retrieveSchedules();