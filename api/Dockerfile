FROM node:carbon-alpine

#Install bash
RUN apk add --update bash && rm -rf /var/cache/apk/* 

#Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --no-optional

#Install Typescript
RUN npm install typescript -g
RUN npm install eslint -g

#Bundle app source
COPY ./ /usr/src/app


# Expose port from container so host can access $PORT
EXPOSE $PORT
CMD [ "npm", "start" ]