import clipboardy from 'clipboardy'
import 'colors'

// Read input from args
let text = process.argv.slice(2).join(' ').trim()

// Read input from clipboard
let clipboardUsed = false
if (!text) {
  text = clipboardy.readSync().trim()
  clipboardUsed = !!text
}

if (text) {
  const trollcased = text.replace(/[a-zA-Z]/g, trollCaseLetters).replace(/\?/g, replaceQuestionMarks)

  if (clipboardUsed) {
    clipboardy.writeSync(trollcased)
  }

  console.log(trollcased)
} else {
  console.error('No text found to trollcase (checked args, stdin & clipboard).'.red)
}

function trollCaseLetters(match) {
  if (typeof trollCaseLetters.up === 'undefined') {
    trollCaseLetters.up = match == match.toUpperCase()
  }

  trollCaseLetters.up = !trollCaseLetters.up

  return trollCaseLetters.up ? match.toUpperCase() : match.toLowerCase()
}

function replaceQuestionMarks() {
  if (typeof replaceQuestionMarks.up === 'undefined') {
    replaceQuestionMarks.up = true
  }

  replaceQuestionMarks.up = !replaceQuestionMarks.up

  return replaceQuestionMarks.up ? '?' : '¿'
}
