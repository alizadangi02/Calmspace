import React from "react";

import { WavyBackground } from "./ui/wavy-background";

export function WavyBackgroundDemo() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <div>
        <WavyBackground className="max-w-4xl mx-auto pb-40">
          <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
            CalmSpace
          </p>
          <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
            Stay in meditation for at least 15-20 minutes a day. 
          </p>
        </WavyBackground>
      </div>
    </div>
  );
}


