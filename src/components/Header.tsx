"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/components/CartContext";

export default function Header() {
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("Current NextAuth Session:", session);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-deep/95 backdrop-blur-md border-b border-border-subtle">
      <div className="h-16 max-w-[1440px] mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between gap-space-md">
        <Link href="/" className="flex items-center gap-space-sm shrink-0 group">
          <div className="w-8 h-8 rounded bg-surface-tint text-on-primary flex items-center justify-center font-label-md font-bold text-label-md tracking-wider transition-transform group-hover:rotate-3 shadow-md">
            IDC
          </div>
          <span className="font-headline-sm text-[18px] uppercase tracking-wider text-text-editorial hidden sm:inline-block">
            India Digital <span className="text-surface-tint">Creatives</span>
          </span>
        </Link>
        <nav
          className="hidden xl:flex items-center gap-space-lg h-full"
        >
          <Link
            className="h-full flex items-center font-label-md uppercase tracking-wider transition-colors text-text-muted hover:text-text-editorial border-b-2 border-transparent hover:border-border-active"
            href="/"
          >
            Shop All
          </Link>
          <Link
            className="h-full flex items-center font-label-md text-label-md uppercase tracking-wider text-text-muted hover:text-text-editorial transition-colors border-b-2 border-transparent hover:border-border-active"
            href="/?category=Ebooks"
          >
            Ebooks
          </Link>
          <Link
            className="h-full flex items-center font-label-md text-label-md uppercase tracking-wider text-text-muted hover:text-text-editorial transition-colors border-b-2 border-transparent hover:border-border-active"
            href="/?category=Templates"
          >
            Templates
          </Link>
        </nav>
        <div className="flex items-center gap-space-sm shrink-0">
          <ThemeToggle />
          <button
            aria-label="Search"
            className="w-9 h-9 flex items-center justify-center text-text-muted hover:text-text-editorial transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
          </button>
          <a
            className="hidden sm:flex items-center gap-space-2xs px-space-xs py-space-2xs font-label-md text-label-md uppercase text-text-muted hover:text-text-editorial transition-colors"
            data-path="library"
            href="#"
          >
            <span className="material-symbols-outlined text-[18px]">
              shelves
            </span>
            <span>Library</span>
          </a>
          <Link
            className="inline-flex items-center gap-space-2xs px-space-sm py-space-xs bg-surface-card border border-border-subtle hover:border-border-active transition-all"
            href="/cart"
          >
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-editorial">
              Cart
            </span>
            <span className="px-1.5 py-0.5 bg-primary-container text-on-primary-fixed font-label-sm text-label-sm font-bold">
              {totalItems}
            </span>
          </Link>
          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => {
                if (!session) {
                  signIn("google");
                } else {
                  setMenuOpen(!menuOpen);
                }
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                session ? "bg-surface-tint" : "bg-primary"
              }`}
              title={session ? "Account Menu" : "Login"}
            >
              <span className={`material-symbols-outlined text-[18px] ${session ? "text-surface-container-lowest" : "text-on-primary"}`}>
                person
              </span>
            </button>

            {/* Dropdown */}
            {session && menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface-deep border border-border-subtle shadow-xl py-space-xs z-50 flex flex-col">
                <div className="px-space-sm py-space-xs border-b border-border-subtle mb-space-2xs">
                  <div className="font-label-md text-label-md text-text-editorial truncate">{session.user?.name}</div>
                  <div className="font-body-sm text-body-sm text-text-muted truncate">{session.user?.email}</div>
                </div>
                
                {(session.user as any)?.role === "ADMIN" && (
                  <Link href="/admin" className="px-space-sm py-space-xs font-label-md text-label-md uppercase tracking-wider text-primary-container hover:bg-surface-card transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                    Admin Panel
                  </Link>
                )}

                <Link href="/orders" className="px-space-sm py-space-xs font-label-md text-label-md uppercase tracking-wider text-text-muted hover:bg-surface-card transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  My Orders
                </Link>

                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-space-sm py-space-xs font-label-md text-label-md uppercase tracking-wider text-error hover:bg-error-container hover:text-on-error-container transition-colors flex items-center gap-2 mt-space-2xs"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
