"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ReactSVGPanZoom, TOOL_AUTO, Value } from "react-svg-pan-zoom";

const FloorPlan: React.FC = () => {
    const ViewerRef = useRef<any>(null);
    const [value, setValue] = useState<Value | null>(null);
    const [tool, setTool] = useState(TOOL_AUTO);
    const [svgContent, setSvgContent] = useState<string | null>(null);
    
    const dimensions = useMemo(() => ({
        width: 1170,
        height: 612,
        // Add padding to adjust for SVG whitespace
        paddingLeft: 0,   // Adjust this value to fix left overflow
        paddingTop: 0,    // Adjust this value to fix top overflow
        paddingRight: 0,   // Add if needed
        paddingBottom: 0   // Add if needed
    }), []);

    const panZoomOptions = useMemo(() => ({
        // Focus zoom options
        setPointOnViewerCenter: false,
        focusOnMousePosition: true,
        scaleFactorOnWheel: 1.1,

        // Core options
        background: '#fff',
        detectWheel: true,
        detectAutoPan: true,  // Changed to true to enable proper pan detection
        preventPanOutside: true,
        scaleFactorMax: 1.69,
        scaleFactorMin: 1.0,
        
        // Disable unused features for performance
        disableDoubleClickZoom: true,
        customMiniature: () => null,
        miniatureProps: { position: 'none' },

        // Add padding to prevent hard stops at edges
        padding: 0
    }), []);

    useEffect(() => {
        let mounted = true;
        
        const fetchSVG = async () => {
            try {
                const response = await fetch("/deck-plan.svg");
                const data = await response.text();
                
                if (mounted) {
                    const cleanedSvg = data
                        .replace(/<\?xml.*?\?>|<!DOCTYPE[^>]*>/g, "")
                        .replace(/<!--.*?-->/g, "")
                        .replace(/\s+/g, " ")
                        .replace(/>\s+</g, "><")
                        .trim();
                    
                    setSvgContent(cleanedSvg);
                }
            } catch (error) {
                console.error("Error loading SVG:", error);
            }
        };

        fetchSVG();
        
        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (!value) {
            // Initialize with proper boundaries
            setValue({
                version: 3,
                mode: "idle",
                focus: false,
                a: 1,  // scale X
                b: 0,  // skew X
                c: 0,  // skew Y
                d: 1,  // scale Y
                e: 0,  // translate X
                f: 0,  // translate Y
                viewerWidth: dimensions.width,
                viewerHeight: dimensions.height,
                SVGWidth: dimensions.width,
                SVGHeight: dimensions.height,
                startX: 0,
                startY: 0,
                endX: dimensions.width,
                endY: dimensions.height,
                maxX: dimensions.width,  // Set maximum X boundary
                maxY: dimensions.height,  // Set maximum Y boundary
                minX: 0,  // Set minimum X boundary
                minY: 0,  // Set minimum Y boundary
            });
        }
    }, [value, dimensions]);

    // Enhanced change handler with boundary enforcement
    const handleChangeValue = useMemo(() => (newValue: Value) => {
        if (isNaN(newValue.e) || isNaN(newValue.f)) return;
        
        // Enforce zoom limits
        if (newValue.a > 1.69 || newValue.a < 1.0) return;
        
        // Calculate boundaries based on current zoom level
        const currentZoom = newValue.a;
        // Adjust pan limits based on padding
        const maxPanX = (dimensions.width * (currentZoom - 1)) - dimensions.paddingLeft - dimensions.paddingRight;
        const maxPanY = (dimensions.height * (currentZoom - 1)) - dimensions.paddingTop - dimensions.paddingBottom;
        
        // Clamp translation values within bounds
        const clampedValue = {
            ...newValue,
            e: Math.max(Math.min(newValue.e, maxPanX), -maxPanX),
            f: Math.max(Math.min(newValue.f, maxPanY), -maxPanY)
        };
        
        setValue(clampedValue);
    }, [dimensions]);

    if (!svgContent || !value) {
        return <div className="flex justify-center mt-10">Loading floor plan...</div>;
    }

    return (
        <div className="flex justify-center mt-10">
            <ReactSVGPanZoom
                ref={ViewerRef}
                width={dimensions.width}
                height={dimensions.height}
                tool={tool}
                value={value}
                onChangeValue={handleChangeValue}
                onChangeTool={setTool}
                {...panZoomOptions}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={dimensions.width}
                    height={dimensions.height}
                    viewBox="900 450 600 300"  // Adjust these values to crop the whitespace
                >
                    <g 
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                        style={{
                            willChange: 'transform',
                            transform: 'translateZ(0)'
                        }}
                    />
                </svg>
            </ReactSVGPanZoom>
        </div>
    );
};

export default FloorPlan;