FROM node:alpine

COPY . .
RUN npm install
RUN npx prisma migrate dev --name init
RUN npx prisma generate

# NextJS port
EXPOSE 3000

# Prisma Studio port
EXPOSE 5555

CMD ["npm", "run", "dev"]