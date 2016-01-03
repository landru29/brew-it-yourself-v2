# Parse.com

## Installation of the command line tool
`` curl -s https://www.parse.com/downloads/cloud_code/installer.sh | sudo /bin/bash ``

## Initialize application

### Create a new application

``parse new``

### ... or link to an existing application
``cp parse.local.sample .parse.local``

and modify the file with you application name and application key

## Create your account key
``parse configure accountkey``

## deploy
``parse deploy``

## Test endpoints
```
curl -X POST \
  -H "X-Parse-Application-Id: xxxxxx" \
  -H "X-Parse-REST-API-Key: yyyyy" \
  -H "Content-Type: application/json" \
  -d '{}' \
  https://api.parse.com/1/functions/hello
```
