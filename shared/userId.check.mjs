/**
 * Dev-time round-trip checks for shared/userId.ts.
 *
 * The module is plain dependency-free TS, so compile it first with the
 * workspace TypeScript, then run this script against the emitted JS:
 *
 *   dashboard/node_modules/.bin/tsc shared/userId.ts \
 *     --outDir <tmp> --module nodenext --target es2022 --moduleResolution nodenext
 *   node shared/userId.check.mjs <tmp>/userId.js [EXTRA_VALID_ID ...]
 */
import assert from 'node:assert/strict';

const compiledPath = process.argv[2];
if (!compiledPath) {
  console.error('Usage: node shared/userId.check.mjs <compiled-userId.js> [EXTRA_VALID_ID ...]');
  process.exit(1);
}

const mod = await import(compiledPath);
const { generateUserId, isValidUserId, normalizeUserId, formatUserId, runUserIdSelfChecks } = mod;

assert.deepEqual(runUserIdSelfChecks(), [], 'in-module self-checks must pass');

const seen = new Set();
for (let i = 0; i < 500; i += 1) {
  const id = generateUserId();
  assert.match(id, /^HVI-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]$/);
  assert.equal(isValidUserId(id), true, `generated ID must validate: ${id}`);
  assert.equal(formatUserId(id), id, 'format must be stable');
  assert.equal(formatUserId(id.toLowerCase().replace(/-/g, ' ')), id, 'format must normalize');
  seen.add(id);
}
assert.ok(seen.size > 490, `IDs must be unique (got ${seen.size}/500)`);

// Every single-character tamper of a valid ID must fail.
const sample = normalizeUserId(generateUserId());
for (let i = 0; i < sample.length; i += 1) {
  const alt = sample.charAt(i) === '0' ? '1' : '0';
  assert.equal(isValidUserId(sample.slice(0, i) + alt + sample.slice(i + 1)), false, `tamper at ${i}`);
}

assert.equal(isValidUserId('HVI-0000-0000-1'), false, 'wrong check char must fail');
for (const extra of process.argv.slice(3)) {
  assert.equal(isValidUserId(extra), true, `expected valid ID: ${extra}`);
}

console.log(`userId checks passed (500 round-trips, ${seen.size} unique, tamper sweep ok).`);
