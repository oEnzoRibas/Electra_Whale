# ELECTRA WHALE


Electra Whale is an open-source project that provides a ToDo application with a focus on simplicity and user-friendliness. It is built using modern mobile technologies like React Native, Expo, With an microroservices architecture using Node.js, and PostrgreSQL for the backend.


# How to Run Locally
To run the Electra Whale application locally, follow these steps:
1. Clone the repository:
   ```bash
   git clone
   ```
2. Navigate to the project directory:
   ```bash
    cd Electra_Whale
    ```
3. Start the development environment using Docker Compose:
    ```pwsh
    cd infra
    docker compose -f docker-compose.dev.yml -p ew up --build -d

    # to compose down
    docker compose -f docker-compose.dev.yml -p ew down --remove-orphans
    ```