"use client";
import { useEffect, useState } from "react";

const LeadConnectorForm: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the external script dynamically on the client side
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Ensure iframe loading state is handled correctly
    const checkIframeLoad = () => {
      const iframe = document.getElementById("inline-hiKDBAD1H3oL7RfO5YK3") as HTMLIFrameElement;
      if (iframe) {
        iframe.onload = () => setLoading(false);
      }
    };

    // Use MutationObserver to detect when the iframe is added to the DOM
    const observer = new MutationObserver(() => {
      checkIframeLoad();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    // Inject CSS only in the client
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "750px", position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <div
            className="spinner"
            style={{
              width: "50px",
              height: "50px",
              border: "5px solid #ccc",
              borderTop: "5px solid #C4EA00",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
      )}
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/hiKDBAD1H3oL7RfO5YK3"
        style={{ width: "100%", height: "100%", border: "none", borderRadius: "4px" }}
        id="inline-hiKDBAD1H3oL7RfO5YK3"
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-activation-type="alwaysActivated"
        data-deactivation-type="neverDeactivate"
        data-form-name="Form 0"
        data-height="749"
        data-layout-iframe-id="inline-hiKDBAD1H3oL7RfO5YK3"
        data-form-id="hiKDBAD1H3oL7RfO5YK3"
        title="Form 0"
        onLoad={() => setLoading(false)}
      ></iframe>
    </div>
  );
};

export default LeadConnectorForm;
