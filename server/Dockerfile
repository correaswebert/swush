# ensure the exact baseimage is used
FROM node:14.15.4-alpine3.12

# install dumb-init for invoking docker
RUN apk add dumb-init

# optimize for production
ENV NODE_ENV production

WORKDIR /usr/src/app

# 'node' process owns the files now, not 'root'
COPY --chown=node:node . .

# do not install dev dependencies
RUN npm i --only=prod

# make 'node' as the process owner, not 'root'
USER node

# prevent starting process as PID1 by using dumb-init
CMD ["dumb-init", "npm", "start"]
