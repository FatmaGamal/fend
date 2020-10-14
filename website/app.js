/* Global Variables */
// Personal API Key for OpenWeatherMap API
const PUBLIC_KEY = 'de09a960a4d4eca4b1898b5859b44859';
let callUrl = `http://api.openweathermap.org/data/2.5/weather?zip=`;
let publicKeyUrl = `&appid=${PUBLIC_KEY}`

// Create a new date instance dynamically with JS
function createDate() {
    let d = new Date();
    return newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
}

function updateUI(data) {
    // Updating Virtual DOM
    const DOC_FRAGMENT = document.createDocumentFragment();
    let entry = document.createElement('div');
    entry.setAttribute('id', 'entryHolder');
    let date = document.createElement('div');
    date.setAttribute('id', 'date');
    date.textContent = `Date: ${data.date}`;
    let temp = document.createElement('div');
    temp.setAttribute('id', 'temp');
    temp.textContent = `Temperature: ${data.temp}`;
    let content = document.createElement('div');
    content.setAttribute('id', 'content');
    content.textContent = `How you are feeling: ${data.response}`;

    // Appending Virtual DOM to Actual DOM
    entry.append(date);
    entry.append(temp);
    entry.append(content);
    DOC_FRAGMENT.append(entry);
    document.querySelector('.holder.entry').replaceChild(DOC_FRAGMENT, document.querySelector('#entryHolder'));
}

/* Function to POST data */
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(data)
    });
    try {
        const res = await result.json();
        console.log(res);

    }
    catch(error) {
        console.log(`error: ${error}`);
    }
}

/* Function to GET Project Data */
const getData = async (url) => {
    const result = await fetch(url);
    try {
        const res = await result.json();
        console.log(res);
        return res;
    }
    catch (error) {
        console.log(`error: ${error}`)
    }
}


// Event listener to add function to existing HTML DOM element
let updateWeatherForecastBtn = document.getElementById('generate');
updateWeatherForecastBtn.addEventListener('click', (e) => {
    let currentFeeling = document.getElementById('feelings').value;
    let zipCode = document.getElementById('zip').value;

    // get current data from weatherAPI
    getData(callUrl + zipCode + publicKeyUrl).then(function(data) {
        // update DB of data array
        let newData = {temp: data.main.temp, response: currentFeeling, date: createDate()}
        postData('/update', newData).then(function(){
            // update UI with updated DB
            getData('/getLatest').then(function(data) {
                updateUI(data);
            });
        });
    });

})
