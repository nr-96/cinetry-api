#!/bin/bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# sh localstack.sh up
# Function to lift-up localstack environment
function up {
  function help {
    echo "> Lift up 'cinetry-localstack' container"
    echo "
Usage: sh localstack.sh up [PARAMETERS]
Parameters:
  -h, --help             Help for cinetry-localstack up
  -d, --demo             Lift up in demo (stay-open) mode to prevent lambda's cold-start in each invocation
  --refresh              Clean cache for cinetry-localstack and up the container.

Examples:
  Developer Mode                : localstack.sh up
  Developer Mode (clean cache)  : localstack.sh up --refresh 1
  Demo Mode                     : localstack.sh up --demo 1
  Demo Mode (clean cache)       : localstack.sh up --demo 1 --refresh 1
"
    exit
  }

  shift 1

  opts=("$@")
  for (( opt=0; opt<${#opts[@]}; opt+=2 ));
    do
      KEY="${opts[opt]}"
      VALUE="${opts[opt+1]}"

      case $KEY in
        -h | --help)
              help
              ;;
        -d | --demo)
              LAMBDA_EXECUTOR_MODE="demo"
              ;;
        --refresh)
              CLEAN_CACHE="clean-cache"
              ;;
      esac
    done

   if [[ $CLEAN_CACHE =~ "clean-cache" ]];
    then
      if [[ $LAMBDA_EXECUTOR_MODE =~ "demo" ]];
        then
          echo "Cleaning 'cinetry-localstack demo' cache..."
          rm -rf .cache-demo/localstack
        else
          echo "Cleaning 'cinetry-localstack' cache..."
          rm -rf .cache/localstack
      fi    
  fi

  echo "Starting..."
  if [[ $LAMBDA_EXECUTOR_MODE =~ "demo" ]];
    then
      docker compose -f docker-compose.yml -f docker-compose.demo.yml up -dV
      echo "cinetry localstack 'demo' mode is being provisioned... Happy Coding!\n"
    else
      docker compose -f docker-compose.yml -f docker-compose.dev.yml up -dV
      echo "cinetry localstack 'development' mode is being provisioned... Happy Coding!\n"
  fi
}

# sh localstack.sh down
# Function to lift-down localstack environment
function down {
  docker compose down
}


# sh localstack.sh logs
# Function to read logs of the localstack container
function logs {
  docker container logs cinetry-localstack -f
}

# sh localstack.sh deploy
# Function to deploy cinetry-api
function deploy {
  echo "Deploying 'CINETRY-API'..."

  nvm install
  npm ci
  npm run ls:deploy

  docker exec cinetry-localstack sh /var/scripts/post-deploy/map-apis.sh
}

# sh localstack.sh run <parameters>
# Function to run scripts inside cinetry-localstack container
function run {
  shift 1
  docker exec -it -w /var/workspace cinetry-localstack /var/scripts/npm-script.sh $@
}

# sh localstack.sh ssh 
# Function to ssh to cinetry-localstack container
function ssh {
  docker exec -it cinetry-localstack /bin/bash   
}

$1 "$@"
