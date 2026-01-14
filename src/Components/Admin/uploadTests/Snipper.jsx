import React, { useState, useImperativeHandle, forwardRef } from "react";
import { ScreenCapture } from "react-screen-capture";

const Snipper = forwardRef((props, ref) => {
  const { setScreenCapture } = props;
  const handleScreenCapture = (capture) => {
    setScreenCapture(capture);
  };

  useImperativeHandle(ref, () => ({
    startCapture: () => {
      if (startCaptureFn) {
        startCaptureFn();
      }
    },
  }));

  let startCaptureFn = null;

  return (
    <ScreenCapture onEndCapture={handleScreenCapture}>
      {({ onStartCapture }) => {
        startCaptureFn = onStartCapture;
        return <div></div>;
      }}
    </ScreenCapture>
  );
});

export default Snipper;

// import React, {
//   useRef,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import Cropper from "react-easy-crop";
// import html2canvas from "html2canvas";

// const Snipper = forwardRef((props, ref) => {
//   const [image, setImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   useImperativeHandle(ref, () => ({
//     triggerSnip: () => {
//       takeScreenshot();
//     },
//   }));

//   const takeScreenshot = async () => {
//     const canvas = await html2canvas(document.body); // You can customize this target
//     const dataUrl = canvas.toDataURL("image/png");
//     setImage(dataUrl);
//   };

//   const onCropComplete = (_, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   };

//   const cropImage = () => {
//     const imageObj = new Image();
//     imageObj.src = image;

//     imageObj.onload = () => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");

//       canvas.width = croppedAreaPixels.width;
//       canvas.height = croppedAreaPixels.height;

//       ctx.drawImage(
//         imageObj,
//         croppedAreaPixels.x,
//         croppedAreaPixels.y,
//         croppedAreaPixels.width,
//         croppedAreaPixels.height,
//         0,
//         0,
//         croppedAreaPixels.width,
//         croppedAreaPixels.height
//       );

//       const croppedImageUrl = canvas.toDataURL("image/png");

//       const link = document.createElement("a");
//       link.href = croppedImageUrl;
//       link.download = "cropped-screenshot.png";
//       link.click();
//     };
//   };

//   return (
//     <div>
//       {image && (
//         <div style={{ position: "relative", height: "80vh" }}>
//           <Cropper
//             image={image}
//             crop={crop}
//             zoom={zoom}
//             aspect={4 / 3}
//             onCropChange={setCrop}
//             onZoomChange={setZoom}
//             onCropComplete={onCropComplete}
//           />
//           <button
//             onClick={cropImage}
//             style={{
//               position: "absolute",
//               top: 10,
//               right: 10,
//               zIndex: 10,
//               backgroundColor: "#000",
//               color: "#fff",
//               padding: "10px",
//               borderRadius: "5px",
//             }}
//           >
//             Save Snip
//           </button>
//         </div>
//       )}
//     </div>
//   );
// });

// export default Snipper;
