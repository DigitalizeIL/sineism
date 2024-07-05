#!/bin/bash

if [ -f ../.env ]; then
    export $(cat ../.env | xargs)
else
    echo ".env file not found!"
    exit 1
fi

# Ensure the POSTGRES_PRISMA_URL variable is set
if [ -z "$POSTGRES_CONNECTION_STRING" ]; then
    echo "POSTGRES_CONNECTION_STRING is not set in the .env file."
    exit 1
fi

# Backup file name with date
BACKUP_DIR="../backups"
BACKUP_FILE="${BACKUP_DIR}/backup_$(date +%Y%m%d_%H%M%S).sql"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Run pg_dump with the connection string using psql
psql "$POSTGRES_CONNECTION_STRING" -c "\! pg_dump \"$POSTGRES_CONNECTION_STRING\" -f \"$BACKUP_FILE\""

# Print a message indicating that the backup is complete
echo "Backup completed: $BACKUP_FILE"
