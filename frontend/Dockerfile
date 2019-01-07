FROM node:8.0.0-alpine

#Install bash
RUN apk add --update bash && rm -rf /var/cache/apk/* 

#Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --no-optional

#Bundle app source
COPY ./ /usr/src/app

EXPOSE $PORT
CMD [ "npm", "start" ]