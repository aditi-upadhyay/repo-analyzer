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
        <div className="w-full max-w-md p-6 bg-red-50 border border-red-100 rounded-3xl space-y-4 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-3 text-red-600">
            <span className="material-symbols-outlined font-bold">error</span>
            <span className="font-bold">Error during analysis</span>
          </div>
          <p className="text-sm text-red-800 leading-relaxed font-medium">
            {error}
          </p>
          <div className="pt-2">
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-600/20"
            >
              Back to Dashboard
              <span className="material-symbols-outlined text-lg">dashboard</span>
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
