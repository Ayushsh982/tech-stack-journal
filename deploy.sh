#!/usr/bin/env bash
# =============================================================
#  deploy.sh — Build both React apps & configure Apache
#  Run from the root of the react-apps/ folder
#  Usage: chmod +x deploy.sh && sudo ./deploy.sh
# =============================================================
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP1_DIR="$SCRIPT_DIR/app1"
APP2_DIR="$SCRIPT_DIR/app2"
CONF_DIR="$SCRIPT_DIR/apache-config"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   React Dual-App Apache Deployment Script   ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ── Step 1: Install dependencies ────────────────────────────
echo "▶ [1/6] Installing App 1 dependencies..."
cd "$APP1_DIR" && npm install --silent

echo "▶ [2/6] Installing App 2 dependencies..."
cd "$APP2_DIR" && npm install --silent

# ── Step 2: Build both apps ──────────────────────────────────
echo "▶ [3/6] Building App 1 (TaskFlow Dashboard)..."
cd "$APP1_DIR" && npm run build

echo "▶ [4/6] Building App 2 (WeatherScope)..."
cd "$APP2_DIR" && npm run build

# ── Step 3: Copy build output to web root ───────────────────
echo "▶ [5/6] Copying builds to /var/www/..."
sudo mkdir -p /var/www/app1 /var/www/app2
sudo rm -rf /var/www/app1/* /var/www/app2/*
sudo cp -r "$APP1_DIR/build/." /var/www/app1/
sudo cp -r "$APP2_DIR/build/." /var/www/app2/

# ── Step 4: Configure Apache ─────────────────────────────────
echo "▶ [6/6] Configuring Apache..."

# Enable required modules
sudo a2enmod headers proxy proxy_http rewrite 2>/dev/null || true

# Add port listeners (idempotent)
if ! grep -q "Listen 8081" /etc/apache2/ports.conf; then
  echo "Listen 8081" | sudo tee -a /etc/apache2/ports.conf
fi
if ! grep -q "Listen 8082" /etc/apache2/ports.conf; then
  echo "Listen 8082" | sudo tee -a /etc/apache2/ports.conf
fi

# Copy & enable virtual host configs
sudo cp "$CONF_DIR/app1-8081.conf"  /etc/apache2/sites-available/
sudo cp "$CONF_DIR/app2-8082.conf"  /etc/apache2/sites-available/
sudo cp "$CONF_DIR/apps-proxy.conf" /etc/apache2/sites-available/

sudo a2ensite app1-8081.conf app2-8082.conf apps-proxy.conf 2>/dev/null || true

# Test config & restart
sudo apache2ctl configtest
sudo systemctl restart apache2

# ── Done ─────────────────────────────────────────────────────
echo ""
echo "✅  Deployment complete!"
echo ""
echo "  Port-based:"
echo "    http://localhost:8081  →  App 1 (TaskFlow)"
echo "    http://localhost:8082  →  App 2 (WeatherScope)"
echo ""
echo "  Path-based:"
echo "    http://localhost/first   →  App 1 (TaskFlow)"
echo "    http://localhost/second  →  App 2 (WeatherScope)"
echo ""
