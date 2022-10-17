#!/bin/bash

chmod 755 /var/scripts/npm-script.sh

sleep 5

DB_INSTANCE_IDENTIFIER=cinetry-db-instance
DB_NAME=cinetrydb
MASTER_USERNAME=admin
MASTER_PASSWORD=admin

echo ">> Installing third-party dependencies [status: starting]"
apt-get update

echo "Installing JQ & NVM..."
apt-get install jq -y &
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.profile

echo "<< Installing third-party dependencies [status: done]"

echo "Resource Provisioning..."
. /var/scripts/rds.sh

. /var/scripts/ssm.sh

. /var/scripts/post-deploy/map-apis.sh

echo "cinetry-localstack is provisioned... You can close the terminal now!"
