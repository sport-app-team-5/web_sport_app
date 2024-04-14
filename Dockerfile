FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g @angular/cli

EXPOSE 80

CMD ["npm", "start", "--host", "0.0.0.0", "--port", "80"]
