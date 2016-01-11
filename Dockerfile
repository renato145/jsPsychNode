FROM node:argon

# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install app dependencies
RUN npm install nodemon -g
COPY ./app/package.json /usr/src/
RUN npm install

# RUN
CMD [ "npm", "start" ]