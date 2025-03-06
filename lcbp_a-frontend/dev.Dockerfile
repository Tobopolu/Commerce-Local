FROM node:lts-alpine

WORKDIR /app

RUN npm install -g @angular/cli
RUN npm install --save toastr
RUN npm install --save gsap
RUN npm install --save leaflet

EXPOSE 4200

CMD ["sh", "./dev.init_angular.sh"]