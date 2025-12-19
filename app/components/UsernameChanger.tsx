"use client";

import { setUsername } from "@/actions/username";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, AlertTriangle, Rocket, Edit3 } from "lucide-react";

export default function UsernameChanger({ 
  currentUsername, 
  hasChanged 
}: { 
  currentUsername: string;
  hasChanged: boolean;
}) {
  const router = useRouter();
  const [username, setUsernameState] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError("Username can only contain letters, numbers, and underscores");
      return;
    }

    setLoading(true);

    try {
      await setUsername(username);
      router.refresh();
      router.push(`/profile/${username}`);
    } catch (err: any) {
      setError(err.message || "Failed to update username");
    } finally {
      setLoading(false);
    }
  }

  if (hasChanged) {
    return (
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <Check size={24} className="text-green-400" /> Username
        </h2>
        <div className="text-white/70">
          Current username: <span className="text-white font-semibold text-lg">@{currentUsername}</span>
        </div>
        <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <p className="text-sm text-green-200 flex items-center gap-2">
            <Check size={16} /> You have already changed your username. No further changes are allowed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <Edit3 size={24} /> Change Username
      </h2>
      <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-2xl p-4 mb-6">
        <p className="text-sm text-yellow-100 flex items-center gap-2">
          <AlertTriangle size={16} /> <strong>Warning:</strong> You can only change your username once. Choose carefully!
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-white/70 font-medium mb-2">
            New Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsernameState(e.target.value)}
            placeholder={currentUsername}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none text-white placeholder-white/40 focus:border-purple-500/50 transition-all"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-3 text-red-200 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? "Updating..." : <><Rocket size={20} /> Update Username</>}
        </button>
      </form>
    </div>
  );
}
