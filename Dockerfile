FROM node:14-alpine as builder
WORKDIR /chat
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN rm -r node_modules
RUN npm install --only=prod

FROM node:14-alpine
WORKDIR /chat
COPY --from=builder /chat . 
ENV NODE_ENV=production
CMD ["node", "dist/backend/web.js"]


# ARG NODE_ENV
# ENV PORT=3005
# EXPOSE ${PORT}
# For debug
# RUN apk update && apk add bash 
# CMD ["/bin/bash"]
