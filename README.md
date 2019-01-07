## Updating Heroku

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
