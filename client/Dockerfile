FROM node:14

# update and install dependency
#RUN apk update && apk upgrade

#RUN apk add --no-cache curl 

# create destination directory
RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

# "node-sass": "4.12.0",
# install node sass directly on the container
# sudo docker exec -it 4f9e547d02fe npm rebuild node-sass 

COPY . .

# build necessary, even if no static files are needed,
# since it builds the server as well# expose 5000 on container
EXPOSE 3000


# start the app

CMD [ "npm", "run" , "dev"]


