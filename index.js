import clipboardy from 'clipboardy'
import 'colors'

// Read input from args
let text = process.argv
  .slice(2)
  .join(' ')
  .trim()

// Read input from clipboard
let clipboardUsed = false
if (!text) {
  text = clipboardy.readSync().trim()
  clipboardUsed = !!text
}

if (text) {
  const letters = text.split('')
  let up = null

  const regex = /[a-zA-Z]/
  const trollcased = letters
    .map(c => {
      if (c.match(regex)) {
        if (up === null) {
          up = c === c.toUpperCase()
        }

        up = !up

        return up ? c.toUpperCase() : c.toLowerCase()
      } else {
        return c
      }
    })
    .join('')

  if (clipboardUsed) {
    clipboardy.writeSync(trollcased)
  }

  console.log(trollcased)
} else {
  console.error('No text found to trollcase (checked args, stdin & clipboard).'.red)
}
