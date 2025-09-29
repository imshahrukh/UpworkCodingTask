#!/bin/bash

# Construction Tasks App Setup Script

echo "🏗️  Setting up Construction Tasks App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Build Tailwind CSS
echo "🎨 Building Tailwind CSS..."
npx tailwindcss -i ./src/App.css -o ./src/App.css --watch &

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "🐳 Docker detected - you can use Docker commands"
    echo "   - Development: docker-compose --profile dev up --build"
    echo "   - Production: docker-compose up --build"
else
    echo "⚠️  Docker not found - using local development only"
fi

echo "🚀 Setup complete! You can now run:"
echo "   npm start          - Start development server"
echo "   npm run build      - Build for production"
echo "   npm test           - Run tests"

echo ""
echo "📖 Visit http://localhost:3000 once the server starts"
echo "🎯 Check README.md for detailed usage instructions"
