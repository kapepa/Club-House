FROM node:14.19.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

RUN npm run build
EXPOSE 5000

CMD "npm " "run" "start"