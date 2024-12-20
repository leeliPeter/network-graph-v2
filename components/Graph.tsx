"use client";

import React, { Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dynamic from "next/dynamic";
import { nodes, links, colorScheme } from "./data";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

type NodeData = (typeof nodes)[0];

const graphData = {
  nodes: nodes.map((node) => ({
    ...node,
    color:
      colorScheme[node.type as keyof typeof colorScheme] || colorScheme.default,
  })),
  links: links,
};

function NodeDetails({ node }: { node: NodeData }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <div className="font-medium">部門</div>
        <div>{node.properties?.部門 || "N/A"}</div>
      </div>
      {node.properties && (
        <>
          <div className="grid gap-2">
            <div className="font-medium">值</div>
            <div>{node.properties.值}</div>
          </div>
          <div className="grid gap-2">
            <div className="font-medium">比較基準</div>
            <div>{node.properties.比較基準}</div>
          </div>
          <div className="grid gap-2">
            <div className="font-medium">表現評估</div>
            <div>{node.properties.表現評估}</div>
          </div>
          {node.properties.影響 && (
            <div className="grid gap-2">
              <div className="font-medium">影響因素</div>
              <div className="flex flex-wrap gap-2">
                {node.properties.影響.map((item, index) => (
                  <span
                    key={index}
                    className="bg-secondary px-2 py-1 rounded-md text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function GraphComponent() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-2 justify-center mb-6 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">部門</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>財務部</DropdownMenuItem>
            <DropdownMenuItem>銷售部</DropdownMenuItem>
            <DropdownMenuItem>供應鏈部</DropdownMenuItem>
            <DropdownMenuItem>採購部</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">值</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>{">"} $500,000</DropdownMenuItem>
            <DropdownMenuItem>{"<"} $500,000</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">表現評估</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>良好</DropdownMenuItem>
            <DropdownMenuItem>一般</DropdownMenuItem>
            <DropdownMenuItem>需改善</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="destructive">Clear Filters</Button>
      </div>

      <div className="">
        {isFullScreen ? (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleFullScreen}
            className="bg-white/50 backdrop-blur-sm absolute top-2 right-2 flex gap-2 z-[60]"
          >
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleFullScreen}
            className="bg-white/50 backdrop-blur-sm absolute top-2 right-2 flex gap-2 z-[60]"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div
        className={`transition-all duration-300 ${
          isFullScreen
            ? "fixed inset-0 z-50 bg-background"
            : "relative w-full h-full"
        }`}
      >
        <ForceGraph2D
          graphData={graphData}
          nodeLabel={(node) => node.name}
          nodeColor={(node) => node.color}
          linkColor="#999"
          width={isFullScreen ? window.innerWidth : 1100}
          height={isFullScreen ? window.innerHeight : 700}
          nodeRelSize={4}
          linkWidth={1}
          enableNodeDrag={true}
          enableZoomInteraction={true}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={0.005}
          onNodeClick={(node: any) => setSelectedNode(node)}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            if (typeof node.x !== "number" || typeof node.y !== "number")
              return;

            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;

            // Draw node circle
            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI, false);
            ctx.fill();

            // Draw node label in the center
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";
            ctx.fillText(label, node.x, node.y);
          }}
        />
      </div>

      <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedNode?.name}</DialogTitle>
          </DialogHeader>
          {selectedNode && <NodeDetails node={selectedNode} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Graph() {
  return (
    <Card className="w-full max-w-[1200px] mx-auto">
      <CardContent className="p-0">
        <Suspense fallback={<div>Loading graph...</div>}>
          <GraphComponent />
        </Suspense>
      </CardContent>
    </Card>
  );
}
