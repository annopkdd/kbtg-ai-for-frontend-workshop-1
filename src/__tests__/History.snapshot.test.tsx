import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import History from '../pages/History';

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

describe('History Page Snapshot Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-06-19T10:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('History page loading state should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('History page loaded with transactions should match snapshot', async () => {
    const { container } = render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(container.querySelector('.animate-spin')).not.toBeInTheDocument();
    }, { timeout: 2000 });
    
    expect(container.firstChild).toMatchSnapshot();
  });

  test('History page with filters panel open should match snapshot', async () => {
    const { container } = render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(container.querySelector('.animate-spin')).not.toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Click filter button to open filters panel
    const filterButton = container.querySelector('button[aria-label="Filter"]') ||
                        container.querySelector('svg[viewBox="0 0 24 24"]')?.closest('button');
    
    if (filterButton) {
      (filterButton as HTMLElement).click();
    }
    
    expect(container.firstChild).toMatchSnapshot();
  });

  test('History page with search query should match snapshot', async () => {
    const { container } = render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(container.querySelector('.animate-spin')).not.toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Add search query
    const searchInput = container.querySelector('input[placeholder*="ค้นหา"]');
    if (searchInput) {
      (searchInput as HTMLInputElement).value = 'สมชาย';
    }
    
    expect(container.firstChild).toMatchSnapshot();
  });

  test('History page with no transactions should match snapshot', async () => {
    // Mock empty transactions for this test
    const mockEmpty = jest.fn(() => []);
    jest.doMock('../data/transactions', () => ({
      getAllTransactions: mockEmpty
    }));
    
    const { container } = render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(container.querySelector('.animate-spin')).not.toBeInTheDocument();
    }, { timeout: 2000 });
    
    expect(container.firstChild).toMatchSnapshot();
  });
});