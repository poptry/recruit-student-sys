export  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    // 获取年月日时分秒
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

  
    // 格式化日期时间字符串
    const formattedDateTime = `${year}-${month}-${day}`;
  
    return formattedDateTime;
  }