import React, { useEffect, useState } from "react";

const AnimatedDots = ({ reset }: { reset: boolean }) => {
  const [key, setKey] = useState(0);

  // Reset the animation by re-rendering
  useEffect(() => {
    if (reset) {
      setKey((prev) => prev + 1);
    }
  }, [reset]);

  return (
    <div className="dots-container absolute bottom-0 sm:bottom-[-10px] right-0 left-0" key={key}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="dot"
          style={{
            animationDelay: `${(7 / 20) * i}s`, // Calculate the delay for each dot
          }}
        ></div>
      ))}
      <style jsx>{`
        .dots-container {
          display: flex;
          gap: 5px;
          justify-content: center;
          align-items: center;
          margin-top: 4px;
        }
        .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #e0e0e0;
          animation: fill 7s linear infinite;
        }

        @keyframes fill {
          0% {
            background-color: #e0e0e0;
          }
          50%,
          100% {
            background-color: #06163c;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedDots;
