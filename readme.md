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

Overview of all core classes:
![](/documentation/class%20diagramms.png)

## Communication Diagramms
creation of a model component (process is analogous for variants and actions):
![](/documentation/communication%20diagramms%20-%20model%20creation.png)

creation of an i2ActionObjectProperty class (as a prototype for future classes):
![](/documentation/communication%20diagramms%20-%20i2ActionObjectProperty.png)

## Example Model/Variant/action Hierarchy
+![](/documentation/sample%20class%20hierarchy.png)
