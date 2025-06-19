import { useState, useEffect } from "react";
import { Link } from "react-router";

interface Contact {
  id: string;
  name: string;
  payTag: string;
  avatar?: string;
  isFrequent?: boolean;
}

interface TransferError {
  field: string;
  message: string;
}

function Transfer() {
  const [step, setStep] = useState<'recipient' | 'amount' | 'confirm'>('recipient');
  const [recipient, setRecipient] = useState<Contact | null>(null);
  const [payTag, setPayTag] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<TransferError[]>([]);
  const [showQRScanner, setShowQRScanner] = useState(false);

  const recentContacts: Contact[] = [
    { id: '1', name: 'สมชาย ใจดี', payTag: '@somchai123', isFrequent: true },
    { id: '2', name: 'นิดา สวยงาม', payTag: '@nida456', isFrequent: true },
    { id: '3', name: 'ประยุทธ์ มั่นคง', payTag: '@prayuth789' },
    { id: '4', name: 'มาลี ใจงาม', payTag: '@malee999' },
  ];

  const quickAmounts = [100, 500, 1000, 2000, 5000];

  useEffect(() => {
    setErrors([]);
  }, [step]);

  const validatePayTag = (tag: string): boolean => {
    const payTagRegex = /^@[a-zA-Z0-9_]{3,20}$/;
    return payTagRegex.test(tag);
  };

  const validateAmount = (amt: string): boolean => {
    const numAmount = parseFloat(amt);
    return numAmount > 0 && numAmount <= 50000 && !isNaN(numAmount);
  };

  const handleRecipientSubmit = () => {
    const newErrors: TransferError[] = [];

    if (!recipient && !payTag) {
      newErrors.push({ field: 'recipient', message: 'กรุณาเลือกผู้รับหรือใส่ PayTag' });
    }

    if (payTag && !validatePayTag(payTag)) {
      newErrors.push({ field: 'payTag', message: 'PayTag ต้องขึ้นต้นด้วย @ และมีความยาว 4-21 ตัวอักษร' });
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep('amount');
  };

  const handleAmountSubmit = () => {
    const newErrors: TransferError[] = [];

    if (!amount) {
      newErrors.push({ field: 'amount', message: 'กรุณาใส่จำนวนเงิน' });
    } else if (!validateAmount(amount)) {
      newErrors.push({ field: 'amount', message: 'จำนวนเงินต้องมากกว่า 0 และไม่เกิน 50,000 บาท' });
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setStep('confirm');
  };

  const handleTransfer = async () => {
    const newErrors: TransferError[] = [];

    if (!pin || pin.length !== 6) {
      newErrors.push({ field: 'pin', message: 'กรุณาใส่ PIN 6 หลัก' });
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random error for demo
      if (Math.random() < 0.2) {
        throw new Error('ยอดเงินในบัญชีไม่เพียงพอ');
      }

      // Success - redirect to success page or show success message
      alert('โอนเงินสำเร็จ!');
      // Reset form
      setStep('recipient');
      setRecipient(null);
      setPayTag('');
      setAmount('');
      setMemo('');
      setPin('');
    } catch (error) {
      setErrors([{ field: 'transfer', message: error instanceof Error ? error.message : 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const ErrorAlert = ({ error }: { error: TransferError }) => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
      <div className="flex items-center">
        <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="text-red-700 text-sm">{error.message}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-web-green-600 to-web-green-500 text-white p-4">
        <div className="flex items-center space-x-3">
          <Link to="/home" className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl font-semibold">โอนเงิน</h1>
            <p className="text-web-green-100 text-sm">PayWise Transfer</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 flex items-center justify-center space-x-4">
          {['recipient', 'amount', 'confirm'].map((stepName, index) => (
            <div key={stepName} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === stepName ? 'bg-white text-web-green-600' : 
                ['recipient', 'amount', 'confirm'].indexOf(step) > index ? 'bg-web-green-400 text-white' : 
                'bg-web-green-700 text-web-green-200'
              }`}>
                {index + 1}
              </div>
              {index < 2 && (
                <div className={`w-8 h-0.5 mx-2 ${
                  ['recipient', 'amount', 'confirm'].indexOf(step) > index ? 'bg-web-green-400' : 'bg-web-green-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Error Display */}
        {errors.map((error, index) => (
          <ErrorAlert key={index} error={error} />
        ))}

        {/* Step 1: Select Recipient */}
        {step === 'recipient' && (
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg shadow">
              <div className="p-4 border-b border-neutral-200">
                <h2 className="text-lg font-semibold text-neutral-900">เลือกผู้รับ</h2>
              </div>
              
              {/* PayTag Input */}
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    PayTag หรือเบอร์โทร
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={payTag}
                      onChange={(e) => setPayTag(e.target.value)}
                      placeholder="@username หรือ 0812345678"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-web-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => setShowQRScanner(true)}
                      className="absolute right-2 top-2 p-2 text-neutral-500 hover:text-web-green-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Recent Contacts */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-700 mb-3">ผู้รับล่าสุด</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {recentContacts.map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => {
                          setRecipient(contact);
                          setPayTag(contact.payTag);
                        }}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          recipient?.id === contact.id
                            ? 'border-web-green-500 bg-web-green-50'
                            : 'border-neutral-200 hover:border-web-green-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {contact.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-neutral-900 truncate">{contact.name}</p>
                            <p className="text-sm text-neutral-600 truncate">{contact.payTag}</p>
                          </div>
                          {contact.isFrequent && (
                            <div className="w-2 h-2 bg-web-green-500 rounded-full" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleRecipientSubmit}
                  className="w-full bg-web-green-600 hover:bg-web-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  ถัดไป
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Enter Amount */}
        {step === 'amount' && (
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg shadow">
              <div className="p-4 border-b border-neutral-200">
                <h2 className="text-lg font-semibold text-neutral-900">จำนวนเงิน</h2>
                <p className="text-sm text-neutral-600">
                  โอนไปยัง {recipient?.name || payTag}
                </p>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    จำนวนเงิน (บาท)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-neutral-500">฿</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 text-2xl border border-neutral-300 rounded-lg focus:ring-2 focus:ring-web-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div>
                  <h3 className="text-sm font-medium text-neutral-700 mb-3">จำนวนที่ใช้บ่อย</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {quickAmounts.map((quickAmount) => (
                      <button
                        key={quickAmount}
                        onClick={() => setAmount(quickAmount.toString())}
                        className="py-2 px-3 border border-neutral-300 rounded-lg hover:border-web-green-500 hover:bg-web-green-50 transition-colors text-sm"
                      >
                        ฿{quickAmount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Memo */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    หมายเหตุ (ไม่บังคับ)
                  </label>
                  <input
                    type="text"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="เช่น ค่าอาหาร, คืนเงิน"
                    maxLength={50}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-web-green-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setStep('recipient')}
                    className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    ย้อนกลับ
                  </button>
                  <button
                    onClick={handleAmountSubmit}
                    className="flex-1 bg-web-green-600 hover:bg-web-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    ถัดไป
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirm Transfer */}
        {step === 'confirm' && (
          <div className="space-y-4">
            <div className="bg-white border border-neutral-200 rounded-lg shadow">
              <div className="p-4 border-b border-neutral-200">
                <h2 className="text-lg font-semibold text-neutral-900">ยืนยันการโอน</h2>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Transfer Summary */}
                <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">ผู้รับ</span>
                    <span className="font-medium">{recipient?.name || payTag}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">จำนวนเงิน</span>
                    <span className="font-bold text-xl">฿{parseFloat(amount).toLocaleString()}</span>
                  </div>
                  {memo && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">หมายเหตุ</span>
                      <span className="font-medium">{memo}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-600">ค่าธรรมเนียม</span>
                    <span className="font-medium text-green-600">ฟรี</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-neutral-600">รวมทั้งสิ้น</span>
                    <span className="font-bold text-xl">฿{parseFloat(amount).toLocaleString()}</span>
                  </div>
                </div>

                {/* PIN Input */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    ใส่ PIN เพื่อยืนยัน
                  </label>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="••••••"
                    maxLength={6}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-web-green-500 focus:border-transparent text-center text-2xl tracking-widest"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setStep('amount')}
                    className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-semibold py-3 px-4 rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    ย้อนกลับ
                  </button>
                  <button
                    onClick={handleTransfer}
                    disabled={isLoading}
                    className="flex-1 bg-web-green-600 hover:bg-web-green-700 disabled:bg-neutral-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        กำลังโอน...
                      </>
                    ) : (
                      'ยืนยันการโอน'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">สแกน QR Code</h3>
              <p className="text-sm text-neutral-600">วางกล้องให้อยู่เหนือ QR Code</p>
            </div>
            <div className="bg-neutral-100 aspect-square rounded-lg flex items-center justify-center mb-4">
              <svg className="w-24 h-24 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <button
              onClick={() => setShowQRScanner(false)}
              className="w-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transfer;