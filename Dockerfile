FROM node:18-alpine3.16

WORKDIR /api

COPY ./package*.json ./
COPY tsconfig.json ./
COPY .env ./


RUN npm install 
RUN npm run build

COPY . .

CMD ["npm", "run", "start:debug"]