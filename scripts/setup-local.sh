#!/usr/bin/env bash
set -e

echo "Setting up FinWise local development environment..."

if command -v ollama >/dev/null 2>&1; then
  echo "Ollama found. Pulling models..."
  ollama pull llama3.2:3b
  echo "Models ready. Start with: ollama serve"
else
  echo "Ollama not found. Running in Docker..."
  docker-compose -f docker-compose.dev.yml up -d ollama
  sleep 5
  docker exec finwise-ollama ollama pull llama3.2:3b
fi

echo ""
echo "Setup complete. FinWise will use local AI automatically."
echo "Run: npm run dev"
