# Build Stage
FROM node:16 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

RUN npm run build


# Prod stage
FROM nginx:1.20 as production-stage

RUN mkdir /app

COPY --from=build-stage /app/build /app

COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

ENTRYPOINT [ "nginx" ]

CMD [ "-g", "daemon off;" ]