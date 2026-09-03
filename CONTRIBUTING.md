# Contributing

Thanks for helping improve Firebase Security Auditor. Please open an issue before large changes. Keep pull requests focused, explain the security rationale, and include tests plus a fixture when behavior changes.

```bash
npm install
npm run lint
npm test
npm run build
```

To add a check: define a unique ID and `SecurityCheck`, use actual file content (not hard-coded findings), report a safe example without leaking secrets, link to Firebase or OWASP guidance, add secure/insecure fixture coverage, and update the README list if user-visible.

By contributing, you agree that your work is provided under the repository's MIT license. Do not include credentials, private customer data, or claims about testing you did not perform.
