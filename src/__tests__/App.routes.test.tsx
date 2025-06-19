import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import Root from '../pages/Root';
import Home from '../pages/Home';
import TransactionDetail from '../pages/TransactionDetail';
import Transfer from '../pages/Transfer';
import History from '../pages/History';

// Mock the transaction data to ensure consistent snapshots
jest.mock('../data/transactions', () => ({
  getAllTransactions: jest.fn(() => [
    {
      id: 'TXN001',
      type: 'outgoing',
      recipient: 'สมชาย ใจดี',
      payTag: '@somchai123',
      amount: 500,
      memo: 'ค่าอาหารเที่ยง',
      date: 'วันนี้ 14:30',
      timestamp: new Date('2025-06-19T14:30:00'),
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
      timestamp: new Date('2025-06-18T19:45:00'),
      status: 'completed',
      category: 'entertainment',
      reference: 'REF001234568'
    }
  ]),
  getRecentTransactions: jest.fn(() => [
    {
      id: 'TXN001',
      type: 'outgoing',
      recipient: 'สมชาย ใจดี',
      payTag: '@somchai123',
      amount: 500,
      memo: 'ค่าอาหารเที่ยง',
      date: 'วันนี้ 14:30',
      timestamp: new Date('2025-06-19T14:30:00'),
      status: 'completed',
      category: 'food',
      reference: 'REF001234567'
    }
  ])
}));

describe('App Routes Snapshot Tests', () => {
  beforeEach(() => {
    // Mock Date.now to ensure consistent timestamps in snapshots
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-06-19T10:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('Root page (/) should match snapshot', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Root />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Home page (/home) should match snapshot', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Transfer page (/transfer) should match snapshot', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/transfer']}>
        <Routes>
          <Route path="/transfer" element={<Transfer />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('History page (/history) should match snapshot', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/history']}>
        <Routes>
          <Route path="/history" element={<History />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Transaction Detail page (/transaction/TXN001) should match snapshot', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/transaction/TXN001']}>
        <Routes>
          <Route path="/transaction/:id" element={<TransactionDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Transaction Detail page with invalid ID should match snapshot', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/transaction/INVALID_ID']}>
        <Routes>
          <Route path="/transaction/:id" element={<TransactionDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});