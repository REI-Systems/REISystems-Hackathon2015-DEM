###Welcome to DEM: http://dem.reisys.io/

[![Circle CI](https://circleci.com/gh/REI-Systems/REISystems-Hackathon2015-DEM.svg?style=svg)](https://circleci.com/gh/REI-Systems/REISystems-Hackathon2015-DEM)

[![Code Climate](https://codeclimate.com/repos/5644bb351787d75306005704/badges/b5bd2cbc12d329bf318b/gpa.svg)](https://codeclimate.com/repos/5644bb351787d75306005704/feed)

#####A Proof of Concept Tool Developed for FEMA by DEM Team at REI Systems, inc

**DEM** Businesses is created for those who thrive on pushing the boundaries of their businesses beyond profits. We focus on emergency prevention, relief and recovery. Once we meet survivors’ immediate needs for food, water and shelter, we transition to rebuilding and reconstruction, supporting the people of natural disasters and chronic emergencies in reclaiming their lives. Our program seeks to prevent loss of lives, minimize suffering, reduce property damage, speed recovery, and otherwise better cope with natural or man-made disasters. While fostering a culture of peace, dignity and respect. Beyond immediate help DEM Businesses also make a difference in participating in Disaster Prevention and Disaster Preparedness projects. We give disaster-affected communities greater control over decisions that affect their lives.

### Development Approach

Our team chose the required supporting infrastructure based on Hack-a-Thon requirements, U.S. Web Design Standards. This included GitHub version control, Slack team for communication, JIRA for Agile planning, Docker containers, Docker Hub for hosting images, Circle CI for continuous integration, SonarQube for unit testing coverage monitoring, Tutum for automated container deployment, and AWS for hosting.

For frontend technologies, we've selected: AngularJS with Material Framework, Bower & NPM for package management, NodeJS and Grunt for task-runner, Yeoman as scaffolding tool, D3 for chart/Map, Firebase for NoSQL cloud database, Karma/Jasmine as task/framework for unit testing, Amazon API Gateway for API Proxy (CORS issues) and vagrant with provisioning as dev tool for developer environment.

We have followed agile practices to deliver the application. We started with creating the user stories along with acceptance criteria, then during the sprint planning session we pointed out the stories as a team based on the complexity of the feature. We had regular 15 minutes scrum meeting to discuss the status and solve the impediments if any.

Here are some Screenshot/Diagrams of the tools we used during this sprint and development process:

**Technologies**:
[![click to expand](https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/tech.png)] (https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/tech.png)

**Integration**:
[![click to expand](https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/architecture.png)] (https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/architecture.png)

**Continuous Integration/Delivery**

**(Develop Branch)**
[![click to expand](https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/ci-cd-dev.png)] (https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/ci-cd-dev.png)

**(Master Branch)**
[![click to expand](https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/ci-cd-prod.png)] (https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/ci-cd-prod.png)

**CircleCI**
[![click to expand](https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/circle-ci.png)] (https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/circle-ci.png)

**Tutum**
[![click to expand](https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/tutum.png)] (https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/tutum.png)

**Docker Hub**
[![click to expand](https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/docker-hub.png)] (https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/docker-hub.png)

**Amazon (Monitoring)**
[![click to expand](https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/amazon.png)] (https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/amazon.png)

**Jenkins**
[![click to expand](https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/jenkins.png)] (https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/jenkins.png)

**SonarQube**
[![click to expand](https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/sonar-qube.png)] (https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/sonar-qube.png)

**Jira**
[![click to expand](https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/jira.png)] (https://raw.githubusercontent.com/REI-Systems/REISystems-Hackathon2015-DEM/develop/architecture/docs/jira.png)

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
$ vagrant up    #Proceed to next command even this command returns error messages
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
$ cd /var/www/hat-2015/src/frontend
$ grunt build
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