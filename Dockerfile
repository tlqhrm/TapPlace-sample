FROM node:16

WORKDIR /tapplace
RUN npm install -g @nestjs/cli
COPY . /tapplace
# RUN npm install
# CMD ["npm", "install"]