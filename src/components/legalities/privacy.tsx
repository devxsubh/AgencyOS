
export default function PrivacyPage() {
  return (
    <>
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://4kwallpapers.com/images/wallpapers/dark-background-abstract-background-network-3d-background-7680x4320-8324.png')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative flex min-h-[60vh] flex-col items-center justify-center px-4 text-white">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider">UNDERSTANDING OUR</p>
          <h1 className="text-center text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">Privacy Policy</h1>
        </div>
        <div className="relative bg-white px-4 py-16">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground">
                Wonder Creative Studio respects your privacy and is committed to protecting your personal information.
              </p>
              <p className="text-muted-foreground">
                This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit
                our website and use our services.
              </p>

              <h3 className="text-xl font-semibold text-[#c4ea00] pt-8">1. Information We Collect</h3>
              <p className="text-muted-foreground">
                We collect several different types of information for various purposes to improve our Service to you.
              </p>
              <p className="text-muted-foreground">
                <strong>Personal Information:</strong> While using our Service, we may ask you to provide certain
                personally identifiable information that can be used to contact or identify you ("Personal
                Information"). This may include your name, email address, phone number, and company affiliation.
              </p>
              <p className="text-muted-foreground">
                <strong>Usage Data:</strong> We may also collect information about how you access and use the Service
                ("Usage Data"). This Usage Data may include information such as your browser type, IP address, operating
                system, referral source, length of visit to pages on our Service, time of visit, and other diagnostic
                data.
              </p>

              <h3 className="text-xl font-semibold text-[#c4ea00] pt-4">2. Use of Your Information</h3>
              <p className="text-muted-foreground">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Provide and maintain the Service</li>
                <li>Improve and personalize the Service</li>
                <li>Develop new products and services</li>
                <li>Send you marketing and promotional communications (with your consent)</li>
                <li>Respond to your inquiries and requests</li>
                <li>For other purposes as disclosed to you</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#c4ea00] pt-4">3. Sharing Your Information</h3>
              <p className="text-muted-foreground">
                We may share your information with third-party service providers who help us operate and improve the
                Service. These service providers are obligated to keep your information confidential and use it only for
                the purposes we disclose.
              </p>
              <p className="text-muted-foreground">
                We may also disclose your information if required to do so by law or in the good faith belief that such
                action is necessary to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Comply with a legal obligation</li>
                <li>Protect the rights or safety of Wonder Creative Studio or others</li>
                <li>Prevent or investigate fraud or other wrongdoing</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#c4ea00] pt-4">4. Data Security</h3>
              <p className="text-muted-foreground">
                We take reasonable precautions to protect your information from unauthorized access, disclosure,
                alteration, or destruction. However, no internet transmission or electronic storage method is 100%
                secure. Therefore, we cannot guarantee absolute security.
              </p>

              <h3 className="text-xl font-semibold text-[#c4ea00] pt-4">5. Your Rights</h3>
              <p className="text-muted-foreground">
                You have certain rights regarding your personal information. You may request to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Access your personal information</li>
                <li>Rectify inaccurate personal information</li>
                <li>Request the deletion of your personal information</li>
              </ul>
              <p className="text-muted-foreground">
                You can exercise these rights by contacting us at connect@wondercreativestudios.com.
              </p>

              <h3 className="text-xl font-semibold text-[#c4ea00] pt-4">6. Children's Privacy</h3>
              <p className="text-muted-foreground">
                Our Service does not address anyone under the age of 18. We do not knowingly collect personally
                identifiable information from anyone under the age of 18.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

