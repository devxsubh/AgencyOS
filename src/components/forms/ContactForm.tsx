'use client'
import { useEffect, useState } from "react";

const ContactUsForm: React.FC = () => {
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
            src="https://api.leadconnectorhq.com/widget/form/3OaSl1UwyVcnOEyFBqKD"
            style={{ width: "100%", height: "100%", border: "none", borderRadius: "4px" }}
            id="popup-3OaSl1UwyVcnOEyFBqKD"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-activation-type="alwaysActivated"
            data-deactivation-type="neverDeactivate"
            data-form-name="Website contact us form"
            data-height="498"
            data-layout-iframe-id="popup-3OaSl1UwyVcnOEyFBqKD"
            data-form-id="3OaSl1UwyVcnOEyFBqKD"
            title="Contact Us Form"
          ></iframe>
        </div>
  );
};

export default ContactUsForm;
