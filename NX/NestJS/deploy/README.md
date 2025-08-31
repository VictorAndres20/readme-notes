# DEPLOY

Put files near this README in your NX Nest application root folder, then

## Tar project and upload to server

```bash
tar -cvf [monorepo-project].tar --exclude='[monorepo-project]/db' --exclude='[monorepo-project]/node_modules' --exclude='[monorepo-project]/.git' --exclude='[monorepo-project]/scripts' --exclude='[monorepo-project]/*.DS_Store' [monorepo-project]/
```

## Build docker image

```bash
sh [monorepo-project]/apps/[nest-app]/pre-build.sh
docker build [monorepo-project]/ -t [nest_app_image]:x.x
```

## Create docker container

```bash
docker run --restart always --network [network_app] --ip 172.124.0.5 --name [nest_app_container] -e TZ=UTC+5 -p [env-port]:[env-port] -d [nest_app_image]:x.x
```
