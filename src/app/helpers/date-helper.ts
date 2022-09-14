
export function convertDate(date:Date): string {
  var month=date.getMonth();
  var day=date.getDate();
  var year= date.getFullYear();
  let dt=`${year}-${month}-${day}`;  // not correct
  return dt;
  }