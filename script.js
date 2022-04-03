const apiKey = 'AIzaSyD9-osvn__x0twRkNiNtjq_jueAGwmZ1ms'
// salt fat acid heat, isbn:9781476753836

// let isbn = prompt('enter isbn')

const getBookLengthByIsbn = async (isbn) => {
    const getData = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`)
    let pageCount = getData.data.items[0].volumeInfo.pageCount
    let bookTitle = getData.data.items[0].volumeInfo.title
    let bookAuthor = getData.data.items[0].volumeInfo.authors[0]
    console.log(`"${bookTitle}" by ${bookAuthor} is approximately ${pageCount} pages.`)
    console.log(`pageCount == ${pageCount}`)
    return pageCount
}

let bookLengthInPages = getBookLengthByIsbn(9781476753836)

const estimateWords = (pagesPerBook) => {
    console.log(`here's ${pagesPerBook}`)
    let wordsPerPage = 275 // assuming an average of 275 words per page in a book
    let totalWords = (wordsPerPage * pagesPerBook)
    return totalWords 
}

let wordsInBook = estimateWords(bookLengthInPages)

const howLongToRead = () => {}



// const setReadingSpeed = () => {
//     // get a WPM from the browser prompt
//     let readingSpeed = prompt('enter your reading speed in WPM. The average is 300')
    
//     // shave off any leading or trailing spaces
//     readingSpeed.trim()

//     // validate that the input is a number
//     if (typeof readingSpeed == 'number') {
//         alert(`Your reading speed is ${readingSpeed} WPM`)
//     } else {
//         alert(`Please refresh and try again.`)
//     }

//     // convert the string to a number so we can validate min and max
//     readingSpeed = parseInt(readingSpeed)

//     // validate the min and max
//     if (readingSpeed < 200) {
//         alert(`Your reading speed is less than 200 WPM. That's about the speed at which we talk.`)
//     } else if (readingSpeed < 300) {
//         alert(`Your reading speed is between 200-300 wpm. Just average!`)
//     } else if (reading < 700) {
//         alert(`Whoa! Your reading is speed is above average. 300-700 WPM.`)
//     } else if (reading > 700) {
//         alert(`Holy-...You're a speed demon at over 700 WPM!!`)
//     }
//     console.log(readingSpeed)
//     return readingSpeed
// }
// setReadingSpeed()