const apiKey = 'AIzaSyD9-osvn__x0twRkNiNtjq_jueAGwmZ1ms'
// salt fat acid heat, isbn:9781476753836
// east of eden, isbn:9780141923505

const howLongToRead = async (isbn) => {
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
    return output
}

howLongToRead(9780141923505)