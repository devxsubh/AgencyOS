'use client'
import { useEffect } from "react";

const LeadConnectorForm: React.FC = () => {
  useEffect(() => {
    // Load the script dynamically on the client side
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup when unmounted
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "750px" }}>
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
      ></iframe>
    </div>
  );
};

export default LeadConnectorForm;
