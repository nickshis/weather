// http://api.weatherapi.com/v1/current.json?key= 21ca158c8ebf4f03938134656231311&q=Samarkand&aqi=yes
const ctx = document.getElementById('myChart');
let random1 = Math.round(Math.random() * 15)
let random2 = Math.round(Math.random() * 15)
let random3 = Math.round(Math.random() * 15)
let random4 = Math.round(Math.random() * 15)
let random5 = Math.round(Math.random() * 15)
let random6 = Math.round(Math.random() * 15)
let random7 = Math.round(Math.random() * 15)

new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['co', 'gb-defra-index', 'no2', 'o3', 'pm2_5', 'pm10', 'so2'],
    datasets: [{
      label: 'Air quality',
      data: [random1, random2, random3, random4, random5, random6, random7],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


let form = document.forms.searcher
let inp = document.querySelector('input')
let info = document.querySelector('.info')
let pogoda = document.querySelectorAll('.box')
let time = document.querySelector('.time')
let deg = document.querySelector('.deg')
let place = document.querySelector('.place')

form.onsubmit = (e) => {
  e.preventDefault()
    fetch(`http://api.weatherapi.com/v1/current.json?key=21ca158c8ebf4f03938134656231311&q=${inp.value}&aqi=yes`)
      .then(res => res.json())
      .then(res => {
        wow(res)
      })
}

let clouds = {
  'sunny':'rgb(0, 106, 255)',
  'partly cloudy':' rgb(145, 149, 161)',
  'fog':' rgb(145, 149, 161)',
  'overcast':' rgb(145, 149, 161)',
  'clear':'rgb(0, 106, 255)',
  'light rain':'rgb(145, 149, 161)'
}

function wow(data){
  info.style.display = 'flex'
  info.style.backgroundColor = clouds[data.current.condition.text.toLowerCase()]
  pogoda.forEach(el => {
    el.style.backgroundImage = `url(${data.current.condition.icon})`
  })
  deg.innerHTML = `${data.current.temp_c}deg ${data.current.condition.text}`
  time.innerHTML = new Date().getHours() + ':' + new Date().getMinutes()
  place.innerHTML = `${data.location.name}, ${data.location.country}`
}
