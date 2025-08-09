const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];
app.get('/books', (req, res) => {
    res.status(200).json(books);
});
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send('Book not found.');
    }
});
app.post('/books', (req, res) => {
    const newBook = req.body;
    if (!newBook.title || !newBook.author) {
        res.status(400).send('Please provide a title and author for the book.');
        return;
    }
    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    newBook.id = newId;
    books.push(newBook);
    res.status(201).json(newBook);
});
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        const updatedData = req.body;
        books[bookIndex].title = updatedData.title || books[bookIndex].title;
        books[bookIndex].author = updatedData.author || books[bookIndex].author;
        res.status(200).json(books[bookIndex]);
    } else {
        res.status(404).send('Book not found.');
    }
});
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Book not found.');
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
