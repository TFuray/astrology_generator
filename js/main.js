document
  .querySelector('button')
  .addEventListener('click', getTodaysReadingsByMonth)

const starSigns = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces'
]

const apiUrl = 'https://aztro.sameerkumar.website?sign='

const getTodaysReadingsAll = () => {
  starSigns.forEach(sign => {
    fetch(apiUrl + sign + '&day=today', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(`error ${err}`)
      })
  })
}

function getTodaysReadingsByMonth () {
  let signInput = document.querySelector('input').value.toLowerCase()
  starSigns.includes(signInput)
    ? fetch(apiUrl + signInput + '&day=today', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          function toggleHidden () {
            const listP = document.querySelectorAll('p')
            for (const element of listP) {
              element.classList.toggle('hidden')
            }
          }
          toggleHidden()

          const sign = document.querySelector('#sign')
          const desc = document.querySelector('#desc')
          const compatibility = document.querySelector('#compatability')
          const mood = document.querySelector('#mood')
          const color = document.querySelector('#color')
          const luckyNumber = document.querySelector('#luckyNumber')
          const luckyTime = document.querySelector('#luckyTime')

          sign.innerText = signInput.toUpperCase()
          desc.innerText = data.description
          compatibility.innerText = data.compatibility
          mood.innerText = data.mood
          color.innerText = data.color
          luckyNumber.innerText = data.lucky_number
          luckyTime.innerText = data.lucky_time
        })
        .catch(err => {
          console.log(`error ${err}`)
        })
    : document.querySelector('h3').classList.toggle('hidden')
}
