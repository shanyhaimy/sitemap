// Sitemap Cloudflare Worker
// This worker intercepts requests to /sitemap.xml and serves a dynamic sitemap from Supabase

// Supabase sitemap function URL
const SUPABASE_SITEMAP_URL = 'https://blwanztelgkwflxwixpu.supabase.co/functions/v1/sitemap';

// Cache configuration (1 hour client, 24 hours CDN)
const CACHE_CONTROL_HEADER = 'public, max-age=3600, s-maxage=86400';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Handle the request for sitemap.xml
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  try {
    console.log('Sitemap worker: Processing request for sitemap.xml');
    
    // Attempt to fetch from Supabase Edge Function
    const response = await fetch(SUPABASE_SITEMAP_URL, {
      cf: {
        // Customize Cloudflare caching behavior
        cacheTtl: 86400, // 24 hours
        cacheEverything: true,
      },
    });
    
    // Check if the request to Supabase was successful
    if (!response.ok) {
      console.error(`Sitemap worker: Error fetching from Supabase: ${response.status} ${response.statusText}`);
      
      // Try to return a fallback static sitemap if we have one in KV
      // For now, return an error response
      return new Response(
        'Error fetching sitemap. Please try again later.',
        { 
          status: 502,
          headers: {
            'Content-Type': 'text/plain',
          }
        }
      );
    }
    
    // Get the sitemap XML content
    const sitemapContent = await response.text();
    console.log('Sitemap worker: Successfully fetched sitemap');
    
    // Return the sitemap with proper headers
    return new Response(sitemapContent, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': CACHE_CONTROL_HEADER,
      },
    });
  } catch (error) {
    console.error('Sitemap worker: Exception while processing request', error);
    
    // Return an error response
    return new Response(
      'Error generating sitemap. Please try again later.',
      { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
        }
      }
    );
  }
}
