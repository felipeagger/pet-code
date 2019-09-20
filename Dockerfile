FROM node:10

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./ 

COPY . .

COPY --chown=node:node . .

RUN npm install --loglevel=error

USER node

EXPOSE 8080

CMD [ "node", "src/server.js" ]
