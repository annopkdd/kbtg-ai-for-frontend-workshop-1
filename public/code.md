# PayWise Coding Standards & Architecture Guide

> **Developer-First Standards**: Practical guidelines for building maintainable, secure, and scalable React applications.

## 🏗️ Project Architecture

### Folder Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Route-based page components  
├── data/               # Data models and mock services
├── __tests__/          # Test files (co-located with source)
└── assets/             # Static assets (images, icons)
```

**Rules:**
- **Pages** = Route components (Home, Transfer, History)
- **Components** = Reusable UI pieces (Navigation, Buttons)
- **Data** = Business logic, API calls, mock data
- **Tests** = Mirror source structure in `__tests__/`

## 🎨 Code Style Guidelines

### TypeScript Standards

#### Interface & Type Definitions
```typescript
// ✅ Good - Clear, descriptive interfaces
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

// ❌ Bad - Vague, abbreviated names
interface User {
  id: string;
  nm: string;  // What does 'nm' mean?
  tg: string;  // Unclear abbreviation
}
```

#### State Management
```typescript
// ✅ Good - Explicit typing with clear initial values
const [step, setStep] = useState<'recipient' | 'amount' | 'confirm'>('recipient');
const [errors, setErrors] = useState<TransferError[]>([]);
const [isLoading, setIsLoading] = useState(false);

// ❌ Bad - Implicit typing, unclear state
const [step, setStep] = useState('recipient');
const [errors, setErrors] = useState([]);
```

#### Component Props
```typescript
// ✅ Good - Exported interface for reusability
interface NavigationProps {
  variant?: "purple" | "green" | "pink";
}

function Navigation({ variant = "purple" }: NavigationProps) {
  // ...
}

// ❌ Bad - Inline types, no defaults
function Navigation(props: { variant: string }) {
  // ...
}
```

### React Component Patterns

#### Functional Components
```typescript
// ✅ Good - Named function exports
function TransactionDetail() {
  const { id } = useParams();
  // ...business logic...
  return <div>...</div>;
}

export default TransactionDetail;

// ❌ Bad - Anonymous arrow functions
export default () => {
  // Hard to debug, no clear component name
  return <div>...</div>;
};
```

#### Custom Hooks Pattern
```typescript
// ✅ Good - Extract business logic
function useTransactionFilters() {
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    status: 'all',
    dateRange: 'all',
    category: 'all'
  });
  
  const applyFilters = (transactions: Transaction[]) => {
    // ...filtering logic...
  };
  
  return { filters, setFilters, applyFilters };
}
```

#### Conditional Rendering
```typescript
// ✅ Good - Clear, readable conditions
{transaction.status === "completed" ? (
  <SuccessIcon />
) : transaction.status === "pending" ? (
  <PendingIcon />
) : (
  <ErrorIcon />
)}

// ✅ Good - Early returns for complex conditions
if (!transaction) {
  return <div>Transaction not found</div>;
}

// ❌ Bad - Nested ternary operators
{status === "completed" ? <Success /> : status === "pending" ? <Pending /> : status === "failed" ? <Error /> : null}
```

## 🎨 TailwindCSS Design System

### Color Usage
```typescript
// ✅ Good - Use design system colors
className="bg-web-green-600 text-white hover:bg-web-green-700"
className="text-success border-success"
className="bg-error/10 text-error"

// ❌ Bad - Arbitrary colors
className="bg-green-500 text-white"
className="text-red-600"
```

### Component Styling Patterns
```typescript
// ✅ Good - Consistent button patterns
const buttonBaseClass = "font-semibold py-3 px-4 rounded-lg transition-colors";
const primaryButton = `${buttonBaseClass} bg-web-green-600 hover:bg-web-green-700 text-white`;
const secondaryButton = `${buttonBaseClass} bg-neutral-200 hover:bg-neutral-300 text-neutral-700`;

// ✅ Good - Responsive design
className="grid grid-cols-2 md:grid-cols-4 gap-4"
className="text-xl md:text-2xl"
```

### Layout Standards
```typescript
// ✅ Good - Consistent spacing scale
className="p-4 space-y-4"        // Standard padding & spacing
className="mb-6"                 // Consistent margins
className="w-full max-w-md"      // Responsive widths

// ✅ Good - Card pattern
className="bg-white border border-neutral-200 rounded-lg shadow p-4"
```

## 🔐 Security Standards (Financial App)

### Data Handling
```typescript
// ✅ Good - Never log sensitive data
const processPayment = (amount: number, recipientId: string) => {
  console.log('Processing payment...'); // No sensitive data
  // ...payment logic...
};

// ❌ Bad - Logging sensitive information
console.log('Payment details:', { amount, accountNumber, pin });
```

### Input Validation
```typescript
// ✅ Good - Client-side validation with proper types
const validateTransferAmount = (amount: string): TransferError[] => {
  const errors: TransferError[] = [];
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount) || numAmount <= 0) {
    errors.push({ field: 'amount', message: 'กรุณาใส่จำนวนเงินที่ถูกต้อง' });
  }
  
  if (numAmount > 50000) {
    errors.push({ field: 'amount', message: 'จำนวนเงินเกินขั้นสูง' });
  }
  
  return errors;
};

// ❌ Bad - No validation
const amount = userInput; // Direct assignment without checks
```

### Financial Precision
```typescript
// ✅ Good - Use proper decimal handling for money
import { Decimal } from 'decimal.js';

const calculateFee = (amount: number): number => {
  const decimal = new Decimal(amount);
  return decimal.multiply(0.025).toNumber();
};

// ❌ Bad - JavaScript floating point issues
const fee = amount * 0.025; // 0.1 + 0.2 = 0.30000000000000004
```

## 🌐 Internationalization (Thai Support)

### Text Content
```typescript
// ✅ Good - Proper Thai language support
<h1 className="text-xl font-semibold">โอนเงิน</h1>
<p className="text-web-green-100 text-sm">PayWise Transfer</p>

// ✅ Good - Currency formatting
const formatCurrency = (amount: number): string => {
  return `฿${amount.toLocaleString('th-TH')}`;
};

// ✅ Good - Date formatting for Thailand
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
```

## 🧪 Testing Standards

### Component Testing
```typescript
// ✅ Good - Descriptive test names
describe('Transfer Component', () => {
  test('should validate transfer amount limits', () => {
    // Test implementation
  });
  
  test('should prevent negative transfers', () => {
    // Test implementation
  });
  
  test('should handle network failures gracefully', () => {
    // Test implementation
  });
});

// ✅ Good - Consistent mock data
const mockTransaction = {
  id: 'TXN001',
  type: 'outgoing' as const,
  recipient: 'สมชาย ใจดี',
  amount: 500,
  timestamp: new Date('2025-06-19T14:30:00'),
};
```

### Snapshot Testing
```typescript
// ✅ Good - Fixed timestamps for consistent snapshots
beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2025-06-19T10:00:00Z'));
});

afterEach(() => {
  jest.useRealTimers();
});
```

## 📁 File Organization

### Import/Export Patterns
```typescript
// ✅ Good - Named exports for utilities
export const formatCurrency = (amount: number) => `฿${amount.toLocaleString()}`;
export const validateAmount = (amount: string) => { /* ... */ };

// ✅ Good - Default exports for components
function TransactionDetail() { /* ... */ }
export default TransactionDetail;

// ✅ Good - Import organization
import React from 'react';                    // External libraries first
import { Link, useParams } from 'react-router';
import { Transaction } from '../data/transactions'; // Internal imports
```

### Component File Structure
```typescript
// ComponentName.tsx
import statements...

// Interfaces and types
interface ComponentProps {
  // ...
}

// Component implementation
function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Hooks
  const [state, setState] = useState();
  
  // Helper functions
  const handleClick = () => {
    // ...
  };
  
  // Early returns for error states
  if (error) return <ErrorComponent />;
  
  // Main render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}

export default ComponentName;
```

## 🚀 Performance Guidelines

### Component Optimization
```typescript
// ✅ Good - Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return transactions.filter(t => t.amount > 1000).length;
}, [transactions]);

// ✅ Good - Optimize event handlers
const handleTransactionClick = useCallback((transactionId: string) => {
  navigate(`/transaction/${transactionId}`);
}, [navigate]);
```

### Bundle Optimization
```typescript
// ✅ Good - Dynamic imports for large components
const LazyChart = lazy(() => import('./components/Chart'));

// ✅ Good - Tree-shakeable imports
import { formatCurrency } from '../utils/currency';

// ❌ Bad - Import entire libraries
import * as utils from '../utils';
```

## 🛠️ Development Workflow

### Git Commit Messages
```bash
# ✅ Good - Conventional commits
feat: add QR code scanner for transfers
fix: resolve balance display bug on mobile
docs: update README with setup instructions
test: add snapshot tests for all pages
refactor: extract payment validation logic

# ❌ Bad - Unclear messages
fix stuff
update
changes
```

### Branch Naming
```bash
# ✅ Good - Descriptive branch names
feature/add-qr-scanner
bugfix/transaction-display-issue
hotfix/security-patch
refactor/extract-payment-utils

# ❌ Bad - Generic names
fix
update
new-feature
```

### Code Review Checklist
- [ ] **Types**: All TypeScript types are properly defined
- [ ] **Security**: No sensitive data in logs or client-side code
- [ ] **Performance**: No unnecessary re-renders or computations
- [ ] **Accessibility**: Proper ARIA labels and keyboard navigation
- [ ] **Tests**: New features have corresponding tests
- [ ] **Thai Support**: Thai text renders correctly
- [ ] **Responsive**: Works on mobile and desktop
- [ ] **Error Handling**: Graceful error states implemented

## 🎯 Code Quality Metrics

### Complexity Guidelines
- **Functions**: Max 20 lines, single responsibility
- **Components**: Max 200 lines, extract sub-components if larger
- **Files**: Max 300 lines, split into multiple files
- **Nesting**: Max 3 levels of conditional nesting

### Performance Targets
- **Bundle Size**: < 500KB gzipped
- **First Load**: < 3 seconds
- **Test Coverage**: > 80% for critical paths
- **Lighthouse Score**: > 90 for performance

## 📞 Getting Help

### Code Issues
- **ESLint errors**: Check `.eslintrc.js` configuration
- **TypeScript errors**: Run `npm run type-check`
- **Test failures**: Run `npm test -- --verbose`
- **Build issues**: Clear `node_modules` and reinstall

### Best Practices Questions
- **Architecture**: Follow existing patterns in `/pages` and `/components`
- **Styling**: Use design system colors from `index.css`
- **Testing**: Reference existing snapshot tests
- **Security**: Always validate financial inputs

---

**Remember**: Code is read more often than it's written. Prioritize clarity, consistency, and maintainability over cleverness! 🚀

**Last updated**: June 19, 2025  
**Version**: 1.0 (Architecture & Standards Guide)