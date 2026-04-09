import React, { useEffect, useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";

interface AnalysisStepProps {
  label: string;
  status: "completed" | "running" | "pending";
  time?: string;
}

const AnalysisStep = ({ label, status, time }: AnalysisStepProps) => {
  const getIcon = () => {
    switch (status) {
      case "completed":
        return (
          <span className="material-symbols-outlined text-green-500 font-bold">
            check_circle
          </span>
        );
      case "running":
        return (
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-blue-secondary font-bold animate-pulse">
              radio_button_checked
            </span>
            <div className="absolute size-4 rounded-full border-2 border-blue-secondary/30 animate-ping"></div>
          </div>
        );
      default:
        return (
          <span className="material-symbols-outlined text-slate-200 font-bold">
            radio_button_unchecked
          </span>
        );
    }
  };

  return (
    <div
      className={`flex items-center justify-between py-3 ${status === "pending" ? "opacity-50" : "opacity-100"
        }`}
    >
      <div className="flex items-center gap-4">
        <div className="size-6 flex items-center justify-center">
          {getIcon()}
        </div>
        <span
          className={`text-sm font-bold ${status === "completed"
            ? "text-slate-700"
            : status === "running"
              ? "text-slate-900"
              : "text-slate-400"
            }`}
        >
          {label}
        </span>
      </div>
      <span
        className={`text-xs font-bold font-mono ${status === "running"
          ? "text-blue-secondary animate-pulse"
          : "text-slate-400"
          }`}
      >
        {status === "running" ? "running..." : time || "—"}
      </span>
    </div>
  );
};

const AnalysisProgress: React.FC = () => {
  const STEPS = [
    { key: "CLONING", label: "Cloning repository" },
    { key: "SCANNING", label: "Scanning JS/JSX files" },
    { key: "EXTRACTING", label: "Extracting functions" },
    { key: "AI", label: "Sending context to AI" },
    { key: "GENERATING", label: "Generating documentation" },
    { key: "GENERATED", label: "Documentation generated successfully" },
  ];

  const location = useLocation();
  const sessionId = location.state?.sessionId;

  const { messages } = useSocket(sessionId || "");

  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;

    if (lastMessage.startsWith("ERROR:")) {
      setError(lastMessage.replace("ERROR:", "").trim());
      return;
    }

    const stepKey = lastMessage.split(":")[0];

    const index = STEPS.findIndex((step) => step.key === stepKey);

    if (index !== -1) {
      if (stepKey === "GENERATED") {
        setCurrentStep(STEPS.length);
      } else {
        setCurrentStep(index);
      }
    }
  }, [messages]);

  const progress = useMemo(() => {
    return Math.round(((currentStep + 1) / STEPS.length) * 100);
  }, [currentStep]);

  if (!sessionId) {
    return <div>No session found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 max-w-2xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900">
          {error ? "Analysis Failed" : "Analyzing your repository"}
        </h2>
        <p className="text-slate-500">
          {error ? "We encountered an issue during the analysis" : "AI is scanning files and generating documentation"}
        </p>
      </div>

      {error ? (
        <div className="w-full max-w-xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="size-20 bg-red-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl shadow-red-500/10">
              <span className="material-symbols-outlined text-red-500 text-4xl font-black">
                priority_high
              </span>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                Analysis failed
              </h2>
              <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                The AI model is experiencing high demand. Your repository is safe — this is a temporary issue.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50">
            <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-slate-900">Error details</span>
              </div>
              <span className="text-[10px] font-black font-mono text-slate-400 tracking-widest uppercase">
                {error.includes("high demand") ? "ERR_MODEL_OVERLOADED" : "ERR_ANALYSIS_FAILED"}
              </span>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400">Triggered at</span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400">Repository</span>
                <span className="text-sm font-bold text-slate-900">
                  {location.state?.repoName || "unknown-repo"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-400">Status</span>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100/50 rounded-full text-red-600">
                  <div className="size-1.5 bg-red-600 rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Failed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/50 border border-amber-100 p-6 rounded-3xl flex gap-4 items-start">
            <div className="size-10 bg-amber-100/50 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0 border border-amber-200/50">
              <span className="material-symbols-outlined text-xl">warning</span>
            </div>
            <div>
              <p className="text-sm text-amber-900/80 font-bold leading-relaxed">
                Queue times are elevated right now. Retrying usually resolves this within a minute or two.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all border border-slate-200/50"
            >
              <span className="material-symbols-outlined text-lg">refresh</span>
              Retry analysis
            </button>
            <Link
              to="/dashboard"
              className="flex-1 py-4 bg-blue-secondary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-primary transition-all shadow-xl shadow-blue-600/20"
            >
              Back to dashboard
              <span className="material-symbols-outlined text-lg">arrow_outward</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full max-w-md space-y-4">
            <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-secondary transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-end">
              <span className="text-xs font-bold text-slate-400">{progress}%</span>
            </div>
          </div>

          <div className="w-full max-w-md divide-y divide-slate-50">
            {STEPS.map((step, index) => {
              let status: "completed" | "running" | "pending" = "pending";

              if (index < currentStep) status = "completed";
              else if (index === currentStep) status = "running";

              if (currentStep === STEPS.length && index < STEPS.length) {
                status = "completed";
              }

              return (
                <AnalysisStep key={step.key} label={step.label} status={status} />
              );
            })}
          </div>
        </>
      )}

      {currentStep >= STEPS.length && !error && (
        <div className="w-full max-w-md flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Link
            to="/documentation"
            className="w-full py-4 bg-blue-secondary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-primary transition-all shadow-xl shadow-blue-600/20"
          >
            View Documentation
            <span className="material-symbols-outlined text-lg">
              description
            </span>
          </Link>
          <Link
            to="/dashboard"
            className="w-full py-4 text-slate-500 font-bold flex items-center justify-center gap-2 hover:text-slate-700 transition-all border border-slate-200 rounded-2xl"
          >
            Back to Dashboard
            <span className="material-symbols-outlined text-lg">dashboard</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AnalysisProgress;
