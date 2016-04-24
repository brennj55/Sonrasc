eval $(docker-machine env default)
docker exec sonrasc_db_1 mkdir /data/backup/
docker cp "$1" sonrasc_db_1:/data/backup/
docker exec sonrasc_db_1 mongorestore -d db /data/backup/db
#bash restore-db.sh ./backup/2016-04-24-15\:53\:09/db
