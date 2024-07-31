FROM node:20-alpine

WORKDIR /usr/src/app

COPY package* .

RUN npm install
COPY ./prisma .
RUN npx prisma generate

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js" ]


