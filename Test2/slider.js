const slides = [
    {
        title: "Sees!",
        picture: "../images/mag01.jpg",
        content: "Voluptate elit elit ipsum velit ea ipsum consequat in anim eiusmod. Veniam cupidatat consequat laboris commodo qui amet ea aliquip laborum. Anim Lorem eu voluptate eiusmod cillum reprehenderit reprehenderit sint aliqua id. Mollit culpa occaecat ea labore pariatur laboris tempor aute est excepteur sunt. Magna in eiusmod ex eiusmod reprehenderit et do quis pariatur nisi. Laboris laboris id eu amet elit elit excepteur commodo commodo eiusmod ipsum ullamco.",
    },
    {
        title: "Forests!",
        picture: "../images/mag02.jpg",
        content: "Aute proident adipisicing Lorem id duis fugiat. Reprehenderit eiusmod ullamco elit sit fugiat ex non deserunt. Proident tempor irure qui dolore Lorem minim nulla aute Lorem tempor non anim.",
    },
    {
        title: "Sunsets!",
        picture: "../images/mag03.jpg",
        content: "Ullamco occaecat reprehenderit dolore. Excepteur sint id sint dolore dolore nulla ex reprehenderit nostrud. Officia ea labore cupidatat officia id eu labore qui ullamco exercitation do ut consequat. Eu commodo exercitation in eu irure.",
    },
    {
        title: "Castles!",
        picture: "../images/mag04.jpg",
        content: "Ullamco ut voluptate minim Lorem. reprehenderit anim sunt pariatur. Lorem est elit pariatur sint duis voluptate elit eiusmod. Deserunt proident excepteur consequat non. Adipisicing dolore nulla mollit esse Lorem consectetur cupidatat ea aliqua nisi amet incididunt.",
    },
    {
        title: "Roads!",
        picture: "../images/mag05.jpg",
        content: "Nostrud dolor ut id ex nisi officia aliquip cillum aliqua reprehenderit anim sunt pariatur. Lorem est elit pariatur sint duis voluptate elit eiusmod. Deserunt proident excepteur consequat non. Adipisicing dolore nulla mollit esse Lorem consectetur cupidatat ea aliqua nisi amet incididunt.",
    },
    {
        title: "Mountains!",
        picture: "../images/mag06.jpg",
        content: "Nostrud dolor ut id ex nisi officia aliquip cillum aliqua reprehenderit anim sunt pariatur. Lorem est elit pariatur sint duis voluptate elit eiusmod. Deserunt proident excepteur consequat non. Adipisicing dolore nulla mollit esse Lorem consectetur cupidatat ea aliqua nisi amet incididunt.",
    },
    {
        title: "Lakes!",
        picture: "../images/mag07.jpg",
        content: "Nostrud dolor ut id ex nisi officia aliquip cillum aliqua reprehenderit anim sunt pariatur. Lorem est elit pariatur sint duis voluptate elit eiusmod. Deserunt proident excepteur consequat non. Adipisicing dolore nulla mollit esse Lorem consectetur cupidatat ea aliqua nisi amet incididunt.",
    },    
    {
        title: "Rocks!",
        picture: "../images/mag08.jpg",
        content: "Nostrud dolor ut id ex nisi officia aliquip cillum aliqua reprehenderit anim sunt pariatur. Lorem est elit pariatur sint duis voluptate elit eiusmod. Deserunt proident excepteur consequat non. Adipisicing dolore nulla mollit esse Lorem consectetur cupidatat ea aliqua nisi amet incididunt.",
    }
]

const slider = document.querySelector('.slider');
const indicator = document.querySelector('.indicator');
let sliderHtml = '';
let indicatorHtml = '';
let swipeLength = 0;
let visibleItems = 3;
let currentIndex = 0;

slides.forEach( (item) => {
    sliderHtml += `
    <div class = "slider__item">
        <img class="slider__image" src=${item.picture}>
    </div>
    `   
        /*<h2 class="slider__title">${item.title}</h2>
        <p class="slider__description">${item.content}</p>*/
})
slider.innerHTML += sliderHtml;

const sliderItems = document.querySelectorAll('.slider__item');

if (sliderItems.length > visibleItems) {
    for (i = 0; i <= sliderItems.length - visibleItems; i++) {
        indicatorHtml += `
        <div class="indicator__item"></div>
        `
    }
}
indicator.innerHTML += indicatorHtml;

const indicatorItems = document.querySelectorAll('.indicator__item');
activateIndicator();

let elementWidth = slider.offsetWidth / visibleItems;
let sliderHalfWidth = slider.offsetWidth / 2;

let timerID = setInterval( () => {
    if (currentIndex != sliderItems.length - visibleItems) {
        currentIndex++;
        swipe();
    } else { 
        clearInterval(timerID);
    }
}, 2000)

document.addEventListener('keydown', (event) => {

    if (event.keyCode == 37 && currentIndex != 0) {
        currentIndex--;
    }

    if (event.keyCode == 39 && currentIndex != sliderItems.length - visibleItems) {
        currentIndex++;
    }

    swipe();
})

slider.addEventListener('click', (event) => {

    let eventX = event.layerX;

    if (eventX <= sliderHalfWidth && currentIndex != 0) {
        currentIndex--;
    }

    if (eventX > sliderHalfWidth && currentIndex != sliderItems.length - visibleItems) {
        currentIndex++;
    }

    swipe();
})

window.addEventListener('resize', () => {    
    swipe();
})

function swipe() {
    swipeLength = -(elementWidth * currentIndex);
    sliderItems[0].style.marginLeft = `${swipeLength}px`;
    activateIndicator(currentIndex);
}

function activateIndicator() {
    indicatorItems.forEach( (item) => {
        item.classList.remove('indicator__item_active');
    });
    indicatorItems[currentIndex].classList.add('indicator__item_active');
}

// var observer = new MutationObserver( (mutations) => {
//     mutations.forEach( (mutation) => {
//         console.log(mutation.type);
//         let elementWidth = slider.offsetWidth / visibleItems;
//         swipe(elementWidth, currentIndex);
//     })
// })

// var config = {
//     attributes: true,
//     childList: true,
//     characterData: true
// }

// observer.observe(slider, config);