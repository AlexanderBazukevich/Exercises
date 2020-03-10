let options = document.querySelector('.options');
let search = document.querySelector('.search');
let optionsItems = ['NewYork', 'Mexico', 'Amsterdam', 'Newcastle' , 'Grodno', 'Vienna', 'Warsaw', 'Bagdad', 'Porto', 'Milan', 'Athens', 'Paris', 'Parma'];
let resultItems = [];

showItems(optionsItems);

search.addEventListener('focus', () => {
    document.addEventListener('keyup', () => {
        let key = search.value
        optionsItems.forEach( (item) => {
            if (item.toLowerCase().match(key) && item.toLowerCase().startsWith(key)) {
                resultItems.push(item);
                };
        })
        
        clearItems();
        showItems(resultItems);

        resultItems = [];
    })
})

function showItems(array) {

    let fragment = document.createDocumentFragment();

    array.forEach( (item) => {
        let li = document.createElement('li');
        li.textContent = item;
        fragment.appendChild(li);
    })

    options.appendChild(fragment);
}

function clearItems() {
    child = options.lastElementChild;

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

