const baseUrl = `https://www.googleapis.com/books/v1/volumes?q=`
const apiKey = config.BOOKS_API_KEY
const searchResultsDiv = document.body.querySelector(`.searchResults`)

const searchBooks = async (query) => {
    query = document.getElementById('searchLabel').value
    const getData = await axios.get(`${baseUrl}${query}&key=${apiKey}`)
    for (let i = 0; i < 5; i++) {
        const resultDiv = document.createElement('div')
        resultDiv.innerHTML = `<p>${i+1}: "${getData.data.items[i].volumeInfo.title}" by ${getData.data.items[i].volumeInfo.authors[0]}</p>`
        const isbnBtn = document.createElement('button')
        isbnBtn.innerText = `HLTR? 📖`
        console.log(`${getData.data.items[i].volumeInfo.industryIdentifiers[0].identifier}`)
        isbnBtn.addEventListener("click", ()=>{
            howLongToRead(`${getData.data.items[i].volumeInfo.industryIdentifiers[0].identifier}`)
        })
        searchResultsDiv.appendChild(resultDiv)
        resultDiv.appendChild(isbnBtn)
    }
}

const trimIsbn = (arr) => {
    let newString = ''  
    arr = arr.split('')
    for (let i = 0; i < arr.length; i++) {
      if (isNaN(arr[i]) == false) {
        newString += arr[i]
      } 
    }
    return newString
}

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
    document.getElementById('result').innerText = output
    return output
}

// build the search results section
const searchBtn = document.createElement('button')
searchBtn.innerText = `Search`
searchBtn.classList.add('button')
searchBtn.setAttribute('type','button')
document.getElementById('searchForm').appendChild(searchBtn)
searchBtn.addEventListener('click', searchBooks)