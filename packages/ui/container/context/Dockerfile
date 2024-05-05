FROM nginx:stable-alpine

LABEL cn.herodotus.image.authors="herodotus@aliyun.com"

ENV LISTEN_PORT=8000
ENV SERVER_NAME=localhost
ENV DANTE_SERVER_ADDR=192.168.101.10:8847
ENV DANTE_SERVER_PROJECT=dante

COPY dist/  /etc/nginx/html/ui
COPY favicon.ico  /etc/nginx/html/ui
COPY template.conf /etc/nginx/templates/default.conf.template
COPY entrypoint.sh /dante-entrypoint.sh

CMD /dante-entrypoint.sh && /docker-entrypoint.sh nginx -g 'daemon off;'

