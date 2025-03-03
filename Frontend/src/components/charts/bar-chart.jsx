"use client";

import { useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export function BarChart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = 150;

    // Calculate max value for scaling
    const maxValue = Math.max(...data.map((item) => item.value)) * 1.1;

    // Draw bars
    const barWidth = (canvas.width / data.length) * 0.6;
    const spacing = (canvas.width / data.length) * 0.4;
    const startX = spacing / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * canvas.height;
      const x = startX + index * (barWidth + spacing);
      const y = canvas.height - barHeight;

      // Draw bar
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 4);
      ctx.fillStyle = "#F4AF1B";
      ctx.fill();
    });
  }, [data]);

  return <canvas ref={canvasRef} className="w-full h-[150px]" />;
}

// Add PropTypes validation for the BarChart component
BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired, // Validate that each item has a `value` property of type number
    })
  ).isRequired, // Validate that `data` is an array and is required
};