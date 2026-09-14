'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * A running simulation of the inference path, not a picture of it.
 *
 * The numbers are a model, not a capture from the real cluster, and the caption
 * says so. What it is honest about is the shape: queueing delay dominates long
 * before the GPU is saturated, continuous batching is most of the throughput,
 * and a cold replica is useless for as long as its weights take to load.
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
  warn: '#E8A33D',
};

const TICK = 100; // ms
const DT = TICK / 1000;
const MAX_REPLICAS = 6;
const LANE_X0 = 63;
const LANE_X1 = 833;

type Replica = { id: number; state: 'ready' | 'warming' | 'dead'; warm: number };
type Packet = { id: number; x: number; speed: number; hit: boolean };

type Snapshot = {
  queue: number;
  served: number;
  rate: number;
  latency: number;
  util: number;
  replicas: Replica[];
  packets: Packet[];
  history: number[];
  log: string[];
};

const EMPTY: Snapshot = {
  queue: 0,
  served: 0,
  rate: 0,
  latency: 0,
  util: 0,
  replicas: [
    { id: 1, state: 'ready', warm: 0 },
    { id: 2, state: 'ready', warm: 0 },
  ],
  packets: [],
  history: [],
  log: ['Two replicas ready. Press play.'],
};

export function InferenceSim() {
  const [running, setRunning] = useState(false);
  const [traffic, setTraffic] = useState(9);
  const [ceiling, setCeiling] = useState(4);
  const [modelMs, setModelMs] = useState(120);
  const [autoscale, setAutoscale] = useState(true);
  const [batching, setBatching] = useState(true);
  const [prefixCache, setPrefixCache] = useState(true);
  const [sharedWeights, setSharedWeights] = useState(true);
  const [snap, setSnap] = useState<Snapshot>(EMPTY);

  // Live values the tick reads without restarting the interval.
  const cfg = useRef({ traffic, ceiling, modelMs, autoscale, batching, prefixCache, sharedWeights });
  cfg.current = { traffic, ceiling, modelMs, autoscale, batching, prefixCache, sharedWeights };

  const sim = useRef<Snapshot>(EMPTY);
  const seq = useRef({ packet: 0, replica: 2, idle: 0, spike: 0 });

  // Anything that moves on its own should not start moving at someone who did
  // not ask for it.
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!m.matches) setRunning(true);
  }, []);

  const push = (s: Snapshot, line: string) => {
    s.log = [line, ...s.log].slice(0, 4);
  };

  const reset = useCallback(() => {
    sim.current = { ...EMPTY, replicas: EMPTY.replicas.map((r) => ({ ...r })), log: ['Reset.'] };
    seq.current = { packet: 0, replica: 2, idle: 0, spike: 0 };
    setSnap(sim.current);
  }, []);

  const kill = useCallback(() => {
    const s = sim.current;
    const victim = [...s.replicas].reverse().find((r) => r.state !== 'dead');
    if (!victim) return;
    victim.state = 'dead';
    push(s, `Replica ${victim.id} killed.`);
    setSnap({ ...s });
  }, []);

  const spike = useCallback(() => {
    seq.current.spike = 60; // six seconds of it
    push(sim.current, 'Traffic spike: 4x for 6s.');
    setSnap({ ...sim.current });
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const s = sim.current;
      const c = cfg.current;

      // --- arrivals -------------------------------------------------------
      const burst = seq.current.spike > 0 ? 4 : 1;
      if (seq.current.spike > 0) seq.current.spike -= 1;
      const lambda = c.traffic * burst;
      s.queue += lambda * DT * (0.75 + Math.random() * 0.5);

      // --- capacity -------------------------------------------------------
      const ready = s.replicas.filter((r) => r.state === 'ready').length;
      const perReplica = c.batching ? 6 : 2;
      const hitRate = c.prefixCache ? 0.35 : 0;
      // A prefix-cache hit skips most of the prefill, so it buys capacity.
      const cacheGain = 1 / (1 - hitRate * 0.75);
      const latencyScale = 120 / Math.max(c.modelMs, 1);
      const capacity = ready * perReplica * cacheGain * latencyScale;

      const servedNow = Math.min(s.queue, capacity * DT);
      s.queue = Math.max(0, s.queue - servedNow);
      s.served += servedNow;
      s.rate = s.rate * 0.85 + (servedNow / DT) * 0.15;

      const serviceMs = c.modelMs * (c.batching ? 1 : 1.8);
      const queueMs = capacity > 0.01 ? (s.queue / capacity) * 1000 : 4000;
      s.latency = capacity > 0.01 ? serviceMs + queueMs : 4000;
      s.util = capacity > 0.01 ? Math.min(1, (servedNow / DT) / capacity) : 0;

      // --- warming and autoscale -----------------------------------------
      for (const r of s.replicas) {
        if (r.state === 'warming') {
          r.warm -= 1;
          if (r.warm <= 0) {
            r.state = 'ready';
            push(s, `Replica ${r.id} ready.`);
          }
        }
      }
      const live = s.replicas.filter((r) => r.state !== 'dead').length;
      if (c.autoscale && s.queue > 6 && live < Math.min(c.ceiling, MAX_REPLICAS)) {
        seq.current.replica += 1;
        // Weights already on the node are a restart. Weights over the network
        // are a download, and the replica is dead weight until it lands.
        const warm = c.sharedWeights ? 12 : 85;
        s.replicas.push({ id: seq.current.replica, state: 'warming', warm });
        push(s, `Queue ${s.queue.toFixed(0)}: adding replica ${seq.current.replica}.`);
      }
      if (s.queue < 1 && ready > 1) {
        seq.current.idle += 1;
        if (seq.current.idle > 45 && c.autoscale) {
          const last = [...s.replicas].reverse().find((r) => r.state === 'ready');
          if (last && s.replicas.filter((r) => r.state !== 'dead').length > 1) {
            s.replicas = s.replicas.filter((r) => r !== last);
            push(s, `Idle: released replica ${last.id}.`);
          }
          seq.current.idle = 0;
        }
      } else {
        seq.current.idle = 0;
      }
      s.replicas = s.replicas.filter((r) => r.state !== 'dead' || s.replicas.length <= 1).slice(0, MAX_REPLICAS);

      // --- packets in flight ---------------------------------------------
      const travel = Math.min(3, Math.max(0.35, s.latency / 1000));
      const speed = (LANE_X1 - LANE_X0) / travel;
      const spawn = Math.min(3, Math.round(servedNow));
      for (let i = 0; i < spawn && s.packets.length < 34; i += 1) {
        seq.current.packet += 1;
        s.packets.push({
          id: seq.current.packet,
          x: LANE_X0,
          speed,
          hit: Math.random() < hitRate,
        });
      }
      s.packets = s.packets
        .map((p) => ({ ...p, x: p.x + p.speed * DT * (p.hit ? 1.5 : 1) }))
        .filter((p) => p.x < LANE_X1);

      s.history = [...s.history, s.queue].slice(-120);
      setSnap({ ...s, replicas: s.replicas.map((r) => ({ ...r })) });
    }, TICK);
    return () => clearInterval(id);
  }, [running]);

  const ready = snap.replicas.filter((r) => r.state === 'ready').length;
  const warming = snap.replicas.filter((r) => r.state === 'warming').length;
  const hot = snap.queue > 12;

  return (
    <figure className="card bg-panel p-5 sm:p-7">
      <figcaption className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <span className="sec-label">Request to response, running</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            aria-pressed={running}
            className="focusable rounded-md border border-edge px-3 py-1.5 text-[13px] text-ink transition-colors hover:border-muted"
          >
            {running ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            onClick={reset}
            className="focusable rounded-md border border-[#24262C] px-3 py-1.5 text-[13px] text-muted transition-colors hover:border-edge hover:text-ink"
          >
            Reset
          </button>
        </div>
      </figcaption>

      <div className="overflow-x-auto">
        <svg viewBox="0 0 900 260" className="block h-auto w-full min-w-[660px]" role="img"
          fontFamily="var(--font-mono), ui-monospace, monospace">
          <title>A request arriving, queueing, being served by a pool of vLLM replicas, and returning</title>
          <defs>
            <marker id="sim-ah" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
              <path d="M0 1 L8 4.5 L0 8 z" fill={C.faint} />
            </marker>
          </defs>

          {/* autoscaler */}
          <rect x="492" y="16" width="230" height="32" rx="8" fill={C.box}
            stroke={autoscale ? C.accentEdge : C.edge} />
          <text x="607" y="36" fill={autoscale ? C.accent : C.faint} fontSize="11" textAnchor="middle">
            {autoscale ? 'autoscaler: on, watches queue depth' : 'autoscaler: off'}
          </text>
          <line x1="607" y1="50" x2="607" y2="60" stroke={C.faint} strokeWidth="1.4" markerEnd="url(#sim-ah)" />

          {[[118, 168], [278, 330], [440, 492], [722, 774]].map(([a, b]) => (
            <line key={a} x1={a} y1="150" x2={b} y2="150" stroke={C.faint} strokeWidth="1.4" markerEnd="url(#sim-ah)" />
          ))}

          {/* requests */}
          <rect x="8" y="120" width="110" height="60" rx="9" fill={C.box} stroke={C.edge} />
          <text x="63" y="145" fill={C.ink} fontSize="13" textAnchor="middle">Requests</text>
          <text x="63" y="164" fill={C.dim} fontSize="11" textAnchor="middle">{traffic} req/s</text>

          {/* gateway */}
          <rect x="168" y="110" width="110" height="80" rx="9" fill={C.box} stroke={C.edge} />
          <text x="223" y="140" fill={C.ink} fontSize="13" textAnchor="middle">Gateway</text>
          <text x="223" y="160" fill={C.dim} fontSize="11" textAnchor="middle">one route</text>
          <text x="223" y="176" fill={C.dim} fontSize="11" textAnchor="middle">per model</text>

          {/* queue, with the depth drawn as a fill */}
          <rect x="330" y="110" width="110" height="80" rx="9" fill={C.box} stroke={hot ? C.warn : C.edge} />
          <rect x="330" y={190 - Math.min(78, snap.queue * 2.6)} width="110"
            height={Math.min(78, snap.queue * 2.6)} rx="8"
            fill={hot ? 'rgba(232,163,61,0.16)' : 'rgba(199,240,75,0.10)'} />
          <text x="385" y="142" fill={C.ink} fontSize="13" textAnchor="middle">Queue</text>
          <text x="385" y="166" fill={hot ? C.warn : C.accent} fontSize="15" textAnchor="middle">
            {snap.queue.toFixed(0)}
          </text>
          <text x="385" y="182" fill={C.dim} fontSize="10.5" textAnchor="middle">waiting</text>

          {/* gpu pool */}
          <rect x="492" y="64" width="230" height="172" rx="9" fill={C.accentBox} stroke={C.accentEdge} />
          <text x="607" y="88" fill={C.accent} fontSize="13" textAnchor="middle">GPU node pool</text>
          {Array.from({ length: MAX_REPLICAS }).map((_, i) => {
            const r = snap.replicas[i];
            const x = 506 + (i % 3) * 70;
            const y = i < 3 ? 98 : 150;
            const on = r?.state === 'ready';
            const warm = r?.state === 'warming';
            return (
              <g key={i}>
                <rect x={x} y={y} width="62" height="44" rx="7"
                  fill={on ? C.box : 'transparent'}
                  stroke={on ? C.accentEdge : warm ? C.warn : C.edge}
                  strokeDasharray={warm ? '3 3' : undefined}
                  opacity={r ? 1 : 0.35} />
                <text x={x + 31} y={y + 21} fontSize="10.5" textAnchor="middle"
                  fill={on ? C.accent : warm ? C.warn : C.faint}>
                  {on ? 'vLLM' : warm ? 'loading' : 'idle'}
                </text>
                {on && (
                  <rect x={x + 10} y={y + 29} width={42 * Math.max(0.06, snap.util)} height="4" rx="2" fill={C.accent} />
                )}
              </g>
            );
          })}
          <text x="607" y="220" fill={C.accentDim} fontSize="10.5" textAnchor="middle">
            {batching ? 'continuous batching' : 'batching off, static batches'}
          </text>

          {/* response */}
          <rect x="774" y="120" width="118" height="60" rx="9" fill={C.box} stroke={C.edge} />
          <text x="833" y="145" fill={C.ink} fontSize="13" textAnchor="middle">Response</text>
          <text x="833" y="164" fill={snap.latency > 900 ? C.warn : C.dim} fontSize="11" textAnchor="middle">
            {Math.round(snap.latency)} ms
          </text>

          {/* requests in flight */}
          {snap.packets.map((p) => (
            <circle key={p.id} cx={p.x} cy={150} r={p.hit ? 2.6 : 3.2}
              fill={p.hit ? C.accent : C.ink} opacity={p.hit ? 0.9 : 0.55} />
          ))}
        </svg>
      </div>

      {/* live counters */}
      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-5">
        {[
          { k: 'Served', v: `${snap.rate.toFixed(1)}/s` },
          { k: 'Queue', v: snap.queue.toFixed(0) },
          { k: 'Replicas', v: warming ? `${ready} + ${warming}` : `${ready}` },
          { k: 'Latency', v: `${Math.round(snap.latency)} ms` },
          { k: 'GPU busy', v: `${Math.round(snap.util * 100)}%` },
        ].map((m) => (
          <div key={m.k} className="flex flex-col gap-1 bg-panel px-4 py-3">
            <dt className="sec-label">{m.k}</dt>
            <dd className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">{m.v}</dd>
          </div>
        ))}
      </dl>

      {/* queue depth, last 12 seconds */}
      <div className="mt-4 flex items-center gap-3">
        <span className="sec-label shrink-0">Queue, 12s</span>
        <svg viewBox="0 0 240 28" preserveAspectRatio="none" className="h-7 w-full" aria-hidden="true">
          <polyline
            points={snap.history
              .map((q, i) => `${(i / 119) * 240},${28 - Math.min(26, q * 0.9)}`)
              .join(' ')}
            fill="none"
            stroke={hot ? C.warn : C.accent}
            strokeWidth="1.4"
          />
        </svg>
      </div>

      {/* controls */}
      <div className="mt-5 grid grid-cols-1 gap-5 border-t border-line pt-5 sm:grid-cols-2">
        <div className="flex flex-col gap-3.5">
          <Slider label="Traffic" value={traffic} min={1} max={40} unit=" req/s" onChange={setTraffic} />
          <Slider label="Replica ceiling" value={ceiling} min={1} max={MAX_REPLICAS} unit="" onChange={setCeiling} />
          <Slider label="Model latency" value={modelMs} min={40} max={400} step={10} unit=" ms" onChange={setModelMs} />
        </div>
        <div className="flex flex-col gap-2.5">
          <Toggle label="Autoscale on queue depth" on={autoscale} set={setAutoscale} />
          <Toggle label="Continuous batching" on={batching} set={setBatching} />
          <Toggle label="Prefix cache" on={prefixCache} set={setPrefixCache} />
          <Toggle label="Weights on shared volume" on={sharedWeights} set={setSharedWeights} />
          <div className="mt-1 flex flex-wrap gap-2">
            <button type="button" onClick={spike}
              className="focusable rounded-md border border-[#24262C] px-3 py-1.5 text-[12.5px] text-muted transition-colors hover:border-edge hover:text-ink">
              Traffic spike
            </button>
            <button type="button" onClick={kill}
              className="focusable rounded-md border border-[#24262C] px-3 py-1.5 text-[12.5px] text-muted transition-colors hover:border-edge hover:text-ink">
              Kill a replica
            </button>
          </div>
        </div>
      </div>

      <ul className="mt-5 flex flex-col gap-1 border-t border-line pt-4" aria-live="polite">
        {snap.log.map((l, i) => (
          <li key={`${l}-${i}`} className="font-mono text-[12px]" style={{ color: i === 0 ? C.dim : C.faint }}>
            {l}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[12.5px] leading-[1.6] text-faint">
        A model of the system, not a capture from the cluster. Turn batching off, or weights off the
        shared volume, and watch where the time actually goes.
      </p>
    </figure>
  );
}

function Slider({
  label, value, min, max, step = 1, unit, onChange,
}: { label: string; value: number; min: number; max: number; step?: number; unit: string; onChange: (n: number) => void }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between text-[13px] text-muted">
        {label}
        <span className="font-mono text-[12.5px] text-ink">{value}{unit}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="focusable h-1 w-full cursor-pointer appearance-none rounded bg-[#24262C] accent-accent" />
    </label>
  );
}

function Toggle({ label, on, set }: { label: string; on: boolean; set: (b: boolean) => void }) {
  return (
    <button type="button" onClick={() => set(!on)} aria-pressed={on}
      className="focusable flex items-center gap-2.5 text-left text-[13px] text-muted transition-colors hover:text-ink">
      <span className={`flex h-[18px] w-[32px] shrink-0 items-center rounded-full border px-[2px] transition-colors ${
        on ? 'border-accent/40 bg-accent/20' : 'border-[#24262C] bg-[#16181C]'}`}>
        <span className={`h-[12px] w-[12px] rounded-full transition-transform ${
          on ? 'translate-x-[14px] bg-accent' : 'translate-x-0 bg-[#4E5158]'}`} />
      </span>
      {label}
    </button>
  );
}
