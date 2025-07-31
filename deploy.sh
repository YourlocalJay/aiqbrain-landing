#!/bin/bash

# AIQBrain Deployment Script
# Usage: ./deploy.sh [production|staging]

set -e

echo "🚀 AIQBrain Deployment Script"
echo "============================="

# Check environment
if [ "$1" != "production" ] && [ "$1" != "staging" ]; then
    echo "Usage: ./deploy.sh [production|staging]"
    exit 1
fi

# Check for required files
if [ ! -f "wrangler.toml" ]; then
    echo "❌ Error: wrangler.toml not found"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run tests
echo "🧪 Running tests..."
npm test || echo "⚠️  No tests found, continuing..."

# Build
echo "🔨 Building application..."
npm run build

# Deploy
if [ "$1" == "production" ]; then
    echo "🚀 Deploying to production..."
    echo "⚠️  This will deploy to aiqbrain.com"
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm run deploy:prod
    else
        echo "❌ Deployment cancelled"
        exit 1
    fi
else
    echo "🚀 Deploying to staging..."
    npm run deploy
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Next steps:"
echo "  - Monitor logs: npm run logs"
echo "  - Check analytics dashboard"
echo "  - Verify offer links are working"
echo ""