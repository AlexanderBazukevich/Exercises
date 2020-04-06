let options = document.querySelector('.options');
let search = document.querySelector('.search');
let space = document.querySelector('.options__space');
let sortButton = document.querySelector('.sort');
let count = 0;
// let differenceSum = 0;
let optionItems = [
    {
      name: "Deloris Walton"
    },
    {
      name: "Hutchinson Short"
    },
    {
      name: "Shaw Koch"
    },
    {
      name: "Evangelina Richmond"
    },
    {
      name: "Christina Woods"
    },
    {
      name: "Cassie Estrada"
    },
    {
      name: "Lina Price"
    },
    {
      name: "Fowler Frye"
    },
    {
      name: "Branch Roach"
    },
    {
      name: "Morales Baird"
    },
    {
      name: "Baird Horne"
    },
    {
      name: "Whitehead Wolfe"
    },
    {
      name: "Maxine Woodward"
    },
    {
      name: "Tabitha Brennan"
    },
    {
      name: "Fitzgerald Jacobs"
    },
    {
      name: "Janette Decker"
    },
    {
      name: "Lila Hopper"
    },
    {
      name: "Deann Cardenas"
    },
    {
      name: "Carney Hardin"
    },
    {
      name: "Head Thornton"
    },
    {
      name: "Blackburn Moreno"
    },
    {
      name: "Paulette Lee"
    },
    {
      name: "Nadia Pate"
    },
    {
      name: "Felecia House"
    },
    {
      name: "Ortiz Mays"
    },
    {
      name: "Ochoa Davenport"
    },
    {
      name: "Odessa George"
    },
    {
      name: "Nichols Tyler"
    },
    {
      name: "Stein Waters"
    },
    {
      name: "Estrada Mcgmuire"
    },
    {
      name: "Esytrada Mcguire"
    },
    {
      name: "Estrada Mcgduire"
    },
    {
      name: "Esmtrada Mcguirce"
    },
    {
      name: "Estrakda Mcguire"
    },
    {
      name: "Estrada Mcguhire"
    },
    {
      name: "Estrrada Mcguire"
    },
    {
      name: "Estrada Mcghuire"
    },
    {
      name: "Esthrada Mcguire"
    },
    {
      name: "Estrada Mcdguire"
    },
    {
      name: "Estradaefea Mcdguire"
    },
    {
      name: "Eqwqwqada Mcdguire"
    }
  ]

let visibleItems = [];
let resultItems = optionItems;

showItems(optionItems, visibleItems.length, 11);
options.style.maxHeight = `${options.firstChild.offsetHeight * 10}px`;
space.style.height = `${options.firstChild.offsetHeight * (resultItems.length - 11)}px`;

options.addEventListener('scroll', addContent);

search.addEventListener('keyup', () => {
    // options.removeEventListener('scroll', addContent);
    // getVisibleItems();
    let key = search.value.toLowerCase();
    if (key == '') {
        resultItems = optionItems;
        clearItems();
        // getVisibleItems();
        showItems(resultItems, visibleItems.length, 11);
        space.style.height = `${options.firstChild.offsetHeight * (resultItems.length - 11)}px`;
        // addContent();
        // options.addEventListener('scroll', addContent);
        return;
    }
    resultItems = optionItems.filter( (item) => {
        return item.name.toLowerCase().startsWith(key);
    })
    clearItems();
    showItems(resultItems, 0, 11);
    // options.addEventListener('scroll', addContent);
})

sortButton.addEventListener('click', () => {
    if (options.lastElementChild == space) {
        options.removeChild(space);
    };
    getVisibleItems();
    let tempOptionItems = visibleItems.map( (item, i) => {
        return { index: i, value: item.toLowerCase() };
    })
    tempOptionItems.sort( (a, b) => {
        if (a.value > b.value) {
            return 1;
        }
        if (a.value < b.value) {
            return -1;
        }
        return 0;
    })
    visibleItems = tempOptionItems.map( (item) => {
        return visibleItems[item.index];
    })
    clearItems();
    if (sortButton.value == 'A-Z') {
        showItems(visibleItems, 0, visibleItems.length);
        sortButton.value = 'Z-A';
    } else {
        showItems(visibleItems.reverse(), 0, visibleItems.length);
        sortButton.value = 'A-Z';
    }
})

function addContent() {
  getVisibleItems();
  let firstHeight = options.firstChild.offsetHeight;
  let scrollTop = options.scrollTop;
  let trunc = Math.trunc(scrollTop / firstHeight);
  console.log(count);
  // console.log(trunc);

  if (trunc > count) {
      showItems(resultItems, visibleItems.length, visibleItems.length + (trunc - count));
      count = trunc;
  }
  if (resultItems.length == visibleItems.length) {
    count = 0;
  }
}

function showItems(data, from, to) {
    if (options.lastElementChild == space) {
        options.removeChild(space);
    };
    let fragment = document.createDocumentFragment();

    for (let i = from; i < to; i++) {
        if ( i >= data.length) {
            options.appendChild(fragment);
            options.appendChild(space);
            space.style.height = 0;
            return;
        }
        let li = document.createElement('li');
        if (data[i].name) {
            li.textContent = data[i].name;
        } else {
            li.textContent = data[i];
        }
        fragment.appendChild(li);
    }
    options.appendChild(fragment);
    if (resultItems.length > 10) {
        options.appendChild(space);
        space.style.height = `${options.firstChild.offsetHeight * (resultItems.length - (visibleItems.length - 1))}px`;
    }
}

function clearItems() {
    let child = options.lastElementChild;

    while (child) {
        options.removeChild(child);
        child = options.lastElementChild;
    }
}

function getVisibleItems() {
    visibleItems = [];
    let i = 0;
    options.childNodes.forEach( (item) => {
        visibleItems[i] = item.innerHTML;
        i++;
    });
}

// function searchKey(string, expression) {
//     let d = string.toLowerCase();
//     let result = d.search(new RegExp(expression, 'i'));

//     if (result > 0) {
//         visibleItems.push(string);
//     }
// }
