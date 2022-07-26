# API PCAT RESULTS
# Python version
3.10

# Deploy in docker
- See .env
  
- [OPTIONAL] Maybe create tar to upload in host server
````
tar -cvf api-pcat-results.tar --exclude='api-pcat-results/venv' --exclude='api-pcat-results/.git' api-pcat-results/
````
  
- [OPTIONAL] Create image specifying version x.x
````
docker build ../api-pcat-results/ -t api_pcat_results:x.x
````

- Create container
````
docker run --restart always --network network-pcat --ip 172.124.0.6 --name api_pcat_results -p 8000:8000 -d api_pcat_results:v.v
````