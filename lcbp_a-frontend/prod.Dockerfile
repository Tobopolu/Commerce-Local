FROM node:lts-alpine AS builder

WORKDIR /app

ENV URL_BASE="http://localhost:81"

COPY package*.json ./
# COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --omit=dev

FROM nginx:latest 

COPY --from=builder app/dist/lcbp_a-frontend/browser /usr/share/nginx/html

COPY prod_default.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
