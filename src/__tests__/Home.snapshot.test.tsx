import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Home from '../pages/Home';

// Mock the transaction data for consistent snapshots
jest.mock('../data/transactions', () => ({
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
      status: 'completed',
      category: 'bills',
      reference: 'REF001234569'
    }
  ])
}));

describe('Home Page Snapshot Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-06-19T10:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('Home page with balance visible should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Home page with balance hidden should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    // Click the eye button to hide balance
    const eyeButton = container.querySelector('button[aria-label="Toggle balance visibility"]') ||
                     container.querySelector('svg')?.closest('button');
    
    if (eyeButton) {
      (eyeButton as HTMLElement).click();
    }
    
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Home page with recent transactions should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    expect(container.firstChild).toMatchSnapshot();
  });
});