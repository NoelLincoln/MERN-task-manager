# Use an official Node.js image from the Docker Hub
FROM node:alpine3.18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Ensure the .env file is copied if it's used in build or runtime
# Ensure that the .env file is at the root of your project
COPY .env .env

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD [ "npm", "run", "start" ]
