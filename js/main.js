const loadBooks = () => {
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
    const showNumber = document.getElementById('result-number');
    showNumber.style.display = 'block';
    console.log(showNumber);

    const bookDisplay = document.getElementById('book-display');
    bookDisplay.innerHTML = '';
    if (bookData.length === 0) {
        bookDisplay.innerHTML = `
      <h1>No result to show.</h1>
      `
    } else {
        bookData.forEach(books => {
            const bookCoverUrl = `https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg`
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('col');
            bookDiv.innerHTML = `
        <div class="card h-100">
             <img src="${bookCoverUrl}" class="card-img-top img-fluid" alt="...">
             <div class="card-body">
                <h5 class="card-title">${books.title}</h5>
              
              </div>
             <div class="">
               <p class="">Written by ${books.author_name}</p>
               <small>Published at ${books.first_publish_year}</small>
               
             </div>
            </div>
    
        `
            bookDisplay.appendChild(bookDiv);


        })
    }

}