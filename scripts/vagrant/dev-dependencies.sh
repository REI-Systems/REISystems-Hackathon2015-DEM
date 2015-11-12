#!/bin/bash

echo "Updating Centos ..."
yum -y update

echo "Install some dependencies..."
yum -y install yum-utils bzip2 bzip2-devel wget curl tar gcc gcc-c++ fontconfig

yum -y install epel-release

echo "Install Develpment Tools ..."
yum -y groupinstall "Development tools"

echo "Install NodeJS Latest stable ..."
cd /opt
wget http://nodejs.org/dist/v4.2.1/node-v4.2.1.tar.gz 
tar zxf node-v4.2.1.tar.gz 
cd node-v4.2.1 
./configure --prefix=/usr
make 
make install 
node -v 
npm -v

echo "Install Yoeman..."
npm install -g yo

echo "Install Bower..."
npm install -g bower

echo "Install Grunt ..."
npm install -g grunt-cli

echo "Install Gulp ..."
npm install -g gulp

echo "Install Generator web ..."
npm install -g generator-webapp

echo "Install Angular Generator ..."
npm install -g generator-angular

echo "Install Karma unit testing framework Frontend..."
npm install -g karma

echo "Install SailsJS ..."
npm install -g sails

echo "Install PM2 for launching SailsJS App in prod ..."
npm install pm2 -g --unsafe-perm

echo "Install Mocha unit testing framework Backend..."
npm install -g mocha

echo "Install HTTP Server to run frontend app (prod mode)..."
npm install http-server -g

if [ ! -f /home/vagrant/.git-prompt.sh ] 
then
    echo "Fix dependencies with github and look&feel terminal ..."

    cd /tmp
    wget https://raw.github.com/git/git/master/contrib/completion/git-prompt.sh

    echo "Set up file in user home.."
    mv git-prompt.sh /home/vagrant/.git-prompt.sh
    cp /home/vagrant/.git-prompt.sh ~/.git-prompt.sh

    echo "Update user bash profile..."
    echo "source /home/vagrant/.git-prompt.sh" >> /home/vagrant/.bash_profile
    echo "source ~/.git-prompt.sh" >> ~/.bash_profile
fi

echo "Install VIM & nano ..."
yum -y install vim nano

if ! type "docker" > /dev/null
then
    echo "Install docker ..."
    curl -sSL https://get.docker.com/ | sh

    echo "Start the docker daemon at boot ..."
    chkconfig docker on
fi

if [ ! -f /etc/sysconfig/docker ] 
then
    echo "Setting docker to use DOCKER_OPTS within daemon (start)..."
    echo "OPTIONS='--exec-opt native.cgroupdriver=cgroupfs'" > /etc/sysconfig/docker
    echo "DOCKER_STORAGE_OPTIONS=''" > /etc/sysconfig/docker-storage
    echo "DOCKER_NETWORK_OPTIONS=''" > /etc/sysconfig/docker-network
fi

if ! type "docker-compose" > /dev/null
then
    echo "Install docker compose ..."
    sh /var/www/hat-2015/scripts/docker/install-compose.sh
fi


echo "Install all dev dependencies -= FRONTEND =-"
cd /var/www/hat-2015/src/frontend
su vagrant -c "npm install"
su vagrant -c "bower install"

#echo "Install all dev dependencies -= BACKEND =-"
#cd /var/www/hat-2015/src/backend/app
#su vagrant -c "npm install"

echo "Opening port for dev ..."
/sbin/iptables -I INPUT -p tcp -m tcp --dport 9000 -j ACCEPT
/sbin/iptables -I INPUT -p tcp -m tcp --dport 35729 -j ACCEPT

echo "Set up git: Remove file modes..."
cd /var/www/hat-2015
su vagrant -c "git config core.filemode false"