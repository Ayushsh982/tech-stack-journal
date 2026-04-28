# Linux & Docker Complete Tutorial.

> 
---

## Table of Contents

### 🐧 Linux 
1. [Introduction to Linux](#1-introduction-to-linux)
2. [Linux File System Hierarchy](#2-linux-file-system-hierarchy)
3. [Basic Linux Commands](#3-basic-linux-commands)
4. [File & Directory Management](#4-file--directory-management)
5. [File Permissions & Ownership](#5-file-permissions--ownership)
6. [Text Processing & Filters](#6-text-processing--filters)
7. [Redirection & Piping](#7-redirection--piping)
8. [Process Management](#8-process-management)
9. [Systemd & Service Management](#9-systemd--service-management)
10. [Package Management](#10-package-management)
11. [Linux Networking Basics](#11-linux-networking-basics)
12. [SSH & Remote Access](#12-ssh--remote-access)
13. [Disk & Storage Management](#13-disk--storage-management)
14. [Shell Scripting](#14-shell-scripting)
15. [Environment Variables & Configuration](#15-environment-variables--configuration)
16. [Cron Jobs & Scheduling](#16-cron-jobs--scheduling)
17. [User & Group Management](#17-user--group-management)
18. [Advanced Linux Topics](#18-advanced-linux-topics)

### 🐳 Docker — Networking & Container Management
19. [Copying Files Between Host and Container](#19-copying-files-between-host-and-container)
20. [Monitoring Containers](#20-monitoring-containers)
21. [Container Resource Constraints](#21-container-resource-constraints)
22. [Updating Containers](#22-updating-containers)
23. [Container Restart Policies](#23-container-restart-policies)
24. [Attaching to and Detaching from Containers](#24-attaching-to-and-detaching-from-containers)
25. [Docker Networking](#25-docker-networking)
26. [Network Drivers](#26-network-drivers)
27. [Listing and Inspecting Networks](#27-listing-and-inspecting-networks)
28. [Creating Custom Networks](#28-creating-custom-networks)
29. [Connecting Containers to Networks](#29-connecting-containers-to-networks)
30. [Container DNS](#30-container-dns)
31. [Port Mapping](#31-port-mapping)
32. [Network Troubleshooting](#32-network-troubleshooting)

---

## 🐧 Linux — 

---

## 1. Introduction to Linux

Linux is an open-source, Unix-like operating system kernel created by **Linus Torvalds** in 1991. It powers everything from personal computers to servers, smartphones (Android), supercomputers, and cloud infrastructure.

### Why Learn Linux?

- Most web servers run Linux (Apache, Nginx)
- All major cloud providers (AWS, GCP, Azure) are Linux-first
- Required for DevOps, Docker, Kubernetes, and system administration
- Free, open-source, and highly customizable

### Popular Linux Distributions

| Distribution | Use Case |
|---|---|
| Ubuntu | Beginners, Desktop, Servers |
| CentOS / RHEL | Enterprise Servers |
| Debian | Stability-focused Servers |
| Arch Linux | Advanced users, rolling release |
| Kali Linux | Penetration Testing |
| Fedora | Cutting-edge desktop |

### Accessing the Terminal

```bash
# On Ubuntu/Debian — open terminal with:
Ctrl + Alt + T

# Check your Linux version
uname -a
lsb_release -a

# Check current shell
echo $SHELL
```

---

## 2. Linux File System Hierarchy

Linux uses a single unified directory tree starting from `/` (root).

```
/
├── bin/        → Essential user binaries (ls, cp, mv)
├── boot/       → Boot loader files (kernel, grub)
├── dev/        → Device files (sda, tty, null)
├── etc/        → System configuration files
├── home/       → User home directories (/home/ayush)
├── lib/        → Shared libraries
├── media/      → Mount points for removable media
├── mnt/        → Temporary mount points
├── opt/        → Optional third-party software
├── proc/       → Virtual filesystem for process info
├── root/       → Home directory for root user
├── run/        → Runtime data (PIDs, sockets)
├── sbin/       → System binaries (for root use)
├── srv/        → Data for services (web, ftp)
├── sys/        → Virtual filesystem for kernel/hardware info
├── tmp/        → Temporary files (cleared on reboot)
├── usr/        → User programs and data
│   ├── bin/    → Non-essential user binaries
│   ├── lib/    → Libraries for /usr/bin
│   └── share/  → Shared data
└── var/        → Variable data (logs, databases, spools)
    ├── log/    → System logs
    └── www/    → Web server files
```

### Key Paths to Remember

```bash
/etc/passwd          # User account info
/etc/shadow          # Encrypted passwords
/etc/hosts           # Static hostname resolution
/etc/fstab           # Filesystem mount table
/var/log/syslog      # System log (Debian/Ubuntu)
/var/log/messages    # System log (RHEL/CentOS)
/proc/cpuinfo        # CPU information
/proc/meminfo        # Memory information
```

---

## 3. Basic Linux Commands

### Navigation

```bash
pwd                  # Print working directory
ls                   # List files
ls -la               # List all files (including hidden) with details
ls -lh               # Human-readable file sizes
cd /path/to/dir      # Change directory
cd ~                 # Go to home directory
cd ..                # Go up one level
cd -                 # Go to previous directory
```

### Getting Help

```bash
man ls               # Manual page for ls
ls --help            # Quick help
info bash            # Info pages (more detailed)
whatis ls            # One-line description
apropos copy         # Search man pages by keyword
```

### System Information

```bash
uname -a             # Kernel info
hostname             # Current hostname
whoami               # Current user
id                   # User ID and group ID
uptime               # System uptime
date                 # Current date/time
cal                  # Calendar
df -h                # Disk usage (human-readable)
free -h              # Memory usage
top                  # Live process viewer
htop                 # Enhanced process viewer (install separately)
```

---

## 4. File & Directory Management

### Creating & Removing

```bash
touch file.txt               # Create empty file (or update timestamp)
mkdir mydir                  # Create directory
mkdir -p a/b/c               # Create nested directories
rm file.txt                  # Remove file
rm -r mydir/                 # Remove directory recursively
rm -rf mydir/                # Force remove (no confirmation) — USE WITH CAUTION
rmdir emptydir               # Remove empty directory
```

### Copying & Moving

```bash
cp file.txt backup.txt       # Copy file
cp -r dir1/ dir2/            # Copy directory recursively
mv file.txt /tmp/            # Move file
mv oldname.txt newname.txt   # Rename file
```

### Viewing Files

```bash
cat file.txt                 # Print entire file
less file.txt                # Page through file (q to quit)
more file.txt                # Similar to less
head -n 20 file.txt          # First 20 lines
tail -n 20 file.txt          # Last 20 lines
tail -f /var/log/syslog      # Follow file in real time (great for logs)
```

### Finding Files

```bash
find / -name "*.txt"                     # Find all .txt files from root
find /home -type f -size +10M            # Files larger than 10MB
find . -name "*.log" -mtime -7           # Modified in last 7 days
find . -name "*.conf" -exec cat {} \;    # Find and execute command
locate filename                          # Fast search using database (updatedb first)
which python3                            # Show path of command
whereis python3                          # Show binary, source, man page
```

### Links

```bash
ln file.txt hardlink.txt              # Hard link (shares inode)
ln -s /path/to/file symlink.txt       # Symbolic (soft) link
ls -li                                # Show inodes to see hard links
```

---

## 5. File Permissions & Ownership

### Understanding Permissions

```
-rwxr-xr--  1  ayush  users  4096  Apr 21 09:00  script.sh
 │││││││││       │       │
 │││││││└──────── other: r-- (read only)
 │││└──────────── group: r-x (read + execute)
 │└────────────── owner: rwx (read + write + execute)
 └─────────────── file type: - (file), d (dir), l (link)
```

| Symbol | Octal | Meaning |
|--------|-------|---------|
| r | 4 | Read |
| w | 2 | Write |
| x | 1 | Execute |
| - | 0 | No permission |

### chmod — Change Permissions

```bash
chmod 755 script.sh           # Owner: rwx, Group: r-x, Other: r-x
chmod 644 file.txt            # Owner: rw-, Group: r--, Other: r--
chmod +x script.sh            # Add execute for all
chmod u+x,g-w file.txt        # Add execute for user, remove write for group
chmod -R 755 mydir/           # Recursive
```

### chown — Change Ownership

```bash
chown ayush file.txt              # Change owner
chown ayush:developers file.txt   # Change owner and group
chown -R ayush:ayush mydir/       # Recursive
```

### Special Permissions

```bash
chmod 4755 program      # Setuid — run as file owner
chmod 2755 program      # Setgid — run as group owner
chmod 1777 /tmp         # Sticky bit — only owner can delete their files
```

### umask — Default Permissions

```bash
umask                   # Show current umask (e.g., 0022)
umask 027               # New files: 640, New dirs: 750
```

---

## 6. Text Processing & Filters

### grep — Search Text

```bash
grep "error" logfile.txt              # Search for pattern
grep -i "error" logfile.txt           # Case-insensitive
grep -r "TODO" /home/ayush/           # Recursive search
grep -n "error" logfile.txt           # Show line numbers
grep -v "debug" logfile.txt           # Invert match (exclude)
grep -c "error" logfile.txt           # Count matches
grep -E "error|warn" logfile.txt      # Extended regex (OR)
grep -A 3 "error" logfile.txt         # 3 lines after match
grep -B 3 "error" logfile.txt         # 3 lines before match
```

### sed — Stream Editor

```bash
sed 's/old/new/' file.txt             # Replace first occurrence per line
sed 's/old/new/g' file.txt            # Replace all occurrences
sed -i 's/old/new/g' file.txt         # Edit file in place
sed '5d' file.txt                     # Delete line 5
sed '1,3d' file.txt                   # Delete lines 1 to 3
sed -n '5,10p' file.txt               # Print lines 5 to 10
```

### awk — Pattern Processing

```bash
awk '{print $1}' file.txt             # Print first column
awk '{print $1, $3}' file.txt         # Print columns 1 and 3
awk -F: '{print $1}' /etc/passwd      # Custom delimiter (colon)
awk '/error/ {print}' logfile.txt     # Print lines matching pattern
awk '{sum += $1} END {print sum}'     # Sum a column
awk 'NR==5' file.txt                  # Print line 5
```

### Other Useful Tools

```bash
cut -d: -f1 /etc/passwd               # Cut field 1 (colon delimiter)
sort file.txt                         # Sort alphabetically
sort -n numbers.txt                   # Sort numerically
sort -u file.txt                      # Sort and remove duplicates
uniq file.txt                         # Remove consecutive duplicates
uniq -c file.txt                      # Count occurrences
wc -l file.txt                        # Count lines
wc -w file.txt                        # Count words
wc -c file.txt                        # Count characters
tr 'a-z' 'A-Z' < file.txt            # Translate (lowercase to uppercase)
diff file1.txt file2.txt              # Compare files
```

---

## 7. Redirection & Piping

### Standard Streams

| Stream | FD | Default |
|--------|----|---------|
| stdin  | 0  | Keyboard |
| stdout | 1  | Terminal |
| stderr | 2  | Terminal |

### Redirection

```bash
command > output.txt          # Redirect stdout (overwrite)
command >> output.txt         # Redirect stdout (append)
command < input.txt           # Redirect stdin
command 2> error.txt          # Redirect stderr
command 2>&1                  # Redirect stderr to stdout
command &> all.txt            # Redirect both stdout and stderr
command > /dev/null 2>&1      # Discard all output
```

### Piping

```bash
ls -la | grep ".txt"                          # Pipe ls output to grep
cat /etc/passwd | cut -d: -f1 | sort          # Chain multiple commands
ps aux | grep nginx | awk '{print $2}'        # Get nginx PIDs
history | grep docker | tail -20              # Last 20 docker commands
dmesg | grep -i error | less                  # Scroll through kernel errors
```

### tee — Split Output

```bash
command | tee output.txt                # Print to terminal AND save to file
command | tee -a output.txt             # Append instead of overwrite
```

### Here Documents

```bash
cat <<EOF > config.txt
server=localhost
port=8080
debug=true
EOF
```

---

## 8. Process Management

### Viewing Processes

```bash
ps                            # Current user's processes
ps aux                        # All processes (BSD style)
ps -ef                        # All processes (UNIX style)
ps aux | grep nginx           # Filter processes
top                           # Live process monitor
htop                          # Enhanced live monitor
pgrep nginx                   # Get PID by name
pidof nginx                   # Get PID (exact name match)
```

### Controlling Processes

```bash
kill PID                      # Send SIGTERM (graceful stop)
kill -9 PID                   # Send SIGKILL (force stop)
kill -15 PID                  # Send SIGTERM explicitly
killall nginx                 # Kill all processes named nginx
pkill -f "python script.py"   # Kill by pattern match

# Signals
kill -l                       # List all signals
# Common signals:
# SIGHUP (1)  — Reload config
# SIGINT (2)  — Ctrl+C
# SIGKILL (9) — Force kill (unblockable)
# SIGTERM (15)— Graceful termination
```

### Background & Foreground

```bash
command &                     # Run in background
jobs                          # List background jobs
fg %1                         # Bring job 1 to foreground
bg %1                         # Resume job 1 in background
Ctrl + Z                      # Suspend current foreground process
nohup command &               # Run immune to hangups
disown %1                     # Remove job from shell's job list
```

### Process Priority (nice)

```bash
nice -n 10 command            # Run with lower priority (+10)
nice -n -10 command           # Run with higher priority (needs root)
renice -n 5 -p PID            # Change priority of running process
```

---

## 9. Systemd & Service Management

### Managing Services

```bash
systemctl start nginx             # Start service
systemctl stop nginx              # Stop service
systemctl restart nginx           # Restart service
systemctl reload nginx            # Reload config (no downtime)
systemctl status nginx            # Check service status
systemctl enable nginx            # Enable at boot
systemctl disable nginx           # Disable at boot
systemctl is-active nginx         # Check if running
systemctl is-enabled nginx        # Check if enabled at boot
systemctl list-units --type=service  # List all services
```

### Viewing Logs with journalctl

```bash
journalctl                            # All logs
journalctl -u nginx                   # Logs for nginx service
journalctl -u nginx --since today     # Today's logs
journalctl -u nginx -n 50            # Last 50 lines
journalctl -u nginx -f               # Follow logs (live)
journalctl --disk-usage               # Disk usage of journal
journalctl --vacuum-size=500M         # Limit journal size
```

### Creating a Custom Systemd Service

```bash
# Create service file
sudo nano /etc/systemd/system/myapp.service
```

```ini
[Unit]
Description=My Custom Application
After=network.target

[Service]
Type=simple
User=ayush
WorkingDirectory=/home/ayush/myapp
ExecStart=/usr/bin/python3 /home/ayush/myapp/app.py
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload          # Reload systemd config
sudo systemctl enable myapp           # Enable at boot
sudo systemctl start myapp            # Start now
```

---

## 10. Package Management

### Ubuntu / Debian (apt)

```bash
sudo apt update                       # Update package lists
sudo apt upgrade                      # Upgrade installed packages
sudo apt install nginx                # Install package
sudo apt remove nginx                 # Remove package
sudo apt purge nginx                  # Remove package + config files
sudo apt autoremove                   # Remove unused dependencies
apt search nginx                      # Search packages
apt show nginx                        # Package details
dpkg -l | grep nginx                  # List installed (filter)
dpkg -L nginx                         # Files installed by package
```

### RHEL / CentOS (dnf / yum)

```bash
sudo dnf update                       # Update all packages
sudo dnf install nginx                # Install
sudo dnf remove nginx                 # Remove
dnf search nginx                      # Search
dnf info nginx                        # Package info
rpm -qa | grep nginx                  # List installed RPM packages
```

### Installing from Source

```bash
# Generic build from source
wget https://example.com/app-1.0.tar.gz
tar xzf app-1.0.tar.gz
cd app-1.0/
./configure --prefix=/usr/local
make
sudo make install
```

---

## 11. Linux Networking Basics

### Network Interfaces

```bash
ip addr show                          # Show all interfaces and IPs
ip addr show eth0                     # Show specific interface
ip link show                          # Show link status
ifconfig                              # Legacy (install net-tools)
```

### Routing

```bash
ip route show                         # Routing table
ip route add default via 192.168.1.1  # Add default gateway
traceroute google.com                 # Trace route to host
```

### DNS

```bash
nslookup google.com                   # DNS lookup
dig google.com                        # Detailed DNS info
dig google.com MX                     # Query MX records
cat /etc/resolv.conf                  # DNS servers
cat /etc/hosts                        # Local hostname resolution
```

### Connectivity Testing

```bash
ping -c 4 google.com                  # Ping 4 times
ping6 ipv6.google.com                 # IPv6 ping
curl -I https://google.com            # HTTP headers only
curl -O https://example.com/file.txt  # Download file
wget https://example.com/file.txt     # Download file
```

### Ports & Sockets

```bash
ss -tuln                              # All listening ports
ss -tnp                               # TCP connections with PIDs
netstat -tuln                         # Legacy equivalent
lsof -i :80                           # What's using port 80
lsof -i tcp                           # All TCP connections
```

### Firewall (ufw)

```bash
sudo ufw status                       # Check status
sudo ufw enable                       # Enable firewall
sudo ufw allow 22                     # Allow SSH
sudo ufw allow 80/tcp                 # Allow HTTP
sudo ufw allow 443/tcp                # Allow HTTPS
sudo ufw deny 3306                    # Deny MySQL from outside
sudo ufw delete allow 80              # Remove rule
sudo ufw status numbered              # Show rules with numbers
```

---

## 12. SSH & Remote Access

### Basic SSH

```bash
ssh user@hostname                     # Connect to remote host
ssh -p 2222 user@hostname             # Non-default port
ssh -i ~/.ssh/mykey.pem user@host     # Use specific key
ssh -v user@host                      # Verbose (debugging)
```

### SSH Key Authentication

```bash
ssh-keygen -t ed25519 -C "email@example.com"    # Generate key pair
ssh-keygen -t rsa -b 4096                        # RSA 4096-bit (alternative)
ssh-copy-id user@remote-host                     # Copy public key to server
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys  # Manual method
```

### SSH Config File (`~/.ssh/config`)

```
Host myserver
    HostName 192.168.1.100
    User ayush
    Port 2222
    IdentityFile ~/.ssh/mykey
```

```bash
ssh myserver                          # Connect using alias
```

### SCP & SFTP

```bash
scp file.txt user@host:/remote/path   # Copy file to remote
scp user@host:/remote/file.txt .      # Copy file from remote
scp -r mydir/ user@host:/remote/      # Copy directory
sftp user@host                        # Interactive SFTP session
```

### SSH Tunneling

```bash
# Local port forwarding (access remote service locally)
ssh -L 8080:localhost:80 user@remote-host

# Remote port forwarding (expose local service remotely)
ssh -R 9090:localhost:3000 user@remote-host

# SOCKS proxy
ssh -D 1080 user@remote-host
```

---

## 13. Disk & Storage Management

### Disk Usage

```bash
df -h                                 # Disk space usage (all mounts)
df -h /home                           # Specific mount point
du -sh /var/log                       # Directory size (summary)
du -sh /var/log/*                     # Size of each item inside
du -h --max-depth=1 /                 # Top-level dir sizes
```

### Partitions & Mounting

```bash
lsblk                                 # List block devices (tree view)
fdisk -l                              # Partition table info (root)
blkid                                 # Block device UUIDs
mount /dev/sdb1 /mnt/data             # Mount partition
umount /mnt/data                      # Unmount
mount -a                              # Mount all in /etc/fstab
```

### /etc/fstab — Persistent Mounts

```
# Device        MountPoint   FSType   Options          Dump  Pass
UUID=abc123     /mnt/data    ext4     defaults          0     2
//server/share  /mnt/nas     cifs     credentials=/etc/creds  0  0
```

### Creating Filesystems

```bash
mkfs.ext4 /dev/sdb1                   # Format as ext4
mkfs.xfs /dev/sdb1                    # Format as XFS
fsck /dev/sdb1                        # Check and repair filesystem
```

### Logical Volume Manager (LVM)

```bash
pvdisplay                             # Physical volumes
vgdisplay                             # Volume groups
lvdisplay                             # Logical volumes
lvcreate -L 10G -n mydata vgdata      # Create 10G logical volume
lvextend -L +5G /dev/vgdata/mydata    # Extend by 5G
resize2fs /dev/vgdata/mydata          # Resize filesystem after extend
```

---

## 14. Shell Scripting

### Script Basics

```bash
#!/bin/bash
# This is a comment

echo "Hello, World!"
```

```bash
chmod +x script.sh          # Make executable
./script.sh                 # Run script
bash script.sh              # Run without execute permission
```

### Variables

```bash
name="Ayush"                          # Assign (no spaces around =)
echo $name                            # Use variable
echo "${name}_backup"                 # Variable in string
readonly PI=3.14                      # Read-only variable
unset name                            # Delete variable

# Command substitution
current_date=$(date +%Y-%m-%d)
file_count=$(ls | wc -l)
```

### Input & Arguments

```bash
read -p "Enter name: " username       # Interactive input
echo "Hello, $username"

# Script arguments
$0    # Script name
$1    # First argument
$@    # All arguments
$#    # Number of arguments
$?    # Exit code of last command
$$    # Current script PID
```

### Conditionals

```bash
if [ "$name" == "ayush" ]; then
    echo "Welcome!"
elif [ "$name" == "root" ]; then
    echo "Root access"
else
    echo "Unknown user"
fi

# File tests
if [ -f "/etc/nginx/nginx.conf" ]; then echo "File exists"; fi
if [ -d "/var/log" ]; then echo "Directory exists"; fi
if [ -r "$file" ]; then echo "Readable"; fi
if [ -w "$file" ]; then echo "Writable"; fi
if [ -x "$file" ]; then echo "Executable"; fi
if [ -s "$file" ]; then echo "Not empty"; fi

# Numeric comparisons
if [ $count -gt 10 ]; then echo "More than 10"; fi
# -eq  equal
# -ne  not equal
# -lt  less than
# -le  less than or equal
# -gt  greater than
# -ge  greater than or equal
```

### Loops

```bash
# For loop
for i in 1 2 3 4 5; do
    echo "Number: $i"
done

# For loop over files
for file in /var/log/*.log; do
    echo "Processing: $file"
done

# C-style for loop
for ((i=0; i<10; i++)); do
    echo $i
done

# While loop
count=0
while [ $count -lt 5 ]; do
    echo "Count: $count"
    ((count++))
done

# Until loop
until [ $count -ge 5 ]; do
    echo $count
    ((count++))
done
```

### Functions

```bash
greet() {
    local name=$1          # Local variable
    echo "Hello, $name!"
    return 0               # Return exit code
}

greet "Ayush"
result=$?                  # Capture exit code
```

### Arrays

```bash
fruits=("apple" "banana" "cherry")
echo ${fruits[0]}          # First element
echo ${fruits[@]}          # All elements
echo ${#fruits[@]}         # Array length
fruits+=("mango")          # Append

# Iterate
for fruit in "${fruits[@]}"; do
    echo $fruit
done
```

### Error Handling

```bash
set -e                     # Exit on any error
set -u                     # Error on undefined variables
set -o pipefail            # Catch pipe failures

trap 'echo "Error on line $LINENO"' ERR
trap 'cleanup' EXIT        # Run cleanup on exit

cleanup() {
    rm -f /tmp/tempfile
    echo "Cleaned up"
}
```

---

## 15. Environment Variables & Configuration

```bash
env                          # Show all environment variables
printenv PATH                # Show specific variable
export MY_VAR="value"        # Set for current session + child processes
echo $MY_VAR                 # Use variable

# Persistent — add to ~/.bashrc or ~/.bash_profile
echo 'export MY_VAR="value"' >> ~/.bashrc
source ~/.bashrc             # Reload without restarting shell

# PATH management
export PATH=$PATH:/usr/local/myapp/bin

# Common variables
$HOME        # User home directory
$USER        # Current username
$SHELL       # Current shell
$PWD         # Current directory
$OLDPWD      # Previous directory
$LANG        # System locale
$TERM        # Terminal type
$EDITOR      # Default text editor
```

---

## 16. Cron Jobs & Scheduling

### Crontab Syntax

```
* * * * * command
│ │ │ │ │
│ │ │ │ └── Day of week (0-7, 0 and 7 = Sunday)
│ │ │ └──── Month (1-12)
│ │ └────── Day of month (1-31)
│ └──────── Hour (0-23)
└────────── Minute (0-59)
```

### Managing Crontabs

```bash
crontab -e                   # Edit your crontab
crontab -l                   # List your crontabs
crontab -r                   # Remove your crontab
crontab -u ayush -l          # List another user's crontab (root only)
```

### Cron Examples

```bash
# Run every minute
* * * * * /path/to/script.sh

# Every day at 2 AM
0 2 * * * /path/to/backup.sh

# Every Monday at 9 AM
0 9 * * 1 /path/to/report.sh

# Every 15 minutes
*/15 * * * * /path/to/check.sh

# First day of every month at midnight
0 0 1 * * /path/to/monthly.sh

# Weekdays at 6 PM
0 18 * * 1-5 /path/to/evening.sh
```

### at — One-time Scheduling

```bash
at 10:30am tomorrow          # Schedule for tomorrow
at now + 2 hours             # 2 hours from now
atq                          # List pending jobs
atrm 3                       # Remove job 3
```

---

## 17. User & Group Management

### User Management

```bash
sudo useradd ayush                        # Create user
sudo useradd -m -s /bin/bash ayush        # With home dir and bash shell
sudo passwd ayush                         # Set password
sudo usermod -aG sudo ayush               # Add to sudo group
sudo usermod -s /bin/bash ayush           # Change shell
sudo userdel ayush                        # Delete user
sudo userdel -r ayush                     # Delete user + home dir
id ayush                                  # Show user info
finger ayush                              # Detailed user info
last                                      # Login history
w                                         # Who is logged in
```

### Group Management

```bash
sudo groupadd developers                  # Create group
sudo groupmod -n devteam developers       # Rename group
sudo groupdel developers                  # Delete group
sudo gpasswd -a ayush developers          # Add user to group
sudo gpasswd -d ayush developers          # Remove user from group
groups ayush                              # Show user's groups
cat /etc/group | grep developers          # Check group members
```

### Sudo Configuration

```bash
sudo visudo                               # Safely edit /etc/sudoers

# Examples in /etc/sudoers:
ayush ALL=(ALL:ALL) ALL                   # Full sudo access
ayush ALL=(ALL) NOPASSWD: /usr/bin/apt    # No password for apt
%developers ALL=(ALL) /usr/bin/systemctl  # Group access to systemctl
```

---

## 18. Advanced Linux Topics

### Processes & Signals Deep Dive

```bash
strace -p PID                  # Trace system calls of running process
ltrace command                 # Trace library calls
lsof -p PID                    # Files opened by process
/proc/PID/maps                 # Memory map of process
/proc/PID/fd/                  # File descriptors
```

### Performance Monitoring

```bash
vmstat 1 5                     # Memory, CPU stats (5 samples, 1s interval)
iostat -x 1                    # Disk I/O stats
sar -u 1 5                     # CPU history (sysstat package)
iotop                          # I/O monitor by process
nethogs                        # Network usage by process
iftop                          # Network interface traffic
```

### Kernel & System Tuning

```bash
sysctl -a                      # All kernel parameters
sysctl vm.swappiness           # Current swappiness
sysctl -w vm.swappiness=10     # Set temporarily
echo "vm.swappiness=10" >> /etc/sysctl.conf  # Persist
sysctl -p                      # Reload sysctl config
```

### SELinux / AppArmor

```bash
# SELinux (RHEL/CentOS)
getenforce                     # Check mode (Enforcing/Permissive/Disabled)
setenforce 0                   # Set Permissive mode temporarily
sestatus                       # Detailed status

# AppArmor (Ubuntu/Debian)
sudo aa-status                 # Status of AppArmor
sudo aa-enforce /etc/apparmor.d/usr.sbin.nginx
```

### Archiving & Compression

```bash
tar -czf archive.tar.gz dir/           # Create gzip compressed archive
tar -cjf archive.tar.bz2 dir/          # Create bzip2 archive
tar -xzf archive.tar.gz                # Extract gzip archive
tar -xzf archive.tar.gz -C /dest/      # Extract to specific dir
tar -tzf archive.tar.gz                # List contents

zip -r archive.zip dir/                # Create zip
unzip archive.zip                      # Extract zip
gzip file.txt                          # Compress (replaces file)
gunzip file.txt.gz                     # Decompress
```

### Regular Expressions (Regex)

```bash
# Anchors
^start         # Line starts with "start"
end$           # Line ends with "end"

# Character classes
[abc]          # a, b, or c
[a-z]          # Any lowercase letter
[^abc]         # Not a, b, or c
\d             # Digit (in extended regex)
\w             # Word character

# Quantifiers
*              # 0 or more
+              # 1 or more (extended)
?              # 0 or 1 (extended)
{3}            # Exactly 3
{2,5}          # Between 2 and 5

# Examples
grep -E "^[0-9]{4}-[0-9]{2}-[0-9]{2}" dates.txt   # Match YYYY-MM-DD
grep -E "\b[A-Z]{2,}\b" file.txt                   # Uppercase words 2+ chars
```

---

## 🐳 Docker — Networking & Container Management

---

## 19. Copying Files Between Host and Container

To copy files between your host system and a container:

**From host to container:**

```bash
docker cp ./myfile.txt my-custom-container:/path/in/container/
```

**From container to host:**

```bash
docker cp my-custom-container:/path/in/container/myfile.txt ./
```

---

## 20. Monitoring Containers

View container resource usage:

```bash
docker stats
```

View processes running in a container:

```bash
docker top my-custom-container
```

---

## 21. Container Resource Constraints

Docker allows you to set resource constraints on containers.

**Limit CPU:**

```bash
docker run --cpus=0.5 ubuntu:latest
```

> This limits the container to use at most 50% of a CPU.

**Set CPU shares (relative weight):**

```bash
docker run --cpu-shares=512 ubuntu:latest
```

> The default value is 1024, so this container would receive half the CPU time of a default container.

**Limit memory and enable swapping:**

```bash
docker run --memory=1g --memory-swap=2g ubuntu:latest
```

> This limits the container to 1GB of memory and 2GB of swap.

---

## 22. Updating Containers

You can update the configuration of a running container.

**Update container resources:**

```bash
docker update --cpus=1 --memory=2g my-custom-container
```

**Rename a container:**

```bash
docker rename my-custom-container my-new-container-name
```

---

## 23. Container Restart Policies

Docker provides restart policies to automatically restart containers under certain conditions:

```bash
docker run --restart=always nginx
```

| Policy | Behavior |
|--------|----------|
| `no` | Never restart (default) |
| `on-failure[:max-retries]` | Restart only if container exits with a non-zero status code |
| `always` | Always restart the container regardless of exit status |
| `unless-stopped` | Always restart unless it was explicitly stopped |

---

## 24. Attaching to and Detaching from Containers

**Attach to a running container:**

```bash
docker attach my-custom-container
```

**Detach from a container without stopping it:**

Press `Ctrl-p` followed by `Ctrl-q`.

---

## 25. Docker Networking

Docker networking allows containers to communicate with each other and with the outside world. Understanding Docker networking is crucial for building multi-container applications.

---

## 26. Network Drivers

Docker supports several network drivers out of the box:

| Driver | Description |
|--------|-------------|
| `bridge` | The default network driver. Used for standalone containers that need to communicate. |
| `host` | Removes network isolation between the container and the Docker host. |
| `overlay` | Used for connecting multiple Docker daemons together (used in Swarm mode). |
| `macvlan` | Allows you to assign a MAC address to a container, making it appear as a physical device on your network. |
| `none` | Disables all networking for a container. |

---

## 27. Listing and Inspecting Networks

**List networks:**

```bash
docker network ls
```

**Inspect a network:**

```bash
docker network inspect bridge
```

---

## 28. Creating Custom Networks

Create a custom bridge network:

```bash
docker network create --driver bridge my-custom-network
```

---

## 29. Connecting Containers to Networks

**Connect a running container to a network:**

```bash
docker network connect my-custom-network my-container
```

**Disconnect a container from a network:**

```bash
docker network disconnect my-custom-network my-container
```

**Run a new container and connect it to a network:**

```bash
docker run --network my-custom-network nginx
```

---

## 30. Container DNS

Containers on the same user-defined network can resolve each other by name. Here's a demonstration:

**1. Create a network:**

```bash
docker network create my-app-network
```

**2. Run two containers on this network:**

```bash
docker run -d --name web --network my-app-network nginx
docker run -d --name db --network my-app-network postgres
```

**3.** Now, the `web` container can communicate with the `db` container using the hostname `db`.

---

## 31. Port Mapping

To make a container's port accessible from the host:

```bash
docker run -p 8080:80 nginx
```

> This maps port **8080** on the host to port **80** in the container.

You can also specify the IP address to bind to:

```bash
docker run -p 127.0.0.1:8080:80 nginx
```

---

## 32. Network Troubleshooting

**Check container network settings:**

```bash
docker inspect --format '{{json .NetworkSettings.Networks}}' my-container
```

**Use `docker exec` to run network diagnostic tools inside a container:**

```bash
docker exec -it my-container ping google.com
docker exec -it my-container netstat -tuln
```

**Use `docker logs` to check for network-related issues:**

```bash
docker logs my-container
```

**If you suspect DNS issues, check the container's DNS configuration:**

```bash
docker exec -it my-container cat /etc/resolv.conf
```

---

> **Key Takeaways:**
> - Linux file system is hierarchical, rooted at `/`
> - Everything in Linux is a file — processes, devices, sockets
> - Master permissions, piping, and grep to be effective on CLI
> - Systemd is the modern init system — learn `systemctl` and `journalctl`
> - Shell scripting automates repetitive tasks
> - Docker networking uses bridge/host/overlay drivers for container communication
> - Containers on the same user-defined network resolve each other by name
> - Always set restart policies and resource constraints for production containers