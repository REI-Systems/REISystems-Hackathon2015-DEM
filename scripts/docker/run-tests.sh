#!/usr/bin/env bash

#docker-compose -f docker-compose.test.yml up
#docker-compose -f docker-compose.test.yml stop
#docker-compose -f docker-compose.test.yml rm -f

docker-compose -f docker-compose.test.yml run frontend
