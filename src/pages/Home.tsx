/*
M.I.N.D. Milestone 4 — Design System (Bioinformatics Blueprint)
- High-contrast medical-tech palette with teal primary + lime accent
- Asymmetric sections with blueprint dividers and subtle grain
- Motion: only fade/stagger reveals; no distracting effects
*/

import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ClipboardList,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Layers,
  Link2,
  Menu,
  Microscope,
  Moon,
  Shield,
  SlidersHorizontal,
  Sun,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/contexts/ThemeContext";
import heroImg from "@/assets/hero-medtech.jpg";
import logoImg from "../../img/logo.png";
import signalFlowDiagram from "../../img/MIND_Signal_Flow_Diagram.png";
import primaryTradeoffPlot from "@/assets/plots/primary-tradeoff_conf_acc_vs_coverage.png";
import primaryPvaluePlot from "@/assets/plots/primary-paired_ttest_pvalue_vs_threshold.png";
import bnciPvaluePlot from "@/assets/plots/bnci-paired_ttest_pvalue_vs_threshold.png";
import confusionMatrixGlobal from "@/assets/plots/confusion_matrix_ensemble_global.png";

interface HomeProps {
  targetSection?: string;
}

const TEAM = {
  name: "M.I.N.D. — Mental interpretation network for decision making",
  projectNumber: "6857",
  members: [
    "Ishani Singh",
    "Mayu Kanai",
    "Habiba Hisham",
    "Kevin Zhou",
    "Joshua Zhuravskiy",
    "Mohammad Yamout",
  ],
  mentor: "Asan Abdulkareem",
};

const LINKS = {
  githubRepo: "https://github.com/junior-academy/m.i.n.d",
  githubOrg: "https://github.com/junior-academy",
  dashboard: "https://m-i-n-d-dashboard.vercel.app/",
  hardwareDoc: "https://docs.google.com/document/d/1WXulgZgBNPpNRpNQfBF3iQciMAnh06yxOO5ESlmd6mk/edit?tab=t.0",
  reflectionsDoc: "https://docs.google.com/document/d/1k90IPzWDUX7Z669YRt66vCPSbz5McWVelmLYfWifmHg/edit?tab=t.stdp2u1ha221",
  blenderModels: "https://drive.google.com/drive/folders/1bZ1EHGgcU94LtpbFDijSDXvAwMqezgif",
  bciCompetitionIV: "https://www.bbci.de/competition/iv/",
  bciCompetitionIII: "https://www.bbci.de/competition/iii/",
};

const LITERATURE_SOURCES = [
  { t: "Ramoser et al. (2000) — CSP", u: "https://ieeexplore.ieee.org/document/895946" },
  { t: "Ang et al. (2012) — FBCSP", u: "https://www.frontiersin.org/articles/10.3389/fnins.2012.00039/full" },
  { t: "PLOS ONE (2022) — inefficient BCI users", u: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0268880" },
  { t: "TandFOnline (2025) — review", u: "https://www.tandfonline.com/doi/full/10.1080/27706710.2025.2523303" },
  { t: "ScienceDirect (2021) — ensemble RCSSP", u: "https://www.sciencedirect.com/science/article/abs/pii/S0010482521003401" },
  { t: "Springer (2020) — SVM voting", u: "https://link.springer.com/article/10.1007/s42452-020-2378-z" },
  { t: "Frontiers Human Neuroscience (2023)", u: "https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2023.1175399/full" },
  { t: "ScienceDirect (2022) — low SNR / non-stationarity", u: "https://www.sciencedirect.com/science/article/abs/pii/S1746809422003470" },
  { t: "PMC (2021) — ensemble MI", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8595002/" },
  { t: "MNE — ICA artifact correction docs", u: "https://mne.tools/stable/auto_tutorials/preprocessing/40_artifact_correction_ica.html" },
  { t: "MNE — CSP decoding example", u: "https://mne.tools/stable/auto_examples/decoding/decoding_csp_eeg.html" },
  { t: "PMC (2010) — BCI latency", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3161621/" },
  { t: "Nature Communications (2025) — real-time robotic hand control", u: "https://www.nature.com/articles/s41467-025-61064-x" },
  { t: "PMC (2021) — Raspberry Pi feasibility", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8071098/" },
  { t: "PMC (2019) — covariate shift adaptive ensemble", u: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7086459/" },
];

const DATA_SOURCES = [
  { t: "BCI Competition IV dataset page", u: LINKS.bciCompetitionIV },
  { t: "BCI Competition III dataset page", u: LINKS.bciCompetitionIII },
];

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono"
      style={{
        fontFamily:
          '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      }}
    >
      {children}
    </span>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-10 bg-primary/60" />
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Mono>{eyebrow}</Mono>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.45rem] sm:text-[1.8rem] font-semibold leading-tight">{title}</h2>
            {subtitle ? <p className="text-sm text-muted-foreground max-w-4xl">{subtitle}</p> : null}
          </div>
        </div>

        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Mono>{label}</Mono>
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {hint ? <div className="mt-1 text-sm text-muted-foreground">{hint}</div> : null}
    </div>
  );
}

function AnchorButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Button asChild className="gap-2">
      <Link href={href}>
        {children}
        <ArrowDown className="h-4 w-4" />
      </Link>
    </Button>
  );
}

function ExternalPill({ label, url }: { label: string; url: string }) {
  return (
    <a
      className="group inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-sm backdrop-blur hover:bg-background transition"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <Link2 className="h-4 w-4 text-primary" aria-hidden="true" />
      <span className="font-medium">{label}</span>
      <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100" aria-hidden="true" />
    </a>
  );
}

function BlackedOutPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300">
      <Link2 className="h-4 w-4 opacity-70" aria-hidden="true" />
      <span className="font-medium">{label}</span>
      <span className="text-xs opacity-80">Unavailable</span>
    </span>
  );
}

export default function Home({ targetSection }: HomeProps) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetSection]);

  const nav = useMemo(
    () => [
      { id: "hero", label: "Top" },
      { id: "slide-2", label: "Problem" },
      { id: "slide-6", label: "Methods" },
      { id: "slide-9", label: "Results" },
      { id: "slide-11", label: "Validation" },
      { id: "slide-12", label: "Novelty" },
      { id: "slide-15", label: "Viability" },
      { id: "slide-18", label: "Links" },
      { id: "slide-19", label: "30-sec Close" },
    ],
    [],
  );

  const noveltyAblationRows = useMemo(
    () => [
      {
        condition: "Ensemble only (no safety gate)",
        wrongFire: "higher (not safety-constrained)",
        safeFire: "not optimized under alpha",
        toggle: "higher jitter risk",
      },
      {
        condition: "Ensemble + debounced safety layer (alpha = 0.05)",
        wrongFire: "explicitly constrained",
        safeFire: "maximized under constraint",
        toggle: "reduced via hysteresis + k-of-n + latch",
      },
    ],
    [],
  );

  const pilotPlanRows = useMemo(
    () => [
      {
        phase: "Phase 1: bench pilot",
        setting: "OpenBCI -> Raspberry Pi -> simulated actuator",
        duration: "4-6 weeks",
        kpi: "Latency, wrong-fire, toggle stability",
      },
      {
        phase: "Phase 2: supervised rehab simulation",
        setting: "Clinician-observed scripted tasks",
        duration: "6-8 weeks",
        kpi: "Coverage usability + safety threshold adherence",
      },
      {
        phase: "Phase 3: multi-site replication",
        setting: "Partner labs / clinics",
        duration: "8-12 weeks",
        kpi: "Cross-site reproducibility and fairness spread",
      },
    ],
    [],
  );

  const externalValidationPlanRows = useMemo(
    () => [
      {
        step: "Clinician outreach packet finalized (one-page brief + dashboard link + safety notes)",
        owner: "Kevin Zhou + Ishani Singh",
        target: "April 29, 2026",
        evidence: "Packet PDF + outreach email template in repo/docs",
      },
      {
        step: "First clinician feedback call (structured 20-minute interview)",
        owner: "Mayu Kanai + Habiba Hisham",
        target: "May 6, 2026",
        evidence: "Meeting notes + action items with timestamp",
      },
      {
        step: "Lab/rehab org pilot-interest requests sent (minimum 3 targets)",
        owner: "Mohammad Yamout + Joshua Zhuravskiy",
        target: "May 10, 2026",
        evidence: "Outreach log with recipient + status",
      },
      {
        step: "External validation checkpoint published",
        owner: "Entire team (mentor review)",
        target: "May 17, 2026",
        evidence: "Public status slide with responses received / pending / declined",
      },
    ],
    [],
  );

  const lockedThresholdModelStats = useMemo(
    () => [
      {
        model: "Ablation: LDA+SVM+RF (global)",
        n: "9",
        coverage: "0.464",
        confAcc: "0.784",
        delta: "+0.156",
        ci: "[0.102, 0.210]",
        p: "0.00016",
      },
      {
        model: "Main: LDA+SVM (equal)",
        n: "9",
        coverage: "0.476",
        confAcc: "0.701",
        delta: "+0.073",
        ci: "[-0.054, 0.200]",
        p: "0.224",
      },
      {
        model: "Main: LDA+SVM (subj-weights)",
        n: "9",
        coverage: "0.816",
        confAcc: "0.663",
        delta: "+0.035",
        ci: "[0.006, 0.064]",
        p: "0.024",
      },
      {
        model: "Stacking: LDA+SVM (meta-learner)",
        n: "9",
        coverage: "0.471",
        confAcc: "0.641",
        delta: "+0.013",
        ci: "[-0.119, 0.145]",
        p: "0.830",
      },
      {
        model: "LDA_SVM_RF_global_debounced",
        n: "6",
        coverage: "0.039",
        confAcc: "0.335",
        delta: "-0.372",
        ci: "[-0.575, -0.170]",
        p: "0.005",
      },
      {
        model: "LDA_SVM_baseline_subject_debounced",
        n: "9",
        coverage: "0.249",
        confAcc: "0.283",
        delta: "-0.345",
        ci: "[-0.503, -0.187]",
        p: "0.001",
      },
    ],
    [],
  );

  const claimTraceRows = useMemo(
    () => [
      {
        claim: "Locked-threshold lift exists at t*=0.60.",
        metric: "delta=+0.156, p=0.00016 (Ablation LDA+SVM+RF global)",
        source: "m.i.n.d/outputs/ensemble_v2/stats_tests_confident_vs_best.csv",
      },
      {
        claim: "Main operating mode prioritizes coverage.",
        metric: "coverage=0.816 (LDA+SVM subject weights)",
        source: "m.i.n.d/outputs/ensemble_v2/stats_tests_confident_vs_best.csv",
      },
      {
        claim: "Agreement beyond chance on committed trials.",
        metric: "kappa=0.550 global @ t=0.60",
        source: "m.i.n.d/outputs/key_numbers/operational_metrics.csv",
      },
      {
        claim: "Policy compute is fast in software-only benchmark.",
        metric: "1.324 us/trial (debounced gate loop)",
        source: "m.i.n.d/outputs/key_numbers/operational_metrics.csv",
      },
      {
        claim: "Variance/stability gain not confirmed.",
        metric: "Levene p=0.568 at locked threshold",
        source: "m.i.n.d/outputs/ensemble_v2/stats_tests_confident_vs_best.csv",
      },
    ],
    [],
  );

  const noveltyComparisonRows = useMemo(
    () => [
      {
        existing: "Classifier-only BCI output; commits whenever top class wins.",
        ours: "Classifier wrapped by safety-constrained debounced FIRE/HOLD policy.",
        proof: "Ablation model at t*=0.60: delta +0.156, p=0.00016.",
      },
      {
        existing: "Optimized for accuracy only.",
        ours: "Explicit objective: maximize safe-fire subject to wrong-fire <= alpha.",
        proof: "Debounced grids report wrong-fire, safe-fire, and toggle metrics.",
      },
      {
        existing: "Model-specific safety logic.",
        ours: "Model-agnostic control layer (no retraining required).",
        proof: "Same policy framework applied across equal/subj/global ensembles.",
      },
    ],
    [],
  );

  const deploymentModelRows = useMemo(
    () => [
      {
        role: "Buyer",
        owner: "Rehab clinics, university labs, or grant-funded pilot programs.",
      },
      {
        role: "Operator",
        owner: "Trained clinician/research assistant during supervised sessions.",
      },
      {
        role: "Maintainer",
        owner: "Technical lead + lab engineer for updates, calibration scripts, and safety logs.",
      },
    ],
    [],
  );

  const costRows = useMemo(
    () => [
      {
        item: "Prototype stack",
        value: "High (OpenBCI + SBC + actuator hardware); exact BOM maintained in hardware doc.",
      },
      {
        item: "Clinic pilot cost",
        value: "Lower per-user through shared station model and scheduled supervised sessions.",
      },
      {
        item: "Cost-down path",
        value: "Benchmark lower-cost EEG options + shared-device deployment + setup automation.",
      },
    ],
    [],
  );

  const adoptionKpiRows = useMemo(
    () => [
      {
        phase: "Phase 1 (bench pilot)",
        setup: "<= 20 min median",
        failure: "<= 5% unsafe-fire per all trials target",
        training: "<= 2 sessions to stable policy",
        retention: ">= 80% weekly continuation",
      },
      {
        phase: "Phase 2 (supervised rehab simulation)",
        setup: "<= 15 min median",
        failure: "<= 3% unsafe-fire per all trials target",
        training: "<= 3 sessions across users",
        retention: ">= 85% completion rate",
      },
      {
        phase: "Phase 3 (multi-site replication)",
        setup: "<= 15 min median across sites",
        failure: "<= 3% with site-to-site parity checks",
        training: "Site onboarding <= 1 week",
        retention: ">= 85% across sites",
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1600px] lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:flex-col border-r bg-card/65 backdrop-blur-sm px-4 py-5">
          <div className="flex items-center gap-3 pb-5 border-b">
            <div className="h-10 w-10 shrink-0 rounded-xl border bg-background p-1.5">
              <img src={logoImg} alt="M.I.N.D. logo" className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">M.I.N.D.</div>
              <div className="text-xs text-muted-foreground">
                Project <Mono>{TEAM.projectNumber}</Mono>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-2">Sections</div>
            <nav className="grid gap-1.5">
              {nav.map((n) => (
                <Button key={n.id} variant="ghost" size="sm" asChild className="justify-start h-8 text-xs font-medium">
                  <Link href={`/${n.id}`}>{n.label}</Link>
                </Button>
              ))}
              <Button variant="ghost" size="sm" asChild className="justify-start h-8 text-xs font-medium">
                <a href={LINKS.dashboard} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              </Button>
            </nav>
          </div>

          <div className="mt-auto rounded-xl border bg-background p-3">
            <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-2">Quick Links</div>
            <div className="grid gap-1.5">
              <Button asChild variant="outline" size="sm" className="justify-start h-8 text-xs">
                <a href={LINKS.githubRepo} target="_blank" rel="noreferrer">GitHub Repo</a>
              </Button>
              <Button asChild size="sm" className="justify-start h-8 text-xs">
                <a href={LINKS.dashboard} target="_blank" rel="noreferrer">Dashboard</a>
              </Button>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          {/* Sticky Nav */}
          <header className="sticky top-0 z-50 border-b bg-background/82 backdrop-blur supports-[backdrop-filter]:bg-background/75">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-14 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 shrink-0">
                <img src={logoImg} alt="M.I.N.D. logo" className="h-full w-full object-contain" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">M.I.N.D.</div>
                <div className="text-xs text-muted-foreground">
                  Project <Mono>{TEAM.projectNumber}</Mono>
                </div>
              </div>
            </div>

            <nav className="hidden xl:flex items-center gap-1">
              {nav.map((n) => (
                <Button
                  key={n.id}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Link href={`/${n.id}`}>{n.label}</Link>
                </Button>
              ))}
              <Button variant="ghost" size="sm" asChild className="h-8 text-xs text-muted-foreground hover:text-foreground">
                <a href={LINKS.dashboard} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              </Button>
            </nav>

            <div className="flex items-center gap-2">
              <div className="xl:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Menu className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden sm:inline">Sections</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[320px]">
                    <div className="text-sm font-semibold">Navigate</div>
                    <div className="mt-3 grid gap-1">
                      {nav.map((n) => (
                        <Button key={n.id} variant="ghost" asChild className="justify-start">
                          <Link href={`/${n.id}`}>{n.label}</Link>
                        </Button>
                      ))}
                      <Button variant="ghost" asChild className="justify-start">
                        <a href={LINKS.dashboard} target="_blank" rel="noreferrer">
                          Live Demo
                        </a>
                      </Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="text-xs text-muted-foreground">Tip: the site is structured as Slides 1–19.</div>
                  </SheetContent>
                </Sheet>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="gap-2 h-8 text-xs"
                onClick={toggleTheme}
                aria-label="Toggle light and dark theme"
              >
                {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
              </Button>

              <Button asChild variant="outline" size="sm" className="gap-2 h-8 text-xs">
                <a href={LINKS.githubRepo} target="_blank" rel="noreferrer">
                  <GitBranch className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">GitHub Repo</span>
                  <span className="sm:hidden">Repo</span>
                  <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="sm" className="gap-2 h-8 text-xs">
                <a href={LINKS.dashboard} target="_blank" rel="noreferrer">
                  <span className="hidden sm:inline">Dashboard</span>
                  <span className="sm:hidden">Dash</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
            </div>
          </header>

          {/* Slide 1 */}
          <section id="hero" className="relative overflow-hidden border-b scroll-mt-24" aria-label="Hero">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Abstract medical-tech blueprint background with EEG waveforms and network lines"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/75 to-background" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <Microscope className="h-4 w-4 text-primary" aria-hidden="true" />
              <Mono>Slide 1 — Title + Thesis</Mono>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-semibold leading-tight">
              M.I.N.D. - Mental Interpretation Network for Decision Making
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              We convert noisy EEG intent into safer <span className="font-semibold">FIRE/HOLD</span> control using an
              ensemble + debounced safety controller.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <AnchorButton href="/slide-9">Primary Results</AnchorButton>
              <AnchorButton href="/slide-6">Methods</AnchorButton>
              <AnchorButton href="/slide-18">Call to Action + Links</AnchorButton>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Card className="bg-background/70 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Team</CardTitle>
                  <CardDescription>{TEAM.name}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background/70 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Members</CardTitle>
                  <CardDescription>{TEAM.members.join(", ")}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background/70 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Mentor</CardTitle>
                  <CardDescription>{TEAM.mentor}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slide 2 */}
      <Section
        id="slide-2"
        eyebrow="Slide 2"
        title="Problem + Community Impact"
        subtitle="Paralysis and motor impairment can reduce independence; rehab access is often limited. In assistive control, unsafe false activations can cause harm—so safety is a first-class requirement, not an afterthought."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" aria-hidden="true" />
                Community framing
              </CardTitle>
              <CardDescription>Why safety-constrained control matters for rehabilitation.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                In M.I.N.D., <strong>Functional Electrical Stimulation (FES)</strong> is the bridge between intention and movement. When a
                user intends a movement and assisted movement is produced, repeated intention-action loops can support
                neuroplastic rehabilitation pathways.
              </p>
              <p>
                In the M.I.N.D. system, <strong>Functional Electrical Stimulation (FES)</strong> is the bridge between intention and movement.
                By pairing intent-driven movement with repeated rehab loops, we aim to support neuroplasticity.
              </p>
              <p>
                Our design prioritizes <strong>stability</strong> and <strong>safety</strong>: when the system is uncertain, it prefers <strong>HOLD</strong> rather than
                risking an unsafe activation.
              </p>
              <p>
                This is intentionally a <strong>low-cost</strong> direction and <strong>safety-first</strong> design stance: we optimize for dependable
                behavior under noise, not only headline accuracy.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                Equity note
              </CardTitle>
              <CardDescription>Access gaps exist due to equipment, facilitation, and expertise.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              We report <strong>coverage</strong> and <strong>abstention</strong> explicitly so benefits and tradeoffs can be assessed fairly across users.
              Current barriers include device cost, setup burden, and specialist facilitation requirements, which shape how
              quickly communities can benefit.
            </CardContent>
          </Card>
        </div>

        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Novelty proof via ablation framing</CardTitle>
              <CardDescription>
                Distinguishes a standard classifier stack from the safety-constrained control contribution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Condition</TableHead>
                    <TableHead>Wrong-fire behavior</TableHead>
                    <TableHead>Safe-fire objective</TableHead>
                    <TableHead>Stability behavior</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {noveltyAblationRows.map((row) => (
                    <TableRow key={row.condition}>
                      <TableCell className="font-medium">{row.condition}</TableCell>
                      <TableCell>{row.wrongFire}</TableCell>
                      <TableCell>{row.safeFire}</TableCell>
                      <TableCell>{row.toggle}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Slide 3 */}
      <Section
        id="slide-3"
        eyebrow="Slide 3"
        title="Stakeholders"
        subtitle="Designing for real usage means optimizing for multiple priorities at once."
      >
        <Card>
          <CardHeader>
            <CardTitle>Primary stakeholders</CardTitle>
            <CardDescription>
              Who is impacted, and whose constraints drive the design (including Parkinson's disease, ALS, stroke, and spinal cord injury pathways).
            </CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border p-3">
              <div className="font-medium">Patients</div>
              <div className="text-muted-foreground">Need reliable intent-to-action with minimal fatigue and minimal risk.</div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="font-medium">Clinicians (OT/PT)</div>
              <div className="text-muted-foreground">Need stable behavior, clear failure modes, and safe defaults.</div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="font-medium">Caregivers</div>
              <div className="text-muted-foreground">Need predictability and reduced risk of unintended movement.</div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="font-medium">Insurers</div>
              <div className="text-muted-foreground">Need evidence of safety and value for broader adoption.</div>
            </div>
            <div className="rounded-lg border p-3 sm:col-span-2">
              <div className="font-medium">Low-resource communities</div>
              <div className="text-muted-foreground">Need lower-cost pathways and reduced reliance on specialized expertise.</div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Slide 4 */}
      <Section
        id="slide-4"
        eyebrow="Slide 4"
        title="Background + Citations"
        subtitle="EEG is non-invasive but noisy (blink/muscle/motion artifacts). MI-BCI performance varies by subject and dataset. For assistive control, safety and stability are as important as raw accuracy."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
                Literature-backed background
              </CardTitle>
              <CardDescription>Sources are separated into literature and dataset sources for quick review.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <Mono>Literature sources</Mono>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {LITERATURE_SOURCES.map((s) => (
                    <a
                      key={s.u}
                      href={s.u}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-xl border bg-card p-3 hover:bg-muted/30 transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-medium text-foreground">{s.t}</div>
                        <ArrowUpRight className="h-4 w-4 opacity-60 group-hover:opacity-100" aria-hidden="true" />
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground break-all">{s.u}</div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <Mono>Data sources</Mono>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  {DATA_SOURCES.map((s) => (
                    <a
                      key={s.u}
                      href={s.u}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-xl border bg-card p-3 hover:bg-muted/30 transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-medium text-foreground">{s.t}</div>
                        <ArrowUpRight className="h-4 w-4 opacity-60 group-hover:opacity-100" aria-hidden="true" />
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground break-all">{s.u}</div>
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" aria-hidden="true" />
                Key framing
              </CardTitle>
              <CardDescription>Two layers: classifier + safety controller</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="rounded-lg border p-3">
                <div className="font-medium text-foreground">Classifier layer</div>
                <div>
                  LDA + SVM + RF ablation ensemble (global soft voting) outputs a confidence score.
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="font-medium text-foreground">Control layer</div>
                <div>Debounced gate turns confidence into FIRE/HOLD behavior under safety constraints (no retraining).</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Slide 5 */}
      <Section
        id="slide-5"
        eyebrow="Slide 5"
        title="Hypothesis"
        subtitle="Confirmatory tests use a locked operating point t* = 0.60. Threshold sweep {0.55, 0.60, 0.65, 0.70, 0.75} is labeled exploratory."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Hypotheses</CardTitle>
              <CardDescription>H1 is confirmatory; H2 is tested transparently even if not supported.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-lg border p-3">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <Mono>Confirmatory</Mono>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">H1:</span> Ensemble confident accuracy &gt; per-subject best-single at locked
                  threshold <Mono>t* = 0.60</Mono>.
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <Mono>Exploratory / transparency check</Mono>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">H2:</span> Ensemble reduces across-subject performance variance (report even if
                  not supported).
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-primary" aria-hidden="true" />
                Operating policy
              </CardTitle>
              <CardDescription>Locked point + sweep are separated by design.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Locked threshold supports fair comparison. The sweep is a usability lens (coverage vs. confident accuracy).
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Slide 6 */}
      <Section
        id="slide-6"
        eyebrow="Slide 6"
        title="Methods Pipeline I"
        subtitle="EEG -> preprocessing/features -> LDA+SVM+RF ablation ensemble (global soft voting) -> confidence score"
      >
        <Card>
          <CardHeader>
            <CardTitle>Pipeline I (signal → model)</CardTitle>
            <CardDescription>Model layer only; the safety controller is shown on Slide 7/13.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="rounded-xl border bg-muted/40 p-4 overflow-x-auto">
              <div className="min-w-[740px] flex items-center gap-3 text-xs">
                {["EEG", "Preprocessing / features", "LDA + SVM + RF ablation ensemble", "Confidence score"].map(
                  (step, idx, arr) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="rounded-full border bg-background px-3 py-2">
                        <Mono>{step}</Mono>
                      </div>
                      {idx < arr.length - 1 ? (
                        <div className="h-[1px] w-10 bg-primary/40" aria-hidden="true" />
                      ) : null}
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              EEG is artifact-prone (blinks/muscle/motion). We use robust preprocessing/feature steps and an ensemble to
              improve stability across noisy trials.
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Slide 7 */}
      <Section
        id="slide-7"
        eyebrow="Slide 7"
        title="Methods Pipeline II"
        subtitle="Confidence threshold → debounced gate → FIRE/HOLD output (safety-first control)"
      >
        <Card>
          <CardHeader>
            <CardTitle>Pipeline II (policy → action)</CardTitle>
            <CardDescription>Control layer that wraps the classifier (no retraining required).</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="rounded-xl border bg-muted/40 p-4 overflow-x-auto">
              <div className="min-w-[760px] flex items-center gap-3 text-xs">
                {["Confidence score", "Threshold (t)", "Debounced safety gate", "FIRE / HOLD"].map((step, idx, arr) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="rounded-full border bg-background px-3 py-2">
                      <Mono>{step}</Mono>
                    </div>
                    {idx < arr.length - 1 ? <div className="h-[1px] w-10 bg-primary/40" /> : null}
                  </div>
                ))}
              </div>
            </div>
            <Alert className="mt-4">
              <AlertTitle>Safety rule</AlertTitle>
              <AlertDescription>Prefer HOLD over unsafe movement when confidence is low or unstable.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </Section>

      {/* Slide 8 */}
      <Section
        id="slide-8"
        eyebrow="Slide 8"
        title="Methods Integrity"
        subtitle="Data split, leakage prevention, locked threshold, and confirmatory vs exploratory boundaries."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Protocol (leakage-aware)</CardTitle>
              <CardDescription>BCI Competition IV 2a; 9 subjects; within-subject 5-fold out-of-fold CV.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  All models evaluated using within-subject 5-fold out-of-fold CV across 9 subjects from BCI Competition IV
                  Dataset 2a.
                </li>
                <li>
                  Each subject partitioned independently; no trials appear in both training and evaluation in any fold (prevents
                  leakage).
                </li>
                <li>
                  Confirmatory hypothesis tests use locked threshold <Mono>t* = 0.60</Mono> selected before inferential
                  statistics.
                </li>
                <li>
                  Exploratory threshold sweep <Mono>{"{0.55, 0.60, 0.65, 0.70, 0.75}"}</Mono> to understand accuracy–coverage tradeoff.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Metric definitions</CardTitle>
              <CardDescription>Why we report more than “accuracy”.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="rounded-lg border p-3">
                <div className="font-medium text-foreground">Coverage</div>
                <div>
                  Fraction of trials where max class probability exceeds threshold; below-threshold outputs HOLD/NULL.
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="font-medium text-foreground">Confident accuracy</div>
                <div>Accuracy only on trials where the system commits to a command (acted-on trials).</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="font-medium text-foreground">All-trials accuracy</div>
                <div>Accuracy across all trials (including those that would output HOLD/NULL).</div>
              </div>
              <Alert>
                <AlertTitle>Guardrail</AlertTitle>
                <AlertDescription>No threshold is chosen post-hoc to optimize p-values.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Methods lock + inferential boundary</CardTitle>
              <CardDescription>Prevents post-hoc tuning disguised as inference.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="rounded-lg border p-3">
                Locked confirmatory threshold: <Mono>t* = 0.60</Mono>
              </div>
              <div className="rounded-lg border p-3">
                Exploratory-only sweep: <Mono>{"{0.55, 0.60, 0.65, 0.70, 0.75}"}</Mono>
              </div>
              <div className="rounded-lg border p-3">
                Secondary optimized threshold is reported for transparency only and is not used for hypothesis tests.
              </div>
              <div className="rounded-lg border p-3">
                Levene variance check is reported at the locked threshold to test the variance claim boundary (not treated as
                a post-hoc optimization target).
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reproducibility packet</CardTitle>
              <CardDescription>Judge-ready replication details.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="rounded-lg border p-3">
                Data source: BCI Competition IV 2a (<Mono>n=9</Mono>), external: IIIa (<Mono>n=3</Mono>), BNCI2014_001
                (<Mono>n=10</Mono>), PhysionetMI (<Mono>n=10</Mono>).
              </div>
              <div className="rounded-lg border p-3">
                Main system: Ablation LDA + SVM + RF (global soft voting); baseline: per-subject best single classifier mean.
              </div>
              <div className="rounded-lg border p-3">
                Outputs include confidence/coverage tables, effect sizes, CIs, and confusion matrix analysis for committed
                predictions.
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Claim -&gt; metric -&gt; source artifact map</CardTitle>
              <CardDescription>Every major claim is tied to a metric and a file path.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim</TableHead>
                    <TableHead>Metric</TableHead>
                    <TableHead>Source artifact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claimTraceRows.map((row) => (
                    <TableRow key={row.claim}>
                      <TableCell className="font-medium">{row.claim}</TableCell>
                      <TableCell>{row.metric}</TableCell>
                      <TableCell>
                        <Mono>{row.source}</Mono>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Slide 9 */}
      <Section
        id="slide-9"
        eyebrow="Slide 9"
        title="Primary Results Table (locked t* = 0.60)"
        subtitle="Two-model spotlight at locked t* = 0.60: Main LDA+SVM (subj-weights) vs Ablation LDA+SVM+RF (global)."
      >
        <Alert className="mb-4">
          <AlertTitle>Result interpretation</AlertTitle>
          <AlertDescription>
            At the same locked threshold, model choice changes the operating regime: subj-weights gives high coverage,
            while RF-global gives stronger confident-accuracy lift with lower coverage.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Main: LDA+SVM (subj-weights)</CardTitle>
              <CardDescription>High coverage operating mode.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-3">
              <Stat label="Best-single mean accuracy" value="0.628" />
              <Stat label="Ensemble confident accuracy" value="0.663" hint="Acted-on trials only" />
              <Stat label="Ensemble coverage" value="0.816" hint="81.6% committed-trial rate" />
              <Stat label="Delta (confident - best-single)" value="+0.035" />
              <Stat label="95% CI" value="[0.006, 0.064]" />
              <Stat label="Paired t-test p-value" value="0.024" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ablation: LDA+SVM+RF (global)</CardTitle>
              <CardDescription>Lower coverage, stronger confident-accuracy lift.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-3">
              <Stat label="Best-single mean accuracy" value="0.628" />
              <Stat label="Ensemble confident accuracy" value="0.784" hint="Acted-on trials only" />
              <Stat label="Ensemble coverage" value="0.464" hint="46.4% committed-trial rate" />
              <Stat label="Delta (confident - best-single)" value="+0.156" />
              <Stat label="95% CI" value="[0.102, 0.210]" />
              <Stat label="Paired t-test p-value" value="0.00016" />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Two-model tradeoff summary</CardTitle>
              <CardDescription>Same locked threshold, different model behavior (BCI IV 2a @ t* = 0.60).</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-right">LDA+SVM (subj-weights)</TableHead>
                    <TableHead className="text-right">LDA+SVM+RF (global)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["Best-single mean accuracy", "0.628", "0.628"],
                    ["Ensemble confident accuracy", "0.663", "0.784"],
                    ["Ensemble coverage", "0.816", "0.464"],
                    ["Delta (confident - best-single)", "+0.035", "+0.156"],
                    ["95% CI", "[0.006, 0.064]", "[0.102, 0.210]"],
                    ["Paired t-test p-value", "0.024", "0.00016"],
                  ].map(([m, v1, v2]) => (
                    <TableRow key={m}>
                      <TableCell className="font-medium">{m}</TableCell>
                      <TableCell className="text-right">
                        <Mono>{v1}</Mono>
                      </TableCell>
                      <TableCell className="text-right">
                        <Mono>{v2}</Mono>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All models at locked threshold (t* = 0.60)</CardTitle>
              <CardDescription>
                Inferential summary from <Mono>stats_tests_confident_vs_best.csv</Mono> for every primary model family.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>n</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Conf. Acc</TableHead>
                    <TableHead>Delta</TableHead>
                    <TableHead>95% CI</TableHead>
                    <TableHead>p-value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lockedThresholdModelStats.map((row) => (
                    <TableRow key={row.model}>
                      <TableCell className="font-medium">{row.model}</TableCell>
                      <TableCell>
                        <Mono>{row.n}</Mono>
                      </TableCell>
                      <TableCell>
                        <Mono>{row.coverage}</Mono>
                      </TableCell>
                      <TableCell>
                        <Mono>{row.confAcc}</Mono>
                      </TableCell>
                      <TableCell>
                        <Mono>{row.delta}</Mono>
                      </TableCell>
                      <TableCell>
                        <Mono>{row.ci}</Mono>
                      </TableCell>
                      <TableCell>
                        <Mono>{row.p}</Mono>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Confusion matrix insight</CardTitle>
              <CardDescription>Committed trials only (where the model acts).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <img
                src={confusionMatrixGlobal}
                alt="Confusion matrix for ensemble committed predictions on the primary dataset"
                className="w-full rounded-lg border bg-background"
              />
              <p className="text-sm text-muted-foreground">
                Confusion matrices identify which MI classes are most frequently confused during committed predictions,
                guiding targeted feature and controller refinements.
              </p>
              <div className="text-xs text-muted-foreground">
                Axes: x = predicted class, y = true class. Sample size: BCI IV 2a committed predictions across <Mono>n=9</Mono> subjects.
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Coverage + latency scope note</CardTitle>
              <CardDescription>
                Why dashboard coverage percentages can differ, and what latency this report includes.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                Coverage values differ when the metric or model changes. In this slide we use classifier coverage from{" "}
                <Mono>stats_tests_confident_vs_best.csv</Mono> for{" "}
                <Mono>Ablation: LDA+SVM+RF (global)</Mono> at <Mono>t* = 0.60</Mono> (<Mono>0.464</Mono>). Debounced-controller
                coverage uses a stricter FIRE/HOLD gate and is expected to be lower, and other ensemble variants can report
                different coverage at the same threshold.
              </p>
              <p>
                Reported latency is policy-compute latency only (software gate loop on saved probabilities). It does not include
                EEG acquisition, wireless transport, or actuator hardware delays. Hardware-in-loop latency remains a Phase 1 KPI.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Slide 10 */}
      <Section
        id="slide-10"
        eyebrow="Slide 10"
        title="Accuracy–Coverage Tradeoff (exploratory sweep)"
        subtitle="Sweep across {0.55, 0.60, 0.65, 0.70, 0.75} is exploratory; confirmatory inference stays at t* = 0.60."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Tradeoff curve (actual run output)</CardTitle>
              <CardDescription>Coverage vs confident accuracy across thresholds.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <img
                src={primaryTradeoffPlot}
                alt="Primary dataset accuracy-coverage tradeoff plot"
                className="w-full rounded-lg border bg-background"
              />
              <div className="text-xs text-muted-foreground">
                Locked operating point: <Mono>t* = 0.60</Mono> (confirmatory). Other thresholds are exploratory.
              </div>
              <div className="text-xs text-muted-foreground">
                Axes: x = coverage, y = confident accuracy. Sample size: BCI IV 2a, <Mono>n=9</Mono> subjects.
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>p-value curve (actual run output)</CardTitle>
              <CardDescription>Paired t-test p-value vs threshold for the primary dataset.</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={primaryPvaluePlot}
                alt="Primary dataset paired t-test p-value vs threshold"
                className="w-full rounded-lg border bg-background"
              />
              <div className="mt-3 text-xs text-muted-foreground">
                Axes: x = threshold, y = paired t-test p-value. Sample size: BCI IV 2a, <Mono>n=9</Mono> subjects.
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Slide 11 */}
      <Section
        id="slide-11"
        eyebrow="Slide 11"
        title="External Validation"
        subtitle="We apply the locked operating point t* = 0.60 to external datasets once. Any threshold sweeps on validation datasets are labeled exploratory."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>External validation summary</CardTitle>
              <CardDescription>Values displayed exactly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dataset</TableHead>
                    <TableHead>n</TableHead>
                    <TableHead>Delta</TableHead>
                    <TableHead>p</TableHead>
                    <TableHead>d</TableHead>
                    <TableHead>95% CI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">BNCI2014_001</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>
                      <Mono>+0.135</Mono>
                    </TableCell>
                    <TableCell>
                      <Mono>0.004</Mono>
                    </TableCell>
                    <TableCell>
                      <Mono>1.321</Mono>
                    </TableCell>
                    <TableCell>
                      <Mono>[0.057, 0.214]</Mono>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">PhysionetMI</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>
                      <Mono>-0.019</Mono>
                    </TableCell>
                    <TableCell>
                      <Mono>0.167</Mono>
                    </TableCell>
                    <TableCell>
                      <Mono>-0.475</Mono>
                    </TableCell>
                    <TableCell>
                      <Mono>[-0.047, 0.010]</Mono>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">IIIa</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>
                      <Mono>-0.033</Mono>
                    </TableCell>
                    <TableCell>
                      <Mono>0.183</Mono>
                    </TableCell>
                    <TableCell>
                      <Mono>-1.159</Mono>
                    </TableCell>
                    <TableCell>
                      <Mono>[-0.104, 0.038]</Mono>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Alert>
                <AlertTitle>Non-PhysioNet external results</AlertTitle>
                <AlertDescription>
                  BNCI2014_001 shows a strong signal at the locked threshold (<Mono>p = 0.004</Mono>). IIIa results are
                  also reported with an explicit p-value (<Mono>p = 0.183</Mono>), but remain underpowered (<Mono>n = 3</Mono>).
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertTitle>Evaluation boundary</AlertTitle>
                <AlertDescription>
                  External datasets receive one locked-threshold pass for confirmatory reporting. Any threshold sweeps on
                  validation datasets are labeled exploratory and are not used to retro-fit confirmatory claims.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertTitle>Limitation (dataset shift)</AlertTitle>
                <AlertDescription>Locked policy does not transfer equally across all datasets.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>External p-value plots (actual outputs)</CardTitle>
              <CardDescription>Locked-threshold context for BNCI2014_001.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <Mono>BNCI2014_001</Mono>
                </div>
                <img
                  src={bnciPvaluePlot}
                  alt="BNCI2014_001 paired t-test p-value vs threshold"
                  className="w-full rounded-lg border bg-background"
                />
                <div className="mt-2 text-xs text-muted-foreground">
                  Axes: x = threshold, y = paired t-test p-value. Sample size: BNCI2014_001, <Mono>n=10</Mono> subjects.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Slide 12 */}
      <Section
        id="slide-12"
        eyebrow="Slide 12"
        title="Novel Safety Layer"
        subtitle="Novel Element: Safety-Constrained Control Layer — Maximize safe-fire subject to wrong-fire ≤ alpha (alpha = 0.05)."
      >
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Why this is novel vs existing BCIs</CardTitle>
            <CardDescription>Rubric-ready comparison with explicit evidence.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Existing approach</TableHead>
                  <TableHead>Our approach</TableHead>
                  <TableHead>Proof</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {noveltyComparisonRows.map((row) => (
                  <TableRow key={row.existing}>
                    <TableCell>{row.existing}</TableCell>
                    <TableCell>{row.ours}</TableCell>
                    <TableCell>
                      <Mono>{row.proof}</Mono>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Model-agnostic wrapper (no retraining)</CardTitle>
              <CardDescription>Innovation is in the control policy, not just the classifier.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                We treat the classifier as a probabilistic signal generator. The safety layer wraps it to ensure the system
                favors HOLD over unsafe movement.
              </p>
              <div className="rounded-lg border p-3">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <Mono>Objective</Mono>
                </div>
                <div className="mt-2 text-foreground">
                  <Mono>Maximize safe-fire subject to wrong-fire ≤ α (α = 0.05).</Mono>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
                Why it’s useful
              </CardTitle>
              <CardDescription>Safety/stability are product constraints.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                A system that “knows when not to act” can be more deployable than one that is slightly more accurate but
                triggers unsafe actions.
              </p>
              <div className="rounded-lg border p-3">
                <div className="font-medium text-foreground">User/co-designer quote status</div>
                <div>No real interview quote has been collected yet. We will not fabricate quotes; this remains an open evidence task.</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Slide 13 */}
      <Section
        id="slide-13"
        eyebrow="Slide 13"
        title="Debounced Controller Metrics"
        subtitle="Controller metrics below are safety/control metrics (not classification accuracy)."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Controller concept</CardTitle>
              <CardDescription>Hysteresis + k-of-n confirmation + latch-while-firing.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium text-foreground">Hysteresis</span>: <Mono>t_on &gt; t_off</Mono>
                </li>
                <li>
                  <span className="font-medium text-foreground">k-of-n confirmation</span>: fires only if confidence is sustained
                </li>
                <li>
                  <span className="font-medium text-foreground">Latch-while-firing</span>: reduces rapid class flipping
                </li>
              </ul>
              <Alert>
                <AlertTitle>Labeling rule</AlertTitle>
                <AlertDescription>
                  Metrics are coverage, wrong-fire, safe-fire, toggle rate (controller metrics only).
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example settings (controller metrics only)</CardTitle>
              <CardDescription>Values displayed exactly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border p-4">
                <div className="text-sm font-semibold">LDA_SVM_baseline_subject_debounced</div>
                <div className="mt-2 text-sm text-muted-foreground grid grid-cols-2 gap-2">
                  <div>
                    <Mono>t_on=0.75</Mono>
                  </div>
                  <div>
                    <Mono>t_off=0.65</Mono>
                  </div>
                  <div>
                    <Mono>4-of-5</Mono>
                  </div>
                  <div>
                    <Mono>coverage=0.024</Mono>
                  </div>
                  <div>
                    <Mono>wrong=0.017</Mono>
                  </div>
                  <div>
                    <Mono>safe=0.006</Mono>
                  </div>
                  <div className="col-span-2">
                    <Mono>toggle=0.007</Mono>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border p-4">
                <div className="text-sm font-semibold">LDA_SVM_RF_global_debounced</div>
                <div className="mt-2 text-sm text-muted-foreground grid grid-cols-2 gap-2">
                  <div>
                    <Mono>t_on=0.60</Mono>
                  </div>
                  <div>
                    <Mono>t_off=0.50</Mono>
                  </div>
                  <div>
                    <Mono>4-of-5</Mono>
                  </div>
                  <div>
                    <Mono>coverage=0.039</Mono>
                  </div>
                  <div>
                    <Mono>wrong=0.028</Mono>
                  </div>
                  <div>
                    <Mono>safe=0.011</Mono>
                  </div>
                  <div className="col-span-2">
                    <Mono>toggle=0.009</Mono>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Slide 14 */}
      <Section
        id="slide-14"
        eyebrow="Slide 14"
        title="Human-Centered Design"
        subtitle="Clinician/user priorities: fewer unsafe activations, low fatigue, practical setup time, understandable behavior. Design decision: prefer HOLD over unsafe movement."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Human-centered priorities</CardTitle>
              <CardDescription>What “good” looks like in a rehab setting.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Fewer unsafe activations</strong> (safety first).</li>
                <li><strong>Low fatigue</strong> and predictable behavior.</li>
                <li><strong>Practical setup time</strong> and understandable failure modes.</li>
                <li>Policy preference: <strong>HOLD over unsafe movement</strong>.</li>
                <li>Benefit focus: people with <strong>Parkinson's disease, ALS, stroke, and spinal cord injury</strong> contexts.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equity + sustainability metrics</CardTitle>
              <CardDescription>Measured plan with pass/fail thresholds.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Threshold (pass/fail)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Subgroup wrong-fire disparity</TableCell>
                    <TableCell>
                      <Mono>|gap| &lt;= 0.02</Mono>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Subgroup safe-fire parity</TableCell>
                    <TableCell>
                      <Mono>|gap| &lt;= 0.05</Mono>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Low-resource access readiness</TableCell>
                    <TableCell>
                      Shared-device deployment available + setup guide published
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cost ceiling target</TableCell>
                    <TableCell>
                      Pilot station cost trend decreases each phase
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Scale responsibly roadmap (guardrails + governance)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li>Phase gate review before each scale step: safety, fairness, and reproducibility sign-off required.</li>
                <li>Publish per-site fairness and safety summary tables at each replication milestone.</li>
                <li>Maintain incident log for unsafe-fire events and threshold-policy updates.</li>
                <li>Require clinician-supervised operation during early deployment phases.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Slide 15 */}
      <Section
        id="slide-15"
        eyebrow="Slide 15"
        title="Commercial Viability + Deployment"
        subtitle="OpenBCI to Raspberry Pi to simulated/real actuator/FES loop, with phased pilot design, adoption barriers, and measurable KPIs."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardHeader>
              <CardTitle>Deployment model (who buys, runs, maintains)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Owner</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deploymentModelRows.map((row) => (
                    <TableRow key={row.role}>
                      <TableCell className="font-medium">{row.role}</TableCell>
                      <TableCell>{row.owner}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cost model</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cost category</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costRows.map((row) => (
                    <TableRow key={row.item}>
                      <TableCell className="font-medium">{row.item}</TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Deployment concept</CardTitle>
              <CardDescription>Feasible with existing tech, but current EEG hardware cost is a real adoption barrier.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="rounded-xl border bg-muted/40 p-3 sm:p-4">
                <img
                  src={signalFlowDiagram}
                  alt="M.I.N.D signal flow diagram showing EEG acquisition, model inference, and action pathways"
                  className="w-full h-auto rounded-lg border bg-background"
                />
              </div>
              <p>
                Commercial viability comes from a safety-first wrapper that can be applied across models and improved without
                requiring expensive retraining pipelines.
              </p>
              <div className="rounded-lg border p-3">
                Realization path: the core pipeline is buildable with existing components; the largest remaining step is
                robust, low-cost hardware integration at clinic reliability standards.
              </div>
              <div className="rounded-lg border p-3">
                Current hardware reality: OpenBCI Ganglion pricing substantially raises prototype cost. Our near-term path
                is supervised pilot deployment first, then cost-down through alternative EEG hardware evaluation and shared
                clinic infrastructure.
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Adoption risks + mitigations</CardTitle>
              <CardDescription>What could block deployment and what we do about it.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="rounded-lg border p-3">Barrier: <strong>hardware cost</strong> (especially EEG board). Mitigation: phased procurement, lower-cost board benchmarking, and clinic/shared-device rollout.</div>
              <div className="rounded-lg border p-3">Barrier: <strong>setup/calibration burden</strong>. Mitigation: standardized setup checklist and reproducible calibration script.</div>
              <div className="rounded-lg border p-3">Barrier: <strong>confidence-policy ambiguity</strong>. Mitigation: clinician co-design sessions for threshold policy.</div>
              <div className="rounded-lg border p-3">Barrier: <strong>domain shift</strong> in real settings. Mitigation: non-stationarity stress tests and conservative HOLD behavior.</div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Pilot pathway with measurable KPIs</CardTitle>
              <CardDescription>Concrete sequence from bench validation to replication.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Phase</TableHead>
                    <TableHead>Setting</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Primary KPI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pilotPlanRows.map((row) => (
                    <TableRow key={row.phase}>
                      <TableCell className="font-medium">{row.phase}</TableCell>
                      <TableCell>{row.setting}</TableCell>
                      <TableCell>{row.duration}</TableCell>
                      <TableCell>{row.kpi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Phase</TableHead>
                    <TableHead>Setup time</TableHead>
                    <TableHead>Failure target</TableHead>
                    <TableHead>Training time</TableHead>
                    <TableHead>Retention</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adoptionKpiRows.map((row) => (
                    <TableRow key={row.phase}>
                      <TableCell className="font-medium">{row.phase}</TableCell>
                      <TableCell>{row.setup}</TableCell>
                      <TableCell>{row.failure}</TableCell>
                      <TableCell>{row.training}</TableCell>
                      <TableCell>{row.retention}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Evidence links</CardTitle>
              <CardDescription>Transparent implementation artifacts.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>Dashboard and repository are supporting evidence for reproducibility and judge review.</p>
              <div className="flex flex-wrap gap-2">
                <ExternalPill label="Dashboard" url={LINKS.dashboard} />
                <ExternalPill label="GitHub Repo" url={LINKS.githubRepo} />
              </div>
              <div className="rounded-lg border p-3">Interest letters status: none received yet.</div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Dashboard Demo (Embedded)</CardTitle>
              <CardDescription>
                Embedded live view from <Mono>https://m-i-n-d-dashboard.vercel.app/</Mono>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border bg-muted/40 p-3 sm:p-4">
                <iframe
                  src={LINKS.dashboard}
                  title="M.I.N.D Dashboard Demo"
                  className="w-full h-[760px] rounded-lg border bg-background"
                  loading="lazy"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                If you cannot view the embedded Pygame module demo video properly (or embedding is blocked by browser/deployment headers),
                open the live dashboard directly:{" "}
                <a className="underline underline-offset-2" href={LINKS.dashboard} target="_blank" rel="noreferrer">
                  {LINKS.dashboard}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Slide 16 */}
      <Section
        id="slide-16"
        eyebrow="Slide 16"
        title="Limitations"
        subtitle="We state limitations explicitly to avoid overclaiming and to support scientific integrity."
      >
        <Card>
          <CardHeader>
            <CardTitle>Limitations</CardTitle>
          </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
            <ul className="list-disc pl-5 space-y-2">
              <li>No real patient trials yet (current results are from regulated benchmark datasets).</li>
              <li>No significant variance reduction at locked threshold <Mono>t* = 0.60</Mono>.</li>
              <li>What failed: Levene stability check at locked threshold was not significant (<Mono>p=0.568</Mono>), so we cannot claim meaningfully larger stability.</li>
              <li>Dataset shift in PhysionetMI reduces transfer performance under the locked policy.</li>
              <li>IIIa sample size is small (<Mono>n=3</Mono>), so tests are underpowered; effect sizes and CIs are emphasized.</li>
              <li>EEG remains vulnerable to noise sources (blinks, muscle activity, motion artifacts), constraining real-world robustness.</li>
            </ul>
          </CardContent>
        </Card>
      </Section>

      {/* Slide 17 */}
      <Section
        id="slide-17"
        eyebrow="Slide 17"
        title="Next Steps"
        subtitle="Concrete follow-ups to increase real-world readiness and fairness transparency."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Next steps</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li>Hardware-in-loop latency tests for real-time FIRE/HOLD behavior (OpenBCI to Raspberry Pi to actuator path).</li>
                <li>Non-stationarity stress testing to simulate real-life shifts in EEG behavior.</li>
                <li>Clinician and user feedback study to define acceptable confidence-threshold policy.</li>
                <li>Per-subject coverage and abstention reporting for fairness and benefit targeting.</li>
                <li>Low-cost deployment package: parts list, setup guide, and reduced compute pathway for clinics/researchers.</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Execution learnings (team operations)</CardTitle>
              <CardDescription>Milestone 3 process notes retained for final delivery quality.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <div className="rounded-lg border p-3">
                Time-zone-aware execution: split into two working blocks to reduce delays and keep ownership clear.
              </div>
              <div className="rounded-lg border p-3">
                Tooling: Git/GitHub for version control and reproducibility; Notion for task decomposition and dependency tracking.
              </div>
              <div className="rounded-lg border p-3">
                Collaboration rule: explicit task boundaries and handoff notes to avoid overlap and preserve momentum in a large team.
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Next-step external validation plan (no fabricated artifacts)</CardTitle>
              <CardDescription>Dated and owner-assigned plan replacing fake quotes/letters.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Step</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Target date</TableHead>
                    <TableHead>Evidence artifact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {externalValidationPlanRows.map((row) => (
                    <TableRow key={row.step}>
                      <TableCell className="font-medium">{row.step}</TableCell>
                      <TableCell>{row.owner}</TableCell>
                      <TableCell>
                        <Mono>{row.target}</Mono>
                      </TableCell>
                      <TableCell>{row.evidence}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Slide 18 */}
      <Section
        id="slide-18"
        eyebrow="Slide 18"
        title="Call to Action + Links"
        subtitle="Links below are current and verifiable. Missing evidence is explicitly logged rather than fabricated."
      >
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Judge summary (one-slide decision view)</CardTitle>
            <CardDescription>Problem, innovation, evidence, limits, and immediate ask.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Problem:</strong> unsafe false activations can make assistive BCI control clinically risky.</li>
              <li><strong>Innovation:</strong> model-agnostic safety-constrained debounced control layer on top of the LDA+SVM+RF ablation ensemble.</li>
              <li><strong>Evidence:</strong> at locked threshold, subj-weights provides high coverage (<Mono>0.816</Mono>) while RF-global provides stronger acted-on lift (delta <Mono>+0.156</Mono>, <Mono>p=0.00016</Mono>), with explicit kappa (<Mono>0.550</Mono>) and policy latency (<Mono>1.324 us/trial</Mono>).</li>
              <li><strong>Limit:</strong> mixed PhysionetMI transfer and no confirmed variance reduction at locked threshold.</li>
              <li><strong>Ask:</strong> support for hardware-in-loop pilot and clinician co-design to finalize deployment policy.</li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <BlackedOutPill label="Executive Summary" />
              <ExternalPill label="Combined Reflections" url={LINKS.reflectionsDoc} />
            </div>
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Final quality pass checklist</CardTitle>
            <CardDescription>Submission QC completed before export and rehearsal.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="list-disc pl-5 space-y-2">
              <li>No <Mono>Pending</Mono> / <Mono>TBD</Mono> placeholders remain in judge-facing slides.</li>
              <li>Each slide has one headline sentence (subtitle) and one core decision message.</li>
              <li>Charts include axis context and sample size references (<Mono>n</Mono> labels in captions/tables).</li>
              <li>Final PDF export route is available via Print / Save as PDF.</li>
              <li>Speaker transitions are scripted in Slide 19 for timed handoffs.</li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-primary" aria-hidden="true" />
                Submission links and evidence
              </CardTitle>
              <CardDescription>Dashboard is supporting evidence (not a substitute for required deliverables).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTitle>Access warning</AlertTitle>
                <AlertDescription>
                  Academy staff must have access permissions. Lack of access may impact final score.
                </AlertDescription>
              </Alert>

              <div className="grid gap-3">
                <div className="rounded-xl border p-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <Mono>Literature sources</Mono>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {LITERATURE_SOURCES.slice(0, 5).map((s) => (
                      <ExternalPill key={`lit-pill-${s.u}`} label={s.t} url={s.u} />
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border p-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <Mono>Data sources</Mono>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <ExternalPill label="BCI Competition IV" url={LINKS.bciCompetitionIV} />
                    <ExternalPill label="BCI Competition III" url={LINKS.bciCompetitionIII} />
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-300/80 bg-emerald-50/70 p-3 dark:border-emerald-700/80 dark:bg-emerald-950/20">
                  <div className="text-xs uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-300">
                    <Mono>Created by M.I.N.D.</Mono>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <ExternalPill label="GitHub Repo" url={LINKS.githubRepo} />
                    <ExternalPill label="Dashboard" url={LINKS.dashboard} />
                    <ExternalPill label="Hardware + Cost Breakdown Doc" url={LINKS.hardwareDoc} />
                    <ExternalPill label="Blender 3D Models (Drive Folder)" url={LINKS.blenderModels} />
                    <ExternalPill label="GitHub Organization" url={LINKS.githubOrg} />
                    <BlackedOutPill label="Executive Summary" />
                    <ExternalPill label="Combined Reflections" url={LINKS.reflectionsDoc} />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-muted/40 p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">Note</div>
                    <div className="text-sm text-muted-foreground">
                      This website is organized as Slides 1–19 for judge review.
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    <Mono>Milestone 4 package</Mono>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Print / export</CardTitle>
              <CardDescription>Print-friendly view for review and archiving.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>Tip: use your browser’s Print → “Save as PDF”.</p>
              <Button variant="outline" onClick={() => window.print()} className="gap-2">
                Print / Save as PDF
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Slide 19 */}
      <Section
        id="slide-19"
        eyebrow="Slide 19"
        title="30-Second Close"
        subtitle="Problem -> Innovation -> Evidence -> Ask"
      >
        <Card>
          <CardHeader>
            <CardTitle>Final verbal script (30 seconds)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <div className="rounded-lg border p-3">
              <span className="font-medium text-foreground">Problem:</span> In assistive BCI control, <strong>unsafe false activations</strong> can harm users and reduce trust.
            </div>
            <div className="rounded-lg border p-3">
              <span className="font-medium text-foreground">Innovation:</span> We add a <strong>model-agnostic safety-constrained debounced FIRE/HOLD layer</strong>, not just another classifier.
            </div>
            <div className="rounded-lg border p-3">
              <span className="font-medium text-foreground">Evidence:</span> At locked threshold, ablation model shows <strong><Mono>delta +0.156</Mono></strong> with <strong><Mono>p=0.00016</Mono></strong>; we also report failures transparently (stability variance not significant).
            </div>
            <div className="rounded-lg border p-3">
              <span className="font-medium text-foreground">Ask:</span> Support a supervised <strong>hardware-in-loop pilot</strong> and <strong>clinician co-design</strong> to finalize deployment policy and fairness safeguards.
            </div>
            <div className="rounded-lg border p-3">
              <span className="font-medium text-foreground">Speaker transitions (hard handoffs):</span> Intro speaker ends with
              {" "}
              <Mono>"I will hand to Methods."</Mono>, Methods speaker ends with <Mono>"Now to Results."</Mono>, Results speaker ends with
              {" "}
              <Mono>"Now to Viability and Ask."</Mono>, final speaker closes with <Mono>"Thank you, we are ready for questions."</Mono>.
            </div>
          </CardContent>
        </Card>
      </Section>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">M.I.N.D.</span> — Milestone 4 webpage (Slides 1–19).
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="gap-2">
                <Link href="/hero">
                  Back to top
                  <ArrowUpRight className="h-4 w-4 opacity-70" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
        </div>
      </div>

      {/* Print styling */}
      <style>{`
        @media print {
          @page {
            size: Letter portrait;
            margin: 0.35in;
          }

          html, body {
            font-size: 10.5px !important;
            line-height: 1.2 !important;
          }

          header { display: none !important; }
          button { display: none !important; }
          a { text-decoration: none !important; color: inherit !important; }
          section { break-inside: auto; page-break-inside: auto; }
          section > div { padding-top: 10px !important; padding-bottom: 10px !important; }
          h1 { font-size: 1.9rem !important; line-height: 1.15 !important; }
          h2 { font-size: 1.35rem !important; line-height: 1.15 !important; }
          h3, h4 { font-size: 1.05rem !important; line-height: 1.15 !important; }
          p, li, td, th { line-height: 1.2 !important; }
          .p-3, .p-4, .p-5 { padding: 0.45rem !important; }
          .mt-4, .mt-5, .mt-6, .mt-8 { margin-top: 0.45rem !important; }
          img { max-height: 240px !important; width: auto !important; object-fit: contain !important; }
          table { font-size: 0.9em !important; }
          #hero > .absolute { display: none !important; }
          .scroll-mt-24 { scroll-margin-top: 0 !important; }
        }
      `}</style>
    </div>
  );
}
