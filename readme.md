# i2ConfiguratorCore

[![Build Status](https://travis-ci.org/donalffons/i2ConfiguratorCore.svg?branch=master)](https://travis-ci.org/donalffons/i2ConfiguratorCore)

## Build
```javascript
grunt build
```

## Local TravisCI testing
In Windows PowerShell: Startup docker container.
```PowerShell
> docker run --name build001 -dit travisci/ci-garnet:packer-1515445631-7dfb2e1 /sbin/init
> docker exec -it build001 bash -l
```
In Linux shell in docker container: Setup travis
```Shell
su - travis
git clone --depth=50 --branch=dev https://github.com/donalffons/i2ConfiguratorCore.git build/donalffons/i2ConfiguratorCore
cd build/donalffons/i2ConfiguratorCore
export CHANGEPHPENV=7.1
export PATH=./node_modules/.bin:$PATH
nvm install node
TRAVIS_BUILD_DIR=/home/travis/build/donalffons/i2ConfiguratorCore
```
Then follow instructions in .travis.yml.

## Class Diagramms

![](https://github.com/donalffons/i2Configurator/blob/master/documentation/i2ConfiguratorCore/Class%20Diagramms.png)

![](https://github.com/donalffons/i2Configurator/blob/master/documentation/i2ConfiguratorCore/Class%20Diagramm-%20I2Database.png?raw=true)

## Communication Diagramms
![](https://github.com/donalffons/i2Configurator/blob/master/documentation/i2ConfiguratorCore/Communication%20Diagramms.png)
