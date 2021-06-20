import Vue from 'vue'

const dateFilter = value => {
  return formatDate(value);
};

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}年${month}月${day}日`;
  return formattedDate;
}

Vue.filter('date', dateFilter)


// 
// 英語表記
// 
// import Vue from 'vue'

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December"
// ];

// const dateFilter = value => {
//   return formatDate(value);
// };

// function formatDate(inputDate) {
//   const date = new Date(inputDate);
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const day = date.getDate();
//   const formattedDate = day + ". " + months[month] + " " + year;
//   return formattedDate;
// }

// Vue.filter('date', dateFilter)
