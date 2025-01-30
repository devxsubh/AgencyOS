import LeadConnectorForm from "@/components/forms/LeadConnectorForm"
export default function Form() {
  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 bg-white sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 mb-8">
          Let's <span className="text-[#C4EA00]">Grow</span> Your Business
        </h1>
        <div className="mb-8">
        <LeadConnectorForm />
        </div>
      </div>
    </main>
  )
}

