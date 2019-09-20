#!/usr/bin/env bash

echo "Starting Services"

systemctl start docker
systemctl status docker | grep "Active:"
chmod +x /usr/local/bin/docker-compose
usermod -aG docker ${USER}
chown vagrant:docker /var/run/docker.sock
chmod -R a+rwx /var/run/docker.sock
mkdir -p /var/docker/mongo/data
chmod -R g+rwx /var/docker/mongo/data
chown -R 1000:1000 /var/docker/mongo/data

cd /vagrant/
docker-compose build
docker-compose up -d

echo "Finalizing Settings"

sleep 10

curl --silent -X POST "http://127.0.0.1:8080/api/ranking" -H "accept: application/json" > /dev/null

echo "Ready!"
echo "Visit http://127.0.0.1:8080/ and enjoy!"