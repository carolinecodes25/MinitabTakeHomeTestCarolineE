# Use node version 22, an official Node.js Docker image as the base image
FROM node:22

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory (* is used to call all files that start with package and end with .json)
COPY package*.json ./

# Install dependencies defined in package.json
RUN npm install

# Copy the rest of the program's files to the working directory (. is used to call all files in the current directory)
COPY . .

# Set environment variable for the port at runtime
ENV PORT=2500

# Expose the port that the application will run on
EXPOSE 2500

# Start the application using the npm start command
CMD ["npm", "start"]

