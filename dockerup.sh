#!/usr/bin/env bash

echo "Buildind Container Images..."

docker-compose build

echo "Running Container Images..."

docker-compose up -d

sleep 10

echo "Update Database..."

curl --silent -X POST "http://127.0.0.1:8080/api/ranking" -H "accept: application/json" > /dev/null

echo "Ready!"
echo "Visit http://127.0.0.1:8080/ and enjoy!"