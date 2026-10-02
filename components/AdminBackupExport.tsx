"use client";

import { useState } from "react";

import { adminStorageKeys } from "@/data/adminContent";
import { pageContentStorageKey, seoStorageKey } from "@/data/pageContent";

const adminStoragePrefix = "winspiration.admin.";
const imageCropPresetsStorageKey = "winspiration.admin.imageCropPresets";

const expectedAdminStorageKeys = Array.from(
  new Set([
    ...Object.values(adminStorageKeys),
    pageContentStorageKey,
    seoStorageKey,
    imageCropPresetsStorageKey,
  ]),
).sort();

type BackupEntry = {
  storageKey: string;
  present: boolean;
  rawValue: string | null;
  parsedValue?: unknown;
  parseError?: string;
};

function buildBackupEntry(storageKey: string): BackupEntry {
  const rawValue = window.localStorage.getItem(storageKey);

  if (rawValue === null) {
    return { storageKey, present: false, rawValue: null };
  }

  try {
    return {
      storageKey,
      present: true,
      rawValue,
      parsedValue: JSON.parse(rawValue),
    };
  } catch (error) {
    return {
      storageKey,
      present: true,
      rawValue,
      parseError:
        error instanceof Error ? error.message : "Value is not valid JSON.",
    };
  }
}

export function AdminBackupExport() {
  const [message, setMessage] = useState("");

  const exportAdminBackup = () => {
    const discoveredKeys = Array.from(
      { length: window.localStorage.length },
      (_, index) => window.localStorage.key(index),
    ).filter(
      (storageKey): storageKey is string =>
        typeof storageKey === "string" &&
        storageKey.startsWith(adminStoragePrefix),
    );
    const storageKeys = Array.from(
      new Set([...expectedAdminStorageKeys, ...discoveredKeys]),
    ).sort();
    const entries = storageKeys.map(buildBackupEntry);
    const exportedAt = new Date().toISOString();
    const backup = {
      backupType: "winspiration-admin-localstorage",
      schemaVersion: 1,
      exportedAt,
      storagePrefix: adminStoragePrefix,
      expectedStorageKeys: expectedAdminStorageKeys,
      presentEntryCount: entries.filter((entry) => entry.present).length,
      entries,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const downloadUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    const fileTimestamp = exportedAt.replace(/[:.]/g, "-");

    downloadLink.href = downloadUrl;
    downloadLink.download = `winspiration-admin-backup-${fileTimestamp}.json`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(downloadUrl);

    setMessage(
      `Downloaded ${backup.presentEntryCount} saved Admin entr${
        backup.presentEntryCount === 1 ? "y" : "ies"
      }.`,
    );
    window.setTimeout(() => setMessage(""), 5000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {message ? (
        <p className="text-sm leading-7 text-gold/85" role="status">
          {message}
        </p>
      ) : null}
      <button
        type="button"
        onClick={exportAdminBackup}
        className="border border-gold/50 px-4 py-3 text-xs uppercase tracking-[0.18em] text-ivory transition hover:bg-gold hover:text-espresso"
      >
        Export Admin Backup
      </button>
    </div>
  );
}
