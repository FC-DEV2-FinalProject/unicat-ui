"use client";
export default function TossPaymentButton() {
  const handlePayment = () => {
    const paymentUrl = "https://api.unicat.day/toss";
    const windowFeatures = "width=680,height=680,top=100,left=100,resizable=yes,scrollbars=yes";
    window.open(paymentUrl, "PaymentWindow", windowFeatures);
  };

  return (
    <button
      onClick={handlePayment}
      className="w-[150px] h-[40px] bg-black rounded-lg text-white hover:bg-purple-2 flex items-center justify-center">
      토스 결제하기
    </button>
  );
}
