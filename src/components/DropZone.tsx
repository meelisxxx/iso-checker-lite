import { useState, useCallback } from "react";
import { Upload, FileText } from "lucide-react";

interface DropZoneProps {
  onFileSelect: (fileName: string) => void;
}

const DropZone = ({ onFileSelect }: DropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        onFileSelect(files[0].name);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileSelect(files[0].name);
      }
    },
    [onFileSelect]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative flex flex-col items-center justify-center
        w-full max-w-2xl min-h-[280px] p-12
        border-2 border-dashed rounded-xl
        transition-all duration-300 ease-in-out
        cursor-pointer group
        ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-accent/50"
        }
      `}
    >
      <input
        type="file"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept=".rvt,.ifc,.rfa"
      />

      <div
        className={`
        flex items-center justify-center w-20 h-20 rounded-full mb-6
        transition-all duration-300
        ${isDragging ? "bg-primary/20" : "bg-muted/30 group-hover:bg-primary/10"}
      `}
      >
        {isDragging ? (
          <FileText className="w-10 h-10 text-primary" />
        ) : (
          <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </div>

      <h3 className="text-xl font-semibold text-foreground mb-2">
        {isDragging ? "Lase fail siia!" : "Lohista fail siia"}
      </h3>

      <p className="text-muted-foreground text-sm">
        või kliki faili valimiseks
      </p>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/20 rounded">
          .rvt
        </span>
        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/20 rounded">
          .ifc
        </span>
        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/20 rounded">
          .rfa
        </span>
      </div>
    </div>
  );
};

export default DropZone;
