FROM nginx:1.20.2

RUN mkdir -p /etc/nginx/
WORKDIR /etc/nginx/

COPY /nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]