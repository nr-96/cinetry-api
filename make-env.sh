#!/bin/bash

export PG_HOST=$(awslocal ssm get-parameter --name "/local/lambda/common/PG_HOST" | jq -r '.Parameter.Value')
export PG_USER=$(awslocal ssm get-parameter --name "/local/lambda/common/PG_USER" | jq -r '.Parameter.Value')
export PG_PASSWORD=$(awslocal ssm get-parameter --name "/local/lambda/common/PG_PASSWORD" | jq -r '.Parameter.Value')
export PG_PORT=$(awslocal ssm get-parameter --name "/local/lambda/common/PG_PORT" | jq -r '.Parameter.Value')
export PG_DATABASE=$(awslocal ssm get-parameter --name "/local/lambda/common/PG_DATABASE" | jq -r '.Parameter.Value')
export TMDB_API_KEY=$(awslocal ssm get-parameter --name "/local/lambda/common/TMDB_API_KEY" | jq -r '.Parameter.Value')
export JWT_SECRET=$(awslocal ssm get-parameter --name "/local/lambda/common/JWT_SECRET" | jq -r '.Parameter.Value')
export CLIENT_ENDPOINT=$(awslocal ssm get-parameter --name "/local/lambda/common/CLIENT_ENDPOINT" | jq -r '.Parameter.Value')
