FROM node:18

WORKDIR /app

# Install dependency used by wait-for script
RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./
RUN npm install

# Copy the wait-for script
COPY wait-for.sh .
RUN chmod +x wait-for.sh

# Copy app source
COPY . .

EXPOSE 4000

# Wait for MySQL service before starting the app
CMD ["sh", "-c", "./wait-for.sh mysql npm start"]
