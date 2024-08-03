# Use an official Node.js image from the Docker Hub
FROM node:alpine3.18

# Set the working directory in the container to the root directory
WORKDIR /

# Copy the package.json and package-lock.json to the root directory
COPY package.json ./
COPY package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application code to the root directory
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define the command to run your application
CMD [ "node", "dist/src/app.js" ]
