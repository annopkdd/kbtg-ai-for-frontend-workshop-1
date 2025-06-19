import { Link, useParams } from "react-router";
import { useState } from "react";
import { Transaction, getAllTransactions } from "../data/transactions";

// Get transaction by ID from shared data source
const getTransactionById = (id: string): Transaction | null => {
  const transactions = getAllTransactions();
  return transactions.find((t) => t.id === id) || null;
};

export default function TransactionDetail() {
  const { id } = useParams<{ id: string }>();
  const transaction = id ? getTransactionById(id) : null;
  const [showReceipt, setShowReceipt] = useState(false);

  if (!transaction) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            ไม่พบรายการธุรกรรม
          </h1>
          <Link
            to="/home"
            className="bg-web-green-500 hover:bg-web-green-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  const isOutgoing = transaction.type === "outgoing";
  const displayName = isOutgoing ? transaction.recipient : transaction.sender;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-web-green-600 to-web-green-500 text-white p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Link
            to="/home"
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="text-xl font-semibold">รายละเอียดธุรกรรม</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Transaction Status */}
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="text-center mb-6">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                transaction.status === "completed"
                  ? isOutgoing
                    ? "bg-error/10"
                    : "bg-success/10"
                  : transaction.status === "pending"
                  ? "bg-warning/10"
                  : "bg-error/10"
              }`}
            >
              {transaction.status === "completed" ? (
                isOutgoing ? (
                  <svg
                    className="w-8 h-8 text-error"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 11l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-8 h-8 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 13l-5 5m0 0l-5-5m5 5V6"
                    />
                  </svg>
                )
              ) : transaction.status === "pending" ? (
                <svg
                  className="w-8 h-8 text-warning"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-error"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>

            <p
              className={`text-3xl font-bold mb-2 ${
                isOutgoing ? "text-error" : "text-success"
              }`}
            >
              {isOutgoing ? "-" : "+"}฿{transaction.amount.toLocaleString()}
            </p>

            <p className="text-lg font-medium text-neutral-900 mb-1">
              {isOutgoing ? "โอนเงินให้" : "รับเงินจาก"} {displayName}
            </p>
            <p className="text-sm text-neutral-600">{transaction.payTag}</p>

            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-3 ${
                transaction.status === "completed"
                  ? "bg-success/10 text-success"
                  : transaction.status === "pending"
                  ? "bg-warning/10 text-warning"
                  : "bg-error/10 text-error"
              }`}
            >
              {transaction.status === "completed"
                ? "สำเร็จ"
                : transaction.status === "pending"
                ? "รอดำเนินการ"
                : "ไม่สำเร็จ"}
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            รายละเอียด
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-neutral-600">หมายเลขอ้างอิง</span>
              <span className="text-neutral-900 font-medium">
                {transaction.reference}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-600">วันที่และเวลา</span>
              <span className="text-neutral-900 font-medium">
                {transaction.timestamp.toLocaleString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </span>
            </div>

            {transaction.memo && (
              <div className="flex justify-between">
                <span className="text-neutral-600">บันทึก</span>
                <span className="text-neutral-900 font-medium">
                  {transaction.memo}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-neutral-600">จำนวนเงิน</span>
              <span className="text-neutral-900 font-medium">
                ฿{transaction.amount.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-600">ค่าธรรมเนียม</span>
              <span className="font-medium text-green-600">
                ฟรี
              </span>
            </div>

            {transaction.category && (
              <div className="flex justify-between">
                <span className="text-neutral-600">หมวดหมู่</span>
                <span className="text-neutral-900 font-medium">
                  {transaction.category === 'food' ? 'อาหาร' :
                   transaction.category === 'transport' ? 'การเดินทาง' :
                   transaction.category === 'shopping' ? 'ช้อปปิ้ง' :
                   transaction.category === 'bills' ? 'ค่าใช้จ่าย' :
                   transaction.category === 'entertainment' ? 'บันเทิง' :
                   'อื่นๆ'}
                </span>
              </div>
            )}

            <div className="border-t border-neutral-200 pt-4">
              <div className="flex justify-between">
                <span className="text-neutral-600">บัญชีปลายทาง</span>
                <div className="text-right">
                  <p className="text-neutral-900 font-medium">
                    {transaction.payTag}
                  </p>
                  <p className="text-sm text-neutral-600">
                    PayWise Account
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setShowReceipt(!showReceipt)}
            className="w-full bg-web-green-500 hover:bg-web-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            {showReceipt ? "ซ่อนใบเสร็จ" : "แสดงใบเสร็จ"}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white border border-neutral-200 hover:border-web-green-200 text-neutral-700 py-3 px-4 rounded-lg font-medium transition-colors">
              แชร์
            </button>
            <button className="bg-white border border-neutral-200 hover:border-web-green-200 text-neutral-700 py-3 px-4 rounded-lg font-medium transition-colors">
              ดาวน์โหลด
            </button>
          </div>

          {isOutgoing && (
            <button className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-3 px-4 rounded-lg font-medium transition-colors">
              โอนซ้ำ
            </button>
          )}
        </div>

        {/* Receipt (conditionally shown) */}
        {showReceipt && (
          <div className="bg-white rounded-lg p-6 shadow border-2 border-dashed border-neutral-300">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                ใบเสร็จการโอนเงิน
              </h3>
              <p className="text-sm text-neutral-600">
                PayWise Transfer Receipt
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Transaction ID:</span>
                <span className="font-mono">{transaction.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Reference ID:</span>
                <span className="font-mono">{transaction.reference}</span>
              </div>
              <div className="flex justify-between">
                <span>{isOutgoing ? "ผู้รับ:" : "ผู้ส่ง:"}</span>
                <span>{displayName}</span>
              </div>
              <div className="flex justify-between">
                <span>PayTag:</span>
                <span>{transaction.payTag}</span>
              </div>
              <div className="flex justify-between">
                <span>จำนวนเงิน:</span>
                <span className="font-semibold">
                  ฿{transaction.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>วันที่:</span>
                <span>{transaction.date}</span>
              </div>
              <div className="border-t border-neutral-200 pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>สถานะ:</span>
                  <span className={
                    transaction.status === "completed" ? "text-success" :
                    transaction.status === "pending" ? "text-warning" :
                    "text-error"
                  }>
                    {transaction.status === "completed" ? "สำเร็จ" :
                     transaction.status === "pending" ? "รอดำเนินการ" :
                     "ไม่สำเร็จ"}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center mt-6 pt-4 border-t border-neutral-200">
              <p className="text-xs text-neutral-500">
                ใบเสร็จนี้ออกโดยระบบอัตโนมัติ
                <br />
                PayWise - Secure Digital Payment
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
