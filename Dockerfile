FROM node:20.11.1

WORKDIR /usr/src/app

COPY . .

RUN npm install -g @angular/cli

RUN npm install

EXPOSE 80

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "80"]
