
const ctx = document.getElementById('myChart').getContext('2d');
const xlabels = ['recovered' , 'critical' , 'dead'];

const chart = new Chart(ctx, {
type: 'bar',

data: {
    labels: xlabels,
    datasets: [{
        //label: 'recovered, critical and dead',
        backgroundColor: ['rgb(252, 197, 13)', 'rgb(217, 94, 50)' , 'rgb(176, 63, 78)' ],
        hoverBackgroundColor: 'red',
        borderColor: ['rgb(252, 197, 13)', 'rgb(217, 94, 50)' , 'rgb(176, 63, 78)' ],
        data: [0, 0, 0],            
    }]
},

options: {
    legend: {
        display: false
    },

    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                max: 40000000
            }
        }]
    },

}});

var eraseBtn = document.getElementById('btn-erase');
eraseBtn.addEventListener('click',eraseChart,true);

function eraseChart(){
    chart.data.datasets[0].data = [0 , 0 , 0];
    chart.update();
}


var showLocalBtn =document.getElementById('btn-show');
showLocalBtn.addEventListener('click',showAgain,true);

var recovered;
var dead;
var critical;

function showAgain(){
    chart.data.datasets[0].data[0] = recovered;
    chart.data.datasets[0].data[1] = critical;
    chart.data.datasets[0].data[2] = dead;

    chart.update();


}


var fetchBtn = document.getElementById('btn-fetch');
fetchBtn.addEventListener('click',hideshow,true);
fetchBtn.addEventListener('click',getData,true);

function hideshow() {
    document.getElementById('btn-fetch').style.display = 'none';
    document.getElementById('btn-show').style.display = 'block';  
    this.style.display = 'none'
} 

async function getData() {
const response = await fetch("https://covid-19-data.p.rapidapi.com/totals", {
  "method": "GET",
  "headers": {
      "x-rapidapi-key": "d369acc5c6msh788e3036860aaa0p197e81jsnefe6228cd71c",
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
    }
})
const chartData = await response.json();
console.log(chartData);


function renderHTML(dataFromAPI){
    var htmlString = "";
    htmlString += "        recovered: " + dataFromAPI[0].recovered +  " ,        critical: " + dataFromAPI[0].critical + " ,        dead:"  + dataFromAPI[0].deaths;
    console.log(htmlString);

    chart.data.datasets[0].data[0] = dataFromAPI[0].recovered;
    chart.data.datasets[0].data[1] = dataFromAPI[0].critical;
    chart.data.datasets[0].data[2] = dataFromAPI[0].deaths;

    recovered = dataFromAPI[0].recovered;
    critical = dataFromAPI[0].critical;
    dead = dataFromAPI[0].deaths;

    var elem = document.getElementById('writtenInfo');
    elem.innerHTML = htmlString;
}
renderHTML(chartData);

chart.update();

}

//datele preluate din api sunt stocate in variabile
