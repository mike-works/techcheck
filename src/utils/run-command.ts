import { exec } from 'child_process';

/**
 * Execute a shell/bash command
 * @param command command to run
 * @return result of command
 */
export function runCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err !== null) reject(stderr);
      else resolve(stdout);
    });
  });
}
