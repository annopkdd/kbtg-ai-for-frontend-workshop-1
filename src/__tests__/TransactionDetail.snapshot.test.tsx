import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import TransactionDetail from '../pages/TransactionDetail';

// Mock the transaction data for consistent snapshots
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
    },
    {
      id: 'TXN003',
      type: 'outgoing',
      recipient: 'ประยุทธ์ มั่นคง',
      payTag: '@prayuth789',
      amount: 2500,
      memo: 'ค่าเช่าบ้าน',
      date: '2 วันที่แล้ว',
      timestamp: new Date('2025-06-17T10:00:00'),
      status: 'pending',
      category: 'bills',
      reference: 'REF001234569'
    }
  ])
}));

// Mock useParams to provide transaction ID
const mockUseParams = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => mockUseParams(),
  Link: ({ children, to, ...props }: any) => <a href={to} {...props}>{children}</a>
}));

describe('TransactionDetail Page Snapshot Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-06-19T10:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('TransactionDetail page with valid outgoing transaction should match snapshot', () => {
    mockUseParams.mockReturnValue({ id: 'TXN001' });
    
    const { container } = render(
      <MemoryRouter>
        <TransactionDetail />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('TransactionDetail page with valid incoming transaction should match snapshot', () => {
    mockUseParams.mockReturnValue({ id: 'TXN002' });
    
    const { container } = render(
      <MemoryRouter>
        <TransactionDetail />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('TransactionDetail page with pending transaction should match snapshot', () => {
    mockUseParams.mockReturnValue({ id: 'TXN003' });
    
    const { container } = render(
      <MemoryRouter>
        <TransactionDetail />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('TransactionDetail page with invalid transaction ID should match snapshot', () => {
    mockUseParams.mockReturnValue({ id: 'INVALID_ID' });
    
    const { container } = render(
      <MemoryRouter>
        <TransactionDetail />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('TransactionDetail page with receipt shown should match snapshot', () => {
    mockUseParams.mockReturnValue({ id: 'TXN001' });
    
    const { container } = render(
      <MemoryRouter>
        <TransactionDetail />
      </MemoryRouter>
    );
    
    // Click show receipt button
    const receiptButton = container.querySelector('button[type="button"]');
    if (receiptButton && receiptButton.textContent?.includes('แสดงใบเสร็จ')) {
      (receiptButton as HTMLElement).click();
    }
    
    expect(container.firstChild).toMatchSnapshot();
  });
});