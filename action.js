if (annyang){
    const commands = {
      'hello': () => alert('Hello World'),
      'change the color to *color': changeBackgroundColor,
      'navigate to *page': navigateToPage
    };
    annyang.addCommands(commands);
}
  
function changeBackgroundColor(color){
    document.body.style.backgroundColor = color.toLowerCase();
}
  
function navigateToPage(page){
    window.location.href = `${page.toLowerCase()}.html`;
}

document.getElementById('turnOnAudio').addEventListener('click', () => annyang.start());
document.getElementById('turnOffAudio').addEventListener('click', () => annyang.abort());

fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(data => {
    document.getElementById('quote').innerHTML = `"${data.content}" - ${data.author}`;
});

const API_KEY = 'UYJ7Cqdlh87gJSn6SizK1NWx9LLvo0nR';
document.getElementById('lookupStock').addEventListener('click', () => {
  const ticker = document.getElementById('stockTicker').value;
  const days = document.getElementById('timeRange').value;
  fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${getDateRange(days)}?apiKey=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const dates = data.results.map(item => new Date(item.t).toLocaleDateString());
      const closes = data.results.map(item => item.c);
      renderChart(dates, closes);
    });
});

function renderChart(labels, data) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Closing Price',
          data: data,
          borderColor: 'rgb(75, 192, 192)'
        }]
      }
    });
}

fetch('https://tradestie.com/api/v1/apps/reddit')
  .then(response => response.json())
  .then(data => {
    const top5 = data.slice(0, 5);
    renderStockTable(top5);
});

function renderStockTable(stocks) {
    const table = document.getElementById('stockTable');
    stocks.forEach(stock => {
      const row = table.insertRow();
      row.insertCell(0).innerHTML = `<a href="https://finance.yahoo.com/quote/${stock.ticker}" target="_blank">${stock.ticker}</a>`;
      row.insertCell(1).textContent = stock.comment_count;
      const sentimentCell = row.insertCell(2);
      sentimentCell.innerHTML = stock.sentiment === 'Bullish' ? '🐂' : '🐻';
    });
}

'lookup *stock'; function(stock) {
  document.getElementById('stockTicker').value = stock.toUpperCase();
  document.getElementById('lookupStock').click();
}

fetch('https://dog.ceo/api/breeds/image/random/10')
  .then(response => response.json())
  .then(data => {
    const slider = document.getElementById('dogSlider');
    data.message.forEach(imgUrl => {
      const img = document.createElement('img');
      img.src = imgUrl;
      slider.appendChild(img);
    });
    simpleSlider.init();
});

fetch('https://api.thedogapi.com/v1/breeds')
  .then(response => response.json())
  .then(data => {
    const breedsContainer = document.getElementById('breedButtons');
    data.forEach(breed => {
      const btn = document.createElement('button');
      btn.className = 'custom-btn';
      btn.textContent = breed.name;
      btn.addEventListener('click', () => showBreedInfo(breed));
      breedsContainer.appendChild(btn);
    });
});

function showBreedInfo(breed) {
    const infoDiv = document.getElementById('breedInfo');
    infoDiv.innerHTML = `
        <h3>${breed.name}</h3>
        <p>${breed.temperament || 'No temperament info'}</p>
        <p>Life Span: ${breed.life_span}</p>
    `;
    infoDiv.style.display = 'block';
}

'load dog breed *breed'; function(breed) {
  const buttons = document.querySelectorAll('#breedButtons button');
  const foundBtn = Array.from(buttons).find(btn => btn.textContent.toLowerCase().includes(breed.toLowerCase()));
  if (foundBtn) foundBtn.click();
}