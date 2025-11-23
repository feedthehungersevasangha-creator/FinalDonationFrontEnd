import Footer from "./Footer";

export default function ContactPage() {
  return (
    <>
      <div className="min-h-screen bg-[#f5f5f5] py-16 px-4">
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

          <p className="text-lg text-gray-700">
            If you have questions about donations or our programmes, contact us at:
          </p>

          <div className="mt-6 space-y-2 text-gray-800 text-lg">
            <p><strong>Email:</strong> supporter.services@feedthehungersevasangha.org</p>
            <p><strong>Phone:</strong> 8884260100</p>
            <p><strong>Address:</strong> Bangalore, India</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

