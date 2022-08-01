# Doing this because the free AWS EC2 machine
# has too little RAM to build the app.
# Usually we would use the commented lines below.
FROM nginx:1.20 as production-stage

RUN mkdir /app

COPY ./build /app

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

ENTRYPOINT [ "nginx" ]

CMD [ "-g", "daemon off;" ]


# # Build Stage
# FROM node:16 as build-stage

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY ./ .

# RUN npm run build


# # Prod stage
# FROM nginx:1.20 as production-stage

# RUN mkdir /app

# COPY --from=build-stage /app/build /app

# COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80 443

# ENTRYPOINT [ "nginx" ]

# CMD [ "-g", "daemon off;" ]
