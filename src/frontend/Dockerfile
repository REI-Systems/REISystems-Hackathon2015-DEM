FROM jmotii/nodejs

RUN npm install http-server -g

RUN mkdir -p /var/www/app

ADD ./dist  /var/www/app

WORKDIR /var/www/app

EXPOSE 80

CMD ["http-server", "-p 80"]