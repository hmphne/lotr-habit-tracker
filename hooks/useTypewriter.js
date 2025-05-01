import { useEffect, useState } from "react";

export function useTypewriter(text, speed = 30, pauseAfterPunctuation = 300) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let i = 0;
    let timeout;

    const punctuationSet = new Set([".", "!", "?"]);
    setTypedText("");

    function typeNextChar() {
      if (i >= text.length) return;

      const currentChar = text.charAt(i);
      setTypedText((prev) => prev + currentChar);
      i++;

      const isPunctuation = punctuationSet.has(currentChar);
      const delay = isPunctuation ? pauseAfterPunctuation : speed;

      if (i < text.length) {
        timeout = setTimeout(typeNextChar, delay);
      }
    }

    typeNextChar();

    return () => clearTimeout(timeout);
  }, [text, speed, pauseAfterPunctuation]);

  return typedText;
}
