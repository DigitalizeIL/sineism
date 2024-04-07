#!/bin/zsh

# Install dependencies
bun install

# Generate the prisma client
bunx prisma generate

# Start the db
docker-compose up -d

# Push the db schema
bunx prisma db push

