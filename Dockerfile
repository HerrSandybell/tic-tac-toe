# Use official node image as the base image
FROM node:12 as build

# Set the working directory
RUN mkdir /usr/src/app

WORKDIR /usr/src/app

# Install all the dependencies
RUN npm install -g @angular/cli

# Copy the build output to replace the default nginx contents.
COPY . .
