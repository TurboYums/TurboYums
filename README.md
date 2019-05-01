# TurboYums

Install Node.js from the following link

- [Node.js](https://nodejs.org/en/)

Ensure you have all proper packages installed, from the TurboYums repository on your computer run the following commands

``` 
    npm install -g yarn
    yarn install
    cd client
    yarn install
```
Any more missing packages can be installed by using the command `yarn add [package name]`.

Docker should also be installed and running in order for the , intallation will differ depending on your operating system

- MacOS and Windows Pro/Enterprise install docker desktop: [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Windows Home install the deprecated docker toolbox: [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/)

- If you are on a linux machine, follow install directions for your Distributionhttps://docs.docker.com/install/linux/docker-ce/

Once you have a docker instance configured, it is important to create a `config.json` from the template included in this repository at `config.template.json`, modify the ip address and other fields as necessary.

To run the MySQL server in a docker container

```
    docker-compose up
```

To run both the node and expo servers

```
    yarn dev
```

alternatively, to run just the node server
```
    yarn server
```
