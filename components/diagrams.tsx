/**
 * Inline SVG architecture diagrams, one per case study.
 * Palette is fixed to the site tokens so they read the same everywhere:
 * box #151719 / edge #2A2D34 / ink #F2F1EC / dim #6B6E76 / accent #C7F04B.
 */

const C = {
  box: '#151719',
  edge: '#2A2D34',
  ink: '#F2F1EC',
  dim: '#6B6E76',
  faint: '#4E5158',
  accent: '#C7F04B',
  accentBox: '#12160D',
  accentEdge: '#3D4A22',
  accentDim: '#8A9463',
};

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
        <path d="M0 1 L8 4.5 L0 8 z" fill={C.faint} />
      </marker>
    </defs>
  );
}

function Frame({ children, viewBox }: { children: React.ReactNode; viewBox: string }) {
  return (
    <div className="card bg-panel p-6 sm:p-8">
      <div className="overflow-x-auto">
        <svg
          viewBox={viewBox}
          className="block h-auto w-full min-w-[620px]"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          role="img"
        >
          {children}
        </svg>
      </div>
    </div>
  );
}

export function SmartzeesDiagram() {
  return (
    <Frame viewBox="0 0 900 278">
      <title>Request path: the model classifies intent, the backend owns state, the index serves search</title>
      <Defs id="ah-sz" />
      <rect x="8" y="96" width="126" height="58" rx="9" fill={C.box} stroke={C.edge} />
      <text x="71" y="122" fill={C.ink} fontSize="14" textAnchor="middle">Voice or text</text>
      <text x="71" y="140" fill={C.dim} fontSize="11.5" textAnchor="middle">the user</text>

      <line x1="140" y1="125" x2="196" y2="125" stroke={C.faint} strokeWidth="1.4" markerEnd="url(#ah-sz)" />

      <rect x="202" y="76" width="150" height="98" rx="9" fill={C.box} stroke={C.edge} />
      <text x="277" y="104" fill={C.ink} fontSize="14" textAnchor="middle">FastAPI</text>
      <text x="277" y="126" fill={C.dim} fontSize="11.5" textAnchor="middle">owns cart, totals,</text>
      <text x="277" y="142" fill={C.dim} fontSize="11.5" textAnchor="middle">bookings, session</text>

      <line x1="277" y1="70" x2="277" y2="42" stroke={C.faint} strokeWidth="1.4" markerEnd="url(#ah-sz)" />
      <rect x="172" y="4" width="210" height="34" rx="8" fill={C.box} stroke={C.edge} />
      <text x="277" y="26" fill={C.dim} fontSize="12" textAnchor="middle">LLM: intent + phrasing only</text>

      <line x1="358" y1="125" x2="414" y2="125" stroke={C.accent} strokeWidth="1.6" markerEnd="url(#ah-sz)" />
      <text x="386" y="115" fill={C.accent} fontSize="10.5" textAnchor="middle">8.2 ms</text>

      <rect x="420" y="76" width="180" height="98" rx="9" fill={C.accentBox} stroke={C.accentEdge} />
      <text x="510" y="104" fill={C.accent} fontSize="14" textAnchor="middle">In-memory index</text>
      <text x="510" y="126" fill={C.accentDim} fontSize="11.5" textAnchor="middle">float32 matrix, 37.6 MB</text>
      <text x="510" y="142" fill={C.accentDim} fontSize="11.5" textAnchor="middle">atomic swap under lock</text>

      <line x1="510" y1="180" x2="510" y2="208" stroke={C.faint} strokeWidth="1.4" strokeDasharray="4 4" markerEnd="url(#ah-sz)" />
      <rect x="404" y="212" width="212" height="34" rx="8" fill={C.box} stroke={C.edge} />
      <text x="510" y="234" fill={C.dim} fontSize="12" textAnchor="middle">MySQL / pgvector, read once</text>

      <line x1="606" y1="125" x2="662" y2="125" stroke={C.faint} strokeWidth="1.4" markerEnd="url(#ah-sz)" />
      <rect x="668" y="96" width="150" height="58" rx="9" fill={C.box} stroke={C.edge} />
      <text x="743" y="122" fill={C.ink} fontSize="14" textAnchor="middle">Ranked results</text>
      <text x="743" y="140" fill={C.dim} fontSize="11.5" textAnchor="middle">cosine, unit vectors</text>

      {/* Caption sits on its own row under everything. It has collided with the
          LLM box (y 4-38) and clipped the right edge when placed inline, so the
          diagram is taller instead of the text being squeezed between shapes. */}
      <text x="8" y="270" fill={C.faint} fontSize="11">Built once on a background thread, so /health answers during a restart</text>
    </Frame>
  );
}

export function NextlabDiagram() {
  const actors = [
    { x: 8, name: 'Lab admin', note: 'owns the account' },
    { x: 176, name: 'Employee', note: 'X-Sub-Token' },
    { x: 344, name: 'Collection centre', note: 'X-CC-Token' },
    { x: 512, name: 'Platform admin', note: 'super admin' },
  ];
  return (
    <Frame viewBox="0 0 900 300">
      <title>Four actor types resolve through one permission layer to a lab-scoped database</title>
      <Defs id="ah-nl" />
      {actors.map((a) => (
        <g key={a.name}>
          <rect x={a.x} y="4" width="152" height="52" rx="9" fill={C.box} stroke={C.edge} />
          <text x={a.x + 76} y="27" fill={C.ink} fontSize="13" textAnchor="middle">{a.name}</text>
          <text x={a.x + 76} y="44" fill={C.dim} fontSize="11" textAnchor="middle">{a.note}</text>
          <line x1={a.x + 76} y1="60" x2={a.x + 76} y2="86" stroke={C.faint} strokeWidth="1.3" markerEnd="url(#ah-nl)" />
        </g>
      ))}

      <rect x="8" y="90" width="656" height="52" rx="9" fill={C.accentBox} stroke={C.accentEdge} />
      <text x="336" y="112" fill={C.accent} fontSize="13.5" textAnchor="middle">Subdomain tenancy + one permission layer</text>
      <text x="336" y="130" fill={C.accentDim} fontSize="11" textAnchor="middle">resolves the lab, the actor and the feature gate, once</text>

      <line x1="336" y1="146" x2="336" y2="174" stroke={C.faint} strokeWidth="1.3" markerEnd="url(#ah-nl)" />
      <rect x="8" y="178" width="656" height="52" rx="9" fill={C.box} stroke={C.edge} />
      <text x="336" y="200" fill={C.ink} fontSize="13.5" textAnchor="middle">PostgreSQL, every row scoped by lab</text>
      <text x="336" y="218" fill={C.dim} fontSize="11" textAnchor="middle">rows also tagged with the employee or centre that created them</text>

      <rect x="688" y="4" width="204" height="226" rx="9" fill={C.box} stroke={C.edge} />
      <text x="790" y="28" fill={C.ink} fontSize="12.5" textAnchor="middle">Layered on top</text>
      {[
        'Partner labs + billing',
        'Marketing commissions',
        'Per-employee commissions',
        'Discount limits + audit',
        'Rolling receipt quotas',
        'Branded PDF reports',
      ].map((t, i) => (
        <text key={t} x="704" y={54 + i * 26} fill={C.dim} fontSize="11.5">
          {t}
        </text>
      ))}

      <text x="8" y="256" fill={C.faint} fontSize="11">Test templates are global and read only; each lab adjusts through override layers, never copies,</text>
      <text x="8" y="274" fill={C.faint} fontSize="11">so a platform-wide correction still reaches every lab that has not deliberately overridden it.</text>
    </Frame>
  );
}

export function MediatizDiagram() {
  return (
    <Frame viewBox="0 0 900 260">
      <title>Autoscaling follows real load; the LLM tutor runs self hosted</title>
      <Defs id="ah-md" />
      <rect x="8" y="60" width="150" height="58" rx="9" fill={C.box} stroke={C.edge} />
      <text x="83" y="84" fill={C.ink} fontSize="13.5" textAnchor="middle">1M+ users</text>
      <text x="83" y="102" fill={C.dim} fontSize="11" textAnchor="middle">20K-30K concurrent</text>

      <line x1="164" y1="89" x2="220" y2="89" stroke={C.faint} strokeWidth="1.4" markerEnd="url(#ah-md)" />

      <rect x="226" y="42" width="160" height="94" rx="9" fill={C.box} stroke={C.edge} />
      <text x="306" y="68" fill={C.ink} fontSize="13.5" textAnchor="middle">ALB + ECS</text>
      <text x="306" y="88" fill={C.dim} fontSize="11" textAnchor="middle">task definitions tuned</text>
      <text x="306" y="104" fill={C.dim} fontSize="11" textAnchor="middle">to measured usage</text>
      <text x="306" y="122" fill={C.accent} fontSize="11" textAnchor="middle">30% less spend</text>

      <line x1="306" y1="142" x2="306" y2="172" stroke={C.accent} strokeWidth="1.5" markerEnd="url(#ah-md)" />
      <rect x="204" y="176" width="204" height="42" rx="8" fill={C.accentBox} stroke={C.accentEdge} />
      <text x="306" y="202" fill={C.accent} fontSize="12.5" textAnchor="middle">CloudWatch drives scaling</text>

      <line x1="392" y1="89" x2="448" y2="89" stroke={C.faint} strokeWidth="1.4" markerEnd="url(#ah-md)" />
      <rect x="454" y="60" width="150" height="58" rx="9" fill={C.box} stroke={C.edge} />
      <text x="529" y="84" fill={C.ink} fontSize="13.5" textAnchor="middle">RDS + S3</text>
      <text x="529" y="102" fill={C.dim} fontSize="11" textAnchor="middle">right-sized</text>

      <rect x="646" y="20" width="246" height="98" rx="9" fill={C.accentBox} stroke={C.accentEdge} />
      <text x="769" y="46" fill={C.accent} fontSize="13.5" textAnchor="middle">PyBot, self hosted</text>
      <text x="769" y="68" fill={C.accentDim} fontSize="11.5" textAnchor="middle">Django + Ollama, Gemma 2B</text>
      <text x="769" y="86" fill={C.accentDim} fontSize="11.5" textAnchor="middle">no external API bill</text>
      <text x="769" y="104" fill={C.accentDim} fontSize="11.5" textAnchor="middle">student PII never leaves</text>

      <rect x="646" y="140" width="246" height="78" rx="9" fill={C.box} stroke={C.edge} />
      <text x="769" y="164" fill={C.ink} fontSize="12.5" textAnchor="middle">Serverless reporting</text>
      <text x="769" y="184" fill={C.dim} fontSize="11" textAnchor="middle">Lambda, API Gateway, EventBridge</text>
      <text x="769" y="202" fill={C.dim} fontSize="11" textAnchor="middle">8 departments, was manual</text>

      <text x="8" y="244" fill={C.faint} fontSize="11">Four codebases shipped through GitHub Actions: Android, Laravel LMS, Django, Next.js admin. Zero-downtime ECS rollouts.</text>
    </Frame>
  );
}

export function FireflyDiagram() {
  return (
    <Frame viewBox="0 0 900 250">
      <title>Blue green cutover from AWS managed services to self hosted equivalents</title>
      <Defs id="ah-ff" />
      <text x="8" y="18" fill={C.dim} fontSize="11.5">BEFORE, on AWS</text>
      {['EC2 / ECS', 'RDS', 'ALB', 'S3 + CloudFront', 'Lambda + Redis'].map((t, i) => (
        <g key={t}>
          <rect x={8 + i * 128} y="30" width="118" height="42" rx="8" fill={C.box} stroke={C.edge} />
          <text x={67 + i * 128} y="56" fill={C.dim} fontSize="11.5" textAnchor="middle">{t}</text>
        </g>
      ))}

      <line x1="330" y1="82" x2="330" y2="112" stroke={C.accent} strokeWidth="1.6" markerEnd="url(#ah-ff)" />
      <rect x="148" y="116" width="364" height="42" rx="9" fill={C.accentBox} stroke={C.accentEdge} />
      <text x="330" y="142" fill={C.accent} fontSize="12.5" textAnchor="middle">Blue green cutover, replication caught up first</text>

      <line x1="330" y1="162" x2="330" y2="188" stroke={C.faint} strokeWidth="1.4" markerEnd="url(#ah-ff)" />

      <text x="8" y="182" fill={C.dim} fontSize="11.5">AFTER, self managed</text>
      {['Bare metal', 'PostgreSQL', 'nginx', 'Object storage', 'Redis'].map((t, i) => (
        <g key={t}>
          <rect x={8 + i * 128} y="192" width="118" height="42" rx="8" fill={C.box} stroke={C.edge} />
          <text x={67 + i * 128} y="218" fill={C.ink} fontSize="11.5" textAnchor="middle">{t}</text>
        </g>
      ))}

      <rect x="672" y="116" width="220" height="118" rx="9" fill={C.box} stroke={C.edge} />
      <text x="782" y="140" fill={C.ink} fontSize="12.5" textAnchor="middle">Result</text>
      <text x="782" y="164" fill={C.accent} fontSize="16" textAnchor="middle">~60% lower spend</text>
      <text x="782" y="188" fill={C.dim} fontSize="11.5" textAnchor="middle">zero customer downtime</text>
      <text x="782" y="208" fill={C.dim} fontSize="11.5" textAnchor="middle">full control of placement</text>
      <text x="782" y="226" fill={C.dim} fontSize="11.5" textAnchor="middle">and tuning</text>
    </Frame>
  );
}

export function GitopsDiagram() {
  return (
    <Frame viewBox="0 0 900 250">
      <title>CI writes image tags to Git; ArgoCD reconciles the cluster to Git every three minutes</title>
      <Defs id="ah-go" />
      <rect x="8" y="80" width="146" height="70" rx="9" fill={C.box} stroke={C.edge} />
      <text x="81" y="106" fill={C.ink} fontSize="13.5" textAnchor="middle">GitHub Actions</text>
      <text x="81" y="126" fill={C.dim} fontSize="11" textAnchor="middle">builds, tags by SHA</text>
      <text x="81" y="142" fill={C.dim} fontSize="11" textAnchor="middle">never deploys</text>

      <line x1="160" y1="115" x2="216" y2="115" stroke={C.faint} strokeWidth="1.4" markerEnd="url(#ah-go)" />
      <text x="188" y="105" fill={C.faint} fontSize="10" textAnchor="middle">commits</text>

      <rect x="222" y="80" width="156" height="70" rx="9" fill={C.accentBox} stroke={C.accentEdge} />
      <text x="300" y="106" fill={C.accent} fontSize="13.5" textAnchor="middle">GitOps repo</text>
      <text x="300" y="126" fill={C.accentDim} fontSize="11" textAnchor="middle">Helm charts + values</text>
      <text x="300" y="142" fill={C.accentDim} fontSize="11" textAnchor="middle">the only source of truth</text>

      <line x1="384" y1="115" x2="440" y2="115" stroke={C.faint} strokeWidth="1.4" markerEnd="url(#ah-go)" />

      <rect x="446" y="80" width="156" height="70" rx="9" fill={C.box} stroke={C.edge} />
      <text x="524" y="106" fill={C.ink} fontSize="13.5" textAnchor="middle">ArgoCD</text>
      <text x="524" y="126" fill={C.dim} fontSize="11" textAnchor="middle">App of Apps</text>
      <text x="524" y="142" fill={C.dim} fontSize="11" textAnchor="middle">auto-sync, self heal</text>

      <line x1="608" y1="115" x2="664" y2="115" stroke={C.faint} strokeWidth="1.4" markerEnd="url(#ah-go)" />

      <rect x="670" y="52" width="222" height="126" rx="9" fill={C.box} stroke={C.edge} />
      <text x="781" y="76" fill={C.ink} fontSize="13" textAnchor="middle">Cluster, 3 environments</text>
      {['10 services, 4 languages', 'HPA on CPU + custom metrics', 'External Secrets from AWS', 'nginx ingress, cert-manager', 'kube-prometheus-stack'].map((t, i) => (
        <text key={t} x="686" y={100 + i * 17} fill={C.dim} fontSize="11">{t}</text>
      ))}

      <path d="M524 158 L524 200 L300 200 L300 158" fill="none" stroke={C.accent} strokeWidth="1.4" strokeDasharray="4 4" markerEnd="url(#ah-go)" />
      <text x="412" y="216" fill={C.accent} fontSize="11" textAnchor="middle">drift check every 3 minutes, hand patches reverted</text>

      <text x="8" y="34" fill={C.faint} fontSize="11">A per-service tag override means one service rolls without waiting on the other nine.</text>
    </Frame>
  );
}

export const diagrams = {
  smartzees: SmartzeesDiagram,
  nextlab: NextlabDiagram,
  mediatiz: MediatizDiagram,
  firefly: FireflyDiagram,
  gitops: GitopsDiagram,
} as const;
