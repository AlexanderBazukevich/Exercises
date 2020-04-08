const slides = [
    {
        picture: "../images/mag01.jpg",
    },
    {
        picture: "../images/mag02.jpg",
    },
    {
        picture: "../images/mag03.jpg",
    },
    {
        picture: "../images/mag04.jpg",
    },
    {
        picture: "../images/mag05.jpg",
    },
    {
        picture: "../images/mag06.jpg",
    }
]

const slider = document.querySelector('.slider');
let sliderHtml = '';

slides.forEach( (item) => {
    sliderHtml += `
    <div class = "slider__item">
        <img class="slider__image" src=${item.picture}>
    </div>
    `
})

slider.innerHTML = sliderHtml;

const sliderItems = document.querySelectorAll('.slider__item');

let i = 1;
sliderItems.forEach( (item) => {
    item.style.height = `${400 + (i * 20)}px`;
    item.style.marginRight = `-${230 - (i * 15)}px`;
    i++;
    item.addEventListener('mouseover', () => {
        item.style.marginLeft = '-15px';
    })
    item.addEventListener('mouseout', () => {
        item.style.marginLeft = '0';
    })
})

