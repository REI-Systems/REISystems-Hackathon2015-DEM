#!/usr/bin/env bash

#Build (Prod mode) project from GITHUB (in CircleCI)

cd ./src/frontend

grunt build

docker login -e $DOCKER_EMAIL -u $DOCKER_USER -p $DOCKER_PASS

docker build -t jmotii/hat-2015 .

docker push jmotii/hat-2015