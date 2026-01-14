import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";
import ValidationResult from "@/components/ValidationResult";
import { RotateCcw } from "lucide-react";

// ISO 19650 / RKAS naming pattern
const FILE_NAME_REGEX =
  /^[A-Z0-9]+-[A-Z]{2,4}-[A-Z0-9]{2}-[A-Z0-9]{2,3}-(M3|DR|SP)-[A-Z]{1}-\d{4}-(WIP|S[0-2]|A|P\d{2})\.(rvt|ifc|rfa)$/;

interface BreakdownType {
  project: string;
  originator: string;
  volume: string;
  level: string;
  type: string;
  role: string;
  number: string;
  status: string;
  extension: string;
}

const Index = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [hasUnderscores, setHasUnderscores] = useState(false);
  const [breakdown, setBreakdown] = useState<BreakdownType | null>(null);

  const validateFileName = useCallback((name: string) => {
    setFileName(name);

    // Check for underscores
    const containsUnderscores = name.includes("_");
    setHasUnderscores(containsUnderscores);

    // Validate against regex
    const valid = FILE_NAME_REGEX.test(name);
    setIsValid(valid);

    if (valid) {
      // Parse the filename into parts
      const withoutExtension = name.substring(0, name.lastIndexOf("."));
      const extension = name.substring(name.lastIndexOf(".") + 1);
      const parts = withoutExtension.split("-");

      setBreakdown({
        project: parts[0],
        originator: parts[1],
        volume: parts[2],
        level: parts[3],
        type: parts[4],
        role: parts[5],
        number: parts[6],
        status: parts[7],
        extension: `.${extension}`,
      });
    } else {
      setBreakdown(null);
    }
  }, []);

  const handleReset = useCallback(() => {
    setFileName(null);
    setIsValid(false);
    setHasUnderscores(false);
    setBreakdown(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          BIM Failinime Validaator
        </h1>
        <p className="text-muted-foreground">
          ISO 19650 / RKAS standardi kohane failinimede kontroll
        </p>
      </div>

      {/* Main Content */}
      {!fileName ? (
        <DropZone onFileSelect={validateFileName} />
      ) : (
        <div className="flex flex-col items-center">
          <ValidationResult
            fileName={fileName}
            isValid={isValid}
            hasUnderscores={hasUnderscores}
            breakdown={breakdown}
          />

          <button
            onClick={handleReset}
            className="mt-8 flex items-center gap-2 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
          >
            <RotateCcw className="w-4 h-4" />
            Kontrolli uut faili
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-12 text-center">
        <p className="text-xs text-muted-foreground">
          Toetab .rvt, .ifc ja .rfa faililaiendeid
        </p>
      </div>
    </div>
  );
};

export default Index;
