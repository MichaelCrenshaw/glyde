# Getting Started
## Dependencies
* [Docker](https://www.docker.com/get-started/)
* [Docker Compose v2.0](https://docs.docker.com/compose/migrate/) [included in docker desktop]

## Environment Variables
The example.env file shows what environment variables are required to run the app.
Copy the file and rename it to .env, then fill in your values for the variables.

Docker compose imports environment variables from the .env file by default, as long as it is placed in project root directory.

## Running the app
Ensure that the Docker daemon is running
```bash | powershell
docker info
```
If docker is running, you should see some output about the current version installed.

To run the app, run the following command in the root directory of the project
```bash | powershell
docker-compose up
```

By default the local app will launch at http://localhost:3000; or http://0.0.0.0:3000 for network connections.