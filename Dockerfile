FROM tlqhrm/nestjs

WORKDIR /tapplace
COPY . /BACKEND
CMD ["npm", "run", "start:dev"]