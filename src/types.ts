export type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';

export interface Finding {
  id: string;
  title: string;
  severity: Severity;
  file: string;
  line?: number;
  reason: string;
  example: string;
  remediation: string;
  reference?: string;
}

export interface AuditFile { path: string; relativePath: string; content: string; lines: string[]; }
export interface AuditContext { root: string; files: AuditFile[]; }
export interface SecurityCheck { id: string; description: string; run(context: AuditContext): Finding[]; }
