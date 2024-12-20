"use client";

import React, { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";

// Dynamically import ForceGraph with no SSR
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

// Language data array
const languageData: [string, string][] = [
  ["Proto Indo-European", "Balto-Slavic"],
  ["Proto Indo-European", "Germanic"],
  ["Proto Indo-European", "Celtic"],
  ["Proto Indo-European", "Italic"],
  ["Proto Indo-European", "Hellenic"],
  // ... rest of your data
];

// Color scheme for different language families
const colorScheme = {
  "Proto Indo-European": "#FF6B6B", // Red
  "Balto-Slavic": "#4ECDC4", // Teal
  Germanic: "#45B7D1", // Blue
  Celtic: "#96CEB4", // Green
  Italic: "#FFEEAD", // Yellow
  Hellenic: "#D4A5A5", // Pink
  Anatolian: "#9B59B6", // Purple
  "Indo-Iranian": "#E67E22", // Orange
  Tocharian: "#2ECC71", // Emerald
  default: "#95A5A6", // Gray (default)
};

// Convert data to the format expected by react-force-graph
const graphData = {
  nodes: Array.from(new Set(languageData.flat())).map((id) => ({
    id,
    name: id,
    color: colorScheme[id as keyof typeof colorScheme] || colorScheme.default,
  })),
  links: languageData.map(([source, target]) => ({
    source,
    target,
  })),
};

function GraphComponent() {
  return (
    <ForceGraph2D
      graphData={graphData}
      nodeLabel="name"
      nodeColor={(node) => node.color}
      linkColor="#999"
      width={1100}
      height={700}
      nodeRelSize={6}
      linkWidth={1}
      enableNodeDrag={true}
      enableZoomInteraction={true}
      linkDirectionalParticles={2}
      linkDirectionalParticleSpeed={0.005}
      nodeCanvasObject={(node: any, ctx, globalScale) => {
        if (typeof node.x !== "number" || typeof node.y !== "number") return;

        const label = node.name;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(
          (n) => n + fontSize * 0.2
        );

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
        ctx.fill();

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";
        ctx.fillText(label, node.x, node.y + 12);
      }}
    />
  );
}

export default function Graph() {
  return (
    <Card className="w-full max-w-[1200px] mx-auto">
      <CardContent className="p-6">
        <Suspense fallback={<div>Loading graph...</div>}>
          <GraphComponent />
        </Suspense>
        <p className="text-sm text-muted-foreground mt-4">
          This force-directed graph shows the Indo-European language family
          tree. Nodes can be dragged to explore relationships.
        </p>
      </CardContent>
    </Card>
  );
}
