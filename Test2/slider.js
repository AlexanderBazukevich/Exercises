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
let sliderHtml = "";
let swipeLength = 0;
let visibleItems = 3;

slides.forEach( (item) => {
    sliderHtml += `
    <div class = "slider__item">
        <img class="slider__image" src=${item.picture}>
        <h2 class="slider__title">${item.title}</h2>
        <p class="slider__description">${item.content}</p>
    </div>
    `
})
slider.innerHTML += sliderHtml;

const sliderItems = document.querySelectorAll('.slider__item');

document.addEventListener('keydown', (event) => {

    let elementWidth = Math.round(slider.offsetWidth / visibleItems);

    if (event.keyCode == 37 && swipeLength != 0) {
        swipeLeft(elementWidth);
    }

    if (event.keyCode == 39 && swipeLength != -elementWidth * (sliderItems.length - visibleItems)) {
        swipeRight(elementWidth);
    }
})

slider.addEventListener('click', (event) => {
        let eventX = event.clientX;
        let sliderHalfWidth = Math.round(slider.offsetWidth / 2);
        let elementWidth = Math.round(slider.offsetWidth / visibleItems);

        if (eventX <= sliderHalfWidth && swipeLength != 0) {
            swipeLeft(elementWidth);
        }

        if (eventX > sliderHalfWidth && swipeLength != -elementWidth * (sliderItems.length - visibleItems)) {
            swipeRight(elementWidth);
        }
        console.log(swipeLength);
})

function swipeLeft(width) {
    swipeLength += width;
    sliderItems[0].style.marginLeft = `${swipeLength}px`;
}

function swipeRight(width) {
    swipeLength -= width;
    sliderItems[0].style.marginLeft = `${swipeLength}px`;
}