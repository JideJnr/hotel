export function getCurrentDate() {
    const today = new Date();
  
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
  
    const formattedDate = `${year}/${month}/${day}`;
  
    return formattedDate;
  }

  export function getYesterdayDate() {
    const yesterday = new Date();
    
    // Subtract 1 day from yesterday's date
    yesterday.setDate(yesterday.getDate() - 1);

    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');

    const formattedDate = `${year}/${month}/${day}`;

    return formattedDate;
}

export function getYearMonth() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed

  const formattedDate = `${year}-${month}`;

  return formattedDate;
}