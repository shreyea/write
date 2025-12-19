import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-center">
        <Loader2 size={48} className="text-[#A5B4FC] animate-spin mx-auto mb-4" />
        <p className="text-[#EADEE7]/60">Loading profile...</p>
      </div>
    </div>
  );
}
