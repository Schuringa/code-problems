const inquirer = require('inquirer')
const rp = require('request-promise')
const chalk = require('chalk')
const figlet = require('figlet')
const cheerio = require('cheerio')

const displayBanner = () => {
  console.log(
    chalk.green(
      figlet.textSync('Problem One', {
        font: 'big',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  )
  console.log(
    chalk.green(
      'Simple script that accepts URL and a single word that then returns the number of instances the word is found at the destination URL.'
    )
  )
}

const askQuestions = () => {
  const questions = [
    {
      name: 'url',
      type: 'input',
      message: 'What is the URL you want to search?',
      validate: function validateUrl (url) {
        const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi
        const regex = new RegExp(expression)
        return url.match(regex) !== null
      }
    },
    {
      name: 'word',
      type: 'input',
      message: 'What is the word you want to search for?',
      validate: function validateWord (word) {
        const expression = /^[A-Za-z]+$/g
        const regex = new RegExp(expression)
        return word.match(regex) !== null
      }
    }
  ]
  return inquirer.prompt(questions)
}

const run = async () => {
  // show script introduction
  displayBanner()

  // ask questions
  const answers = await askQuestions()
  const { word, url } = answers

  // Get url html response
  const pageHtml = await rp(url)

  // Load the HTML code as a string, which returns a Cheerio instance
  const $ = cheerio.load(pageHtml)
  const pageText = $('body').text()

  // Search for word
  const wordArray =
  pageText.toLowerCase()
    .match(new RegExp(`\\b${word.toLowerCase()}`, 'g')) || []

  console.log(
    chalk.green(
      `The word ${word} occured ${
        wordArray.length
      } time(s) at the destination URL.`
    )
  )
}

run()
