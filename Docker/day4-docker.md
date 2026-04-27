# Advanced Docker Networking Topics

## 1. Exposing Containers

Use the `--expose` flag to expose ports without publishing them to the host:

```bash
docker run --expose 80 nginx
```

## 2. Link Containers

> **Note:** This is a legacy feature; use user-defined networks instead.

```bash
docker run --name db postgres
docker run --link db:database nginx
```

## 3. MacVLAN Networks

Create a network that allows containers to appear as physical devices on your network:

```bash
docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 my-macvlan-net
```

> Understanding Docker networking is crucial for building complex, multi-container applications.

---

# Docker Volumes and Data Management

Docker containers are ephemeral by nature, meaning any data created inside a container is lost when the container is removed. Docker provides volumes and bind mounts to persist data and share it between containers.

## Types of Data Persistence in Docker

1. **Volumes** – Managed by Docker and stored in a part of the host filesystem.
2. **Bind Mounts** – A file or directory on the host machine mounted into a container.
3. **tmpfs Mounts** – Stored in the host system's memory only.

---

## Working with Docker Volumes

### 1. Create a Volume

```bash
docker volume create my-vol
```

### 2. List Volumes

```bash
docker volume ls
```

### 3. Inspect a Volume

```bash
docker volume inspect my-vol
```

### 4. Remove a Volume

```bash
docker volume rm my-vol
```

### 5. Run a Container with a Volume

```bash
docker run -v my-vol:/app/data nginx
```

---

## Bind Mounts

Bind mounts allow you to mount a file or directory from the host into a container:

```bash
docker run -v /host/path:/container/path nginx
```

Use the `--mount` flag for more verbose and explicit volume mounting:

```bash
docker run --mount type=bind,source=/host/path,target=/container/path nginx
```