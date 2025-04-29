# Sitemap Cloudflare Worker

This worker intercepts requests to `/sitemap.xml` and serves a dynamically generated sitemap from the Supabase Edge Function.

## Features

- Fetches the sitemap from Supabase Edge Function
- Applies proper caching headers
- Handles errors gracefully
- Logs diagnostic information

## Deployment Instructions

1. Install Wrangler CLI if you haven't already:
   ```
   npm install -g wrangler
   ```

2. Authenticate with Cloudflare:
   ```
   wrangler login
   ```

3. Deploy the worker:
   ```
   cd workers/sitemap
   wrangler publish
   ```

4. Verify the deployment:
   - Visit `https://topwebsitebuilder.ai/sitemap.xml`
   - Check that it returns a valid XML sitemap
   - Verify that the appropriate cache headers are present

## Configuration

- Edit `wrangler.toml` to update the routes or add KV storage
- The worker is configured to cache the sitemap for 24 hours at the CDN level

## Troubleshooting

If you encounter issues with the sitemap:

1. Check the Cloudflare Worker logs for errors
2. Verify the Supabase Edge Function is working correctly
3. Test direct access to the Supabase function endpoint

## Maintenance

- Monitor the worker's performance in the Cloudflare dashboard
- Periodically check that the sitemap is being updated correctly
