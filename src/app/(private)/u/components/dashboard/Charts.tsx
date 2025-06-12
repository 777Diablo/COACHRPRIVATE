import React, { useEffect, useRef } from 'react';

interface ChartData {
  name: string;
  percentage: number;
  color: string;
}

interface CircleChartProps {
  data: ChartData[];
}

export const CircleChart: React.FC<CircleChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Set chart dimensions
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    const innerRadius = radius * 0.6; // For donut chart
    
    // Calculate total for percentages
    const total = data.reduce((sum, item) => sum + item.percentage, 0);
    
    // Draw the chart segments
    let startAngle = -0.5 * Math.PI; // Start at top
    
    // Draw segments
    data.forEach((item) => {
      const sliceAngle = (item.percentage / total) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      
      // Draw inner circle for donut effect
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
      
      // Calculate position for the percentage label
      const midAngle = startAngle + sliceAngle / 2;
      const labelRadius = (radius + innerRadius) / 2;
      const labelX = centerX + Math.cos(midAngle) * labelRadius;
      const labelY = centerY + Math.sin(midAngle) * labelRadius;
      
      // Draw percentage label if segment is large enough
      if (sliceAngle > 0.15) {
        ctx.font = '10px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${Math.round(item.percentage)}%`, labelX, labelY);
      }
      
      // Update start angle for next segment
      startAngle = endAngle;
    });
    
    // Add legend
    const legendX = 10;
    let legendY = rect.height - (data.length * 20) - 10;
    
    data.forEach((item) => {
      // Draw color square
      ctx.fillStyle = item.color;
      ctx.fillRect(legendX, legendY, 12, 12);
      
      // Draw text
      ctx.font = '10px Arial';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.name, legendX + 16, legendY + 6);
      
      legendY += 20;
    });
    
  }, [data]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
};