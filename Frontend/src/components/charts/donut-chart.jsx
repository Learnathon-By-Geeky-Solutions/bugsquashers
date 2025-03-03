"use client";

import { useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export function DonutChart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const size = 150;
    canvas.width = size;
    canvas.height = size;

    // Calculate total value
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Draw donut chart
    let startAngle = 0;
    const radius = size / 2;
    const thickness = 20;

    ctx.clearRect(0, 0, size, size);

    // Draw segments
    data.forEach((item) => {
      const angle = (item.value / total) * 2 * Math.PI;

      ctx.beginPath();
      ctx.arc(radius, radius, radius - thickness / 2, startAngle, startAngle + angle);
      ctx.lineWidth = thickness;
      ctx.strokeStyle = item.color;
      ctx.stroke();

      startAngle += angle;
    });

    // Draw center circle (white)
    ctx.beginPath();
    ctx.arc(radius, radius, radius - thickness - 5, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }, [data]);

  return <canvas ref={canvasRef} className="mx-auto" />;
}

// Add PropTypes validation for the DonutChart component
DonutChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired, // Validate that each item has a `value` property of type number
      color: PropTypes.string.isRequired, // Validate that each item has a `color` property of type string
    })
  ).isRequired, // Validate that `data` is an array and is required
};