import { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";

import {
  LERP_FACTOR,
  detectionToHexagonPoints,
  lerpPoints,
} from "./outlineTracking";

const HOLD_FRAMES_AFTER_MISS = 18;

const useLiveOutline = (detection, enabled) => {
  const { width, height } = useWindowDimensions();
  const [displayPoints, setDisplayPoints] = useState(null);
  const currentRef = useRef(null);
  const targetRef = useRef(null);
  const missFramesRef = useRef(0);

  useEffect(() => {
    const nextTarget = detectionToHexagonPoints(
      detection?.issueRegion,
      width,
      height
    );

    if (nextTarget) {
      targetRef.current = nextTarget;
      missFramesRef.current = 0;
    } else {
      targetRef.current = null;
    }
  }, [detection?.issueRegion, width, height]);

  useEffect(() => {
    if (!enabled) {
      currentRef.current = null;
      targetRef.current = null;
      missFramesRef.current = 0;
      setDisplayPoints(null);
      return undefined;
    }

    let frameId = null;

    const tick = () => {
      const target = targetRef.current;

      if (!target) {
        missFramesRef.current += 1;

        if (missFramesRef.current > HOLD_FRAMES_AFTER_MISS) {
          currentRef.current = null;
          setDisplayPoints(null);
        }

        frameId = requestAnimationFrame(tick);
        return;
      }

      const result = lerpPoints(currentRef.current, target, LERP_FACTOR);

      if (!result?.points?.length) {
        currentRef.current = null;
        setDisplayPoints(null);
        frameId = requestAnimationFrame(tick);
        return;
      }

      currentRef.current = result.points;
      setDisplayPoints(result.points.map((point) => ({ ...point })));
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [enabled]);

  return displayPoints;
};

export { useLiveOutline };
