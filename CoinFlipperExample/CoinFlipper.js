// Class: SWE2511 - Coin Flipper DOM
// Name: Andy Dao
// Class Section: SWE 2511 121

window.onload = () => {
	/* TODO - Set up events and code to process user input */
    const goBtn = document.getElementById("submit");
    goBtn.addEventListener("click", runCoinFlipper);
}

const runCoinFlipper = (event) => {
    let numberOfCoins = document.forms["coinQueries"]["numberCoins"].value;
    let numberOfRepetitions = document.forms["coinQueries"]["numberFlips"].value;
    let errorMessages = [];

    // Prompts for and sanitizes user input
    if (isInputAnInteger(numberOfCoins)
        && numberOfCoins >= 1
        && numberOfCoins <= 10) {
        numberOfCoins = Number.parseInt(numberOfCoins);
    }
    else {
        //TODO - Don't use alert, use DOMs
        const alertDivCoins = document.createElement("div");
        alertDivCoins.setAttribute("class", "errorMessage");
        alertDivCoins.innerText =
            "Number of coins is invalid. Number of coins should be " +
            ">= 1 and <= 10 and be an integer input.";
        errorMessages.push(alertDivCoins);
    }
    if (isInputAnInteger(numberOfRepetitions)
        && numberOfRepetitions >= 1
        && numberOfRepetitions <= 1000000) {
        numberOfRepetitions = Number.parseInt(numberOfRepetitions);
    } else {
        const alertDivRepetitions = document.createElement("div");
        alertDivRepetitions.setAttribute("class", "errorMessage")
        alertDivRepetitions.innerText =
            "Number of repetitions is invalid. Number of repetitions should be " +
            ">= 1 and <= 1000000 and be an integer input.";
        errorMessages.push(alertDivRepetitions);
    }
    //Removes required elements before presenting what needs to be printed/changed
    //Histogram removal
    if (document.getElementById("histogram")) {
        document.getElementById("histogram").remove();
    }
    //Error message removal
    while(document.getElementsByClassName("errorMessage").length > 0) {
        document.getElementsByClassName("errorMessage").item(0).remove();
    }
    //Execution time remove
    if (document.getElementById("executionTime")) {
        document.getElementById("executionTime").remove();
    }


    // Time starts tracking before flipping coins TODO - Adjust to match new assignment
    if (errorMessages.length === 0) {
        let executionTime = performance.now();
        let frequency = flipCoins(numberOfCoins, numberOfRepetitions);
        const max_frequency = frequency.reduce((a,b) => Math.max(a,b), -Infinity);
        // Coins have been flipped and time is noted for run time
        executionTime = performance.now() - executionTime;
        const ctxElement = document.createElement("canvas");
        let ctx = ctxElement.getContext("2d");
        ctx.canvas.height = 100;
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [...frequency.keys()],
                datasets: [{
                    label: 'Number of Times',
                    data: frequency,
                    backgroundColor: 'blue',
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false,
                        barPercentage: 1.0,
                        ticks: {max: 10,}
                    }, {
                        display: true,
                        ticks: {
                            autoSkip: false,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: max_frequency,
                        }
                    }]
                },
                maintainAspectRatio: true
            }
        });
        ctxElement.setAttribute("id", "histogram");
        document.getElementById("coinQueries").insertAdjacentElement("afterend", ctxElement);
        let executionTimeDiv = document.createElement("div")
        executionTimeDiv.setAttribute("id", "executionTime")
        executionTimeDiv.innerText = "Elapsed Time: " + executionTime.toString() + " ms";
        document.getElementById("histogram").insertAdjacentElement("afterend", executionTimeDiv);
    } else {
        for (let error in errorMessages) {
            document.getElementById("coinQueries").insertAdjacentElement("afterend", errorMessages[error])
        }
    }

    //Prevent refreshing
    event.preventDefault();
}

// Helper method for determining if a value is an integer
const isInputAnInteger = (value) => {
    // Make sure the input string is a number
    if(isNaN(value)) {
        return false;
    }
    // We now know the string contains a number, but is it an integer?
    // Parse the string to a float (decimal with precision) and then verify that it is an integer
    if(!Number.isInteger(parseFloat(value))) {
        return false;
    }
    // The input string is a number and an integer
    return true;
}

// Helper method for flipping coins a certain amount of times
// And returns an array of frequencies of those coins flipped with heads those times
const flipCoins = (coins, times) => {
    let frequency = Array();
    for (let c = 0; c <= coins; c++) {
        frequency[c] = 0;
    }
    for (let rep = 0; rep < times; rep++) {
        let heads = flipCoinsOneTime(coins);
        frequency[heads]++;
    }
    return frequency;
}

// Does one flip of the coins and returns number of heads seen
const flipCoinsOneTime = (coins) => {
    let heads = 0;
    for (let c = 0; c < coins; c++) {
        heads += Math.round(Math.random());
    }
    return heads;
}
