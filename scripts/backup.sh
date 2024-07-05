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

BACKUP_FILE="sineism_db_backup.sql"

# Run pg_dump with the connection string using psql
psql "$POSTGRES_CONNECTION_STRING" -c "\! pg_dump \"$POSTGRES_CONNECTION_STRING\" -f \"$BACKUP_FILE\""

# Print a message indicating that the backup is complete
echo "Backup completed: $BACKUP_FILE"
