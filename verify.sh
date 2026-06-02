#!/bin/bash

# CHECKLIST - Verificación de Operativo Urbano
# Este script verifica que todo esté configurado correctamente

set -e

echo "=========================================="
echo "OPERATIVO URBANO - Verificación Completa"
echo "=========================================="
echo ""

PASS="✅"
FAIL="❌"
WARN="⚠️ "

# Contador
TOTAL=0
PASSED=0
FAILED=0

check() {
    local name="$1"
    local cmd="$2"
    local critical="${3:-false}"
    
    TOTAL=$((TOTAL + 1))
    echo -n "[$TOTAL] Verificando $name... "
    
    if eval "$cmd" &> /dev/null; then
        echo "$PASS"
        PASSED=$((PASSED + 1))
    else
        echo "$FAIL"
        FAILED=$((FAILED + 1))
        if [ "$critical" = "true" ]; then
            echo "    ⚠️ CRÍTICO - El proyecto no funcionará"
        fi
    fi
}

echo "🔍 VERIFICANDO REQUISITOS..."
echo ""

# Requisitos críticos
check "Node.js instalado" "command -v node" "true"
check "npm instalado" "command -v npm" "true"
check "Git instalado" "command -v git" "true"

echo ""
echo "🏗️ VERIFICANDO ESTRUCTURA BACKEND..."
echo ""

check "Carpeta backend/" "[ -d 'backend' ]" "true"
check "backend/package.json" "[ -f 'backend/package.json' ]" "true"
check "backend/.env.example" "[ -f 'backend/.env.example' ]" "true"
check "backend/Dockerfile" "[ -f 'backend/Dockerfile' ]"
check "backend/README.md" "[ -f 'backend/README.md' ]"
check "backend/src/server.js" "[ -f 'backend/src/server.js' ]" "true"
check "backend/src/app.js" "[ -f 'backend/src/app.js' ]" "true"
check "backend/src/config/db.js" "[ -f 'backend/src/config/db.js' ]"
check "backend/src/config/env.js" "[ -f 'backend/src/config/env.js' ]"

echo ""
echo "📦 VERIFICANDO MODELOS MONGODB..."
echo ""

check "User.js" "[ -f 'backend/src/models/User.js' ]"
check "PlayerProfile.js" "[ -f 'backend/src/models/PlayerProfile.js' ]"
check "Mission.js" "[ -f 'backend/src/models/Mission.js' ]"
check "Upgrade.js" "[ -f 'backend/src/models/Upgrade.js' ]"
check "MissionResult.js" "[ -f 'backend/src/models/MissionResult.js' ]"

echo ""
echo "🎮 VERIFICANDO ESTRUCTURA GODOT..."
echo ""

check "Carpeta game/" "[ -d 'game' ]" "true"
check "game/project.godot" "[ -f 'game/project.godot' ]" "true"
check "game/README.md" "[ -f 'game/README.md' ]"
check "Escena MainMenu" "[ -f 'game/scenes/MainMenu.tscn' ]"
check "Escena BriefingScreen" "[ -f 'game/scenes/BriefingScreen.tscn' ]"
check "Escena Game" "[ -f 'game/scenes/Game.tscn' ]"
check "Escena ResultScreen" "[ -f 'game/scenes/ResultScreen.tscn' ]"
check "Escena UpgradeScreen" "[ -f 'game/scenes/UpgradeScreen.tscn' ]"

echo ""
echo "📝 VERIFICANDO SCRIPTS GODOT..."
echo ""

check "Player.gd" "[ -f 'game/scripts/player/Player.gd' ]"
check "NPC.gd" "[ -f 'game/scripts/npc/NPC.gd' ]"
check "GameManager.gd" "[ -f 'game/scripts/systems/GameManager.gd' ]"
check "NetworkManager.gd" "[ -f 'game/scripts/systems/NetworkManager.gd' ]"
check "GameLevel.gd" "[ -f 'game/scripts/systems/GameLevel.gd' ]"
check "Classes.gd" "[ -f 'game/scripts/systems/Classes.gd' ]"

echo ""
echo "📚 VERIFICANDO DOCUMENTACIÓN..."
echo ""

check "README.md" "[ -f 'README.md' ]"
check "QUICKSTART.md" "[ -f 'QUICKSTART.md' ]"
check "DEVELOPMENT.md" "[ -f 'DEVELOPMENT.md' ]"
check "CONTRIBUTING.md" "[ -f 'CONTRIBUTING.md' ]"
check "PROJECT_SUMMARY.md" "[ -f 'PROJECT_SUMMARY.md' ]"
check "LICENSE" "[ -f 'LICENSE' ]"

echo ""
echo "⚙️ VERIFICANDO CONFIGURACIÓN..."
echo ""

check ".gitignore" "[ -f '.gitignore' ]"
check "docker-compose.yml" "[ -f 'docker-compose.yml' ]"
check "setup.sh" "[ -f 'setup.sh' ]"
check "package.json (raíz)" "[ -f 'package.json' ]"

echo ""
echo "=========================================="
echo "RESULTADO FINAL"
echo "=========================================="
echo ""
echo "Total verificaciones: $TOTAL"
echo "Pasadas: $PASSED $PASS"
echo "Fallidas: $FAILED $FAIL"
echo ""

if [ $FAILED -eq 0 ]; then
    echo "$PASS TODOS LOS CHECKS PASARON!"
    echo ""
    echo "Próximos pasos:"
    echo "1. Lee QUICKSTART.md"
    echo "2. Ejecuta: bash setup.sh"
    echo "3. Inicia backend: npm run backend:dev"
    echo "4. Abre Godot: cd game && godot"
    echo ""
    exit 0
else
    echo "$FAIL ALGUNOS CHECKS FALLARON"
    echo "Por favor verifica la estructura del proyecto"
    echo ""
    exit 1
fi
