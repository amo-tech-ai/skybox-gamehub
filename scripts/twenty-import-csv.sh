#!/bin/bash

# Twenty CRM CSV Import Wrapper Script
# Loads API key from .env and runs the TypeScript import script

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env"

# Check if .env exists
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Error: .env file not found at $ENV_FILE"
  exit 1
fi

# Load environment variables from .env
export $(grep -v '^#' "$ENV_FILE" | grep -v '^$' | xargs)

# Use localhost base URL for local development by default
# Override with TWENTY_BASE_URL from .env if set, otherwise use localhost
if [ -z "$TWENTY_BASE_URL" ]; then
  # Check if TWENTY_GRAPHQL_URL is set and extract base URL
  if [ -n "$TWENTY_GRAPHQL_URL" ]; then
    # Extract base URL from GraphQL URL (remove /graphql suffix)
    TWENTY_BASE_URL="${TWENTY_GRAPHQL_URL%/graphql}"
  else
    TWENTY_BASE_URL="http://localhost:8080"
  fi
fi

# Check if API key is set
if [ -z "$TWENTY_API_KEY" ]; then
  echo "❌ Error: TWENTY_API_KEY not found in .env file"
  echo "   Please add TWENTY_API_KEY to $ENV_FILE"
  exit 1
fi

# Get CSV file path from first argument
CSV_FILE="$1"

if [ -z "$CSV_FILE" ]; then
  echo "Usage: $0 <csv-file> [options]"
  echo ""
  echo "Options:"
  echo "  --dry-run        Preview changes without creating contacts"
  echo "  --skip-errors    Continue on errors (skip failed rows)"
  echo ""
  echo "Example:"
  echo "  $0 contacts/medellin_top50_mid_agencies.csv"
  echo "  $0 contacts/medellin_top50_mid_agencies.csv --dry-run"
  exit 1
fi

# Check if CSV file exists
if [ ! -f "$CSV_FILE" ]; then
  echo "❌ Error: CSV file not found: $CSV_FILE"
  exit 1
fi

# Make path absolute if relative
if [[ ! "$CSV_FILE" = /* ]]; then
  CSV_FILE="$PROJECT_ROOT/$CSV_FILE"
fi

# Check if ts-node is available
if ! command -v ts-node &> /dev/null; then
  echo "❌ Error: ts-node not found"
  echo "   Install with: npm install -g ts-node typescript"
  exit 1
fi

# Run the TypeScript import script
echo "🚀 Starting CSV import with API key from .env"
echo ""

cd "$PROJECT_ROOT"
ts-node "$SCRIPT_DIR/twenty-import-csv.ts" "$CSV_FILE" \
  --api-key "$TWENTY_API_KEY" \
  --base-url "$TWENTY_BASE_URL" \
  "${@:2}"

