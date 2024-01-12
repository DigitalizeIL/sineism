#!/bin/zsh

# Install dependencies
pnpm install

# Generate the prisma client
npx prisma generate

# Start the db
docker-compose up -d

# Push the db schema
npx prisma db push

