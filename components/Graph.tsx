"use client";

import React, { Suspense, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize2, X } from "lucide-react";
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

interface GraphNode {
  x?: number;
  y?: number;
  color?: string;
  name: string;
  id: string;
  type: string;
  properties?: {
    部門?: string;
    值?: string;
    比較基準?: string;
    表現評估?: string;
    影響?: string[];
  };
}

function NodeDetails({ node }: { node: GraphNode }) {
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
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [filters, setFilters] = useState<{
    部門?: string;
    值?: string;
    比較基準?: string;
    表現評估?: string;
  }>({});

  const filteredData = useMemo(() => {
    let filteredNodes = nodes;
    let matchedNodes: string[] = [];

    if (Object.keys(filters).length > 0) {
      // Get nodes that match the filters
      matchedNodes = nodes
        .filter((node) => {
          if (!node.properties) return false;
          return Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            if (key === "值" || key === "比較基準") {
              const numValue = parseInt(
                node.properties[key]?.replace(/[^0-9]/g, "") || "0"
              );
              return value.startsWith(">")
                ? numValue > 200000
                : numValue < 200000;
            }
            return (
              node.properties[key as keyof typeof node.properties] === value
            );
          });
        })
        .map((node) => node.id);

      // Filter nodes to only include matched nodes and company node
      filteredNodes = nodes.filter(
        (node) => matchedNodes.includes(node.id) || node.id === "00"
      );
    }

    // Create links based on filters
    const filteredLinks = (() => {
      // If no filters, connect all nodes to company
      if (matchedNodes.length === 0) {
        return nodes
          .filter((node) => node.id !== "00")
          .map((node) => ({
            source: "00",
            target: node.id,
            value: 1,
          }));
      }

      const matchedLinks: Array<{
        source: string;
        target: string;
        value: number;
      }> = [];

      // Connect all matched nodes to each other
      for (let i = 0; i < matchedNodes.length; i++) {
        for (let j = i + 1; j < matchedNodes.length; j++) {
          matchedLinks.push({
            source: matchedNodes[i],
            target: matchedNodes[j],
            value: 1,
          });
        }
      }

      // Connect first matched node to company
      if (matchedNodes.length > 0) {
        matchedLinks.push({
          source: "00",
          target: matchedNodes[0],
          value: 1,
        });
      }

      return matchedLinks;
    })();

    return {
      nodes: filteredNodes.map((node) => ({
        ...node,
        color:
          colorScheme[node.type as keyof typeof colorScheme] ||
          colorScheme.default,
      })),
      links: filteredLinks,
    };
  }, [filters]);

  const handleFilter = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-2 justify-center mb-0 pt-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">部門</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleFilter("部門", "財務部")}>
              財務部
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter("部門", "銷售部")}>
              銷售部
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter("部門", "供應鏈部")}>
              供應鏈部
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter("部門", "採購部")}>
              採購部
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">值</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleFilter("值", "> $200,000")}>
              {">"} $200,000
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter("值", "< $200,000")}>
              {"<"} $200,000
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">比較基準</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleFilter("比較基準", "> $200,000")}
            >
              {">"} $200,000
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleFilter("比較基準", "< $200,000")}
            >
              {"<"} $200,000
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">表現評估</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleFilter("表現評估", "良好")}>
              良好
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFilter("表現評估", "一般")}>
              一般
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleFilter("表現評估", "需改善")}
            >
              需改善
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="destructive" onClick={() => setFilters({})}>
          Clear Filters
        </Button>
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
          graphData={filteredData}
          nodeLabel={(node) => node.name}
          nodeColor={(node) => node.color}
          linkColor="#999"
          width={isFullScreen ? window.innerWidth : 1100}
          height={isFullScreen ? window.innerHeight : 700}
          nodeRelSize={4}
          maxZoom={10}
          minZoom={4}
          linkWidth={1}
          enableNodeDrag={true}
          enableZoomInteraction={true}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={0.005}
          onNodeClick={(node) => {
            setSelectedNode(node as GraphNode);
          }}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const graphNode = node as GraphNode;
            if (
              typeof graphNode.x !== "number" ||
              typeof graphNode.y !== "number"
            )
              return;

            const label = graphNode.name;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;

            ctx.fillStyle = graphNode.color || "#000";
            ctx.beginPath();
            ctx.arc(graphNode.x, graphNode.y, 4, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";
            ctx.fillText(label, graphNode.x, graphNode.y);
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
    <Card className="w-full max-w-[1100px] min-h-[700px] mx-auto ">
      <CardContent className="p-0">
        <Suspense fallback={<div>Loading graph...</div>}>
          <GraphComponent />
        </Suspense>
      </CardContent>
    </Card>
  );
}
