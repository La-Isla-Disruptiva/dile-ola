FROM nginx:latest

# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./web /usr/share/nginx/html

RUN cd /usr/share/nginx/html/js/ && sed -i '/ENVIRONMENT/d' ./parameters.js && echo  "const ENVIRONMENT=\"dev\"" >> parameters.js
