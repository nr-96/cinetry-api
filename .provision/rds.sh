echo ">> Provisioning RDS [status: starting]"

echo "Validating database instance..."

EXISTING_DB_IDENTIFIER=$(awslocal rds describe-db-instances | jq -c ".DBInstances[] | select(.DBInstanceIdentifier == \"$DB_INSTANCE_IDENTIFIER\")" | jq -r '.DBInstanceIdentifier')
if [ "$EXISTING_DB_IDENTIFIER" != "$DB_INSTANCE_IDENTIFIER" ];
  then
    echo "Creating database instance..."
    awslocal rds create-db-instance --db-name $DB_NAME --db-instance-identifier $DB_INSTANCE_IDENTIFIER --db-instance-class db.t3.medium --master-username $MASTER_USERNAME --master-user-password $MASTER_PASSWORD --engine aurora-postgresql --region eu-west-1
  else
    echo "Database instance already exists, ignoring..."
fi 

DB_INSTANCE_PORT=$(awslocal rds describe-db-instances --db-instance-identifier $DB_INSTANCE_IDENTIFIER | jq -r ".DBInstances[0].Endpoint.Port")

echo "<< Provisioning RDS [status: done]"
