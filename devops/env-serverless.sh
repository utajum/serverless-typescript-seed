#!/bin/bash

if ! [ -x "$(command -v aws)" ]; then
  echo '==> Error: aws CLI not installed.' >&2
  else

  ENVIRONMENT=${1:-dev}
  SERVERLESS_API_STACK_NAME=user-api

  export AWS_APP_SERVICE_ENDPOINT=$(aws cloudformation describe-stacks --stack-name $SERVERLESS_API_STACK_NAME-${ENVIRONMENT} | jq -r '.Stacks[] | .Outputs[] | select(.OutputKey | match("ServiceEndpoint")) | .OutputValue')
  export AWS_APP_API_ONE=$(aws cloudformation describe-stack-resources --stack-name $SERVERLESS_API_STACK_NAME-${ENVIRONMENT} | jq -r '.StackResources[] | select(.LogicalResourceId | match("ApiGatewayRestApi")) | .PhysicalResourceId')
  export AWS_APP_WEBSOCKET_ENDPOINT=$(aws cloudformation describe-stacks --stack-name serverless-ws-test-dev  | jq -r '.Stacks[] | .Outputs[] | select(.OutputKey | match("ServiceEndpointWebsocket")) | .OutputValue')

  env | grep AWS_APP | sort

fi