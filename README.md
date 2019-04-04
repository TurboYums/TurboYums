# TurboYums

Ensure you have all proper packages installed

``` 
    npm install -g yarn
    yarn install
    cd client
    yarn install
```

Docker should also be installed and running

- if you are in MacOS, install docker desktop
- if you are on Windows Pro/Enterprise install docker desktop.

    [Docker Desktop](https://www.docker.com/products/docker-desktop)
- if you are on windows Home, install docker toolbox

    [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/)

- if you are on a linux machine, follow install directions for your distribution

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
