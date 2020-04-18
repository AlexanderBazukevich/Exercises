let options = document.querySelector('.options');
let search = document.querySelector('.search');
let space = document.querySelector('.options__space');
let sortButton = document.querySelector('.sort');
let count = 0;
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

showItems(optionItems, visibleItems.length, 10);
let elementHeight = options.firstChild.offsetHeight;
options.style.maxHeight = `${elementHeight * 10}px`;

options.addEventListener('scroll', () => {

    //this method makes full refresh of list and adds number of items depending from scrolling height
    let visibleHeight = 10 * elementHeight;
    getVisibleItems();

    let scrollHeight = visibleHeight + options.scrollTop;
    let resultElementsNumber = Math.trunc(scrollHeight / elementHeight);

    if (resultElementsNumber === visibleItems.length - 1) {
      return;
    }

    clearItems();
    showItems(resultItems, 0, resultElementsNumber);

    //--this method added elements without full list refreshing:
    // let trunc = Math.trunc(options.scrollTop / options.firstChild.offsetHeight);

    // if (options.lastElementChild != space && trunc == count) {
    //     trunc--;
    // }

    // if (trunc > count) {
    //     showItems(resultItems, (visibleItems.length - 1), (visibleItems.length + (trunc - count) - 1));
    //     count = trunc;
    // }

    // if (trunc < count) {
    //     deleteItems(count - trunc);
    //     count = trunc;
    // }

});

search.addEventListener('keyup', () => {
  
    options.scrollTop = 0;
    resultItems = optionItems;
    getVisibleItems();
    let key = search.value.toLowerCase();

    if (key == '') {
        clearItems();
        showItems(resultItems, 0, 10);
        count = 0;
        return;
    }

    resultItems = optionItems.filter( (item) => {
        return item.name.toLowerCase().startsWith(key);
    })

    clearItems();
    showItems(resultItems, 0, 10);
    count = 0;
})

sortButton.addEventListener('click', () => {

    options.scrollTop = 0;
    removeSpace()
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
    
    resultItems = visibleItems;
    clearItems();

    if (sortButton.value == 'A-Z') {
        showItems(visibleItems, 0, visibleItems.length);
        sortButton.value = 'Z-A';
    } else {
        showItems(visibleItems.reverse(), 0, visibleItems.length);
        sortButton.value = 'A-Z';
    }
})

function showItems(data, from, to) {
    
    let fragment = document.createDocumentFragment()
    removeSpace();

    for (let i = from; i < to; i++) {
        if ( i >= data.length) {
            options.appendChild(fragment);
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

    getVisibleItems();
    if (resultItems.length > 10 && visibleItems.length != resultItems.length) {
        options.appendChild(space);
        space.style.height = `${options.firstChild.offsetHeight * (resultItems.length - visibleItems.length)}px`;
    }
}

function deleteItems(number) {

    removeSpace();

    for (let i = 0; i < number; i++) {
        options.removeChild(options.lastElementChild);
    }

    getVisibleItems();
    if (resultItems.length > 10 && visibleItems.length != resultItems.length) {
        options.appendChild(space);
        space.style.height = `${options.firstChild.offsetHeight * (resultItems.length - visibleItems.length)}px`;
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

    options.childNodes.forEach( (item) => {
        visibleItems.push(item.innerHTML);
    });
}

function removeSpace() {
  if (options.lastElementChild == space) {
      options.removeChild(space);
  };    
}
