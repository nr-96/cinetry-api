#!/bin/bash

export PG_HOST=$(awslocal ssm get-parameter --name "/local/lambda/common/PG_HOST" | jq -r '.Parameter.Value')
export PG_USER=$(awslocal ssm get-parameter --name "/local/lambda/common/PG_USER" | jq -r '.Parameter.Value')
export PG_PASSWORD=$(awslocal ssm get-parameter --name "/local/lambda/common/PG_PASSWORD" | jq -r '.Parameter.Value')
export PG_PORT=$(awslocal ssm get-parameter --name "/local/lambda/common/PG_PORT" | jq -r '.Parameter.Value')
export PG_DATABASE=$(awslocal ssm get-parameter --name "/local/lambda/common/PG_DATABASE" | jq -r '.Parameter.Value')
