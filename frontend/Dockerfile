FROM node:14.4.0-alpine3.10

ENV CI=true

WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
RUN npm audit fix
EXPOSE 3000

CMD npm start
