"use client";

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="px-space-xl py-space-sm bg-primary-container text-on-primary-fixed font-label-md uppercase tracking-wider shadow-lg hover:bg-surface-tint transition-colors inline-flex items-center gap-2"
    >
      <span className="material-symbols-outlined text-[18px]">print</span>
      Print Invoice
    </button>
  );
}
