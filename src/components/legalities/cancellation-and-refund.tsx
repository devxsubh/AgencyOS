export default function CancellationAndRefundPage() {
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
          <h1 className="text-center text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Cancellation & Refund
          </h1>
        </div>
        <div className="relative bg-white px-4 py-16">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground">
                At Wonder Creative Studio, we are committed to providing high-quality services. We understand there may
                be situations where cancellations or refunds are necessary. Please review our policy below for details:
              </p>

              <h2 className="text-2xl font-semibold text-[#C4EA00] pt-4">Cancellation Policy</h2>

              <h3 className="text-xl font-semibold text-[#C4EA00] pt-4">Before Project Commencement:</h3>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>You may cancel the project within 48 hours of placing the order for a full refund.</li>
                <li>After 48 hours, a 20% service fee will be deducted from the total project cost.</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#C4EA00] pt-4">After Project Commencement:</h3>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>If the project has started, no refunds will be provided for the completed milestones or phases.</li>
                <li>
                  For cancellations during ongoing phases, you will be billed for the work completed up to the
                  cancellation date.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-[#C4EA00] pt-4">Recurring Services:</h3>
              <p className="text-muted-foreground">
                Cancellation of subscriptions or recurring services (e.g., maintenance, digital marketing) must be
                requested in writing 30 days prior to the next billing cycle.
              </p>

              <h2 className="text-2xl font-semibold text-[#C4EA00] pt-4">Refund Policy</h2>

              <h3 className="text-xl font-semibold text-[#C4EA00] pt-4">Eligibility for Refunds:</h3>
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Refunds are only applicable for projects canceled before the commencement phase.</li>
                <li>
                  Refunds will not be provided for services already delivered, including consultation or strategy
                  sessions.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-[#C4EA00] pt-4">Refund Process:</h3>
              <p className="text-muted-foreground">
                Approved refunds will be processed within 7-10 business days via the original payment method.
              </p>

              <h3 className="text-xl font-semibold text-[#C4EA00] pt-4">Non-Refundable Items:</h3>
              <p className="text-muted-foreground">
                Customized solutions, third-party costs (e.g., domain, hosting), and expedited services are
                non-refundable.
              </p>

              <h2 className="text-2xl font-semibold text-[#C4EA00] pt-4">Contact Us for Cancellations or Refunds:</h2>
              <p className="text-muted-foreground">
                Email us at{" "}
                <a href="mailto:support@wondercreativestudios.com" className="text-primary text-[#c4e] hover:underline">
                  support@wondercreativestudios.com
                </a>{" "}
                with your project details and request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

