export default function WhatsAppButton() {
  return (
    <button
      onClick={() => alert("Opening WhatsApp chat...")}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl shadow-lg transition hover:scale-110"
    >
      💬
    </button>
  );
}