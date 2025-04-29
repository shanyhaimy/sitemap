#!/bin/bash
# Deployment script for the Sitemap Cloudflare Worker

# Ensure we're in the correct directory
cd "$(dirname "$0")"

# Check if Wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "Error: wrangler CLI is not installed. Please install it with 'npm install -g wrangler'"
    exit 1
fi

# Deploy the worker
echo "Deploying Sitemap Worker to Cloudflare..."
wrangler publish

# Check deployment status
if [ $? -eq 0 ]; then
    echo "Deployment successful!"
    echo "Your sitemap should now be available at https://topwebsitebuilder.ai/sitemap.xml"
else
    echo "Deployment failed. Please check the error messages above."
fi
