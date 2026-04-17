## 1. Docker Architecture & Advanced Workflow 

### Docker Architecture
Docker uses a **Client-Server** architecture. The **Docker Client** talks to the **Docker Daemon**, which does the heavy lifting of building, running, and distributing your Docker containers.

---
## 3. ⚙️ Key Components of Docker Architecture

### 3.1 Docker Client

- The interface through which users interact with Docker
- Uses commands like `docker run`, `docker build`, etc.
- Communicates with Docker Daemon via REST API

---

### 3.2 Docker Daemon (dockerd)

- Core service that runs on the host machine
- Responsible for:
  - Building images
  - Running containers
  - Managing networks and volumes

---

### 3.3 Docker Images

- Read-only templates used to create containers
- Built using a **Dockerfile**
- Stored in registries

---

## 📦 Docker Images -Command Line

| Command | Description | Example |
|--------|------------|---------|
| `docker image ls` | List all images | `docker image ls` |
| `docker image pull <image>` | Pull an image from a registry | `docker image pull ubuntu:latest` |
| `docker image inspect <image>` | Inspect an image | `docker image inspect ubuntu:latest` |
| `docker image rm <image>` | Remove an image | `docker image rm ubuntu:latest` |
| `docker image prune` | Remove all unused images | `docker image prune` |

---

### 3.4 Docker Containers

- Running instances of Docker images
- Lightweight and isolated environments
- Can be started, stopped, deleted, and restarted

---

### 3.5 Docker Registry

- Storage for Docker images
- Types:
  - Public (Docker Hub)
  - Private (AWS ECR, Azure Container Registry)

---
