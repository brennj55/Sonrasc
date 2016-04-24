eval $(docker-machine env default)
time_stamp=$(date +%Y-%m-%d-%T)
backup_folder="./backup/${time_stamp}"
mkdir -p "${backup_folder}"
docker exec sonrasc_db_1 mongodump --out /data/backup/
docker cp sonrasc_db_1:/data/backup/db "${backup_folder}"
