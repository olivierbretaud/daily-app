FROM node:12-alpine

# update and install dependency
RUN apk update && apk upgrade

# create destination directory
RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

# build necessary, even if no static files are needed,
# since it builds the server as well

# expose 8081 on container
EXPOSE 8081


CMD ["npm", "start"]

