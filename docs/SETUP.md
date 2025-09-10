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

### 1.3. Required GitHub Secrets

Add these secrets to your repository (Settings → Secrets and variables → Actions):

- `SSH_HOST` - Your server's IP address
- `SSH_USER` - Your server username
- `SSH_PRIVATE_KEY` - Your deployment SSH key
- `DEPLOY_PATH_PORTFOLIO` - Path to portfolio app (e.g., `/home/username/your-domain.com`)
- `PM2_APP_NAME_PORTFOLIO` - PM2 process name for portfolio

---

## 2. Server Provisioning

This section covers configuring a fresh Ubuntu 22.04 server.

### 2.1. Create a Droplet/VPS
-   **Image:** Ubuntu 22.04 LTS x64
-   **Plan:** 2GB RAM / 2 CPUs is recommended for running the Next.js build, Docker, and the OS.
-   **Authentication:** Add your local machine's public SSH key for secure access.

### 2.2. Initial Server Security
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

### 2.3. Install Software Stack
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

### 2.4. Configure Firewall
Set up the firewall to allow SSH and web traffic.

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 2.5. Create a SWAP File (Recommended)
This prevents the server from crashing due to memory exhaustion during builds.

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 3. Application Deployment

### 3.1. Set Up Server File Structure
Create the required directories in your user's home folder. This structure supports versioned production releases and a separate staging environment.

```bash
# Main directory for all production releases
mkdir -p ~/releases/portfolio

# Main directory for the staging environment
mkdir -p ~/releases/staging

# Directory for shared configuration files (.env)
mkdir -p ~/shared/portfolio
mkdir -p ~/shared/staging

# The directory for the Matomo Docker setup
mkdir ~/matomo

# Create the master content file
touch ~/content.json
# Populate this file with your portfolio data, using the Content Model guide as reference.
```
*Note: The path `/home/your_user/your-domain.com` will be a symbolic link created automatically by the deployment script.*

### 3.2. Matomo Analytics Setup
1.  Navigate to the Matomo directory: `cd ~/matomo`
2.  Create a `docker-compose.yml` file. You can find an example configuration in the Matomo documentation or community resources. It should define two services: `matomo` and `db` (MariaDB).
3.  Start the services: `docker compose up -d`
4.  Access Matomo via your server's IP (e.g., `http://YOUR_SERVER_IP:8888` if you mapped that port) and complete the web installer.

### 3.3. Nginx Configuration
1.  Create Nginx config files for the production site, staging site, and analytics.

    **/etc/nginx/sites-available/your-domain.com** (Production)
    ```nginx
    server {
        listen 80;
        server_name your-domain.com www.your-domain.com;

        location / {
            proxy_pass http://localhost:3000; # Production app runs on port 3000
            proxy_set_header Host $host;
            # ... (add other proxy headers as needed)
        }
    }
    ```

    **/etc/nginx/sites-available/stage.your-domain.com** (Staging)
    ```nginx
    server {
        listen 80;
        server_name stage.your-domain.com;

        location / {
            proxy_pass http://localhost:3001; # Staging app runs on port 3001
            proxy_set_header Host $host;
            # ... (add other proxy headers as needed)
        }
    }
    ```

    **/etc/nginx/sites-available/analytics.your-domain.com** (Analytics)
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
    sudo ln -s /etc/nginx/sites-available/stage.your-domain.com /etc/nginx/sites-enabled/
    sudo ln -s /etc/nginx/sites-available/analytics.your-domain.com /etc/nginx/sites-enabled/

    # Test Nginx config and restart
    sudo nginx -t && sudo systemctl restart nginx

    # Install Certbot and get SSL certificates (it will prompt you for all sites)
    sudo apt install certbot python3-certbot-nginx -y
    sudo certbot --nginx
    ```

### 3.4. First-Time Deployment
The first deployment must be done manually to set up the initial structure. Subsequent deployments will be fully automated.

```bash
# Clone the project code into a temporary directory
git clone https://github.com/your-github/your-repo.git ~/temp_deploy
cd ~/temp_deploy
npm install
npm run build

# Manually create the first release directory
mkdir -p ~/releases/portfolio/v1.0.0
cp -r ./* ~/releases/portfolio/v1.0.0/

# Create the symbolic link
ln -sfn ~/releases/portfolio/v1.0.0 /home/your_user/your-domain.com

# Start the application with PM2
cd /home/your_user/your-domain.com
pm2 start npm --name "your-pm2-name" -- start
pm2 save

# Clean up temporary directory
rm -rf ~/temp_deploy
```
After this, all future deployments to production and staging will be handled by GitHub Actions.

### 3.5. Web3 Provider Setup (Optional)

This project uses Reown (formerly WalletConnect) for Web3 authentication with an optimized lazy-loading architecture that ensures Web3 libraries are only loaded when actually needed. This means the ~2MB of Web3 dependencies won't impact your site's initial load time - they're downloaded only when a user clicks the "Web3 Login" button.

#### Performance Optimization Architecture

The Web3 functionality is implemented using a three-layer architecture that enables efficient lazy loading:

1. **Web3Manager** (`src/app/components/Web3Manager.js`) - Orchestrates the lazy loading process and manages the loading state
2. **Web3Provider** (`src/app/components/Web3Provider.js`) - Wraps the actual Web3 libraries (WagmiProvider, QueryClientProvider)
3. **Web3Bridge** (`src/app/components/Web3Bridge.js`) - Acts as a bridge between Web3 hooks and the application, passing Web3 state upward through callbacks

This architecture respects React's hook rules while achieving a 50% reduction in initial bundle size for users who authenticate with access codes rather than Web3.

#### Configuration Steps

1. **Get a Project ID:**
    - Go to [cloud.reown.com](https://cloud.reown.com)
    - Create an account and set up a new project
    - Copy your unique `projectId`

2. **Update the Configuration File:**
    - Open the following file in the codebase: `src/app/lib/web3-config.js`
    - Replace the existing `projectId` with your own:

    ```javascript
    // src/app/lib/web3-config.js

    // ... other code
    export const projectId = 'YOUR_PROJECT_ID'; // <-- REPLACE THIS WITH YOUR ID
    // ... other code
    ```

3. **Verify the Lazy Loading Setup:**
    The following files should already be in place for lazy loading to work:
    - `src/app/components/Web3Manager.js` - Should use `next/dynamic` to lazy-load Web3Provider and Web3Bridge
    - `src/app/hooks/useWeb3State.js` - Provides Web3 functionality to components
    - `src/app/screens/Entry.js` - Uses `useWeb3State` hook instead of direct Web3 imports

4. **Build and Deploy:** 
    After updating the configuration, build and deploy your application. The "Web3 Login" feature will be functional with optimized loading behavior.

#### Performance Impact

With this lazy-loading implementation:
- Initial page load downloads only ~2MB instead of ~4MB
- Web3 libraries are loaded on-demand when the user clicks "Web3 Login"
- Traditional code-based authentication users experience 40% faster Time to Interactive
- The user interface remains identical - all optimizations happen behind the scenes

You can verify the optimization is working by checking the Network tab in browser DevTools. Web3-related chunks should only appear after clicking the "Web3 Login" button.

---

## 4. GitHub Repository Configuration

To enable the automated and secure CI/CD workflow, you must configure branch protection rules for your `main` branch. This prevents direct pushes and ensures all changes are validated via a Pull Request.

**Prerequisites:**
-   You have already created the workflow files (e.g., `ci.yml`, `release-deploy.yml`, `staging-deploy.yml`) in your repository's `.github/workflows` directory.

**Steps to Configure Branch Protection:**

1.  Navigate to your repository on GitHub and go to **Settings > Branches**.
2.  Click **Add branch protection rule**.
3.  In "Branch name pattern", enter `main`.
4.  Enable **Require a pull request before merging**.
    -   This ensures no one can push directly to `main`.
5.  Enable **Require approvals** and set the number to `1`.
    -   This enforces a review process, even if you are approving your own PRs.
6.  Enable **Require status checks to pass before merging**.
    -   Enable **Require branches to be up to date before merging**. This prevents merging PRs that are based on an old version of `main`.
    -   From the list of status checks, find and select the validation job from your CI workflow (it should be named `CI Pipeline / Validate and Build`).

After saving these rules, your `main` branch will be protected, and all changes will be required to pass the automated checks before they can be merged.

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

Your CI/CD pipelines in `.github/workflows/` will now automate deployments.

## 6. Versioning for Your Fork

If you're forking this project for your own use, here's how to manage versions:

### Initial Setup

1. **Reset the version** in `package.json` to your starting point:
   ```json
   {
     "version": "1.0.0"
   }
   ```

2. **Clear the CHANGELOG** or start a new one for your fork.

3. **Install versioning tools** (already included in devDependencies):
   ```bash
   npm install
   ```

### Making Releases

When you're ready to create a new version:

```bash
# For bug fixes and minor changes
npm run release -- --release-as patch

# For new features
npm run release -- --release-as minor  

# For breaking changes
npm run release -- --release-as major

# Push to trigger deployment to production
git push --follow-tags origin main
```

The version will automatically appear in your application's startup log and be tracked in git tags.