const library = [
    {
        id: "1",
        cover: "./Vinyls/1.jpeg",
        name: "Pink Floyd - The Dark Side Of The Moon",
        year: "1973",
    },
    {
        id: "2",
        cover: "./Vinyls/2.jpeg",
        name: "Bruce Springsteen ‎– Born To Run",
        year: "1975",
    },
    {
        id: "3",
        cover: "./Vinyls/3.jpeg",
        name: "Simon and Garfunkel* - Bridge Over Troubled Water",
        year: "1969",
    },
    {
        id: "4",
        cover: "./Vinyls/4.jpeg",
        name: "Carole King - Tapestry",
        year: "1973",
    },
    {
        id: "5",
        cover: "./Vinyls/5.jpeg",
        name: "Crosby, Stills, Nash & Young - Déjà Vu",
        year: "1970",
    },
    {
        id: "6",
        cover: "./Vinyls/6.jpeg",
        name: "Van Morrison - Astral Weeks",
        year: "1968",
    },
    {
        id: "7",
        cover: "./Vinyls/7.jpeg",
        name: "Led Zeppelin - Untitled",
        year: "1971",
    },
    {
        id: "8",
        cover: "./Vinyls/8.jpeg",
        name: "The Rolling Stones - Sticky Fingers",
        year: "1971",
    },
    {
        id: "9",
        cover: "./Vinyls/9.jpeg",
        name: "The Who - Tommy",
        year: "1969",
    },
    {
        id: "10",
        cover: "./Vinyls/10.jpeg",
        name: "The Beatles - The Beatles",
        year: "1968",
    },
    {
        id: "11",
        cover: "./Vinyls/11.jpeg",
        name: "Pink Floyd ‎– The Wall",
        year: "1979",
    },
    {
        id: "12",
        cover: "./Vinyls/12.jpeg",
        name: "Bob Dylan ‎– Nashville Skyline",
        year: "1969",
    },
    {
        id: "13",
        cover: "./Vinyls/13.jpeg",
        name: "Santana - Abraxas",
        year: "1970",
    },
    {
        id: "14",
        cover: "./Vinyls/14.jpeg",
        name: "The Who ‎– Who's Next",
        year: "1971",
    },
    {
        id: "15",
        cover: "./Vinyls/15.jpeg",
        name: "The Beatles - Help!",
        year: "1965",
    },
    {
        id: "16",
        cover: "./Vinyls/16.jpeg",
        name: "Marvin Gaye - What's Going On",
        year: "1971",
    },
    {
        id: "17",
        cover: "../Vinyls/17.jpeg",
        name: "Led Zeppelin - Led Zeppelin",
        year: "1968",
    },
    {
        id: "18",
        cover: "./Vinyls/18.jpeg",
        name: "Joni Mitchell - Blue",
        year: "1971",
    },
    {
        id: "19",
        cover: "./Vinyls/19.jpeg",
        name: "Pretenders* - Pretenders",
        year: "1980",
    },
    {
        id: "20",
        cover: "./Vinyls/20.jpeg",
        name: "Bob Dylan - Blonde On Blonde",
        year: "1966",
    },
    {
        id: "21",
        cover: "./Vinyls/21.jpeg",
        name: "The Beatles ‎– Sgt. Pepper's Lonely Hearts Club Band",
        year: "1967",
    },
    {
        id: "22",
        cover: "./Vinyls/22.jpeg",
        name: "Elton John - Goodbye Yellow Brick Road",
        year: "1973",
    },
    {
        id: "23",
        cover: "./Vinyls/23.jpeg",
        name: "The Clash - London Calling",
        year: "1979",
    },
    {
        id: "24",
        cover: "./Vinyls/24.jpeg",
        name: "David Bowie - The Rise And Fall Of Ziggy Stardust And The Spiders From Mars",
        year: "1972",
    }
    // {
    //     id: "25",
    //     cover: "./Vinyls/25.jpeg",
    //     name: "Stevie Wonder ‎– Songs In The Key Of Life",
    //     year: "1976",
    // }
]

const tableBody = document.querySelector('.table-body');
const select = document.querySelector('.vinyls__number');
const pagination = document.querySelector('.pagination');
const pages = document.querySelector('.pages');
const prevButton = document.querySelector('.pagination__button_prev');
const nextButton = document.querySelector('.pagination__button_next');


let tableBodyHtml = "";
let itemsAtPage = 5;
let currentPage = 1;
let numberOfPages = 0;

showItems(library, 0, itemsAtPage);
showNumberOfPages();
// tableBody.style.height = `${tableBody.firstElementChild.offsetHeight * 5}px`;
const pageButton = document.querySelectorAll('.pages__number');

select.addEventListener('change', () => {
    itemsAtPage = Number(select.value);
    showItems(library, 0, itemsAtPage);
    showNumberOfPages();
})

pagination.addEventListener('click', () => {

    e = event.target;

    if (pages.contains(e)) {
        showPage();
    }
    if (e == prevButton) {
        showPrevPage();
    }
    if (e == nextButton) {
        showNextPage();
    }
})

function showPage() {
    let selectedPage = getCurrentPage(event);
    let last = selectedPage * itemsAtPage;
    let first = last - itemsAtPage;

    if (last > library.length) {
        last = library.length;
    }
    
    if (currentPage === selectedPage) {
        return;
    }   
    
    showItems(library, first, last);
    currentPage = selectedPage;
}

function showNextPage() {

    if (currentPage == numberOfPages) {
        return;
    }

    currentPage++;

    let last = currentPage * itemsAtPage;
    let first = last - itemsAtPage;
    if (last > library.length) {
        last = library.length;
    }
  
    showItems(library, first, last);
}

function showPrevPage() {

    if (currentPage == 1) {
        return;
    }

    currentPage--;

    let last = currentPage * itemsAtPage;
    let first = last - itemsAtPage;
    
    showItems(library, first, last);
}

function showItems(data, from, to) {
    clearItems();
    for (let i = from; i < to; i++) {
        if ( i >= data.length) {
            tableBody.innerHTML += tableBodyHtml;
            return;
        }
        tableBodyHtml += `
            <tr>
                <th scope="row">${library[i].id}</th>
                <td><img class="table-image" src=${library[i].cover}></td>
                <td>${library[i].name}</td>
                <td>${library[i].year}</td>
            </tr>
        `
    }
    tableBody.innerHTML += tableBodyHtml;
    tableBodyHtml = "";
}

function showNumberOfPages() {
    pages.innerHTML = "";
    getNumberOfPages()

    let fragment = document.createDocumentFragment();

    for (let i = 1; i <= numberOfPages; i++) {
        let span = document.createElement('span');
        span.setAttribute("class", "pages__number")
        span.textContent = i;
        fragment.append(span);
    }

    pages.append(fragment);
}

function clearItems() {

    let child = tableBody.lastElementChild;

    while (child) {
        tableBody.removeChild(child);
        child = tableBody.lastElementChild;
    }
}

function getCurrentPage(event) {
    return Number(event.target.textContent);
}

function getNumberOfPages() {
    numberOfPages = Math.ceil(library.length / itemsAtPage);
}