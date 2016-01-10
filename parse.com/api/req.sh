#!/bin/bash

REST_API_KEY=`grep restApiKey .parse.local | awk -F '\"' '{print $4}'`
APPLICATION_ID=`grep applicationId .parse.local | awk -F '\"' '{print $4}'`

if [ -z "$1" ]; then
    echo 'req.sh function_name json_data'
    exit 1
fi

if [ -z "$2" ]; then
    PARAMETERS='{}'
else
	PARAMETERS=$2
fi

curl -X POST \
  -H "X-Parse-Application-Id: ${APPLICATION_ID}" \
  -H "X-Parse-REST-API-Key: ${REST_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "$PARAMETERS" \
  "https://api.parse.com/1/functions/$1"
