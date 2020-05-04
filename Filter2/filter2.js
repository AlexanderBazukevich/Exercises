import {library} from './library.js';

const scrollTable = document.querySelector('.scroll');
const table = document.querySelector('[data-table=vinyls]');
const tableBody = document.querySelector('[data-table=vinyls] tbody');
const tableHeader = document.querySelector('[data-table=columns] thead');
const select = document.querySelector('[data-table=show]');
const addVinylButton = document.querySelector('[data-button=add-modal')
const addForm = document.querySelector('[data-form=form]');
const nameInput = document.querySelector('[data-form=name-input]');
const yearInput = document.querySelector('[data-form=year-input]');
const coverInput = document.querySelector('[data-form=cover-input]');
const pagination = document.querySelector('.pagination');
const defaultItemsAtPage = 5;

let currentLibrary = library;
let visibleLibrary = [];
let currentItemsAtPage = defaultItemsAtPage;
let maxItemsAtPage = Number(select.value);
let currentPage = 1;
let numberOfPages = 0;
let sortOrder = "A-Z";
let prevSortColumn;

scrollTable.scrollTop = 0;
getVisibleLibrary(0, maxItemsAtPage);
showNumberOfPages();
showItems(visibleLibrary, 0, defaultItemsAtPage);
scrollTable.style.height = `${tableBody.childNodes[1].offsetHeight * 5}px`;

addVinylButton.addEventListener('click', () => {
    $('#addVinyl').modal('show');
})

//resets form after modal hide event
$('#addVinyl').on('hide.bs.modal', () => {
    addForm.reset();
    addForm.classList.remove('was-validated');
})

addForm.addEventListener('submit', (event) => {
    if (addForm.checkValidity() === false || yearValidation(yearInput.value) === false) {
        event.preventDefault();
        event.stopPropagation();
        addForm.classList.add('was-validated');
        return false;
    }
    addForm.classList.add('was-validated');
    event.preventDefault();
    addNewVinyl(coverInput.value, nameInput.value, yearInput.value);
    getVisibleLibrary((currentPage - 1) * maxItemsAtPage, currentPage * maxItemsAtPage);
    showNumberOfPages();
    showItems(visibleLibrary, 0, defaultItemsAtPage);
    addForm.reset();
    addForm.classList.remove('was-validated');
    $('#addVinyl').modal('hide');
})

select.addEventListener('change', () => {
    scrollTable.scrollTop = 0;
    currentPage = 1;
    maxItemsAtPage = Number(select.value);
    getVisibleLibrary(0, maxItemsAtPage);
    showNumberOfPages();
    showItems(visibleLibrary, 0, defaultItemsAtPage);
})

pagination.addEventListener('click', () => {
    scrollTable.scrollTop = 0;
    let e = event.target;

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
    let name = document.querySelector('[data-table=name]');
    let year = document.querySelector('[data-table=year]');

    let currentSortColumn = event.target;

    if (currentSortColumn != name && currentSortColumn != year) {
        return false;
    }

    if (currentSortColumn == name) {
        sortByParam('Name');
    }

    if (currentSortColumn == year) {
        sortByParam('Year');
    }

    maxItemsAtPage = Number(select.value);
    if (sortOrder == 'A-Z' || prevSortColumn != currentSortColumn) {
        getVisibleLibrary(0, maxItemsAtPage);
        showItems(visibleLibrary, 0, maxItemsAtPage);
        prevSortColumn = currentSortColumn;
        sortOrder = 'Z-A';
    } else {
        currentLibrary = currentLibrary.reverse();
        getVisibleLibrary(0, maxItemsAtPage);
        showItems(visibleLibrary, 0, maxItemsAtPage);
        prevSortColumn = currentSortColumn;
        sortOrder = 'A-Z';
    }
})

scrollTable.addEventListener('scroll', () => {
    
    let elemHeight = tableBody.childNodes[1].offsetHeight;
    let visibleHeight = defaultItemsAtPage * elemHeight;
    let scrollHeight = visibleHeight + scrollTable.scrollTop;
    currentItemsAtPage = Math.trunc(scrollHeight / elemHeight);

    if (currentItemsAtPage == tableBody.childNodes.length - 1) {
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

    pagination.childNodes[currentPage].classList.remove("active");
    currentPage = selectedPage;
    getVisibleLibrary(first, last);
    showItems(visibleLibrary, 0, defaultItemsAtPage);
}

function showNextPage() {

    if (currentPage == numberOfPages) {
        return;
    }
    pagination.childNodes[currentPage].classList.remove("active");
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
    pagination.childNodes[currentPage].classList.remove("active");
    currentPage--;

    let last = currentPage * maxItemsAtPage;
    let first = last - maxItemsAtPage;

    getVisibleLibrary(first, last);
    showItems(visibleLibrary, 0, defaultItemsAtPage);
}

function showItems(data, from, to) {
    clearItems();
    let tableBodyHtml = `<tr>
            <th scope="row" width="60" height></th>
            <td width="230"></td>
            <td width="720"></td>
            <td width="85"></td>
        </tr>`;
    for (let i = from; i < to; i++) {
        if ( i >= data.length) {
            tableBody.innerHTML = tableBodyHtml;
            table.style.marginBottom = 0;
            pagination.childNodes[currentPage].classList.add("active");
            return;
        }
        tableBodyHtml += `<tr>
                <th scope="row">${currentLibrary.indexOf(data[i]) + 1}</th>
                <td><img class="vinyl-image" src=${data[i].cover}></td>
                <td>${data[i].name}</td>
                <td>${data[i].year}</td>
            </tr>`
    }
    tableBody.innerHTML = tableBodyHtml;
    let visibleItemsLength = tableBody.childNodes.length - 1;
    table.style.marginBottom = `${tableBody.childNodes[1].offsetHeight * (data.length - visibleItemsLength)}px`;
    pagination.childNodes[currentPage].classList.add("active");

    //change width of last elements in every row when scroll appears
    // if (scrollTable.offsetWidth > table.offsetWidth) {
    //     let vinylYears = document.querySelectorAll('.vinyl-year');
    //     vinylYears.forEach( (item) => {
    //         item.style.width = `${item.offsetWidth - (scrollTable.offsetWidth - table.offsetWidth)}px`;
    //     })
    // }
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

    currentLibrary.push({
        id: String(currentLibrary.length + 1),
        cover: cover,
        name: name,
        year: year,
    });
}

function yearValidation(year) {

    let text = /^[0-9]+$/;
    let currentYear = new Date().getFullYear();

    if (!text.test(year)) {
        yearInput.value = "Incorrect year";
        return false;
    }
    if (year.length != 4) {
        yearInput.value = "Incorrect year";
        return false;
    }
    if ((year < 1920) || (year > currentYear)){
        yearInput.value = "Incorrect year";
        return false;
    }
}
