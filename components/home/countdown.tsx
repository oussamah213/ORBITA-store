"use client";

import { useEffect, useState } from "react";

export function Countdown() {
  const [seconds, setSeconds] = useState(7 * 3600 + 42 * 60 + 18);
  useEffect(() => { const timer = setInterval(() => setSeconds((value) => value > 0 ? value - 1 : 24 * 3600), 1000); return () => clearInterval(timer); }, []);
  const values = [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60];
  return <div className="countdown" aria-label={`Ends in ${values.join(" hours ")}`}><span>Ends in</span>{values.map((value, index) => <span key={index} className="time-unit">{String(value).padStart(2, "0")}</span>).reduce<React.ReactNode[]>((items, item, index) => [...items, index ? <b key={`sep-${index}`}>:</b> : null, item], [])}</div>;
}
