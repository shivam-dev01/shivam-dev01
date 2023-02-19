FROM node:17
WORKDIR /app
COPY package.json .
RUN npm install --force
COPY . ./
ENV PORT 3000
EXPOSE $PORT
CMD ["npm", "run", "start"]