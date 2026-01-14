import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface ValidationResultProps {
  fileName: string;
  isValid: boolean;
  hasUnderscores: boolean;
  breakdown: {
    project: string;
    originator: string;
    volume: string;
    level: string;
    type: string;
    role: string;
    number: string;
    status: string;
    extension: string;
  } | null;
}

const ValidationResult = ({
  fileName,
  isValid,
  hasUnderscores,
  breakdown,
}: ValidationResultProps) => {
  const fieldLabels: Record<string, string> = {
    project: "Projekt",
    originator: "Koostaja",
    volume: "Maht",
    level: "Korrus",
    type: "Tüüp",
    role: "Roll",
    number: "Number",
    status: "Staatus",
    extension: "Laiend",
  };

  return (
    <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Result Header */}
      <div
        className={`
        flex flex-col items-center justify-center p-10 rounded-xl mb-4
        ${isValid ? "bg-[hsl(142_71%_95%)]" : "bg-destructive/10"}
      `}
      >
        {isValid ? (
          <CheckCircle2 className="w-24 h-24 text-[hsl(142_71%_45%)] mb-4" />
        ) : (
          <XCircle className="w-24 h-24 text-destructive mb-4" />
        )}

        <h2
          className={`text-2xl font-bold ${
            isValid ? "text-[hsl(142_71%_35%)]" : "text-destructive"
          }`}
        >
          {isValid ? "Korrektne failinimi!" : "Vigane failinimi!"}
        </h2>

        <p className="mt-3 text-sm text-muted-foreground font-mono break-all text-center px-4">
          {fileName}
        </p>
      </div>

      {/* Underscore Warning */}
      {hasUnderscores && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-[hsl(45_93%_95%)] border border-[hsl(45_93%_70%)] mb-4">
          <AlertTriangle className="w-5 h-5 text-[hsl(45_93%_40%)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[hsl(45_93%_25%)]">
            Palun kasuta eraldajana sidekriipsu (-), mitte alakriipsu.
          </p>
        </div>
      )}

      {/* Breakdown Table */}
      {isValid && breakdown && (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Failinime osad</h3>
          </div>
          <div className="divide-y divide-border">
            {Object.entries(breakdown).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between px-6 py-3 hover:bg-accent/30 transition-colors"
              >
                <span className="text-muted-foreground text-sm">
                  {fieldLabels[key]}
                </span>
                <span className="font-mono font-medium text-foreground">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invalid Help */}
      {!isValid && !hasUnderscores && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-3">Õige formaat:</h3>
          <p className="text-sm text-muted-foreground font-mono mb-4">
            Projekt-Koostaja-Maht-Korrus-Tüüp-Roll-Number-Staatus.laiend
          </p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              <strong>Näide:</strong> RKAS2301-RIOS-ZZ-00-M3-A-0001-WIP.rvt
            </p>
            <p>
              <strong>Tüüp:</strong> M3, DR, või SP
            </p>
            <p>
              <strong>Staatus:</strong> WIP, S0, S1, S2, A, või P01-P99
            </p>
            <p>
              <strong>Laiend:</strong> .rvt, .ifc, või .rfa
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationResult;
