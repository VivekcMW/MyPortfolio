"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ─── SVG Icon Helper ─── */
function SvgIcon({ name, size = 14, className = "" }: { name: string; size?: number; className?: string }) {
  const s = size;
  const common = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className };
  switch (name) {
    /* Layout */
    case "container": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/></svg>;
    case "grid": return <svg {...common}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
    case "flex-row": return <svg {...common}><rect x="2" y="6" width="5" height="12" rx="1"/><rect x="9" y="6" width="5" height="12" rx="1"/><rect x="16" y="6" width="5" height="12" rx="1"/></svg>;
    case "flex-col": return <svg {...common}><rect x="6" y="2" width="12" height="5" rx="1"/><rect x="6" y="9" width="12" height="5" rx="1"/><rect x="6" y="16" width="12" height="5" rx="1"/></svg>;
    case "tabs": return <svg {...common}><path d="M3 7h4v-3h6v3h8"/><rect x="3" y="7" width="18" height="14" rx="1"/></svg>;
    case "accordion": return <svg {...common}><rect x="3" y="3" width="18" height="5" rx="1"/><rect x="3" y="10" width="18" height="5" rx="1"/><rect x="3" y="17" width="18" height="5" rx="1"/></svg>;
    case "divider": return <svg {...common}><line x1="2" y1="12" x2="22" y2="12"/></svg>;
    case "spacer": return <svg {...common}><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="8" y1="4" x2="16" y2="4"/><line x1="8" y1="20" x2="16" y2="20"/></svg>;
    /* Basic */
    case "heading": return <svg {...common}><path d="M6 4v16M18 4v16M6 12h12"/></svg>;
    case "text": return <svg {...common}><polyline points="4 7 4 4 20 4 20 7"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="8" y1="20" x2="16" y2="20"/></svg>;
    case "paragraph": return <svg {...common}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="14" x2="18" y2="14"/><line x1="3" y1="18" x2="14" y2="18"/></svg>;
    case "button": return <svg {...common}><rect x="3" y="7" width="18" height="10" rx="5"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
    case "link": return <svg {...common}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>;
    case "image": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
    case "icon": return <svg {...common}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
    case "badge": return <svg {...common}><circle cx="12" cy="12" r="8"/><line x1="9" y1="12" x2="15" y2="12"/></svg>;
    /* Form */
    case "text-input": return <svg {...common}><rect x="3" y="6" width="18" height="12" rx="2"/><line x1="7" y1="10" x2="7" y2="14"/></svg>;
    case "textarea": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/></svg>;
    case "select": return <svg {...common}><rect x="3" y="6" width="18" height="12" rx="2"/><polyline points="8 11 12 15 16 11"/></svg>;
    case "checkbox": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="9 11 12 14 16 10"/></svg>;
    case "radio": return <svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>;
    case "toggle": return <svg {...common}><rect x="1" y="7" width="22" height="10" rx="5"/><circle cx="16" cy="12" r="3"/></svg>;
    case "date": return <svg {...common}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    case "upload": return <svg {...common}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
    case "slider": return <svg {...common}><line x1="2" y1="12" x2="22" y2="12"/><circle cx="14" cy="12" r="3"/></svg>;
    case "color": return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 010 18" fill="currentColor" opacity="0.3"/></svg>;
    case "richtext": return <svg {...common}><path d="M11 4H4v16h16v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
    case "form-group": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="11" y2="12"/><line x1="7" y1="16" x2="14" y2="16"/></svg>;
    /* Data Display */
    case "table": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/></svg>;
    case "list": return <svg {...common}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>;
    case "card": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>;
    case "stat": return <svg {...common}><path d="M18 20V10M12 20V4M6 20v-6"/></svg>;
    case "avatar": return <svg {...common}><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 00-16 0"/></svg>;
    case "tag": return <svg {...common}><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1"/></svg>;
    case "progress": return <svg {...common}><rect x="2" y="9" width="20" height="6" rx="3"/><rect x="2" y="9" width="12" height="6" rx="3" fill="currentColor" opacity="0.3"/></svg>;
    case "timeline": return <svg {...common}><line x1="12" y1="2" x2="12" y2="22"/><circle cx="12" cy="6" r="2"/><circle cx="12" cy="14" r="2"/><line x1="14" y1="6" x2="20" y2="6"/><line x1="14" y1="14" x2="20" y2="14"/></svg>;
    case "tree": return <svg {...common}><line x1="6" y1="4" x2="6" y2="20"/><line x1="6" y1="8" x2="18" y2="8"/><line x1="6" y1="14" x2="14" y2="14"/><line x1="6" y1="20" x2="10" y2="20"/></svg>;
    case "kanban": return <svg {...common}><rect x="2" y="3" width="6" height="18" rx="1"/><rect x="9" y="3" width="6" height="12" rx="1"/><rect x="16" y="3" width="6" height="15" rx="1"/></svg>;
    /* Charts */
    case "bar-chart": return <svg {...common}><rect x="3" y="12" width="4" height="9"/><rect x="10" y="6" width="4" height="15"/><rect x="17" y="2" width="4" height="19"/></svg>;
    case "line-chart": return <svg {...common}><polyline points="22 12 18 8 13 13 8 8 2 14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>;
    case "pie-chart": return <svg {...common}><path d="M12 2a10 10 0 0110 10h-10z"/><circle cx="12" cy="12" r="10"/></svg>;
    case "area-chart": return <svg {...common}><polyline points="22 12 18 8 13 13 8 8 2 14"/><path d="M2 14l6-6 5 5 5-5 4 4v8H2z" fill="currentColor" opacity="0.15"/></svg>;
    case "scatter": return <svg {...common}><circle cx="6" cy="18" r="1.5" fill="currentColor"/><circle cx="10" cy="10" r="1.5" fill="currentColor"/><circle cx="14" cy="15" r="1.5" fill="currentColor"/><circle cx="18" cy="6" r="1.5" fill="currentColor"/><circle cx="8" cy="14" r="1.5" fill="currentColor"/></svg>;
    case "gauge": return <svg {...common}><path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12" /><line x1="12" y1="12" x2="17" y2="7"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>;
    case "heatmap": return <svg {...common}><rect x="3" y="3" width="5" height="5" rx="1" opacity="0.3"/><rect x="10" y="3" width="5" height="5" rx="1" opacity="0.7"/><rect x="17" y="3" width="5" height="5" rx="1"/><rect x="3" y="10" width="5" height="5" rx="1" opacity="0.5"/><rect x="10" y="10" width="5" height="5" rx="1" opacity="0.9"/><rect x="17" y="10" width="5" height="5" rx="1" opacity="0.4"/></svg>;
    case "funnel": return <svg {...common}><polygon points="2 4 22 4 16 12 16 20 8 20 8 12"/></svg>;
    /* Navigation */
    case "navbar": return <svg {...common}><rect x="2" y="4" width="20" height="4" rx="1"/><line x1="6" y1="6" x2="8" y2="6"/><line x1="10" y1="6" x2="12" y2="6"/><line x1="14" y1="6" x2="16" y2="6"/></svg>;
    case "sidebar": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>;
    case "breadcrumb": return <svg {...common}><polyline points="4 12 8 12"/><polyline points="10 12 14 12"/><polyline points="16 12 20 12"/><polyline points="7 9 10 12 7 15"/><polyline points="13 9 16 12 13 15"/></svg>;
    case "pagination": return <svg {...common}><rect x="2" y="8" width="5" height="8" rx="1"/><rect x="9" y="8" width="5" height="8" rx="1"/><rect x="16" y="8" width="5" height="8" rx="1"/></svg>;
    case "menu": return <svg {...common}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
    case "stepper": return <svg {...common}><circle cx="5" cy="12" r="3"/><circle cx="19" cy="12" r="3"/><line x1="8" y1="12" x2="16" y2="12"/><text x="5" y="13" textAnchor="middle" fill="currentColor" fontSize="5" stroke="none">1</text><text x="19" y="13" textAnchor="middle" fill="currentColor" fontSize="5" stroke="none">2</text></svg>;
    /* Feedback */
    case "modal": return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="17" y1="7" x2="17" y2="7"/></svg>;
    case "drawer": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="13" y="3" width="8" height="18" rx="0" fill="currentColor" opacity="0.15"/></svg>;
    case "toast": return <svg {...common}><rect x="2" y="14" width="20" height="7" rx="2"/><line x1="6" y1="17" x2="18" y2="17"/></svg>;
    case "alert": return <svg {...common}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></svg>;
    case "tooltip": return <svg {...common}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
    case "skeleton": return <svg {...common}><rect x="3" y="4" width="18" height="4" rx="2" opacity="0.3"/><rect x="3" y="12" width="12" height="4" rx="2" opacity="0.2"/><rect x="3" y="20" width="8" height="2" rx="1" opacity="0.15"/></svg>;
    case "spinner": return <svg {...common}><path d="M12 2a10 10 0 0110 10" /><circle cx="12" cy="2" r="1" fill="currentColor"/></svg>;
    case "empty": return <svg {...common}><circle cx="12" cy="12" r="9"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>;
    /* Media */
    case "video": return <svg {...common}><polygon points="5 3 19 12 5 21 5 3" fill="currentColor" opacity="0.15"/><polygon points="5 3 19 12 5 21 5 3"/></svg>;
    case "audio": return <svg {...common}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
    case "carousel": return <svg {...common}><rect x="6" y="4" width="12" height="16" rx="2"/><polyline points="2 9 2 15"/><polyline points="22 9 22 15"/></svg>;
    case "map": return <svg {...common}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
    case "pdf": return <svg {...common}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
    case "code": return <svg {...common}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
    /* Advanced */
    case "json": return <svg {...common}><path d="M8 3H7a2 2 0 00-2 2v5a2 2 0 01-2 2 2 2 0 012 2v5a2 2 0 002 2h1"/><path d="M16 3h1a2 2 0 012 2v5a2 2 0 002 2 2 2 0 00-2 2v5a2 2 0 01-2 2h-1"/></svg>;
    case "api": return <svg {...common}><path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4"/></svg>;
    case "qr": return <svg {...common}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="4" height="4"/><rect x="19" y="19" width="2" height="2"/></svg>;
    case "signature": return <svg {...common}><path d="M2 17c1-1 3-4 5-4s2 3 4 3 3-4 5-4 2 2 4 2 2-2 2-2"/><line x1="2" y1="21" x2="22" y2="21"/></svg>;
    case "scanner": return <svg {...common}><path d="M3 7V5a2 2 0 012-2h2"/><path d="M17 3h2a2 2 0 012 2v2"/><path d="M21 17v2a2 2 0 01-2 2h-2"/><path d="M7 21H5a2 2 0 01-2-2v-2"/><line x1="4" y1="12" x2="20" y2="12"/></svg>;
    case "chat": return <svg {...common}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>;
    case "calendar": return <svg {...common}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><rect x="7" y="13" width="3" height="3" rx="0.5"/></svg>;
    case "timer": return <svg {...common}><circle cx="12" cy="13" r="8"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="13" x2="15" y2="13"/><line x1="10" y1="2" x2="14" y2="2"/></svg>;
    /* Bottom tab icons */
    case "workflows": return <svg {...common}><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><line x1="7" y1="6" x2="17" y2="6"/><line x1="12" y1="8" x2="12" y2="16"/></svg>;
    case "console": return <svg {...common}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>;
    case "codegen": return <svg {...common}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>;
    case "theme": return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 000 18" fill="currentColor" opacity="0.2"/></svg>;
    case "a11y": return <svg {...common}><circle cx="12" cy="4" r="2"/><path d="M12 8v6"/><path d="M8 10h8"/><path d="M9 20l3-6 3 6"/></svg>;
    /* Misc ui */
    case "check": return <svg {...common}><polyline points="20 6 9 17 4 12"/></svg>;
    case "x": return <svg {...common}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
    case "warning": return <svg {...common}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></svg>;
    case "info": return <svg {...common}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><circle cx="12" cy="8" r="0.5" fill="currentColor"/></svg>;
    case "sun": return <svg {...common}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
    case "moon": return <svg {...common}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
    case "sparkle": return <svg {...common}><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/></svg>;
    case "plus": return <svg {...common}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
    case "play": return <svg {...common}><polygon points="5 3 19 12 5 21 5 3"/></svg>;
    case "star": return <svg {...common}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
    case "celebrate": return <svg {...common}><path d="M6 20l3-12 12-3"/><path d="M6 20l3-3"/><path d="M14 4l1.5 1.5"/><path d="M18 6l1 1"/><path d="M4 14l1.5 1.5"/><path d="M2 18l1 1"/><circle cx="12" cy="8" r="1"/><circle cx="16" cy="12" r="1"/></svg>;
    case "db-table": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="3" x2="9" y2="21"/></svg>;
    case "home": return <svg {...common}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>;
    case "dashboard": return <svg {...common}><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>;
    case "settings": return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
    case "profile": return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 00-16 0"/></svg>;
    default: return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/></svg>;
  }
}

/* Icon name mapping for component categories */
const iconMap: Record<string, string> = {
  "Container": "container", "Grid": "grid", "Flex Row": "flex-row", "Flex Column": "flex-col",
  "Tabs": "tabs", "Accordion": "accordion", "Divider": "divider", "Spacer": "spacer",
  "Heading": "heading", "Text Block": "text", "Paragraph": "paragraph", "Button": "button",
  "Link": "link", "Image": "image", "Icon": "icon", "Badge": "badge",
  "Text Input": "text-input", "Textarea": "textarea", "Select": "select", "Checkbox": "checkbox",
  "Radio": "radio", "Toggle": "toggle", "Date Picker": "date", "File Upload": "upload",
  "Slider": "slider", "Color Picker": "color", "Rich Text Editor": "richtext", "Form Group": "form-group",
  "Data Table": "table", "List View": "list", "Card": "card", "Stat Card": "stat",
  "Avatar": "avatar", "Tag": "tag", "Progress Bar": "progress", "Timeline": "timeline",
  "Tree View": "tree", "Kanban Board": "kanban",
  "Bar Chart": "bar-chart", "Line Chart": "line-chart", "Pie Chart": "pie-chart",
  "Area Chart": "area-chart", "Scatter Plot": "scatter", "Gauge": "gauge",
  "Heatmap": "heatmap", "Funnel": "funnel",
  "Navbar": "navbar", "Sidebar": "sidebar", "Breadcrumb": "breadcrumb",
  "Pagination": "pagination", "Menu": "menu", "Stepper": "stepper",
  "Modal": "modal", "Drawer": "drawer", "Toast": "toast", "Alert": "alert",
  "Tooltip": "tooltip", "Skeleton": "skeleton", "Spinner": "spinner", "Empty State": "empty",
  "Video Player": "video", "Audio Player": "audio", "Carousel": "carousel",
  "Map": "map", "PDF Viewer": "pdf", "Code Block": "code",
  "JSON Viewer": "json", "API Caller": "api", "QR Code": "qr",
  "Signature Pad": "signature", "Scanner": "scanner", "Chat Widget": "chat",
  "Calendar": "calendar", "Timer": "timer",
};
function PrototypeShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100vh-64px-80px)] lg:h-[calc(100vh-80px-80px)] bg-[#0B1120] text-foreground flex flex-col">
      {/* Top bar */}
      <header className="h-12 flex items-center justify-between px-4 border-b border-white/10 bg-[#0B1120]/90 backdrop-blur-md shrink-0 z-40">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-white/50 font-mono ml-2">{title}</span>
        </div>
        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">Prototype</span>
      </header>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NOCODE PLATFORM PROTOTYPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type CanvasItem = { id: number; name: string; category: string };
type BottomPanel = "none" | "api" | "json" | "db" | "logs" | "workflows" | "code" | "theme" | "a11y";
type ViewportMode = "desktop" | "tablet-landscape" | "tablet-portrait" | "mobile-landscape" | "mobile-portrait";
type PageDef = { id: string; label: string; items: CanvasItem[] };
type ChatMsg = { role: "user" | "ai"; text: string };
type DeployStep = { label: string; status: "pending" | "running" | "done" | "error" };

const viewportSizes: Record<ViewportMode, { width: number; height: number; label: string }> = {
  desktop: { width: 1280, height: 800, label: "Desktop" },
  "tablet-landscape": { width: 1024, height: 768, label: "Tablet Landscape" },
  "tablet-portrait": { width: 768, height: 1024, label: "Tablet Portrait" },
  "mobile-landscape": { width: 667, height: 375, label: "Mobile Landscape" },
  "mobile-portrait": { width: 375, height: 667, label: "Mobile Portrait" },
};

/* Per-component dynamic property definitions */
interface ComponentProps {
  width: string; height: string;
  padding: [string, string, string, string];
  margin: [string, string, string, string];
  bgColor: string; bgHex: string;
  border: string; borderStyle: string; borderColor: string;
  radius: string;
  font: string; fontSize: string; fontWeight: string; lineHeight: string; textColor: string;
  dataSource: string | null;
  events: { name: string; action: string }[];
  visible: boolean;
  opacity: string;
  overflow: string;
}

const getComponentProps = (name: string, category: string): ComponentProps => {
  const base: ComponentProps = {
    width: "100%", height: "auto",
    padding: ["16", "16", "16", "16"], margin: ["0", "0", "8", "0"],
    bgColor: "bg-transparent", bgHex: "transparent",
    border: "0", borderStyle: "none", borderColor: "#152038",
    radius: "8px", font: "Inter", fontSize: "14px", fontWeight: "400", lineHeight: "1.5", textColor: "#E2E8F0",
    dataSource: null, events: [], visible: true, opacity: "100%", overflow: "visible",
  };
  switch (name) {
    case "Navbar": return { ...base, height: "64px", padding: ["0","24","0","24"], bgHex: "#0A1023", border: "1", borderStyle: "solid", borderColor: "#152038", radius: "0", events: [{ name: "onRouteChange", action: "→ Navigate" }] };
    case "Container": return { ...base, padding: ["24","24","24","24"], bgHex: "#0F172A", border: "1", borderStyle: "dashed", borderColor: "#1E293B", radius: "12px", overflow: "hidden" };
    case "Grid": return { ...base, padding: ["16","16","16","16"], bgHex: "transparent", radius: "0", overflow: "visible" };
    case "Heading": return { ...base, height: "auto", padding: ["0","0","0","0"], margin: ["0","0","16","0"], fontSize: "28px", fontWeight: "700", lineHeight: "1.2", font: "Space Grotesk" };
    case "Text Block": case "Paragraph": return { ...base, padding: ["0","0","0","0"], fontSize: "14px", fontWeight: "400", lineHeight: "1.7", textColor: "#94A3B8" };
    case "Button": return { ...base, width: "auto", height: "40px", padding: ["10","20","10","20"], margin: ["8","0","8","0"], bgHex: "#06B6D4", radius: "8px", fontSize: "14px", fontWeight: "600", textColor: "#FFFFFF", events: [{ name: "onClick", action: "→ Submit Form" }, { name: "onHover", action: "→ Scale 1.02" }] };
    case "Data Table": return { ...base, padding: ["0","0","0","0"], bgHex: "#0A1023", border: "1", borderStyle: "solid", borderColor: "#152038", radius: "12px", fontSize: "13px", dataSource: "/api/v1/users → response.data", overflow: "auto" };
    case "Text Input": return { ...base, height: "40px", padding: ["8","12","8","12"], bgHex: "#0F172A", border: "1", borderStyle: "solid", borderColor: "#1E293B", radius: "8px", fontSize: "14px", events: [{ name: "onChange", action: "→ Update State" }, { name: "onFocus", action: "→ Highlight" }] };
    case "Select": return { ...base, height: "40px", padding: ["8","12","8","12"], bgHex: "#0F172A", border: "1", borderStyle: "solid", borderColor: "#1E293B", radius: "8px", events: [{ name: "onChange", action: "→ Filter Data" }] };
    case "Card": return { ...base, padding: ["20","20","20","20"], bgHex: "#0A1023", border: "1", borderStyle: "solid", borderColor: "#152038", radius: "16px" };
    case "Image": return { ...base, width: "100%", height: "200px", radius: "8px", bgHex: "#0F172A", overflow: "hidden" };
    case "Bar Chart": case "Line Chart": case "Pie Chart": case "Area Chart": return { ...base, height: "300px", padding: ["16","16","16","16"], bgHex: "#0A1023", border: "1", borderStyle: "solid", borderColor: "#152038", radius: "12px", dataSource: "/api/v1/analytics → response.data" };
    case "Modal": return { ...base, width: "480px", bgHex: "#0D1525", border: "1", borderStyle: "solid", borderColor: "#1E293B", radius: "16px", events: [{ name: "onClose", action: "→ Hide Modal" }] };
    case "Stat Card": return { ...base, padding: ["20","20","20","20"], bgHex: "#0A1023", border: "1", borderStyle: "solid", borderColor: "#152038", radius: "12px", fontSize: "32px", fontWeight: "700", dataSource: "/api/v1/stats → response.total" };
    case "Toggle": return { ...base, width: "44px", height: "24px", radius: "12px", bgHex: "#06B6D4", events: [{ name: "onChange", action: "→ Toggle State" }] };
    case "Badge": return { ...base, width: "auto", height: "auto", padding: ["2","8","2","8"], bgHex: "#06B6D4", radius: "9999px", fontSize: "11px", fontWeight: "600" };
    default: return { ...base, events: [{ name: "onClick", action: "—" }] };
  }
};

const componentCategories: { label: string; items: { name: string; icon: string }[] }[] = [
  {
    label: "Layout",
    items: [
      { name: "Container", icon: "container" }, { name: "Grid", icon: "grid" }, { name: "Flex Row", icon: "flex-row" },
      { name: "Flex Column", icon: "flex-col" }, { name: "Tabs", icon: "tabs" }, { name: "Accordion", icon: "accordion" },
      { name: "Divider", icon: "divider" }, { name: "Spacer", icon: "spacer" },
    ],
  },
  {
    label: "Basic",
    items: [
      { name: "Heading", icon: "heading" }, { name: "Text Block", icon: "text" }, { name: "Paragraph", icon: "paragraph" },
      { name: "Button", icon: "button" }, { name: "Link", icon: "link" }, { name: "Image", icon: "image" },
      { name: "Icon", icon: "icon" }, { name: "Badge", icon: "badge" },
    ],
  },
  {
    label: "Form",
    items: [
      { name: "Text Input", icon: "text-input" }, { name: "Textarea", icon: "textarea" }, { name: "Select", icon: "select" },
      { name: "Checkbox", icon: "checkbox" }, { name: "Radio", icon: "radio" }, { name: "Toggle", icon: "toggle" },
      { name: "Date Picker", icon: "date" }, { name: "File Upload", icon: "upload" }, { name: "Slider", icon: "slider" },
      { name: "Color Picker", icon: "color" }, { name: "Rich Text Editor", icon: "richtext" }, { name: "Form Group", icon: "form-group" },
    ],
  },
  {
    label: "Data Display",
    items: [
      { name: "Data Table", icon: "table" }, { name: "List View", icon: "list" }, { name: "Card", icon: "card" },
      { name: "Stat Card", icon: "stat" }, { name: "Avatar", icon: "avatar" }, { name: "Tag", icon: "tag" },
      { name: "Progress Bar", icon: "progress" }, { name: "Timeline", icon: "timeline" }, { name: "Tree View", icon: "tree" },
      { name: "Kanban Board", icon: "kanban" },
    ],
  },
  {
    label: "Charts",
    items: [
      { name: "Bar Chart", icon: "bar-chart" }, { name: "Line Chart", icon: "line-chart" }, { name: "Pie Chart", icon: "pie-chart" },
      { name: "Area Chart", icon: "area-chart" }, { name: "Scatter Plot", icon: "scatter" }, { name: "Gauge", icon: "gauge" },
      { name: "Heatmap", icon: "heatmap" }, { name: "Funnel", icon: "funnel" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { name: "Navbar", icon: "navbar" }, { name: "Sidebar", icon: "sidebar" }, { name: "Breadcrumb", icon: "breadcrumb" },
      { name: "Pagination", icon: "pagination" }, { name: "Menu", icon: "menu" }, { name: "Stepper", icon: "stepper" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { name: "Modal", icon: "modal" }, { name: "Drawer", icon: "drawer" }, { name: "Toast", icon: "toast" },
      { name: "Alert", icon: "alert" }, { name: "Tooltip", icon: "tooltip" }, { name: "Skeleton", icon: "skeleton" },
      { name: "Spinner", icon: "spinner" }, { name: "Empty State", icon: "empty" },
    ],
  },
  {
    label: "Media",
    items: [
      { name: "Video Player", icon: "video" }, { name: "Audio Player", icon: "audio" }, { name: "Carousel", icon: "carousel" },
      { name: "Map", icon: "map" }, { name: "PDF Viewer", icon: "pdf" }, { name: "Code Block", icon: "code" },
    ],
  },
  {
    label: "Advanced",
    items: [
      { name: "JSON Viewer", icon: "json" }, { name: "API Caller", icon: "api" }, { name: "QR Code", icon: "qr" },
      { name: "Signature Pad", icon: "signature" }, { name: "Scanner", icon: "scanner" }, { name: "Chat Widget", icon: "chat" },
      { name: "Calendar", icon: "calendar" }, { name: "Timer", icon: "timer" },
    ],
  },
];

const sampleApiEndpoints = [
  { method: "GET", url: "/api/v1/users", status: 200, time: "124ms", name: "Fetch Users" },
  { method: "POST", url: "/api/v1/users", status: 201, time: "89ms", name: "Create User" },
  { method: "GET", url: "/api/v1/products", status: 200, time: "67ms", name: "List Products" },
  { method: "PUT", url: "/api/v1/orders/:id", status: 200, time: "156ms", name: "Update Order" },
  { method: "DELETE", url: "/api/v1/sessions/:id", status: 204, time: "42ms", name: "Delete Session" },
  { method: "GET", url: "/api/v1/analytics/dashboard", status: 200, time: "312ms", name: "Dashboard Data" },
];

const sampleJson = {
  user: { id: 1, name: "Vivekanand", email: "hello@vivekanand.in", role: "admin" },
  settings: { theme: "dark", notifications: true, language: "en" },
  permissions: ["read", "write", "admin"],
  metadata: { createdAt: "2025-01-15T10:30:00Z", lastLogin: "2025-04-05T08:12:00Z" },
};

const sampleDbTables = [
  {
    name: "users",
    rows: 12847,
    columns: ["id", "name", "email", "role", "created_at"],
    data: [
      { id: 1, name: "Vivekanand", email: "hello@vivekanand.in", role: "admin", created_at: "2025-01-15" },
      { id: 2, name: "Sarah Chen", email: "sarah@example.com", role: "editor", created_at: "2025-02-20" },
      { id: 3, name: "Mike Ross", email: "mike@example.com", role: "viewer", created_at: "2025-03-10" },
      { id: 4, name: "Priya Patel", email: "priya@example.com", role: "editor", created_at: "2025-03-18" },
      { id: 5, name: "Alex Kim", email: "alex@example.com", role: "viewer", created_at: "2025-04-01" },
    ],
  },
  {
    name: "products",
    rows: 3421,
    columns: ["id", "name", "price", "category", "stock"],
    data: [
      { id: 1, name: "Widget Pro", price: "$29.99", category: "Tools", stock: 142 },
      { id: 2, name: "DataSync", price: "$49.99", category: "SaaS", stock: "∞" },
      { id: 3, name: "CloudStore", price: "$19.99", category: "Storage", stock: "∞" },
    ],
  },
  {
    name: "orders",
    rows: 89231,
    columns: ["id", "user_id", "total", "status", "date"],
    data: [
      { id: 1001, user_id: 1, total: "$129.97", status: "completed", date: "2025-04-04" },
      { id: 1002, user_id: 3, total: "$49.99", status: "pending", date: "2025-04-05" },
      { id: 1003, user_id: 2, total: "$79.98", status: "shipped", date: "2025-04-05" },
    ],
  },
  {
    name: "analytics",
    rows: 524103,
    columns: ["id", "event", "user_id", "timestamp", "payload"],
    data: [
      { id: 1, event: "page_view", user_id: 1, timestamp: "2025-04-05T08:12:00Z", payload: "{...}" },
      { id: 2, event: "click", user_id: 2, timestamp: "2025-04-05T08:13:12Z", payload: "{...}" },
    ],
  },
];

const sampleLogs = [
  { time: "08:12:04", level: "info", msg: "App initialized — 4 pages, 12 components loaded" },
  { time: "08:12:05", level: "info", msg: "API connector: 6 endpoints configured" },
  { time: "08:12:06", level: "success", msg: "Database connected — PostgreSQL @ db.cloud.io:5432" },
  { time: "08:12:08", level: "info", msg: "Workflow 'onUserSignup' registered — 4 steps" },
  { time: "08:12:10", level: "warn", msg: "Component 'Chart_3' missing data binding — using fallback" },
  { time: "08:12:15", level: "info", msg: "GET /api/v1/users → 200 (124ms)" },
  { time: "08:12:18", level: "info", msg: "GET /api/v1/products → 200 (67ms)" },
  { time: "08:12:22", level: "error", msg: "POST /api/v1/orders — validation failed: 'total' is required" },
  { time: "08:12:25", level: "success", msg: "Deployment preview ready — https://preview-abc123.app" },
  { time: "08:12:30", level: "info", msg: "Auto-save triggered — version 24 saved" },
];

const sampleWorkflows = [
  {
    name: "onUserSignup",
    trigger: "Form Submit",
    steps: [
      { type: "validate", label: "Validate Email" },
      { type: "api", label: "POST /api/users" },
      { type: "condition", label: "If role = admin" },
      { type: "email", label: "Send Welcome Email" },
    ],
  },
  {
    name: "onOrderCreate",
    trigger: "Button Click",
    steps: [
      { type: "api", label: "POST /api/orders" },
      { type: "transform", label: "Calculate Tax" },
      { type: "db", label: "Update inventory" },
      { type: "notification", label: "Notify Warehouse" },
    ],
  },
  {
    name: "scheduledReport",
    trigger: "Cron (daily 9AM)",
    steps: [
      { type: "db", label: "Query analytics" },
      { type: "transform", label: "Aggregate metrics" },
      { type: "api", label: "POST /api/reports" },
      { type: "email", label: "Email to stakeholders" },
    ],
  },
];

/* ── Collaborators (fake presence) ── */
const collaborators = [
  { name: "Sarah C.", color: "#F472B6", initials: "SC", cursor: "Data Table" },
  { name: "Mike R.", color: "#34D399", initials: "MR", cursor: "Navbar" },
  { name: "Priya P.", color: "#FBBF24", initials: "PP", cursor: null },
];

/* ── Theme tokens ── */
const defaultThemeTokens = {
  light: {
    bgPrimary: "#FFFFFF", bgSecondary: "#F8FAFC", bgSurface: "#F1F5F9",
    textPrimary: "#0F172A", textSecondary: "#475569", textMuted: "#94A3B8",
    accent: "#06B6D4", accentHover: "#0891B2", danger: "#EF4444",
    success: "#22C55E", warning: "#F59E0B", border: "#E2E8F0",
    radius: "8px", fontBase: "14px", fontHeading: "28px", spacing: "16px",
  },
  dark: {
    bgPrimary: "#0B1120", bgSecondary: "#0D1525", bgSurface: "#0A1023",
    textPrimary: "#E2E8F0", textSecondary: "#94A3B8", textMuted: "#64748B",
    accent: "#06B6D4", accentHover: "#22D3EE", danger: "#EF4444",
    success: "#22C55E", warning: "#F59E0B", border: "#152038",
    radius: "8px", fontBase: "14px", fontHeading: "28px", spacing: "16px",
  },
};

/* ── A11y issues sample data ── */
const sampleA11yIssues = [
  { component: "Navbar", severity: "warning" as const, rule: "2.4.1", issue: "Navigation landmark missing aria-label", suggestion: "Add aria-label=\"Main navigation\"" },
  { component: "Button", severity: "error" as const, rule: "4.1.2", issue: "Button has no accessible name", suggestion: "Add aria-label or visible text content" },
  { component: "Image", severity: "error" as const, rule: "1.1.1", issue: "Image missing alt attribute", suggestion: "Add descriptive alt text to the image" },
  { component: "Data Table", severity: "warning" as const, rule: "1.3.1", issue: "Table missing <caption> or aria-describedby", suggestion: "Add a caption element describing table content" },
  { component: "Text Input", severity: "error" as const, rule: "1.3.1", issue: "Form input missing associated <label>", suggestion: "Add a <label> element or aria-label attribute" },
  { component: "Select", severity: "warning" as const, rule: "4.1.2", issue: "Select missing aria-label", suggestion: "Add aria-label describing the selection purpose" },
  { component: "Container", severity: "info" as const, rule: "1.3.6", issue: "Section has no heading", suggestion: "Consider adding a heading for screen reader navigation" },
  { component: "Heading", severity: "info" as const, rule: "1.3.1", issue: "Heading level should follow hierarchy", suggestion: "Ensure heading levels are sequential (h1→h2→h3)" },
];

/* ── AI Chat preset messages ── */
const aiChatPresets: ChatMsg[] = [
  { role: "ai", text: "Hi! I'm your AI assistant. I can help you build faster. Try asking me to add components, fix accessibility issues, or generate code." },
];

/* ── Default pages ── */
const defaultPages: PageDef[] = [
  {
    id: "home",
    label: "Home",
    items: [
      { id: 1, name: "Navbar", category: "Navigation" },
      { id: 2, name: "Container", category: "Layout" },
      { id: 3, name: "Heading", category: "Basic" },
      { id: 4, name: "Data Table", category: "Data Display" },
      { id: 5, name: "Button", category: "Basic" },
    ],
  },
  {
    id: "dashboard",
    label: "Dashboard",
    items: [
      { id: 101, name: "Navbar", category: "Navigation" },
      { id: 102, name: "Grid", category: "Layout" },
      { id: 103, name: "Stat Card", category: "Data Display" },
      { id: 104, name: "Bar Chart", category: "Charts" },
      { id: 105, name: "Line Chart", category: "Charts" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    items: [
      { id: 201, name: "Navbar", category: "Navigation" },
      { id: 202, name: "Container", category: "Layout" },
      { id: 203, name: "Text Input", category: "Form" },
      { id: 204, name: "Select", category: "Form" },
      { id: 205, name: "Toggle", category: "Form" },
      { id: 206, name: "Button", category: "Basic" },
    ],
  },
  {
    id: "profile",
    label: "Profile",
    items: [
      { id: 301, name: "Navbar", category: "Navigation" },
      { id: 302, name: "Card", category: "Data Display" },
      { id: 303, name: "Avatar", category: "Data Display" },
      { id: 304, name: "Heading", category: "Basic" },
      { id: 305, name: "Text Block", category: "Basic" },
    ],
  },
];

function NoCodePrototype() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [pages, setPages] = useState<PageDef[]>(defaultPages);
  const [currentPageId, setCurrentPageId] = useState("home");
  const canvasItems = pages.find((p) => p.id === currentPageId)?.items ?? [];
  const setCanvasItems = (updater: CanvasItem[] | ((prev: CanvasItem[]) => CanvasItem[])) => {
    setPages((prev) =>
      prev.map((p) =>
        p.id === currentPageId
          ? { ...p, items: typeof updater === "function" ? updater(p.items) : updater }
          : p
      )
    );
  };
  const [bottomPanel, setBottomPanel] = useState<BottomPanel>("none");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Layout", "Basic", "Form"]));
  const [activeApiIdx, setActiveApiIdx] = useState(0);
  const [activeDbTable, setActiveDbTable] = useState(0);
  const [nextId, setNextId] = useState(400);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [propsTab, setPropsTab] = useState<"style" | "data" | "events">("style");

  /* ── New feature states ── */
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [deploySteps, setDeploySteps] = useState<DeployStep[]>([
    { label: "Build", status: "pending" },
    { label: "Test", status: "pending" },
    { label: "Optimize", status: "pending" },
    { label: "Deploy", status: "pending" },
    { label: "Live", status: "pending" },
  ]);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>(aiChatPresets);
  const [chatInput, setChatInput] = useState("");
  const [codeFormat, setCodeFormat] = useState<"react" | "html" | "css">("react");
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [viewportOpen, setViewportOpen] = useState(false);

  const selectedItem = canvasItems.find((c) => c.name === selectedComponent);
  const props = selectedItem ? getComponentProps(selectedItem.name, selectedItem.category) : null;

  const toggleCategory = (label: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  const addToCanvas = (name: string, category: string) => {
    setCanvasItems((prev) => [...prev, { id: nextId, name, category }]);
    setNextId((n) => n + 1);
  };

  const removeFromCanvas = (id: number) => {
    setCanvasItems((prev) => prev.filter((c) => c.id !== id));
    setSelectedComponent(null);
  };

  const moveItem = (idx: number, dir: -1 | 1) => {
    setCanvasItems((prev) => {
      const arr = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= arr.length) return arr;
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return arr;
    });
  };

  const startDeploy = () => {
    setShowDeployModal(true);
    const steps: DeployStep[] = [
      { label: "Build", status: "pending" },
      { label: "Test", status: "pending" },
      { label: "Optimize", status: "pending" },
      { label: "Deploy", status: "pending" },
      { label: "Live", status: "pending" },
    ];
    setDeploySteps(steps);
    steps.forEach((_, i) => {
      setTimeout(() => {
        setDeploySteps((prev) =>
          prev.map((s, j) =>
            j === i ? { ...s, status: "running" } : j < i ? { ...s, status: "done" } : s
          )
        );
      }, i * 1200);
      setTimeout(() => {
        setDeploySteps((prev) =>
          prev.map((s, j) => (j === i ? { ...s, status: "done" } : s))
        );
      }, i * 1200 + 1000);
    });
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMsg = { role: "user", text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    const responses = [
      "Great idea! I'd suggest adding a Card component above the Data Table for a summary section.",
      "You could connect that Button to a POST /api/v1/orders endpoint in the API Connector.",
      "I found 3 accessibility issues on this page. Open the A11y Checker panel to review them.",
      "Try switching to the Dashboard page for some chart components — they pair well with Stat Cards.",
      "Consider adding form validation to your Text Input. I can set up an onChange event handler for that.",
      "Your layout looks solid! For mobile, try wrapping those cards in a Flex Column instead of Grid.",
    ];
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: "ai", text: responses[Math.floor(Math.random() * responses.length)] },
      ]);
    }, 800);
  };

  const generateCode = (): string => {
    if (codeFormat === "react") {
      const lines = [`function ${pages.find((p) => p.id === currentPageId)?.label ?? "Page"}() {`, "  return (", "    <div className=\"min-h-screen bg-slate-950 text-slate-200\">"];
      canvasItems.forEach((item) => {
        const tag = item.name.replace(/\s+/g, "");
        lines.push(`      <${tag} />`);
      });
      lines.push("    </div>", "  );", "}");
      return lines.join("\n");
    }
    if (codeFormat === "html") {
      const lines = ["<!DOCTYPE html>", "<html lang=\"en\">", "<body class=\"min-h-screen bg-slate-950 text-slate-200\">"];
      canvasItems.forEach((item) => {
        lines.push(`  <div class=\"component\" data-type=\"${item.name}\">${item.name}</div>`);
      });
      lines.push("</body>", "</html>");
      return lines.join("\n");
    }
    // css
    const lines = [":root {", "  --bg-primary: #0B1120;", "  --text-primary: #E2E8F0;", "  --accent: #06B6D4;", "  --border: #152038;", "  --radius: 8px;", "  --spacing: 16px;", "}"];
    canvasItems.forEach((item) => {
      const cls = item.name.toLowerCase().replace(/\s+/g, "-");
      lines.push("", `.${cls} {`, "  padding: var(--spacing);", "  border: 1px solid var(--border);", "  border-radius: var(--radius);", "}");
    });
    return lines.join("\n");
  };

  const filteredCategories = searchQuery
    ? componentCategories
        .map((cat) => ({
          ...cat,
          items: cat.items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : componentCategories;

  const bottomTabs: { key: BottomPanel; label: string; icon: string }[] = [
    { key: "api", label: "API Connector", icon: "api" },
    { key: "json", label: "JSON Viewer", icon: "json" },
    { key: "db", label: "DB Viewer", icon: "db-table" },
    { key: "workflows", label: "Workflows", icon: "workflows" },
    { key: "logs", label: "Console", icon: "console" },
    { key: "code", label: "Code Gen", icon: "codegen" },
    { key: "theme", label: "Theme", icon: "theme" },
    { key: "a11y", label: "Accessibility", icon: "a11y" },
  ];

  const methodColor: Record<string, string> = {
    GET: "text-green-400 bg-green-500/15",
    POST: "text-blue-400 bg-blue-500/15",
    PUT: "text-amber-400 bg-amber-500/15",
    DELETE: "text-red-400 bg-red-500/15",
    PATCH: "text-purple-400 bg-purple-500/15",
  };

  const stepColor: Record<string, string> = {
    validate: "border-green-500/40 bg-green-500/10 text-green-300",
    api: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    condition: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    email: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    transform: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    db: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    notification: "border-orange-500/40 bg-orange-500/10 text-orange-300",
  };

  return (
    <PrototypeShell title="nocode-builder.app">
      <div className="flex flex-col h-[calc(100vh-48px-64px)] lg:h-[calc(100vh-48px-80px)]">
        <div className="flex flex-1 min-h-0">
          {/* ── Left Sidebar ── */}
          <aside className="w-60 shrink-0 border-r border-white/10 bg-[#0D1525] flex flex-col min-h-0">
            {/* Search */}
            <div className="p-3 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white/5 rounded-lg border border-white/10 focus-within:border-cyan-500/40 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30 shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-white/80 placeholder:text-white/30 outline-none w-full"
                />
              </div>
            </div>

            {/* Component categories */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredCategories.map((cat) => (
                <div key={cat.label}>
                  <button
                    onClick={() => toggleCategory(cat.label)}
                    className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-mono text-cyan-400 uppercase tracking-widest hover:bg-white/5 rounded transition-colors"
                  >
                    {cat.label}
                    <span className="text-white/40 text-[9px]">{expandedCategories.has(cat.label) ? "▾" : "▸"} {cat.items.length}</span>
                  </button>
                  {(expandedCategories.has(cat.label) || searchQuery) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="grid grid-cols-2 gap-1 px-1 pb-2 overflow-hidden"
                    >
                      {cat.items.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => addToCanvas(c.name, cat.label)}
                          className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-white/3 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group"
                        >
                          <span className="text-sm group-hover:scale-110 transition-transform"><SvgIcon name={c.icon} size={14} /></span>
                          <span className="text-[9px] text-white/60 group-hover:text-white/90 leading-tight text-center">{c.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Layers */}
            <div className="border-t border-white/10 shrink-0 max-h-48 overflow-y-auto">
              <div className="p-2">
                <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2 px-1">Layers ({canvasItems.length})</p>
                <div className="space-y-0.5">
                  {canvasItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedComponent(item.name)}
                      className={`w-full text-left text-[10px] px-2 py-1 rounded flex items-center justify-between group transition-colors ${selectedComponent === item.name ? "bg-cyan-500/20 text-cyan-300" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}
                    >
                      <span className="truncate">{item.name}</span>
                      <span className="text-white/30 group-hover:text-white/50 text-[8px]">{item.category}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Canvas ── */}
          <div className="flex-1 bg-[#080E1A] flex flex-col min-h-0">
            {/* Page Manager tabs */}
            <div className="h-8 flex items-center border-b border-white/10 bg-[#0A1020] shrink-0 px-1 gap-0.5">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => { setCurrentPageId(page.id); setSelectedComponent(null); }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-t text-[10px] transition-colors ${currentPageId === page.id ? "bg-[#080E1A] text-cyan-300 border-t border-x border-cyan-500/30 -mb-px" : "text-white/40 hover:text-white/60 hover:bg-white/5"}`}
                >
                  <span className="text-[8px]"><SvgIcon name={page.id === "home" ? "home" : page.id === "dashboard" ? "dashboard" : page.id === "settings" ? "settings" : "profile"} size={8} /></span>
                  {page.label}
                </button>
              ))}
              <button className="text-[10px] px-2 py-1 text-white/30 hover:text-white/50 transition-colors">+</button>
            </div>
            {/* Canvas toolbar */}
            <div className="h-9 flex items-center justify-between px-4 border-b border-white/10 bg-[#0A1020] shrink-0">
              <div className="flex items-center gap-2">
                {/* Viewport dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setViewportOpen(!viewportOpen)}
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 hover:border-white/20 transition-colors text-[9px]"
                  >
                    {viewport === "desktop" && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400 shrink-0"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
                    {viewport === "tablet-landscape" && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400 shrink-0"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="18" y1="8" x2="18" y2="16"/></svg>}
                    {viewport === "tablet-portrait" && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400 shrink-0"><rect x="4" y="1" width="16" height="22" rx="2"/><line x1="8" y1="18" x2="16" y2="18"/></svg>}
                    {viewport === "mobile-landscape" && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400 shrink-0"><rect x="1" y="6" width="22" height="12" rx="2"/><line x1="19" y1="9" x2="19" y2="15"/></svg>}
                    {viewport === "mobile-portrait" && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400 shrink-0"><rect x="7" y="1" width="10" height="22" rx="2"/><line x1="10" y1="18" x2="14" y2="18"/></svg>}
                    <span className="text-white/80">{viewportSizes[viewport].label}</span>
                    <span className="text-white/30">{viewportSizes[viewport].width}×{viewportSizes[viewport].height}</span>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <AnimatePresence>
                    {viewportOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setViewportOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-52 bg-[#0D1525] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden"
                        >
                          {(Object.entries(viewportSizes) as [ViewportMode, typeof viewportSizes[ViewportMode]][]).map(([key, v]) => (
                            <button
                              key={key}
                              onClick={() => { setViewport(key); setViewportOpen(false); }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 text-[10px] transition-colors ${viewport === key ? "bg-cyan-500/15 text-cyan-300" : "text-white/60 hover:bg-white/5 hover:text-white/80"}`}
                            >
                              {key === "desktop" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
                              {key === "tablet-landscape" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="18" y1="8" x2="18" y2="16"/></svg>}
                              {key === "tablet-portrait" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="4" y="1" width="16" height="22" rx="2"/><line x1="8" y1="18" x2="16" y2="18"/></svg>}
                              {key === "mobile-landscape" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="1" y="6" width="22" height="12" rx="2"/><line x1="19" y1="9" x2="19" y2="15"/></svg>}
                              {key === "mobile-portrait" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="7" y="1" width="10" height="22" rx="2"/><line x1="10" y1="18" x2="14" y2="18"/></svg>}
                              <div className="flex-1 text-left">
                                <span className="block">{v.label}</span>
                                <span className="text-[8px] font-mono text-white/30">{v.width} × {v.height}</span>
                              </div>
                              {viewport === key && <span className="text-cyan-400"><SvgIcon name="check" size={10} /></span>}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Collaboration avatars */}
                <div className="flex items-center mr-2">
                  <div className="flex items-center flex-row -space-x-1">
                    {collaborators.map((c, i) => (
                      <div key={c.initials} className="relative group/collab" style={{ zIndex: collaborators.length - i }}>
                        <div
                          className="w-6 h-6 rounded-full border-2 border-[#0A1020] flex items-center justify-center text-[7px] font-bold cursor-default shrink-0"
                          style={{ backgroundColor: c.color + "30", color: c.color }}
                        >
                          {c.initials}
                        </div>
                        {c.cursor && (
                          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full border border-[#0A1020]" style={{ backgroundColor: c.color }} />
                        )}
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-white/10 backdrop-blur text-[8px] text-white/80 whitespace-nowrap opacity-0 group-hover/collab:opacity-100 transition-opacity pointer-events-none z-50">
                          {c.name} {c.cursor ? `• editing ${c.cursor}` : "• idle"}
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="text-[8px] text-white/30 ml-2 whitespace-nowrap">3 online</span>
                </div>
                <span className="w-px h-3 bg-white/10" />
                <button className="text-[9px] px-2 py-0.5 rounded text-white/50 hover:text-white/70 hover:bg-white/5 transition-colors">Undo</button>
                <button className="text-[9px] px-2 py-0.5 rounded text-white/50 hover:text-white/70 hover:bg-white/5 transition-colors">Redo</button>
                <span className="w-px h-3 bg-white/10" />
                <button className="text-[9px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors">Preview</button>
                <button onClick={startDeploy} className="text-[9px] px-2.5 py-0.5 rounded bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors">Deploy</button>
              </div>
            </div>

            {/* Canvas drop area — responsive viewport simulation */}
            <div className="flex-1 overflow-auto p-4 flex justify-center">
              <motion.div
                animate={{ width: viewport === "desktop" ? "100%" : viewportSizes[viewport].width }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative"
                style={{ maxWidth: "100%" }}
              >
                {/* Viewport frame */}
                {viewport !== "desktop" && (
                  <div className="absolute -top-5 left-0 right-0 flex items-center justify-center">
                    <span className="text-[9px] font-mono text-white/30 bg-[#080E1A] px-2">
                      {viewportSizes[viewport].label} — {viewportSizes[viewport].width} × {viewportSizes[viewport].height}
                    </span>
                  </div>
                )}
                <div
                  className={`min-h-full border-2 rounded-xl p-3 space-y-2 transition-colors ${viewport !== "desktop" ? "border-cyan-500/20 bg-[#060B15] shadow-[0_0_40px_rgba(6,182,212,0.05)]" : "border-dashed border-white/10"}`}
                >
                <AnimatePresence>
                  {canvasItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      layout
                      onClick={() => setSelectedComponent(item.name)}
                      draggable
                      onDragStart={() => setDragIdx(idx)}
                      onDragOver={(e) => { e.preventDefault(); }}
                      onDrop={() => {
                        if (dragIdx !== null && dragIdx !== idx) {
                          setCanvasItems((prev) => {
                            const arr = [...prev];
                            const [moved] = arr.splice(dragIdx, 1);
                            arr.splice(idx, 0, moved);
                            return arr;
                          });
                        }
                        setDragIdx(null);
                      }}
                      onDragEnd={() => setDragIdx(null)}
                      className={`rounded-lg p-3 border transition-all cursor-pointer relative group ${dragIdx === idx ? "opacity-50" : ""} ${selectedComponent === item.name ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.12)]" : "border-white/10 bg-white/3 hover:border-white/20"}`}
                    >
                      {/* Controls — drag handle, reorder, remove */}
                      <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="w-4 h-4 rounded bg-white/10 text-white/40 text-[8px] flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-white/20" title="Drag to reorder">⋮⋮</span>
                        <button onClick={(e) => { e.stopPropagation(); moveItem(idx, -1); }} className="w-4 h-4 rounded bg-white/10 text-white/40 text-[8px] flex items-center justify-center hover:bg-white/20" title="Move up">↑</button>
                        <button onClick={(e) => { e.stopPropagation(); moveItem(idx, 1); }} className="w-4 h-4 rounded bg-white/10 text-white/40 text-[8px] flex items-center justify-center hover:bg-white/20" title="Move down">↓</button>
                        <button
                          onClick={(e) => { e.stopPropagation(); removeFromCanvas(item.id); }}
                          className="w-4 h-4 rounded bg-red-500/20 text-red-300 text-[8px] flex items-center justify-center hover:bg-red-500/40"
                        ><SvgIcon name="x" size={8} /></button>
                      </div>
                      {/* Collab cursor indicator */}
                      {collaborators.find((c) => c.cursor === item.name) && (
                        <div className="absolute -left-1 top-2 flex items-center gap-1">
                          <div className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent" style={{ borderLeftColor: collaborators.find((c) => c.cursor === item.name)!.color }} />
                          <span className="text-[7px] px-1 py-0.5 rounded-r text-white/90" style={{ backgroundColor: collaborators.find((c) => c.cursor === item.name)!.color }}>{collaborators.find((c) => c.cursor === item.name)!.name}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/80">{item.name}</span>
                        <span className="text-[8px] font-mono text-white/40">{item.category}</span>
                      </div>
                      {/* Contextual mock content */}
                      {item.name === "Navbar" && (
                        <div className="flex items-center justify-between h-6 bg-white/5 rounded px-3">
                          <div className="flex gap-2">{["Home", "Products", "About"].map((l) => <span key={l} className="text-[8px] text-white/50">{l}</span>)}</div>
                          <div className="w-8 h-3 bg-cyan-500/30 rounded" />
                        </div>
                      )}
                      {item.name === "Data Table" && (
                        <div className="space-y-1">
                          <div className="flex gap-2">{["Name", "Email", "Role", "Actions"].map((h) => <span key={h} className="text-[8px] text-white/40 flex-1">{h}</span>)}</div>
                          {[1, 2, 3].map((r) => <div key={r} className="flex gap-2">{[60, 80, 40, 30].map((w, i) => <div key={i} className="h-1.5 bg-white/10 rounded" style={{ width: `${w}%`, flex: 1 }} />)}</div>)}
                        </div>
                      )}
                      {item.name === "Container" && <div className="h-10 border border-dashed border-white/10 rounded flex items-center justify-center text-[8px] text-white/40">Drop children here</div>}
                      {item.name === "Heading" && <div className="h-3 w-2/3 bg-white/10 rounded" />}
                      {item.name === "Button" && <div className="h-6 w-24 bg-cyan-500/20 border border-cyan-500/30 rounded flex items-center justify-center text-[8px] text-cyan-300">Submit</div>}
                      {!["Navbar", "Data Table", "Container", "Heading", "Button"].includes(item.name) && (
                        <div className="space-y-1.5">
                          <div className="h-1.5 w-3/4 bg-white/10 rounded" />
                          <div className="h-1.5 w-1/2 bg-white/10 rounded" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {canvasItems.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-48 text-white/40">
                    <span className="text-2xl mb-2">+</span>
                    <span className="text-xs">Click a component to add it</span>
                  </div>
                )}
              </div>
              </motion.div>
            </div>
          </div>

          {/* ── Right Sidebar — Dynamic Properties ── */}
          <aside className="w-60 shrink-0 border-l border-white/10 bg-[#0D1525] flex flex-col min-h-0">
            <div className="p-3 border-b border-white/10 shrink-0">
              <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2">Properties</p>
              {props && (
                <div className="flex gap-0.5 bg-white/5 rounded-lg p-0.5">
                  {(["style", "data", "events"] as const).map((t) => (
                    <button key={t} onClick={() => setPropsTab(t)} className={`flex-1 text-[9px] py-1 rounded capitalize transition-colors ${propsTab === t ? "bg-cyan-500/20 text-cyan-300" : "text-white/50 hover:text-white/70"}`}>{t}</button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {props ? (
                <>
                  {/* Component Name */}
                  <div className="mb-3">
                    <label className="text-[10px] text-white/50 block mb-1">Component</label>
                    <div className="px-2.5 py-1.5 bg-white/5 rounded-lg text-xs border border-white/10 text-white/90 font-medium">{selectedComponent}</div>
                  </div>

                  {propsTab === "style" && (
                    <div className="space-y-3">
                      {/* Dimensions */}
                      <div><label className="text-[10px] text-white/50 block mb-1">Dimensions</label>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="px-2 py-1 bg-white/5 rounded text-[10px] border border-white/10 text-center text-white/80"><span className="text-white/40">W </span>{props.width}</div>
                          <div className="px-2 py-1 bg-white/5 rounded text-[10px] border border-white/10 text-center text-white/80"><span className="text-white/40">H </span>{props.height}</div>
                        </div>
                      </div>
                      {/* Padding */}
                      <div><label className="text-[10px] text-white/50 block mb-1">Padding</label>
                        <div className="grid grid-cols-4 gap-1">
                          {props.padding.map((v, i) => <div key={i} className="px-1 py-0.5 bg-white/5 rounded text-[10px] border border-white/10 text-center text-white/70">{v}</div>)}
                        </div>
                      </div>
                      {/* Margin */}
                      <div><label className="text-[10px] text-white/50 block mb-1">Margin</label>
                        <div className="grid grid-cols-4 gap-1">
                          {props.margin.map((v, i) => <div key={i} className="px-1 py-0.5 bg-white/5 rounded text-[10px] border border-white/10 text-center text-white/70">{v}</div>)}
                        </div>
                      </div>
                      {/* Background */}
                      <div><label className="text-[10px] text-white/50 block mb-1">Background</label>
                        <div className="flex items-center gap-2 px-2 py-1.5 bg-white/5 rounded border border-white/10">
                          <span className="w-4 h-4 rounded border border-white/20 shrink-0" style={{ backgroundColor: props.bgHex === "transparent" ? "transparent" : props.bgHex }} />
                          <span className="text-[10px] font-mono text-white/70">{props.bgHex}</span>
                        </div>
                      </div>
                      {/* Border */}
                      <div><label className="text-[10px] text-white/50 block mb-1">Border</label>
                        <div className="flex gap-1">
                          <div className="flex-1 px-2 py-1 bg-white/5 rounded text-[10px] border border-white/10 text-white/70">{props.border}px</div>
                          <div className="flex-1 px-2 py-1 bg-white/5 rounded text-[10px] border border-white/10 text-white/70">{props.borderStyle}</div>
                          <div className="flex-1 px-2 py-1 bg-white/5 rounded text-[10px] border border-white/10 text-white/60 font-mono">{props.borderColor}</div>
                        </div>
                      </div>
                      {/* Radius */}
                      <div><label className="text-[10px] text-white/50 block mb-1">Radius</label>
                        <div className="px-2 py-1 bg-white/5 rounded text-[10px] border border-white/10 text-white/70">{props.radius}</div>
                      </div>
                      {/* Typography */}
                      <div><label className="text-[10px] text-white/50 block mb-1">Typography</label>
                        <div className="space-y-1">
                          <div className="flex gap-1">
                            <div className="flex-1 px-2 py-1 bg-white/5 rounded text-[10px] border border-white/10 text-white/70">{props.font}</div>
                            <div className="w-12 px-2 py-1 bg-white/5 rounded text-[10px] border border-white/10 text-center text-white/70">{props.fontSize}</div>
                          </div>
                          <div className="flex gap-1">
                            <div className="flex-1 px-2 py-1 bg-white/5 rounded text-[10px] border border-white/10 text-white/70">{props.fontWeight}</div>
                            <div className="flex-1 px-2 py-1 bg-white/5 rounded text-[10px] border border-white/10 text-white/70">{props.lineHeight}</div>
                            <div className="flex-1 px-2 py-1 bg-white/5 rounded text-[10px] border border-white/10 text-white/60 font-mono flex items-center gap-1">
                              <span className="w-2 h-2 rounded" style={{ backgroundColor: props.textColor }} />
                              {props.textColor}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Overflow */}
                      <div><label className="text-[10px] text-white/50 block mb-1">Overflow</label>
                        <div className="px-2 py-1 bg-white/5 rounded text-[10px] border border-white/10 text-white/70">{props.overflow}</div>
                      </div>
                      {/* Opacity */}
                      <div><label className="text-[10px] text-white/50 block mb-1">Opacity</label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full relative">
                            <div className="h-full bg-cyan-500/60 rounded-full" style={{ width: props.opacity }} />
                            <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-[#0D1525]" style={{ left: `calc(${props.opacity} - 5px)` }} />
                          </div>
                          <span className="text-[10px] text-white/60 w-8 text-right">{props.opacity}</span>
                        </div>
                      </div>
                      {/* Visibility */}
                      <div><label className="text-[10px] text-white/50 block mb-1">Visibility</label>
                        <div className="px-2 py-1.5 bg-white/5 rounded text-[10px] border border-white/10 flex items-center gap-2">
                          <span className={`w-7 h-3.5 rounded-full relative transition-colors ${props.visible ? "bg-cyan-500/50" : "bg-white/10"}`}>
                            <span className={`absolute top-0.5 w-2.5 h-2.5 rounded-full transition-all ${props.visible ? "right-0.5 bg-cyan-400" : "left-0.5 bg-white/40"}`} />
                          </span>
                          <span className="text-white/60">{props.visible ? "Visible" : "Hidden"}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {propsTab === "data" && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Data Source</label>
                        {props.dataSource ? (
                          <div className="px-2.5 py-2 bg-cyan-500/5 rounded-lg text-[10px] border border-cyan-500/20 text-cyan-300 flex items-center gap-1.5">
                            <span className="text-cyan-400"><SvgIcon name="api" size={10} /></span> {props.dataSource}
                          </div>
                        ) : (
                          <div className="px-2.5 py-2 bg-white/3 rounded-lg text-[10px] border border-dashed border-white/10 text-white/30 text-center">
                            No data source — click to bind
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Transform</label>
                        <div className="px-2.5 py-2 bg-white/3 rounded-lg text-[10px] border border-white/10 text-white/40 font-mono">
                          {props.dataSource ? "response.data.map(item => item)" : "—"}
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Default Value</label>
                        <div className="px-2.5 py-2 bg-white/3 rounded-lg text-[10px] border border-white/10 text-white/40 font-mono">
                          {props.dataSource ? "[]" : "null"}
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Loading State</label>
                        <div className="px-2 py-1.5 bg-white/5 rounded text-[10px] border border-white/10 text-white/60">Show Skeleton</div>
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Error State</label>
                        <div className="px-2 py-1.5 bg-white/5 rounded text-[10px] border border-white/10 text-white/60">Show Error Message</div>
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50 block mb-1">Refresh Interval</label>
                        <div className="px-2 py-1 bg-white/5 rounded text-[10px] border border-white/10 text-white/60">Off</div>
                      </div>
                    </div>
                  )}

                  {propsTab === "events" && (
                    <div className="space-y-3">
                      <label className="text-[10px] text-white/50 block">Event Handlers</label>
                      {props.events.length > 0 ? (
                        <div className="space-y-1.5">
                          {props.events.map((ev, i) => (
                            <div key={i} className="px-2.5 py-2 bg-white/5 rounded-lg text-[10px] border border-white/10 flex justify-between items-center">
                              <span className="text-white/70 font-medium">{ev.name}</span>
                              <span className="text-cyan-400/80">{ev.action}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="px-2.5 py-3 bg-white/3 rounded-lg text-[10px] border border-dashed border-white/10 text-white/30 text-center">
                          No events configured
                        </div>
                      )}
                      <button className="w-full text-[10px] px-2.5 py-1.5 rounded-lg border border-dashed border-white/15 text-white/40 hover:text-white/60 hover:border-white/25 transition-colors">
                        + Add Event Handler
                      </button>
                      <div className="border-t border-white/10 pt-3">
                        <label className="text-[10px] text-white/50 block mb-1">Animations</label>
                        <div className="space-y-1.5">
                          <div className="px-2.5 py-1.5 bg-white/5 rounded text-[10px] border border-white/10 flex justify-between">
                            <span className="text-white/60">onMount</span>
                            <span className="text-white/40">Fade In (300ms)</span>
                          </div>
                          <div className="px-2.5 py-1.5 bg-white/5 rounded text-[10px] border border-white/10 flex justify-between">
                            <span className="text-white/60">onHover</span>
                            <span className="text-white/40">—</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-xs text-white/30 flex flex-col items-center gap-2 pt-8">
                  <span className="opacity-50"><SvgIcon name="container" size={24} /></span>
                  <span>Select a component</span>
                  <span className="text-[10px] text-white/20">to view its properties</span>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* ── Bottom Panels ── */}
        {/* Tab bar */}
        <div className="h-8 flex items-center border-t border-white/10 bg-[#0A1020] shrink-0 px-2 gap-0.5">
          {bottomTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setBottomPanel(bottomPanel === tab.key ? "none" : tab.key)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] transition-colors ${bottomPanel === tab.key ? "bg-cyan-500/15 text-cyan-300" : "text-white/40 hover:text-white/60 hover:bg-white/5"}`}
            >
              <span><SvgIcon name={tab.icon} size={12} /></span>
              {tab.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-[9px] text-white/40 font-mono">
            <span className="px-1.5 py-0.5 rounded bg-green-500/15 text-green-400">Connected</span>
            <span>v2.4.1</span>
          </div>
        </div>

        {/* Panel content */}
        <AnimatePresence>
          {bottomPanel !== "none" && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 260 }}
              exit={{ height: 0 }}
              className="border-t border-white/10 bg-[#0B1120] overflow-hidden shrink-0"
            >
              <div className="h-65 overflow-auto">

                {/* ── API Connector ── */}
                {bottomPanel === "api" && (
                  <div className="flex h-full">
                    {/* Endpoint list */}
                    <div className="w-56 border-r border-white/10 overflow-y-auto shrink-0">
                      <div className="p-2 border-b border-white/10 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Endpoints</span>
                        <button className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 transition-colors">+ New</button>
                      </div>
                      {sampleApiEndpoints.map((ep, i) => (
                        <button key={i} onClick={() => setActiveApiIdx(i)} className={`w-full text-left px-3 py-2 border-b border-white/5 transition-colors ${activeApiIdx === i ? "bg-cyan-500/10" : "hover:bg-white/3"}`}>
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${methodColor[ep.method]}`}>{ep.method}</span>
                            <span className="text-[10px] text-white/60 truncate">{ep.name}</span>
                          </div>
                          <p className="text-[9px] text-white/40 font-mono mt-0.5 truncate">{ep.url}</p>
                        </button>
                      ))}
                    </div>
                    {/* Request/Response */}
                    <div className="flex-1 p-3 overflow-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded ${methodColor[sampleApiEndpoints[activeApiIdx].method]}`}>{sampleApiEndpoints[activeApiIdx].method}</span>
                        <div className="flex-1 px-2 py-1 bg-white/5 rounded text-xs font-mono border border-white/10 text-white/60">{sampleApiEndpoints[activeApiIdx].url}</div>
                        <button className="text-[10px] px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors">Send</button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[9px] font-mono text-white/50 mb-1">Headers</p>
                          <div className="p-2 bg-white/3 rounded border border-white/10 font-mono text-[10px] text-white/60 space-y-0.5">
                            <div><span className="text-cyan-400/60">Content-Type</span>: application/json</div>
                            <div><span className="text-cyan-400/60">Authorization</span>: Bearer ••••••</div>
                            <div><span className="text-cyan-400/60">X-Request-ID</span>: auto-generated</div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-[9px] font-mono text-white/50">Response</p>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/15 text-green-400 font-mono">{sampleApiEndpoints[activeApiIdx].status}</span>
                              <span className="text-[9px] text-white/20 font-mono">{sampleApiEndpoints[activeApiIdx].time}</span>
                            </div>
                          </div>
                          <div className="p-2 bg-white/3 rounded border border-white/10 font-mono text-[10px] text-white/60">
                            <div className="text-white/20">{"{"}</div>
                            <div className="pl-3"><span className="text-cyan-400/60">&quot;status&quot;</span>: <span className="text-green-400/60">&quot;success&quot;</span>,</div>
                            <div className="pl-3"><span className="text-cyan-400/60">&quot;data&quot;</span>: [{"{ ... }"}],</div>
                            <div className="pl-3"><span className="text-cyan-400/60">&quot;total&quot;</span>: <span className="text-amber-400/60">247</span>,</div>
                            <div className="pl-3"><span className="text-cyan-400/60">&quot;page&quot;</span>: <span className="text-amber-400/60">1</span></div>
                            <div className="text-white/20">{"}"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── JSON Visualizer ── */}
                {bottomPanel === "json" && (
                  <div className="flex h-full">
                    <div className="flex-1 p-3 overflow-auto">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">JSON Viewer</p>
                        <div className="flex gap-1">
                          <button className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/40 hover:text-white/60 transition-colors">Tree</button>
                          <button className="text-[9px] px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300">Raw</button>
                          <button className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/40 hover:text-white/60 transition-colors">Table</button>
                        </div>
                      </div>
                      <div className="p-3 bg-white/3 rounded-lg border border-white/10 font-mono text-[10px] leading-relaxed">
                        <div className="text-white/20">{"{"}</div>
                        {Object.entries(sampleJson).map(([key, value]) => (
                          <div key={key} className="pl-4">
                            <span className="text-cyan-400/70">&quot;{key}&quot;</span>
                            <span className="text-white/20">: </span>
                            {typeof value === "object" && !Array.isArray(value) ? (
                              <>
                                <span className="text-white/20">{"{"}</span>
                                {Object.entries(value).map(([k, v], i, arr) => (
                                  <div key={k} className="pl-4">
                                    <span className="text-purple-400/70">&quot;{k}&quot;</span>
                                    <span className="text-white/20">: </span>
                                    <span className={typeof v === "string" ? "text-green-400/70" : typeof v === "boolean" ? "text-amber-400/70" : "text-amber-400/70"}>
                                      {typeof v === "string" ? `"${v}"` : String(v)}
                                    </span>
                                    {i < arr.length - 1 && <span className="text-white/20">,</span>}
                                  </div>
                                ))}
                                <span className="text-white/20">{"}"}</span><span className="text-white/20">,</span>
                              </>
                            ) : Array.isArray(value) ? (
                              <>
                                <span className="text-white/20">[</span>
                                {value.map((v, i) => (
                                  <span key={i} className="text-green-400/70">&quot;{v}&quot;{i < value.length - 1 ? <span className="text-white/20">, </span> : ""}</span>
                                ))}
                                <span className="text-white/20">]</span><span className="text-white/20">,</span>
                              </>
                            ) : null}
                          </div>
                        ))}
                        <div className="text-white/20">{"}"}</div>
                      </div>
                    </div>
                    {/* JSON Stats */}
                    <div className="w-48 border-l border-white/10 p-3 shrink-0">
                      <p className="text-[9px] font-mono text-white/30 mb-2">Stats</p>
                      <div className="space-y-2 text-[10px]">
                        <div className="flex justify-between"><span className="text-white/40">Keys</span><span className="text-white/70">{Object.keys(sampleJson).length}</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Depth</span><span className="text-white/70">2</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Size</span><span className="text-white/70">284 B</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Valid</span><span className="text-green-400"><SvgIcon name="check" size={10} /></span></div>
                      </div>
                      <p className="text-[9px] font-mono text-white/30 mt-4 mb-2">Types</p>
                      <div className="space-y-1 text-[10px]">
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-green-500/60" /><span className="text-white/40">Strings: 6</span></div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-amber-500/60" /><span className="text-white/40">Numbers: 1</span></div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-blue-500/60" /><span className="text-white/40">Booleans: 1</span></div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-purple-500/60" /><span className="text-white/40">Arrays: 1</span></div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-cyan-500/60" /><span className="text-white/40">Objects: 4</span></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── DB Viewer ── */}
                {bottomPanel === "db" && (
                  <div className="flex h-full">
                    {/* Table list */}
                    <div className="w-48 border-r border-white/10 overflow-y-auto shrink-0">
                      <div className="p-2 border-b border-white/10">
                        <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Tables</p>
                        <p className="text-[9px] text-white/40 font-mono mt-0.5">PostgreSQL</p>
                      </div>
                      {sampleDbTables.map((t, i) => (
                        <button key={t.name} onClick={() => setActiveDbTable(i)} className={`w-full text-left px-3 py-2 border-b border-white/5 transition-colors ${activeDbTable === i ? "bg-cyan-500/10" : "hover:bg-white/3"}`}>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px]"><SvgIcon name="db-table" size={10} /></span>
                            <span className="text-[10px] text-white/70">{t.name}</span>
                          </div>
                          <p className="text-[9px] text-white/40 font-mono mt-0.5">{t.rows.toLocaleString()} rows • {t.columns.length} cols</p>
                        </button>
                      ))}
                    </div>
                    {/* Table data */}
                    <div className="flex-1 overflow-auto">
                      <div className="p-2 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-white/60">{sampleDbTables[activeDbTable].name}</span>
                          <span className="text-[9px] text-white/40">{sampleDbTables[activeDbTable].rows.toLocaleString()} rows</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded border border-white/10">
                            <span className="text-[9px] text-white/50">SQL</span>
                            <span className="text-[10px] font-mono text-white/60">SELECT * FROM {sampleDbTables[activeDbTable].name} LIMIT 50</span>
                          </div>
                          <button className="text-[9px] px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300">Run</button>
                        </div>
                      </div>
                      <table className="w-full text-[10px]">
                        <thead>
                          <tr className="bg-white/3">
                            {sampleDbTables[activeDbTable].columns.map((col) => (
                              <th key={col} className="text-left px-3 py-1.5 text-white/40 font-medium border-r border-white/5 last:border-r-0">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sampleDbTables[activeDbTable].data.map((row, i) => (
                            <tr key={i} className="border-t border-white/5 hover:bg-white/2">
                              {sampleDbTables[activeDbTable].columns.map((col) => (
                                <td key={col} className="px-3 py-1.5 font-mono text-white/70 border-r border-white/5 last:border-r-0">
                                  {String((row as Record<string, unknown>)[col] ?? "")}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ── Workflows ── */}
                {bottomPanel === "workflows" && (
                  <div className="p-3 overflow-auto h-full">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Workflows</p>
                      <button className="text-[9px] px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 transition-colors">+ New Workflow</button>
                    </div>
                    <div className="space-y-3">
                      {sampleWorkflows.map((wf) => (
                        <div key={wf.name} className="p-3 rounded-lg bg-white/3 border border-white/10">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-xs text-white/80 font-medium">{wf.name}</p>
                              <p className="text-[9px] text-white/50">Trigger: {wf.trigger}</p>
                            </div>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/15 text-green-400">Active</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {wf.steps.map((step, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <span className={`text-[9px] px-2 py-1 rounded border ${stepColor[step.type]}`}>{step.label}</span>
                                {i < wf.steps.length - 1 && <span className="text-white/20 text-[10px]">→</span>}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Console/Logs ── */}
                {bottomPanel === "logs" && (
                  <div className="p-3 overflow-auto h-full font-mono text-[10px]">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Console</p>
                      <button className="text-[9px] px-2 py-0.5 rounded text-white/30 hover:text-white/50 hover:bg-white/5 transition-colors">Clear</button>
                    </div>
                    <div className="space-y-0.5">
                      {sampleLogs.map((log, i) => (
                        <div key={i} className="flex items-start gap-2 py-0.5">
                          <span className="text-white/40 shrink-0">{log.time}</span>
                          <span className={`shrink-0 w-12 ${log.level === "error" ? "text-red-400" : log.level === "warn" ? "text-amber-400" : log.level === "success" ? "text-green-400" : "text-white/30"}`}>[{log.level}]</span>
                          <span className={`${log.level === "error" ? "text-red-300/70" : log.level === "warn" ? "text-amber-300/70" : log.level === "success" ? "text-green-300/70" : "text-white/40"}`}>{log.msg}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 py-1 mt-1">
                        <span className="text-cyan-400/60">›</span>
                        <span className="text-white/20 animate-pulse">_</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Code Generation Panel ── */}
                {bottomPanel === "code" && (
                  <div className="flex h-full">
                    <div className="flex-1 p-3 overflow-auto">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Generated Code</p>
                        <div className="flex gap-1">
                          {(["react", "html", "css"] as const).map((f) => (
                            <button key={f} onClick={() => setCodeFormat(f)} className={`text-[9px] px-2 py-0.5 rounded uppercase transition-colors ${codeFormat === f ? "bg-cyan-500/15 text-cyan-300" : "bg-white/5 text-white/40 hover:text-white/60"}`}>{f}</button>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 bg-white/3 rounded-lg border border-white/10 font-mono text-[10px] leading-relaxed overflow-auto max-h-50">
                        <pre className="whitespace-pre-wrap">
                          {generateCode().split("\n").map((line, i) => (
                            <div key={i} className="flex">
                              <span className="text-white/20 w-6 shrink-0 text-right mr-3 select-none">{i + 1}</span>
                              <span className={
                                line.includes("function") || line.includes("<!DOCTYPE") || line.includes(":root")
                                  ? "text-purple-400/80"
                                  : line.includes("className") || line.includes("class=")
                                    ? "text-cyan-400/70"
                                    : line.includes("//") || line.includes("<!--")
                                      ? "text-white/30"
                                      : line.includes("<") || line.includes("/>")
                                        ? "text-amber-400/70"
                                        : "text-white/60"
                              }>{line}</span>
                            </div>
                          ))}
                        </pre>
                      </div>
                    </div>
                    <div className="w-48 border-l border-white/10 p-3 shrink-0">
                      <p className="text-[9px] font-mono text-white/30 mb-2">Export</p>
                      <div className="space-y-1.5">
                        <button className="w-full text-[9px] px-2 py-1.5 rounded bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 transition-colors">Copy to Clipboard</button>
                        <button className="w-full text-[9px] px-2 py-1.5 rounded bg-white/5 text-white/50 hover:bg-white/10 transition-colors">Download File</button>
                        <button className="w-full text-[9px] px-2 py-1.5 rounded bg-white/5 text-white/50 hover:bg-white/10 transition-colors">Open in CodeSandbox</button>
                      </div>
                      <p className="text-[9px] font-mono text-white/30 mt-4 mb-2">Stats</p>
                      <div className="space-y-1 text-[10px]">
                        <div className="flex justify-between"><span className="text-white/40">Components</span><span className="text-white/70">{canvasItems.length}</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Lines</span><span className="text-white/70">{generateCode().split("\n").length}</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Format</span><span className="text-cyan-400 uppercase">{codeFormat}</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Page</span><span className="text-white/70">{pages.find((p) => p.id === currentPageId)?.label}</span></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Theme / Design Token Editor ── */}
                {bottomPanel === "theme" && (
                  <div className="flex h-full">
                    <div className="flex-1 p-3 overflow-auto">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Design Tokens</p>
                        <div className="flex gap-1 items-center">
                          <button onClick={() => setThemeMode("light")} className={`text-[9px] px-2 py-0.5 rounded transition-colors ${themeMode === "light" ? "bg-amber-500/15 text-amber-300" : "bg-white/5 text-white/40"}`}><SvgIcon name="sun" size={9} className="inline mr-0.5" /> Light</button>
                          <button onClick={() => setThemeMode("dark")} className={`text-[9px] px-2 py-0.5 rounded transition-colors ${themeMode === "dark" ? "bg-indigo-500/15 text-indigo-300" : "bg-white/5 text-white/40"}`}><SvgIcon name="moon" size={9} className="inline mr-0.5" /> Dark</button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Colors */}
                        <div>
                          <p className="text-[9px] font-mono text-white/40 mb-2">Colors</p>
                          <div className="space-y-1">
                            {Object.entries(defaultThemeTokens[themeMode]).filter(([k]) => !["radius", "fontBase", "fontHeading", "spacing"].includes(k)).map(([key, val]) => (
                              <div key={key} className="flex items-center gap-2 px-2 py-1 bg-white/3 rounded border border-white/10">
                                <span className="w-4 h-4 rounded border border-white/20 shrink-0" style={{ backgroundColor: val }} />
                                <span className="text-[9px] text-white/50 flex-1">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                                <span className="text-[9px] font-mono text-white/60">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Typography + Spacing */}
                        <div>
                          <p className="text-[9px] font-mono text-white/40 mb-2">Typography & Spacing</p>
                          <div className="space-y-1">
                            <div className="px-2 py-1.5 bg-white/3 rounded border border-white/10 flex justify-between">
                              <span className="text-[9px] text-white/50">Base Font Size</span>
                              <span className="text-[9px] font-mono text-white/70">{defaultThemeTokens[themeMode].fontBase}</span>
                            </div>
                            <div className="px-2 py-1.5 bg-white/3 rounded border border-white/10 flex justify-between">
                              <span className="text-[9px] text-white/50">Heading Font Size</span>
                              <span className="text-[9px] font-mono text-white/70">{defaultThemeTokens[themeMode].fontHeading}</span>
                            </div>
                            <div className="px-2 py-1.5 bg-white/3 rounded border border-white/10 flex justify-between">
                              <span className="text-[9px] text-white/50">Border Radius</span>
                              <span className="text-[9px] font-mono text-white/70">{defaultThemeTokens[themeMode].radius}</span>
                            </div>
                            <div className="px-2 py-1.5 bg-white/3 rounded border border-white/10 flex justify-between">
                              <span className="text-[9px] text-white/50">Base Spacing</span>
                              <span className="text-[9px] font-mono text-white/70">{defaultThemeTokens[themeMode].spacing}</span>
                            </div>
                          </div>
                          <p className="text-[9px] font-mono text-white/40 mt-3 mb-2">Scale Preview</p>
                          <div className="flex items-end gap-1">
                            {[4, 8, 12, 16, 24, 32, 48].map((s) => (
                              <div key={s} className="flex flex-col items-center gap-0.5">
                                <div className="bg-cyan-500/30 rounded" style={{ width: s / 2, height: s }} />
                                <span className="text-[7px] text-white/30">{s}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Preview swatch */}
                    <div className="w-48 border-l border-white/10 p-3 shrink-0">
                      <p className="text-[9px] font-mono text-white/30 mb-2">Preview</p>
                      <div className="rounded-lg overflow-hidden border border-white/10" style={{ backgroundColor: defaultThemeTokens[themeMode].bgPrimary }}>
                        <div className="px-3 py-2 border-b" style={{ borderColor: defaultThemeTokens[themeMode].border, backgroundColor: defaultThemeTokens[themeMode].bgSecondary }}>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          </div>
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="h-2 w-2/3 rounded" style={{ backgroundColor: defaultThemeTokens[themeMode].textPrimary }} />
                          <div className="h-1.5 w-full rounded" style={{ backgroundColor: defaultThemeTokens[themeMode].textMuted }} />
                          <div className="h-5 w-16 rounded flex items-center justify-center" style={{ backgroundColor: defaultThemeTokens[themeMode].accent, borderRadius: defaultThemeTokens[themeMode].radius }}>
                            <span className="text-[7px]" style={{ color: themeMode === "dark" ? "#FFF" : "#FFF" }}>Button</span>
                          </div>
                          <div className="p-2 rounded" style={{ backgroundColor: defaultThemeTokens[themeMode].bgSurface, border: `1px solid ${defaultThemeTokens[themeMode].border}` }}>
                            <div className="h-1 w-3/4 rounded" style={{ backgroundColor: defaultThemeTokens[themeMode].textSecondary }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Accessibility Checker ── */}
                {bottomPanel === "a11y" && (
                  <div className="p-3 overflow-auto h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Accessibility Audit</p>
                        <div className="flex items-center gap-2 text-[9px]">
                          <span className="px-1.5 py-0.5 rounded bg-red-500/15 text-red-400">{sampleA11yIssues.filter((i) => i.severity === "error").length} Errors</span>
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400">{sampleA11yIssues.filter((i) => i.severity === "warning").length} Warnings</span>
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400">{sampleA11yIssues.filter((i) => i.severity === "info").length} Info</span>
                        </div>
                      </div>
                      <button className="text-[9px] px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 transition-colors">Re-scan</button>
                    </div>
                    <div className="space-y-1.5">
                      {sampleA11yIssues.map((issue, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-3 p-2.5 rounded-lg border transition-colors cursor-pointer hover:bg-white/3 ${
                            issue.severity === "error"
                              ? "border-red-500/20 bg-red-500/5"
                              : issue.severity === "warning"
                                ? "border-amber-500/20 bg-amber-500/5"
                                : "border-blue-500/20 bg-blue-500/5"
                          }`}
                          onClick={() => setSelectedComponent(issue.component)}
                        >
                          <span className={`text-[10px] shrink-0 mt-0.5 ${issue.severity === "error" ? "text-red-400" : issue.severity === "warning" ? "text-amber-400" : "text-blue-400"}`}>
                            <SvgIcon name={issue.severity === "error" ? "x" : issue.severity === "warning" ? "warning" : "info"} size={10} />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] text-white/80 font-medium">{issue.component}</span>
                              <span className="text-[8px] font-mono text-white/30">WCAG {issue.rule}</span>
                            </div>
                            <p className="text-[10px] text-white/50">{issue.issue}</p>
                            <p className="text-[9px] text-cyan-400/60 mt-0.5">Fix: {issue.suggestion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── AI Assistant Chat Widget ── */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="mb-3 w-80 bg-[#0D1525] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-linear-to-br from-cyan-500 to-purple-500 flex items-center justify-center"><SvgIcon name="sparkle" size={10} /></span>
                  <div>
                    <p className="text-xs text-white/90 font-medium">AI Assistant</p>
                    <p className="text-[8px] text-green-400/80">Online</p>
                  </div>
                </div>
                <button onClick={() => setShowChat(false)} className="text-white/40 hover:text-white/60 text-xs"><SvgIcon name="x" size={12} /></button>
              </div>
              <div className="h-56 overflow-y-auto p-3 space-y-2">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] px-3 py-2 rounded-xl text-[11px] leading-relaxed ${msg.role === "user" ? "bg-cyan-500/20 text-cyan-100 rounded-br-sm" : "bg-white/5 text-white/70 rounded-bl-sm"}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-white/10">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") sendChat(); }}
                    placeholder="Ask AI something..."
                    className="flex-1 bg-white/5 rounded-lg px-3 py-1.5 text-xs text-white/80 placeholder:text-white/30 outline-none border border-white/10 focus:border-cyan-500/40"
                  />
                  <button onClick={sendChat} className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs hover:bg-cyan-500/30 transition-colors">Send</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setShowChat(!showChat)}
          className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 ${showChat ? "bg-white/10 text-white/60" : "bg-linear-to-br from-cyan-500 to-purple-500 text-white"}`}
        >
          <span className="text-lg"><SvgIcon name={showChat ? "x" : "sparkle"} size={18} /></span>
        </button>
      </div>

      {/* ── Deploy Pipeline Modal ── */}
      <AnimatePresence>
        {showDeployModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDeployModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0D1525] border border-white/10 rounded-2xl p-6 w-120 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-white/90">Deploy Pipeline</h3>
                <button onClick={() => setShowDeployModal(false)} className="text-white/40 hover:text-white/60 text-xs"><SvgIcon name="x" size={12} /></button>
              </div>
              <div className="space-y-3">
                {deploySteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500 ${
                      step.status === "done" ? "border-green-500 bg-green-500/20" :
                      step.status === "running" ? "border-cyan-500 bg-cyan-500/20 animate-pulse" :
                      "border-white/20 bg-white/5"
                    }`}>
                      {step.status === "done" ? (
                        <span className="text-green-400"><SvgIcon name="check" size={12} /></span>
                      ) : step.status === "running" ? (
                        <span className="text-cyan-400 animate-spin"><SvgIcon name="spinner" size={12} /></span>
                      ) : (
                        <span className="text-white/30 text-xs">{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-medium transition-colors ${step.status === "done" ? "text-green-400" : step.status === "running" ? "text-cyan-300" : "text-white/40"}`}>{step.label}</p>
                      <p className="text-[9px] text-white/30">
                        {step.status === "done" ? "Completed" : step.status === "running" ? "In progress..." : "Waiting"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {deploySteps.every((s) => s.status === "done") && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center"
                >
                  <p className="text-green-400 text-sm font-semibold mb-1">Deployed Successfully!</p>
                  <p className="text-[10px] text-white/40 font-mono">https://my-app-abc123.vercel.app</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PrototypeShell>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EHR PLATFORM PROTOTYPE — Indian Daycare Specialities
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
type EHRModule = "dashboard"|"registration"|"opd"|"daycare"|"procedure"|"nursing"|"pharmacy"|"lab"|"billing"|"discharge"|"mis"|"consultation";

/* ── Sample data ── */
const ehrSpecialties = [
  { key:"ophthalmology", label:"Ophthalmology", color:"#8B5CF6", icon:"eye" },
  { key:"ent", label:"ENT", color:"#F97316", icon:"ear" },
  { key:"ortho", label:"Orthopedics", color:"#F97316", icon:"bone" },
  { key:"cardio", label:"Cardiology", color:"#EF4444", icon:"heart" },
  { key:"gastro", label:"Gastroenterology", color:"#EAB308", icon:"stomach" },
  { key:"urology", label:"Urology", color:"#3B82F6", icon:"kidney" },
  { key:"gynec", label:"Gynecology", color:"#EC4899", icon:"female" },
  { key:"dental", label:"Dental Surgery", color:"#14B8A6", icon:"tooth" },
  { key:"onco", label:"Oncology", color:"#EC4899", icon:"cell" },
  { key:"nephro", label:"Nephrology", color:"#14B8A6", icon:"dialysis" },
  { key:"pulmo", label:"Pulmonology", color:"#06B6D4", icon:"lung" },
  { key:"pain", label:"Pain Management", color:"#F59E0B", icon:"nerve" },
  { key:"pedia", label:"Pediatrics", color:"#A78BFA", icon:"child" },
  { key:"gensurg", label:"General Surgery", color:"#10B981", icon:"scalpel" },
  { key:"derm", label:"Dermatology", color:"#F472B6", icon:"skin" },
  { key:"radiology", label:"Interventional Radiology", color:"#64748B", icon:"scan" },
];

const ehrPatients = [
  { id:"P-240001", name:"Rajesh Kumar Sharma", abha:"91-2847-1920-3845", age:58, gender:"M", blood:"B+", phone:"98765 43210", allergy:["Sulfa drugs","Iodine contrast"], insurance:"Star Health — Gold", pmjay:false, specialty:"ophthalmology", status:"admitted", doctor:"Dr. Priya Mehta", procedure:"Phaco + IOL (Left Eye)", bay:"Bay 3", uhid:"UHID-00284719" },
  { id:"P-240002", name:"Sunita Devi Patil", abha:"91-3928-4720-1938", age:42, gender:"F", blood:"O+", phone:"87654 32109", allergy:["Penicillin"], insurance:"PMJAY", pmjay:true, specialty:"gynec", status:"pre-auth", doctor:"Dr. Kavitha Reddy", procedure:"Hysteroscopy", bay:"—", uhid:"UHID-00284720" },
  { id:"P-240003", name:"Mohammad Arif Khan", abha:"91-4839-2710-5839", age:65, gender:"M", blood:"A+", phone:"76543 21098", allergy:[], insurance:"CGHS", pmjay:false, specialty:"cardio", status:"in-procedure", doctor:"Dr. Aman Gupta", procedure:"Coronary Angiography", bay:"Cath Lab", uhid:"UHID-00284721" },
  { id:"P-240004", name:"Lakshmi Narayanan", abha:"91-5720-3841-9274", age:35, gender:"F", blood:"AB+", phone:"65432 10987", allergy:["Latex"], insurance:"Self Pay", pmjay:false, specialty:"ent", status:"scheduled", doctor:"Dr. Suresh Nair", procedure:"FESS (Bilateral)", bay:"—", uhid:"UHID-00284722" },
  { id:"P-240005", name:"Vikram Singh Chauhan", abha:"91-6831-4920-3847", age:48, gender:"M", blood:"O-", phone:"54321 09876", allergy:[], insurance:"ICICI Lombard", pmjay:false, specialty:"ortho", status:"recovery", doctor:"Dr. Rajat Chopra", procedure:"Knee Arthroscopy (Right)", bay:"Recovery 2", uhid:"UHID-00284723" },
  { id:"P-240006", name:"Anita Kumari", abha:"91-7942-5031-4928", age:52, gender:"F", blood:"B-", phone:"43210 98765", allergy:["Aspirin"], insurance:"PMJAY", pmjay:true, specialty:"onco", status:"admitted", doctor:"Dr. Meena Iyer", procedure:"IV Chemotherapy — Cycle 4", bay:"Chemo Bay 1", uhid:"UHID-00284724" },
  { id:"P-240007", name:"Ravi Prasad Joshi", abha:"91-8053-6142-5039", age:70, gender:"M", blood:"A-", phone:"32109 87654", allergy:["Metformin"], insurance:"ECHS", pmjay:false, specialty:"nephro", status:"in-procedure", doctor:"Dr. Alok Verma", procedure:"Hemodialysis Session", bay:"Dialysis 3", uhid:"UHID-00284725" },
  { id:"P-240008", name:"Priya Chakraborty", abha:"91-9164-7253-6140", age:28, gender:"F", blood:"O+", phone:"21098 76543", allergy:[], insurance:"Self Pay", pmjay:false, specialty:"derm", status:"scheduled", doctor:"Dr. Sneha Das", procedure:"Laser Scar Revision", bay:"—", uhid:"UHID-00284726" },
  { id:"P-240009", name:"Harish Menon", abha:"91-0275-8364-7251", age:32, gender:"M", blood:"A+", phone:"10987 65432", allergy:["Lignocaine (mild)"], insurance:"Niva Bupa", pmjay:false, specialty:"dental", status:"admitted", doctor:"Dr. Arun Shetty", procedure:"Surgical Extraction #38 (Impacted)", bay:"Dental OT", uhid:"UHID-00284727" },
];

/* ── Specialty-specific clinical data ── */
const ophthalmologyExam = {
  visualAcuity: {
    right: { ucva:"6/9", bcva:"6/6", near:"N6", pinhole:"6/6" },
    left:  { ucva:"6/36", bcva:"6/18", near:"N12", pinhole:"6/12" },
  },
  iop: { right:"14 mmHg", left:"16 mmHg", method:"Goldmann Applanation", time:"09:15" },
  aScan: {
    eye:"Left",
    axialLength:"23.42 mm",
    acd:"3.12 mm",
    lensThickness:"4.68 mm",
    kReadings:"K1: 43.50D @ 90° / K2: 44.25D @ 180°",
    formula:"SRK/T",
    targetRefraction:"-0.25D",
    iolPower:"+21.0D",
  },
  slitLamp: [
    { part:"Lids", right:"NAD", left:"NAD" },
    { part:"Conjunctiva", right:"Clear", left:"Mild congestion" },
    { part:"Cornea", right:"Clear", left:"Clear, arcus senilis" },
    { part:"Anterior Chamber", right:"Deep, quiet", left:"Deep, quiet" },
    { part:"Iris", right:"Normal pattern", left:"Normal pattern" },
    { part:"Lens", right:"Early NS — NO2 NC2", left:"Dense NS — NO4 NC4 (Significant)" },
    { part:"Fundus", right:"CDR 0.3, healthy disc", left:"Hazy view — CDR ~0.3" },
  ],
  iol: {
    manufacturer:"Alcon",
    model:"AcrySof IQ SN60WF",
    power:"+21.0D",
    type:"Foldable Hydrophobic Acrylic",
    batch:"ACR-2026-0412",
    expiry:"Mar 2028",
    barcode:"7681234567890",
  },
  phacoTemplate: [
    { step:"Anaesthesia", detail:"Topical (Proparacaine 0.5%) + Peribulbar (2% Lignocaine + 0.5% Bupivacaine)" },
    { step:"Incision", detail:"2.8mm Clear Corneal — Temporal, Side port at 6 o'clock" },
    { step:"Capsulorhexis", detail:"Continuous Curvilinear ~5.5mm, well-centered" },
    { step:"Hydrodissection", detail:"Fluid wave complete, nucleus rotated freely" },
    { step:"Phacoemulsification", detail:"Divide & Conquer, Phaco time: 42 sec, CDE: 8.2, Avg power: 32%" },
    { step:"Cortex Aspiration", detail:"I/A bimanual, thorough cortical clean-up, posterior capsule intact" },
    { step:"IOL Implantation", detail:"Alcon AcrySof IQ SN60WF +21.0D — in-the-bag, well-centered" },
    { step:"Wound Closure", detail:"Stromal hydration, self-sealing, Seidel negative" },
    { step:"Post-Op", detail:"Subconjunctival Dexamethasone + Gentamicin, Eye pad applied" },
  ],
  postOp: [
    { check:"Vision (Day 0)", value:"6/18 (L Eye)", status:"expected" as const },
    { check:"IOP (Day 0)", value:"12 mmHg", status:"normal" as const },
    { check:"Wound", value:"Self-sealed, Seidel -ve", status:"normal" as const },
    { check:"IOL Position", value:"In-the-bag, well-centered", status:"normal" as const },
    { check:"Cornea", value:"Mild stromal edema (expected)", status:"expected" as const },
    { check:"AC", value:"Formed, mild cells 1+", status:"expected" as const },
  ],
};

type ToothStatus = "present"|"missing"|"decayed"|"restored"|"root-canal"|"implant"|"treatment";
const dentalChart: {num:number; status:ToothStatus; note?:string}[] = [
  // Upper Right (18-11)
  {num:18,status:"present"},{num:17,status:"restored",note:"MOD Composite"},{num:16,status:"present"},{num:15,status:"present"},{num:14,status:"present"},{num:13,status:"present"},{num:12,status:"present"},{num:11,status:"present"},
  // Upper Left (21-28)
  {num:21,status:"present"},{num:22,status:"present"},{num:23,status:"present"},{num:24,status:"decayed",note:"Occlusal caries"},{num:25,status:"present"},{num:26,status:"root-canal",note:"RCT + PFM Crown"},{num:27,status:"present"},{num:28,status:"missing",note:"Previously extracted"},
  // Lower Left (38-31)
  {num:38,status:"treatment",note:"Mesioangular impaction — Surgical extraction planned"},{num:37,status:"present"},{num:36,status:"restored",note:"MO Amalgam"},{num:35,status:"present"},{num:34,status:"present"},{num:33,status:"present"},{num:32,status:"present"},{num:31,status:"present"},
  // Lower Right (41-48)
  {num:41,status:"present"},{num:42,status:"present"},{num:43,status:"present"},{num:44,status:"present"},{num:45,status:"present"},{num:46,status:"decayed",note:"Distal caries — monitor"},{num:47,status:"present"},{num:48,status:"treatment",note:"Partially erupted — monitor"},
];

const dentalProcedure = {
  tooth:38,
  diagnosis:"Mesioangular Impaction — Class II, Position B (Winter's Classification)",
  ianProximity:"IAN canal 2.1mm inferior — CBCT confirmed safe distance",
  anesthesia:"IANB + Long Buccal (2% Lignocaine with 1:80,000 Adrenaline) — 3.6mL",
  steps:[
    { step:"Incision", detail:"Ward's incision — envelope flap raised, mucoperiosteal flap reflected" },
    { step:"Bone Removal", detail:"Buccal bone guttering with surgical handpiece (Lindemann bur), saline irrigation" },
    { step:"Tooth Sectioning", detail:"Crown sectioned at CEJ with fissure bur, distal half elevated first" },
    { step:"Extraction", detail:"Coupland elevator + Warwick-James — tooth delivered in 2 pieces, follicle curetted" },
    { step:"Socket", detail:"Socket irrigated with Betadine + Saline, sharp bony edges smoothed" },
    { step:"Suturing", detail:"3-0 Vicryl — 3 interrupted sutures, hemostasis achieved" },
  ],
  postOp:[
    "Bite on gauze pack for 30 minutes",
    "Ice pack: 10min on / 10min off for 24 hours",
    "Soft diet for 3 days, avoid hot food for 24hrs",
    "NO spitting, sucking (straw), or rinsing for 24hrs",
    "Tab. Amoxicillin 500mg TDS × 5 days",
    "Tab. Ibuprofen 400mg + Paracetamol 500mg TDS × 3 days (after food)",
    "0.2% Chlorhexidine mouthwash BD from Day 2",
    "Suture removal: Day 7 (13 April 2026)",
  ],
};

const gynecWorkup = {
  menstrualHistory: {
    lmp:"22 March 2026",
    cycleLength:"28-30 days",
    regularity:"Regular",
    flowDuration:"5-6 days",
    flow:"Moderate → Heavy (last 6 months)",
    dysmenorrhea:"Moderate (VAS 5/10)",
    gravida:2, para:1, abortion:1, living:1,
    intermenstrualBleeding:"Occasional spotting × 3 months",
  },
  upt: { result:"Negative", date:"06 Apr 2026, 07:30", verifiedBy:"Staff Nurse Priya", method:"Urine hCG card test" },
  pcpndt: {
    required:true,
    formF:"Auto-generated",
    purpose:"Pre-hysteroscopy TVS for endometrial assessment",
    sonologist:"Dr. Meena Kulkarni (Reg: MH-USG-2847)",
    declaration:"No sex determination performed or communicated. PCPNDT Act 1994 compliant.",
  },
  papSmear: { lastDate:"15 Jan 2026", result:"NILM (Negative for Intraepithelial Lesion)", bethesda:"Satisfactory", hpv:"Not tested", nextDue:"Jan 2029" },
  investigations: [
    { test:"TVS Ultrasound", result:"Endometrial polyp 12×8mm — fundal, ET: 14mm", status:"abnormal" as const },
    { test:"Hb", result:"10.2 g/dL", status:"low" as const },
    { test:"Blood Group", result:"O+", status:"normal" as const },
    { test:"Coagulation Screen", result:"PT/INR: 1.0 — Normal", status:"normal" as const },
    { test:"TSH", result:"3.8 mU/L", status:"normal" as const },
  ],
  hysteroscopyFindings: {
    cervicalCanal:"Normal, no polyps or stenosis",
    uterineShape:"Normal cavity — no septum or anomaly",
    endometrium:"Proliferative, ET ~14mm",
    polyp:"Single pedunculated polyp 12×8mm at fundus — Removed by cold snare polypectomy",
    tubalOstia:"Bilateral ostia visualized — patent",
    biopsyTaken:true,
    specimenSent:"Endometrial polyp → Histopathology (Specimen: GYN-2026-04-001)",
    distensionMedia:"Normal saline, deficit < 500mL",
    bloodLoss:"Minimal (~30mL)",
    duration:"18 min",
    complications:"None",
  },
  postOp:[
    "Expect mild cramping and spotting for 2-3 days",
    "Tab. Mefenamic Acid 500mg SOS for cramps",
    "Tab. Doxycycline 100mg BD × 5 days (prophylaxis)",
    "Avoid intercourse and tampon use for 1 week",
    "Follow-up: 13 April 2026 with Dr. Kavitha Reddy",
    "Biopsy report expected: 10-12 April 2026",
    "Red flags: Heavy bleeding (>2 pads/hr), fever >101°F, foul discharge",
  ],
};

const ehrOPDQueue = [
  { token:"A-001", name:"Meera Jain", time:"09:00", doctor:"Dr. Priya Mehta", dept:"Ophthalmology", status:"in-consultation" as const },
  { token:"A-002", name:"Suresh Yadav", time:"09:15", doctor:"Dr. Priya Mehta", dept:"Ophthalmology", status:"waiting" as const },
  { token:"B-001", name:"Kavita Deshmukh", time:"09:00", doctor:"Dr. Kavitha Reddy", dept:"Gynecology", status:"vitals" as const },
  { token:"C-001", name:"Ramesh Patel", time:"09:30", doctor:"Dr. Aman Gupta", dept:"Cardiology", status:"waiting" as const },
  { token:"D-001", name:"Fatima Begum", time:"09:00", doctor:"Dr. Suresh Nair", dept:"ENT", status:"completed" as const },
  { token:"A-003", name:"Anil Tiwari", time:"09:30", doctor:"Dr. Priya Mehta", dept:"Ophthalmology", status:"waiting" as const },
  { token:"E-001", name:"Pooja Sharma", time:"09:15", doctor:"Dr. Rajat Chopra", dept:"Orthopedics", status:"in-consultation" as const },
  { token:"F-001", name:"Deepak Mishra", time:"09:30", doctor:"Dr. Meena Iyer", dept:"Oncology", status:"vitals" as const },
  { token:"G-001", name:"Harish Menon", time:"10:00", doctor:"Dr. Arun Shetty", dept:"Dental Surgery", status:"in-consultation" as const },
];

const ehrVitals = [
  { label:"Heart Rate", value:"78", unit:"bpm", status:"normal" as const, trend:[72,74,78,76,79,78] },
  { label:"Blood Pressure", value:"138/88", unit:"mmHg", status:"elevated" as const, trend:[132,136,140,138,142,138] },
  { label:"Temperature", value:"98.4", unit:"°F", status:"normal" as const, trend:[98.2,98.4,98.6,98.4,98.3,98.4] },
  { label:"SpO₂", value:"97", unit:"%", status:"normal" as const, trend:[96,97,97,98,97,97] },
  { label:"Resp Rate", value:"18", unit:"/min", status:"normal" as const, trend:[16,17,18,17,18,18] },
  { label:"BSL (Fasting)", value:"156", unit:"mg/dL", status:"elevated" as const, trend:[120,135,148,155,160,156] },
];

const ehrLabResults = [
  { test:"CBC — Hemoglobin", result:"12.8 g/dL", range:"12.0–16.0", status:"normal" as const },
  { test:"CBC — WBC", result:"8,200 /μL", range:"4,000–11,000", status:"normal" as const },
  { test:"CBC — Platelets", result:"2.4 L/μL", range:"1.5–4.0", status:"normal" as const },
  { test:"Serum Creatinine", result:"1.4 mg/dL", range:"0.7–1.3", status:"high" as const },
  { test:"Blood Urea", result:"42 mg/dL", range:"15–40", status:"borderline" as const },
  { test:"Fasting Glucose", result:"156 mg/dL", range:"70–110", status:"high" as const },
  { test:"HbA1c", result:"7.8%", range:"<5.7%", status:"high" as const },
  { test:"Total Cholesterol", result:"198 mg/dL", range:"<200", status:"normal" as const },
  { test:"TSH", result:"3.2 mU/L", range:"0.5–4.5", status:"normal" as const },
  { test:"PT/INR", result:"1.1", range:"0.8–1.2", status:"normal" as const },
  { test:"ECG", result:"Normal Sinus Rhythm", range:"—", status:"normal" as const },
  { test:"Chest X-ray", result:"NAD", range:"—", status:"normal" as const },
];

const ehrProcedureBoard = [
  { time:"08:00", patient:"Rajesh Kumar Sharma", procedure:"Phaco + IOL (L)", doctor:"Dr. Priya Mehta", room:"OT-1", status:"completed" as const },
  { time:"09:30", patient:"Mohammad Arif Khan", procedure:"Coronary Angiography", doctor:"Dr. Aman Gupta", room:"Cath Lab", status:"in-progress" as const },
  { time:"10:00", patient:"Vikram Singh Chauhan", procedure:"Knee Arthroscopy (R)", doctor:"Dr. Rajat Chopra", room:"OT-2", status:"recovery" as const },
  { time:"11:00", patient:"Anita Kumari", procedure:"IV Chemo — Cycle 4", doctor:"Dr. Meena Iyer", room:"Chemo Bay", status:"in-progress" as const },
  { time:"11:30", patient:"Ravi Prasad Joshi", procedure:"Hemodialysis", doctor:"Dr. Alok Verma", room:"Dialysis", status:"in-progress" as const },
  { time:"13:00", patient:"Lakshmi Narayanan", procedure:"FESS (Bilateral)", doctor:"Dr. Suresh Nair", room:"OT-1", status:"scheduled" as const },
  { time:"14:00", patient:"Sunita Devi Patil", procedure:"Hysteroscopy", doctor:"Dr. Kavitha Reddy", room:"OT-2", status:"pre-auth" as const },
  { time:"15:00", patient:"Priya Chakraborty", procedure:"Laser Scar Revision", doctor:"Dr. Sneha Das", room:"Procedure", status:"scheduled" as const },
  { time:"16:00", patient:"Harish Menon", procedure:"Surg. Extraction #38", doctor:"Dr. Arun Shetty", room:"Dental OT", status:"in-progress" as const },
];

const ehrMedications = [
  { name:"Tab. Timolol 0.5%", dose:"1 drop", route:"Eye (L)", freq:"BD", time:"08:00 / 20:00", patient:"Rajesh K.", status:"active" as const, schedule:"H" },
  { name:"Tab. Clopidogrel 75mg", dose:"75mg", route:"Oral", freq:"OD", time:"08:00", patient:"Arif K.", status:"active" as const, schedule:"H" },
  { name:"Inj. Paclitaxel 175mg/m²", dose:"280mg", route:"IV", freq:"3-weekly", time:"11:00", patient:"Anita K.", status:"active" as const, schedule:"H1" },
  { name:"Tab. Metformin 500mg", dose:"500mg", route:"Oral", freq:"BD", time:"08:00 / 20:00", patient:"Rajesh K.", status:"active" as const, schedule:"—" },
  { name:"Inj. Heparin 5000 IU", dose:"5000 IU", route:"IV", freq:"Stat", time:"09:30", patient:"Arif K.", status:"given" as const, schedule:"H" },
  { name:"Tab. Ondansetron 4mg", dose:"4mg", route:"Oral", freq:"TDS", time:"Pre-chemo", patient:"Anita K.", status:"active" as const, schedule:"H" },
  { name:"Cap. Pantoprazole 40mg", dose:"40mg", route:"Oral", freq:"OD (AC)", time:"07:30", patient:"Vikram S.", status:"active" as const, schedule:"H" },
  { name:"Tab. Aspirin 81mg", dose:"81mg", route:"Oral", freq:"OD", time:"08:00", patient:"Arif K.", status:"discontinued" as const, schedule:"—" },
];

const ehrBillingItems = [
  { desc:"Phaco + IOL — Package (L Eye)", amount:25000, type:"package" as const, dept:"Ophthalmology" },
  { desc:"IOL Lens — Alcon AcrySof IQ", amount:8500, type:"implant" as const, dept:"Ophthalmology" },
  { desc:"Coronary Angiography — CGHS Rate", amount:12000, type:"package" as const, dept:"Cardiology" },
  { desc:"Stent — DES Xience Sierra", amount:28000, type:"implant" as const, dept:"Cardiology" },
  { desc:"Knee Arthroscopy Package", amount:35000, type:"package" as const, dept:"Orthopedics" },
  { desc:"IV Chemotherapy (Paclitaxel)", amount:18000, type:"package" as const, dept:"Oncology" },
  { desc:"Hemodialysis Session — PMJAY", amount:1500, type:"package" as const, dept:"Nephrology" },
  { desc:"FESS Bilateral — Package", amount:45000, type:"package" as const, dept:"ENT" },
  { desc:"Pharmacy — Consumables", amount:3200, type:"consumable" as const, dept:"Pharmacy" },
  { desc:"Lab — Pre-op Panel", amount:2800, type:"investigation" as const, dept:"Laboratory" },
];

const ehrInsuranceClaims = [
  { id:"CLM-40001", patient:"Rajesh Kumar Sharma", tpa:"Star Health", amount:33500, status:"approved" as const, submitted:"05 Apr", tat:"4h" },
  { id:"CLM-40002", patient:"Sunita Devi Patil", tpa:"PMJAY (NHA)", amount:18000, status:"pending" as const, submitted:"06 Apr", tat:"—" },
  { id:"CLM-40003", patient:"Mohammad Arif Khan", tpa:"CGHS", amount:40000, status:"query" as const, submitted:"05 Apr", tat:"18h" },
  { id:"CLM-40004", patient:"Vikram Singh Chauhan", tpa:"ICICI Lombard", amount:35000, status:"approved" as const, submitted:"04 Apr", tat:"6h" },
  { id:"CLM-40005", patient:"Anita Kumari", tpa:"PMJAY (NHA)", amount:18000, status:"approved" as const, submitted:"03 Apr", tat:"2h" },
  { id:"CLM-40006", patient:"Ravi Prasad Joshi", tpa:"ECHS", amount:1500, status:"settled" as const, submitted:"01 Apr", tat:"48h" },
];

function EHRPrototype() {
  const [activeModule, setActiveModule] = useState<EHRModule>("dashboard");
  const [selectedPatient, setSelectedPatient] = useState(ehrPatients[0]);
  const [whoChecklist, setWhoChecklist] = useState({signIn:false,timeOut:false,signOut:false});
  const [consentSigned, setConsentSigned] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [selectedTooth, setSelectedTooth] = useState<number>(38);
  /* ── Interactive state ── */
  const [toast, setToast] = useState<{msg:string;type:"success"|"info"|"warn"}|null>(null);
  const [expandedProcRow, setExpandedProcRow] = useState<number|null>(null);
  const [editingVital, setEditingVital] = useState<string|null>(null);
  const [vitalOverrides, setVitalOverrides] = useState<Record<string,string>>({});
  const [medStatuses, setMedStatuses] = useState<Record<string,string>>({});
  const [labVerified, setLabVerified] = useState<Record<string,boolean>>({});
  const [selectedPayment, setSelectedPayment] = useState<string|null>(null);
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [dischargePrinted, setDischargePrinted] = useState(false);
  const [abhaPushed, setAbhaPushed] = useState(false);
  const [misDateRange, setMisDateRange] = useState<"today"|"week"|"month">("month");
  const [opdStatuses, setOpdStatuses] = useState<Record<string,string>>({});
  const [nurseNote, setNurseNote] = useState("");
  const [addedNotes, setAddedNotes] = useState<{time:string;nurse:string;note:string}[]>([]);
  const [checklistOverrides, setChecklistOverrides] = useState<Record<string,boolean>>({});
  const [phacoStepsDone, setPhacoStepsDone] = useState<Record<number,boolean>>({});
  const [dentalStepsDone, setDentalStepsDone] = useState<Record<number,boolean>>({});
  const [gynecStepsDone, setGynecStepsDone] = useState<Record<number,boolean>>({});
  const [claimActions, setClaimActions] = useState<Record<string,string>>({});
  const [regEditing, setRegEditing] = useState<string|null>(null);
  const [regOverrides, setRegOverrides] = useState<Record<string,string>>({});

  const showToast = (msg:string, type:"success"|"info"|"warn"="success") => {
    setToast({msg,type});
    setTimeout(()=>setToast(null),2500);
  };

  const goToPatient = (name:string, module:EHRModule="consultation") => {
    const p = ehrPatients.find(pt=>pt.name===name);
    if(p){ setSelectedPatient(p); setActiveModule(module); showToast(`Navigated to ${p.name.split(" ")[0]}`,"info"); }
  };

  const modules: {key:EHRModule; label:string; badge?:number}[] = [
    { key:"dashboard", label:"Dashboard" },
    { key:"registration", label:"Registration" },
    { key:"opd", label:"OPD Queue", badge:ehrOPDQueue.filter(q=>q.status==="waiting").length },
    { key:"daycare", label:"Daycare Admission" },
    { key:"procedure", label:"Procedure Board" },
    { key:"nursing", label:"Nursing Station" },
    { key:"pharmacy", label:"Pharmacy", badge:ehrMedications.filter(m=>m.status==="active").length },
    { key:"lab", label:"Laboratory" },
    { key:"billing", label:"Billing & Insurance" },
    { key:"discharge", label:"Discharge" },
    { key:"mis", label:"MIS Dashboard" },
    { key:"consultation", label:"Consultation" },
  ];

  const activeSpecialty = ehrSpecialties.find(s=>s.key===selectedPatient.specialty);
  const accentColor = activeSpecialty?.color||"#06B6D4";

  const statusColor = (s:string) => {
    switch(s){
      case "admitted": case "in-consultation": case "in-progress": return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case "pre-auth": case "pending": case "vitals": return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "in-procedure": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "recovery": case "approved": case "settled": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "scheduled": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "completed": return "bg-white/10 text-white/50 border-white/10";
      case "query": return "bg-red-500/20 text-red-300 border-red-500/30";
      case "given": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "discontinued": return "bg-red-500/15 text-red-300/60 border-red-500/20";
      default: return "bg-white/10 text-white/50 border-white/10";
    }
  };

  return (
    <PrototypeShell title="daycare-ehr.health.in">
      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="fixed top-16 left-1/2 -translate-x-1/2 z-50">
            <div className={`px-4 py-2 rounded-xl border text-[10px] font-medium shadow-xl backdrop-blur-sm ${toast.type==="success"?"bg-green-500/20 text-green-300 border-green-500/30":toast.type==="warn"?"bg-amber-500/20 text-amber-300 border-amber-500/30":"bg-cyan-500/20 text-cyan-300 border-cyan-500/30"}`}>
              {toast.type==="success"?"✓ ":toast.type==="warn"?"⚠ ":"→ "}{toast.msg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex h-[calc(100vh-48px-64px)] lg:h-[calc(100vh-48px-80px)]">
        {/* ── Left Navigation ── */}
        <aside className="w-48 shrink-0 border-r border-white/10 bg-[#0D1525] flex flex-col min-h-0">
          <div className="p-3 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/90">DayCare EHR</p>
                <p className="text-[8px] text-white/30 font-mono">ABDM Certified</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
            {modules.map((m) => (
              <button key={m.key} onClick={() => setActiveModule(m.key)}
                className={`w-full text-left text-[10px] px-2.5 py-2 rounded-lg transition-colors flex items-center justify-between ${activeModule === m.key ? "bg-cyan-500/15 text-cyan-300" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}>
                <span>{m.label}</span>
                {m.badge && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">{m.badge}</span>}
              </button>
            ))}
          </nav>
          <div className="p-2 border-t border-white/10 shrink-0">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-[8px] font-bold text-cyan-400">PM</div>
              <div>
                <p className="text-[9px] text-white/70">Dr. Priya Mehta</p>
                <p className="text-[7px] text-white/30">Ophthalmology</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <div className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeModule} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}} className="p-4 lg:p-6">

              {/* ════════ DASHBOARD ════════ */}
              {activeModule === "dashboard" && (
                <div className="space-y-6">
                  {/* Today's Stats */}
                  <div>
                    <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Today — 06 April 2026</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                      {[
                        {label:"OPD Patients",value:"42",delta:"+8",color:"text-cyan-400",nav:"opd" as EHRModule},
                        {label:"Daycare Admissions",value:"8",delta:"+2",color:"text-green-400",nav:"daycare" as EHRModule},
                        {label:"Procedures Today",value:"8",delta:"",color:"text-purple-400",nav:"procedure" as EHRModule},
                        {label:"Pending Pre-Auth",value:"2",delta:"",color:"text-amber-400",nav:"billing" as EHRModule},
                        {label:"Discharged",value:"3",delta:"",color:"text-green-400",nav:"discharge" as EHRModule},
                        {label:"Revenue (Today)",value:"₹4.82L",delta:"+₹1.2L",color:"text-cyan-400",nav:"mis" as EHRModule},
                      ].map((s) => (
                        <div key={s.label} onClick={()=>{setActiveModule(s.nav);showToast(`Opened ${s.label}`,"info");}} className="p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-cyan-500/30 hover:bg-white/8 transition-all group">
                          <p className="text-[9px] text-white/40 mb-1 group-hover:text-white/60">{s.label}</p>
                          <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                          {s.delta && <p className="text-[9px] text-green-400 mt-0.5">{s.delta} vs yesterday</p>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Procedure Board (mini) */}
                  <div>
                    <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Procedure Board</h2>
                    <div className="rounded-xl border border-white/10 overflow-hidden">
                      <table className="w-full text-[10px]">
                        <thead><tr className="bg-white/5">
                          <th className="text-left p-2.5 text-white/40 font-medium">Time</th>
                          <th className="text-left p-2.5 text-white/40 font-medium">Patient</th>
                          <th className="text-left p-2.5 text-white/40 font-medium hidden sm:table-cell">Procedure</th>
                          <th className="text-left p-2.5 text-white/40 font-medium hidden lg:table-cell">Doctor</th>
                          <th className="text-left p-2.5 text-white/40 font-medium hidden sm:table-cell">Room</th>
                          <th className="text-left p-2.5 text-white/40 font-medium">Status</th>
                        </tr></thead>
                        <tbody>
                          {ehrProcedureBoard.map((p,i)=>(
                            <tr key={i} onClick={()=>goToPatient(p.patient,"procedure")} className="border-t border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                              <td className="p-2.5 font-mono text-white/60">{p.time}</td>
                              <td className="p-2.5 text-white/80">{p.patient}</td>
                              <td className="p-2.5 text-white/50 hidden sm:table-cell">{p.procedure}</td>
                              <td className="p-2.5 text-white/50 hidden lg:table-cell">{p.doctor}</td>
                              <td className="p-2.5 font-mono text-white/40 hidden sm:table-cell">{p.room}</td>
                              <td className="p-2.5"><span className={`px-2 py-0.5 rounded-full text-[9px] border ${statusColor(p.status)}`}>{p.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Specialty-wise split */}
                  <div>
                    <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Active by Specialty</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                      {ehrSpecialties.slice(0,8).map((sp)=>{
                        const count = ehrPatients.filter(p=>p.specialty===sp.key).length;
                        return (
                          <div key={sp.key} onClick={()=>{const pt=ehrPatients.find(p=>p.specialty===sp.key);if(pt){setSelectedPatient(pt);setActiveModule("consultation");showToast(`${sp.label} — ${pt.name.split(" ")[0]}`,'info');}else{showToast(`No patients in ${sp.label}`,"warn");}}} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center cursor-pointer hover:border-cyan-500/30 hover:bg-white/8 transition-all">
                            <div className="w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center" style={{backgroundColor:sp.color+"20",border:`1px solid ${sp.color}40`}}>
                              <span className="text-xs font-bold" style={{color:sp.color}}>{count}</span>
                            </div>
                            <p className="text-[8px] text-white/50 leading-tight">{sp.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Insurance Claims */}
                  <div>
                    <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Insurance & Pre-Auth Tracker</h2>
                    <div className="space-y-2">
                      {ehrInsuranceClaims.slice(0,4).map((c)=>(
                        <div key={c.id} onClick={()=>{setActiveModule("billing");showToast(`Viewing ${c.id}`,'info');}} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-cyan-500/30 hover:bg-white/8 transition-all">
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] font-mono text-white/30">{c.id}</span>
                            <div>
                              <p className="text-[10px] text-white/80">{c.patient}</p>
                              <p className="text-[8px] text-white/40">{c.tpa} • Submitted {c.submitted}</p>
                            </div>
                          </div>
                          <div className="text-right flex items-center gap-3">
                            <span className="text-[10px] font-mono text-white/60">₹{c.amount.toLocaleString("en-IN")}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] border ${statusColor(c.status)}`}>{c.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ════════ REGISTRATION ════════ */}
              {activeModule === "registration" && (
                <div className="space-y-6 max-w-3xl">
                  <h2 className="text-sm font-semibold text-white/90">Patient Registration — ABHA Linked</h2>
                  {/* ABHA Verification */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="8" cy="15" r="1"/></svg>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/80">ABHA Verification</p>
                        <p className="text-[9px] text-white/40">Ayushman Bharat Health Account</p>
                      </div>
                      <span className="ml-auto px-2.5 py-1 text-[9px] rounded-full bg-green-500/20 text-green-300 border border-green-500/30">Verified ✓</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {label:"ABHA ID",value:selectedPatient.abha},
                        {label:"UHID",value:selectedPatient.uhid},
                        {label:"Full Name",value:selectedPatient.name},
                        {label:"Age / Gender",value:`${selectedPatient.age} yrs / ${selectedPatient.gender==="M"?"Male":"Female"}`},
                        {label:"Blood Group",value:selectedPatient.blood},
                        {label:"Mobile",value:selectedPatient.phone},
                      ].map((f)=>(
                        <div key={f.label} onClick={()=>{setRegEditing(regEditing===f.label?null:f.label);}} className="p-2.5 rounded-lg bg-white/3 border border-white/5 cursor-pointer hover:border-cyan-500/20 transition-colors">
                          <p className="text-[8px] text-white/30 font-mono uppercase mb-0.5">{f.label}</p>
                          {regEditing===f.label ? (
                            <input autoFocus className="bg-transparent text-[10px] text-cyan-300 outline-none w-full border-b border-cyan-500/30 font-mono" defaultValue={regOverrides[f.label]||f.value} onBlur={(e)=>{setRegOverrides(p=>({...p,[f.label]:e.target.value}));setRegEditing(null);showToast(`${f.label} updated`);}} onKeyDown={(e)=>{if(e.key==="Enter"){(e.target as HTMLInputElement).blur();}}}/>
                          ) : (
                            <p className="text-[10px] text-white/80">{regOverrides[f.label]||f.value}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Insurance */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs font-medium text-white/80 mb-3">Insurance Details</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2.5 rounded-lg bg-white/3 border border-white/5">
                        <p className="text-[8px] text-white/30 font-mono uppercase mb-0.5">Provider</p>
                        <p className="text-[10px] text-white/80">{selectedPatient.insurance}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/3 border border-white/5">
                        <p className="text-[8px] text-white/30 font-mono uppercase mb-0.5">PMJAY Beneficiary</p>
                        <p className={`text-[10px] ${selectedPatient.pmjay?"text-green-400":"text-white/50"}`}>{selectedPatient.pmjay?"Yes — Eligible":"No"}</p>
                      </div>
                    </div>
                  </div>
                  {/* Allergies */}
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                    <p className="text-xs font-medium text-red-300 mb-2">Allergies & Alerts</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPatient.allergy.length > 0 ? selectedPatient.allergy.map((a)=>(
                        <span key={a} className="px-2.5 py-1 text-[10px] rounded-full bg-red-500/20 text-red-300 border border-red-500/30">{a}</span>
                      )) : <span className="text-[10px] text-white/40">No known allergies (NKDA)</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* ════════ OPD QUEUE ════════ */}
              {activeModule === "opd" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-white/90">OPD Queue — Token System</h2>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                      <input type="text" placeholder="Search patient..." value={searchQ} onChange={(e)=>setSearchQ(e.target.value)} className="bg-transparent text-[10px] text-white/80 placeholder:text-white/30 outline-none w-32"/>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    {ehrOPDQueue.filter(q=>!searchQ || q.name.toLowerCase().includes(searchQ.toLowerCase())).map((q)=>{
                      const currentStatus = opdStatuses[q.token]||q.status;
                      const nextStatus = currentStatus==="waiting"?"vitals":currentStatus==="vitals"?"in-consultation":currentStatus==="in-consultation"?"completed":"waiting";
                      return (
                      <div key={q.token} className={`flex items-center gap-4 p-3 rounded-xl border transition-colors ${currentStatus==="in-consultation"?"bg-cyan-500/5 border-cyan-500/20":currentStatus==="vitals"?"bg-amber-500/5 border-amber-500/20":currentStatus==="completed"?"bg-white/3 border-white/5 opacity-60":"bg-white/5 border-white/10"}`}>
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xs font-bold font-mono text-white/60">{q.token}</div>
                        <div className="flex-1 min-w-0 cursor-pointer" onClick={()=>{const pt=ehrPatients.find(p=>p.name.includes(q.name.split(" ")[0]));if(pt){setSelectedPatient(pt);setActiveModule("consultation");showToast(`Viewing ${pt.name.split(" ")[0]}`, "info");}else{showToast(`${q.name} — OPD patient`,"info");}}}>
                          <p className="text-[11px] font-medium text-white/80 truncate hover:text-cyan-300 transition-colors">{q.name}</p>
                          <p className="text-[9px] text-white/40">{q.doctor} • {q.dept}</p>
                        </div>
                        <span className="text-[9px] font-mono text-white/30">{q.time}</span>
                        <button onClick={()=>{setOpdStatuses(prev=>({...prev,[q.token]:nextStatus}));showToast(`${q.name}: ${currentStatus} → ${nextStatus}`);}} className={`px-2 py-0.5 rounded-full text-[9px] border shrink-0 cursor-pointer hover:scale-105 transition-transform ${statusColor(currentStatus)}`}>{currentStatus.replace("-"," ")}</button>
                      </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ════════ DAYCARE ADMISSION ════════ */}
              {activeModule === "daycare" && (
                <div className="space-y-6 max-w-4xl">
                  <h2 className="text-sm font-semibold text-white/90">Daycare Admission — {selectedPatient.name}</h2>
                  {/* Patient strip */}
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-[10px] font-bold text-cyan-400">{selectedPatient.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white/80">{selectedPatient.name} <span className="text-white/30 font-mono ml-1">{selectedPatient.uhid}</span></p>
                      <p className="text-[9px] text-white/40">{selectedPatient.age}y / {selectedPatient.gender} • {selectedPatient.blood} • ABHA: {selectedPatient.abha}</p>
                    </div>
                    {selectedPatient.allergy.length > 0 && <div className="flex gap-1">{selectedPatient.allergy.map(a=><span key={a} className="px-2 py-0.5 text-[8px] rounded-full bg-red-500/20 text-red-300 border border-red-500/30">{a}</span>)}</div>}
                  </div>

                  {/* Procedure & Doctor */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[8px] font-mono text-white/30 uppercase mb-1">Planned Procedure</p>
                      <p className="text-sm font-semibold text-white/90">{selectedPatient.procedure}</p>
                      <p className="text-[9px] text-white/40 mt-1">{selectedPatient.doctor} • {ehrSpecialties.find(s=>s.key===selectedPatient.specialty)?.label}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[8px] font-mono text-white/30 uppercase mb-1">Insurance / Pre-Auth</p>
                      <p className="text-sm font-semibold text-white/90">{selectedPatient.insurance}</p>
                      <p className={`text-[9px] mt-1 ${selectedPatient.pmjay?"text-green-400":"text-amber-400"}`}>{selectedPatient.pmjay?"PMJAY — Auto-approved":"Pre-auth submitted — awaiting"}</p>
                    </div>
                  </div>

                  {/* Pre-procedure checklist */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs font-medium text-white/80 mb-3">Pre-Procedure Checklist</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {[
                        {label:"Identity verified (2-ID check)",done:true,key:"id"},
                        {label:"Consent signed (Procedure + Anesthesia)",done:consentSigned,key:"consent"},
                        {label:"NPO > 6 hours confirmed",done:true,key:"npo"},
                        {label:"Pre-op investigations reviewed",done:true,key:"preop"},
                        {label:"Anticoagulant hold verified",done:true,key:"anticoag"},
                        {label:"Site marking done (laterality)",done:true,key:"site"},
                        {label:"Allergy wristband applied",done:selectedPatient.allergy.length>0,key:"allergy"},
                        {label:"Blood group confirmed",done:true,key:"blood"},
                        {label:"Anesthesia PAC completed (ASA II)",done:true,key:"pac"},
                        {label:"Bay/Bed allocated",done:selectedPatient.bay!=="—",key:"bay"},
                      ].map((c)=>{
                        const isDone = checklistOverrides[c.key]!==undefined?checklistOverrides[c.key]:c.done;
                        return (
                        <div key={c.label} onClick={()=>{setChecklistOverrides(prev=>({...prev,[c.key]:!isDone}));showToast(isDone?`Unchecked: ${c.label.slice(0,30)}…`:`Checked: ${c.label.slice(0,30)}…`);}} className={`flex items-center gap-2.5 p-2.5 rounded-lg transition-colors cursor-pointer ${isDone?"bg-green-500/5 border border-green-500/15 hover:border-green-500/30":"bg-white/3 border border-white/5 hover:border-amber-500/30"}`}>
                          <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${isDone?"bg-green-500/20 text-green-400":"bg-white/10 text-white/20"}`}>
                            {isDone&&<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                          </div>
                          <span className={`text-[10px] ${isDone?"text-white/70":"text-white/40"}`}>{c.label}</span>
                        </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs font-medium text-white/80 mb-3">Digital Consent</p>
                    <div className="grid sm:grid-cols-3 gap-2 mb-4">
                      {["Procedure Consent","Anesthesia Consent","High-Risk Consent"].map((c)=>(
                        <div key={c} className={`p-3 rounded-lg border text-center cursor-pointer transition-colors ${consentSigned?"bg-green-500/10 border-green-500/20":"bg-white/3 border-white/10 hover:border-cyan-500/30"}`} onClick={()=>setConsentSigned(true)}>
                          <p className="text-[10px] text-white/60 mb-1">{c}</p>
                          <p className={`text-[9px] font-mono ${consentSigned?"text-green-400":"text-white/30"}`}>{consentSigned?"Signed ✓":"Tap to sign"}</p>
                        </div>
                      ))}
                    </div>
                    {consentSigned && <p className="text-[9px] text-green-400/70 font-mono">Consent captured — {selectedPatient.name} — {new Date().toLocaleString("en-IN")} — Digital Signature on file</p>}
                  </div>

                  {/* WHO Surgical Safety Checklist */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs font-medium text-white/80 mb-3">WHO Surgical Safety Checklist</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {([["signIn","Sign In","Before Anesthesia"],["timeOut","Time Out","Before Incision"],["signOut","Sign Out","Before Exit"]] as const).map(([key,title,sub])=>(
                        <button key={key} onClick={()=>setWhoChecklist(prev=>({...prev,[key]:!prev[key]}))}
                          className={`p-4 rounded-xl border text-center transition-all ${whoChecklist[key]?"bg-green-500/10 border-green-500/30":"bg-white/3 border-white/10 hover:border-cyan-500/30"}`}>
                          <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${whoChecklist[key]?"bg-green-500/20 text-green-400":"bg-white/10 text-white/30"}`}>
                            {whoChecklist[key]?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>:"?"}
                          </div>
                          <p className="text-[10px] font-semibold text-white/80">{title}</p>
                          <p className="text-[8px] text-white/30">{sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ════════ PROCEDURE BOARD ════════ */}
              {activeModule === "procedure" && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-white/90">OT / Procedure Board — Today</h2>
                  <p className="text-[9px] text-white/40">Click any row to expand details • Click patient name to navigate</p>
                  <div className="rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-[10px]">
                      <thead><tr className="bg-white/5">
                        <th className="text-left p-3 text-white/40 font-medium w-16">Time</th>
                        <th className="text-left p-3 text-white/40 font-medium">Patient</th>
                        <th className="text-left p-3 text-white/40 font-medium">Procedure</th>
                        <th className="text-left p-3 text-white/40 font-medium hidden lg:table-cell">Surgeon</th>
                        <th className="text-left p-3 text-white/40 font-medium">Room</th>
                        <th className="text-left p-3 text-white/40 font-medium">Status</th>
                      </tr></thead>
                      <tbody>
                        {ehrProcedureBoard.map((p,i)=>(
                          <React.Fragment key={i}>
                          <motion.tr initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}
                            onClick={()=>setExpandedProcRow(expandedProcRow===i?null:i)}
                            className={`border-t border-white/5 transition-colors cursor-pointer ${p.status==="in-progress"?"bg-cyan-500/5":"hover:bg-white/5"} ${expandedProcRow===i?"bg-white/5":""}`}>
                            <td className="p-3 font-mono font-bold text-white/70">{p.time}</td>
                            <td className="p-3">
                              <p className="text-cyan-300 hover:underline cursor-pointer" onClick={(e)=>{e.stopPropagation();goToPatient(p.patient,"consultation");}}>{p.patient}</p>
                            </td>
                            <td className="p-3 text-white/60">{p.procedure}</td>
                            <td className="p-3 text-white/50 hidden lg:table-cell">{p.doctor}</td>
                            <td className="p-3"><span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono text-white/50">{p.room}</span></td>
                            <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-[9px] border ${statusColor(p.status)}`}>{p.status}</span></td>
                          </motion.tr>
                          {expandedProcRow===i&&(
                            <tr><td colSpan={6} className="p-0">
                              <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="p-4 bg-white/3 border-t border-white/5 space-y-3">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                  <div><p className="text-[7px] text-white/30 font-mono uppercase">WHO Sign-In</p><p className="text-[10px] text-green-400">✓ Done</p></div>
                                  <div><p className="text-[7px] text-white/30 font-mono uppercase">Anesthesia</p><p className="text-[10px] text-white/60">{p.status==="completed"?"General":"Topical + Peribulbar"}</p></div>
                                  <div><p className="text-[7px] text-white/30 font-mono uppercase">Start Time</p><p className="text-[10px] text-white/60 font-mono">{p.time}</p></div>
                                  <div><p className="text-[7px] text-white/30 font-mono uppercase">Est. Duration</p><p className="text-[10px] text-white/60">45 min</p></div>
                                </div>
                                <div className="flex gap-2">
                                  <button onClick={(e)=>{e.stopPropagation();goToPatient(p.patient,"nursing");}} className="px-3 py-1.5 rounded-lg text-[9px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">View Nursing Notes</button>
                                  <button onClick={(e)=>{e.stopPropagation();goToPatient(p.patient,"billing");}} className="px-3 py-1.5 rounded-lg text-[9px] bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 transition-colors">View Billing</button>
                                  <button onClick={(e)=>{e.stopPropagation();showToast(`WHO Time-Out confirmed for ${p.patient}`,"success");}} className="px-3 py-1.5 rounded-lg text-[9px] bg-green-500/10 text-green-300 border border-green-500/20 hover:bg-green-500/20 transition-colors">Confirm WHO Time-Out</button>
                                </div>
                              </motion.div>
                            </td></tr>
                          )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ════════ NURSING STATION ════════ */}
              {activeModule === "nursing" && (
                <div className="space-y-6">
                  <h2 className="text-sm font-semibold text-white/90">Nursing Station — {selectedPatient.name}</h2>
                  {/* Vitals */}
                  <div>
                    <h3 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Current Vitals <span className="text-white/30 normal-case">(click to edit)</span></h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {ehrVitals.map((v)=>{
                        const isEditing = editingVital===v.label;
                        const displayVal = vitalOverrides[v.label]??v.value;
                        return (
                        <div key={v.label} onClick={()=>{if(!isEditing)setEditingVital(v.label);}} className={`p-3 rounded-xl border cursor-pointer transition-colors ${v.status==="elevated"?"bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50":"bg-white/5 border-white/10 hover:border-cyan-500/30"} ${isEditing?"ring-1 ring-cyan-400":""}`}>
                          <p className="text-[9px] text-white/40 mb-1">{v.label}</p>
                          {isEditing?(
                            <input autoFocus defaultValue={String(displayVal)} className="bg-transparent text-lg font-bold text-cyan-300 w-full outline-none border-b border-cyan-500/30" onKeyDown={(e)=>{if(e.key==="Enter"){setVitalOverrides(prev=>({...prev,[v.label]:(e.target as HTMLInputElement).value}));setEditingVital(null);showToast(`${v.label} updated to ${(e.target as HTMLInputElement).value}`,"success");}}} onBlur={(e)=>{setVitalOverrides(prev=>({...prev,[v.label]:e.target.value}));setEditingVital(null);showToast(`${v.label} updated`);}}/>
                          ):(
                            <p className={`text-lg font-bold ${v.status==="elevated"?"text-amber-400":"text-white"}`}>{displayVal}</p>
                          )}
                          <p className="text-[8px] text-white/30">{v.unit}</p>
                          <svg viewBox="0 0 60 20" className="w-full h-4 mt-1">
                            <polyline fill="none" stroke={v.status==="elevated"?"#F59E0B":"#06B6D4"} strokeWidth="1.5"
                              points={v.trend.map((val,i)=>{const min=Math.min(...v.trend);const max=Math.max(...v.trend);const r=max-min||1;return`${i*12},${18-((val-min)/r)*14}`;}).join(" ")}/>
                          </svg>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* MAR */}
                  <div>
                    <h3 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Medication Administration Record (MAR)</h3>
                    <div className="space-y-2">
                      {ehrMedications.filter(m=>m.patient.includes(selectedPatient.name.split(" ")[0])).map((m,i)=>{
                        const mKey = `${m.name}-${m.patient}`;
                        const curStatus = medStatuses[mKey]??m.status;
                        return (
                        <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${curStatus==="discontinued"?"bg-white/2 border-white/5 opacity-50":"bg-white/5 border-white/10"}`}>
                          <div className={`w-2 h-2 rounded-full shrink-0 ${curStatus==="given"?"bg-green-400":curStatus==="active"?"bg-cyan-400":"bg-red-400"}`}/>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-medium text-white/80">{m.name}</p>
                            <p className="text-[8px] text-white/40">{m.dose} • {m.route} • {m.freq} • {m.time}</p>
                          </div>
                          {m.schedule!=="—"&&<span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">Sch.{m.schedule}</span>}
                          {curStatus==="active"&&(
                            <button onClick={()=>{setMedStatuses(prev=>({...prev,[mKey]:"given"}));showToast(`${m.name} marked as administered`,"success");}} className="px-2 py-1 rounded-lg text-[8px] bg-green-500/10 text-green-300 border border-green-500/20 hover:bg-green-500/20 transition-colors">Administer</button>
                          )}
                          <span className={`px-2 py-0.5 rounded-full text-[9px] border ${statusColor(curStatus)}`}>{curStatus}</span>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Nursing observations */}
                  <div>
                    <h3 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Observation Notes</h3>
                    <div className="space-y-2">
                      {[
                        {time:"07:30",nurse:"Sr. Nurse Rekha",note:"Patient received. Identity verified. NPO > 8hrs confirmed. Allergy wristband (RED) applied. Pre-op vitals recorded. Patient anxious — reassured."},
                        {time:"08:15",nurse:"OT Nurse Shilpa",note:"Shifted to OT-1. WHO Sign-In completed. IV line secured (18G — left dorsum). Timolol 0.5% instilled as per PAC order."},
                        {time:"09:00",nurse:"PACU Nurse Anjali",note:"Post-op — shifted to Recovery Bay 3. Aldrete score 8/10. Eye pad intact. No complaints of pain. SpO₂ 97%. Vitals stable."},
                        {time:"10:30",nurse:"Sr. Nurse Rekha",note:"Aldrete 10/10. Tolerated sips of water. Vision check: 6/18 (L eye). Discharge criteria met. Awaiting doctor clearance."},
                        ...addedNotes,
                      ].map((n,i)=>(
                        <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex justify-between mb-1">
                            <span className="text-[10px] font-medium text-white/70">{n.nurse}</span>
                            <span className="text-[9px] font-mono text-white/30">{n.time}</span>
                          </div>
                          <p className="text-[10px] text-white/50 leading-relaxed">{n.note}</p>
                        </div>
                      ))}
                    </div>
                    {/* Add note form */}
                    <div className="mt-3 p-3 rounded-xl bg-white/3 border border-dashed border-white/10">
                      <textarea value={nurseNote} onChange={(e)=>setNurseNote(e.target.value)} placeholder="Type observation note here…" className="w-full bg-transparent text-[10px] text-white/70 placeholder:text-white/20 outline-none resize-none h-14"/>
                      <div className="flex justify-end mt-1">
                        <button disabled={!nurseNote.trim()} onClick={()=>{const now=new Date();setAddedNotes(prev=>[...prev,{time:`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`,nurse:"Nurse (You)",note:nurseNote.trim()}]);setNurseNote("");showToast("Observation note added","success");}} className="px-3 py-1.5 rounded-lg text-[9px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">Add Note</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ════════ PHARMACY ════════ */}
              {activeModule === "pharmacy" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-white/90">Pharmacy — Drug Dispensing</h2>
                    <div className="flex gap-2">
                      <span className="text-[9px] px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">Sch.H — Prescription Required</span>
                      <span className="text-[9px] px-2 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">Sch.H1 — Restricted</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-[10px]">
                      <thead><tr className="bg-white/5">
                        <th className="text-left p-2.5 text-white/40 font-medium">Drug</th>
                        <th className="text-left p-2.5 text-white/40 font-medium">Dose</th>
                        <th className="text-left p-2.5 text-white/40 font-medium">Route</th>
                        <th className="text-left p-2.5 text-white/40 font-medium hidden sm:table-cell">Freq</th>
                        <th className="text-left p-2.5 text-white/40 font-medium">Patient</th>
                        <th className="text-left p-2.5 text-white/40 font-medium">Sch</th>
                        <th className="text-left p-2.5 text-white/40 font-medium">Status</th>
                        <th className="text-left p-2.5 text-white/40 font-medium">Action</th>
                      </tr></thead>
                      <tbody>
                        {ehrMedications.map((m,i)=>{
                          const mKey = `${m.name}-${m.patient}`;
                          const curStatus = medStatuses[mKey]??m.status;
                          return (
                          <tr key={i} className={`border-t border-white/5 ${curStatus==="discontinued"?"opacity-40":""}`}>
                            <td className="p-2.5 text-white/80 font-medium">{m.name}</td>
                            <td className="p-2.5 font-mono text-white/60">{m.dose}</td>
                            <td className="p-2.5 text-white/50">{m.route}</td>
                            <td className="p-2.5 text-white/50 hidden sm:table-cell">{m.freq}</td>
                            <td className="p-2.5"><span className="text-cyan-300 hover:underline cursor-pointer" onClick={()=>goToPatient(m.patient,"nursing")}>{m.patient}</span></td>
                            <td className="p-2.5">{m.schedule!=="—"&&<span className={`px-1.5 py-0.5 rounded text-[8px] font-mono ${m.schedule==="H1"?"bg-red-500/20 text-red-300":"bg-amber-500/20 text-amber-300"}`}>{m.schedule}</span>}</td>
                            <td className="p-2.5"><span className={`px-2 py-0.5 rounded-full text-[9px] border ${statusColor(curStatus)}`}>{curStatus}</span></td>
                            <td className="p-2.5">
                              {curStatus==="active"&&(
                                <button onClick={()=>{setMedStatuses(prev=>({...prev,[mKey]:"given"}));showToast(`${m.name} dispensed for ${m.patient}`,"success");}} className="px-2 py-1 rounded-lg text-[8px] bg-green-500/10 text-green-300 border border-green-500/20 hover:bg-green-500/20 transition-colors">Dispense</button>
                              )}
                              {curStatus==="given"&&<span className="text-[8px] text-green-400">✓ Dispensed</span>}
                            </td>
                          </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    <p className="text-[9px] text-blue-300">💊 <strong>Jan Aushadhi Alert:</strong> Generic alternative available for Clopidogrel — ₹2.8/tab vs ₹12/tab (branded). Switch recommended per NMC generic mandate.</p>
                  </div>
                </div>
              )}

              {/* ════════ LABORATORY ════════ */}
              {activeModule === "lab" && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-white/90">Laboratory — Pre-Op Panel</h2>
                  <p className="text-[9px] text-white/40">{selectedPatient.name} • {selectedPatient.uhid} • Ordered by {selectedPatient.doctor}</p>
                  <div className="rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-[10px]">
                      <thead><tr className="bg-white/5">
                        <th className="text-left p-3 text-white/40 font-medium">Test</th>
                        <th className="text-left p-3 text-white/40 font-medium">Result</th>
                        <th className="text-left p-3 text-white/40 font-medium">Reference Range</th>
                        <th className="text-left p-3 text-white/40 font-medium">Status</th>
                        <th className="text-left p-3 text-white/40 font-medium">Verify</th>
                      </tr></thead>
                      <tbody>
                        {ehrLabResults.map((l)=>{
                          const isVerified = labVerified[l.test]===true;
                          return (
                          <tr key={l.test} className="border-t border-white/5">
                            <td className="p-3 text-white/80">{l.test}</td>
                            <td className={`p-3 font-mono ${l.status==="high"?"text-red-300":l.status==="borderline"?"text-amber-300":"text-white/70"}`}>{l.result}</td>
                            <td className="p-3 text-white/40">{l.range}</td>
                            <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-[9px] ${l.status==="high"?"bg-red-500/20 text-red-300":l.status==="borderline"?"bg-amber-500/20 text-amber-300":"bg-green-500/20 text-green-300"}`}>{l.status}</span></td>
                            <td className="p-3">
                              {isVerified?(
                                <span className="text-[9px] text-green-400">✓ Verified</span>
                              ):(
                                <button onClick={()=>{setLabVerified(prev=>({...prev,[l.test]:true}));showToast(`${l.test} result verified`,"success");}} className="px-2 py-1 rounded-lg text-[8px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">Verify</button>
                              )}
                            </td>
                          </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex gap-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex-1">
                      <p className="text-[8px] font-mono text-white/30 uppercase mb-1">Sample Status</p>
                      <p className="text-[10px] text-green-400">All samples processed • Barcode: SMP-240006-RKS</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex-1">
                      <p className="text-[8px] font-mono text-white/30 uppercase mb-1">Report Status</p>
                      <p className="text-[10px] text-cyan-300">{Object.values(labVerified).filter(Boolean).length===ehrLabResults.length?"All results verified ✓":"Verified by Dr. Patil (Pathologist) • NABL Accredited"}</p>
                    </div>
                  </div>
                  <button onClick={()=>{const allVerified:Record<string,boolean>={};ehrLabResults.forEach(l=>{allVerified[l.test]=true;});setLabVerified(allVerified);showToast("All lab results verified & report generated","success");}} className="w-full py-2.5 rounded-xl text-[10px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                    {Object.values(labVerified).filter(Boolean).length===ehrLabResults.length?"✓ Report Generated — Print":"Verify All & Generate Report"}
                  </button>
                </div>
              )}

              {/* ════════ BILLING & INSURANCE ════════ */}
              {activeModule === "billing" && (
                <div className="space-y-6">
                  <h2 className="text-sm font-semibold text-white/90">Billing & Insurance</h2>
                  {/* Billing table */}
                  <div>
                    <h3 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Today&apos;s Billing</h3>
                    <div className="rounded-xl border border-white/10 overflow-hidden">
                      <table className="w-full text-[10px]">
                        <thead><tr className="bg-white/5">
                          <th className="text-left p-2.5 text-white/40 font-medium">Description</th>
                          <th className="text-left p-2.5 text-white/40 font-medium hidden sm:table-cell">Type</th>
                          <th className="text-left p-2.5 text-white/40 font-medium hidden sm:table-cell">Department</th>
                          <th className="text-right p-2.5 text-white/40 font-medium">Amount (₹)</th>
                        </tr></thead>
                        <tbody>
                          {ehrBillingItems.map((b,i)=>(
                            <tr key={i} className="border-t border-white/5">
                              <td className="p-2.5 text-white/80">{b.desc}</td>
                              <td className="p-2.5 hidden sm:table-cell"><span className={`px-1.5 py-0.5 rounded text-[8px] font-mono ${b.type==="package"?"bg-cyan-500/20 text-cyan-300":b.type==="implant"?"bg-purple-500/20 text-purple-300":b.type==="investigation"?"bg-blue-500/20 text-blue-300":"bg-amber-500/20 text-amber-300"}`}>{b.type}</span></td>
                              <td className="p-2.5 text-white/50 hidden sm:table-cell">{b.dept}</td>
                              <td className="p-2.5 text-right font-mono text-white/80">₹{b.amount.toLocaleString("en-IN")}</td>
                            </tr>
                          ))}
                          <tr className="border-t-2 border-white/10 bg-white/5">
                            <td className="p-2.5 font-semibold text-white/90" colSpan={3}>Total</td>
                            <td className="p-2.5 text-right font-mono font-bold text-cyan-400">₹{ehrBillingItems.reduce((s,b)=>s+b.amount,0).toLocaleString("en-IN")}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Payment modes */}
                  <div>
                    <h3 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Payment Mode</h3>
                    <div className="grid sm:grid-cols-4 gap-3">
                      {["UPI / QR","Card","Net Banking","Cash"].map((m)=>(
                        <div key={m} onClick={()=>{setSelectedPayment(m);showToast(`Payment mode: ${m}`);}} className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${selectedPayment===m?"bg-cyan-500/15 border-cyan-500/30 ring-1 ring-cyan-400/30 scale-[1.02]":"bg-white/5 border-white/10 hover:border-cyan-500/30"}`}>
                          <p className={`text-[10px] ${selectedPayment===m?"text-cyan-300 font-medium":"text-white/60"}`}>{m}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Generate Invoice */}
                  <button disabled={!selectedPayment} onClick={()=>{setInvoiceGenerated(true);showToast(`Invoice generated — ₹${ehrBillingItems.reduce((s,b)=>s+b.amount,0).toLocaleString("en-IN")} via ${selectedPayment}`,"success");}} className={`w-full py-3 rounded-xl text-[11px] font-medium transition-all ${invoiceGenerated?"bg-green-500/15 text-green-300 border border-green-500/30":selectedPayment?"bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20":"bg-white/5 text-white/30 border border-white/10 cursor-not-allowed"}`}>
                    {invoiceGenerated?"✓ Invoice INV-2026-04-001 Generated — Download PDF":"Generate Invoice"}
                  </button>
                  {/* Insurance Claims */}
                  <div>
                    <h3 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Insurance Claims Tracker</h3>
                    <div className="space-y-2">
                      {ehrInsuranceClaims.map((c)=>{
                        const action = claimActions[c.id];
                        return (
                        <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-[9px] font-mono text-white/30">{c.id}</span>
                            <div className="min-w-0">
                              <p className="text-[10px] text-cyan-300 hover:underline cursor-pointer truncate" onClick={()=>goToPatient(c.patient,"registration")}>{c.patient}</p>
                              <p className="text-[8px] text-white/40">{c.tpa} • Submitted {c.submitted} • TAT: {c.tat}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-mono text-white/60">₹{c.amount.toLocaleString("en-IN")}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] border ${statusColor(c.status)}`}>{c.status}</span>
                            {!action&&c.status!=="approved"&&(
                              <button onClick={()=>{setClaimActions(prev=>({...prev,[c.id]:"followed-up"}));showToast(`Follow-up sent for claim ${c.id}`);}} className="px-2 py-1 rounded-lg text-[8px] bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 transition-colors">Follow Up</button>
                            )}
                            {action&&<span className="text-[8px] text-green-400">✓ {action}</span>}
                          </div>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ════════ DISCHARGE ════════ */}
              {activeModule === "discharge" && (
                <div className="space-y-6 max-w-3xl">
                  <h2 className="text-sm font-semibold text-white/90">Discharge Summary — Bilingual</h2>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <p className="text-xs font-bold text-white/90">DayCare Hospital — Discharge Summary</p>
                        <p className="text-[8px] text-white/40">NABH Accredited • ABDM Health Record</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-mono text-white/30">DC/2026/04/001</p>
                        <p className="text-[8px] text-white/30">06 April 2026</p>
                      </div>
                    </div>
                    {/* Patient details */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {l:"Patient",v:selectedPatient.name},{l:"UHID",v:selectedPatient.uhid},{l:"ABHA",v:selectedPatient.abha},
                        {l:"Age/Gender",v:`${selectedPatient.age}y / ${selectedPatient.gender==="M"?"Male":"Female"}`},{l:"Blood Group",v:selectedPatient.blood},{l:"Admission",v:"06 Apr 2026, 07:00"},
                      ].map(f=>(
                        <div key={f.l}>
                          <p className="text-[8px] text-white/30 uppercase">{f.l}</p>
                          <p className="text-[10px] text-white/70">{f.v}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3 pt-3 border-t border-white/10">
                      <div><p className="text-[8px] text-white/30 uppercase mb-0.5">Diagnosis (ICD-11)</p><p className="text-[10px] text-white/70">H25.1 — Age-related nuclear cataract, Left Eye</p></div>
                      <div><p className="text-[8px] text-white/30 uppercase mb-0.5">Procedure Performed</p><p className="text-[10px] text-white/70">Phacoemulsification with Posterior Chamber IOL Implantation (Left Eye) — Alcon AcrySof IQ SN60WF, +21.0D, Lot: ACR-2026-0412</p></div>
                      <div><p className="text-[8px] text-white/30 uppercase mb-0.5">Surgeon / Anesthetist</p><p className="text-[10px] text-white/70">Dr. Priya Mehta (Ophthalmology) / Dr. Raman Nair (Topical + Peribulbar)</p></div>
                      <div><p className="text-[8px] text-white/30 uppercase mb-0.5">Condition at Discharge</p><p className="text-[10px] text-green-400">Stable. Vision: 6/18 (L Eye). No complications. Eye pad in situ.</p></div>
                    </div>
                    {/* Discharge medications table */}
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-[8px] text-white/30 uppercase mb-2">Discharge Medications</p>
                      <div className="rounded-lg border border-white/10 overflow-hidden">
                        <table className="w-full text-[9px]">
                          <thead><tr className="bg-white/5"><th className="text-left p-2 text-white/40">Drug</th><th className="p-2 text-white/40">Dose</th><th className="p-2 text-white/40">Freq</th><th className="p-2 text-white/40">Duration</th></tr></thead>
                          <tbody>
                            {[
                              {d:"Moxifloxacin 0.5% Eye Drops",dose:"1 drop (L)",freq:"4x/day",dur:"2 weeks"},
                              {d:"Prednisolone 1% Eye Drops",dose:"1 drop (L)",freq:"6x/day → taper",dur:"6 weeks"},
                              {d:"Nepafenac 0.1% Eye Drops",dose:"1 drop (L)",freq:"3x/day",dur:"4 weeks"},
                              {d:"Tab. Paracetamol 500mg",dose:"500mg",freq:"SOS",dur:"3 days"},
                            ].map((r,i)=>(
                              <tr key={i} className="border-t border-white/5"><td className="p-2 text-white/70">{r.d}</td><td className="p-2 text-white/50 text-center">{r.dose}</td><td className="p-2 text-white/50 text-center">{r.freq}</td><td className="p-2 text-white/50 text-center">{r.dur}</td></tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-[8px] text-white/30 uppercase mb-1">Follow-up Instructions</p>
                      <ul className="text-[10px] text-white/60 space-y-1 list-disc list-inside">
                        <li>Remove eye pad after 24 hours</li>
                        <li>Wear dark glasses outdoors for 2 weeks</li>
                        <li>Do NOT rub the eye or lift heavy objects for 2 weeks</li>
                        <li>Follow-up: 08 April 2026 (Day 2) with Dr. Priya Mehta</li>
                        <li>Emergency: Call 1800-XXX-XXXX if sudden pain, redness, or vision loss</li>
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                      <div>
                        <p className="text-[8px] text-white/30">Digitally Signed</p>
                        <p className="text-[10px] text-cyan-400 font-mono">Dr. Priya Mehta — MCI Reg: MH-12345</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] text-white/30">ABDM Health Record</p>
                        <p className="text-[9px] text-green-400 font-mono">{abhaPushed?"Pushed to ABHA PHR ✓":"Pending ABHA Push"}</p>
                      </div>
                    </div>
                  </div>
                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button onClick={()=>{setDischargePrinted(true);showToast("Discharge summary printed","success");}} className={`flex-1 py-2.5 rounded-xl text-[10px] font-medium transition-all ${dischargePrinted?"bg-green-500/15 text-green-300 border border-green-500/30":"bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20"}`}>
                      {dischargePrinted?"✓ Printed — Download PDF":"Print Discharge Summary"}
                    </button>
                    <button onClick={()=>{setAbhaPushed(true);showToast("Health record pushed to ABHA PHR","success");}} className={`flex-1 py-2.5 rounded-xl text-[10px] font-medium transition-all ${abhaPushed?"bg-green-500/15 text-green-300 border border-green-500/30":"bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20"}`}>
                      {abhaPushed?"✓ Pushed to ABHA":"Push to ABHA PHR"}
                    </button>
                  </div>
                </div>
              )}

              {/* ════════ MIS DASHBOARD ════════ */}
              {activeModule === "mis" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-white/90">MIS Dashboard — Management View</h2>
                    <div className="flex gap-1 p-0.5 rounded-lg bg-white/5 border border-white/10">
                      {(["today","week","month"] as const).map((r)=>(
                        <button key={r} onClick={()=>{setMisDateRange(r);showToast(`Showing ${r} data`);}} className={`px-3 py-1.5 rounded-md text-[9px] transition-colors capitalize ${misDateRange===r?"bg-cyan-500/20 text-cyan-300":"text-white/40 hover:text-white/60"}`}>{r}</button>
                      ))}
                    </div>
                  </div>
                  {/* KPIs */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      {label:"Monthly Revenue",value:"₹38.4L",delta:"+12%",color:"text-cyan-400"},
                      {label:"Procedures (MTD)",value:"142",delta:"+18",color:"text-purple-400"},
                      {label:"OT Utilization",value:"78%",delta:"+5%",color:"text-green-400"},
                      {label:"Avg Turnaround",value:"4.2h",delta:"-0.3h",color:"text-cyan-400"},
                      {label:"Insurance Collection",value:"92%",delta:"+3%",color:"text-green-400"},
                      {label:"NABH Compliance",value:"96%",delta:"+1%",color:"text-green-400"},
                    ].map((k)=>(
                      <div key={k.label} className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[9px] text-white/40 mb-1">{k.label}</p>
                        <p className={`text-lg font-bold ${k.color}`}>{k.value}</p>
                        <p className="text-[9px] text-green-400 mt-0.5">{k.delta}</p>
                      </div>
                    ))}
                  </div>
                  {/* Revenue by specialty */}
                  <div>
                    <h3 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Revenue by Specialty (MTD)</h3>
                    <div className="space-y-2">
                      {[
                        {dept:"Ophthalmology",rev:980000,pct:25,color:"#8B5CF6"},
                        {dept:"Cardiology",rev:840000,pct:22,color:"#EF4444"},
                        {dept:"Orthopedics",rev:720000,pct:19,color:"#F97316"},
                        {dept:"Oncology (Chemo)",rev:560000,pct:15,color:"#EC4899"},
                        {dept:"ENT",rev:380000,pct:10,color:"#06B6D4"},
                        {dept:"Others",rev:360000,pct:9,color:"#64748B"},
                      ].map((d)=>(
                        <div key={d.dept} className="flex items-center gap-3">
                          <span className="text-[10px] text-white/60 w-32 shrink-0">{d.dept}</span>
                          <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div initial={{width:0}} animate={{width:`${d.pct}%`}} transition={{duration:0.8,delay:0.1}} className="h-full rounded-full" style={{backgroundColor:d.color+"90"}}/>
                          </div>
                          <span className="text-[10px] font-mono text-white/50 w-20 text-right">₹{(d.rev/100000).toFixed(1)}L</span>
                          <span className="text-[9px] text-white/30 w-10 text-right">{d.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Payer mix */}
                  <div>
                    <h3 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Payer Mix</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[
                        {label:"Self Pay / Cash",pct:32,color:"#06B6D4"},
                        {label:"TPA / Insurance",pct:28,color:"#8B5CF6"},
                        {label:"PMJAY",pct:22,color:"#10B981"},
                        {label:"CGHS / ECHS",pct:12,color:"#F59E0B"},
                        {label:"Corporate",pct:6,color:"#3B82F6"},
                      ].map((p)=>(
                        <div key={p.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                          <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{backgroundColor:p.color+"20",border:`1px solid ${p.color}40`}}>
                            <span className="text-xs font-bold" style={{color:p.color}}>{p.pct}%</span>
                          </div>
                          <p className="text-[8px] text-white/50">{p.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* NABH Quality Indicators */}
                  <div>
                    <h3 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">NABH Quality Indicators</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {[
                        {label:"Surgical Site Infection Rate",value:"0.8%",target:"<2%",ok:true},
                        {label:"Unplanned Re-admission (48h)",value:"0.3%",target:"<1%",ok:true},
                        {label:"WHO Checklist Compliance",value:"98%",target:">95%",ok:true},
                        {label:"Consent Documentation",value:"100%",target:"100%",ok:true},
                        {label:"Hand Hygiene Compliance",value:"91%",target:">90%",ok:true},
                        {label:"Medication Error Rate",value:"0.1%",target:"<0.5%",ok:true},
                        {label:"Patient Fall Rate",value:"0.0%",target:"0%",ok:true},
                        {label:"ADR Reporting Rate",value:"2.1%",target:">1%",ok:true},
                        {label:"Patient Satisfaction (NPS)",value:"72",target:">60",ok:true},
                      ].map((q)=>(
                        <div key={q.label} className={`p-3 rounded-xl border ${q.ok?"bg-green-500/5 border-green-500/15":"bg-red-500/5 border-red-500/15"}`}>
                          <p className="text-[9px] text-white/50 mb-1">{q.label}</p>
                          <div className="flex items-baseline justify-between">
                            <p className={`text-lg font-bold ${q.ok?"text-green-400":"text-red-400"}`}>{q.value}</p>
                            <p className="text-[8px] text-white/30">Target: {q.target}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ════════ CONSULTATION — SPECIALTY VIEW ════════ */}
              {activeModule === "consultation" && (
                <div className="space-y-6">
                  {/* Specialty header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{backgroundColor:accentColor+"20",border:`1px solid ${accentColor}40`}}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-white/90">{activeSpecialty?.label} Consultation</h2>
                      <p className="text-[9px] text-white/40">{selectedPatient.name} • {selectedPatient.uhid} • {selectedPatient.doctor}</p>
                    </div>
                    <span className="ml-auto px-3 py-1 rounded-full text-[9px] border" style={{backgroundColor:accentColor+"15",color:accentColor,borderColor:accentColor+"30"}}>{selectedPatient.procedure}</span>
                  </div>

                  {/* ───── OPHTHALMOLOGY ───── */}
                  {selectedPatient.specialty === "ophthalmology" && (
                    <div className="space-y-5">
                      {/* Visual Acuity */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>Visual Acuity</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {(["right","left"] as const).map((eye)=>{
                            const va = ophthalmologyExam.visualAcuity[eye];
                            return (
                              <div key={eye} className={`p-4 rounded-xl border ${eye==="left"?"bg-purple-500/5 border-purple-500/20":"bg-white/5 border-white/10"}`}>
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-xs font-semibold text-white/80">{eye==="right"?"OD (Right Eye)":"OS (Left Eye)"}</span>
                                  {eye==="left"&&<span className="text-[8px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">Surgical Eye</span>}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {[{l:"UCVA",v:va.ucva},{l:"BCVA",v:va.bcva},{l:"Near",v:va.near},{l:"Pinhole",v:va.pinhole}].map((f)=>(
                                    <div key={f.l} className="p-2 rounded-lg bg-white/3 border border-white/5">
                                      <p className="text-[7px] text-white/30 font-mono uppercase">{f.l}</p>
                                      <p className="text-sm font-bold text-white/80">{f.v}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* IOP */}
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-[8px] text-white/30 font-mono uppercase mb-0.5">IOP — Right (OD)</p>
                          <p className="text-lg font-bold text-white/80">{ophthalmologyExam.iop.right}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-[8px] text-white/30 font-mono uppercase mb-0.5">IOP — Left (OS)</p>
                          <p className="text-lg font-bold text-white/80">{ophthalmologyExam.iop.left}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-[8px] text-white/30 font-mono uppercase mb-0.5">Method / Time</p>
                          <p className="text-[10px] text-white/60">{ophthalmologyExam.iop.method}</p>
                          <p className="text-[9px] font-mono text-white/30">{ophthalmologyExam.iop.time}</p>
                        </div>
                      </div>

                      {/* A-Scan Biometry */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>A-Scan Biometry — {ophthalmologyExam.aScan.eye} Eye</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            {l:"Axial Length",v:ophthalmologyExam.aScan.axialLength},{l:"ACD",v:ophthalmologyExam.aScan.acd},
                            {l:"Lens Thickness",v:ophthalmologyExam.aScan.lensThickness},{l:"K Readings",v:ophthalmologyExam.aScan.kReadings},
                            {l:"Formula",v:ophthalmologyExam.aScan.formula},{l:"Target Refraction",v:ophthalmologyExam.aScan.targetRefraction},
                          ].map((f)=>(
                            <div key={f.l} className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                              <p className="text-[7px] text-white/30 font-mono uppercase mb-0.5">{f.l}</p>
                              <p className="text-[10px] text-white/70">{f.v}</p>
                            </div>
                          ))}
                          <div className="p-2.5 rounded-lg border col-span-2" style={{backgroundColor:accentColor+"10",borderColor:accentColor+"30"}}>
                            <p className="text-[7px] font-mono uppercase mb-0.5" style={{color:accentColor+"80"}}>Recommended IOL Power</p>
                            <p className="text-xl font-bold" style={{color:accentColor}}>{ophthalmologyExam.aScan.iolPower}</p>
                          </div>
                        </div>
                      </div>

                      {/* Slit Lamp */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>Slit Lamp Examination</h3>
                        <div className="rounded-xl border border-white/10 overflow-hidden">
                          <table className="w-full text-[10px]">
                            <thead><tr className="bg-white/5">
                              <th className="text-left p-2.5 text-white/40 font-medium w-28">Structure</th>
                              <th className="text-left p-2.5 text-white/40 font-medium">OD (Right)</th>
                              <th className="text-left p-2.5 text-white/40 font-medium">OS (Left)</th>
                            </tr></thead>
                            <tbody>
                              {ophthalmologyExam.slitLamp.map((r)=>(
                                <tr key={r.part} className="border-t border-white/5">
                                  <td className="p-2.5 font-medium text-white/60">{r.part}</td>
                                  <td className="p-2.5 text-white/50">{r.right}</td>
                                  <td className={`p-2.5 ${r.left.includes("NO4")||r.left.includes("Hazy")?"text-amber-300":"text-white/50"}`}>{r.left}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* IOL Details Card */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>IOL Implant Details</h3>
                        <div className="p-4 rounded-xl border" style={{backgroundColor:accentColor+"08",borderColor:accentColor+"25"}}>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                            {[
                              {l:"Manufacturer",v:ophthalmologyExam.iol.manufacturer},{l:"Model",v:ophthalmologyExam.iol.model},
                              {l:"Power",v:ophthalmologyExam.iol.power},{l:"Type",v:ophthalmologyExam.iol.type},
                              {l:"Batch / Lot",v:ophthalmologyExam.iol.batch},{l:"Expiry",v:ophthalmologyExam.iol.expiry},
                            ].map((f)=>(
                              <div key={f.l}>
                                <p className="text-[7px] text-white/30 font-mono uppercase mb-0.5">{f.l}</p>
                                <p className="text-[10px] text-white/80">{f.v}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                            <div className="flex gap-0.5">{ophthalmologyExam.iol.barcode.split("").map((d,i)=><div key={i} className="w-[2px] bg-white/40" style={{height:i%2===0?12:8}}/>)}</div>
                            <span className="text-[8px] font-mono text-white/30">{ophthalmologyExam.iol.barcode}</span>
                          </div>
                        </div>
                      </div>

                      {/* Phaco Procedure Template */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>Phacoemulsification — Operative Record <span className="text-white/30 normal-case">(click steps to mark done)</span></h3>
                        <div className="space-y-1.5">
                          {ophthalmologyExam.phacoTemplate.map((s,i)=>{
                            const isDone = phacoStepsDone[i]===true;
                            return (
                            <div key={i} onClick={()=>{setPhacoStepsDone(prev=>({...prev,[i]:!isDone}));showToast(isDone?`Step ${i+1} unmarked`:`Step ${i+1}: ${s.step} — Done`,"success");}} className={`flex gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isDone?"bg-green-500/5 border-green-500/20":"bg-white/5 border-white/10 hover:border-white/20"}`}>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 transition-colors ${isDone?"bg-green-500/20 text-green-400":""}`} style={isDone?{}:{backgroundColor:accentColor+"20",color:accentColor}}>{isDone?"✓":i+1}</div>
                              <div>
                                <p className={`text-[10px] font-semibold ${isDone?"text-green-300 line-through":"text-white/80"}`}>{s.step}</p>
                                <p className="text-[9px] text-white/50 leading-relaxed">{s.detail}</p>
                              </div>
                            </div>
                            );
                          })}
                        </div>
                        {Object.values(phacoStepsDone).filter(Boolean).length===ophthalmologyExam.phacoTemplate.length&&(
                          <div className="mt-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                            <p className="text-[10px] text-green-300 font-medium">✓ All procedure steps completed — Operative record ready</p>
                          </div>
                        )}
                      </div>

                      {/* Post-Op */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>Post-Operative Assessment (Day 0)</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {ophthalmologyExam.postOp.map((p)=>(
                            <div key={p.check} className={`p-3 rounded-xl border ${p.status==="normal"?"bg-green-500/5 border-green-500/15":"bg-amber-500/5 border-amber-500/15"}`}>
                              <p className="text-[9px] text-white/40 mb-0.5">{p.check}</p>
                              <p className={`text-[10px] font-medium ${p.status==="normal"?"text-green-400":"text-amber-300"}`}>{p.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ───── DENTAL SURGERY ───── */}
                  {selectedPatient.specialty === "dental" && (
                    <div className="space-y-5">
                      {/* Interactive Dental Chart */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>Dental Chart — FDI Notation</h3>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          {/* Upper teeth */}
                          <div className="mb-1 text-center"><span className="text-[8px] text-white/20 font-mono">UPPER</span></div>
                          <div className="flex justify-center gap-1 mb-1">
                            {/* Upper Right 18-11 */}
                            {dentalChart.filter(t=>t.num>=11&&t.num<=18).sort((a,b)=>b.num-a.num).map((t)=>{
                              const col = t.status==="missing"?"bg-white/5 text-white/15 border-white/5":t.status==="decayed"?"bg-red-500/20 text-red-300 border-red-500/30":t.status==="restored"?"bg-blue-500/20 text-blue-300 border-blue-500/30":t.status==="root-canal"?"bg-amber-500/20 text-amber-300 border-amber-500/30":t.status==="treatment"?"bg-purple-500/20 text-purple-300 border-purple-500/30":"bg-white/8 text-white/60 border-white/10";
                              return <button key={t.num} onClick={()=>setSelectedTooth(t.num)} className={`w-8 h-9 rounded-lg border text-[9px] font-mono transition-all ${col} ${selectedTooth===t.num?"ring-2 ring-cyan-400 scale-110":""}`}>{t.num}</button>;
                            })}
                            <div className="w-px bg-white/10 mx-1"/>
                            {/* Upper Left 21-28 */}
                            {dentalChart.filter(t=>t.num>=21&&t.num<=28).sort((a,b)=>a.num-b.num).map((t)=>{
                              const col = t.status==="missing"?"bg-white/5 text-white/15 border-white/5":t.status==="decayed"?"bg-red-500/20 text-red-300 border-red-500/30":t.status==="restored"?"bg-blue-500/20 text-blue-300 border-blue-500/30":t.status==="root-canal"?"bg-amber-500/20 text-amber-300 border-amber-500/30":t.status==="treatment"?"bg-purple-500/20 text-purple-300 border-purple-500/30":"bg-white/8 text-white/60 border-white/10";
                              return <button key={t.num} onClick={()=>setSelectedTooth(t.num)} className={`w-8 h-9 rounded-lg border text-[9px] font-mono transition-all ${col} ${selectedTooth===t.num?"ring-2 ring-cyan-400 scale-110":""}`}>{t.num}</button>;
                            })}
                          </div>
                          {/* Midline labels */}
                          <div className="flex justify-center items-center gap-1 my-1">
                            <span className="text-[7px] text-white/20 font-mono">R</span>
                            <div className="flex-1 max-w-[300px] border-t border-dashed border-white/10"/>
                            <span className="text-[7px] text-white/20 font-mono">L</span>
                          </div>
                          {/* Lower teeth */}
                          <div className="flex justify-center gap-1 mt-1">
                            {/* Lower Right 48-41 */}
                            {dentalChart.filter(t=>t.num>=41&&t.num<=48).sort((a,b)=>b.num-a.num).map((t)=>{
                              const col = t.status==="missing"?"bg-white/5 text-white/15 border-white/5":t.status==="decayed"?"bg-red-500/20 text-red-300 border-red-500/30":t.status==="restored"?"bg-blue-500/20 text-blue-300 border-blue-500/30":t.status==="root-canal"?"bg-amber-500/20 text-amber-300 border-amber-500/30":t.status==="treatment"?"bg-purple-500/20 text-purple-300 border-purple-500/30":"bg-white/8 text-white/60 border-white/10";
                              return <button key={t.num} onClick={()=>setSelectedTooth(t.num)} className={`w-8 h-9 rounded-lg border text-[9px] font-mono transition-all ${col} ${selectedTooth===t.num?"ring-2 ring-cyan-400 scale-110":""}`}>{t.num}</button>;
                            })}
                            <div className="w-px bg-white/10 mx-1"/>
                            {/* Lower Left 31-38 */}
                            {dentalChart.filter(t=>t.num>=31&&t.num<=38).sort((a,b)=>a.num-b.num).map((t)=>{
                              const col = t.status==="missing"?"bg-white/5 text-white/15 border-white/5":t.status==="decayed"?"bg-red-500/20 text-red-300 border-red-500/30":t.status==="restored"?"bg-blue-500/20 text-blue-300 border-blue-500/30":t.status==="root-canal"?"bg-amber-500/20 text-amber-300 border-amber-500/30":t.status==="treatment"?"bg-purple-500/20 text-purple-300 border-purple-500/30":"bg-white/8 text-white/60 border-white/10";
                              return <button key={t.num} onClick={()=>setSelectedTooth(t.num)} className={`w-8 h-9 rounded-lg border text-[9px] font-mono transition-all ${col} ${selectedTooth===t.num?"ring-2 ring-cyan-400 scale-110":""}`}>{t.num}</button>;
                            })}
                          </div>
                          <div className="mb-1 text-center mt-1"><span className="text-[8px] text-white/20 font-mono">LOWER</span></div>
                          {/* Legend */}
                          <div className="flex flex-wrap justify-center gap-3 mt-3 pt-3 border-t border-white/10">
                            {([["Present","bg-white/8 border-white/10"],["Decayed","bg-red-500/20 border-red-500/30"],["Restored","bg-blue-500/20 border-blue-500/30"],["RCT","bg-amber-500/20 border-amber-500/30"],["Treatment","bg-purple-500/20 border-purple-500/30"],["Missing","bg-white/5 border-white/5"]] as const).map(([label,cls])=>(
                              <div key={label} className="flex items-center gap-1.5">
                                <div className={`w-3 h-3 rounded border ${cls}`}/>
                                <span className="text-[8px] text-white/40">{label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Tooth Detail Panel */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>
                          Tooth #{selectedTooth} — Detail
                        </h3>
                        {(()=>{
                          const tooth = dentalChart.find(t=>t.num===selectedTooth);
                          if(!tooth) return null;
                          return (
                            <div className="p-4 rounded-xl border" style={{backgroundColor:accentColor+"08",borderColor:accentColor+"25"}}>
                              <div className="grid sm:grid-cols-3 gap-3">
                                <div><p className="text-[7px] text-white/30 font-mono uppercase mb-0.5">FDI Number</p><p className="text-lg font-bold" style={{color:accentColor}}>#{tooth.num}</p></div>
                                <div><p className="text-[7px] text-white/30 font-mono uppercase mb-0.5">Status</p><p className="text-[11px] text-white/80 capitalize">{tooth.status.replace("-"," ")}</p></div>
                                <div><p className="text-[7px] text-white/30 font-mono uppercase mb-0.5">Notes</p><p className="text-[10px] text-white/60">{tooth.note||"No remarks"}</p></div>
                              </div>
                              {tooth.num===38&&(
                                <div className="mt-3 pt-3 border-t border-white/10">
                                  <p className="text-[9px] text-white/50"><strong className="text-white/70">Diagnosis:</strong> {dentalProcedure.diagnosis}</p>
                                  <p className="text-[9px] text-white/50 mt-1"><strong className="text-white/70">IAN Proximity:</strong> {dentalProcedure.ianProximity}</p>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>

                      {/* OPG / Imaging */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>Imaging — OPG & CBCT</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="h-24 rounded-lg bg-white/3 border border-dashed border-white/10 flex flex-col items-center justify-center mb-2">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-1 opacity-40"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="8" cy="8" r="2"/><path d="m21 15-5-5L5 21"/></svg>
                              <span className="text-[8px] text-white/20">OPG Panoramic View</span>
                            </div>
                            <p className="text-[9px] text-white/50"><strong className="text-white/70">Findings:</strong> Mesioangular impaction #38, Class II Position B. Distal caries #46. #28 absent.</p>
                          </div>
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="h-24 rounded-lg bg-white/3 border border-dashed border-white/10 flex flex-col items-center justify-center mb-2">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-1 opacity-40"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8"/><path d="m7.5 4.27 9 5.15"/></svg>
                              <span className="text-[8px] text-white/20">CBCT Cross-Section</span>
                            </div>
                            <p className="text-[9px] text-white/50"><strong className="text-white/70">CBCT #38:</strong> IAN canal 2.1mm inferior. Lingual cortex intact. Buccal approach recommended.</p>
                          </div>
                        </div>
                      </div>

                      {/* Procedure Template */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>Surgical Extraction #38 — Operative Record <span className="text-white/30 normal-case">(click steps to mark done)</span></h3>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-3">
                          <p className="text-[9px] text-white/50"><strong className="text-white/70">Anesthesia:</strong> {dentalProcedure.anesthesia}</p>
                        </div>
                        <div className="space-y-1.5">
                          {dentalProcedure.steps.map((s,i)=>{
                            const isDone = dentalStepsDone[i]===true;
                            return (
                            <div key={i} onClick={()=>{setDentalStepsDone(prev=>({...prev,[i]:!isDone}));showToast(isDone?`Step ${i+1} unmarked`:`Step ${i+1}: ${s.step} — Done`,"success");}} className={`flex gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isDone?"bg-green-500/5 border-green-500/20":"bg-white/5 border-white/10 hover:border-white/20"}`}>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 transition-colors ${isDone?"bg-green-500/20 text-green-400":""}`} style={isDone?{}:{backgroundColor:accentColor+"20",color:accentColor}}>{isDone?"✓":i+1}</div>
                              <div>
                                <p className={`text-[10px] font-semibold ${isDone?"text-green-300 line-through":"text-white/80"}`}>{s.step}</p>
                                <p className="text-[9px] text-white/50 leading-relaxed">{s.detail}</p>
                              </div>
                            </div>
                            );
                          })}
                        </div>
                        {Object.values(dentalStepsDone).filter(Boolean).length===dentalProcedure.steps.length&&(
                          <div className="mt-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                            <p className="text-[10px] text-green-300 font-medium">✓ All extraction steps completed — Operative record ready</p>
                          </div>
                        )}
                      </div>

                      {/* Post-Op Instructions */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>Post-Operative Instructions</h3>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <ul className="space-y-1.5">
                            {dentalProcedure.postOp.map((p,i)=>(
                              <li key={i} className="flex items-start gap-2.5">
                                <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5" style={{backgroundColor:accentColor+"20",color:accentColor}}>{i+1}</div>
                                <p className="text-[10px] text-white/60 leading-relaxed">{p}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ───── GYNECOLOGY ───── */}
                  {selectedPatient.specialty === "gynec" && (
                    <div className="space-y-5">
                      {/* Menstrual History */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>Menstrual History</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                {l:"LMP",v:gynecWorkup.menstrualHistory.lmp},{l:"Cycle Length",v:gynecWorkup.menstrualHistory.cycleLength},
                                {l:"Regularity",v:gynecWorkup.menstrualHistory.regularity},{l:"Flow Duration",v:gynecWorkup.menstrualHistory.flowDuration},
                                {l:"Flow Pattern",v:gynecWorkup.menstrualHistory.flow},{l:"Dysmenorrhea",v:gynecWorkup.menstrualHistory.dysmenorrhea},
                              ].map((f)=>(
                                <div key={f.l} className="p-2 rounded-lg bg-white/3 border border-white/5">
                                  <p className="text-[7px] text-white/30 font-mono uppercase">{f.l}</p>
                                  <p className="text-[10px] text-white/70">{f.v}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-[10px] font-medium text-white/70 mb-3">Obstetric History</p>
                            <div className="flex gap-3">
                              {[
                                {l:"G (Gravida)",v:gynecWorkup.menstrualHistory.gravida},
                                {l:"P (Para)",v:gynecWorkup.menstrualHistory.para},
                                {l:"A (Abortion)",v:gynecWorkup.menstrualHistory.abortion},
                                {l:"L (Living)",v:gynecWorkup.menstrualHistory.living},
                              ].map((f)=>(
                                <div key={f.l} className="text-center flex-1">
                                  <p className="text-2xl font-bold" style={{color:accentColor}}>{f.v}</p>
                                  <p className="text-[7px] text-white/30 font-mono">{f.l}</p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 pt-3 border-t border-white/10">
                              <p className="text-[9px] text-amber-300"><strong>Chief Complaint:</strong> {gynecWorkup.menstrualHistory.intermenstrualBleeding}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* UPT — Mandatory */}
                      <div className="p-4 rounded-xl border" style={{backgroundColor:"#10B98110",borderColor:"#10B98130"}}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-green-400">Urine Pregnancy Test — NEGATIVE</p>
                            <p className="text-[9px] text-white/40">{gynecWorkup.upt.method} • {gynecWorkup.upt.date} • Verified by {gynecWorkup.upt.verifiedBy}</p>
                          </div>
                          <span className="px-2.5 py-1 text-[9px] rounded-full bg-green-500/20 text-green-300 border border-green-500/30">Mandatory Pre-Procedure ✓</span>
                        </div>
                      </div>

                      {/* PCPNDT Compliance Banner */}
                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-amber-300">PCPNDT Act 1994 — Form F Compliance</p>
                            <p className="text-[9px] text-white/50 mt-1"><strong className="text-white/60">Purpose:</strong> {gynecWorkup.pcpndt.purpose}</p>
                            <p className="text-[9px] text-white/50 mt-0.5"><strong className="text-white/60">Registered Sonologist:</strong> {gynecWorkup.pcpndt.sonologist}</p>
                            <p className="text-[9px] text-amber-400/70 mt-2 italic">&quot;{gynecWorkup.pcpndt.declaration}&quot;</p>
                            <p className="text-[8px] font-mono text-white/30 mt-1">Form F: Auto-generated • Patient + Doctor signed digitally</p>
                          </div>
                        </div>
                      </div>

                      {/* Pap Smear / HPV */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>Cervical Screening</h3>
                        <div className="grid sm:grid-cols-4 gap-2">
                          {[
                            {l:"Last Pap Smear",v:gynecWorkup.papSmear.lastDate},{l:"Result",v:gynecWorkup.papSmear.result},
                            {l:"Bethesda Adequacy",v:gynecWorkup.papSmear.bethesda},{l:"HPV Status",v:gynecWorkup.papSmear.hpv},
                          ].map((f)=>(
                            <div key={f.l} className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                              <p className="text-[7px] text-white/30 font-mono uppercase mb-0.5">{f.l}</p>
                              <p className="text-[10px] text-white/70">{f.v}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Investigations */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>Pre-Procedure Investigations</h3>
                        <div className="rounded-xl border border-white/10 overflow-hidden">
                          <table className="w-full text-[10px]">
                            <thead><tr className="bg-white/5">
                              <th className="text-left p-2.5 text-white/40 font-medium">Test</th>
                              <th className="text-left p-2.5 text-white/40 font-medium">Result</th>
                              <th className="text-left p-2.5 text-white/40 font-medium">Status</th>
                            </tr></thead>
                            <tbody>
                              {gynecWorkup.investigations.map((t)=>(
                                <tr key={t.test} className="border-t border-white/5">
                                  <td className="p-2.5 text-white/70">{t.test}</td>
                                  <td className={`p-2.5 ${t.status==="abnormal"?"text-amber-300":t.status==="low"?"text-red-300":"text-white/60"}`}>{t.result}</td>
                                  <td className="p-2.5"><span className={`px-2 py-0.5 rounded-full text-[9px] ${t.status==="normal"?"bg-green-500/20 text-green-300":t.status==="low"?"bg-red-500/20 text-red-300":"bg-amber-500/20 text-amber-300"}`}>{t.status}</span></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Hysteroscopy Findings */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>Hysteroscopy — Operative Findings</h3>
                        <div className="p-4 rounded-xl border" style={{backgroundColor:accentColor+"08",borderColor:accentColor+"25"}}>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {[
                              {l:"Cervical Canal",v:gynecWorkup.hysteroscopyFindings.cervicalCanal},
                              {l:"Uterine Cavity",v:gynecWorkup.hysteroscopyFindings.uterineShape},
                              {l:"Endometrium",v:gynecWorkup.hysteroscopyFindings.endometrium},
                              {l:"Polyp / Finding",v:gynecWorkup.hysteroscopyFindings.polyp},
                              {l:"Tubal Ostia",v:gynecWorkup.hysteroscopyFindings.tubalOstia},
                              {l:"Distension Media",v:gynecWorkup.hysteroscopyFindings.distensionMedia},
                            ].map((f)=>(
                              <div key={f.l} className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                                <p className="text-[7px] text-white/30 font-mono uppercase mb-0.5">{f.l}</p>
                                <p className={`text-[10px] ${f.l.includes("Polyp")?"text-amber-300":"text-white/70"}`}>{f.v}</p>
                              </div>
                            ))}
                          </div>
                          <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-white/10">
                            {[
                              {l:"Biopsy",v:gynecWorkup.hysteroscopyFindings.biopsyTaken?"Yes — Specimen sent":"No"},
                              {l:"Blood Loss",v:gynecWorkup.hysteroscopyFindings.bloodLoss},
                              {l:"Duration",v:gynecWorkup.hysteroscopyFindings.duration},
                            ].map((f)=>(
                              <div key={f.l}>
                                <p className="text-[7px] text-white/30 font-mono uppercase">{f.l}</p>
                                <p className="text-[10px] text-white/70">{f.v}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-[9px] text-white/50"><strong className="text-white/70">Specimen:</strong> {gynecWorkup.hysteroscopyFindings.specimenSent}</p>
                            <p className="text-[9px] text-green-400 mt-1">Complications: {gynecWorkup.hysteroscopyFindings.complications}</p>
                          </div>
                        </div>
                      </div>

                      {/* Post-Op & Follow-up */}
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{color:accentColor}}>Post-Procedure Instructions & Follow-Up <span className="text-white/30 normal-case">(click to mark counselled)</span></h3>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <ul className="space-y-1.5">
                            {gynecWorkup.postOp.map((p,i)=>{
                              const isDone = gynecStepsDone[i]===true;
                              return (
                              <li key={i} onClick={()=>{setGynecStepsDone(prev=>({...prev,[i]:!isDone}));showToast(isDone?`Item ${i+1} unmarked`:`Counselled: ${p.slice(0,40)}…`,"success");}} className={`flex items-start gap-2.5 cursor-pointer p-1.5 rounded-lg transition-colors ${isDone?"bg-green-500/5":"hover:bg-white/3"}`}>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5 transition-colors ${isDone?"bg-green-500/20 text-green-400":""}`} style={isDone?{}:{backgroundColor:accentColor+"20",color:accentColor}}>{isDone?"✓":i+1}</div>
                                <p className={`text-[10px] leading-relaxed ${isDone?"text-green-300/70 line-through":p.includes("Red flags")?"text-red-300":"text-white/60"}`}>{p}</p>
                              </li>
                              );
                            })}
                          </ul>
                          {Object.values(gynecStepsDone).filter(Boolean).length===gynecWorkup.postOp.length&&(
                            <div className="mt-3 pt-3 border-t border-white/10 text-center">
                              <p className="text-[10px] text-green-300 font-medium">✓ All post-op instructions counselled — Patient ready for discharge</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ───── NON-SUPPORTED SPECIALTY ───── */}
                  {!["ophthalmology","dental","gynec"].includes(selectedPatient.specialty) && (
                    <div className="p-8 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor:accentColor+"20",border:`1px solid ${accentColor}40`}}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                      </div>
                      <p className="text-sm font-semibold text-white/70 mb-1">{activeSpecialty?.label} Consultation</p>
                      <p className="text-[10px] text-white/40">Detailed consultation template for {activeSpecialty?.label} is coming soon.</p>
                      <p className="text-[9px] text-white/30 mt-2">Select an Ophthalmology, Dental, or Gynecology patient from the right panel to view specialty workflow.</p>
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right Panel — Patient Context ── */}
        <aside className="w-52 shrink-0 border-l border-white/10 bg-[#0D1525] overflow-y-auto hidden lg:block">
          <div className="p-3 border-b border-white/10">
            <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2">Active Patients</p>
          </div>
          <div className="p-2 space-y-1">
            {ehrPatients.map((p)=>(
              <button key={p.id} onClick={()=>setSelectedPatient(p)}
                className={`w-full text-left p-2 rounded-lg transition-colors ${selectedPatient.id===p.id?"bg-cyan-500/10 border border-cyan-500/20":"hover:bg-white/5 border border-transparent"}`}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[7px] font-bold shrink-0" style={{backgroundColor:(ehrSpecialties.find(s=>s.key===p.specialty)?.color||"#06B6D4")+"20",color:ehrSpecialties.find(s=>s.key===p.specialty)?.color||"#06B6D4"}}>
                    {p.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] text-white/70 truncate">{p.name.split(" ").slice(0,2).join(" ")}</p>
                    <p className="text-[7px] text-white/30 truncate">{p.procedure}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[7px] text-white/20 font-mono">{p.bay}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[7px] border ${statusColor(p.status)}`}>{p.status}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </PrototypeShell>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   IOT DASHBOARD PROTOTYPE — CPCB Ambient Air Quality Monitoring
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

type AQICategory = "good"|"satisfactory"|"moderate"|"poor"|"very-poor"|"severe";
type PCBModule = "dashboard"|"stations"|"map"|"pollutants"|"alerts"|"compliance"|"machines"|"reports";

const aqiColor = (cat:AQICategory)=>({good:"#22C55E",satisfactory:"#84CC16","moderate":"#EAB308",poor:"#F97316","very-poor":"#EF4444",severe:"#7F1D1D"}[cat]);
const aqiBg = (cat:AQICategory)=>({good:"bg-green-500/15 text-green-300 border-green-500/30",satisfactory:"bg-lime-500/15 text-lime-300 border-lime-500/30","moderate":"bg-yellow-500/15 text-yellow-300 border-yellow-500/30",poor:"bg-orange-500/15 text-orange-300 border-orange-500/30","very-poor":"bg-red-500/15 text-red-300 border-red-500/30",severe:"bg-red-900/30 text-red-200 border-red-800/40"}[cat]);

const stations = [
  { id:"MPCB-MH-001", name:"Andheri (W) — Mumbai", state:"Maharashtra", city:"Mumbai", lat:19.136, lng:72.835, aqi:142, cat:"moderate" as AQICategory, pm25:58.3, pm10:112, so2:14.2, no2:38.7, co:1.2, o3:42.1, nh3:18.4, pb:0.32, benzene:2.8, temp:33.2, humidity:72, windSpeed:8.4, windDir:"SW", uptime:99.2, lastSync:"2 min ago", machineStatus:"online" as const },
  { id:"KSPCB-KA-014", name:"Peenya Industrial — Bengaluru", state:"Karnataka", city:"Bengaluru", lat:13.032, lng:77.519, aqi:198, cat:"poor" as AQICategory, pm25:89.2, pm10:168, so2:22.8, no2:52.3, co:2.1, o3:28.4, nh3:32.1, pb:0.48, benzene:5.2, temp:28.6, humidity:58, windSpeed:4.2, windDir:"NE", uptime:97.8, lastSync:"1 min ago", machineStatus:"online" as const },
  { id:"DPCC-DL-007", name:"Anand Vihar — Delhi", state:"Delhi", city:"Delhi", lat:28.646, lng:77.316, aqi:312, cat:"very-poor" as AQICategory, pm25:186.4, pm10:298, so2:18.9, no2:78.2, co:3.8, o3:18.2, nh3:42.8, pb:0.72, benzene:8.4, temp:38.4, humidity:42, windSpeed:3.1, windDir:"NW", uptime:96.4, lastSync:"3 min ago", machineStatus:"warning" as const },
  { id:"GPCB-GJ-009", name:"Vatva GIDC — Ahmedabad", state:"Gujarat", city:"Ahmedabad", lat:22.972, lng:72.613, aqi:224, cat:"poor" as AQICategory, pm25:98.6, pm10:192, so2:34.2, no2:44.8, co:1.8, o3:32.6, nh3:28.9, pb:0.56, benzene:6.1, temp:36.8, humidity:38, windSpeed:6.8, windDir:"W", uptime:98.6, lastSync:"1 min ago", machineStatus:"online" as const },
  { id:"TNPCB-TN-022", name:"Manali Industrial — Chennai", state:"Tamil Nadu", city:"Chennai", lat:13.167, lng:80.262, aqi:178, cat:"poor" as AQICategory, pm25:72.4, pm10:148, so2:28.4, no2:42.1, co:1.6, o3:38.2, nh3:26.4, pb:0.44, benzene:4.8, temp:34.2, humidity:78, windSpeed:12.2, windDir:"SE", uptime:99.8, lastSync:"1 min ago", machineStatus:"online" as const },
  { id:"WBPCB-WB-011", name:"Howrah Industrial — Kolkata", state:"West Bengal", city:"Kolkata", lat:22.593, lng:88.318, aqi:268, cat:"very-poor" as AQICategory, pm25:142.8, pm10:238, so2:24.6, no2:62.4, co:2.8, o3:22.8, nh3:38.2, pb:0.64, benzene:7.2, temp:35.6, humidity:82, windSpeed:5.4, windDir:"S", uptime:94.2, lastSync:"8 min ago", machineStatus:"warning" as const },
  { id:"RSPCB-RJ-005", name:"Sanganer — Jaipur", state:"Rajasthan", city:"Jaipur", lat:26.827, lng:75.808, aqi:92, cat:"satisfactory" as AQICategory, pm25:34.2, pm10:78, so2:8.4, no2:22.8, co:0.8, o3:48.2, nh3:12.4, pb:0.18, benzene:1.8, temp:39.4, humidity:28, windSpeed:14.2, windDir:"W", uptime:99.6, lastSync:"2 min ago", machineStatus:"online" as const },
  { id:"MPPCB-MP-003", name:"Mandideep — Bhopal", state:"Madhya Pradesh", city:"Bhopal", lat:23.086, lng:77.505, aqi:168, cat:"moderate" as AQICategory, pm25:68.4, pm10:138, so2:18.2, no2:36.4, co:1.4, o3:44.8, nh3:22.1, pb:0.38, benzene:3.4, temp:37.2, humidity:44, windSpeed:7.2, windDir:"NW", uptime:98.2, lastSync:"2 min ago", machineStatus:"online" as const },
  { id:"HSPCB-HR-008", name:"IMT Manesar — Gurugram", state:"Haryana", city:"Gurugram", lat:28.359, lng:76.935, aqi:288, cat:"very-poor" as AQICategory, pm25:162.8, pm10:268, so2:22.4, no2:72.8, co:3.2, o3:16.4, nh3:44.2, pb:0.68, benzene:7.8, temp:37.8, humidity:46, windSpeed:4.8, windDir:"NW", uptime:95.8, lastSync:"5 min ago", machineStatus:"online" as const },
  { id:"OSPCB-OR-006", name:"Talcher — Angul", state:"Odisha", city:"Angul", lat:20.949, lng:85.234, aqi:348, cat:"severe" as AQICategory, pm25:218.4, pm10:342, so2:48.2, no2:84.6, co:4.2, o3:12.8, nh3:52.4, pb:0.88, benzene:9.6, temp:36.4, humidity:62, windSpeed:3.8, windDir:"E", uptime:88.4, lastSync:"12 min ago", machineStatus:"critical" as const },
  { id:"CPCB-UP-018", name:"Noida Sec-62 — Noida", state:"Uttar Pradesh", city:"Noida", lat:28.627, lng:77.365, aqi:256, cat:"very-poor" as AQICategory, pm25:148.2, pm10:242, so2:16.8, no2:68.4, co:2.6, o3:18.8, nh3:38.6, pb:0.58, benzene:6.8, temp:38.2, humidity:44, windSpeed:3.4, windDir:"NW", uptime:97.2, lastSync:"3 min ago", machineStatus:"online" as const },
  { id:"APPCB-AP-012", name:"Gajuwaka — Visakhapatnam", state:"Andhra Pradesh", city:"Visakhapatnam", lat:17.704, lng:83.210, aqi:48, cat:"good" as AQICategory, pm25:18.2, pm10:42, so2:6.2, no2:14.8, co:0.4, o3:52.4, nh3:8.2, pb:0.12, benzene:0.8, temp:30.8, humidity:74, windSpeed:16.8, windDir:"SE", uptime:99.9, lastSync:"1 min ago", machineStatus:"online" as const },
];

const naaqs = [
  { pollutant:"PM2.5", unit:"µg/m³", limit24h:60, limitAnnual:40, method:"BAM / Gravimetric" },
  { pollutant:"PM10", unit:"µg/m³", limit24h:100, limitAnnual:60, method:"BAM / Gravimetric" },
  { pollutant:"SO₂", unit:"µg/m³", limit24h:80, limitAnnual:50, method:"UV Fluorescence" },
  { pollutant:"NO₂", unit:"µg/m³", limit24h:80, limitAnnual:40, method:"Chemiluminescence" },
  { pollutant:"CO", unit:"mg/m³", limit24h:4, limitAnnual:2, method:"NDIR" },
  { pollutant:"O₃", unit:"µg/m³", limit24h:100, limitAnnual:0, method:"UV Photometry" },
  { pollutant:"NH₃", unit:"µg/m³", limit24h:400, limitAnnual:100, method:"Chemiluminescence" },
  { pollutant:"Pb", unit:"µg/m³", limit24h:1, limitAnnual:0.5, method:"AAS / ICP-MS" },
  { pollutant:"Benzene", unit:"µg/m³", limit24h:0, limitAnnual:5, method:"GC-FID" },
];

const machineInventory = [
  { id:"BAM-1020-A", type:"PM2.5 Beta Attenuation Monitor", make:"Met One / BAM 1020", station:"Andheri (W)", calibDue:"2026-06-15", status:"operational" as const, uptime:99.4, lastService:"2026-02-10", firmware:"v3.2.1" },
  { id:"TEOM-1400-B", type:"PM10 TEOM Analyzer", make:"Thermo Fisher TEOM 1400ab", station:"Andheri (W)", calibDue:"2026-05-22", status:"operational" as const, uptime:98.8, lastService:"2026-01-18", firmware:"v2.8.4" },
  { id:"API-100E-C", type:"SO₂ UV Fluorescence Analyzer", make:"Teledyne API 100E", station:"Peenya Industrial", calibDue:"2026-04-12", status:"calib-due" as const, uptime:97.2, lastService:"2025-12-08", firmware:"v4.1.0" },
  { id:"API-200E-D", type:"NO₂ Chemiluminescence Analyzer", make:"Teledyne API 200E", station:"Anand Vihar", calibDue:"2026-07-01", status:"operational" as const, uptime:96.8, lastService:"2026-03-05", firmware:"v3.6.2" },
  { id:"API-300E-E", type:"CO NDIR Analyzer", make:"Teledyne API 300E", station:"Anand Vihar", calibDue:"2026-05-18", status:"operational" as const, uptime:95.4, lastService:"2026-02-22", firmware:"v2.4.1" },
  { id:"API-400E-F", type:"O₃ UV Photometry Analyzer", make:"Teledyne API 400E", station:"Vatva GIDC", calibDue:"2026-06-30", status:"operational" as const, uptime:98.2, lastService:"2026-01-28", firmware:"v3.0.5" },
  { id:"MET-200-G", type:"Meteorological Sensor Suite", make:"Enviro Technology AWS", station:"Talcher", calibDue:"2026-04-08", status:"fault" as const, uptime:88.4, lastService:"2025-11-14", firmware:"v1.9.3" },
  { id:"DAS-500-H", type:"Data Acquisition System", make:"Envidas DAS", station:"Howrah Industrial", calibDue:"N/A", status:"sync-issue" as const, uptime:92.6, lastService:"2026-03-18", firmware:"v5.2.0" },
  { id:"BAM-1020-I", type:"PM2.5 Beta Attenuation Monitor", make:"Met One / BAM 1020", station:"IMT Manesar", calibDue:"2026-08-10", status:"operational" as const, uptime:97.8, lastService:"2026-02-28", firmware:"v3.2.1" },
  { id:"GC-FID-J", type:"Benzene GC-FID Analyzer", make:"Synspec Alpha 115", station:"Talcher", calibDue:"2026-04-20", status:"fault" as const, uptime:84.2, lastService:"2025-10-22", firmware:"v2.1.8" },
  { id:"CAAQMS-K", type:"Continuous AAQ Monitoring System", make:"Acoem Serinus 30", station:"Gajuwaka — Visakhapatnam", calibDue:"2026-09-01", status:"operational" as const, uptime:99.8, lastService:"2026-03-12", firmware:"v6.0.2" },
  { id:"BAM-1020-L", type:"PM2.5 Beta Attenuation Monitor", make:"Met One / BAM 1020", station:"Noida Sec-62", calibDue:"2026-05-28", status:"operational" as const, uptime:97.6, lastService:"2026-02-14", firmware:"v3.2.1" },
];

const complianceAlerts = [
  { id:"CMP-001", station:"Talcher — Angul", pollutant:"PM2.5", value:218.4, limit:60, exceedance:"264%", severity:"critical" as const, since:"72h", action:"SPCB Odisha notified, GRAP Stage-IV equivalent recommended" },
  { id:"CMP-002", station:"Anand Vihar — Delhi", pollutant:"PM2.5", value:186.4, limit:60, exceedance:"211%", severity:"critical" as const, since:"48h", action:"DPCC notified, CAQM GRAP Stage-III activated" },
  { id:"CMP-003", station:"IMT Manesar — Gurugram", pollutant:"NO₂", value:72.8, limit:80, exceedance:"Near limit", severity:"warning" as const, since:"6h", action:"Monitor closely, industrial emission check advisory issued" },
  { id:"CMP-004", station:"Howrah Industrial — Kolkata", pollutant:"PM10", value:238, limit:100, exceedance:"138%", severity:"critical" as const, since:"36h", action:"WBPCB show-cause notice to 3 industries, water sprinkling ordered" },
  { id:"CMP-005", station:"Peenya Industrial — Bengaluru", pollutant:"Benzene", value:5.2, limit:5, exceedance:"4%", severity:"warning" as const, since:"2h", action:"Source monitoring ordered — suspected solvent unit in KIADB area" },
  { id:"CMP-006", station:"Vatva GIDC — Ahmedabad", pollutant:"SO₂", value:34.2, limit:80, exceedance:"OK", severity:"info" as const, since:"—", action:"Within limits. Seasonal trend tracking enabled" },
];

function IoTPrototype() {
  const [activeModule, setActiveModule] = useState<PCBModule>("dashboard");
  const [selectedStation, setSelectedStation] = useState(stations[0]);
  const [stationFilter, setStationFilter] = useState("All States");
  const [expandedMachine, setExpandedMachine] = useState<string|null>(null);
  const [machineActions, setMachineActions] = useState<Record<string,string>>({});
  const [alertAcknowledged, setAlertAcknowledged] = useState<Record<string,boolean>>({});
  const [reportGenerated, setReportGenerated] = useState(false);
  const [toast, setToast] = useState<{msg:string;type?:"success"|"info"|"warn"}|null>(null);

  const showToast = (msg:string, type:"success"|"info"|"warn"="info")=>{setToast({msg,type});setTimeout(()=>setToast(null),2500);};

  const stateList = ["All States",...[...new Set(stations.map(s=>s.state))].sort()];
  const filteredStations = stationFilter==="All States"?stations:stations.filter(s=>s.state===stationFilter);

  const modules:{key:PCBModule;label:string;badge?:number}[] = [
    { key:"dashboard", label:"Dashboard" },
    { key:"stations", label:"Stations", badge:stations.length },
    { key:"pollutants", label:"Pollutant Data" },
    { key:"alerts", label:"Compliance Alerts", badge:complianceAlerts.filter(a=>a.severity==="critical").length },
    { key:"machines", label:"Machine Health", badge:machineInventory.filter(m=>m.status==="fault"||m.status==="calib-due").length },
    { key:"compliance", label:"NAAQS Standards" },
    { key:"reports", label:"Reports" },
  ];

  const catCounts:{cat:AQICategory;label:string;count:number}[] = [
    { cat:"good", label:"Good (0–50)", count:stations.filter(s=>s.aqi<=50).length },
    { cat:"satisfactory", label:"Satisfactory (51–100)", count:stations.filter(s=>s.aqi>50&&s.aqi<=100).length },
    { cat:"moderate", label:"Moderate (101–200)", count:stations.filter(s=>s.aqi>100&&s.aqi<=200).length },
    { cat:"poor", label:"Poor (201–300)", count:stations.filter(s=>s.aqi>200&&s.aqi<=300).length },
    { cat:"very-poor", label:"Very Poor (301–400)", count:stations.filter(s=>s.aqi>300&&s.aqi<=400).length },
    { cat:"severe", label:"Severe (400+)", count:stations.filter(s=>s.aqi>400).length },
  ];

  return (
    <PrototypeShell title="cpcb-caaqms.gov.in">
      {/* Toast */}
      <AnimatePresence>{toast&&(
        <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className={`fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg text-[10px] font-medium border shadow-lg backdrop-blur-sm ${toast.type==="success"?"bg-green-500/20 text-green-300 border-green-500/30":toast.type==="warn"?"bg-amber-500/20 text-amber-300 border-amber-500/30":"bg-cyan-500/20 text-cyan-300 border-cyan-500/30"}`}>{toast.msg}</motion.div>
      )}</AnimatePresence>

      <div className="flex h-[calc(100vh-48px)]">
        {/* ── Left Navigation ── */}
        <aside className="w-52 shrink-0 border-r border-white/10 bg-[#0D1525] overflow-y-auto hidden md:block">
          <div className="p-3 border-b border-white/10">
            <p className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest">Central Pollution Control Board</p>
            <p className="text-[10px] text-white/40 mt-0.5">CAAQMS Network — India</p>
          </div>
          <div className="p-2 space-y-0.5">
            {modules.map((m)=>(
              <button key={m.key} onClick={()=>setActiveModule(m.key)}
                className={`w-full text-left text-[10px] px-2.5 py-2 rounded-lg transition-colors flex items-center justify-between ${activeModule===m.key?"bg-emerald-500/15 text-emerald-300":"text-white/50 hover:text-white/80 hover:bg-white/5"}`}>
                <span>{m.label}</span>
                {m.badge!==undefined&&<span className={`text-[8px] px-1.5 py-0.5 rounded-full ${activeModule===m.key?"bg-emerald-500/20":"bg-white/10"}`}>{m.badge}</span>}
              </button>
            ))}
          </div>
          {/* State filter */}
          <div className="p-3 border-t border-white/10">
            <p className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest mb-2">Filter by State</p>
            <div className="space-y-0.5 max-h-48 overflow-y-auto">
              {stateList.map((s)=>(
                <button key={s} onClick={()=>setStationFilter(s)} className={`w-full text-left text-[9px] px-2 py-1.5 rounded-lg transition-colors ${stationFilter===s?"bg-white/10 text-white/80":"text-white/40 hover:text-white/60"}`}>{s}</button>
              ))}
            </div>
          </div>
          {/* Mini alert panel */}
          <div className="p-3 border-t border-white/10">
            <p className="text-[8px] font-mono text-red-400 uppercase tracking-widest mb-2">Active Alerts</p>
            <div className="space-y-1.5">
              {complianceAlerts.filter(a=>a.severity==="critical").slice(0,3).map((a)=>(
                <div key={a.id} onClick={()=>{setActiveModule("alerts");showToast(`Viewing alert ${a.id}`);}} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 cursor-pointer hover:border-red-500/30 transition-colors">
                  <p className="text-[9px] text-red-300 font-medium truncate">{a.station}</p>
                  <p className="text-[8px] text-white/30">{a.pollutant} — {a.exceedance} over limit</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeModule} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}} className="p-4 lg:p-6">

              {/* ════════ DASHBOARD ════════ */}
              {activeModule==="dashboard" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-sm font-semibold text-white/90">National Ambient Air Quality — Live Dashboard</h2>
                    <p className="text-[9px] text-white/40 mt-0.5">CAAQMS Network • {stations.length} stations • Last updated: 06 April 2026, {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2,"0")} IST</p>
                  </div>

                  {/* AQI Category Distribution */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {catCounts.map((c)=>(
                      <div key={c.cat} onClick={()=>{setActiveModule("stations");showToast(`Filtered: ${c.label}`);}} className={`p-3 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] ${aqiBg(c.cat)}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-3 h-3 rounded-full" style={{backgroundColor:aqiColor(c.cat)}}/>
                          <p className="text-[8px] text-white/40 uppercase">{c.cat}</p>
                        </div>
                        <p className="text-2xl font-bold">{c.count}</p>
                        <p className="text-[8px] text-white/30">{c.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Top Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label:"Network Uptime", value:`${(stations.reduce((s,st)=>s+st.uptime,0)/stations.length).toFixed(1)}%`, sub:"Across all stations", color:"text-emerald-400" },
                      { label:"Critical Alerts", value:String(complianceAlerts.filter(a=>a.severity==="critical").length), sub:"Require immediate action", color:"text-red-400" },
                      { label:"Machines Faulty", value:String(machineInventory.filter(m=>m.status==="fault").length), sub:"Need service / repair", color:"text-amber-400" },
                      { label:"Avg National AQI", value:String(Math.round(stations.reduce((s,st)=>s+st.aqi,0)/stations.length)), sub:"Across monitored cities", color:"text-cyan-400" },
                    ].map((s)=>(
                      <div key={s.label} className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[8px] text-white/40 uppercase mb-1">{s.label}</p>
                        <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-[8px] text-white/30 mt-0.5">{s.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Worst 5 stations */}
                  <div>
                    <h3 className="text-[10px] font-mono text-red-400 uppercase tracking-widest mb-3">Top 5 Most Polluted Stations</h3>
                    <div className="space-y-2">
                      {[...stations].sort((a,b)=>b.aqi-a.aqi).slice(0,5).map((s,i)=>(
                        <div key={s.id} onClick={()=>{setSelectedStation(s);setActiveModule("pollutants");showToast(`Viewing ${s.name}`);}} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/8 transition-colors">
                          <span className="text-lg font-bold text-white/20 w-6">{i+1}</span>
                          <div className="w-4 h-4 rounded-full" style={{backgroundColor:aqiColor(s.cat)}}/>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-white/80 font-medium truncate">{s.name}</p>
                            <p className="text-[8px] text-white/30">{s.state} • {s.lastSync}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-lg font-bold" style={{color:aqiColor(s.cat)}}>{s.aqi}</p>
                            <p className="text-[8px] text-white/30">AQI</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[8px] border ${aqiBg(s.cat)}`}>{s.cat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PM2.5 bar chart across all stations */}
                  <div>
                    <h3 className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-3">PM2.5 Levels — All Stations (µg/m³)</h3>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-end gap-2 h-36">
                        {stations.map((s)=>{
                          const pct = Math.min((s.pm25/220)*100,100);
                          const exceeds = s.pm25>60;
                          return (
                            <div key={s.id} onClick={()=>{setSelectedStation(s);setActiveModule("pollutants");}} className="flex-1 flex flex-col items-center cursor-pointer group">
                              <span className="text-[7px] text-white/40 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{s.pm25}</span>
                              <div className="w-full rounded-t transition-all group-hover:opacity-80" style={{height:`${pct}%`,backgroundColor:exceeds?aqiColor(s.cat)+"90":"#22C55E60"}}/>
                              <p className="text-[6px] text-white/30 mt-1 truncate w-full text-center">{s.city}</p>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-px bg-red-500/30 border-t border-dashed border-red-500/40"/>
                        <span className="text-[8px] text-red-400">NAAQS Limit: 60 µg/m³</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ════════ STATIONS ════════ */}
              {activeModule==="stations" && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-white/90">Monitoring Stations — {stationFilter}</h2>
                  <p className="text-[9px] text-white/40">Click any station to view detailed pollutant data</p>
                  <div className="rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-[10px]">
                      <thead><tr className="bg-white/5">
                        <th className="text-left p-3 text-white/40 font-medium">Station</th>
                        <th className="text-left p-3 text-white/40 font-medium">State</th>
                        <th className="text-left p-3 text-white/40 font-medium">AQI</th>
                        <th className="text-left p-3 text-white/40 font-medium">PM2.5</th>
                        <th className="text-left p-3 text-white/40 font-medium hidden lg:table-cell">PM10</th>
                        <th className="text-left p-3 text-white/40 font-medium hidden lg:table-cell">NO₂</th>
                        <th className="text-left p-3 text-white/40 font-medium">Uptime</th>
                        <th className="text-left p-3 text-white/40 font-medium">Status</th>
                      </tr></thead>
                      <tbody>
                        {filteredStations.map((s,i)=>(
                          <motion.tr key={s.id} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.03}}
                            onClick={()=>{setSelectedStation(s);setActiveModule("pollutants");showToast(`Loaded ${s.name}`);}}
                            className="border-t border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                            <td className="p-3">
                              <p className="text-white/80 font-medium">{s.name}</p>
                              <p className="text-[8px] text-white/30 font-mono">{s.id}</p>
                            </td>
                            <td className="p-3 text-white/50">{s.state}</td>
                            <td className="p-3"><span className="text-sm font-bold" style={{color:aqiColor(s.cat)}}>{s.aqi}</span></td>
                            <td className={`p-3 font-mono ${s.pm25>60?"text-red-300":"text-white/60"}`}>{s.pm25}</td>
                            <td className={`p-3 font-mono hidden lg:table-cell ${s.pm10>100?"text-red-300":"text-white/60"}`}>{s.pm10}</td>
                            <td className={`p-3 font-mono hidden lg:table-cell ${s.no2>80?"text-red-300":"text-white/60"}`}>{s.no2}</td>
                            <td className="p-3"><span className={`text-[10px] font-mono ${s.uptime>=99?"text-green-400":s.uptime>=95?"text-amber-400":"text-red-400"}`}>{s.uptime}%</span></td>
                            <td className="p-3"><span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] ${s.machineStatus==="online"?"bg-green-500/20 text-green-300":s.machineStatus==="warning"?"bg-amber-500/20 text-amber-300":"bg-red-500/20 text-red-300"}`}><span className={`w-1.5 h-1.5 rounded-full ${s.machineStatus==="online"?"bg-green-400":s.machineStatus==="warning"?"bg-amber-400":"bg-red-400"}`}/>{s.machineStatus}</span></td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ════════ POLLUTANT DATA (Station Detail) ════════ */}
              {activeModule==="pollutants" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{backgroundColor:aqiColor(selectedStation.cat)+"20",border:`1px solid ${aqiColor(selectedStation.cat)}40`}}>
                      <span className="text-sm font-bold" style={{color:aqiColor(selectedStation.cat)}}>{selectedStation.aqi}</span>
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-white/90">{selectedStation.name}</h2>
                      <p className="text-[9px] text-white/40">{selectedStation.id} • {selectedStation.state} • Last sync: {selectedStation.lastSync}</p>
                    </div>
                    <span className={`ml-auto px-3 py-1 rounded-full text-[9px] border ${aqiBg(selectedStation.cat)}`}>{selectedStation.cat.toUpperCase()}</span>
                  </div>

                  {/* Pollutant cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {[
                      { label:"PM2.5", value:selectedStation.pm25, unit:"µg/m³", limit:60 },
                      { label:"PM10", value:selectedStation.pm10, unit:"µg/m³", limit:100 },
                      { label:"SO₂", value:selectedStation.so2, unit:"µg/m³", limit:80 },
                      { label:"NO₂", value:selectedStation.no2, unit:"µg/m³", limit:80 },
                      { label:"CO", value:selectedStation.co, unit:"mg/m³", limit:4 },
                      { label:"O₃", value:selectedStation.o3, unit:"µg/m³", limit:100 },
                      { label:"NH₃", value:selectedStation.nh3, unit:"µg/m³", limit:400 },
                      { label:"Pb", value:selectedStation.pb, unit:"µg/m³", limit:1 },
                      { label:"Benzene", value:selectedStation.benzene, unit:"µg/m³", limit:5 },
                      { label:"AQI", value:selectedStation.aqi, unit:"Index", limit:100 },
                    ].map((p)=>{
                      const exceeds = p.value>p.limit;
                      return (
                      <div key={p.label} className={`p-3 rounded-xl border ${exceeds?"bg-red-500/10 border-red-500/20":"bg-white/5 border-white/10"}`}>
                        <p className="text-[8px] text-white/40 mb-0.5">{p.label}</p>
                        <p className={`text-lg font-bold font-mono ${exceeds?"text-red-400":"text-white"}`}>{p.value}</p>
                        <p className="text-[7px] text-white/30">{p.unit}</p>
                        <div className="mt-1.5 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{width:`${Math.min((p.value/p.limit)*100,100)}%`,backgroundColor:exceeds?"#EF4444":p.value>(p.limit*0.8)?"#F59E0B":"#22C55E"}}/>
                        </div>
                        <p className="text-[7px] text-white/20 mt-0.5">Limit: {p.limit} {p.unit}</p>
                      </div>
                      );
                    })}
                  </div>

                  {/* Meteorological data */}
                  <div>
                    <h3 className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-3">Meteorological Data</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label:"Temperature", value:`${selectedStation.temp}°C`, icon:"🌡️" },
                        { label:"Humidity", value:`${selectedStation.humidity}%`, icon:"💧" },
                        { label:"Wind Speed", value:`${selectedStation.windSpeed} km/h`, icon:"🌬️" },
                        { label:"Wind Direction", value:selectedStation.windDir, icon:"🧭" },
                      ].map((m)=>(
                        <div key={m.label} className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-[8px] text-white/40">{m.label}</p>
                          <p className="text-base font-bold text-white/80 mt-0.5">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 24h simulated trend */}
                  <div>
                    <h3 className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-3">PM2.5 — 24 Hour Trend</h3>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-end gap-1 h-32">
                        {Array.from({length:24},(_,i)=>{
                          const base = selectedStation.pm25;
                          const val = Math.max(10,base + Math.sin(i*0.4)*base*0.3 + (Math.random()-0.5)*base*0.2);
                          const pct = Math.min((val/250)*100,100);
                          const exceeds = val>60;
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center group">
                              <span className="text-[6px] text-white/30 mb-0.5 opacity-0 group-hover:opacity-100">{val.toFixed(0)}</span>
                              <div className="w-full rounded-t transition-all group-hover:opacity-80" style={{height:`${pct}%`,backgroundColor:exceeds?"#EF444480":"#22C55E60"}}/>
                              <span className="text-[5px] text-white/20 mt-0.5">{String(i).padStart(2,"0")}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-px border-t border-dashed border-red-500/40"/>
                        <span className="text-[8px] text-red-400">NAAQS 24h: 60 µg/m³</span>
                      </div>
                    </div>
                  </div>

                  {/* Station metadata */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[8px] text-white/30 font-mono uppercase mb-1">Station Details</p>
                      <div className="space-y-1">
                        <p className="text-[10px] text-white/60"><strong className="text-white/80">ID:</strong> {selectedStation.id}</p>
                        <p className="text-[10px] text-white/60"><strong className="text-white/80">Location:</strong> {selectedStation.lat.toFixed(3)}°N, {selectedStation.lng.toFixed(3)}°E</p>
                        <p className="text-[10px] text-white/60"><strong className="text-white/80">Type:</strong> CAAQMS (Continuous)</p>
                        <p className="text-[10px] text-white/60"><strong className="text-white/80">Regulatory Body:</strong> {selectedStation.id.split("-")[0]}</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[8px] text-white/30 font-mono uppercase mb-1">System Health</p>
                      <div className="space-y-1">
                        <p className="text-[10px] text-white/60"><strong className="text-white/80">Uptime:</strong> <span className={selectedStation.uptime>=99?"text-green-400":selectedStation.uptime>=95?"text-amber-400":"text-red-400"}>{selectedStation.uptime}%</span></p>
                        <p className="text-[10px] text-white/60"><strong className="text-white/80">Last Sync:</strong> {selectedStation.lastSync}</p>
                        <p className="text-[10px] text-white/60"><strong className="text-white/80">Machine Status:</strong> <span className={selectedStation.machineStatus==="online"?"text-green-400":"text-amber-400"}>{selectedStation.machineStatus}</span></p>
                        <p className="text-[10px] text-white/60"><strong className="text-white/80">Data Availability:</strong> 96.2% (30d rolling)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ════════ COMPLIANCE ALERTS ════════ */}
              {activeModule==="alerts" && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-white/90">NAAQS Compliance Alerts</h2>
                  <p className="text-[9px] text-white/40">Exceedance alerts based on 24-hour NAAQS standards • Click to acknowledge</p>
                  <div className="space-y-3">
                    {complianceAlerts.map((a)=>{
                      const acked = alertAcknowledged[a.id];
                      return (
                      <motion.div key={a.id} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} className={`p-4 rounded-xl border ${a.severity==="critical"?"bg-red-500/5 border-red-500/20":a.severity==="warning"?"bg-amber-500/5 border-amber-500/20":"bg-white/3 border-white/10"} ${acked?"opacity-50":""}`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.severity==="critical"?"bg-red-500/20":"bg-amber-500/20"}`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={a.severity==="critical"?"#EF4444":"#F59E0B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 rounded-full text-[8px] border uppercase font-medium ${a.severity==="critical"?"bg-red-500/20 text-red-300 border-red-500/30":a.severity==="warning"?"bg-amber-500/20 text-amber-300 border-amber-500/30":"bg-green-500/20 text-green-300 border-green-500/30"}`}>{a.severity}</span>
                              <span className="text-[8px] font-mono text-white/30">{a.id}</span>
                              <span className="text-[8px] text-white/30">Since {a.since}</span>
                            </div>
                            <p className="text-[10px] text-white/80 font-medium">{a.station}</p>
                            <p className="text-[10px] text-white/50 mt-0.5"><strong>{a.pollutant}:</strong> {a.value} µg/m³ — NAAQS limit {a.limit} µg/m³ — <span className={a.severity==="critical"?"text-red-300":"text-amber-300"}>{a.exceedance}</span></p>
                            <p className="text-[9px] text-white/40 mt-1"><strong className="text-white/60">Action:</strong> {a.action}</p>
                          </div>
                          <div className="shrink-0">
                            {acked?(
                              <span className="text-[9px] text-green-400">✓ Acknowledged</span>
                            ):(
                              <button onClick={()=>{setAlertAcknowledged(prev=>({...prev,[a.id]:true}));showToast(`Alert ${a.id} acknowledged`,"success");}} className="px-3 py-1.5 rounded-lg text-[9px] bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 transition-colors">Acknowledge</button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ════════ MACHINE HEALTH ════════ */}
              {activeModule==="machines" && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-white/90">Machine Health & Calibration Tracker</h2>
                  <p className="text-[9px] text-white/40">Click any machine to expand details • Track calibration schedules and firmware</p>
                  <div className="rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-[10px]">
                      <thead><tr className="bg-white/5">
                        <th className="text-left p-3 text-white/40 font-medium">Machine ID</th>
                        <th className="text-left p-3 text-white/40 font-medium">Type</th>
                        <th className="text-left p-3 text-white/40 font-medium hidden lg:table-cell">Station</th>
                        <th className="text-left p-3 text-white/40 font-medium">Uptime</th>
                        <th className="text-left p-3 text-white/40 font-medium">Calib Due</th>
                        <th className="text-left p-3 text-white/40 font-medium">Status</th>
                      </tr></thead>
                      <tbody>
                        {machineInventory.map((m,i)=>(
                          <React.Fragment key={m.id}>
                          <motion.tr initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.03}}
                            onClick={()=>setExpandedMachine(expandedMachine===m.id?null:m.id)}
                            className={`border-t border-white/5 cursor-pointer transition-colors hover:bg-white/5 ${expandedMachine===m.id?"bg-white/5":""} ${m.status==="fault"?"bg-red-500/5":""}`}>
                            <td className="p-3 font-mono text-white/60">{m.id}</td>
                            <td className="p-3 text-white/80">{m.type}</td>
                            <td className="p-3 text-white/50 hidden lg:table-cell">{m.station}</td>
                            <td className="p-3"><span className={`font-mono ${m.uptime>=99?"text-green-400":m.uptime>=95?"text-amber-400":"text-red-400"}`}>{m.uptime}%</span></td>
                            <td className="p-3 font-mono text-white/50">{m.calibDue}</td>
                            <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-[9px] border ${m.status==="operational"?"bg-green-500/20 text-green-300 border-green-500/30":m.status==="calib-due"?"bg-amber-500/20 text-amber-300 border-amber-500/30":m.status==="sync-issue"?"bg-yellow-500/20 text-yellow-300 border-yellow-500/30":"bg-red-500/20 text-red-300 border-red-500/30"}`}>{m.status}</span></td>
                          </motion.tr>
                          {expandedMachine===m.id&&(
                            <tr><td colSpan={6} className="p-0">
                              <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} className="p-4 bg-white/3 border-t border-white/5 space-y-3">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                  <div><p className="text-[7px] text-white/30 font-mono uppercase">Make / Model</p><p className="text-[10px] text-white/70">{m.make}</p></div>
                                  <div><p className="text-[7px] text-white/30 font-mono uppercase">Firmware</p><p className="text-[10px] text-white/70 font-mono">{m.firmware}</p></div>
                                  <div><p className="text-[7px] text-white/30 font-mono uppercase">Last Service</p><p className="text-[10px] text-white/70">{m.lastService}</p></div>
                                  <div><p className="text-[7px] text-white/30 font-mono uppercase">Data Uptime</p><p className={`text-[10px] font-mono ${m.uptime>=99?"text-green-400":m.uptime>=95?"text-amber-400":"text-red-400"}`}>{m.uptime}%</p></div>
                                </div>
                                <div className="flex gap-2">
                                  {!machineActions[m.id]?(
                                    <>
                                    {m.status==="calib-due"&&<button onClick={(e)=>{e.stopPropagation();setMachineActions(prev=>({...prev,[m.id]:"calib-scheduled"}));showToast(`Calibration scheduled for ${m.id}`,"success");}} className="px-3 py-1.5 rounded-lg text-[9px] bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 transition-colors">Schedule Calibration</button>}
                                    {m.status==="fault"&&<button onClick={(e)=>{e.stopPropagation();setMachineActions(prev=>({...prev,[m.id]:"service-requested"}));showToast(`Service request raised for ${m.id}`,"success");}} className="px-3 py-1.5 rounded-lg text-[9px] bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20 transition-colors">Raise Service Request</button>}
                                    {m.status==="sync-issue"&&<button onClick={(e)=>{e.stopPropagation();setMachineActions(prev=>({...prev,[m.id]:"resynced"}));showToast(`Re-sync triggered for ${m.id}`,"success");}} className="px-3 py-1.5 rounded-lg text-[9px] bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors">Force Re-Sync</button>}
                                    {m.status==="operational"&&<span className="text-[9px] text-green-400">✓ All systems normal</span>}
                                    </>
                                  ):(
                                    <span className="text-[9px] text-green-400">✓ {machineActions[m.id]}</span>
                                  )}
                                </div>
                              </motion.div>
                            </td></tr>
                          )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ════════ NAAQS STANDARDS ════════ */}
              {activeModule==="compliance" && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-white/90">National Ambient Air Quality Standards (NAAQS)</h2>
                  <p className="text-[9px] text-white/40">CPCB Notification dated 18 November 2009 • Industrial, Residential, Rural, and Other Areas</p>
                  <div className="rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-[10px]">
                      <thead><tr className="bg-white/5">
                        <th className="text-left p-3 text-white/40 font-medium">Pollutant</th>
                        <th className="text-left p-3 text-white/40 font-medium">Unit</th>
                        <th className="text-left p-3 text-white/40 font-medium">24h Standard</th>
                        <th className="text-left p-3 text-white/40 font-medium">Annual Standard</th>
                        <th className="text-left p-3 text-white/40 font-medium hidden lg:table-cell">Method</th>
                        <th className="text-left p-3 text-white/40 font-medium">Current ({selectedStation.city})</th>
                        <th className="text-left p-3 text-white/40 font-medium">Status</th>
                      </tr></thead>
                      <tbody>
                        {naaqs.map((n)=>{
                          const valMap:Record<string,number> = {"PM2.5":selectedStation.pm25,"PM10":selectedStation.pm10,"SO₂":selectedStation.so2,"NO₂":selectedStation.no2,"CO":selectedStation.co,"O₃":selectedStation.o3,"NH₃":selectedStation.nh3,"Pb":selectedStation.pb,"Benzene":selectedStation.benzene};
                          const val = valMap[n.pollutant]??0;
                          const exceeds = n.limit24h>0 && val>n.limit24h;
                          return (
                          <tr key={n.pollutant} className={`border-t border-white/5 ${exceeds?"bg-red-500/5":""}`}>
                            <td className="p-3 text-white/80 font-medium">{n.pollutant}</td>
                            <td className="p-3 text-white/50">{n.unit}</td>
                            <td className="p-3 font-mono text-white/60">{n.limit24h||"—"}</td>
                            <td className="p-3 font-mono text-white/60">{n.limitAnnual||"—"}</td>
                            <td className="p-3 text-white/40 hidden lg:table-cell">{n.method}</td>
                            <td className={`p-3 font-mono font-bold ${exceeds?"text-red-400":"text-green-400"}`}>{val}</td>
                            <td className="p-3"><span className={`px-2 py-0.5 rounded-full text-[9px] border ${exceeds?"bg-red-500/20 text-red-300 border-red-500/30":"bg-green-500/20 text-green-300 border-green-500/30"}`}>{exceeds?"EXCEEDS":"Compliant"}</span></td>
                          </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    <p className="text-[9px] text-blue-300"><strong>AQI Methodology:</strong> Indian AQI is calculated per sub-index for each pollutant, and the highest sub-index determines overall AQI. Category: Good (0–50), Satisfactory (51–100), Moderate (101–200), Poor (201–300), Very Poor (301–400), Severe (401–500).</p>
                  </div>
                </div>
              )}

              {/* ════════ REPORTS ════════ */}
              {activeModule==="reports" && (
                <div className="space-y-6">
                  <h2 className="text-sm font-semibold text-white/90">Report Generation</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { title:"Daily Air Quality Bulletin", desc:"24-hour average AQI, pollutant breakdown, exceedance summary for all stations", format:"PDF" },
                      { title:"Monthly Compliance Report", desc:"NAAQS compliance status, exceedance days, trend analysis per station per pollutant", format:"Excel + PDF" },
                      { title:"Machine Health Report", desc:"Uptime statistics, calibration status, pending service requests, firmware inventory", format:"PDF" },
                      { title:"GRAP Activation Report", desc:"Graded Response Action Plan status for NCR stations — stage-wise trigger analysis", format:"PDF" },
                      { title:"Source Apportionment", desc:"Pollutant source contribution (vehicular, industrial, construction, biomass) based on receptor modelling", format:"PDF" },
                      { title:"Annual Environmental Report", desc:"Year-on-year trend, seasonal analysis, NAAQS compliance rate, policy recommendations", format:"PDF + PPT" },
                    ].map((r)=>(
                      <div key={r.title} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors">
                        <p className="text-[10px] font-medium text-white/80 mb-1">{r.title}</p>
                        <p className="text-[9px] text-white/40 mb-3">{r.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] px-2 py-0.5 rounded bg-white/10 text-white/40">{r.format}</span>
                          <button onClick={()=>{setReportGenerated(true);showToast(`${r.title} generated`,"success");}} className="px-3 py-1.5 rounded-lg text-[9px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">{reportGenerated?"✓ Generated":"Generate"}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-[10px] font-medium text-white/70 mb-2">Export Data</p>
                    <p className="text-[9px] text-white/40 mb-3">Download raw CAAQMS data for custom analysis — supports CPCB prescribed format, SAFAR format, and WHO AirQ+ compatible CSV</p>
                    <div className="flex gap-2">
                      {["CPCB Format (.csv)","WHO AirQ+ (.csv)","JSON API"].map((f)=>(
                        <button key={f} onClick={()=>showToast(`${f} export started`,"success")} className="px-3 py-1.5 rounded-lg text-[9px] bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 transition-colors">{f}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right Panel — Selected Station Quick View ── */}
        <aside className="w-52 shrink-0 border-l border-white/10 bg-[#0D1525] overflow-y-auto hidden lg:block">
          <div className="p-3 border-b border-white/10">
            <p className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest mb-1">Selected Station</p>
            <p className="text-[10px] text-white/70">{selectedStation.name}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor:aqiColor(selectedStation.cat)+"20"}}>
                <span className="text-xs font-bold" style={{color:aqiColor(selectedStation.cat)}}>{selectedStation.aqi}</span>
              </div>
              <div>
                <span className={`px-2 py-0.5 rounded-full text-[8px] border ${aqiBg(selectedStation.cat)}`}>{selectedStation.cat}</span>
              </div>
            </div>
          </div>
          <div className="p-2 space-y-1.5">
            {[
              {l:"PM2.5",v:`${selectedStation.pm25}`,lim:60},{l:"PM10",v:`${selectedStation.pm10}`,lim:100},
              {l:"SO₂",v:`${selectedStation.so2}`,lim:80},{l:"NO₂",v:`${selectedStation.no2}`,lim:80},
              {l:"CO",v:`${selectedStation.co}`,lim:4},{l:"O₃",v:`${selectedStation.o3}`,lim:100},
            ].map((p)=>{
              const exceeds = Number(p.v)>p.lim;
              return (
              <div key={p.l} className={`p-2 rounded-lg border ${exceeds?"bg-red-500/10 border-red-500/20":"bg-white/5 border-white/10"}`}>
                <div className="flex justify-between items-center">
                  <span className="text-[8px] text-white/40">{p.l}</span>
                  <span className={`text-[10px] font-mono font-bold ${exceeds?"text-red-400":"text-green-400"}`}>{p.v}</span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full" style={{width:`${Math.min((Number(p.v)/p.lim)*100,100)}%`,backgroundColor:exceeds?"#EF4444":"#22C55E"}}/>
                </div>
              </div>
              );
            })}
          </div>
          {/* All stations quick list */}
          <div className="p-3 border-t border-white/10">
            <p className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest mb-2">All Stations</p>
            <div className="space-y-1">
              {stations.map((s)=>(
                <button key={s.id} onClick={()=>setSelectedStation(s)}
                  className={`w-full text-left p-1.5 rounded-lg transition-colors ${selectedStation.id===s.id?"bg-emerald-500/10 border border-emerald-500/20":"hover:bg-white/5 border border-transparent"}`}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{backgroundColor:aqiColor(s.cat)}}/>
                    <div className="min-w-0 flex-1">
                      <p className="text-[8px] text-white/60 truncate">{s.city}</p>
                    </div>
                    <span className="text-[8px] font-mono font-bold" style={{color:aqiColor(s.cat)}}>{s.aqi}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PrototypeShell>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   OTT PLATFORM PROTOTYPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function OTTPrototype() {
  const [selectedTitle, setSelectedTitle] = useState<null | { title: string; genre: string; year: string; rating: string; desc: string }>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const genres = [
    {
      name: "Continue Watching",
      titles: [
        { title: "The Algorithm", genre: "Sci-Fi", year: "2024", rating: "8.7", desc: "A rogue AI develops consciousness and must navigate a world that fears its existence." },
        { title: "Pixel Dreams", genre: "Animation", year: "2024", rating: "9.1", desc: "In a digital universe, a young pixel discovers she's part of a much larger design." },
      ],
    },
    {
      name: "Trending Now",
      titles: [
        { title: "Dark Protocol", genre: "Thriller", year: "2025", rating: "8.3", desc: "A cybersecurity expert uncovers a global conspiracy hidden in the internet's backbone." },
        { title: "Quantum Leap", genre: "Drama", year: "2025", rating: "7.9", desc: "A physicist's experiment goes wrong, splitting her life into parallel timelines." },
        { title: "The Last Server", genre: "Sci-Fi", year: "2024", rating: "8.5", desc: "After the cloud collapses, humanity's knowledge survives on a single server." },
        { title: "Neon Streets", genre: "Action", year: "2025", rating: "7.6", desc: "In a cyberpunk city, a courier gets entangled in a corporate war." },
      ],
    },
    {
      name: "Recommended For You",
      titles: [
        { title: "Silent Code", genre: "Mystery", year: "2024", rating: "8.1", desc: "A mute programmer communicates through code to solve her sister's disappearance." },
        { title: "Byte-Sized", genre: "Comedy", year: "2025", rating: "7.4", desc: "A startup's AI assistant becomes more popular than the actual product." },
        { title: "Data Ghost", genre: "Horror", year: "2024", rating: "7.8", desc: "Deleted files start reappearing — containing memories that never happened." },
        { title: "Cloud Atlas II", genre: "Sci-Fi", year: "2025", rating: "8.9", desc: "Interconnected stories across time explore the nature of digital consciousness." },
      ],
    },
  ];

  if (isPlaying) {
    return (
      <div className="min-h-screen bg-black flex flex-col pt-16 lg:pt-20">
        {/* Player */}
        <div className="flex-1 relative flex items-center justify-center bg-[#0a0a0a]">
          {/* Fake video area */}
          <div className="text-center">
            <div className="mb-4 opacity-20"><SvgIcon name="play" size={60} /></div>
            <p className="text-sm text-white/40">{selectedTitle?.title}</p>
            <p className="text-xs text-white/20 mt-1">S1:E3 • 47:22 remaining</p>
          </div>
          {/* Controls overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
            {/* Progress bar */}
            <div className="h-1 bg-white/20 rounded-full mb-3 relative">
              <div className="h-full w-[35%] bg-cyan-500 rounded-full" />
              <div className="absolute top-1/2 left-[35%] -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsPlaying(false)} className="text-white/80 hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                </button>
                <button className="text-white/80 hover:text-white text-xs">Skip Intro →</button>
                <span className="text-[10px] text-white/40 font-mono">14:38 / 62:00</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-white/50 hover:text-white text-xs">CC</button>
                <button className="text-white/50 hover:text-white text-xs">HD</button>
                <button onClick={() => setIsPlaying(false)} className="text-white/50 hover:text-white text-xs"><SvgIcon name="x" size={12} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PrototypeShell title="stream.ott">
      <div className="min-h-[calc(100vh-48px)] overflow-auto">
        {/* Hero Banner */}
        <div className="relative h-[50vh] min-h-75 flex items-end bg-linear-to-br from-cyan-900/30 via-[#0B1120] to-purple-900/20">
          <div className="absolute inset-0 bg-linear-to-t from-[#0B1120] via-transparent to-transparent" />
          <div className="relative p-8 max-w-2xl">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Featured</span>
            <h1 className="text-4xl font-bold mt-2 mb-3">The Algorithm</h1>
            <p className="text-sm text-white/60 leading-relaxed mb-4">A rogue AI develops consciousness and must navigate a world that fears its existence. Critically acclaimed sci-fi drama.</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedTitle(genres[0].titles[0]);
                  setIsPlaying(true);
                }}
                className="px-5 py-2.5 bg-cyan-500 text-white text-sm font-semibold rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21" /></svg>
                Play
              </button>
              <button className="px-5 py-2.5 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition-colors border border-white/10">
                + My List
              </button>
            </div>
          </div>
        </div>

        {/* Content Rows */}
        <div className="px-6 pb-12 -mt-8 relative z-10 space-y-8">
          {genres.map((genre) => (
            <div key={genre.name}>
              <h3 className="text-xs font-semibold text-white/80 mb-3">{genre.name}</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {genre.titles.map((t) => (
                  <button
                    key={t.title}
                    onClick={() => setSelectedTitle(t)}
                    className="shrink-0 w-44 group"
                  >
                    <div className="aspect-video bg-linear-to-br from-white/10 to-white/5 rounded-lg border border-white/10 group-hover:border-cyan-500/40 transition-all overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21" /></svg>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-[10px] font-medium truncate">{t.title}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-white/40 mt-1 flex items-center gap-1">{t.genre} • {t.year} • <SvgIcon name="star" size={9} /> {t.rating}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Title Detail Modal */}
        <AnimatePresence>
          {selectedTitle && !isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
              onClick={() => setSelectedTitle(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-[#0D1525] rounded-2xl border border-white/10 overflow-hidden"
              >
                <div className="h-48 bg-linear-to-br from-cyan-900/30 to-purple-900/20 relative flex items-end p-6">
                  <div className="absolute inset-0 bg-linear-to-t from-[#0D1525] to-transparent" />
                  <div className="relative">
                    <h2 className="text-2xl font-bold">{selectedTitle.title}</h2>
                    <p className="text-xs text-white/50 mt-1 flex items-center gap-1">{selectedTitle.genre} • {selectedTitle.year} • <SvgIcon name="star" size={10} /> {selectedTitle.rating}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-white/60 leading-relaxed mb-6">{selectedTitle.desc}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="px-5 py-2.5 bg-cyan-500 text-white text-sm font-semibold rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21" /></svg>
                      Play
                    </button>
                    <button className="px-5 py-2.5 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition-colors border border-white/10">
                      + My List
                    </button>
                    <button
                      onClick={() => setSelectedTitle(null)}
                      className="ml-auto px-3 py-2.5 text-white/40 hover:text-white text-sm"
                    >
                      <SvgIcon name="x" size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PrototypeShell>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONSTRUCTION AI PLATFORM PROTOTYPE — ConstructivIQ + Slate.ai Merged
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
type ConstructionModule = "dashboard" | "materials" | "intelligence" | "progress" | "analytics" | "documents" | "integrations" | "settings";

/* ── Construction AI Sample Data ── */
const constructionProjects = [
  { id: "PRJ-001", name: "Downtown Medical Center", client: "HealthCorp Inc.", value: "$145.2M", progress: 67, status: "on-track", manager: "Sarah Chen", startDate: "2025-03-15", endDate: "2027-06-30", riskScore: 23, phase: "Phase 3 - MEP" },
  { id: "PRJ-002", name: "Harbor View Tower", client: "Skyline Development", value: "$89.5M", progress: 42, status: "at-risk", manager: "Michael Ross", startDate: "2025-06-01", endDate: "2027-08-15", riskScore: 68, phase: "Phase 2 - Structure" },
  { id: "PRJ-003", name: "Tech Campus Building B", client: "InnovateTech Corp", value: "$62.8M", progress: 85, status: "ahead", manager: "Priya Patel", startDate: "2024-11-20", endDate: "2026-07-01", riskScore: 12, phase: "Phase 4 - Finishes" },
  { id: "PRJ-004", name: "Airport Terminal Expansion", client: "Regional Airport Authority", value: "$234.7M", progress: 28, status: "delayed", manager: "Robert Kim", startDate: "2025-01-10", endDate: "2028-12-31", riskScore: 82, phase: "Phase 1 - Foundation" },
  { id: "PRJ-005", name: "Riverside Residential Complex", client: "Urban Living LLC", value: "$78.3M", progress: 91, status: "on-track", manager: "Lisa Wong", startDate: "2024-08-01", endDate: "2026-05-15", riskScore: 8, phase: "Phase 5 - Commissioning" },
];

const materialItems = [
  { id: "MAT-001", name: "Structural Steel (W14x90)", category: "Steel", supplier: "US Steel Corp", quantity: "2,450 tons", status: "delivered", deliveryDate: "2026-03-15", leadTime: "12 weeks", project: "PRJ-001", cost: "$3.2M", submittalStatus: "approved", poNumber: "PO-2026-0412" },
  { id: "MAT-002", name: "Pre-cast Concrete Panels", category: "Concrete", supplier: "ConcreteWorks Inc", quantity: "850 units", status: "in-transit", deliveryDate: "2026-04-22", leadTime: "8 weeks", project: "PRJ-002", cost: "$1.8M", submittalStatus: "approved", poNumber: "PO-2026-0398" },
  { id: "MAT-003", name: "HVAC Chillers (500 ton)", category: "MEP", supplier: "Carrier Systems", quantity: "4 units", status: "at-risk", deliveryDate: "2026-05-10", leadTime: "16 weeks", project: "PRJ-001", cost: "$890K", submittalStatus: "pending", poNumber: "PO-2026-0445" },
  { id: "MAT-004", name: "Curtain Wall System", category: "Facade", supplier: "GlassTech Global", quantity: "28,000 sqft", status: "ordered", deliveryDate: "2026-06-01", leadTime: "14 weeks", project: "PRJ-002", cost: "$2.4M", submittalStatus: "in-review", poNumber: "PO-2026-0467" },
  { id: "MAT-005", name: "Fire Suppression System", category: "MEP", supplier: "Viking Fire", quantity: "Complete system", status: "pending-approval", deliveryDate: "2026-04-28", leadTime: "6 weeks", project: "PRJ-003", cost: "$420K", submittalStatus: "rejected", poNumber: "—" },
  { id: "MAT-006", name: "Elevator Cabs (8 unit)", category: "Vertical Transport", supplier: "KONE Americas", quantity: "8 units", status: "manufacturing", deliveryDate: "2026-07-15", leadTime: "20 weeks", project: "PRJ-001", cost: "$1.6M", submittalStatus: "approved", poNumber: "PO-2026-0389" },
  { id: "MAT-007", name: "Electrical Switchgear", category: "Electrical", supplier: "Siemens Energy", quantity: "3 assemblies", status: "delivered", deliveryDate: "2026-03-01", leadTime: "18 weeks", project: "PRJ-004", cost: "$780K", submittalStatus: "approved", poNumber: "PO-2025-1287" },
  { id: "MAT-008", name: "Roofing Membrane System", category: "Envelope", supplier: "GAF Materials", quantity: "145,000 sqft", status: "scheduled", deliveryDate: "2026-05-20", leadTime: "4 weeks", project: "PRJ-005", cost: "$520K", submittalStatus: "approved", poNumber: "PO-2026-0501" },
];

const riskAlerts = [
  { id: "RISK-001", severity: "critical", type: "Schedule", title: "HVAC Chillers Delivery Delay", description: "Supplier reports 3-week delay due to component shortage. Critical path impact detected.", project: "PRJ-001", impact: "14 days schedule slip", aiConfidence: 94, timestamp: "2 hours ago", recommendation: "Expedite alternative supplier quote from Trane. Consider temporary cooling solution.", linkedItems: ["MAT-003", "ACT-0892", "RFI-0234"] },
  { id: "RISK-002", severity: "high", type: "Cost", title: "Steel Price Escalation Detected", description: "AI detected 12% price increase trend in steel commodities. Upcoming POs at risk.", project: "PRJ-002", impact: "$340K budget overrun", aiConfidence: 87, timestamp: "5 hours ago", recommendation: "Lock in pricing with current supplier. Consider early procurement for Phase 3.", linkedItems: ["MAT-001", "BUD-0445"] },
  { id: "RISK-003", severity: "medium", type: "Quality", title: "Submittal Rejection Pattern", description: "Fire suppression submittal rejected twice. Similar pattern detected in 3 other projects.", project: "PRJ-003", impact: "2 weeks re-submittal cycle", aiConfidence: 78, timestamp: "1 day ago", recommendation: "Schedule pre-submittal coordination meeting with Fire Marshal.", linkedItems: ["MAT-005", "SUB-0178", "RFI-0198"] },
  { id: "RISK-004", severity: "high", type: "Weather", title: "Foundation Pour Weather Risk", description: "7-day forecast shows precipitation probability >80%. Concrete pour scheduled in 3 days.", project: "PRJ-004", impact: "5-7 days delay possible", aiConfidence: 91, timestamp: "30 mins ago", recommendation: "Reschedule pour to next week clear window. Coordinate with ready-mix supplier.", linkedItems: ["ACT-1023", "WEA-0404"] },
  { id: "RISK-005", severity: "low", type: "Resource", title: "Electrician Crew Availability", description: "Predicted shortage of licensed electricians for June rough-in phase.", project: "PRJ-001", impact: "Minor productivity decrease", aiConfidence: 65, timestamp: "2 days ago", recommendation: "Pre-book crews from approved subcontractor list. Consider overtime authorization.", linkedItems: ["RES-0089", "ACT-0934"] },
];

const progressActivities = [
  { id: "ACT-001", name: "Level 4 MEP Rough-in", wbs: "3.2.4", planned: 75, actual: 68, variance: -7, crew: "MEP Team Alpha", status: "behind", startDate: "2026-03-01", endDate: "2026-04-15" },
  { id: "ACT-002", name: "Curtain Wall Installation - North", wbs: "2.4.1", planned: 45, actual: 52, variance: 7, crew: "Facade Crew 1", status: "ahead", startDate: "2026-03-10", endDate: "2026-05-20" },
  { id: "ACT-003", name: "Foundation Waterproofing", wbs: "1.3.2", planned: 100, actual: 100, variance: 0, crew: "Waterproofing LLC", status: "complete", startDate: "2026-02-01", endDate: "2026-03-01" },
  { id: "ACT-004", name: "Elevator Shaft Construction", wbs: "2.2.3", planned: 60, actual: 55, variance: -5, crew: "Core Team", status: "behind", startDate: "2026-02-15", endDate: "2026-04-30" },
  { id: "ACT-005", name: "Electrical Panel Installation", wbs: "3.3.1", planned: 30, actual: 35, variance: 5, crew: "Electrical Prime", status: "ahead", startDate: "2026-03-20", endDate: "2026-05-15" },
  { id: "ACT-006", name: "Drywall Framing - Floors 1-3", wbs: "4.1.1", planned: 85, actual: 82, variance: -3, crew: "Interior Finishes Co", status: "on-track", startDate: "2026-02-20", endDate: "2026-04-10" },
];

const analyticsMetrics = {
  overallHealth: 76,
  schedulePerformance: { spi: 0.94, cpi: 1.02, eac: "$142.8M" },
  materialDelivery: { onTime: 87, delayed: 8, atRisk: 5 },
  rfiMetrics: { open: 24, avgResponseDays: 4.2, overdueCount: 3 },
  changeOrders: { pending: 8, approved: 42, totalValue: "$3.4M" },
  safetyMetrics: { incidentFree: 127, nearMisses: 2, trir: 0.8 },
  productivity: { laborUtilization: 92, equipmentUptime: 94 },
};

const integrationsData = [
  { name: "Procore", status: "connected", lastSync: "2 mins ago", recordsSync: "12,847", icon: "procore" },
  { name: "Oracle P6", status: "connected", lastSync: "15 mins ago", recordsSync: "3,421", icon: "oracle" },
  { name: "Autodesk BIM 360", status: "connected", lastSync: "1 hour ago", recordsSync: "8,932", icon: "autodesk" },
  { name: "MS Project", status: "connected", lastSync: "30 mins ago", recordsSync: "1,205", icon: "microsoft" },
  { name: "ACONEX", status: "disconnected", lastSync: "3 days ago", recordsSync: "—", icon: "aconex" },
  { name: "SAP S/4HANA", status: "syncing", lastSync: "syncing...", recordsSync: "24,103", icon: "sap" },
];

const documentsData = [
  { id: "RFI-234", type: "RFI", title: "Structural beam connection detail clarification", status: "open", priority: "high", assignee: "Structural Engineer", dueDate: "2026-04-18", daysOpen: 5, project: "PRJ-001" },
  { id: "SUB-178", type: "Submittal", title: "Fire Suppression Shop Drawings - Rev 3", status: "rejected", priority: "critical", assignee: "MEP Coordinator", dueDate: "2026-04-10", daysOpen: 12, project: "PRJ-003" },
  { id: "CO-089", type: "Change Order", title: "Additional foundation piles - Area C", status: "pending", priority: "high", assignee: "Project Manager", dueDate: "2026-04-25", daysOpen: 3, project: "PRJ-004" },
  { id: "RFI-245", type: "RFI", title: "Curtain wall anchor spacing deviation", status: "answered", priority: "medium", assignee: "Facade Consultant", dueDate: "2026-04-12", daysOpen: 8, project: "PRJ-002" },
  { id: "SUB-192", type: "Submittal", title: "Elevator cab finishes and materials", status: "in-review", priority: "medium", assignee: "Architect", dueDate: "2026-04-20", daysOpen: 6, project: "PRJ-001" },
  { id: "CO-092", type: "Change Order", title: "HVAC system capacity upgrade", status: "approved", priority: "low", assignee: "Owner Rep", dueDate: "2026-04-05", daysOpen: 0, project: "PRJ-001" },
];

const aiInsights = [
  { type: "prediction", title: "Schedule Compression Opportunity", description: "AI identified 8-day float in MEP sequence. Parallel installation possible with minimal risk.", confidence: 89, action: "Review optimized schedule", icon: "sparkle" },
  { type: "anomaly", title: "Unusual Cost Pattern Detected", description: "Concrete costs 23% above baseline for similar scope. Recommend supplier audit.", confidence: 76, action: "View cost analysis", icon: "warning" },
  { type: "recommendation", title: "Lessons Learned Match", description: "Similar curtain wall installation in 2024 project had 15% productivity gain with modified sequence.", confidence: 82, action: "Apply learnings", icon: "info" },
  { type: "prediction", title: "Weather-Optimized Schedule", description: "Next 2 weeks show ideal conditions for exterior work. Consider accelerating facade activities.", confidence: 94, action: "Adjust schedule", icon: "sun" },
];

function ConstructionAIPrototype() {
  const [activeModule, setActiveModule] = useState<ConstructionModule>("dashboard");
  const [selectedProject, setSelectedProject] = useState(constructionProjects[0]);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiChatMessages, setAiChatMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello! I'm your Construction AI Assistant. I can help you analyze risks, track materials, predict delays, and optimize your project schedule. What would you like to know?" }
  ]);
  const [aiChatInput, setAiChatInput] = useState("");
  const [selectedRisk, setSelectedRisk] = useState<typeof riskAlerts[0] | null>(null);
  const [materialFilter, setMaterialFilter] = useState<"all" | "at-risk" | "delivered" | "pending">("all");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");

  const sendAiMessage = () => {
    if (!aiChatInput.trim()) return;
    setAiChatMessages(prev => [...prev, { role: "user", text: aiChatInput }]);
    const input = aiChatInput;
    setAiChatInput("");
    
    const responses = [
      `Based on current data for ${selectedProject.name}, I see ${riskAlerts.filter(r => r.severity === "critical" || r.severity === "high").length} high-priority risks. The most critical is the HVAC delivery delay which could impact your schedule by 14 days. Want me to generate mitigation options?`,
      `Analyzing material delivery patterns... I found that ${materialItems.filter(m => m.status === "at-risk").length} items are at risk. The curtain wall system and HVAC chillers need immediate attention. I recommend contacting alternative suppliers.`,
      `Looking at your progress data, the MEP rough-in is 7% behind schedule. However, I've identified an opportunity to recover by reallocating resources from the facade crew which is currently 7% ahead. Should I model this scenario?`,
      `I've analyzed historical data from 47 similar projects. The current risk pattern suggests an 82% probability of a 2-3 week delay without intervention. Top 3 actions to mitigate: 1) Expedite HVAC procurement, 2) Pre-schedule inspection slots, 3) Add weekend concrete pours.`,
      `Cost analysis complete. Your CPI of 1.02 indicates you're slightly under budget. However, I detected a steel price escalation trend that could add $340K if not addressed in the next 2 weeks. Recommendation: Lock in pricing now.`,
    ];
    
    setTimeout(() => {
      setAiChatMessages(prev => [...prev, { role: "ai", text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 1000);
  };

  const filteredMaterials = materialItems.filter(m => {
    if (materialFilter === "all") return true;
    if (materialFilter === "at-risk") return m.status === "at-risk" || m.status === "pending-approval";
    if (materialFilter === "delivered") return m.status === "delivered";
    if (materialFilter === "pending") return m.status === "ordered" || m.status === "manufacturing" || m.status === "scheduled";
    return true;
  });

  const statusColor: Record<string, string> = {
    "on-track": "text-emerald-400 bg-emerald-500/15",
    "ahead": "text-cyan-400 bg-cyan-500/15",
    "at-risk": "text-amber-400 bg-amber-500/15",
    "delayed": "text-red-400 bg-red-500/15",
  };

  const materialStatusColor: Record<string, string> = {
    "delivered": "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
    "in-transit": "text-blue-400 bg-blue-500/15 border-blue-500/30",
    "manufacturing": "text-purple-400 bg-purple-500/15 border-purple-500/30",
    "ordered": "text-cyan-400 bg-cyan-500/15 border-cyan-500/30",
    "scheduled": "text-slate-400 bg-slate-500/15 border-slate-500/30",
    "at-risk": "text-amber-400 bg-amber-500/15 border-amber-500/30",
    "pending-approval": "text-orange-400 bg-orange-500/15 border-orange-500/30",
  };

  const severityColor: Record<string, string> = {
    "critical": "text-red-400 bg-red-500/15 border-red-500/40",
    "high": "text-amber-400 bg-amber-500/15 border-amber-500/40",
    "medium": "text-yellow-400 bg-yellow-500/15 border-yellow-500/40",
    "low": "text-slate-400 bg-slate-500/15 border-slate-500/40",
  };

  const moduleIcons: Record<ConstructionModule, string> = {
    dashboard: "dashboard",
    materials: "container",
    intelligence: "sparkle",
    progress: "progress",
    analytics: "bar-chart",
    documents: "pdf",
    integrations: "api",
    settings: "settings",
  };

  const modules: { key: ConstructionModule; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "materials", label: "Materials" },
    { key: "intelligence", label: "Intelligence" },
    { key: "progress", label: "Progress" },
    { key: "analytics", label: "Analytics" },
    { key: "documents", label: "Documents" },
    { key: "integrations", label: "Integrations" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <PrototypeShell title="ConstructivIQ + Slate.ai — Construction Intelligence Platform">
      <div className="flex h-full">
        {/* ── Left Sidebar Navigation ── */}
        <aside className="w-64 shrink-0 border-r border-white/10 bg-[#0A1020] flex flex-col overflow-hidden">
          {/* Logo */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 20h20"/>
                  <path d="M5 20V8l7-5 7 5v12"/>
                  <path d="M9 20v-6h6v6"/>
                  <path d="M9 12h6"/>
                </svg>
              </div>
              <div>
                <h1 className="text-sm font-bold text-white">ConstructivIQ</h1>
                <p className="text-[10px] text-cyan-400">AI-Powered Intelligence</p>
              </div>
            </div>
          </div>

          {/* Project Selector */}
          <div className="p-3 border-b border-white/10">
            <label className="text-[10px] text-white/40 uppercase tracking-wider block mb-2">Active Project</label>
            <select
              value={selectedProject.id}
              onChange={(e) => setSelectedProject(constructionProjects.find(p => p.id === e.target.value) || constructionProjects[0])}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/80 outline-none focus:border-cyan-500/50"
            >
              {constructionProjects.map(p => (
                <option key={p.id} value={p.id} className="bg-[#0A1020]">{p.name}</option>
              ))}
            </select>
            <div className="mt-2 flex items-center justify-between">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColor[selectedProject.status]}`}>
                {selectedProject.status.replace("-", " ").toUpperCase()}
              </span>
              <span className="text-[10px] text-white/40">{selectedProject.progress}% Complete</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
            {modules.map(m => (
              <button
                key={m.key}
                onClick={() => setActiveModule(m.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-all ${
                  activeModule === m.key
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                    : "text-white/60 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <SvgIcon name={moduleIcons[m.key]} size={16} />
                <span>{m.label}</span>
                {m.key === "intelligence" && (
                  <span className="ml-auto text-[9px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded-full">
                    {riskAlerts.filter(r => r.severity === "critical" || r.severity === "high").length}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="p-3 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-white/40">Risk Score</span>
              <span className={`font-mono ${selectedProject.riskScore > 60 ? "text-red-400" : selectedProject.riskScore > 30 ? "text-amber-400" : "text-emerald-400"}`}>
                {selectedProject.riskScore}/100
              </span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${selectedProject.riskScore > 60 ? "bg-red-500" : selectedProject.riskScore > 30 ? "bg-amber-500" : "bg-emerald-500"}`}
                style={{ width: `${selectedProject.riskScore}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] mt-3">
              <span className="text-white/40">AI Confidence</span>
              <span className="text-cyan-400 font-mono">94%</span>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 bg-[#080E1A] overflow-auto">
          {/* Top Header */}
          <header className="sticky top-0 z-30 h-14 bg-[#0A1020]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6">
            <div>
              <h2 className="text-sm font-semibold text-white">{modules.find(m => m.key === activeModule)?.label}</h2>
              <p className="text-[10px] text-white/40">{selectedProject.name} • {selectedProject.phase}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Time Range Selector */}
              <div className="flex items-center bg-white/5 rounded-lg p-0.5 border border-white/10">
                {(["7d", "30d", "90d", "1y"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeRange(t)}
                    className={`px-3 py-1 text-[10px] rounded transition-colors ${timeRange === t ? "bg-cyan-500/20 text-cyan-300" : "text-white/50 hover:text-white/70"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {/* Notifications */}
              <button className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <SvgIcon name="alert" size={14} className="text-white/60" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] flex items-center justify-center text-white">5</span>
              </button>
              {/* Sync Status */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[10px] text-emerald-400">Live Sync</span>
              </div>
              {/* User */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white">SC</div>
            </div>
          </header>

          {/* Module Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* ── Dashboard Module ── */}
              {activeModule === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* AI Insights Banner */}
                  <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shrink-0">
                        <SvgIcon name="sparkle" size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                          AI Insights Summary
                          <span className="text-[9px] px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded-full">Live</span>
                        </h3>
                        <p className="text-xs text-white/60 mt-1 leading-relaxed">
                          Analyzing {selectedProject.name}: <span className="text-amber-400">{riskAlerts.filter(r => r.project === selectedProject.id).length} active risks</span> detected.
                          Material delivery is <span className="text-emerald-400">{analyticsMetrics.materialDelivery.onTime}% on-time</span>.
                          Schedule performance index at <span className={analyticsMetrics.schedulePerformance.spi >= 1 ? "text-emerald-400" : "text-amber-400"}>{analyticsMetrics.schedulePerformance.spi}</span>.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowAIChat(true)}
                        className="px-4 py-2 bg-cyan-500/20 text-cyan-300 text-xs rounded-lg hover:bg-cyan-500/30 transition-colors border border-cyan-500/30 shrink-0"
                      >
                        Ask AI
                      </button>
                    </div>
                  </div>

                  {/* KPI Cards */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] text-white/40 uppercase tracking-wider">Project Health</span>
                        <span className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                          <SvgIcon name="gauge" size={14} className="text-emerald-400" />
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-emerald-400">{analyticsMetrics.overallHealth}%</div>
                      <p className="text-[10px] text-white/40 mt-1">+3% from last week</p>
                    </div>
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] text-white/40 uppercase tracking-wider">Schedule (SPI)</span>
                        <span className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
                          <SvgIcon name="timeline" size={14} className="text-amber-400" />
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-amber-400">{analyticsMetrics.schedulePerformance.spi}</div>
                      <p className="text-[10px] text-white/40 mt-1">Slightly behind target</p>
                    </div>
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] text-white/40 uppercase tracking-wider">Cost (CPI)</span>
                        <span className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center">
                          <SvgIcon name="stat" size={14} className="text-cyan-400" />
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-cyan-400">{analyticsMetrics.schedulePerformance.cpi}</div>
                      <p className="text-[10px] text-white/40 mt-1">Under budget</p>
                    </div>
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] text-white/40 uppercase tracking-wider">Active Risks</span>
                        <span className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center">
                          <SvgIcon name="warning" size={14} className="text-red-400" />
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-red-400">{riskAlerts.length}</div>
                      <p className="text-[10px] text-white/40 mt-1">{riskAlerts.filter(r => r.severity === "critical").length} critical</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {/* Critical Risks */}
                    <div className="col-span-2 bg-[#0D1525] border border-white/10 rounded-xl">
                      <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                          <SvgIcon name="warning" size={14} className="text-amber-400" />
                          Priority Risk Alerts
                        </h3>
                        <button className="text-[10px] text-cyan-400 hover:underline">View All</button>
                      </div>
                      <div className="divide-y divide-white/5">
                        {riskAlerts.slice(0, 4).map(risk => (
                          <div
                            key={risk.id}
                            onClick={() => setSelectedRisk(risk)}
                            className="p-4 hover:bg-white/5 cursor-pointer transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                risk.severity === "critical" ? "bg-red-500" :
                                risk.severity === "high" ? "bg-amber-500" :
                                risk.severity === "medium" ? "bg-yellow-500" : "bg-slate-500"
                              }`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-white truncate">{risk.title}</span>
                                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${severityColor[risk.severity]}`}>
                                    {risk.severity}
                                  </span>
                                  <span className="text-[9px] px-1.5 py-0.5 bg-white/5 text-white/40 rounded">{risk.type}</span>
                                </div>
                                <p className="text-[10px] text-white/50 mt-1 line-clamp-1">{risk.description}</p>
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="text-[9px] text-white/30">{risk.timestamp}</span>
                                  <span className="text-[9px] text-cyan-400/60">AI Confidence: {risk.aiConfidence}%</span>
                                  <span className="text-[9px] text-amber-400">{risk.impact}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl">
                      <div className="p-4 border-b border-white/10">
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                          <SvgIcon name="sparkle" size={14} className="text-purple-400" />
                          AI Recommendations
                        </h3>
                      </div>
                      <div className="p-3 space-y-3">
                        {aiInsights.map((insight, i) => (
                          <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5 hover:border-cyan-500/30 transition-colors cursor-pointer">
                            <div className="flex items-start gap-2">
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                                insight.type === "prediction" ? "bg-cyan-500/15 text-cyan-400" :
                                insight.type === "anomaly" ? "bg-amber-500/15 text-amber-400" :
                                "bg-purple-500/15 text-purple-400"
                              }`}>
                                <SvgIcon name={insight.icon} size={12} />
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-medium text-white">{insight.title}</p>
                                <p className="text-[10px] text-white/50 mt-0.5 line-clamp-2">{insight.description}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-[9px] text-cyan-400">{insight.confidence}% confidence</span>
                                  <button className="text-[9px] text-cyan-400 hover:underline">{insight.action}</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Progress Overview */}
                  <div className="bg-[#0D1525] border border-white/10 rounded-xl">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">Activity Progress Overview</h3>
                      <div className="flex items-center gap-4 text-[10px]">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full" /> Ahead</span>
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-cyan-500 rounded-full" /> On Track</span>
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-500 rounded-full" /> Behind</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-6 gap-4">
                        {progressActivities.map(act => (
                          <div key={act.id} className="text-center">
                            <div className="relative w-16 h-16 mx-auto">
                              <svg className="w-full h-full -rotate-90">
                                <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                                <circle
                                  cx="32" cy="32" r="28" fill="none"
                                  stroke={act.variance > 0 ? "#22c55e" : act.variance < -5 ? "#f59e0b" : "#06b6d4"}
                                  strokeWidth="4"
                                  strokeDasharray={`${act.actual * 1.76} 176`}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">{act.actual}%</span>
                            </div>
                            <p className="text-[10px] text-white/60 mt-2 line-clamp-1">{act.name.split(" ").slice(0, 2).join(" ")}</p>
                            <p className={`text-[9px] mt-0.5 ${act.variance > 0 ? "text-emerald-400" : act.variance < 0 ? "text-amber-400" : "text-white/40"}`}>
                              {act.variance > 0 ? "+" : ""}{act.variance}%
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Materials Module ── */}
              {activeModule === "materials" && (
                <motion.div
                  key="materials"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Filters */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {(["all", "at-risk", "delivered", "pending"] as const).map(f => (
                        <button
                          key={f}
                          onClick={() => setMaterialFilter(f)}
                          className={`px-4 py-2 text-xs rounded-lg transition-colors ${
                            materialFilter === f
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                              : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                          }`}
                        >
                          {f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")}
                          <span className="ml-2 text-[10px] text-white/40">
                            {f === "all" ? materialItems.length :
                             f === "at-risk" ? materialItems.filter(m => m.status === "at-risk" || m.status === "pending-approval").length :
                             f === "delivered" ? materialItems.filter(m => m.status === "delivered").length :
                             materialItems.filter(m => ["ordered", "manufacturing", "scheduled"].includes(m.status)).length}
                          </span>
                        </button>
                      ))}
                    </div>
                    <button className="px-4 py-2 bg-cyan-500 text-white text-xs rounded-lg hover:bg-cyan-400 transition-colors">
                      + Add Material
                    </button>
                  </div>

                  {/* Materials Table */}
                  <div className="bg-[#0D1525] border border-white/10 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Material</th>
                            <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Category</th>
                            <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Supplier</th>
                            <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Status</th>
                            <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Delivery</th>
                            <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Submittal</th>
                            <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Cost</th>
                            <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Lead Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredMaterials.map(mat => (
                            <tr key={mat.id} className="hover:bg-white/5 transition-colors cursor-pointer">
                              <td className="px-4 py-3">
                                <div>
                                  <p className="text-xs text-white font-medium">{mat.name}</p>
                                  <p className="text-[10px] text-white/40">{mat.id} • {mat.quantity}</p>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-xs text-white/60">{mat.category}</td>
                              <td className="px-4 py-3 text-xs text-white/60">{mat.supplier}</td>
                              <td className="px-4 py-3">
                                <span className={`text-[10px] px-2 py-1 rounded-full border ${materialStatusColor[mat.status]}`}>
                                  {mat.status.replace("-", " ")}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-xs text-white/60 font-mono">{mat.deliveryDate}</td>
                              <td className="px-4 py-3">
                                <span className={`text-[10px] px-2 py-0.5 rounded ${
                                  mat.submittalStatus === "approved" ? "bg-emerald-500/15 text-emerald-400" :
                                  mat.submittalStatus === "rejected" ? "bg-red-500/15 text-red-400" :
                                  mat.submittalStatus === "pending" ? "bg-amber-500/15 text-amber-400" :
                                  "bg-blue-500/15 text-blue-400"
                                }`}>
                                  {mat.submittalStatus}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-xs text-cyan-400 font-mono">{mat.cost}</td>
                              <td className="px-4 py-3 text-xs text-white/40">{mat.leadTime}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Delivery Timeline */}
                  <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-white mb-4">Delivery Timeline</h3>
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" style={{ left: "100px" }} />
                      <div className="space-y-4">
                        {materialItems.slice(0, 5).map((mat, i) => (
                          <div key={mat.id} className="flex items-center gap-4">
                            <span className="w-24 text-[10px] text-white/40 text-right font-mono shrink-0">{mat.deliveryDate}</span>
                            <div className={`w-3 h-3 rounded-full shrink-0 ${
                              mat.status === "delivered" ? "bg-emerald-500" :
                              mat.status === "at-risk" ? "bg-amber-500" :
                              "bg-cyan-500"
                            }`} />
                            <div className="flex-1 bg-white/5 rounded-lg px-3 py-2">
                              <p className="text-xs text-white">{mat.name}</p>
                              <p className="text-[10px] text-white/40">{mat.supplier} • {mat.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Intelligence Module ── */}
              {activeModule === "intelligence" && (
                <motion.div
                  key="intelligence"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Risk Summary Cards */}
                  <div className="grid grid-cols-4 gap-4">
                    {(["critical", "high", "medium", "low"] as const).map(sev => (
                      <div key={sev} className={`bg-[#0D1525] border rounded-xl p-4 ${severityColor[sev].replace("text-", "border-").split(" ")[2]}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] uppercase tracking-wider ${severityColor[sev].split(" ")[0]}`}>{sev}</span>
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${severityColor[sev].split(" ")[1]}`}>
                            <SvgIcon name="warning" size={14} className={severityColor[sev].split(" ")[0]} />
                          </span>
                        </div>
                        <div className={`text-2xl font-bold ${severityColor[sev].split(" ")[0]}`}>
                          {riskAlerts.filter(r => r.severity === sev).length}
                        </div>
                        <p className="text-[10px] text-white/40 mt-1">active alerts</p>
                      </div>
                    ))}
                  </div>

                  {/* Risk Details */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Risk List */}
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl">
                      <div className="p-4 border-b border-white/10">
                        <h3 className="text-sm font-semibold text-white">All Risk Alerts</h3>
                      </div>
                      <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
                        {riskAlerts.map(risk => (
                          <div
                            key={risk.id}
                            onClick={() => setSelectedRisk(risk)}
                            className={`p-4 cursor-pointer transition-colors ${selectedRisk?.id === risk.id ? "bg-cyan-500/10" : "hover:bg-white/5"}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                risk.severity === "critical" ? "bg-red-500" :
                                risk.severity === "high" ? "bg-amber-500" :
                                risk.severity === "medium" ? "bg-yellow-500" : "bg-slate-500"
                              }`} />
                              <div className="flex-1">
                                <p className="text-xs font-medium text-white">{risk.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${severityColor[risk.severity]}`}>{risk.severity}</span>
                                  <span className="text-[9px] text-white/30">{risk.type}</span>
                                  <span className="text-[9px] text-white/30">{risk.timestamp}</span>
                                </div>
                              </div>
                              <span className="text-[10px] text-cyan-400">{risk.aiConfidence}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risk Detail Panel */}
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl">
                      {selectedRisk ? (
                        <>
                          <div className="p-4 border-b border-white/10">
                            <div className="flex items-start justify-between">
                              <div>
                                <span className={`text-[9px] px-2 py-0.5 rounded ${severityColor[selectedRisk.severity]}`}>{selectedRisk.severity.toUpperCase()}</span>
                                <h3 className="text-sm font-semibold text-white mt-2">{selectedRisk.title}</h3>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] text-white/40">AI Confidence</p>
                                <p className="text-lg font-bold text-cyan-400">{selectedRisk.aiConfidence}%</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 space-y-4">
                            <div>
                              <label className="text-[10px] text-white/40 uppercase tracking-wider">Description</label>
                              <p className="text-xs text-white/80 mt-1">{selectedRisk.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] text-white/40 uppercase tracking-wider">Impact</label>
                                <p className="text-xs text-amber-400 mt-1">{selectedRisk.impact}</p>
                              </div>
                              <div>
                                <label className="text-[10px] text-white/40 uppercase tracking-wider">Type</label>
                                <p className="text-xs text-white/80 mt-1">{selectedRisk.type}</p>
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] text-white/40 uppercase tracking-wider">AI Recommendation</label>
                              <p className="text-xs text-cyan-300 mt-1 bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">{selectedRisk.recommendation}</p>
                            </div>
                            <div>
                              <label className="text-[10px] text-white/40 uppercase tracking-wider">Linked Items</label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {selectedRisk.linkedItems.map(item => (
                                  <span key={item} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded text-white/60">{item}</span>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                              <button className="flex-1 py-2 bg-cyan-500/20 text-cyan-300 text-xs rounded-lg hover:bg-cyan-500/30 transition-colors border border-cyan-500/30">
                                Apply AI Recommendation
                              </button>
                              <button className="px-4 py-2 bg-white/5 text-white/60 text-xs rounded-lg hover:bg-white/10 transition-colors border border-white/10">
                                Dismiss
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="h-full flex items-center justify-center p-8">
                          <div className="text-center">
                            <SvgIcon name="warning" size={32} className="text-white/20 mx-auto mb-3" />
                            <p className="text-sm text-white/40">Select a risk to view details</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Progress Module ── */}
              {activeModule === "progress" && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Overall Progress */}
                  <div className="bg-[#0D1525] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-semibold text-white">Overall Project Progress</h3>
                        <p className="text-[10px] text-white/40 mt-1">{selectedProject.phase}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-cyan-400">{selectedProject.progress}%</p>
                        <p className="text-[10px] text-white/40">Target: 70% by end of month</p>
                      </div>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedProject.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-white/40">
                      <span>Start: {selectedProject.startDate}</span>
                      <span>End: {selectedProject.endDate}</span>
                    </div>
                  </div>

                  {/* Activity Table */}
                  <div className="bg-[#0D1525] border border-white/10 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">Activity Progress</h3>
                      <button className="text-[10px] text-cyan-400 hover:underline">Sync from P6</button>
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Activity</th>
                          <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">WBS</th>
                          <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Progress</th>
                          <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Variance</th>
                          <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Crew</th>
                          <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {progressActivities.map(act => (
                          <tr key={act.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3">
                              <p className="text-xs text-white">{act.name}</p>
                              <p className="text-[10px] text-white/40">{act.startDate} → {act.endDate}</p>
                            </td>
                            <td className="px-4 py-3 text-xs text-white/60 font-mono">{act.wbs}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      act.variance > 0 ? "bg-emerald-500" :
                                      act.variance < -5 ? "bg-amber-500" : "bg-cyan-500"
                                    }`}
                                    style={{ width: `${act.actual}%` }}
                                  />
                                </div>
                                <span className="text-xs text-white/60 w-10">{act.actual}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-mono ${
                                act.variance > 0 ? "text-emerald-400" :
                                act.variance < 0 ? "text-amber-400" : "text-white/40"
                              }`}>
                                {act.variance > 0 ? "+" : ""}{act.variance}%
                              </span>
                            </td>
                            <td className="px-4 py-3 text-xs text-white/60">{act.crew}</td>
                            <td className="px-4 py-3">
                              <span className={`text-[10px] px-2 py-1 rounded-full ${
                                act.status === "ahead" ? "bg-emerald-500/15 text-emerald-400" :
                                act.status === "behind" ? "bg-amber-500/15 text-amber-400" :
                                act.status === "complete" ? "bg-cyan-500/15 text-cyan-400" :
                                "bg-white/10 text-white/60"
                              }`}>
                                {act.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* ── Analytics Module ── */}
              {activeModule === "analytics" && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Metrics Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Labor Utilization</p>
                      <p className="text-2xl font-bold text-emerald-400 mt-2">{analyticsMetrics.productivity.laborUtilization}%</p>
                      <div className="h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${analyticsMetrics.productivity.laborUtilization}%` }} />
                      </div>
                    </div>
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Equipment Uptime</p>
                      <p className="text-2xl font-bold text-cyan-400 mt-2">{analyticsMetrics.productivity.equipmentUptime}%</p>
                      <div className="h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${analyticsMetrics.productivity.equipmentUptime}%` }} />
                      </div>
                    </div>
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Safety TRIR</p>
                      <p className="text-2xl font-bold text-emerald-400 mt-2">{analyticsMetrics.safetyMetrics.trir}</p>
                      <p className="text-[10px] text-white/40 mt-1">{analyticsMetrics.safetyMetrics.incidentFree} days incident-free</p>
                    </div>
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">Change Orders</p>
                      <p className="text-2xl font-bold text-amber-400 mt-2">{analyticsMetrics.changeOrders.totalValue}</p>
                      <p className="text-[10px] text-white/40 mt-1">{analyticsMetrics.changeOrders.pending} pending approval</p>
                    </div>
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Schedule Performance Chart */}
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-white mb-4">Schedule Performance Trend</h3>
                      <div className="h-48 flex items-end gap-2">
                        {[0.88, 0.91, 0.89, 0.94, 0.92, 0.94, 0.97, 0.94].map((val, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className={`w-full rounded-t ${val >= 1 ? "bg-emerald-500" : val >= 0.9 ? "bg-cyan-500" : "bg-amber-500"}`}
                              style={{ height: `${val * 100}%` }}
                            />
                            <span className="text-[8px] text-white/30">W{i + 1}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center gap-4 mt-4 text-[10px]">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full" /> On/Ahead</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-cyan-500 rounded-full" /> Near Target</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-full" /> Behind</span>
                      </div>
                    </div>

                    {/* Material Delivery Chart */}
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-white mb-4">Material Delivery Performance</h3>
                      <div className="flex items-center justify-center h-48">
                        <div className="relative w-40 h-40">
                          <svg className="w-full h-full -rotate-90">
                            <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                            <circle cx="80" cy="80" r="70" fill="none" stroke="#22c55e" strokeWidth="12" strokeDasharray={`${analyticsMetrics.materialDelivery.onTime * 4.4} 440`} />
                            <circle cx="80" cy="80" r="70" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray={`${analyticsMetrics.materialDelivery.delayed * 4.4} 440`} strokeDashoffset={`-${analyticsMetrics.materialDelivery.onTime * 4.4}`} />
                            <circle cx="80" cy="80" r="70" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray={`${analyticsMetrics.materialDelivery.atRisk * 4.4} 440`} strokeDashoffset={`-${(analyticsMetrics.materialDelivery.onTime + analyticsMetrics.materialDelivery.delayed) * 4.4}`} />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-emerald-400">{analyticsMetrics.materialDelivery.onTime}%</span>
                            <span className="text-[10px] text-white/40">On Time</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-4 mt-4 text-[10px]">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full" /> On Time ({analyticsMetrics.materialDelivery.onTime}%)</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-full" /> Delayed ({analyticsMetrics.materialDelivery.delayed}%)</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full" /> At Risk ({analyticsMetrics.materialDelivery.atRisk}%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Predictive Analysis */}
                  <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <SvgIcon name="sparkle" size={14} className="text-purple-400" />
                        AI Predictive Analysis
                      </h3>
                      <span className="text-[10px] text-cyan-400 px-2 py-0.5 bg-cyan-500/10 rounded-full">Updated 5 mins ago</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-[10px] text-white/40 uppercase">Predicted Completion</p>
                        <p className="text-xl font-bold text-white mt-1">July 15, 2027</p>
                        <p className="text-[10px] text-emerald-400 mt-1">2 weeks ahead of baseline</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-[10px] text-white/40 uppercase">Estimated at Completion</p>
                        <p className="text-xl font-bold text-white mt-1">{analyticsMetrics.schedulePerformance.eac}</p>
                        <p className="text-[10px] text-emerald-400 mt-1">$2.4M under budget</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-[10px] text-white/40 uppercase">Risk Probability</p>
                        <p className="text-xl font-bold text-amber-400 mt-1">34%</p>
                        <p className="text-[10px] text-white/40 mt-1">Chance of 2+ week delay</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Documents Module ── */}
              {activeModule === "documents" && (
                <motion.div
                  key="documents"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Document Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <p className="text-[10px] text-white/40 uppercase">Open RFIs</p>
                      <p className="text-2xl font-bold text-amber-400">{analyticsMetrics.rfiMetrics.open}</p>
                      <p className="text-[10px] text-white/40">{analyticsMetrics.rfiMetrics.overdueCount} overdue</p>
                    </div>
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <p className="text-[10px] text-white/40 uppercase">Avg Response Time</p>
                      <p className="text-2xl font-bold text-cyan-400">{analyticsMetrics.rfiMetrics.avgResponseDays}</p>
                      <p className="text-[10px] text-white/40">days</p>
                    </div>
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <p className="text-[10px] text-white/40 uppercase">Pending COs</p>
                      <p className="text-2xl font-bold text-purple-400">{analyticsMetrics.changeOrders.pending}</p>
                      <p className="text-[10px] text-white/40">{analyticsMetrics.changeOrders.totalValue} total value</p>
                    </div>
                    <div className="bg-[#0D1525] border border-white/10 rounded-xl p-4">
                      <p className="text-[10px] text-white/40 uppercase">Submittals</p>
                      <p className="text-2xl font-bold text-emerald-400">89%</p>
                      <p className="text-[10px] text-white/40">approval rate</p>
                    </div>
                  </div>

                  {/* Documents Table */}
                  <div className="bg-[#0D1525] border border-white/10 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-white">Document Tracker</h3>
                      <button className="px-4 py-2 bg-cyan-500 text-white text-xs rounded-lg hover:bg-cyan-400 transition-colors">
                        + New Document
                      </button>
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">ID</th>
                          <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Type</th>
                          <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Title</th>
                          <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Status</th>
                          <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Priority</th>
                          <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Assignee</th>
                          <th className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-wider font-medium">Due Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {documentsData.map(doc => (
                          <tr key={doc.id} className="hover:bg-white/5 transition-colors cursor-pointer">
                            <td className="px-4 py-3 text-xs text-cyan-400 font-mono">{doc.id}</td>
                            <td className="px-4 py-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded ${
                                doc.type === "RFI" ? "bg-blue-500/15 text-blue-400" :
                                doc.type === "Submittal" ? "bg-purple-500/15 text-purple-400" :
                                "bg-amber-500/15 text-amber-400"
                              }`}>{doc.type}</span>
                            </td>
                            <td className="px-4 py-3 text-xs text-white">{doc.title}</td>
                            <td className="px-4 py-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded ${
                                doc.status === "open" ? "bg-cyan-500/15 text-cyan-400" :
                                doc.status === "answered" ? "bg-emerald-500/15 text-emerald-400" :
                                doc.status === "rejected" ? "bg-red-500/15 text-red-400" :
                                doc.status === "approved" ? "bg-emerald-500/15 text-emerald-400" :
                                doc.status === "in-review" ? "bg-amber-500/15 text-amber-400" :
                                "bg-white/10 text-white/60"
                              }`}>{doc.status}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded ${
                                doc.priority === "critical" ? "bg-red-500/15 text-red-400" :
                                doc.priority === "high" ? "bg-amber-500/15 text-amber-400" :
                                doc.priority === "medium" ? "bg-yellow-500/15 text-yellow-400" :
                                "bg-white/10 text-white/60"
                              }`}>{doc.priority}</span>
                            </td>
                            <td className="px-4 py-3 text-xs text-white/60">{doc.assignee}</td>
                            <td className="px-4 py-3 text-xs text-white/40 font-mono">{doc.dueDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* ── Integrations Module ── */}
              {activeModule === "integrations" && (
                <motion.div
                  key="integrations"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-3 gap-4">
                    {integrationsData.map(int => (
                      <div key={int.name} className="bg-[#0D1525] border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                            <span className="text-lg font-bold text-cyan-400">{int.name.charAt(0)}</span>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            int.status === "connected" ? "bg-emerald-500/15 text-emerald-400" :
                            int.status === "syncing" ? "bg-cyan-500/15 text-cyan-400 animate-pulse" :
                            "bg-red-500/15 text-red-400"
                          }`}>{int.status}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-white">{int.name}</h3>
                        <div className="mt-3 space-y-1 text-[10px]">
                          <div className="flex justify-between">
                            <span className="text-white/40">Last Sync</span>
                            <span className="text-white/60">{int.lastSync}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/40">Records</span>
                            <span className="text-cyan-400 font-mono">{int.recordsSync}</span>
                          </div>
                        </div>
                        <button className={`w-full mt-4 py-2 text-xs rounded-lg transition-colors ${
                          int.status === "connected" ? "bg-white/5 text-white/60 hover:bg-white/10" :
                          int.status === "syncing" ? "bg-cyan-500/20 text-cyan-300" :
                          "bg-cyan-500 text-white hover:bg-cyan-400"
                        }`}>
                          {int.status === "connected" ? "Configure" : int.status === "syncing" ? "Syncing..." : "Connect"}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Auto-Linking Visualization */}
                  <div className="bg-[#0D1525] border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <SvgIcon name="link" size={14} className="text-cyan-400" />
                        AI Auto-Linking Technology
                      </h3>
                      <span className="text-[10px] text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded-full">47,302 links created</span>
                    </div>
                    <p className="text-xs text-white/60 mb-4">
                      Slate's patented auto-linking technology connects data across your construction tech stack, creating a unified intelligence layer.
                    </p>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      {["Schedules", "Documents", "Models", "Communications"].map((type, i) => (
                        <div key={type} className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-xs text-white/40">{type}</p>
                          <p className="text-lg font-bold text-cyan-400 mt-1">{[3421, 8932, 2847, 12103][i]}</p>
                          <p className="text-[9px] text-white/30">items linked</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Settings Module ── */}
              {activeModule === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 max-w-2xl"
                >
                  <div className="bg-[#0D1525] border border-white/10 rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-white mb-4">AI Configuration</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <div>
                          <p className="text-xs text-white">Predictive Analytics</p>
                          <p className="text-[10px] text-white/40">Enable AI-powered schedule and cost predictions</p>
                        </div>
                        <div className="w-10 h-5 bg-cyan-500 rounded-full relative cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <div>
                          <p className="text-xs text-white">Risk Auto-Detection</p>
                          <p className="text-[10px] text-white/40">Automatically flag anomalies and risks</p>
                        </div>
                        <div className="w-10 h-5 bg-cyan-500 rounded-full relative cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <div>
                          <p className="text-xs text-white">Lessons Learned Matching</p>
                          <p className="text-[10px] text-white/40">Match current situations with historical project data</p>
                        </div>
                        <div className="w-10 h-5 bg-cyan-500 rounded-full relative cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-xs text-white">Real-time Sync</p>
                          <p className="text-[10px] text-white/40">Keep data synchronized across all integrations</p>
                        </div>
                        <div className="w-10 h-5 bg-cyan-500 rounded-full relative cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0D1525] border border-white/10 rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-white mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      {["Critical Risks", "Material Delays", "Document Due Dates", "Progress Milestones", "AI Insights"].map((pref, i) => (
                        <div key={pref} className="flex items-center justify-between py-2">
                          <span className="text-xs text-white/80">{pref}</span>
                          <div className={`w-10 h-5 ${i < 3 ? "bg-cyan-500" : "bg-white/20"} rounded-full relative cursor-pointer`}>
                            <div className={`w-4 h-4 bg-white rounded-full absolute ${i < 3 ? "right-0.5" : "left-0.5"} top-0.5`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* ── AI Chat Widget ── */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {showAIChat && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="mb-3 w-96 bg-[#0D1525] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                      <SvgIcon name="sparkle" size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Construction AI Assistant</p>
                      <p className="text-[10px] text-emerald-400">Online • Analyzing {selectedProject.name}</p>
                    </div>
                  </div>
                  <button onClick={() => setShowAIChat(false)} className="text-white/40 hover:text-white"><SvgIcon name="x" size={16} /></button>
                </div>
              </div>
              <div className="h-72 overflow-y-auto p-4 space-y-3">
                {aiChatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-cyan-500/20 text-cyan-100 rounded-br-sm"
                        : "bg-white/5 text-white/80 rounded-bl-sm border border-white/10"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-white/10 bg-white/5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiChatInput}
                    onChange={(e) => setAiChatInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") sendAiMessage(); }}
                    placeholder="Ask about risks, materials, schedule..."
                    className="flex-1 bg-white/5 rounded-xl px-4 py-2.5 text-xs text-white/80 placeholder:text-white/30 outline-none border border-white/10 focus:border-cyan-500/40"
                  />
                  <button onClick={sendAiMessage} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-medium hover:opacity-90 transition-opacity">
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setShowAIChat(!showAIChat)}
          className={`w-14 h-14 rounded-2xl shadow-lg flex items-center justify-center transition-all hover:scale-105 ${
            showAIChat
              ? "bg-white/10 text-white/60 border border-white/20"
              : "bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
          }`}
        >
          <SvgIcon name={showAIChat ? "x" : "sparkle"} size={20} />
        </button>
      </div>
    </PrototypeShell>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ROUTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function PrototypePage() {
  const params = useParams();
  const slug = params.slug as string;

  switch (slug) {
    case "nocode-platform":
      return <NoCodePrototype />;
    case "ehr-platform":
      return <EHRPrototype />;
    case "iot-dashboard":
      return <IoTPrototype />;
    case "ott-platform":
      return <OTTPrototype />;
    case "construction-ai":
      return <ConstructionAIPrototype />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1120] text-white/50">
          <p>Prototype not found</p>
        </div>
      );
  }
}
