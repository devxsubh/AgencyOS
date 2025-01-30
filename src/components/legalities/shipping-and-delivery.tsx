export default function ShippingAndDeliveryPage() {
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
          <h1 className="text-center text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">Shipping & Delivery</h1>
        </div>
        <div className="relative bg-white px-4 py-16">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground">
                At Wonder Creative Studio, we provide digital services, and the delivery process for each service is
                outlined below:
              </p>

              <h2 className="text-2xl font-semibold text-[#C4EA00] pt-4">Delivery Process</h2>

              <h3 className="text-xl font-semibold text-[#C4EA00] pt-4">Project Timeline:</h3>
              <p className="text-muted-foreground">
                The project timeline is mutually agreed upon during the proposal phase and will depend on the scope of
                the project.
              </p>

              <h3 className="text-xl font-semibold text-[#C4EA00] pt-4">File Delivery:</h3>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>
                  All deliverables will be shared digitally via secure links, email, or through our client portal on
                  GoHighLevel.
                </li>
                <li>For web and app projects, delivery includes live deployment on your server or hosting platform.</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#C4EA00] pt-4">Revisions:</h3>
              <p className="text-muted-foreground">
                Revisions, if included in the package, will be delivered within 3-5 business days of receiving your
                feedback.
              </p>

              <h3 className="text-xl font-semibold text-[#C4EA00] pt-4">Final Handover:</h3>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Once the project is approved, all files, credentials, and assets will be provided to you.</li>
                <li>Ensure the final files are downloaded within 30 days, as temporary access links may expire.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-[#C4EA00] pt-4">Shipping for Physical Items (If Applicable):</h2>
              <p className="text-muted-foreground">
                For any physical marketing or promotional materials (if part of the project), shipping details, costs,
                and timelines will be shared upon order confirmation.
              </p>

              <h2 className="text-2xl font-semibold text-[#C4EA00] pt-4">Delays in Delivery:</h2>
              <p className="text-muted-foreground">
                We strive to meet deadlines but cannot be held responsible for delays caused by incomplete inputs, late
                approvals, or third-party dependencies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

