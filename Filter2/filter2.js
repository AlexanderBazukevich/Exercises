const library = [
    {
        cover: "./Vinyls/1.jpeg",
        name: "Pink Floyd - The Dark Side Of The Moon",
        year: "1973",
    },
    {
        cover: "./Vinyls/2.jpeg",
        name: "Bruce Springsteen ‎– Born To Run",
        year: "1975",
    },
    {
        cover: "./Vinyls/3.jpeg",
        name: "Simon and Garfunkel* - Bridge Over Troubled Water",
        year: "1969",
    },
    {
        cover: "./Vinyls/4.jpeg",
        name: "Carole King - Tapestry",
        year: "1973",
    },
    {
        cover: "./Vinyls/5.jpeg",
        name: "Crosby, Stills, Nash & Young - Déjà Vu",
        year: "1970",
    },
    {
        cover: "./Vinyls/6.jpeg",
        name: "Van Morrison - Astral Weeks",
        year: "1968",
    },
    {
        cover: "./Vinyls/7.jpeg",
        name: "Led Zeppelin - Untitled",
        year: "1971",
    },
    {
        cover: "./Vinyls/8.jpeg",
        name: "The Rolling Stones - Sticky Fingers",
        year: "1971",
    },
    {
        cover: "./Vinyls/9.jpeg",
        name: "The Who - Tommy",
        year: "1969",
    },
    {
        cover: "./Vinyls/10.jpeg",
        name: "The Beatles - The Beatles",
        year: "1968",
    },
    {
        cover: "./Vinyls/11.jpeg",
        name: "Pink Floyd ‎– The Wall",
        year: "1979",
    },
    {
        cover: "./Vinyls/12.jpeg",
        name: "Bob Dylan ‎– Nashville Skyline",
        year: "1969",
    },
    {
        cover: "./Vinyls/13.jpeg",
        name: "Santana - Abraxas",
        year: "1970",
    },
    {
        cover: "./Vinyls/14.jpeg",
        name: "The Who ‎– Who's Next",
        year: "1971",
    },
    {
        cover: "./Vinyls/15.jpeg",
        name: "The Beatles - Help!",
        year: "1965",
    },
    {
        cover: "./Vinyls/16.jpeg",
        name: "Marvin Gaye - What's Going On",
        year: "1971",
    },
    {
        cover: "./Vinyls/17.jpeg",
        name: "Led Zeppelin - Led Zeppelin",
        year: "1968",
    },
    {
        cover: "./Vinyls/18.jpeg",
        name: "Joni Mitchell - Blue",
        year: "1971",
    },
    {
        cover: "./Vinyls/19.jpeg",
        name: "Pretenders* - Pretenders",
        year: "1980",
    },
    {
        cover: "./Vinyls/20.jpeg",
        name: "Bob Dylan - Blonde On Blonde",
        year: "1966",
    },
    {
        cover: "./Vinyls/21.jpeg",
        name: "The Beatles ‎– Sgt. Pepper's Lonely Hearts Club Band",
        year: "1967",
    },
    {
        cover: "./Vinyls/22.jpeg",
        name: "Elton John - Goodbye Yellow Brick Road",
        year: "1973",
    },
    {
        cover: "./Vinyls/23.jpeg",
        name: "The Clash - London Calling",
        year: "1979",
    },
    {
        cover: "./Vinyls/24.jpeg",
        name: "David Bowie - The Rise And Fall Of Ziggy Stardust And The Spiders From Mars",
        year: "1972",
    }
    // {
    //     cover: "./Vinyls/25.jpeg",
    //     name: "Stevie Wonder ‎– Songs In The Key Of Life",
    //     year: "1976",
    // }
]

const table = document.querySelector('[data-table=vinyls]');
const tableBody = document.querySelector('[data-table=vinyls] tbody');
const tableHeader = document.querySelector('[data-table=columns] thead');
const select = document.querySelector('[data-table=show]');
const addVinyl = document.querySelector('[data-modal=add-vinyl]');
const addVinylButton = document.querySelector('[data-button=add-modal')
const addForm = document.querySelector('[data-form=form]');
const nameInput = document.querySelector('[data-form=name-input]');
const yearInput = document.querySelector('[data-form=year-input]');
const coverInput = document.querySelector('[data-form=cover-input]');
const formSubmit = document.querySelector('[data-form=submit]')
const formClose = document.querySelector('[data-form=close]')
const pagination = document.querySelector('.pagination');
const scrollTable = document.querySelector('.scroll');
const defaultItemsAtPage = 5;

let currentLibrary = library;
let visibleLibrary = [];
let currentItemsAtPage = defaultItemsAtPage;
let maxItemsAtPage = Number(select.value);
let currentPage = 1;
let numberOfPages = 0;

scrollTable.scrollTop = 0;
getVisibleLibrary(0, maxItemsAtPage);
showItems(visibleLibrary, 0, defaultItemsAtPage);
showNumberOfPages();
scrollTable.style.height = `${tableBody.firstElementChild.offsetHeight * 5}px`;

addVinylButton.addEventListener('click', () => {
    $('#addVinyl').modal('show');
})

//resets form after modal hide event
$('#addVinyl').on('hide.bs.modal', () => {
    addForm.reset();
    addForm.classList.remove('was-validated');
})

addForm.addEventListener('submit', (event) => {
    if (addForm.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        addForm.classList.add('was-validated');
        return false;
    }
    addForm.classList.add('was-validated');
    event.preventDefault();
    addNewVinyl(coverInput.value, nameInput.value, yearInput.value);
    getVisibleLibrary((currentPage - 1) * maxItemsAtPage, currentPage * maxItemsAtPage);
    showItems(visibleLibrary, 0, defaultItemsAtPage);
    showNumberOfPages();
    addForm.reset();
    addForm.classList.remove('was-validated');
    $('#addVinyl').modal('hide');
})

select.addEventListener('change', () => {
    scrollTable.scrollTop = 0;
    currentPage = 1;
    maxItemsAtPage = Number(select.value);
    getVisibleLibrary(0, maxItemsAtPage);
    showItems(visibleLibrary, 0, defaultItemsAtPage);
    showNumberOfPages();
})

pagination.addEventListener('click', () => {
    scrollTable.scrollTop = 0;
    e = event.target;

    let previous = document.querySelector('[data-table = Previous]');
    let next = document.querySelector('[data-table = Next]');
    
    if (e == pagination) {
        return false;
    }

    if (e == previous) {
        showPrevPage();
    } else if (e == next) {
        showNextPage();
    } else {
        showPage();
    }
})

tableHeader.addEventListener('click', () => {
    scrollTable.scrollTop = 0;
    let e = event.target;
    let value = e.getAttribute('value');

    switch (e.getAttribute('data-table')) {
        case 'Name':
            sortByParam('Name');
            break;
        case 'Year':
            sortByParam('Year');
            break;
        default:
            return false;
    }
    //TODO optimize (replace switch case)
    //TODO every new column sorting begins from 'A-Z'

    maxItemsAtPage = Number(select.value);
    if (value == 'A-Z') {
        currentLibrary = currentLibrary.reverse();
        getVisibleLibrary(0, maxItemsAtPage);
        showItems(visibleLibrary, 0, maxItemsAtPage);
        e.setAttribute('value', 'Z-A');
    } else {
        getVisibleLibrary(0, maxItemsAtPage);
        showItems(visibleLibrary, 0, maxItemsAtPage);
        e.setAttribute('value', 'A-Z');
    }
})

scrollTable.addEventListener('scroll', () => {
    
    let firstHeight = tableBody.firstElementChild.offsetHeight;
    let visibleHeight = defaultItemsAtPage * firstHeight;
    let scrollHeight = visibleHeight + scrollTable.scrollTop;
    let currentItemsAtPage = Math.trunc(scrollHeight / firstHeight);

    if (currentItemsAtPage == tableBody.childNodes.length) {
        return false;
    }

    showItems(visibleLibrary, 0, currentItemsAtPage); //TODO fix bug with scroll sticking to bottom
});

function showPage() {
    let selectedPage = getSelectedPage(event);
    let last = selectedPage * maxItemsAtPage;
    let first = last - maxItemsAtPage;

    if (last > currentLibrary.length) {
        last = currentLibrary.length;
    }

    if (currentPage === selectedPage) {
        return;
    }

    getVisibleLibrary(first, last);
    showItems(visibleLibrary, 0, defaultItemsAtPage);
    currentPage = selectedPage;
}

function showNextPage() {
    if (currentPage == numberOfPages) {
        return;
    }

    currentPage++;

    let last = currentPage * maxItemsAtPage;
    let first = last - maxItemsAtPage;
    if (last > currentLibrary.length) {
        last = currentLibrary.length;
    }

    getVisibleLibrary(first, last);
    showItems(visibleLibrary, 0, defaultItemsAtPage);
}

function showPrevPage() {

    if (currentPage == 1) {
        return;
    }

    currentPage--;

    let last = currentPage * maxItemsAtPage;
    let first = last - maxItemsAtPage;

    getVisibleLibrary(first, last);
    showItems(visibleLibrary, 0, defaultItemsAtPage);
}

function showItems(data, from, to) {
    clearItems();
    let tableBodyHtml = "";
    for (let i = from; i < to; i++) {
        if ( i >= data.length) {
            tableBody.innerHTML = tableBodyHtml;
            table.style.marginBottom = 0;
            return;
        }
        tableBodyHtml += `<tr>
                <th scope="row">${currentLibrary.indexOf(data[i]) + 1}</th>
                <td><img class="table-image" src=${data[i].cover}></td>
                <td>${data[i].name}</td>
                <td>${data[i].year}</td>
            </tr>`
    }
    tableBody.innerHTML = tableBodyHtml;
    let visibleItemsLength = tableBody.childNodes.length;
    table.style.marginBottom = `${tableBody.firstElementChild.offsetHeight * (data.length - visibleItemsLength)}px`;
}

function showNumberOfPages() {
    pagination.innerHTML = "";
    getNumberOfPages()

    let fragment = document.createDocumentFragment();

    createPaginationItem('Previous');

    for (let i = 1; i <= numberOfPages; i++) {
        createPaginationItem(i);
    }

    createPaginationItem('Next');

    pagination.append(fragment);

    function createPaginationItem(value) {
        let li = document.createElement('li');
        li.setAttribute("class", "page-item");
        let a = document.createElement('span');
        a.setAttribute("class", "page-link");
        a.setAttribute('data-table', value);
        a.textContent = value;
        li.append(a);
        fragment.append(li);
    }
}

function clearItems() {

    let child = tableBody.lastElementChild;

    while (child) {
        tableBody.removeChild(child);
        child = tableBody.lastElementChild;
    }
}

function getVisibleLibrary(start, end) {
    visibleLibrary = currentLibrary.slice(start, end);
}

function getSelectedPage(event) {
    return Number(event.target.textContent);
}

function getNumberOfPages() {
    numberOfPages = Math.ceil(currentLibrary.length / maxItemsAtPage);
}

function sortByParam(param) {
    scrollTable.scrollTop = 0;
    currentPage = 1;

    let tempOptionItems = [];

    if (param == 'Name') {
        tempOptionItems = currentLibrary.map( (item, i) => {
            return { index: i, value: item.name.toLowerCase() };
        })
    }

    if (param == 'Year') {
        tempOptionItems = currentLibrary.map( (item, i) => {
            return { index: i, value: item.year.toLowerCase() };
        })
    }

    if (param == 'ID') {
        tempOptionItems = currentLibrary.map( (item, i) => {
            return { index: i, value: Number(item.id) };
        })
    }

    tempOptionItems.sort( (a, b) => {
        if (a.value > b.value) {
            return 1;
        }
        if (a.value < b.value) {
            return -1;
        }
        return 0;
    })

    currentLibrary = tempOptionItems.map( (item) => {
        return currentLibrary[item.index];
    })
}

function addNewVinyl(cover, name, year) {

    // currentPage = 1;

    currentLibrary.push({
        id: String(currentLibrary.length + 1),
        cover: cover,
        name: name,
        year: year,
    });
}
// function checkValidity() {
//     if (nameInput.value == '' || yearInput.value == '' || coverInput.value == '') {
//         return false;
//     }

//     if (yearValidation(yearInput.value) == false) {
//         return false;
//     };
// }

// function yearValidation(year) {

//     let text = /^[0-9]+$/;
//     let currentYear = new Date().getFullYear();

//     if (!text.test(year)) {
//         yearInput.value = "Incorrect year";
//         return false;
//     }
//     if (year.length != 4) {
//         yearInput.value = "Incorrect year";
//         return false;
//     }
//     if ((year < 1920) || (year > currentYear)){
//         yearInput.value = "Incorrect year";
//         return false;
//     }
// }
