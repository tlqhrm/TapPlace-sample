FROM tlqhrm/nestjs:9.0.0

WORKDIR /tapplace
COPY .  .
CMD ["npm", "run", "start:dev"]
