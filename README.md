[![Circle CI](https://circleci.com/gh/REI-Systems/REISystems-Hackathon2015-DEM.svg?style=svg)](https://circleci.com/gh/REI-Systems/REISystems-Hackathon2015-DEM)

[![Code Climate](https://codeclimate.com/repos/5644bb351787d75306005704/badges/b5bd2cbc12d329bf318b/gpa.svg)](https://codeclimate.com/repos/5644bb351787d75306005704/feed)

## Install Environment:
####Requirements
You need to have vagrant installed https://www.vagrantup.com/downloads.html, then install these following tools:

<pre>
$ vagrant plugin install vagrant-vbguest
</pre>

#### Install project locally
Run command lines in order to set up the project in your machine :

<pre>
$ git clone -b develop https://github.com/REI-Systems/REISystems-Hackathon2015-DEM.git
$ cd REISystems-Hackathon2015-DEM/conf/vagrant
$ vagrant up
$ vagrant provision --provision-with shell   #sync your local environment with updated dev dependencies
$ vagrant ssh
$ cd /var/www/hat-2015
</pre>

After the VM is up and running, these are the following command to use for vagrant to start, shutdown, delete your current VM:

<pre>
$ vagrant up        # Install/Run the VM
$ vagrant halt      # shutdown the VM
$ vagrant destroy   # remove the VM
$ vagrant ssh       # access to your VM (SSH)
</pre>

######Note: the IP address allocated to this new VM Box is 192.168.56.106 and if you have used this IP Address, you can change it in `conf/vagrant/puphpet/config.yaml`

#####Run the application without docker

Inside your vagrant VM, run the following command

<pre>
$ cd /var/www/hat-2015/src/frontend
$ grunt serve
</pre>

Browse URL: http://192.168.56.106:9000/

#### Using Docker in Dev environment:
In order to use docker and build/run images/container in dev, you must change one file as mentioned: http://docs.docker.com/engine/articles/systemd/#custom-docker-daemon-options

<pre>
$ sudo vim /lib/systemd/system/docker.service

- Replace this line:

ExecStart=/usr/bin/docker daemon -H fd://

- By:

EnvironmentFile=-/etc/sysconfig/docker
EnvironmentFile=-/etc/sysconfig/docker-storage
EnvironmentFile=-/etc/sysconfig/docker-network
ExecStart=
ExecStart=/usr/bin/docker daemon -H fd:// $OPTIONS \
          $DOCKER_STORAGE_OPTIONS \
          $DOCKER_NETWORK_OPTIONS \
          $BLOCK_REGISTRY \
          $INSECURE_REGISTRY

- Save file and exit

$ sudo systemctl daemon-reload
$ sudo service docker restart

</pre>


#####Run the application with docker

Inside your vagrant VM, run the following commands

<pre>
$ sudo su
$ cd /var/www/hat-2015
$ docker-compose -f docker-compose.local.yml up -d
</pre>

Browse URL: http://192.168.56.106/

To stop and remove containers, run the following commands:
<pre>
$ sudo su
$ cd /var/www/hat-2015
$ docker-compose -f docker-compose.local.yml stop
$ docker-compose -f docker-compose.local.yml rm -f
</pre>