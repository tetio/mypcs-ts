# MyPCS

MyPCS is a set of Applications for creating a Port Community System using the MEAN stack. 

### Tech
Rest API:
* [typescript] - We love typescript 
* [nodejs] - ...
* [mongodb] - ...
* [express - ...
* [mongoose] - ...

Client Application
* [angular2] - Great framework for SPA
* [primeng] - Visual components for angular2
* [nodejs] - evented I/O for the backend

Applications under development:
  - Administration Console
  - Application for forwarders

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Dillinger requires [Node.js](https://nodejs.org/) v6+ to run.

Download and extract the [latest pre-built release](https://github.com/tetio/mypcs-ts).

Install the dependencies and devDependencies and start the server.

```
$ mongoimport --db mypcs --collection aplications --file ./app/models/applications.json
```


```sh
$ cd dillinger
$ npm install -d
$ node app
```

For production environments...

```sh
$ npm install --production
$ npm run predeploy
$ NODE_ENV=production node app
```



### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma start
```
#### Building for source
For production release:
```sh
$ gulp build --prod
```
Generating pre-built zip archives for distribution:
```sh
$ gulp build dist --prod
```
### Docker
Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 80, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
npm run-script build-docker
```
This will create the dillinger image and pull in the necessary dependencies. Moreover, this uses a _hack_ to get a more optimized `npm` build by copying the dependencies over and only installing when the `package.json` itself has changed.  Look inside the `package.json` and the `Dockerfile` for more details on how this works.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 80 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:latest
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```

#### Kubernetes + Google Cloud

See [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)


#### docker-compose.yml

Change the path for the nginx conf mounting path to your full path, not mine!

### N|Solid and NGINX

More details coming soon.


### Todos

 - Write Tests
 - Rethink Github Save
 - Add Code Comments
 - Add Night Mode

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [typescript]: <http://.typescriptlang.org>
   [nodejs]: <http://nodejs.com>
   [mongodb]: <http://mongodb.com>
   [express]: <http://expressjs.com>
   [angular2]: <http://angular.io>
   

