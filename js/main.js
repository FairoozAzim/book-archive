//bookdisplay div
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

//loading books from API
const loadBooks = () => {
    spinnerToggle(true);
    search(false);
    const bookName = document.getElementById('book-name');
    fetch(`https://openlibrary.org/search.json?q=${bookName.value}`)
        .then(response => response.json())
        .then(data => displayBooks(data.docs, data.numFound));
    bookName.value = '';

}

//book result display
const displayBooks = (bookData, numberOfresult) => {
    const number = document.getElementById('number');
    number.innerText = numberOfresult;
    search(true);
    bookDisplay.innerHTML = '';
    //if no result is found
    if (bookData.length === 0) {
        spinnerToggle(false);
        bookDisplay.innerHTML = `
      <h3 class="text-center mx-auto">Search by your favorite book's name or author's name.</h3>
      `
    } else {
        bookData.forEach(books => {
            //console.log(books);
            if (books.title.length > 200) {
                //console.log(books.title);
                return;
            }
            //setting book cover
            let bookCoverUrl;
            if (!books.cover_i) {
                bookCoverUrl = '../images/unnamed.png'
            } else {
                bookCoverUrl = `https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg`
            }

            //setting author name 
            let authorName;
            if (!books.author_name) {
                authorName = 'Unknown author'
                    //console.log(authorName);
            } else {
                authorName = books.author_name[0];
                console.log(authorName);
            }

            //setting publisher name
            let publisherName;
            if (!books.publisher) {
                publisherName = 'Unknown'
            } else {
                publisherName = books.publisher[0];
            }
            //displaying books
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('col');
            bookDiv.innerHTML = `
            <div class="d-flex align-items-center justify-content-center book-details shadow-lg rounded me-2">
                            <div class="me-3">
                                <img class="img-fluid text-center rounded" src="${bookCoverUrl}" alt="">
                            </div>
                            <div class="details">
                                <h6 class="text-left"><span class="highlights">${books.title}</span></h6>
                                <p class="text-left">By <span class="highlights">${authorName}</span></p>
                                <p class="text-left">Published in <span class="highlights">${books.first_publish_year}</span></p>
                                <p class="text-left">Publisher: <span class="highlights">${publisherName}</span></p>
                            </div>
                        </div>
                `
            bookDisplay.appendChild(bookDiv);
        })
        spinnerToggle(false);

    }


}