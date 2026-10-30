//load in express module
const express = require('express');

//create an instance of express
const server = express();

//express middleware to parse incoming JSON requests
server.use(express.json());

//create a POST endpoint defined by /mean which returns the mean value of an array of numbers sent in the request body
server.post('/mean', (req, res) => {
    //set numbers array to the request body
    const numbers = req.body;

    //call the calculateMean function to find the mean of the numbers array
    const mean =calculateMean(numbers);

    //return the found mean value as a JSON response
    res.json({ mean });
});

//create a POST endpoint defined by /stddev which returns the population standard deviation of an array of numbers sent in the request body
server.post('/stddev', (req, res) => {
    //set numbers array to the request body
    const numbers = req.body;

    //call the calculateStdDev function to find the population standard deviation of the numbers array
    const stddev = calculateStdDev(numbers);

    //return the population standard deviation value as a JSON response
    res.json({ stddev });
});

//function to calculate the mean of an array of numbers
function calculateMean(numArray) {
    //calculate the mean: first find the sum of all numbers in the array, then divide by the length of the array
    //reduce method sums up all numbers in array, starting at index 0 and iterating through each index in the array, adding it to the total
    const sum = numArray.reduce((total, index) => total + index, 0);
    const mean = sum / numArray.length;

    //round the mean to 3 decimal places if needed by multiplying by 1000, rounding the answer, then dividing by 1000 and returning it
    //Math.round() rounds to the nearest integer, and will automatically drop any trailing zeros after the decimal point
    return Math.round(mean * 1000) / 1000;
}

//function to calculate the population standard deviation of an array of numbers
function calculateStdDev(numArray) {
    //call the calculateMean function to find the mean of the numbers array
    const mean = calculateMean(numArray);

    //calculate the sum of the squared differences between each number in the array and the mean
    const sumOfSquDiffs = numArray.reduce((total, index) => total + Math.pow(index - mean, 2), 0);

    //calculate the variance by dividing the sum of squared differences by the length of the array
    const variance = sumOfSquDiffs / numArray.length;

    //calculate the standard deviation by taking the square root of the variance
    const stddev = Math.sqrt(variance);

    //round the standard deviation to 3 decimal places if needed by multiplying by 1000, rounding the answer, then dividing by 1000 and returning it
    return Math.round(stddev * 1000) / 1000;
}

//define the port to listen on
const PORT = 2500;

//start the server and listen on the specified port
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});