const validStacks = ['backend', 'frontend'];
const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
const validBackendPackages = [
  'cache', 'controller', 'cron_job', 'db', 'domain',
  'handler', 'repository', 'route', 'service',
  'auth', 'config', 'middleware', 'utils'
];

function isValidLog(stack, level, pkg, message) {
  if (!validStacks.includes(stack)) {
    console.error("❌ Invalid stack:", stack);
    return false;
  }
  if (!validLevels.includes(level)) {
    console.error("❌ Invalid level:", level);
    return false;
  }
  if (!validBackendPackages.includes(pkg)) {
    console.error("❌ Invalid backend package:", pkg);
    return false;
  }
  if (typeof message !== 'string' || message.trim() === '') {
    console.error("❌ Message must be a non-empty string.");
    return false;
  }
  return true;
}

module.exports = { isValidLog };
