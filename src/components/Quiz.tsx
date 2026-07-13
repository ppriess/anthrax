"use client";

import { useState } from "react";
import type { Quiz as QuizContent } from "@/lib/content";

/**
 * Daily quiz. One vote per user (persisted in localStorage). Clicking an option
 * reveals correct/incorrect with a bar-grow animation, per the interaction spec.
 */
export function Quiz({ quiz }: { quiz: QuizContent }) {
  const [answered, setAnswered] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  function choose(option: string) {
    if (answered) return;
    setPicked(option);
    setAnswered(true);
    try {
      localStorage.setItem(`anthrax-quiz-${quiz.id}`, option);
    } catch {
      /* storage unavailable — ignore */
    }
  }

  return (
    <div className="border-[3px] border-paper bg-card-dark p-5">
      <div className="mb-2 font-mono text-[11px] tracking-[0.2em] text-on-dark-3">
        {quiz.number}
      </div>
      <h4 className="m-0 mb-[10px] text-xl font-bold leading-[1.2] text-paper">
        {quiz.question}
      </h4>
      <div className="flex flex-wrap gap-2">
        {quiz.options.map((option) => {
          const isCorrect = option === quiz.correct;
          const isPicked = option === picked;
          let cls =
            "border-2 border-border-dark-2 text-paper font-semibold text-sm px-[13px] py-[7px] transition-colors";
          if (answered) {
            if (isCorrect)
              cls =
                "border-2 border-brasil-dark bg-brasil-dark/20 text-paper font-semibold text-sm px-[13px] py-[7px]";
            else if (isPicked)
              cls =
                "border-2 border-hot bg-hot/20 text-paper font-semibold text-sm px-[13px] py-[7px]";
            else
              cls =
                "border-2 border-border-dark-2 text-on-dark-3 font-semibold text-sm px-[13px] py-[7px]";
          }
          return (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              disabled={answered}
              className={`${cls} ${!answered ? "cursor-pointer hover:border-signal hover:text-signal" : "cursor-default"}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="mt-[10px] font-mono text-[13px] text-on-dark-3">
        {answered
          ? picked === quiz.correct
            ? "ACERTOU! ★ "
            : "quase — a resposta é " + quiz.correct + ". "
          : ""}
        {quiz.stats}
      </div>
    </div>
  );
}
