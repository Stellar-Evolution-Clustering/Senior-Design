# stage1 as builder
FROM node:lts-alpine as builder
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build --prod --configuration production

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/ui /usr/share/nginx/html
EXPOSE 4200 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
