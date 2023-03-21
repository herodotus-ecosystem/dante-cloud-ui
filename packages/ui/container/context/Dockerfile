FROM nginx:latest

LABEL cn.herodotus.image.authors="herodotus@aliyun.com"


COPY dist/  /etc/nginx/html/ui
COPY favicon.ico  /etc/nginx/html/ui
COPY nginx.conf /etc/nginx/nginx.conf
RUN echo 'Herodotus UI Image Build ok!!'
