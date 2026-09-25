"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { type FacilitatorCodeRecord } from "@/lib/facilitator-codes";

export default function AdminCodesPage() {
  const [codes, setCodes] = useState<FacilitatorCodeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const [schoolName, setSchoolName] = useState("");
  const [facilitatorName, setFacilitatorName] = useState("");
  const [count, setCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentGenerated, setRecentGenerated] = useState<FacilitatorCodeRecord[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  async function fetchCodes() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/codes");
      const data = await res.json();
      if (data.codes) {
        setCodes(data.codes);
      }
    } catch (err) {
      console.error("Failed to load codes:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCodes();
  }, []);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setGenerating(true);
    try {
      const res = await fetch("/api/admin/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school_name: schoolName,
          facilitator_name: facilitatorName,
          count,
        }),
      });
      const data = await res.json();
      if (data.codes) {
        setRecentGenerated(data.codes);
        setCodes((prev) => [...data.codes, ...prev]);
        setSchoolName("");
        setFacilitatorName("");
        setCount(1);
      }
    } catch (err) {
      console.error("Failed to generate codes:", err);
    } finally {
      setGenerating(false);
    }
  }

  const filteredCodes = useMemo(() => {
    if (!searchQuery.trim()) return codes;
    const q = searchQuery.toLowerCase().trim();
    return codes.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        (c.school_name && c.school_name.toLowerCase().includes(q)) ||
        (c.facilitator_name && c.facilitator_name.toLowerCase().includes(q))
    );
  }, [codes, searchQuery]);

  function getShareLink(code: string, school?: string | null) {
    if (typeof window === "undefined") return `/entry?school=${code}`;
    const base = window.location.origin;
    const params = new URLSearchParams();
    params.set("school", code);
    if (school) params.set("name", school);
    return `${base}/entry?${params.toString()}`;
  }

  async function handleCopy(text: string, identifier: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(identifier);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }

  return (
    <main className="flex flex-1 flex-col bg-surface-tint px-lg py-xl">
      <div className="flex flex-col gap-xl max-w-[720px] w-full mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-xs">
            <span className="type-caption text-muted uppercase tracking-wider">
              Internal Admin
            </span>
            <h1 className="type-display-lg text-main">Facilitator Code Generator</h1>
          </div>
          <Link href="/" className="type-caption text-explore hover:underline">
            ← Back to App
          </Link>
        </div>

        <p className="type-body text-muted">
          Generates 6-character facilitator codes excluding ambiguous characters (0, O, 1, I, l).
          Distribute these codes or links to schools; students entering them will automatically have their sessions linked via <code className="text-main font-mono">school_code</code>.
        </p>

        {/* Generator Form */}
        <form
          onSubmit={handleGenerate}
          className="rounded-lg border border-explore-border bg-surface-base p-lg flex flex-col gap-md"
        >
          <h2 className="type-h2 text-main">Generate New Facilitator Code</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="type-caption text-muted font-semibold">
                School Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. King's College Lagos"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="type-body px-md py-sm rounded-lg border border-explore-border bg-surface-base text-main"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="type-caption text-muted font-semibold">
                Facilitator Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Mrs. Adeyemi"
                value={facilitatorName}
                onChange={(e) => setFacilitatorName(e.target.value)}
                className="type-body px-md py-sm rounded-lg border border-explore-border bg-surface-base text-main"
              />
            </div>
          </div>

          <div className="flex items-center gap-md">
            <div className="flex items-center gap-xs">
              <label className="type-caption text-muted font-semibold">
                Count:
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={count}
                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="type-body w-20 px-sm py-xs rounded-lg border border-explore-border bg-surface-base text-main text-center"
              />
            </div>

            <button
              type="submit"
              disabled={generating}
              className="type-body font-semibold px-lg py-sm rounded-lg bg-explore text-surface-base hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {generating ? "Generating..." : count > 1 ? `Generate ${count} Codes` : "Generate Code"}
            </button>
          </div>
        </form>

        {/* Recently Generated Banner */}
        {recentGenerated.length > 0 && (
          <div className="rounded-lg border border-green-300 bg-green-50 p-lg flex flex-col gap-sm">
            <span className="type-caption text-green-700 font-semibold uppercase tracking-wider">
              Newly Generated Code{recentGenerated.length > 1 ? "s" : ""}
            </span>
            <div className="flex flex-col gap-sm">
              {recentGenerated.map((r) => {
                const link = getShareLink(r.code, r.school_name);
                return (
                  <div
                    key={r.code}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-sm bg-white p-md rounded-md border border-green-200"
                  >
                    <div>
                      <span className="type-h2 font-mono font-bold text-main tracking-widest mr-md">
                        {r.code}
                      </span>
                      {r.school_name && (
                        <span className="type-caption text-muted">({r.school_name})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-xs">
                      <button
                        type="button"
                        onClick={() => handleCopy(r.code, `code-${r.code}`)}
                        className="type-caption px-md py-xs rounded border border-gray-300 hover:bg-gray-50"
                      >
                        {copiedCode === `code-${r.code}` ? "Copied code!" : "Copy code"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(link, `link-${r.code}`)}
                        className="type-caption px-md py-xs rounded bg-explore text-white hover:opacity-90"
                      >
                        {copiedCode === `link-${r.code}` ? "Copied link!" : "Copy Entry Link"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stored Codes List */}
        <div className="rounded-lg border border-explore-border bg-surface-base p-lg flex flex-col gap-md">
          <div className="flex items-center justify-between">
            <h2 className="type-h2 text-main">
              All Stored Codes ({codes.length})
            </h2>
            <button
              type="button"
              onClick={fetchCodes}
              className="type-caption text-muted hover:text-main"
            >
              ↻ Refresh
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by code or school name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="type-body px-md py-sm rounded-lg border border-explore-border bg-surface-base text-main"
          />

          {loading ? (
            <p className="type-body text-muted">Loading stored codes...</p>
          ) : filteredCodes.length === 0 ? (
            <p className="type-body text-muted">No codes match the search.</p>
          ) : (
            <div className="divide-y divide-[var(--border-subtle)]">
              {filteredCodes.map((r) => {
                const link = getShareLink(r.code, r.school_name);
                return (
                  <div
                    key={r.code}
                    className="py-sm flex flex-col sm:flex-row sm:items-center justify-between gap-sm"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-sm">
                        <span className="font-mono font-bold text-main tracking-wider">
                          {r.code}
                        </span>
                        {r.school_name && (
                          <span className="type-body font-medium text-main">
                            {r.school_name}
                          </span>
                        )}
                      </div>
                      <span className="type-caption text-muted">
                        {r.facilitator_name ? `Facilitator: ${r.facilitator_name} · ` : ""}
                        Created {new Date(r.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-xs">
                      <button
                        type="button"
                        onClick={() => handleCopy(r.code, `code-${r.code}`)}
                        className="type-caption px-sm py-xs rounded border border-explore-border hover:bg-surface-tint"
                      >
                        {copiedCode === `code-${r.code}` ? "Copied!" : "Code"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(link, `link-${r.code}`)}
                        className="type-caption px-sm py-xs rounded bg-surface-tint text-explore border border-explore-border hover:bg-explore hover:text-white"
                      >
                        {copiedCode === `link-${r.code}` ? "Copied link!" : "Copy Entry Link"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

