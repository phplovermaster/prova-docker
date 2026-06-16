# FROM 
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 
# CMD ["node","app.js"]


#ERRO DE FROM (node)
FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# ERRO EXPOSE VAZIO
EXPOSE 
CMD ["node","app.js"]