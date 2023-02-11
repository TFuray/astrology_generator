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
  'pices'
]

const apiUrl = 'https://aztro.sameerkumar.website?sign='

const getTodaysReadings = () => {
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
  let month = Number(document.querySelector('input').value) - 1

  fetch(apiUrl + starSigns[month] + '&day=today', {
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

      sign.innerText = starSigns[month].toUpperCase()
      desc.innerText = data.description
      compatibility.innerText= data.compatibility
      mood.innerText = data.mood
      color.innerText = data.color
      luckyNumber.innerText = data.lucky_number
      luckyTime.innerText = data.lucky_time
    })
    .catch(err => {
      console.log(`error ${err}`)
    })
}
