#!/usr/bin/env bash
set -e

echo "Setting up FinWise local AI..."

if command -v ollama >/dev/null 2>&1; then
  echo "Ollama found. Pulling llama3.2:3b (2GB)..."
  ollama pull llama3.2:3b
  echo "Done. Run: ollama serve (in a separate terminal), then: npm run dev"
else
  echo "Starting Ollama via Docker..."
  docker-compose -f docker-compose.dev.yml up -d ollama
  sleep 10
  docker exec finwise-ollama ollama pull llama3.2:3b
  echo "Done. Run: npm run dev"
fi
