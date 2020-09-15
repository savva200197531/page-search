const searchBtn = document.querySelector('.search__button');
const searchWord = document.querySelector('.search__input');
let searchCounter = document.querySelector('.search__counter');
let counter = 0;
const allContent = document.querySelector('.table');

searchBtn.addEventListener('click', () => {
  const word = searchWord.value;
  if (word.length !== 0) {
    counter = 0;
    highlight(allContent, [ word ]);
  } else {
    console.log('Поле должно быть заполнено')
    searchCounter.innerHTML = 'Поле должно быть заполнено!';
  }
})

const highlight = (elem, keywords, caseSensitive = true, cls = 'highlight') => {
  const flags = caseSensitive ? 'gi' : 'g';
  keywords.sort((a, b) => b.length - a.length);
  Array.from(elem.childNodes).forEach(child => {
    const keywordRegex = RegExp(keywords.join('|'), flags);
    if (child.nodeType !== 3) {
      if (counter <= 0) searchCounter.innerHTML = 'Ничего не найдено.'
      highlight(child, keywords, caseSensitive, cls);
    } else if (keywordRegex.test(child.textContent)) {
      const frag = document.createDocumentFragment();
      let lastIdx = 0;
      child.textContent.replace(keywordRegex, (match, idx) => {
        const part = document.createTextNode(child.textContent.slice(lastIdx, idx));
        const highlighted = document.createElement('span');
        counter++
        highlighted.textContent = match;
        highlighted.classList.add(cls);
        frag.appendChild(part);
        frag.appendChild(highlighted);
        lastIdx = idx + match.length;
        if (counter <= 0) {
          searchCounter.innerHTML = 'Ничего не найдено.'
        } else {
          searchCounter.innerHTML = `Количество совпадений: ${ counter }.`
        }
      });
      const end = document.createTextNode(child.textContent.slice(lastIdx));
      frag.appendChild(end);
      child.parentNode.replaceChild(frag, child);
    }
  });
}

