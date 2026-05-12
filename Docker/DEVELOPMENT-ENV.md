# Set up a development environment under Docker (or Podman)
---

Lets set up our coding environment under conatiners to portect our local/personal files/keys over posible malicious packages our apps can install.

---

## Install your container engine

You can install Docker or Podman (recommended for Mac) to develop under containers.

### Install Docker

Go and follow instructions in offical docs. https://docs.docker.com/get-started/
Normally under https://docs.docker.com/engine/install/ubuntu/.

### Install Podamn

#### On Linux

```bash
# First install Podman
sudo apt-get update
sudo apt-get install podman
podman --version

# Set Up Rootless Networking
sudo apt-get install slirp4netns
# Then configure user namespaces (replace [username] with your username)
echo "[username]:100000:65536" | sudo tee -a /etc/subuid
echo "[username]:100000:65536" | sudo tee -a /etc/subgid

# Configure Docker as Default Registry

# Check if the file exists
cat /etc/containers/registries.conf
# If unqualified-search-registries isn't set, add it, sbut shiuld be `unqualified-search-registries = ["docker.io"]`

# Check system info and confirm it's running rootless — look for `rootless: true` in the output
podman info

# Alias to use docker
alias docker=podman
echo '\n# Docker alias\nalias docker=podman' > ~/.bashrc

# Second OPTIONAL install docker compose plugin:
# Needs to follow: https://docs.docker.com/compose/install/linux/
```

#### On Mac

```bash
# Install libkrun via homebrew
brew install slp/krunkit/krunkit

# Install podman
brew install podman

# Set libkrun as the machine provider (add to your shell profile)
export CONTAINERS_MACHINE_PROVIDER="libkrun"
# Persist it
echo '\n# Podman machine provider\nexport CONTAINERS_MACHINE_PROVIDER="libkrun"' > ~/.zshrc

# Alias to use docker
alias docker=podman
echo '\n# Docker alias\nalias docker=podman' > ~/.zshrc

# Initialize and configure podman machine
podman machine init
podman machine set --rootful --memory 16384

# Second OPTIONAL install docker compose plugin:
# brew install docker-compose
# Install the Podman Mac helper to create the /var/run/docker.sock symlink.
# This is required for podman compose to access the Podman socket.
# sudo /opt/homebrew/Cellar/podman/$(podman --version | awk '{print $3}')/bin/podman-mac-helper install

podman machine start
```

---

## Install your tech dev tools

You still need your tools installed for your tech stack. Example you will need Java if your app is in Java or Node if is Node.

---

## Create your environment repo

### NX monrepo with NestJS backend and a PostgreSQL DB

Lets say we are creating a backend in NodeJS using NestJS and the database

#### Create folder-repo

```bash
mkdir my-app
```

#### Script to startup your env

Create a `startup.sh` file inside your folder-repo

```bash
############################
#
# VARIABLES
#
############################

# Your app name
app_name="my-app"

# NodeJS version
node_version="24.13.0"

############################
#
# COMMANDS
#
############################

# Store current directory where the script lives (app folder)
project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Create network so containers can talk to each other
docker network inspect "${app_name}-network" >/dev/null 2>&1 || docker network create "${app_name}-network"

# Create postgres container
docker start "${app_name}-postgres" || docker run --name "${app_name}-postgres" --nerwork "${app_name}-network" -e POSTGRES_PASSWORD=passwd -d -p 5433:5432 postgres:18

# Create Node container
docker start "${app_name}-monorepo-api" || docker run --name "${app_name}-monorepo-api" -v "${project_dir}:/source-code" --workdir /source-code -d -p 9000:9000 "node:${node_version}"
```

This file is going to be the one you are going to execute when need to startup your app.

> [!NOTE]
> You can add more containers, like a frontend container, a redis database, whatever you need

#### Additional commands to initialize your NX repo

```bash
# Create NX project using your container

# Scaffold into a subfolder
docker exec -t my-app-monorepo-api npx create-nx-workspace@x.x.x \
  --name="my-app" \
  --preset=ts \
  --formatter=prettier \
  --no-interactive

# Move everything up to /source-code
docker exec -t my-app-monorepo-api sh -c \
  "mv /source-code/my-app/{.,}* /source-code/ && rm -rf /source-code/my-app"
```