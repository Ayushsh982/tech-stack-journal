# React Dual-App · Single Apache Server

Two production-ready React TypeScript applications served from one Apache web server — accessible via both **port-based** and **path-based** URLs.

---

## 📁 Project Structure

```
react-apps/
├── app1/                          ← App 1: TaskFlow Dashboard
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskCard.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   └── AddTaskModal.tsx
│   │   ├── hooks/
│   │   │   └── useTasks.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── app2/                          ← App 2: WeatherScope
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── CitySelector.tsx
│   │   │   ├── HourlyForecast.tsx
│   │   │   ├── WeeklyForecast.tsx
│   │   │   └── WeatherMetrics.tsx
│   │   ├── data/
│   │   │   └── mockData.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── apache-config/
│   ├── app1-8081.conf             ← VirtualHost: port 8081
│   ├── app2-8082.conf             ← VirtualHost: port 8082
│   ├── apps-proxy.conf            ← Proxy: /first and /second
│   └── ports-addition.conf        ← Reference for ports.conf
│
├── deploy.sh                      ← Full automated deploy script
└── README.md
```

---

## 🌐 Access URLs

| URL | App |
|-----|-----|
| `http://localhost:8081` | App 1 — TaskFlow Dashboard |
| `http://localhost:8082` | App 2 — WeatherScope |
| `http://localhost/first` | App 1 — TaskFlow Dashboard |
| `http://localhost/second` | App 2 — WeatherScope |

---

## 🚀 Quick Start (VS Code)

### Prerequisites

Make sure you have these installed:

```bash
node --version    # v16+ required (v18+ recommended)
npm --version     # v8+
apache2 -v        # Apache/2.4+
```

Install Apache on Ubuntu/Debian:
```bash
sudo apt update && sudo apt install apache2 -y
```

---

### Option A — Automated (Recommended)

```bash
# 1. Clone / copy this folder, then:
cd react-apps

# 2. Make the script executable
chmod +x deploy.sh

# 3. Run it (needs sudo for Apache config)
sudo ./deploy.sh
```

That's it. Both apps are built and served.

---

### Option B — Manual Step-by-Step

#### Step 1 — Install & build App 1

```bash
cd app1
npm install
npm run build
cd ..
```

#### Step 2 — Install & build App 2

```bash
cd app2
npm install
npm run build
cd ..
```

#### Step 3 — Copy builds to web root

```bash
sudo mkdir -p /var/www/app1 /var/www/app2
sudo cp -r app1/build/. /var/www/app1/
sudo cp -r app2/build/. /var/www/app2/
```

#### Step 4 — Enable Apache modules

```bash
sudo a2enmod headers proxy proxy_http rewrite
```

#### Step 5 — Add ports to Apache

Edit `/etc/apache2/ports.conf` and add:

```
Listen 8081
Listen 8082
```

#### Step 6 — Add virtual host configs

```bash
sudo cp apache-config/app1-8081.conf  /etc/apache2/sites-available/
sudo cp apache-config/app2-8082.conf  /etc/apache2/sites-available/
sudo cp apache-config/apps-proxy.conf /etc/apache2/sites-available/
```

#### Step 7 — Enable the sites

```bash
sudo a2ensite app1-8081.conf
sudo a2ensite app2-8082.conf
sudo a2ensite apps-proxy.conf
```

#### Step 8 — Test config & restart Apache

```bash
sudo apache2ctl configtest   # Should print "Syntax OK"
sudo systemctl restart apache2
```

---

## 🛠️ Development Mode (VS Code)

To run apps locally without Apache (for development):

**App 1** — runs on port 8081:
```bash
cd app1
npm install
npm start        # Opens http://localhost:8081
```

**App 2** — runs on port 8082:
```bash
cd app2
npm install
npm start        # Opens http://localhost:8082
```

Open both terminals side by side in VS Code using the **Split Terminal** feature.

---

## ⚙️ How the Architecture Works

```
Browser
  │
  ├── :8081 ──────────────────► VirtualHost 8081 ──► /var/www/app1/
  │
  ├── :8082 ──────────────────► VirtualHost 8082 ──► /var/www/app2/
  │
  └── :80/first ──────────────► ProxyPass ──► localhost:8081
      :80/second ─────────────► ProxyPass ──► localhost:8082
```

- Each app has its own `VirtualHost` binding on a dedicated port.
- The port-80 `VirtualHost` uses `mod_proxy` to forward `/first` → 8081 and `/second` → 8082.
- `"homepage": "."` in each `package.json` ensures asset paths are relative, so the React build works correctly both at the root and under a sub-path.
- `FallbackResource /index.html` handles client-side React Router navigation.

---

## 🔧 Troubleshooting

| Problem | Fix |
|---------|-----|
| `Address already in use :8081` | `sudo fuser -k 8081/tcp` |
| `403 Forbidden` | Check ownership: `sudo chown -R www-data:www-data /var/www/app1 /var/www/app2` |
| `/first` shows blank page | Ensure `"homepage": "."` is in `package.json` before building |
| `apache2ctl configtest` fails | Run `sudo journalctl -xe` for details |
| Modules missing | `sudo a2enmod proxy proxy_http headers rewrite` then restart |

---

## 📦 Apps Overview

### App 1 — TaskFlow Dashboard
A dark-themed project task manager with:
- Create, filter, and search tasks
- Priority levels (Low / Medium / High / Critical)
- Status progression (Todo → In Progress → Done)
- Live stats bar with completion percentage
- Modal form for adding new tasks

### App 2 — WeatherScope
An elegant weather dashboard with:
- 4 world cities: New York, Tokyo, London, Sydney
- Current conditions with feels-like, humidity, wind, UV, pressure
- Hourly forecast strip
- 7-day weekly forecast with temperature range bars
- Animated ambient background that changes by weather condition
