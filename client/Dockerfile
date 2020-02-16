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

# expose 5000 on container
EXPOSE 3000

ENV NODE_ENV=dev

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

# start the app
CMD [ "npm", "run" , "dev"]


