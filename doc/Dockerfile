FROM swaggerapi/swagger-ui

ARG API_HOST
ENV API_HOST=$API_HOST
ENV API_URL=swagger/res.yml

RUN apk add python3 
COPY ./start.py /entrypoint/
COPY ./entrypoint.sh /docker-entrypoint.d/50-entrypoint.sh
COPY ./doc.yml /entrypoint/doc.yml
RUN chmod +x /docker-entrypoint.d/50-entrypoint.sh & mkdir -p /usr/share/nginx/html/swagger/
RUN python3 /entrypoint/start.py