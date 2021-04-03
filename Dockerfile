### STAGE 1: Build ###
FROM node:14-alpine
WORKDIR /app
# COPY package.json ./
COPY . .
RUN npm install -g @angular/cli
RUN npm install
CMD ["npm", "start"]

# ### STAGE 2: Run ###
# FROM nginx:1.13.12-alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
