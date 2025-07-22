import React, { useRef } from "react";
import html2canvas from "html2canvas";

const Certificate = ({ data }) => {
  const certRef = useRef();

  const handleDownload = () => {
    html2canvas(certRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = `Certificate_${data.name}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="text-center mt-5">
      <div ref={certRef} style={{
        width: "800px",
        margin: "0 auto",
        padding: "30px",
        border: "10px solid #333",
        backgroundColor: "#fdfdfd",
        color: "#000",
        fontFamily: "Georgia, serif",
        position: "relative",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)"
      }}>
        <h2>Certificate of Achievement</h2>
        <p>This is to certify that</p>
        <h3 style={{ margin: "10px 0" }}>{data.name}</h3>
        <p>has successfully passed the</p>
        <h4>{data.examTitle}</h4>
        <p>with a score of {data.score} out of {data.total}.</p>
        <p><strong>Reward:</strong> <span style={{ color: "green" }}>{data.reward}</span></p>
        <div style={{
          position: "absolute",
          bottom: "20px",
          right: "30px",
          fontStyle: "italic"
        }}>
          <img src="/sign.png" alt="Admin Signature" width="120" /><br />
          <small>Admin Signature</small>
        </div>
      </div>
      <button className="btn btn-success mt-4" onClick={handleDownload}>Download as PNG</button>
    </div>
  );
};

export default Certificate;
