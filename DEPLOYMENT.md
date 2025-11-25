# AWS Deployment Guide

## Simple EC2 Deployment

### 1. Create EC2 Instance

1. Log into AWS Console
2. Launch EC2 instance (Ubuntu)
3. Choose t2.micro (free tier)
4. Configure security group:
   - Allow HTTP (port 80)
   - Allow HTTPS (port 443)
   - Allow SSH (port 22)
   - Allow custom TCP 3000, 5173

### 2. Connect to Instance

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 3. Install Dependencies

```bash
# Update system
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Docker
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo apt install docker-compose -y
```

### 4. Deploy Application

```bash
# Clone your repo
git clone your-repo-url
cd wardrobe-tinder

# Start database
docker-compose up -d

# Install and start backend
cd Backend
npm install
nohup npm start &

# Build and serve frontend
cd ../Frontend
npm install
npm run build

# Install serve to host the build
sudo npm install -g serve
nohup serve -s dist -l 5173 &
```

### 5. Setup Nginx (Optional)

```bash
sudo apt install nginx -y

# Configure nginx to proxy to your app
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    
    location / {
        proxy_pass http://localhost:5173;
    }
    
    location /api {
        proxy_pass http://localhost:3000;
    }
}
```

```bash
sudo systemctl restart nginx
```

### Access Your App

Visit: `http://your-ec2-ip`

## Alternative: Elastic Beanstalk

1. Install EB CLI
2. Run `eb init` and `eb create`
3. Configure environment for Node.js
4. Deploy with `eb deploy`
