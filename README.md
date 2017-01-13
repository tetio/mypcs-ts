# MyPCS

MyPCS is a set of Applications for creating a Port Community System using the MEAN stack. 

### Tech
Rest API:
* [typescript] - We love typescript 
* [nodejs] - ...
* [mongodb] - ...
* [express] - ...
* [mongoose] - ...

Client Application
* [angular2] - Great framework for SPA
* [primeng] - Visual components for angular2
* [nodejs] - evented I/O for the backend

Applications under development:
  - Administration Console
  - Application for forwarders

And of course mypcs-ts itself is open source with a [public repository][dill]
 on GitHub.

### Installation

mypcs-ts requires [nodejs](https://nodejs.org/) v6+ to run.

Download and extract the [latest pre-built release](https://github.com/tetio/mypcs-ts).

Install the dependencies and devDependencies and start the server.



```
$ mongoimport --db mypcs --collection aplications --file ./app/models/applications.json
```

### Development

Want to contribute? Great!


#### Preparing ddata base
```sh
$ cd mypcs-ts
$ mongoimport --db mypcs --collection aplications --file ./app/models/applications.json
```


#### For building develop version

```sh
$ cd mypcs-ts
$ npm install 
$ npm run build
```

#### For running backend

```sh
$ cd mypcs-ts
$ npm start

```



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
   [mongoose]: <http:/http://mongoosejs.com/>
   [express]: <http://expressjs.com>
   [angular2]: <http://angular.io>
   [primeng]: <http:/http://primefaces.org/primeng/>   
