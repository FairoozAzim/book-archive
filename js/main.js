const loadBooks = () => {
    fetch('http://openlibrary.org/search.json?q=javascript')
        .then(response => response.json())
        .then(data => console.log(data.docs));
}
const displayBooks = ()