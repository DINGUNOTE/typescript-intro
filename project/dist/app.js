// utils
function $(selector) {
    const element = document.querySelector(selector);
    return element;
}
function getUnixTimestamp(date) {
    return new Date(date).getTime();
}
// DOM
const confirmedTotal = $('.confirmed-total');
const deathsTotal = $('.deaths');
const recoveredTotal = $('.recovered');
const lastUpdatedTime = $('.last-updated-time');
const rankList = $('.rank-list');
const deathsList = $('.deaths-list');
const recoveredList = $('.recovered-list');
const deathSpinner = createSpinnerElement('deaths-spinner');
const recoveredSpinner = createSpinnerElement('recovered-spinner');
function createSpinnerElement(id) {
const wrapperDiv = document.createElement('div');
wrapperDiv.setAttribute('id', id);
wrapperDiv.setAttribute('class', 'spinner-wrapper flex justify-center align-center');
const spinnerDiv = document.createElement('div');
spinnerDiv.setAttribute('class', 'ripple-spinner');
spinnerDiv.appendChild(document.createElement('div'));
spinnerDiv.appendChild(document.createElement('div'));
wrapperDiv.appendChild(spinnerDiv);
return wrapperDiv;
}
// state
let isDeathLoading = false;
// api
function fetchCovidSummary() {
    const url = 'https://api.covid19api.com/summary';
    return axios.get(url);
}
var CovidStatus;
(function (CovidStatus) {
    CovidStatus["Confirmed"] = "confirmed";
    CovidStatus["Recovered"] = "recovered";
    CovidStatus["Deaths"] = "deaths";
})(CovidStatus || (CovidStatus = {}));
function fetchCountryInfo(countryName, status) {
    // params: confirmed, recovered, deaths
    const url = `https://api.covid19api.com/country/${countryName}/status/${status}`;
    return axios.get(url);
}
// methods
function startApp() {
    setupData();
    initEvents();
}
// events
function initEvents() {
    if (!rankList) {
        return;
    }
    rankList.addEventListener('click', handleListClick);
}
async function handleListClick(event) {
    let selectedId;
    if (event.target instanceof HTMLParagraphElement ||
        event.target instanceof HTMLSpanElement) {
        selectedId = event.target.parentElement
            ? event.target.parentElement.id
            : undefined;
    }
    if (event.target instanceof HTMLLIElement) {
        selectedId = event.target.id;
    }
    if (isDeathLoading) {
        return;
    }
    clearDeathList();
    clearRecoveredList();
    startLoadingAnimation();
    isDeathLoading = true;
    const { data: deathResponse } = await fetchCountryInfo(selectedId, CovidStatus.Deaths);
    const { data: recoveredResponse } = await fetchCountryInfo(selectedId, CovidStatus.Recovered);
    const { data: confirmedResponse } = await fetchCountryInfo(selectedId, CovidStatus.Confirmed);
    endLoadingAnimation();
    setDeathsList(deathResponse);
    setTotalDeathsByCountry(deathResponse);
    setRecoveredList(recoveredResponse);
    setTotalRecoveredByCountry(recoveredResponse);
    setChartData(confirmedResponse);
    isDeathLoading = false;
}
function setDeathsList(data) {
    const sorted = data.sort((a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date));
    sorted.forEach((value) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'list-item-b flex align-center');
        const span = document.createElement('span');
        span.textContent = value.Cases.toString();
        span.setAttribute('class', 'deaths');
        const p = document.createElement('p');
        p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
        li.appendChild(span);
        li.appendChild(p);
        deathsList.appendChild(li);
    });
}
function clearDeathList() {
    if (!deathsList) {
        return;
    }
    deathsList.innerHTML = '';
}
function setTotalDeathsByCountry(data) {
    deathsTotal.innerText = data[0].Cases.toString();
}
function setRecoveredList(data) {
    const sorted = data.sort((a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date));
    sorted.forEach((value) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'list-item-b flex align-center');
        const span = document.createElement('span');
        span.textContent = value.Cases.toString();
        span.setAttribute('class', 'recovered');
        const p = document.createElement('p');
        p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
        li.appendChild(span);
        li.appendChild(p);
        recoveredList === null || recoveredList === void 0 ? void 0 : recoveredList.appendChild(li);
    });
}
function clearRecoveredList() {
    recoveredList.innerHTML = '';
}
function setTotalRecoveredByCountry(data) {
    recoveredTotal.innerText = data[0].Cases.toString();
}
function startLoadingAnimation() {
    deathsList.appendChild(deathSpinner);
    recoveredList.appendChild(recoveredSpinner);
}
function endLoadingAnimation() {
    deathsList.removeChild(deathSpinner);
    recoveredList.removeChild(recoveredSpinner);
}
async function setupData() {
    const { data } = await fetchCovidSummary();
    setTotalConfirmedNumber(data);
    setTotalDeathsByWorld(data);
    setTotalRecoveredByWorld(data);
    setCountryRanksByConfirmedCases(data);
    setLastUpdatedTimestamp(data);
}
let myChart;
function renderChart(data, labels) {
    const lineChart = $('#lineChart');
    const ctx = lineChart.getContext('2d');
    if (!ctx) {
        return;
    }
    if (myChart !== undefined) {
        myChart.destroy();
    }
    Chart.defaults.color = '#f5eaea';
    Chart.defaults.font.family = 'Exo 2';
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Confirmed for the last two weeks',
                    backgroundColor: '#feb72b',
                    borderColor: '#feb72b',
                    data,
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
        },
    });
}
function setChartData(data) {
    const chartData = data
        .slice(-14)
        .map((value) => value.Cases);
    const chartLabel = data
        .slice(-14)
        .map((value) => new Date(value.Date).toLocaleDateString().slice(5, -1));
    renderChart(chartData, chartLabel);
}
function setTotalConfirmedNumber(data) {
    confirmedTotal.innerText = data.Countries.reduce((total, current) => (total += current.TotalConfirmed), 0).toString();
}
function setTotalDeathsByWorld(data) {
    deathsTotal.innerText = data.Countries.reduce((total, current) => (total += current.TotalDeaths), 0).toString();
}
function setTotalRecoveredByWorld(data) {
    recoveredTotal.innerText = data.Countries.reduce((total, current) => (total += current.TotalRecovered), 0).toString();
}
function setCountryRanksByConfirmedCases(data) {
    const sorted = data.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
    sorted.forEach((value) => {
        const li = document.createElement('li');
        li.setAttribute('class', 'list-item flex align-center');
        li.setAttribute('id', value.Slug);
        const span = document.createElement('span');
        span.textContent = value.TotalConfirmed.toString();
        span.setAttribute('class', 'cases');
        const p = document.createElement('p');
        p.setAttribute('class', 'country');
        p.textContent = value.Country;
        li.appendChild(span);
        li.appendChild(p);
        rankList.appendChild(li);
    });
}
function setLastUpdatedTimestamp(data) {
    lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}
startApp();