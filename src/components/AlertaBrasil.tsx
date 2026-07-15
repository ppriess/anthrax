"use client";

import { useState } from "react";

/**
 * "Brasil 2027??" email alert. Standard email validation; on success the box
 * swaps to a confirmation, per the interaction spec.
 */
export function AlertaBrasil({
  alert,
  confirm,
}: {
  alert: string;
  confirm: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  if (submitted) {
    return (
      <div className="mt-3 border-2 border-dashed border-brasil-dark bg-brasil-alert-bg px-[14px] py-3">
        <span className="font-marker text-sm text-brasil-dark">{confirm}</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="mt-3 border-2 border-dashed border-brasil-dark bg-brasil-alert-bg px-[14px] py-3"
    >
      <label className="font-marker text-sm text-brasil-dark">{alert}</label>
      <div className="mt-2 flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="teu@email.com"
          aria-label="E-mail para alerta Brasil"
          className="w-full border-2 border-brasil-dark bg-ink px-2 py-[6px] text-sm text-paper placeholder:text-on-dark-3 focus:outline-none"
        />
        <button
          type="submit"
          className="whitespace-nowrap bg-brasil-paper px-3 py-[6px] text-sm font-bold tracking-[0.1em] text-paper"
        >
          ME AVISA
        </button>
      </div>
    </form>
  );
}
