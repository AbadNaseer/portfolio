/**
 * Real faults, and what they turned out to be.
 *
 * This replaced a four-column panel of technology names. A list of tools says
 * a person has heard of them. A list of things that were not what they looked
 * like says how they behave at two in the morning, which is the thing anyone
 * hiring for reliability is actually trying to find out.
 *
 * Every entry below happened. Keep it that way.
 */

export type Finding = {
  /** What it looked like from outside. */
  symptom: string;
  /** What it actually was. */
  cause: string;
  /** Where. Kept short. */
  where: string;
};

export const findings: Finding[] = [
  {
    symptom: 'A GPU worker joined the cluster, reported ready, and failed the first request anyway.',
    cause:
      'A race with the device plugin. The node was schedulable before the GPU was actually claimable, so Kubernetes placed work on a card that was not there yet.',
    where: 'GPU inference platform',
  },
  {
    symptom: 'The health check itself was causing the failure it was looking for.',
    cause:
      'Verification logic held the GPU while the workload tried to start. Two processes, one card, and the check always won because it ran first.',
    where: 'GPU inference platform',
  },
  {
    symptom: 'A rebuilt worker came back and still could not talk to anything.',
    cause:
      'Firewall state outlived the machine it belonged to. The rules referenced an address the replacement no longer had, and nothing reported an error.',
    where: 'GPU inference platform',
  },
  {
    symptom: 'One page took 45 seconds. Every time. Never 44, never 46.',
    cause:
      'A dependency pointing at a host decommissioned weeks earlier. A dead host does not refuse a connection, it swallows it, so every request sat until the timeout expired and fell back. The suspiciously round number was the timeout, not the work.',
    where: 'Conversational commerce platform',
  },
  {
    symptom: 'The database kept dropping the connection mid-query, seemingly at random.',
    cause:
      'The search path re-read all 25,631 product rows and 206 MB of vectors on every single message. Not a network fault. The query was simply too greedy to finish.',
    where: 'Conversational commerce platform',
  },
  {
    symptom: 'Nightly backups had been failing for months. Nobody had noticed.',
    cause:
      'A cron job that exited non-zero into a void. A backup that never runs looks exactly like a quiet night, which is why the absence of alerts is not the same as the presence of health.',
    where: 'Multi-tenant lab platform',
  },
  {
    symptom: 'Edits to an nginx site file changed nothing, however many times it was reloaded.',
    cause:
      'The file in sites-enabled was a regular file, not a symlink. Somebody had copied it years earlier. Every edit landed in sites-available and was read by no one.',
    where: 'Client server estate',
  },
];
