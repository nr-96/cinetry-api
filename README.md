# CINETRY - The CINEma-regisTRY at your fingerprints.

## api application

### Prerequisites
* [docker](https://docs.docker.com) & check if the docker deamon running
* [nvm](https://github.com/nvm-sh/nvm) (node version manager)
* [verify DNS rebind protection](https://docs.localstack.cloud/localstack/limitations/#dns-rebind-protection)

### Command Cheat Sheet
| Command         | Description                                                  |
|-----------------|--------------------------------------------------------------|
| `sh ./localstack.sh up`         | Lift up "cinetry-localstack"                                  |
| `sh ./localstack.sh down`       | Lift down "cinetry-localstack"                                |
| `sh ./localstack.sh deploy`     | Deploy cinetry-service to "cinetry-localstack"              |
| `sh ./localstack.sh run`        | Run a command of a cinetry-service inside "cinetry-localstack" |
| `sh ./localstack.sh logs`       | View logs of cinetry-localstack container.                    |

### How to 'Setup'

1. create `.localstack.env` and fill-up their values. Please to `localstack.env.template` for more insight.
2. create docker network named `cinetrynet` > `docker network create cinetrynet`

### How to 'Develop'

> make sure you are at the root of 'api' application
1. `sh ./localstack.sh up` # This will take sometime. Please be patient! ;)
2. `sh ./localstack.sh run "npm run db:migrate"`
3. `sh ./localstack.sh deploy`
4. happy coding!

### How to 'Test'

> make sure you are at the root of 'api' application
1. `sh ./localstack.sh up` 
2. `sh ./localstack.sh run "npm run test"` 

### How to run in demo-mode (ignore lambda cold state)

> make sure you are at the root of 'api' application
1. `sh ./localstack.sh up --demo` 
2. `sh ./localstack.sh run "npm run db:migrate"`
3. `sh ./localstack.sh deploy`

### Whats next?

1. Improve authrorization flow
2. Implement 'user' APIs
3. Improve code coverage