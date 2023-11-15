# Getting Started
## Dependencies
* [Docker](https://www.docker.com/get-started/)
* [Docker Compose v2.0](https://docs.docker.com/compose/migrate/)

## Environment Variables
The example.env file shows what environment variables are required to run the app. These can be set in a .env file in the root directory of the project, which docker will automatically import and is ignored by git.

## Running the app
Ensure that the Docker daemon is running
```bash | powershell
docker info
```

To run the app, run the following command in the root directory of the project
```bash | powershell
docker-compose up
```

By default the local app will run exposed at http://localhost:3000, or http://0.0.0.0:3000 for network connections.