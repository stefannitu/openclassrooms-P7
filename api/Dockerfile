FROM node:16
WORKDIR /usr/src/api
COPY . .
RUN npm install
RUN npx prisma generate --schema=./src/prisma/schema.prisma
EXPOSE 4300
CMD ["npm","start"]