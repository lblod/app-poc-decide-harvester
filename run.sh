#!/usr/bin/env bash
[ ! -f .env ] && cp .env.example .env
docker compose down
sudo rm -rf data
rm -f config/migrations/local/job-migration* && cd scripts && node create-job.mjs --cron="once" --type=http://mu.semte.ch/vocabularies/ext/decide-consumer/initial-sync
cd ..
docker compose pull
docker compose up -d triplestore
sleep 5s 
docker compose up -d migrations
sleep 5s 
docker compose up -d database
sleep 10s
docker compose up -d
