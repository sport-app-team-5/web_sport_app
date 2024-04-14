FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install -g @angular/cli

EXPOSE 80

CMD ["npm", "start"]
