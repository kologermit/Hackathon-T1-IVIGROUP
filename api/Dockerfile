FROM node:22

WORKDIR /app
COPY ./package-lock.json .
COPY ./package.json .

RUN npm i
CMD npm start