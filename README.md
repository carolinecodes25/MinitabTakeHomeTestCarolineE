# Welcome to the MinitabTakeHome Repository

Code by: Caroline Eckenrode

This repository should consist of the following files:

* server.js   :   The main server file written in node.js with Express. It is intended to be run through Docker with the Powershell scripts provided later in this document

* package-lock.json   :   An npm-generated file with the proper versions of all program dependencies to be installed when the Docker container runs npm install

* package.json   :   Contains program metadata, identifies server.js as the main file, defines scripts to start the server, and lists dependencies for npm to install

* Dockerfile   :   Instructs Docker on how to build an image for the node.js server. Utilizes node:22, a version of Docker's Official Image for node

* README.md   :   The current file you are viewing with documentation on the structure of the repository and how to run it

* .gitignore   :    A file telling git to ignore local installations of server dependencies. Npm install downloads all needed dependencies when run through Docker on a new device

* .dockerignore   :   A file telling Docker to ignore local installations of server dependencies. Npm install downloads all needed dependencies when run through Docker on a new device



## How to run the program

Ensure Docker is installed on your device. If not, download it here: https://www.docker.com/products/docker-desktop/ 

1) Download all program files from GitHub (or clone the repository)

2) Open program in IDE of your choice

3) Run the following script within your CLI to build the Docker image:
    * docker build -t minitab-take-home-test .

4) Run the following script within your CLI to start up the server through a docker container run on Port 2500:
    * docker run -p 2500:2500 minitab-take-home-test

5) Open a second terminal in your CLI

6) Use the following Powershell script within your CLI to test out the exposed POST /mean endpoint of the server (modify the numbers within the array to test functionality):
    * Invoke-RestMethod -Uri http://localhost:2500/mean -Method Post -ContentType "application/json" -Body (ConvertTo-Json @(1, 2, 3, 4, 5))

7) Use the following Powershell script within your CLI to test out the exposed POST /stddev endpoint of the server (modify the numbers within the array to test functionality):
    * Invoke-RestMethod -Uri http://localhost:2500/stddev -Method Post -ContentType "application/json" -Body (ConvertTo-Json @(1, 2, 3, 4, 5))



## Further file descriptions

* server.js contains a basic HTTP web service constructed using node.js and javascript as the language. To simplify the code and streamline json parsing, the node.js framework Express is used. Documentation for each line of code and it's purpose are provided within the server.js file. Two POST endpoints are exposed: /mean and /stddev, each which take an input array of numbers and call their respective functions to calculate what value to return. Functions for calculating the mean and population standard deviation are written out. Calulating the mean is a part of calculating the standard deviation, thus it was more efficient and scalable to make these caluclations into functions instead of writing them directly within the POST endpoint. The server defines PORT 2500 as the one to listen on and runs on http://localhost:2500/ (insert endpoint here). There is no interface for this server, so searching  http://localhost:2500 in your browser will result in an error.

* Dockerfile builds an image in Docker for the node.js server. It begins by utilizing the node:22 version of Docker's Official Image for node and then sets the working directory to /app inside the container it created. The COPY command copies package-lock.json and package.json into the container which tells the next command: RUN npm install which dependencies to install. The periods after the second COPY command represent all other files in the program except any defined in .dockerignore. Then it sets the PORT environment variable to 2500 at runtime and exposes it for use. Finally the conatiner manager runs npm start which runs node server.js to start the server.


## Other important information to note

By building the Docker image and running the container within your IDE, the container will be assigned a random two-worded name within the Docker Desktop interface. This can be avoided by building the Docker image within the IDE, then switching screens over to Docker Desktop and running the image from there (which will prompt you to create a new container and give you the option to name it appropraitely if you open optional settings). The name of the container isn't important for the functionality of this program.



This program is intended to be run through Docker, however it is able to be run without Docker using the following steps:

1) Download all program files from GitHub (or clone the repository)

2) Open program in IDE of your choice

3) Run the following command within your CLI to install all neccessary dependencies:
    * npm install

4) Run the following command within your CLI to start up the server:
    * node server.js

5) Open a second terminal in your CLI

6) Use the following Powershell script within your CLI to test out the exposed POST /mean endpoint of the server (modify the numbers within the array to test functionality):
    * Invoke-RestMethod -Uri http://localhost:2500/mean -Method Post -ContentType "application/json" -Body (ConvertTo-Json @(1, 2, 3, 4, 5))

7) Use the following Powershell script within your CLI to test out the exposed POST /stddev endpoint of the server (modify the numbers within the array to test functionality):
    * Invoke-RestMethod -Uri http://localhost:2500/stddev -Method Post -ContentType "application/json" -Body (ConvertTo-Json @(1, 2, 3, 4, 5))



The .dockerignore and .gitignore exist to tell Docker and git to ignore the local node_modules folder when building an image or pushing to git from the local device
The sheer size and amount of dependencies within node_modules is impractical, cumbersome, and repetitive to include in the Docker image or git repository
Since Docker runs npm install autmoatically when building the image, and the package-lock.json and package.json files are present to tell npm what dependencies are needed, the program handles the automatic download of all neccessary dependencies when run in a much faster manner than manually downloading them from the repository
 


This program is designed in response to the following prompt:

* Build a simple HTTP web service in a programming language of your choice.

FUNCTIONAL REQUIREMENTS
* Run the server on a port specified by the PORT environment variable at runtime.
* Expose a POST /mean endpoint. Accept a JSON array of numbers in the request body and return the mean.
* Expose a POST /stddev endpoint. Accept the same input and return the population standard deviation.
* Round numeric results to three decimal places. Trailing zeroes do not need to be displayed.

CONTAINERIZATION
* Provide a Dockerfile that builds the service into a container image. Also provide one shell script, written in Bash or PowerShell,
that builds the image and runs it as a container.