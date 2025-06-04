FROM node:18-alpine
LABEL description="Frontend client for Kevin's portfolio"
WORKDIR /frontend
COPY ./package.json ./package-lock.json* ./npmrc* ./
RUN npm install --legacy-peer-deps
COPY . .
CMD ["npm", "run", "start"]