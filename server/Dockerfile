FROM node:14.19.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN npm run build

COPY . .
# COPY ./dist /usr/src/app/dist 

EXPOSE 5000

CMD "npm" "run" "start:prod"