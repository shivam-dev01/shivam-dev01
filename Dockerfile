FROM node:14-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN NODE_OPTIONS=--max_old_space_size=1028
RUN ls -a
RUN npm install
RUN npm run build
## this is stage two , where the app actually runs
FROM node:14-alpine
WORKDIR /usr
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /usr/dist .
RUN npm install pm2 -g
EXPOSE 4000
CMD ["pm2-runtime","index.js"]
