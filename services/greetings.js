export const randomListCompletionMessage = () => {
  const messages = [
    'Nailed It!',
    'Gettin’ things DONE!',
    'Like a boss!',
    'Handled!',
    'All Finished!',
    'Knocked it outta the park!',
    'What a day, what a day!',
    '#productivity',
    'What task list?',
    'That list didn’t stand a chance!',
    'What else you got?',
    'Easy stuff!',
    'Check, check, and check!',
    'Crushin’ It!',
    'Woot woot!',
    'Another one bites the dust!',
    'Who wants some? Who’s next?',
    'Cheers!',
    'Victory!',
    'And they said it couldn’t be done!',
    'Can’t touch this!',
    'This is how we do it!',
  ]
  const randomIndex = Math.floor(Math.random() * messages.length)
  return messages[randomIndex]
}
