"use client";

import { useState } from "react";
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
    <div className="min-h-screen bg-[#0B1120] text-foreground flex flex-col pt-16 lg:pt-20">
      {/* Top bar */}
      <header className="h-12 flex items-center justify-between px-4 border-b border-white/10 bg-[#0B1120]/90 backdrop-blur-md shrink-0 sticky top-16 lg:top-20 z-40">
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
      <div className="flex-1 overflow-auto">{children}</div>
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
   EHR PLATFORM PROTOTYPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function EHRPrototype() {
  const [activeTab, setActiveTab] = useState("overview");

  const vitals = [
    { label: "Heart Rate", value: "72", unit: "bpm", status: "normal", trend: [65, 68, 72, 70, 73, 72] },
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal", trend: [118, 122, 119, 120, 121, 120] },
    { label: "Temperature", value: "98.6", unit: "°F", status: "normal", trend: [98.4, 98.5, 98.6, 98.7, 98.6, 98.6] },
    { label: "SpO2", value: "98", unit: "%", status: "normal", trend: [97, 98, 98, 99, 98, 98] },
    { label: "Resp Rate", value: "16", unit: "/min", status: "normal", trend: [15, 16, 15, 17, 16, 16] },
    { label: "Glucose", value: "142", unit: "mg/dL", status: "elevated", trend: [110, 125, 138, 145, 142, 142] },
  ];

  const medications = [
    { name: "Metformin", dose: "500mg", frequency: "2x daily", time: "08:00 / 20:00", status: "active" },
    { name: "Lisinopril", dose: "10mg", frequency: "1x daily", time: "08:00", status: "active" },
    { name: "Atorvastatin", dose: "20mg", frequency: "1x daily", time: "21:00", status: "active" },
    { name: "Aspirin", dose: "81mg", frequency: "1x daily", time: "08:00", status: "discontinued" },
  ];

  const tabs = ["overview", "vitals", "medications", "notes", "labs"];

  return (
    <PrototypeShell title="ehr-dashboard.health">
      <div className="flex h-[calc(100vh-48px)]">
        {/* Left sidebar — Patient Nav */}
        <aside className="w-56 shrink-0 border-r border-white/10 bg-[#0D1525] overflow-y-auto">
          <div className="p-4 border-b border-white/10">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg mb-3">JD</div>
            <p className="text-sm font-semibold">John Doe</p>
            <p className="text-[10px] text-white/40 font-mono">MRN: 00284719</p>
            <p className="text-[10px] text-white/40 mt-1">Male • 54 yrs • A+</p>
          </div>
          <nav className="p-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`w-full text-left text-xs px-3 py-2 rounded-lg capitalize transition-colors ${activeTab === t ? "bg-cyan-500/15 text-cyan-300" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}
              >
                {t}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-white/10 mt-auto">
            <p className="text-[10px] text-white/30 font-mono mb-2">Allergies</p>
            <span className="px-2 py-0.5 bg-red-500/20 text-red-300 text-[10px] rounded-full border border-red-500/30">Penicillin</span>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Quick vitals strip */}
              <div>
                <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Current Vitals</h2>
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
                  {vitals.map((v) => (
                    <div key={v.label} className={`p-3 rounded-xl border ${v.status === "elevated" ? "bg-amber-500/10 border-amber-500/30" : "bg-white/5 border-white/10"}`}>
                      <p className="text-[10px] text-white/40 mb-1">{v.label}</p>
                      <p className={`text-xl font-bold ${v.status === "elevated" ? "text-amber-400" : "text-white"}`}>{v.value}</p>
                      <p className="text-[9px] text-white/30">{v.unit}</p>
                      {/* Mini sparkline */}
                      <svg viewBox="0 0 60 20" className="w-full h-4 mt-1">
                        <polyline
                          fill="none"
                          stroke={v.status === "elevated" ? "#F59E0B" : "#06B6D4"}
                          strokeWidth="1.5"
                          points={v.trend.map((val, i) => {
                            const min = Math.min(...v.trend);
                            const max = Math.max(...v.trend);
                            const range = max - min || 1;
                            return `${i * 12},${20 - ((val - min) / range) * 16}`;
                          }).join(" ")}
                        />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity + Medications side by side */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Active Medications</h2>
                  <div className="space-y-2">
                    {medications.filter((m) => m.status === "active").map((m) => (
                      <div key={m.name} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{m.name}</p>
                          <p className="text-[10px] text-white/40">{m.dose} • {m.frequency}</p>
                        </div>
                        <span className="text-[10px] font-mono text-white/30">{m.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Recent Notes</h2>
                  <div className="space-y-2">
                    {[
                      { author: "Dr. Smith", time: "Today, 09:15", note: "Patient reports improved glucose control. Continue current regimen." },
                      { author: "RN Johnson", time: "Today, 07:30", note: "Morning vitals within normal limits. Patient ambulating independently." },
                      { author: "Dr. Smith", time: "Yesterday, 14:00", note: "Lab results reviewed. Adjusted Metformin dosage per protocol." },
                    ].map((n, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium">{n.author}</span>
                          <span className="text-[10px] text-white/30">{n.time}</span>
                        </div>
                        <p className="text-[10px] text-white/50 leading-relaxed">{n.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "vitals" && (
            <div>
              <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-4">Vitals History</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {vitals.map((v) => (
                  <div key={v.label} className={`p-4 rounded-xl border ${v.status === "elevated" ? "bg-amber-500/10 border-amber-500/30" : "bg-white/5 border-white/10"}`}>
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-xs text-white/60">{v.label}</p>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full ${v.status === "elevated" ? "bg-amber-500/20 text-amber-300" : "bg-green-500/20 text-green-300"}`}>{v.status}</span>
                    </div>
                    <p className={`text-3xl font-bold ${v.status === "elevated" ? "text-amber-400" : "text-white"}`}>{v.value}</p>
                    <p className="text-[10px] text-white/30 mb-3">{v.unit}</p>
                    <svg viewBox="0 0 120 40" className="w-full h-8">
                      <polyline fill="none" stroke={v.status === "elevated" ? "#F59E0B" : "#06B6D4"} strokeWidth="2"
                        points={v.trend.map((val, i) => {
                          const min = Math.min(...v.trend);
                          const max = Math.max(...v.trend);
                          const range = max - min || 1;
                          return `${i * 24},${36 - ((val - min) / range) * 30}`;
                        }).join(" ")}
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "medications" && (
            <div>
              <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-4">Medication Schedule</h2>
              <div className="space-y-2">
                {medications.map((m) => (
                  <div key={m.name} className={`p-4 rounded-xl border flex items-center justify-between ${m.status === "discontinued" ? "bg-white/2 border-white/5 opacity-50" : "bg-white/5 border-white/10"}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${m.status === "active" ? "bg-green-400" : "bg-red-400"}`} />
                      <div>
                        <p className="text-sm font-medium">{m.name}</p>
                        <p className="text-[10px] text-white/40">{m.dose} • {m.frequency} • {m.time}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${m.status === "active" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>{m.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div>
              <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-4">Clinical Notes</h2>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
                <div className="h-20 border border-dashed border-white/10 rounded-lg flex items-center justify-center text-xs text-white/30">
                  Click to add a new note...
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { author: "Dr. Smith", time: "Jun 12, 2025 09:15", title: "Follow-up Visit", note: "Patient reports improved glucose control with adjusted Metformin regimen. A1C target of <7% within reach. Continue current treatment plan. Schedule follow-up in 3 months." },
                  { author: "RN Johnson", time: "Jun 12, 2025 07:30", title: "Morning Assessment", note: "Patient ambulating independently. Vitals within normal limits. No complaints of pain. Appetite improved. Continue monitoring glucose levels per protocol." },
                  { author: "Dr. Smith", time: "Jun 11, 2025 14:00", title: "Lab Review", note: "Reviewed comprehensive metabolic panel. Glucose trending down — 142 from 165 last month. Kidney function stable. LDL slightly elevated at 132 — monitor with next draw." },
                ].map((n, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-[10px] text-white/40">{n.author}</p>
                      </div>
                      <span className="text-[10px] text-white/30 font-mono">{n.time}</span>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">{n.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "labs" && (
            <div>
              <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-4">Lab Results</h2>
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left p-3 text-white/40 font-medium">Test</th>
                      <th className="text-left p-3 text-white/40 font-medium">Result</th>
                      <th className="text-left p-3 text-white/40 font-medium">Range</th>
                      <th className="text-left p-3 text-white/40 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { test: "Glucose (Fasting)", result: "142 mg/dL", range: "70-100", status: "high" },
                      { test: "HbA1c", result: "7.2%", range: "<5.7%", status: "high" },
                      { test: "Total Cholesterol", result: "210 mg/dL", range: "<200", status: "borderline" },
                      { test: "LDL", result: "132 mg/dL", range: "<100", status: "high" },
                      { test: "HDL", result: "52 mg/dL", range: ">40", status: "normal" },
                      { test: "Creatinine", result: "0.9 mg/dL", range: "0.7-1.3", status: "normal" },
                      { test: "eGFR", result: "92 mL/min", range: ">60", status: "normal" },
                      { test: "TSH", result: "2.1 mU/L", range: "0.5-4.5", status: "normal" },
                    ].map((lab) => (
                      <tr key={lab.test} className="border-t border-white/5">
                        <td className="p-3">{lab.test}</td>
                        <td className="p-3 font-mono">{lab.result}</td>
                        <td className="p-3 text-white/40">{lab.range}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${lab.status === "high" ? "bg-red-500/20 text-red-300" : lab.status === "borderline" ? "bg-amber-500/20 text-amber-300" : "bg-green-500/20 text-green-300"}`}>{lab.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </PrototypeShell>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   IOT DASHBOARD PROTOTYPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function IoTPrototype() {
  const [selectedZone, setSelectedZone] = useState("All Zones");

  const devices = [
    { id: "SN-001", name: "Temp Sensor A1", zone: "Zone A", value: "23.4°C", status: "online" },
    { id: "SN-002", name: "Pressure Valve B3", zone: "Zone B", value: "2.1 bar", status: "online" },
    { id: "SN-003", name: "Humidity Ctrl A2", zone: "Zone A", value: "45%", status: "warning" },
    { id: "SN-004", name: "Motor RPM C1", zone: "Zone C", value: "1450", status: "online" },
    { id: "SN-005", name: "Flow Meter B1", zone: "Zone B", value: "12.8 L/s", status: "offline" },
    { id: "SN-006", name: "Vibration C2", zone: "Zone C", value: "0.3g", status: "online" },
    { id: "SN-007", name: "Power Meter A3", zone: "Zone A", value: "4.2 kW", status: "online" },
    { id: "SN-008", name: "Gas Detector B2", zone: "Zone B", value: "OK", status: "online" },
  ];

  const alerts = [
    { severity: "critical", msg: "Flow Meter B1 — No data for 15 min", time: "2m ago" },
    { severity: "warning", msg: "Humidity Ctrl A2 — Reading above threshold (45%)", time: "8m ago" },
    { severity: "info", msg: "Motor RPM C1 — Scheduled maintenance in 2 days", time: "1h ago" },
  ];

  const zones = ["All Zones", "Zone A", "Zone B", "Zone C"];
  const filteredDevices = selectedZone === "All Zones" ? devices : devices.filter((d) => d.zone === selectedZone);

  return (
    <PrototypeShell title="iot-command.center">
      <div className="flex h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 border-r border-white/10 bg-[#0D1525] overflow-y-auto">
          <div className="p-3">
            <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Zones</p>
            {zones.map((z) => (
              <button
                key={z}
                onClick={() => setSelectedZone(z)}
                className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors ${selectedZone === z ? "bg-cyan-500/15 text-cyan-300" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}
              >
                {z}
              </button>
            ))}
          </div>
          <div className="p-3 border-t border-white/10">
            <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Alerts</p>
            <div className="space-y-2">
              {alerts.map((a, i) => (
                <div key={i} className={`p-2 rounded-lg border text-[10px] ${a.severity === "critical" ? "bg-red-500/10 border-red-500/30 text-red-300" : a.severity === "warning" ? "bg-amber-500/10 border-amber-500/30 text-amber-300" : "bg-white/5 border-white/10 text-white/50"}`}>
                  <p className="leading-relaxed">{a.msg}</p>
                  <p className="text-white/30 mt-1">{a.time}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 overflow-auto p-6">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Devices", value: "1,247", sub: "+12 this week" },
              { label: "Online", value: "1,189", sub: "95.3%" },
              { label: "Warnings", value: "43", sub: "3.4%" },
              { label: "Offline", value: "15", sub: "1.2%" },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-white/40 mb-1">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-[10px] text-cyan-400/60">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Devices Table */}
          <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">
            Devices — {selectedZone}
          </h2>
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left p-3 text-white/40 font-medium">ID</th>
                  <th className="text-left p-3 text-white/40 font-medium">Device</th>
                  <th className="text-left p-3 text-white/40 font-medium">Zone</th>
                  <th className="text-left p-3 text-white/40 font-medium">Value</th>
                  <th className="text-left p-3 text-white/40 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.map((d) => (
                  <tr key={d.id} className="border-t border-white/5 hover:bg-white/2 transition-colors">
                    <td className="p-3 font-mono text-white/40">{d.id}</td>
                    <td className="p-3">{d.name}</td>
                    <td className="p-3 text-white/50">{d.zone}</td>
                    <td className="p-3 font-mono">{d.value}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] ${d.status === "online" ? "bg-green-500/20 text-green-300" : d.status === "warning" ? "bg-amber-500/20 text-amber-300" : "bg-red-500/20 text-red-300"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${d.status === "online" ? "bg-green-400" : d.status === "warning" ? "bg-amber-400" : "bg-red-400"}`} />
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mock Chart */}
          <div className="mt-6">
            <h2 className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">Sensor Readings — Last 24h</h2>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 h-48 flex items-end gap-1">
              {Array.from({ length: 24 }, (_, i) => {
                const h = 20 + Math.sin(i * 0.5) * 30 + Math.random() * 30;
                return (
                  <div
                    key={i}
                    className="flex-1 bg-cyan-500/40 hover:bg-cyan-400/60 rounded-t transition-colors"
                    style={{ height: `${h}%` }}
                    title={`${String(i).padStart(2, "0")}:00`}
                  />
                );
              })}
            </div>
          </div>
        </div>
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
    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1120] text-white/50">
          <p>Prototype not found</p>
        </div>
      );
  }
}
