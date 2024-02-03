export  function highlight(title,key) {
    console.log(title,key);
    const reg = new RegExp(key,'ig')
    return title.replace(reg , (val) =>{
        return `<span style="color:red">${val}</span>`
    })
  }