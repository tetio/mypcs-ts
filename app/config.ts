let config = {
  "KEY_ENCRYPTION": "a1d4feef45a90810ffefc1accaa112211a",
  "local": {
    "MONGO_URI": "mongodb://172.16.19.20:27017/mypcs",
    "MONGO_OPTIONS": {"db": {"safe": true}}
  },
  "development": {
    "MONGO_URI": "mongodb://192.168.19.99:27000/mypcs?replicaSet=r1",
    "MONGO_OPTIONS": {"db": {"safe": true}}
  },
  "production": {
    "MONGO_URI": "mongodb://user:pwd@instance.mongolab.com:port/heroku_appNumber",
    "MONGO_OPTIONS": {"db": {"safe": true}}
  }
}

export { config }