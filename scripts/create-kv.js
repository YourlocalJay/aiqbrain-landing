#!/usr/bin/env node

// Script to create KV namespaces for AIQBrain
// Run: node scripts/create-kv.js

console.log('🔨 Creating KV namespaces for AIQBrain...');
console.log('');
console.log('Run these commands to create the required KV namespaces:');
console.log('');
console.log('# Production namespaces');
console.log('wrangler kv:namespace create CONVERSION_LOGS');
console.log('wrangler kv:namespace create ERROR_LOGS');
console.log('wrangler kv:namespace create RATE_LIMITER');
console.log('wrangler kv:namespace create USER_SESSIONS');
console.log('wrangler kv:namespace create OFFER_HEALTH');
console.log('');
console.log('# Preview namespaces (for wrangler dev)');
console.log('wrangler kv:namespace create CONVERSION_LOGS --preview');
console.log('wrangler kv:namespace create ERROR_LOGS --preview');
console.log('wrangler kv:namespace create RATE_LIMITER --preview');
console.log('wrangler kv:namespace create USER_SESSIONS --preview');
console.log('wrangler kv:namespace create OFFER_HEALTH --preview');
console.log('');
console.log('After creating, update the IDs in wrangler.toml');
console.log('');