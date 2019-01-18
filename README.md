1. Install and update [HomeBrew](https://brew.sh/)
    
    ```bash
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" && brew update
    ```

2. Install [docker](https://www.docker.com/) and [docker-machine](https://docs.docker.com/machine/) via HomeBrew
    
    ```bash
    brew install docker docker-machine
    ```

3. Clone or download/extract the project repository
    
    ```bash
    git clone https://github.com/gde-pass/Matcha.git && cd Matcha/Docker
    ```

4. Install depedencies
    
    ```bash
    npm install
    ```

5. Create and start a docker-machine
    
    ```bash
    docker-machine create Matcha && docker-machine start Matcha
    ```

6. Link your environment 

    ```bash
    eval $(docker-machine env Matcha)   
    ```

7. Execute the [docker-compose](https://docs.docker.com/compose/) file in the Docker folder
    
    ```bash
    docker-compose up 
    ```

8. Start the node server locate in `Matcha/app/config/server.js`

    ```bash
    node server.js
    ```

9. Here we go ! You can now visit [Matcha](http://127.0.0.1:8080) !

## Difficulty

This project is evaluated as a **T2**.
