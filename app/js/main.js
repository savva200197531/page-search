// const search = (value, text) => {
//   const strToFind = new RegExp(text, 'gi')
//   value.forEach(item => {
//     if (text) {
//       item.innerHTML = item.textContent.replace(strToFind, str => `<span class='text-red'>${str}</span>`)
//     } else {
//       item.innerHTML = item.textContent.replace(strToFind, str => str)
//     }
//     // function highlight(text) {
//     //   document.body.innerHTML = document.body.innerHTML.replace(
//     //     new RegExp(text + '(?!([^<]+)?<)', 'gi'),
//     //     '<b style="background-color:#ff0;font-size:100%">$&</b>'
//     //   );
//     // }
//   })
// }
//
// // const insertMark = (string, pos, length) => string.slice(0, pos) + '<mark>' + string.slice(pos, pos + length) + '</mark>' + string.slice(pos + length)
//
//
// searchWord.addEventListener('keyup', () => {
//   console.log(searchWord.value)
//   search(allContent, searchWord.value)
// })

const searchBtn = document.querySelector('.search__button');
const searchWord = document.querySelector('.search__input');

const allContent = document.querySelector('.table');

searchBtn.addEventListener('click', () => {
  const value = searchWord.value
  if (value) {
    InstantSearch.prototype.highlight(allContent, value);
  } else {
    console.log('1')
  }
})

class InstantSearch {
  constructor(props) {
  }

  highlight(container, highlightText) {
    console.log(container)
    const internalHighlighter = options => {
      const id = {
          container: "container",
          tokens: "tokens",
          all: "all",
          token: "token",
          className: "className",
          sensitiveSearch: "sensitiveSearch"
        },
        tokens = options[id.tokens],
        allClassName = options[id.all][id.className],
        allSensitiveSearch = options[id.all][id.sensitiveSearch];


      const checkAndReplace = (node, tokenArr, classNameAll, sensitiveSearchAll) => {
        let nodeVal = node.nodeValue, parentNode = node.parentNode,
          i, j, curToken, myToken, myClassName, mySensitiveSearch,
          finalClassName, finalSensitiveSearch,
          foundIndex, begin, matched, end,
          textNode, span, isFirst;

        for (i = 0, j = tokenArr.length; i < j; i++) {
          curToken = tokenArr[i];
          myToken = curToken[id.token];
          myClassName = curToken[id.className];
          mySensitiveSearch = curToken[id.sensitiveSearch];

          finalClassName = (classNameAll ? myClassName + " " + classNameAll : myClassName);

          finalSensitiveSearch = (typeof sensitiveSearchAll !== "undefined" ? sensitiveSearchAll : mySensitiveSearch);

          isFirst = true;
          while (true) {
            if (finalSensitiveSearch)
              foundIndex = nodeVal.indexOf(myToken);
            else
              foundIndex = nodeVal.toLowerCase().indexOf(myToken.toLowerCase());

            if (foundIndex < 0) {
              if (isFirst)
                break;

              if (nodeVal) {
                textNode = document.createTextNode(nodeVal);
                parentNode.insertBefore(textNode, node);
              } // End if (nodeVal)
              parentNode.removeChild(node);
              break;
            } // End if (foundIndex < 0)

            isFirst = false;


            begin = nodeVal.substring(0, foundIndex);
            matched = nodeVal.substr(foundIndex, myToken.length);

            if (begin) {
              textNode = document.createTextNode(begin);
              parentNode.insertBefore(textNode, node);
            } // End if (begin)

            span = document.createElement("span");
            span.className += finalClassName;
            span.appendChild(document.createTextNode(matched));
            parentNode.insertBefore(span, node);

            nodeVal = nodeVal.substring(foundIndex + myToken.length);
          } // Whend

        } // Next i
      } // End Function checkAndReplace

      const iterator = (p) => {
        if (p === null) return;

        let children = Array.prototype.slice.call(p.childNodes), i, cur;

        if (children.length) {
          for (i = 0; i < children.length; i++) {
            cur = children[i];
            if (cur.nodeType === 3) {
              checkAndReplace(cur, tokens, allClassName, allSensitiveSearch);
            } else if (cur.nodeType === 1) {
              iterator(cur);
            }
          }
        }
      } // End Function iterator

      iterator(options[id.container]);
    }
    internalHighlighter(
      {
        container: container
        , all:
          {
            className: "highlighter"
          }
        , tokens: [
          {
            token: highlightText
            , className: "highlight"
            , sensitiveSearch: false
          }
        ]
      }
    );
  }
}

// const InstantSearch = {
//
//   "highlight": function (container, highlightText) {
//     const internalHighlighter = options => {
//       const id = {
//           container: "container",
//           tokens: "tokens",
//           all: "all",
//           token: "token",
//           className: "className",
//           sensitiveSearch: "sensitiveSearch"
//         },
//         tokens = options[id.tokens],
//         allClassName = options[id.all][id.className],
//         allSensitiveSearch = options[id.all][id.sensitiveSearch];
//
//
//       function checkAndReplace(node, tokenArr, classNameAll, sensitiveSearchAll) {
//         let nodeVal = node.nodeValue, parentNode = node.parentNode,
//           i, j, curToken, myToken, myClassName, mySensitiveSearch,
//           finalClassName, finalSensitiveSearch,
//           foundIndex, begin, matched, end,
//           textNode, span, isFirst;
//
//         for (i = 0, j = tokenArr.length; i < j; i++) {
//           curToken = tokenArr[i];
//           myToken = curToken[id.token];
//           myClassName = curToken[id.className];
//           mySensitiveSearch = curToken[id.sensitiveSearch];
//
//           finalClassName = (classNameAll ? myClassName + " " + classNameAll : myClassName);
//
//           finalSensitiveSearch = (typeof sensitiveSearchAll !== "undefined" ? sensitiveSearchAll : mySensitiveSearch);
//
//           isFirst = true;
//           while (true) {
//             if (finalSensitiveSearch)
//               foundIndex = nodeVal.indexOf(myToken);
//             else
//               foundIndex = nodeVal.toLowerCase().indexOf(myToken.toLowerCase());
//
//             if (foundIndex < 0) {
//               if (isFirst)
//                 break;
//
//               if (nodeVal) {
//                 textNode = document.createTextNode(nodeVal);
//                 parentNode.insertBefore(textNode, node);
//               } // End if (nodeVal)
//               parentNode.removeChild(node);
//               break;
//             } // End if (foundIndex < 0)
//
//             isFirst = false;
//
//
//             begin = nodeVal.substring(0, foundIndex);
//             matched = nodeVal.substr(foundIndex, myToken.length);
//
//             if (begin) {
//               textNode = document.createTextNode(begin);
//               parentNode.insertBefore(textNode, node);
//             } // End if (begin)
//
//             span = document.createElement("span");
//             span.className += finalClassName;
//             span.appendChild(document.createTextNode(matched));
//             parentNode.insertBefore(span, node);
//
//             nodeVal = nodeVal.substring(foundIndex + myToken.length);
//           } // Whend
//
//         } // Next i
//       } // End Function checkAndReplace
//
//       function iterator(p) {
//         if (p === null) return;
//
//         var children = Array.prototype.slice.call(p.childNodes), i, cur;
//
//         if (children.length) {
//           for (i = 0; i < children.length; i++) {
//             cur = children[i];
//             if (cur.nodeType === 3) {
//               checkAndReplace(cur, tokens, allClassName, allSensitiveSearch);
//             } else if (cur.nodeType === 1) {
//               iterator(cur);
//             }
//           }
//         }
//       } // End Function iterator
//
//       iterator(options[id.container]);
//     } // End Function highlighter
//
//
//     internalHighlighter(
//       {
//         container: container
//         , all:
//           {
//             className: "highlighter"
//           }
//         , tokens: [
//           {
//             token: highlightText
//             , className: "highlight"
//             , sensitiveSearch: false
//           }
//         ]
//       }
//     ); // End Call internalHighlighter
//
//   } // End Function highlight
//
// };
