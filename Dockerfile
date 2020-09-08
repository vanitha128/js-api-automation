FROM node:12
WORKDIR /api/.
ADD . /api/.
RUN npm install
RUN npm install -g json-server
EXPOSE 3000
CMD ["sh","start.sh"]