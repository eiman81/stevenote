                      
# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /src

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Install serve globally to serve the built React app
RUN npm install -g serve

# Set the command to serve the app
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 5000