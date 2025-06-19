export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  recipient?: string;
  sender?: string;
  payTag: string;
  amount: number;
  memo?: string;
  date: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  category?: string;
  reference?: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    type: 'outgoing',
    recipient: 'สมชาย ใจดี',
    payTag: '@somchai123',
    amount: 500,
    memo: 'ค่าอาหารเที่ยง',
    date: 'วันนี้ 14:30',
    timestamp: new Date(2025, 5, 19, 14, 30),
    status: 'completed',
    category: 'food',
    reference: 'REF001234567'
  },
  {
    id: 'TXN002',
    type: 'incoming',
    sender: 'นิดา สวยงาม',
    payTag: '@nida456',
    amount: 1200,
    memo: 'คืนเงินค่าหนัง',
    date: 'เมื่อวาน 19:45',
    timestamp: new Date(2025, 5, 18, 19, 45),
    status: 'completed',
    category: 'entertainment',
    reference: 'REF001234568'
  },
  {
    id: 'TXN003',
    type: 'outgoing',
    recipient: 'ประยุทธ์ มั่นคง',
    payTag: '@prayuth789',
    amount: 2500,
    memo: 'ค่าเช่าบ้าน',
    date: '2 วันที่แล้ว',
    timestamp: new Date(2025, 5, 17, 10, 0),
    status: 'completed',
    category: 'bills',
    reference: 'REF001234569'
  },
  {
    id: 'TXN004',
    type: 'outgoing',
    recipient: 'มาลี ใจงาม',
    payTag: '@malee999',
    amount: 850,
    memo: 'ค่าแท็กซี่',
    date: '3 วันที่แล้ว',
    timestamp: new Date(2025, 5, 16, 8, 15),
    status: 'completed',
    category: 'transport',
    reference: 'REF001234570'
  },
  {
    id: 'TXN005',
    type: 'incoming',
    sender: 'บริษัท ABC จำกัด',
    payTag: '@abc_company',
    amount: 25000,
    memo: 'เงินเดือนเดือนมิถุนายน',
    date: '1 สัปดาห์ที่แล้ว',
    timestamp: new Date(2025, 5, 12, 9, 0),
    status: 'completed',
    category: 'other',
    reference: 'REF001234571'
  },
  {
    id: 'TXN006',
    type: 'outgoing',
    recipient: 'ร้านกาแฟดี',
    payTag: '@coffee_dee',
    amount: 120,
    memo: 'กาแฟเอสเปรสโซ',
    date: '1 สัปดาห์ที่แล้ว',
    timestamp: new Date(2025, 5, 12, 7, 30),
    status: 'failed',
    category: 'food',
    reference: 'REF001234572'
  },
  {
    id: 'TXN007',
    type: 'outgoing',
    recipient: 'โลตัส',
    payTag: '@lotus_store',
    amount: 1580,
    memo: 'ซื้อของใช้ในบ้าน',
    date: '2 สัปดาห์ที่แล้ว',
    timestamp: new Date(2025, 5, 5, 16, 20),
    status: 'completed',
    category: 'shopping',
    reference: 'REF001234573'
  },
  {
    id: 'TXN008',
    type: 'outgoing',
    recipient: 'Netflix',
    payTag: '@netflix_th',
    amount: 349,
    memo: 'ค่าสมาชิก Netflix',
    date: '3 สัปดาห์ที่แล้ว',
    timestamp: new Date(2025, 4, 29, 12, 0),
    status: 'pending',
    category: 'entertainment',
    reference: 'REF001234574'
  }
];

// Get recent transactions (latest 3)
export const getRecentTransactions = (): Transaction[] => {
  return mockTransactions
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 3);
};

// Get all transactions
export const getAllTransactions = (): Transaction[] => {
  return mockTransactions;
};