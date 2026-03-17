"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface PremiumAnimationProps {
  type: 'loading' | 'car' | 'success';
  className?: string;
}

export default function PremiumAnimation({ type, className }: PremiumAnimationProps) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    const urls = {
      loading: "https://assets9.lottiefiles.com/packages/lf20_6n9m74.json", // Sample sleek loading
      car: "https://assets2.lottiefiles.com/packages/lf20_at8pzhiz.json", // Sample car
      success: "https://assets10.lottiefiles.com/packages/lf20_pqnfmone.json" // Sample success
    };

    fetch(urls[type])
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Lottie load error", err));
  }, [type]);

  if (!animationData) return null;

  return (
    <div className={className}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
