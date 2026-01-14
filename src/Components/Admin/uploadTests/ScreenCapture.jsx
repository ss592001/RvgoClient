import React, { forwardRef, useImperativeHandle, useState } from "react";

const ScreenCaptureWrapper = forwardRef(({ onCapture }, ref) => {
  const [capturedImage, setCapturedImage] = useState(null);

  const captureScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" },
      });

      const track = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      const bitmap = await imageCapture.grabFrame();

      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const context = canvas.getContext("2d");
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/png");
      setCapturedImage(dataUrl);
      onCapture(dataUrl);
      track.stop();
    } catch (err) {
      console.error("Screen capture failed:", err);
    }
  };

  // Expose captureScreen method to parent using ref
  useImperativeHandle(ref, () => ({
    triggerCapture: () => captureScreen(),
  }));

  return (
    <div>
      {capturedImage && (
        <div style={{ marginTop: "1rem", display: "none" }}>
          <img
            src={capturedImage}
            alt="Captured Screen"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
});

export default ScreenCaptureWrapper;
