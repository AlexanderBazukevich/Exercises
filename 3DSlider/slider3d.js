const slides = [
    {   
        id: "0",
        picture: "../images/mag01.jpg",
    },
    {
        id: "1",
        picture: "../images/mag02.jpg",
    },
    {
        id: "2",
        picture: "../images/mag03.jpg",
    },
    {
        id: "3",
        picture: "../images/mag04.jpg",
    },
    {
        id: "4",
        picture: "../images/mag05.jpg",
    },
    {
        id: "5",
        picture: "../images/mag06.jpg",
    }
]

const slider = document.querySelector('.slider');
let sliderHtml = '';

slides.forEach( (item) => {
    sliderHtml += `
    <div class="slider__item" id="${item.id}">
        <img class="slider__image" src=${item.picture}>
    </div>
    `
})

slider.innerHTML = sliderHtml;

let sliderItems = document.querySelectorAll('.slider__item');

showSlider();
listenToHover()
let activeIndex = sliderItems.length - 1;

// sliderItems.forEach( (item) => {
    slider.addEventListener('click', () => {
        let index = getSelectedItemIndex(event);

        for (let i = sliderItems.length - 1; i > index; i--) {

            let animation = sliderItems[i].firstElementChild.animate([
                {marginLeft: `0px`},
                {marginLeft: `800px`},
            ], 500);
            animation.onfinish = () => {
                slider.insertBefore(sliderItems[i], slider.firstChild);
                showSlider();
            }
        }
    });
// });

listenToHover();

function showSlider() {
    sliderItems = document.querySelectorAll('.slider__item');
    let i = 0;
    let j = 0;
    sliderItems.forEach( (item) => {
        item.setAttribute('id', `${j}`)
        j++;
        item.style.height = `${400 + (i * 10)}px`;
        item.style.marginRight = `${10 + i * 15}px`;
        i += 2;
    })
}
function listenToHover() {
    sliderItems.forEach( (item) => {
        item.addEventListener('mouseover', () => {
            item.firstElementChild.style.marginLeft = '-20px';
        })
        item.addEventListener('mouseout', () => {
            item.firstElementChild.style.marginLeft = '0';
        })
    })
}
function getSelectedItemIndex(event) {
    let e = event.target;
    let index;

    if (e == slider || (e.parentElement == slider && e.getAttribute('id') == null)) {
        return index;
    }

    if (e.parentElement === slider) {
        index = Number(e.getAttribute('id'));
    }

    while (e.parentElement != slider) {

        e = e.parentElement;

        if (e.parentElement == slider) {
            index = Number(e.getAttribute('id'));
        }
    }

    return index;
}
