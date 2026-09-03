import { describe, expect, it } from 'vitest';
import { resolve } from 'node:path';
import { discover, runChecks } from '../src/index.js';

describe('Firebase Security Auditor', () => {
  it('finds real issues in the insecure fixture', async () => {
    const findings = runChecks(await discover(resolve('fixtures/insecure')));
    expect(findings.map(f => f.id)).toEqual(expect.arrayContaining(['firestore-public-access', 'storage-public-access', 'cors-wildcard', 'client-trust', 'exposed-secrets']));
    expect(findings.find(f => f.id === 'firestore-public-access')?.line).toBe(5);
  });
  it('does not report public access or missing validation in secure fixture', async () => {
    const findings = runChecks(await discover(resolve('fixtures/secure')));
    expect(findings.map(f => f.id)).not.toEqual(expect.arrayContaining(['firestore-public-access', 'storage-public-access', 'missing-storage-validation']));
  });
});
