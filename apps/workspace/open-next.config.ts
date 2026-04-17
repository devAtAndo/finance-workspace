import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig({
  incrementalCache: 'dummy', // in-memory; upgrade to KV once we have a namespace
});
