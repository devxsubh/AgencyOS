'use client'
import { useEffect, useState } from "react";

const SupportForm: React.FC = () => {
  useEffect(() => {
    // Dynamically load the LeadConnector script
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup when unmounted
    };
  }, []);

  return (
        <div className=''>
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/JQ6A85OsQ5exbSAQ4bFZ"
            style={{ width: "100%", height: "100%", border: "none", borderRadius: "4px" }}
            id="popup-JQ6A85OsQ5exbSAQ4bFZ" 
            data-layout='{"id":"INLINE"}'            
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Website product support form"
            data-height="747"
            data-layout-iframe-id="popup-JQ6A85OsQ5exbSAQ4bFZ"
            data-form-id="JQ6A85OsQ5exbSAQ4bFZ"
            title="Website product support form"

          ></iframe>
        </div>
  );
};

export default SupportForm;
