const generateNewQuoteBtn = document.getElementById('new-quote')
const tweetBtn = document.getElementById('tweet')
const loader = document.querySelector('.loader')
const quoteWrapper = document.querySelector('.quote-wrapper')
let quoteText = document.getElementById('quote')
let author = document.querySelector('.author')
let quotes = []

const showLoader = () => {
  loader.hidden = false
  quoteWrapper.hidden = true
}
const hideLoader = () => {
  loader.hidden = true
  quoteWrapper.hidden = false
}

// Get Quotes
async function getQuotes() {
  showLoader()
  const url = 'https://type.fit/api/quotes'
  try {
    const response = await fetch(url)
    quotes = await response.json()
  } catch(error) {
    alert('Error: ' + error)
  }
  hideLoader()
}

// Get Single Quote
const getQuote = () => {
  const random = Math.floor(Math.random() * quotes.length)
  const quote = quotes[random]
  return quote
}

// Render New Quote
const renderQuote = (quote) => {
  quoteText.textContent = quote.text
  if (quote.author) {
    author.textContent = `- ${quote.author}`
  } else {
    author.textContent = `- Author Unknown`
  }
}

generateNewQuoteBtn.addEventListener('click', () => {
  const newQuote = getQuote()
  renderQuote(newQuote)
})

// Tweet Quote
const tweetQuote = () => {
  const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${author.textContent}`
  window.open(tweetURL, '_blank')
}

tweetBtn.addEventListener('click', tweetQuote)

getQuotes()