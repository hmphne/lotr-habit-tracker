import { useEffect, useState } from "react";

export function useTypewriter(text, speed = 30, pauseAfterPunctuation = 300) {
  const [typedText, setTypedText] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeout;

    const punctuationSet = new Set([".", "!", "?"]);
    setTypedText("");
    setFinished(false);

    function typeNextChar() {
      const currentChar = text.charAt(i);
      setTypedText((prev) => prev + currentChar);
      i++;

      const isPunctuation = punctuationSet.has(currentChar);
      const delay = isPunctuation ? pauseAfterPunctuation : speed;

      if (i < text.length) {
        timeout = setTimeout(typeNextChar, delay);
      } else {
        setFinished(true);
      }
    }

    timeout = setTimeout(typeNextChar, speed);

    return () => clearTimeout(timeout);
  }, [text, speed, pauseAfterPunctuation]);

  return { typedText, finished };
}
