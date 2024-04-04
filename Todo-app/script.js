const ul = document.querySelector('ul')
const title = document.querySelector('.test_area-title')
const description = document.querySelector('.test_area-description')
const button = document.querySelector('.button')
let deleteBtns 


button.addEventListener("click", () => {
    const li = document.createElement('li')
    const addTitle = title.value
    const addDescription = description.value

    if (addTitle.length < 4) {
        return alert('Title should be atleast four (4) characters!')
    }
    if (addDescription.length < 10){
        return alert('Description should have atleast ten (10) characters')
    }

    li.innerHTML = `<div>
    <p class="title">${addTitle} </p>
    <p class="description">${addDescription} </p>
  </div>
  <button type="button">X</button>`

  console.log(li.textContent)
  ul.appendChild(li)
  deleteBtns = document.querySelectorAll("li button")
})

console.error(deleteBtns)
deleteBtns.forEach(button => {
    button.addEventListener("click", () => {
        const liItem = this.parent
        console.error(liItem)
    })
})
