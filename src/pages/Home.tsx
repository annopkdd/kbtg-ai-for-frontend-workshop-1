"use client";

import { useState } from "react";
import { Link } from "react-router";

export default function Home() {
  const [showBalance, setShowBalance] = useState(true);

  const recentTransactions = [
    {
      id: "TXN001",
      type: "outgoing",
      recipient: "สมชาย ใจดี",
      payTag: "@somchai123",
      amount: 500,
      memo: "ค่าอาหารเที่ยง",
      date: "วันนี้ 14:30",
      status: "completed",
    },
    {
      id: "TXN002",
      type: "incoming",
      sender: "นิดา สวยงาม",
      payTag: "@nida456",
      amount: 1200,
      memo: "คืนเงินค่าหนัง",
      date: "เมื่อวาน 19:45",
      status: "completed",
    },
    {
      id: "TXN003",
      type: "outgoing",
      recipient: "ประยุทธ์ มั่นคง",
      payTag: "@prayuth789",
      amount: 2500,
      memo: "ค่าเช่าบ้าน",
      date: "2 วันที่แล้ว",
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-web-green-600 to-web-green-500 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
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
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-semibold">สวัสดี, คุณสมศักดิ์</h1>
              <p className="text-web-green-100 text-sm">
                ยินดีต้อนรับสู่ PayWise
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
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
                  d="M15 17h5l-5-5 5-5h-5m-6 0H4l5 5-5 5h5"
                />
              </svg>
            </button>
            <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white/10 border border-white/20 text-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-web-green-100 text-sm">ยอดเงินคงเหลือ</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold">
                  {showBalance ? "฿25,847.50" : "฿••••••"}
                </p>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-1 text-white hover:bg-white/20 rounded transition-colors"
                >
                  {showBalance ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-web-green-100 text-sm">บัญชีออมทรัพย์</p>
              <p className="text-sm">XXX-X-X1234-X</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Link to="/transfer">
            <div className="bg-white border-2 border-neutral-200 hover:border-web-green-200 hover:shadow-md transition-all cursor-pointer rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-web-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-6 h-6 text-web-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900">โอนเงิน</h3>
              <p className="text-sm text-neutral-600">PayWise Transfer</p>
            </div>
          </Link>

          <Link to="/history">
            <div className="bg-white border-2 border-neutral-200 hover:border-success hover:shadow-md transition-all cursor-pointer rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-6 h-6 text-success"
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
              </div>
              <h3 className="font-semibold text-neutral-900">ประวัติ</h3>
              <p className="text-sm text-neutral-600">รายการทำธุรกรรม</p>
            </div>
          </Link>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white border border-neutral-200 rounded-lg shadow">
          <div className="p-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-900">
                รายการล่าสุด
              </h2>
              <Link to="/history">
                <button className="text-web-green-600 hover:text-web-green-700 text-sm font-medium">
                  ดูทั้งหมด
                </button>
              </Link>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {recentTransactions.map((transaction) => (
              <Link key={transaction.id} to={`/transaction/${transaction.id}`}>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "outgoing"
                          ? "bg-error/10"
                          : "bg-success/10"
                      }`}
                    >
                      {transaction.type === "outgoing" ? (
                        <svg
                          className="w-5 h-5 text-error"
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
                          className="w-5 h-5 text-success"
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
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">
                        {transaction.type === "outgoing"
                          ? transaction.recipient
                          : transaction.sender}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {transaction.type === "outgoing"
                          ? transaction.payTag
                          : transaction.payTag}
                      </p>
                      {transaction.memo && (
                        <p className="text-xs text-neutral-500">
                          {transaction.memo}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.type === "outgoing"
                          ? "text-error"
                          : "text-success"
                      }`}
                    >
                      {transaction.type === "outgoing" ? "-" : "+"}฿
                      {transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {transaction.date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
