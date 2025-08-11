# Project Setup & Deployment Guide

This document provides a comprehensive, step-by-step guide to setting up the Interactive Terminal Portfolio project from scratch on a new server. Use this guide to deploy your own instance.

## 1. Prerequisites

### 1.1. Local Machine
-   [Node.js](https://nodejs.org/) (v20.x or later, preferably managed via `nvm`)
-   [Git](https://git-scm.com/)
-   An SSH client (e.g., built-in on macOS/Linux)

### 1.2. Accounts & Services
-   A [GitHub](https://github.com/) account.
-   A VPS provider account (e.g., [DigitalOcean](https://www.digitalocean.com/)).
-   A registered domain name.

---

## 2. Local Development Setup

Before deploying, ensure the project runs on your local machine.

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-org/your-repo.git
    cd portfolio
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000/?code=LOCAL_TEST`. The local version uses a fallback `test-content.json` file, so no server connection is needed.

---

## 3. Server Provisioning

This section covers configuring a fresh Ubuntu 22.04 server.

### 3.1. Create a Droplet/VPS
-   **Image:** Ubuntu 22.04 LTS x64
-   **Plan:** 2GB RAM / 2 CPUs is recommended. The 1GB plan is often insufficient for running the Next.js build process, Docker, and the OS simultaneously.
-   **Authentication:** Add your local machine's public SSH key for secure access.

### 3.2. Initial Server Security
Connect to your server as `root` and create a non-root user for all operations. Replace `your_user` with your desired username.

```bash
# Connect as root
ssh root@YOUR_SERVER_IP

# Create a new user
adduser your_user

# Grant sudo privileges
usermod -aG sudo your_user

# Copy SSH keys to the new user
cp -r /root/.ssh /home/your_user/
chown -R your_user:your_user /home/your_user/.ssh

# Log out and log back in as the new user
exit
ssh your_user@YOUR_SERVER_IP
```

### 3.3. Install Software Stack
Install Nginx, Node.js (via nvm), PM2, and Docker.

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install nginx -y

# Install Node.js Version Manager (nvm) and Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# Install PM2 globally (for process management)
npm install pm2 -g

# Install Docker and Docker Compose
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker your_user # Add user to the docker group
# Log out and log back in for this change to take effect
exit
ssh your_user@YOUR_SERVER_IP
```

### 3.4. Configure Firewall
Set up the firewall to allow SSH and web traffic.

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 3.5. Create a SWAP File (Recommended)
This prevents the server from crashing due to memory exhaustion during builds.

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 4. Application Deployment

### 4.1. Set Up Server File Structure
Create the required directories in your user's home folder.

```bash
# The main directory for the Next.js application
mkdir -p ~/sites/your-domain.com

# The directory for the Matomo Docker setup
mkdir ~/matomo

# The directory for the Telegram bot
mkdir ~/telegram-bot

# Create the master content file
touch ~/content.json
# Populate this file with your portfolio data, using docs/CONTENT_MODEL.md as a guide.
```

### 4.2. Matomo Analytics Setup
1.  Navigate to the Matomo directory: `cd ~/matomo`
2.  Create a `docker-compose.yml` file. You can find an example configuration in the Matomo documentation or community resources. It should define two services: `matomo` and `db` (MariaDB).
3.  Start the services: `docker compose up -d`
4.  Access Matomo via your server's IP (e.g., `http://YOUR_SERVER_IP:8888` if you mapped that port) and complete the web installer.

### 4.3. Nginx Configuration
1.  Create Nginx config files for the main site and analytics.

    **/etc/nginx/sites-available/your-domain.com**
    ```nginx
    server {
        listen 80;
        server_name your-domain.com www.your-domain.com;

        location / {
            proxy_pass http://localhost:3000;
            proxy_set_header Host $host;
            # ... (add other proxy headers as needed)
        }
    }
    ```

    **/etc/nginx/sites-available/analytics.your-domain.com**
    ```nginx
    server {
        listen 80;
        server_name analytics.your-domain.com;

        location / {
            proxy_pass http://localhost:8888; # Port mapped in your docker-compose.yml
            proxy_set_header Host $host;
        }
    }
    ```

2.  Enable the sites and secure them with SSL.
    ```bash
    # Enable sites
    sudo ln -s /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/
    sudo ln -s /etc/nginx/sites-available/analytics.your-domain.com /etc/nginx/sites-enabled/

    # Test Nginx config and restart
    sudo nginx -t && sudo systemctl restart nginx

    # Install Certbot and get SSL certificates
    sudo apt install certbot python3-certbot-nginx -y
    sudo certbot --nginx
    ```

### 4.4. Deploy & Run Applications
Clone your repository and start the applications using PM2.

```bash
# Clone the project code
git clone https://github.com/your-github/your-repo.git ~/sites/your-domain.com

# Setup Next.js App
cd ~/sites/your-domain.com
npm install
npm run build
pm2 start npm --name "portfolio-app" -- start
pm2 save

# Setup Telegram Bot
cd ~/telegram-bot
# Copy bot files from the repo (e.g., via scp or git)
# Example: scp -r local/path/to/telegram-bot/* your_user@YOUR_SERVER_IP:~/telegram-bot/
npm install --production
# Create .env file with your bot token and API credentials
nano .env 
pm2 start bot.js --name "portfolio-bot"
pm2 save
```

### 4.5. Web3 Provider Setup (Optional)

This project uses Reown (formerly WalletConnect) for Web3 authentication. To enable this feature in your own deployment, you need to configure it with your own Project ID.

1.  **Get a Project ID:**
    -   Go to [cloud.reown.com](https://cloud.reown.com).
    -   Create an account and set up a new project.
    -   Copy your unique `projectId`.

2.  **Update the Configuration File:**
    -   Open the following file in the codebase: `src/app/lib/web3-config.js`.
    -   Replace the existing `projectId` with your own:

    ```javascript
    // src/app/lib/web3-config.js

    // ... other code
    export const projectId = 'YOUR_PROJECT_ID'; // <-- REPLACE THIS WITH YOUR ID
    // ... other code
    ```

3.  **Rebuild and Deploy:** After updating the code, build and deploy your application. The "Web3 Login" feature should now be functional.

---

## 5. CI/CD Automation (GitHub Actions)

1.  **Generate a new SSH key** on your local machine specifically for GitHub Actions (do not use a passphrase).
    ```bash
    ssh-keygen -t ed25519 -f ~/.ssh/github_actions_key -C "github-actions"
    ```
2.  **Add the public key** (`~/.ssh/github_actions_key.pub`) to your server's `~/.ssh/authorized_keys` file.
3.  **Add Repository Secrets** in your GitHub project's settings (`Settings > Secrets and variables > Actions`):
    -   `SSH_HOST`: Your server's IP address.
    -   `SSH_USER`: Your server username (`your_user`).
    -   `SSH_PRIVATE_KEY`: The content of the private key file (`cat ~/.ssh/github_actions_key`).

Your CI/CD pipeline in `.github/workflows/deploy.yml` will now automate deployments.