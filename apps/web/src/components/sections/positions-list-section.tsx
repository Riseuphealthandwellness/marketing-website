"use client";

import { useState, useMemo } from "react";
import { ArrowRight, Briefcase, MapPin, Search } from "lucide-react";

import type { Position } from "@/lib/cms/types";

const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  prn: "PRN",
};

const selectClass =
  "h-10 rounded-lg border border-border bg-white px-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-action/40 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_0.6rem_center]";

type Props = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  emptyStateText?: string;
  positions: Position[];
};

export function PositionsListSection({ eyebrow, heading, description, emptyStateText, positions }: Props) {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const departments = useMemo(
    () => [...new Set(positions.map((p) => p.department).filter(Boolean) as string[])].sort(),
    [positions],
  );
  const types = useMemo(
    () => [...new Set(positions.map((p) => p.employmentType).filter(Boolean) as string[])].sort(),
    [positions],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return positions.filter((p) => {
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.department?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q);
      const matchesDept = !selectedDept || p.department === selectedDept;
      const matchesType = !selectedType || p.employmentType === selectedType;
      return matchesSearch && matchesDept && matchesType;
    });
  }, [positions, search, selectedDept, selectedType]);

  function clearAll() {
    setSearch("");
    setSelectedDept("");
    setSelectedType("");
  }

  const noPositions = positions.length === 0;
  const noResults = !noPositions && filtered.length === 0;

  return (
    <div>
      {eyebrow || heading || description ? (
        <div className="mb-8">
          {eyebrow ? (
            <p className="flex items-center gap-2.5 font-heading text-xs font-black uppercase tracking-widest text-brand-warm-accent sm:text-sm">
              <span className="h-px w-7 bg-brand-warm-accent" aria-hidden="true" />
              {eyebrow}
            </p>
          ) : null}
          {heading ? (
            <h2
              className={`font-heading text-2xl font-black tracking-normal text-foreground sm:text-3xl${eyebrow ? " mt-2" : ""}`}
            >
              {heading}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}

      {/* Search + inline filter dropdowns — always visible */}
      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-0 flex-1">
          <Search
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search positions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={noPositions}
            className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-action/40 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {departments.length > 0 ? (
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            aria-label="Filter by department"
            className={selectClass}
          >
            <option value="">All departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        ) : null}

        {types.length > 0 ? (
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            aria-label="Filter by employment type"
            className={selectClass}
          >
            <option value="">All types</option>
            {types.map((type) => (
              <option key={type} value={type}>{EMPLOYMENT_TYPE_LABELS[type] ?? type}</option>
            ))}
          </select>
        ) : null}
      </div>

      {/* List box — always rendered */}
      <div className="mt-4 overflow-hidden rounded-lg border border-border bg-white">
        {noPositions ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              {emptyStateText ?? "No open positions at this time. Check back soon."}
            </p>
          </div>
        ) : noResults ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              No positions match your filters.{" "}
              <button
                type="button"
                onClick={clearAll}
                className="font-medium text-brand-action hover:underline"
              >
                Clear filters
              </button>
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((pos) => (
              <div
                key={pos._id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-black tracking-normal text-foreground">
                    {pos.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
                    {pos.department ? <span>{pos.department}</span> : null}
                    {pos.department && (pos.employmentType || pos.location) ? (
                      <span aria-hidden="true">·</span>
                    ) : null}
                    {pos.employmentType ? (
                      <span className="flex items-center gap-1">
                        <Briefcase className="size-3" aria-hidden="true" />
                        {EMPLOYMENT_TYPE_LABELS[pos.employmentType] ?? pos.employmentType}
                      </span>
                    ) : null}
                    {pos.employmentType && pos.location ? <span aria-hidden="true">·</span> : null}
                    {pos.location ? (
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3" aria-hidden="true" />
                        {pos.location}
                      </span>
                    ) : null}
                  </div>
                  {pos.description ? (
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{pos.description}</p>
                  ) : null}
                </div>
                {pos.applyUrl ? (
                  <a
                    href={pos.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-action hover:underline"
                  >
                    Apply now
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
