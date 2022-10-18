#!/bin/bash
echo ">> Provisioning API mappings [status: starting]"

map_apiv2 () {
  STACK_NAME=$1
  DOMAIN_NAME=$2

  API_ID="null"
  API_MAPPING_ID="null"
  MAPPING_DOMAIN_NAME="null"

  API_ID=$(awslocal apigatewayv2 get-apis | jq -c ".Items[] | select(.Name == \"$STACK_NAME\")" | jq -r .ApiId)
  if [ -z "$API_ID" ] || [ "$API_ID" = "null" ];
    then
      echo "No stack found for $STACK_NAME, ignoring..."
    else
      MAPPING_DOMAIN_NAME=$(awslocal apigatewayv2 get-domain-names | jq -c ".Items[] | select(.DomainName == \"$DOMAIN_NAME\")" | jq -r .DomainName)
      if [ -z "$MAPPING_DOMAIN_NAME" ] || [ "$MAPPING_DOMAIN_NAME" = "null" ];
        then
          awslocal apigatewayv2 create-domain-name --domain-name $DOMAIN_NAME  
      fi

      API_MAPPING_ID=$(awslocal apigatewayv2 get-api-mappings --domain-name $DOMAIN_NAME | jq -c ".Items[] | select(.ApiId == \"$API_ID\")" | jq -r .ApiMappingId)
      if [ ! -z "$API_MAPPING_ID" ] && [ "$API_MAPPING_ID" != "null" ];
        then
          echo "Deleting existing mappings..."
          awslocal apigatewayv2  delete-api-mapping --api-mapping-id $API_MAPPING_ID --domain-name $DOMAIN_NAME
      fi

      awslocal apigatewayv2 create-api-mapping --api-id $API_ID --domain-name $DOMAIN_NAME --stage local

      # Domain Specific Configurations
      if [ "$DOMAIN_NAME" = "cinetry-api.localhost.localstack.cloud" ];
        then
          RESOURCE_ID=$(awslocal apigateway get-resources --rest-api-id $API_ID | jq -c '.items[] | select(.path == "/v1/{proxy+}")' | jq -r .id)
          awslocal apigatewayv2 update-api --api-id $API_ID --cors-configuration AllowOrigins="http://cinetry-client.localhost.localstack.cloud:3000"
      fi 
  fi
}

echo ">> Provisioning API mappings [status: done]"

# v2 Mappings...
map_apiv2 "local-cinetry-api" "cinetry-api.localhost.localstack.cloud"