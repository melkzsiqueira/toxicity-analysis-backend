FROM node:22.13.1-bullseye
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT=80
EXPOSE 80
CMD ["npm", "start"]