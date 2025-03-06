
FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

RUN npm install

# CMD ["docker", "exec -it prod_lcboost_db_ctn /bin/bash;mysql"]
# docker exec -i prod_lcboost_db_ctn /usr/bin/mysql -uroot -pmysqlpw < lcboostdb.sql
# docker exec -i prod_lcboost_db_ctn /usr/bin/mysql -uroot -pmysqlpw -B lcboostdb < lcboostdb.sql
# docker exec -i prod_lcboost_db_ctn /usr/bin/mysql -uroot -B lcboostdb < lcboostdb.sql

CMD ["node", "./server.js"]
