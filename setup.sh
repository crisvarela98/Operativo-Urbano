#!/bin/bash

# Setup Script para Operativo Urbano
# Este script automatiza la configuración inicial del proyecto

set -e

echo "=========================================="
echo "OPERATIVO URBANO - Setup Automático"
echo "=========================================="
echo ""

# Verificar requisitos
echo "🔍 Verificando requisitos..."

# Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no encontrado. Descargalo desde https://nodejs.org"
    exit 1
fi
echo "✅ Node.js: $(node --version)"

# npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm no encontrado"
    exit 1
fi
echo "✅ npm: $(npm --version)"

# Git
if ! command -v git &> /dev/null; then
    echo "❌ Git no encontrado"
    exit 1
fi
echo "✅ Git: $(git --version | head -1)"

echo ""
echo "📦 Instalando dependencias del backend..."

cd backend

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "ℹ️  node_modules ya existe"
fi

# Crear .env si no existe
if [ ! -f ".env" ]; then
    echo ""
    echo "📝 Creando .env desde .env.example..."
    cp .env.example .env
    echo "⚠️  Por favor edita backend/.env con tus valores"
else
    echo "ℹ️  .env ya existe"
fi

cd ..

echo ""
echo "=========================================="
echo "✅ Setup completado!"
echo "=========================================="
echo ""
echo "Próximos pasos:"
echo ""
echo "1. Edita backend/.env con tus valores:"
echo "   - MONGODB_URI"
echo "   - JWT_SECRET"
echo ""
echo "2. Inicia MongoDB (si lo tienes local):"
echo "   mongod"
echo ""
echo "3. En otra terminal, inicia el backend:"
echo "   npm run backend:dev"
echo ""
echo "4. Abre Godot y carga el proyecto en game/"
echo ""
echo "📚 Más info en DEVELOPMENT.md"
echo ""
