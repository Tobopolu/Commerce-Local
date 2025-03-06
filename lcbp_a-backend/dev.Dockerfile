
FROM node:lts-alpine

WORKDIR /app

RUN npm install -g nodemon
RUN npm install --save multer

# CMD ["nodemon","server.js"]
CMD ["sh", "./dev.init_express.sh"]