let options = document.querySelector('.options');
let search = document.querySelector('.search');
let sortButton = document.querySelector('.sort');
// let optionItems = ['New York', 'Mexico', 'Grodno', 'Newcastle' , 'Grodno', 'Vienna', 'Warsaw', 'Bagdad', 'Porto', 'Milan', 'Athens', 'Paris', 'Parma'];
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
      name: "Estrada Mcguire"
    }
  ]
// let resultItems = [];

showItems(optionItems);

search.addEventListener('keyup', () => {
    let key = search.value.toLowerCase();
    // optionItems.forEach( (item) => {
    //     if (item.toLowerCase().startsWith(key)) {
    //         resultItems.push(item);
    //     };
    // })

    // optionItems.map
    let resultItems = optionItems.filter( (item) => {
        return item.name.toLowerCase().startsWith(key);
    })
    clearItems();
    showItems(resultItems);

    // resultItems = [];
})

sortButton.addEventListener('click', () => {

    let tempOptionItems = optionItems.map( (item, i) => {
        return { index: i, value: item.name.toLowerCase() };
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

    let resultItems = tempOptionItems.map( (item) => {
        return optionItems[item.index];
    })

    clearItems();
    if (sortButton.value == 'A-Z') {
        showItems(resultItems);
        sortButton.value = 'Z-A';
    } else {
        showItems(resultItems.reverse());
        sortButton.value = 'A-Z';
    }
})

function showItems(data) {

    let fragment = document.createDocumentFragment();

    data.forEach( (item) => {
        let li = document.createElement('li');
        li.textContent = item.name;
        fragment.appendChild(li);
    })

    options.appendChild(fragment);
}

function clearItems() {
    let child = options.lastElementChild;

    while (child) {
        options.removeChild(child);
        child = options.lastElementChild;
    }
}

// function searchKey(string, expression) {
//     let d = string.toLowerCase();
//     let result = d.search(new RegExp(expression, 'i'));

//     if (result > 0) {
//         resultItems.push(string);
//     }
// }
