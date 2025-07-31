#!/usr/bin/env node

// Script to setup secrets for AIQBrain
// Run: node scripts/setup-secrets.js

console.log('🔐 Setting up secrets for AIQBrain...');
console.log('');
console.log('Run these commands to set up the required secrets:');
console.log('');
console.log('# Webhook secret for secure communication');
console.log('wrangler secret put WEBHOOK_SECRET');
console.log('');
console.log('# Google Analytics API secret');
console.log('wrangler secret put GA_API_SECRET');
console.log('');
console.log('# SMTP credentials for email notifications');
console.log('wrangler secret put SMTP_CREDENTIALS');
console.log('');
console.log('# API key for internal services');
console.log('wrangler secret put API_KEY');
console.log('');
console.log('For production environment:');
console.log('Add --env production to each command');
console.log('');