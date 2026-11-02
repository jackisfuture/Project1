# 1. Use an official Node.js version 18 as the base image
FROM node:18

# 2. Set the folder inside the container where our code will live
WORKDIR /app

# 3. Copy package.json files first (this makes builds faster)
COPY package*.json ./

# 4. Install the dependencies AND PM2 globally inside the container
RUN npm install
RUN npm install pm2 -g

# 5. Copy the rest of your backend code
COPY . .

# 6. Tell Docker that the container listens on port 5000
EXPOSE 5000

# 7. Use 'pm2-runtime' instead of 'node'. 
# pm2-runtime is designed specifically for Docker containers.
CMD ["pm2-runtime", "start", "server.js", "--name", "todo-api"]
