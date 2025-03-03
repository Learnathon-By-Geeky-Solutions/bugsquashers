"use client";

import { useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export function LineChart({ data, color = "#66D47E" }) {
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
    const minValue = Math.min(...data.map((item) => item.value)) * 0.9;

    // Draw line
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate points
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * canvas.width;
      const y = canvas.height - ((item.value - minValue) / (maxValue - minValue)) * canvas.height;
      return { x, y };
    });

    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fill area under the line
    ctx.lineTo(points[points.length - 1].x, canvas.height);
    ctx.lineTo(points[0].x, canvas.height);
    ctx.closePath();
    ctx.fillStyle = `${color}20`;
    ctx.fill();
  }, [data, color]);

  return <canvas ref={canvasRef} className="w-full h-[150px]" />;
}

// Add PropTypes validation for the LineChart component
LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired, // Validate that each item has a `value` property of type number
    })
  ).isRequired, // Validate that `data` is an array and is required
  color: PropTypes.string, // Validate that `color` is an optional string
};