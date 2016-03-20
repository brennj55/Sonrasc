docker stop $(docker ps -qa)
docker rmi $(docker images -q -f dangling=true)
docker rm -v $(docker ps -qa)
docker volume rm $(docker volume ls --filter dangling=true -q)
