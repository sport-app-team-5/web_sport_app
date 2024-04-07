FROM node:20.11.1-alpine as build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:1.25.4-alpine as deploy

COPY --from=build /app/dist/web_sport_app/browser/* /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
