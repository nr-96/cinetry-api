echo ">> Provisioning SSM [status: starting]"

aws configure set cli_follow_urlparam false
SELF=$(cat /etc/hostname)

awslocal ssm put-parameter --name "/local/lambda/common/PG_HOST" --type "String" --value "$SELF" --overwrite
awslocal ssm put-parameter --name "/local/lambda/common/PG_USER" --type "String" --value "$MASTER_USERNAME" --overwrite
awslocal ssm put-parameter --name "/local/lambda/common/PG_PASSWORD" --type "String" --value "$MASTER_PASSWORD" --overwrite
awslocal ssm put-parameter --name "/local/lambda/common/PG_PORT" --type "String" --value "$DB_INSTANCE_PORT" --overwrite
awslocal ssm put-parameter --name "/local/lambda/common/PG_DATABASE" --type "String" --value "$DB_NAME" --overwrite

awslocal ssm put-parameter --name "/local/lambda/common/TMDB_API_KEY" --type "String" --value "$TMDB_API_KEY" --overwrite

echo "<< Provisioning SSM [status: done]"
