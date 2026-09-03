import type { AuditFile, Finding, Severity } from './types.js';

export const lineOf = (file: AuditFile, pattern: RegExp | string): number | undefined => {
  const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
  const index = file.lines.findIndex((line) => regex.test(line));
  return index < 0 ? undefined : index + 1;
};

export const finding = (file: AuditFile, data: Omit<Finding, 'file'> & { line?: number }): Finding => ({ file: file.relativePath, ...data });
export const severityRank: Record<Severity, number> = { Critical: 4, High: 3, Medium: 2, Low: 1, Info: 0 };
export const isSecretFile = (path: string): boolean => /(^|\/)(\.env(\..*)?|service-account.*\.json|.*\.pem|.*\.key|firebase-adminsdk.*\.json)$/i.test(path);
