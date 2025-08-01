/**
 * Static asset handler for AIQBrain
 * Handles serving static files with proper caching and content types
 */

// Map of file extensions to content types
const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject'
};

export async function staticAssetHandler(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // Get the file extension
  const extension = path.substring(path.lastIndexOf('.'));
  
  // Set the content type based on file extension
  const contentType = contentTypes[extension] || 'text/plain';
  
  try {
    // Get the asset from KV store if configured
    let asset;
    if (env.STATIC_ASSETS) {
      asset = await env.STATIC_ASSETS.get(path, 'arrayBuffer');
    }
    
    // If asset not found in KV, return 404
    if (!asset) {
      return new Response('Asset not found', { status: 404 });
    }
    
    // Set appropriate cache headers based on asset type
    const cacheControl = path.startsWith('/assets/') 
      ? 'public, max-age=86400' // 24 hours for static assets
      : 'public, max-age=60';   // 1 minute for other files
    
    return new Response(asset, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': cacheControl
      }
    });
  } catch (error) {
    return new Response('Error serving asset: ' + error.message, { status: 500 });
  }
}
