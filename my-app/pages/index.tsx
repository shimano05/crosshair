import React, { useRef, useEffect, useState } from "react";
import { Slider } from "@material-tailwind/react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [opacity, setOpacity] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [thickness, setThickness] = useState<number>(0);
  const [gap, setGap] = useState<number>(0);
  const [color, setColor] = useState<string>("");

  // canvas-bgcolor
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const { width, height } = canvas;

    const bgCtx = canvas.getContext("2d");
    if (bgCtx) {
      bgCtx.fillStyle = "black";
      bgCtx.fillRect(0, 0, width, height);
    }
  }, [opacity, length, thickness, gap]);

  // canvas-crosshair
  useEffect(() => {
    const [tValue, gValue, lValue] = [thickness / 10, gap / 10, length / 10];

    console.log(tValue, gValue, lValue, opacity);

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const { width, height } = canvas;

    const crosshairCtx = canvas.getContext("2d");
    if (crosshairCtx) {
      crosshairCtx.fillStyle = `${color}${opacity / 100})`;
      // top
      crosshairCtx.fillRect(width / 2 - tValue / 2, height / 2 - gValue, tValue, -lValue);
      // bottom
      crosshairCtx.fillRect(width / 2 - tValue / 2, height / 2 + gValue, tValue, lValue);
      // right
      crosshairCtx.fillRect(width / 2 + gValue, height / 2 - tValue / 2, lValue, tValue);
      // left
      crosshairCtx.fillRect(width / 2 - gValue, height / 2 - tValue / 2, -lValue, tValue);
    }
  }, [opacity, length, thickness, gap, color]);

  const convertRgb = (e: any) => {
    const hex = e.replace(/^#/, "");
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    setColor(`rgb(${r}, ${g}, ${b},`);
  };

  return (
    <>
      <canvas ref={canvasRef} width={500} height={500} className="mx-auto"></canvas>

      <nav className="flex w-52 flex-col gap-4 mx-auto">
        <h1>color({color})</h1>
        <input
          type="color"
          className="border-2 border-black"
          onChange={(e) => {
            convertRgb(e.target.value);
          }}
        />
        <h1>opacity({opacity / 10})</h1>
        <Slider
          color="green"
          defaultValue={opacity}
          min={0}
          max={100}
          step={10}
          onChange={(e) => {
            setOpacity(Number(e.target.value));
          }}
        />
        <h1>length({length / 10})</h1>
        <Slider
          color="red"
          defaultValue={length}
          min={0}
          max={100}
          step={10}
          onChange={(e) => {
            setLength(Number(e.target.value));
          }}
        />
        <h1>thickness({thickness / 10})</h1>
        <Slider
          color="blue"
          defaultValue={thickness}
          min={0}
          max={100}
          step={10}
          onChange={(e) => {
            setThickness(Number(e.target.value));
          }}
        />
        <h1>gap({gap / 10})</h1>
        <Slider
          color="yellow"
          defaultValue={gap}
          min={0}
          max={100}
          step={10}
          onChange={(e) => {
            setGap(Number(e.target.value));
          }}
        />
      </nav>
    </>
  );
}
