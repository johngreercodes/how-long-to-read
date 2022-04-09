// salt fat acid heat, isbn:9781476753836
// east of eden, isbn:9780141923505

const baseUrl = `https://www.googleapis.com/books/v1/volumes?q=`
const apiKey = config.BOOKS_API_KEY

const searchBooks = async (query) => {
    const getData = await axios.get(`${baseUrl}${query}&key=${apiKey}`)
    console.log(getData.data)
}

searchBooks(prompt('search term'))

const howLongToRead = async (isbn) => {
    isbn = document.getElementById('label').value
    const getData = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`)
    let pageCount = getData.data.items[0].volumeInfo.pageCount
    let bookTitle = getData.data.items[0].volumeInfo.title
    let bookAuthor = getData.data.items[0].volumeInfo.authors[0]
    let estWordsPerPage = 250 // big ol assumption right here
    let totalWords = (estWordsPerPage * pageCount)
    let wordsPerMinute = 275 // 250 is the average; in the future we should custom set this
    let timeToReadInMinutes = (totalWords / wordsPerMinute)
    let hours = Math.floor(timeToReadInMinutes / 60)
    let minutes = parseInt(timeToReadInMinutes % 60)
    let output = `Reading "${bookTitle}" by ${bookAuthor} would take approximately ${hours} hours and ${minutes} minutes.`
    console.log(output)
    document.getElementById('result').innerText = output
    return output
}

const btn = document.createElement('button')
btn.innerText = `How long to read?`
btn.classList.add('button')
btn.setAttribute('type','button')
document.getElementById('form').appendChild(btn)
btn.addEventListener('click', howLongToRead)