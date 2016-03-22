docker-machine create -d virtualbox --virtualbox-memory 8000 default
eval $(docker-machine env default)
git clone https://github.com/brennj55/sonrasc.git
docker-compose up
