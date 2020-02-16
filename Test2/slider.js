const slides = [
    {
        data_id: "0",
        title: "Sees!",
        picture: "../images/mag01.jpg",
        content: "Voluptate elit elit ipsum velit ea ipsum consequat in anim eiusmod. Veniam cupidatat consequat laboris commodo qui amet ea aliquip laborum. Anim Lorem eu voluptate eiusmod cillum reprehenderit reprehenderit sint aliqua id. Mollit culpa occaecat ea labore pariatur laboris tempor aute est excepteur sunt. Magna in eiusmod ex eiusmod reprehenderit et do quis pariatur nisi. Laboris laboris id eu amet elit elit excepteur commodo commodo eiusmod ipsum ullamco.",
    },
    {
        data_id: "1",
        title: "Forests!",
        picture: "../images/mag02.jpg",
        content: "Aute proident adipisicing Lorem id duis fugiat. Reprehenderit eiusmod ullamco elit sit fugiat ex non deserunt. Proident tempor irure qui dolore Lorem minim nulla aute Lorem tempor non anim.",
    },
    {
        data_id: "2",
        title: "Sunsets!",
        picture: "../images/mag03.jpg",
        content: "Ullamco occaecat reprehenderit dolore. Excepteur sint id sint dolore dolore nulla ex reprehenderit nostrud. Officia ea labore cupidatat officia id eu labore qui ullamco exercitation do ut consequat. Eu commodo exercitation in eu irure.",
    },
    {
        data_id: "3",
        title: "Castles!",
        picture: "../images/mag04.jpg",
        content: "Ullamco ut voluptate minim Lorem. reprehenderit anim sunt pariatur. Lorem est elit pariatur sint duis voluptate elit eiusmod. Deserunt proident excepteur consequat non. Adipisicing dolore nulla mollit esse Lorem consectetur cupidatat ea aliqua nisi amet incididunt.",
    },
    {
        data_id: "4",
        title: "Roads!",
        picture: "../images/mag05.jpg",
        content: "Nostrud dolor ut id ex nisi officia aliquip cillum aliqua reprehenderit anim sunt pariatur. Lorem est elit pariatur sint duis voluptate elit eiusmod. Deserunt proident excepteur consequat non. Adipisicing dolore nulla mollit esse Lorem consectetur cupidatat ea aliqua nisi amet incididunt.",
    },
    {
        data_id: "5",
        title: "Mountains!",
        picture: "../images/mag06.jpg",
        content: "Nostrud dolor ut id ex nisi officia aliquip cillum aliqua reprehenderit anim sunt pariatur. Lorem est elit pariatur sint duis voluptate elit eiusmod. Deserunt proident excepteur consequat non. Adipisicing dolore nulla mollit esse Lorem consectetur cupidatat ea aliqua nisi amet incididunt.",
    },
    {
        data_id: "6",
        title: "Lakes!",
        picture: "../images/mag07.jpg",
        content: "Nostrud dolor ut id ex nisi officia aliquip cillum aliqua reprehenderit anim sunt pariatur. Lorem est elit pariatur sint duis voluptate elit eiusmod. Deserunt proident excepteur consequat non. Adipisicing dolore nulla mollit esse Lorem consectetur cupidatat ea aliqua nisi amet incididunt.",
    },    
    {
        data_id: "7",
        title: "Rocks!",
        picture: "../images/mag08.jpg",
        content: "Nostrud dolor ut id ex nisi officia aliquip cillum aliqua reprehenderit anim sunt pariatur. Lorem est elit pariatur sint duis voluptate elit eiusmod. Deserunt proident excepteur consequat non. Adipisicing dolore nulla mollit esse Lorem consectetur cupidatat ea aliqua nisi amet incididunt.",
    }
]

const slider = document.querySelector('.slider');
let sliderHtml = "";
let swipeLength = 0;
let sliderHalfWidth = slider.offsetWidth/2;
let visibleItems = 3;

slides.forEach( (item) => {
    sliderHtml += `
    <div class = "slider__item" id = "${item.data_id}">
        <div class="slider__image"><img class="slider__picture" src=${item.picture}></div>
        <h2 class="slider__title slider__title_small">${item.title}</h2>
        <p class="slider__description">${item.content}</p>
    </div>
    `
})
slider.innerHTML += sliderHtml;

const sliderItems = document.querySelectorAll('.slider__item');
let elementWidth = sliderItems[0].offsetWidth;

document.addEventListener('keydown', (event) => {
    if (event.keyCode == 37 && swipeLength != 0) {
        swipeLeft();
    }

    if (event.keyCode == 39 && swipeLength != -elementWidth * (sliderItems.length - visibleItems)) {
        swipeRight();
    }
})

slider.addEventListener('click', (event) => {
        let eventX = event.clientX;
        // console.log(sliderHalfWidth);
        // console.log(eventX);
        // console.log(slider.offsetWidth);
        // console.log(event);
        // console.log(event.target);

        if (eventX <= sliderHalfWidth && swipeLength != 0) {
            swipeLeft();
        }

        if (eventX > sliderHalfWidth && swipeLength != -elementWidth * (sliderItems.length - visibleItems)) {
            swipeRight();
        }
})

function swipeLeft() {
    swipeLength += elementWidth;
    sliderItems[0].style.marginLeft = `${swipeLength}px`;
}

function swipeRight() {
    swipeLength -= elementWidth;
    sliderItems[0].style.marginLeft = `${swipeLength}px`;
}