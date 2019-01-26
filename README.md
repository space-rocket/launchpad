## Features
- Microservice architecture 
- Server side rendered frontend
- User sign-up page
- User login pages including confirmation forgot and reset password email
## Technology
Next.js for server side rendering using React on frontend and Koa (instead of Express), MongoDB with Mongoose for data storage, Sass for styling CSS and Nodemailer for sending emails.

## Getting Started
There are several ways to run locally. The preferred way is with Docker running on your local machine. If you don't have Docker installed, don't worry, you can still run it with just Node.js and MongoDB installed.

### Using Docker:
To run with Docker you will need Docker for Mac or Windows and Node.js installed.

Step 1: git clone the project
```bash
$ git clone https://github.com/bigbassroller/launchpad.git
```

Step 2: Start the backend API micro service:
```
$ cd launchpad/api
$ npm install
$ docker-compose up -d --build
``` 

Step 3: Start the frontend micro service:
```
$ cd ../frontend
$ npm install
$ npm run dev
```

#### Watch backend API logs
```bash
docker logs api -f
```


### Using just Node.js and Mongoose
First make sure you have Node.js and Mongo installed.

Step 1: Start mongod
```bash
$ mongod
```

Step 2: Git clone the project
```bash
$ git clone https://github.com/bigbassroller/launchpad.git
```

Step 3: Start the backend API micro service:
```
$ cd launchpad/api
$ npm install
$ npm run watch
``` 

Step 4: Start the frontend micro service:
```
$ cd ../frontend
$ npm install
$ npm run dev
```

## Hosting on Heroku

Log in to Container Registry:

```bash
heroku container:login
```

Create a Heroku app:
```bash
heroku create
```

Deploy container:
```bash
heroku container:push web --app ${APPNAME}
```

Release container:
```bash
heroku container:release web -a ${APPNAME}
```

Open up:
```
heroku open -a ${APPNAME}
```

View logs:
```bash
heroku logs --tail -a ${APPNAME}
```
