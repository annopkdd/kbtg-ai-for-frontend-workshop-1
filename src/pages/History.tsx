import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Transaction, getAllTransactions } from "../data/transactions";

interface FilterState {
  type: 'all' | 'incoming' | 'outgoing';
  status: 'all' | 'completed' | 'pending' | 'failed';
  dateRange: 'all' | 'today' | 'week' | 'month' | 'custom';
  category: 'all' | 'food' | 'transport' | 'shopping' | 'bills' | 'entertainment' | 'other';
}

function History() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    status: 'all',
    dateRange: 'all',
    category: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    // Simulate API call
    const loadTransactions = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate random error
        if (Math.random() < 0.1) {
          throw new Error('ไม่สามารถโหลดประวัติการทำธุรกรรมได้');
        }

        setTransactions(getAllTransactions());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filtered = transactions;

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    // Date range filter
    const now = new Date();
    switch (filters.dateRange) {
      case 'today':
        filtered = filtered.filter(t => 
          t.timestamp.toDateString() === now.toDateString()
        );
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(t => t.timestamp >= weekAgo);
        break;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(t => t.timestamp >= monthAgo);
        break;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.recipient?.toLowerCase().includes(query) ||
        t.sender?.toLowerCase().includes(query) ||
        t.payTag.toLowerCase().includes(query) ||
        t.memo?.toLowerCase().includes(query) ||
        t.reference?.toLowerCase().includes(query)
      );
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    setFilteredTransactions(filtered);
  }, [transactions, filters, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-neutral-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'สำเร็จ';
      case 'pending': return 'รอดำเนินการ';
      case 'failed': return 'ล้มเหลว';
      default: return 'ไม่ทราบสถานะ';
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'food':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21" />
          </svg>
        );
      case 'transport':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
        );
      case 'shopping':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        );
      case 'bills':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'entertainment':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a2 2 0 002 2h2a2 2 0 002-2v-4M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        );
    }
  };

  const ErrorMessage = () => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-red-700">{error}</span>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          ลองใหม่
        </button>
      </div>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <svg className="animate-spin h-8 w-8 text-web-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-web-green-600 to-web-green-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/home" className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">ประวัติการทำธุรกรรม</h1>
              <p className="text-web-green-100 text-sm">
                {filteredTransactions.length} รายการ
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาตามชื่อ, PayTag, หรือหมายเหตุ..."
              className="w-full px-4 py-3 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <svg className="absolute left-3 top-3.5 w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-neutral-200 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">ประเภท</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value as any})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-web-green-500 focus:border-transparent"
              >
                <option value="all">ทั้งหมด</option>
                <option value="incoming">รับเงิน</option>
                <option value="outgoing">จ่ายเงิน</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">สถานะ</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value as any})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-web-green-500 focus:border-transparent"
              >
                <option value="all">ทั้งหมด</option>
                <option value="completed">สำเร็จ</option>
                <option value="pending">รอดำเนินการ</option>
                <option value="failed">ล้มเหลว</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">ช่วงเวลา</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value as any})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-web-green-500 focus:border-transparent"
              >
                <option value="all">ทั้งหมด</option>
                <option value="today">วันนี้</option>
                <option value="week">7 วันที่แล้ว</option>
                <option value="month">30 วันที่แล้ว</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">หมวดหมู่</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value as any})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-web-green-500 focus:border-transparent"
              >
                <option value="all">ทั้งหมด</option>
                <option value="food">อาหาร</option>
                <option value="transport">การเดินทาง</option>
                <option value="shopping">ช้อปปิ้ง</option>
                <option value="bills">ค่าใช้จ่าย</option>
                <option value="entertainment">บันเทิง</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setFilters({
                type: 'all',
                status: 'all',
                dateRange: 'all',
                category: 'all'
              })}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              ล้างตัวกรอง
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {error && <ErrorMessage />}
        
        {isLoading ? (
          <LoadingSpinner />
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">ไม่พบรายการธุรกรรม</h3>
            <p className="text-neutral-600">ลองเปลี่ยนตัวกรองหรือค้นหาด้วยคำอื่น</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-neutral-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">เงินเข้า</p>
                    <p className="text-xl font-bold text-green-600">
                      ฿{filteredTransactions
                        .filter(t => t.type === 'incoming' && t.status === 'completed')
                        .reduce((sum, t) => sum + t.amount, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">เงินออก</p>
                    <p className="text-xl font-bold text-red-600">
                      ฿{filteredTransactions
                        .filter(t => t.type === 'outgoing' && t.status === 'completed')
                        .reduce((sum, t) => sum + t.amount, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction List */}
            <div className="bg-white border border-neutral-200 rounded-lg shadow">
              <div className="divide-y divide-neutral-200">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    onClick={() => setSelectedTransaction(transaction)}
                    className="p-4 hover:bg-neutral-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.type === 'outgoing' ? 'bg-red-100' : 'bg-green-100'
                        }`}>
                          {transaction.type === 'outgoing' ? (
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-neutral-900 truncate">
                              {transaction.type === 'outgoing' ? transaction.recipient : transaction.sender}
                            </p>
                            {transaction.category && (
                              <div className="text-neutral-400">
                                {getCategoryIcon(transaction.category)}
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-neutral-600 truncate">{transaction.payTag}</p>
                          {transaction.memo && (
                            <p className="text-xs text-neutral-500 truncate">{transaction.memo}</p>
                          )}
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`text-xs font-medium ${getStatusColor(transaction.status)}`}>
                              {getStatusText(transaction.status)}
                            </span>
                            <span className="text-xs text-neutral-400">•</span>
                            <span className="text-xs text-neutral-500">{transaction.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${
                          transaction.type === 'outgoing' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {transaction.type === 'outgoing' ? '-' : '+'}฿{transaction.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4 md:items-center">
          <div className="bg-white rounded-t-xl md:rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">รายละเอียดธุรกรรม</h3>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-center pb-4 border-b border-neutral-200">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    selectedTransaction.type === 'outgoing' ? 'bg-red-100' : 'bg-green-100'
                  }`}>
                    {selectedTransaction.type === 'outgoing' ? (
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                      </svg>
                    )}
                  </div>
                  <p className={`text-3xl font-bold ${
                    selectedTransaction.type === 'outgoing' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {selectedTransaction.type === 'outgoing' ? '-' : '+'}฿{selectedTransaction.amount.toLocaleString()}
                  </p>
                  <p className={`text-sm font-medium ${getStatusColor(selectedTransaction.status)}`}>
                    {getStatusText(selectedTransaction.status)}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">
                      {selectedTransaction.type === 'outgoing' ? 'ผู้รับ' : 'ผู้ส่ง'}
                    </span>
                    <span className="font-medium">
                      {selectedTransaction.type === 'outgoing' ? selectedTransaction.recipient : selectedTransaction.sender}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-600">PayTag</span>
                    <span className="font-medium">{selectedTransaction.payTag}</span>
                  </div>

                  {selectedTransaction.memo && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">หมายเหตุ</span>
                      <span className="font-medium">{selectedTransaction.memo}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-neutral-600">เวลา</span>
                    <span className="font-medium">{selectedTransaction.date}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-600">หมายเลขอ้างอิง</span>
                    <span className="font-mono text-sm">{selectedTransaction.reference}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium py-3 px-4 rounded-lg transition-colors">
                      แชร์
                    </button>
                    <Link
                      to={`/transaction/${selectedTransaction.id}`}
                      className="bg-web-green-600 hover:bg-web-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
                    >
                      ดูรายละเอียด
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;