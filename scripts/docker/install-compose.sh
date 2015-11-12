#!/usr/bin/env bash

curl -L https://github.com/docker/compose/releases/download/1.5.0/docker-compose-`uname -s`-`uname -m` > /usr/bin/docker-compose

chmod +x /usr/bin/docker-compose