const bookDisplay = document.getElementById('book-display');
//show spinner

const spinnerToggle = display => {
    if (display) {
        document.getElementById('spinner').classList.remove('d-none');
        bookDisplay.innerHTML = '';
    } else {
        document.getElementById('spinner').classList.add('d-none');
    }
}

//search result number

const search = show => {
    if (show) {
        document.getElementById('result-number').classList.remove('d-none');
    } else {
        document.getElementById('result-number').classList.add('d-none');
    }

}
const loadBooks = () => {
    spinnerToggle(true);
    search(false);
    const bookName = document.getElementById('book-name');
    fetch(`http://openlibrary.org/search.json?q=${bookName.value}`)
        .then(response => response.json())
        .then(data => displayBooks(data.docs));
    bookName.value = '';

}

const displayBooks = (bookData) => {

    console.log(bookData.length);
    const number = document.getElementById('number');
    number.innerText = bookData.length;
    search(true);

    bookDisplay.innerHTML = '';
    if (bookData.length === 0) {
        spinnerToggle(false);
        bookDisplay.innerHTML = `
      <h3 class="text-center">Search by your favorite book name or author's name.</h3>
      `
    } else {
        bookData.forEach(books => {
            if (books.title.length > 200) {
                console.log(books.title);
                return;
            }
            let bookCoverUrl;
            if (!books.cover_i) {
                bookCoverUrl = '../unnamed.png'
            } else {
                bookCoverUrl = `https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg`
            }

            const bookDiv = document.createElement('div');
            bookDiv.classList.add('col-3')
            bookDiv.innerHTML = `
            <div class=" book-details shadow-lg rounded p-2">
                            <img class="img-fluid text-center" src="${bookCoverUrl}" alt="">
                            <h6 class="text-center">${books.title}</h6>
                            <p class="text-center">By ${books.author_name}</p>
                            <p class="text-center">Published in 1990</p>
                        </div>
                `
            bookDisplay.appendChild(bookDiv);
        })
        spinnerToggle(false);

    }


}