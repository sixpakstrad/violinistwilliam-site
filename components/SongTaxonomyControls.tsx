"use client";

import { useEffect, useState, type FormEvent } from "react";
import { validateTaxonomyName, type SongTaxonomy, type SongTaxonomyKind } from "@/data/songTaxonomy";

type TaxonomyResponse = { taxonomy?: SongTaxonomy; error?: string };

export function SongTaxonomyControls({ onChange }: { onChange: (taxonomy: SongTaxonomy) => void }) {
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(false);
  const [kind, setKind] = useState<SongTaxonomyKind | null>(null);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    async function load() {
      try {
        const response = await fetch("/api/admin/song-taxonomy", { cache: "no-store" });
        const data = await response.json() as TaxonomyResponse;
        if (!response.ok || !data.taxonomy) throw new Error(data.error || "Unable to load genres and collections.");
        if (!mounted) return;
        onChange(data.taxonomy);
        setConfigured(data.taxonomy.configured);
        setStatus(data.taxonomy.configured ? "" : "Genres and collections need their one-time Supabase setup (Docs/supabase-song-taxonomy.sql).");
      } catch (error) {
        if (mounted) {
          setConfigured(false);
          setError(error instanceof Error ? error.message : "Unable to load genres and collections.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void load();
    return () => { mounted = false; };
  }, [onChange, reloadKey]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!kind || saving) return;
    const validationError = validateTaxonomyName(name);
    if (validationError) { setError(validationError); return; }
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const response = await fetch("/api/admin/song-taxonomy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, name }),
      });
      const data = await response.json() as TaxonomyResponse;
      if (!response.ok || !data.taxonomy) throw new Error(data.error || `Unable to add the ${kind}.`);
      onChange(data.taxonomy);
      setStatus(`Added ${kind} "${name.trim()}".`);
      setKind(null);
      setName("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to save. Please retry.");
    } finally {
      setSaving(false);
    }
  }

  const buttonClass = "border border-gold/35 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory-muted transition hover:border-gold hover:text-ivory disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="min-w-0 border-t border-ivory/10 pt-4 lg:col-span-2">
      <div className="flex flex-wrap items-center gap-2" aria-busy={loading || saving}>
        {(["genre", "collection"] as const).map((option) => (
          <button key={option} type="button" disabled={loading || !configured || saving} className={buttonClass}
            onClick={() => { setKind(option); setName(""); setError(""); setStatus(""); }}>
            Add {option === "genre" ? "Genre" : "Collection"}
          </button>
        ))}
        {!loading && !configured ? (
          <button type="button" className={buttonClass} onClick={() => setReloadKey((key) => key + 1)}>Retry</button>
        ) : null}
        {loading ? <p role="status" className="text-sm text-ivory-muted">Loading genres and collections...</p> : null}
      </div>
      {kind ? (
        <form onSubmit={save} className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:items-end">
          <label className="block min-w-0 flex-1 sm:max-w-sm" htmlFor="new-song-taxonomy-name">
            <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-gold/80">{kind === "genre" ? "Genre" : "Collection"} name</span>
            <input id="new-song-taxonomy-name" autoFocus required maxLength={60} value={name} disabled={saving}
              onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? "song-taxonomy-error" : undefined}
              className="min-h-11 w-full border border-ivory/10 bg-espresso/45 px-3 text-ivory outline-none focus:border-gold/70" />
          </label>
          <button type="submit" disabled={saving} className={buttonClass}>{saving ? "Saving..." : kind === "genre" ? "Save Genre" : "Save Collection"}</button>
          <button type="button" disabled={saving} className={buttonClass} onClick={() => { setKind(null); setError(""); }}>Cancel</button>
        </form>
      ) : null}
      {error ? <p id="song-taxonomy-error" role="alert" className="mt-3 text-sm text-red-700">{error}</p> : null}
      {status ? <p role="status" className="mt-3 break-words text-sm text-ivory-muted">{status}</p> : null}
    </div>
  );
}
