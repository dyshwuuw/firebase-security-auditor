# Firebase Security Auditor

Local-first, modular security auditing for Firebase projects. It scans the files in a project directory and produces actionable findings for Firestore Rules, Storage Rules, Hosting, Auth-related configuration, Cloud Functions, App Check, secrets, and client configuration.

This is a static analyzer, not a penetration test or a replacement for a professional security review. It never sends project source code or telemetry to a remote service.

## Installation

```bash
npm install
npm run build
npm link
# or, after publishing: npx firebase-security-auditor scan ./my-project
```

## Quick start

```bash
firebase-security-auditor scan ./my-project
firebase-security-auditor scan . --severity high
firebase-security-auditor scan . --json --output report.json
```

The command exits with code `1` when High or Critical findings remain, `0` otherwise, and `2` for invalid input or runtime errors.

## CLI usage

```text
firebase-security-auditor scan <directory> [--json] [--output report.json]
  [--severity critical|high|medium|low|info] [--ignore id1,id2]
```

`--severity` is a minimum threshold. `--ignore` accepts finding IDs, which are stable enough to use in CI but may evolve before v1.0.

## Sample output

```text
[Critical] firestore-public-access — Public Firestore access
  firestore.rules:8
  This rule grants access to every client without authentication or authorization.
  Fix: Require authentication and validate access to the specific document or query.
```

## Security checks in v0.1

`firestore-public-access`, `storage-public-access`, `unauthenticated-rules`, `wildcard-write`, `missing-storage-validation`, `anonymous-auth`, `hosting-security-headers`, `app-check-not-configured`, `exposed-secrets`, `firebase-api-key`, `cors-wildcard`, `client-trust`, and `admin-sdk-client`.

Rules are intentionally conservative and file-based: console-only settings cannot be verified from a checkout and are reported as “not found locally” where appropriate.

## Architecture and adding a check

Each check implements `SecurityCheck` in `src/types.ts` and is registered in `src/checks.ts`. Use `AuditContext.files`, `file.lines`, `lineOf`, and `finding` so new rules remain deterministic and testable. Add a focused fixture and a Vitest test for every new detection. Avoid network calls and never include secret values in output.

## Roadmap

- **v0.1** — local static scan, 13 checks, JSON output, severity filtering, fixtures, CI.
- **v0.2** — SARIF output, `.firebase-security-auditor.json` configuration, better parsers, more Functions and App Check checks.
- **v1.0** — stable rule IDs and schema, documented false-positive policy, broader test corpus, and optional verified integrations that remain opt-in.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md), run `npm install`, then `npm run lint && npm test && npm run build`. Good first contributions include new fixtures, official-reference improvements, and narrowly scoped checks with tests. See [proposed Good First Issues](docs/good-first-issues.md). Please do not submit fake usage metrics, stars, contributors, or pull requests.

## License

MIT — see [LICENSE](LICENSE).
