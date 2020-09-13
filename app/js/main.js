const searchBtn = document.querySelector('.search__button');
const searchWord = document.querySelector('.search__input');

const allContent = document.querySelectorAll('.table-item');

const search = (value, text) => {
  const strToFind = new RegExp(text, 'gi')
  value.forEach(item => {
    if (text) {
      item.innerHTML = item.textContent.replace(strToFind, str => `<span class='text-red'>${str}</span>`)
    } else {
      item.innerHTML = item.textContent.replace(strToFind, str => str)
    }
    // function highlight(text) {
    //   document.body.innerHTML = document.body.innerHTML.replace(
    //     new RegExp(text + '(?!([^<]+)?<)', 'gi'),
    //     '<b style="background-color:#ff0;font-size:100%">$&</b>'
    //   );
    // }
  })
}

// const insertMark = (string, pos, length) => string.slice(0, pos) + '<mark>' + string.slice(pos, pos + length) + '</mark>' + string.slice(pos + length)


searchWord.addEventListener('keyup', () => {
  console.log(searchWord.value)
  search(allContent, searchWord.value)
})

