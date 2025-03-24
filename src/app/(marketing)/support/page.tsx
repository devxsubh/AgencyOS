import SupportForm from "@/components/forms/SupportForm";

const GeneralPage: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 bg-white sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 mb-8">
          Need <span className="text-[#C4EA00]">Support</span> 
        </h1>
        <div>
        <SupportForm />
        </div>
      </div>
    </main>
  );
};

export default GeneralPage;
