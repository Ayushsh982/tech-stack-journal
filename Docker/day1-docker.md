# Day 1: Docker Fundamentals 

---

## 1. What is Docker?
**Docker** is an open-source platform that enables developers to build, deploy, and run applications inside **containers**.

---

## 2. Why Do We Use It? (Key Benefits)

* **Consistency ("It Works on My Machine"):** Docker guarantees that an application runs the same way in development, testing, and production environments, eliminating configuration errors.

* **Isolation:** Multiple applications (even those requiring different versions of the same language) can run on the same server without interfering with each other.

* **Efficiency & Speed:** Containers are much lighter than Virtual Machines (VMs). They don't include an entire Guest OS, so they share the host’s resources, boot in seconds, and have a small footprint.

* **Portability:** You can build a container locally on Windows or Mac and deploy it directly to a Linux cloud server without rebuilding.

---

## 3. The Dockerfile Instruction Set 

A `Dockerfile` is a text document that contains all the commands a user could call on the command line to assemble an image. Here are the core instructions:

### 1. `FROM`
**Description:** Sets the base image for subsequent instructions. Every Dockerfile must start with `FROM`.
**Syntax:**
```dockerfile
FROM <ImageName>

---

### 2. `COPY`
**Description:** Used to copy files or folders from your host machine into the Docker image while building.
**Syntax:**
```Dockerfile
COPY <Source> <Destination>
# Example: COPY ./app /app
```
### 3. ADD 

**Description:**  
Has all the features of COPY, but can also handle remote file URLs and automatically unpack local tar archives. Preference should generally be given to COPY unless you need the URL or extraction features.

**Syntax:**
```Dockerfile
ADD <Source> <Destination>
# Example: ADD https://example.com/big.tar.xz /app
```
### 4. RUN
**Description:**   Executes commands in a new layer on top of the current image and commits the results. **Syntax:**
```Dockerfile
RUN <Command>
# Example: RUN apt-get update && apt-get install -y python3
```
### 5. CMD
**Description:**  
Provides defaults for an executing container. These defaults can include an executable, or they can omit the executable, in which case you must specify an `ENTRYPOINT` instruction as well.
**Syntax:** 
```Dockerfile
CMD ["executable","param1","param2"]
# Example: CMD ["python3", "app.py"]
```
### 6. ENTRYPOINT
**Description:**  
Configures a container that will run as an executable. Always run in the foreground.
**Syntax:**
```Dockerfile
ENTRYPOINT ["executable", "param1", "param2"]
# Example: ENTRYPOINT ["python3", "app.py"]
```
### 7. ENV
**Description:**  
Sets environment variables for the container.
**Syntax:**
```Dockerfile
ENV <key>=<value>
# Example: ENV PORT=8080    
```

## 4. Understanding Image Types (Public vs. Private) 

When working with Docker images, they generally fall into two categories based on where they are stored and who can access them:

### 🌐 Public Images
* **Storage:** Stored in public registries like **Docker Hub**.
* **Access:** Anyone with an internet connection can access and download them.
* **Usage:** These are typically used as "Base Images" for your projects.
* **Examples:** Official images like `nginx`, `ubuntu`, `python`, and `node`.

### 🔒 Private Images
* **Storage:** Stored in private registries such as **Azure Container Registry (ACR)**, **AWS Elastic Container Registry (ECR)**, or private repositories on **Docker Hub**.
* **Access:** Only authorized team members or systems with specific credentials can pull or push these images.
* **Usage:** Custom images built by your company or team that contain proprietary code, specific security patches, or internal configurations.
* **Benefit:** Provides security, control over intellectual property, and faster pull times within internal networks.

---
# 💻 Essential Docker Command Reference

This documentation compiles the core commands required to manage the lifecycle of containers and images, based on my primary learning notes.

---
## 💻 Basic Docker Commands

| Command | Description | Example |
|--------|------------|---------|
| `docker --version` | Check Docker version | `docker --version` |
| `docker info` | Display system information | `docker info` |
| `docker help` | Show all available commands | `docker help` |

---


---
## 1. Container Lifecycle & Management

| # | Command | Description | Key Flags / Details |
| :--- | :--- | :--- | :--- |
| **1** | `docker container run <image>` | Create and start a new container. | Use `--name` to give it a custom name. |
| **2** | `docker pull <image>` | Pull an image from the registry. | Downloads from Docker Hub by default. |
| **3** | `docker ps` | List containers. | `-a`: All, `-l`: Latest, `-q`: IDs only. |
| **4** | `docker container stop <ID>` | Stop a running container. | Uses the container ID or Name. |
| **5** | `docker container start <ID>` | Start a stopped container. | Re-activates an existing container. |
| **6** | `docker rm <ID>` | Remove a container. | `-f`: Force, `-v`: Remove volumes. |

---

## 2. Image Management

| # | Command | Description | Syntax |
| :--- | :--- | :--- | :--- |
| **7** | `docker rmi <image>` | Delete a local image. | `docker rmi <Image_ID>` |
| **8** | `docker images` | List all pulled images. | Shows repository, tag, and size. |
| **12**| `docker push <image>` | Upload image to registry. | `docker push <username>/<image_name>` |
| **13**| `docker build` | Build image from Dockerfile. | `docker build -t <tag_name> .` |

---

## 3. Interaction & Networking

### 9. Docker Exec (Execute)
**Description:** Run a new command inside a **running** container.
* `-i` : Interactive (Keep STDIN open).
* `-t` : Pseudo-TTY (Terminal).
* `-d` : Detached mode (Background).
* `-e` : Set environment variables.

**Syntax:**
```bash
docker exec -it <container_id> bash