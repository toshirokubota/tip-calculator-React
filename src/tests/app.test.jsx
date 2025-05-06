import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import * as libs from '../libs';

vi.mock("../libs", ()=> ({
    calculateTipAmount: vi.fn(()=>23),
    calculateTotalAmount: vi.fn(()=>43),
    staticAsset: vi.fn(()=>''),
}));

describe('App', () => {
    const fakeOnSubmit = vi.fn();
    const user = userEvent.setup();
  
    beforeEach(() => {
      vi.resetAllMocks();
    })
    
    it('properly divides the total by the number of people', async () => {
      render(<App />);
      await user.type(screen.getByLabelText('Bill'), '100');
      await user.type(screen.getByLabelText('Number of People'), '2');
      await user.click(screen.getByLabelText('15%'));

      const tipAmount = screen.getByTestId('tip-amount')
      const totalAmount = screen.getByTestId('total-amount')
      
      expect(tipAmount).toBeInTheDocument();
      expect(tipAmount.textContent).toBe('11.50'); //= 23 / 2
      expect(totalAmount).toBeInTheDocument();
      expect(totalAmount.textContent).toBe('21.50'); // = 43 / 2
    });

    it('resets the input fields by pressing the reset button', async () => {
        render(<App />);
        const bill = screen.getByLabelText('Bill');
        const numPeople = screen.getByLabelText('Number of People');
        const tipPercentage25 = screen.getByLabelText('25%');
        const tipPercentage15 = screen.getByLabelText('15%');
        const reset = screen.getByRole("button", { name: "Reset" });

        await user.type(bill, '100');
        await user.type(numPeople, '2');
        await user.click(tipPercentage25);
        await user.click(reset);
        
        expect(bill.value).toBe('0');
        expect(numPeople.value).toBe('1');
        expect(tipPercentage25).not.toBeChecked();
        expect(tipPercentage15).toBeChecked();
    });

    it('adds invalid class to each invalid input', async () => {
        render(<App />);
        const bill = screen.getByLabelText('Bill');
        const numPeople = screen.getByLabelText('Number of People');
        const customTip = screen.getByLabelText('Custom');

        await user.type(bill, '-100');
        await user.type(numPeople, '1.5');
        await user.click(customTip);
        
        const customInput = screen.getByLabelText('Custom Input');
        expect(customInput).toBeInTheDocument();
        expect(customInput).toBeVisible();

        await user.type(customInput, 'abc');
        
        expect(screen.getByText('Invalid bill amount')).toBeInTheDocument();
        expect(screen.getByText('Invalid # people')).toBeInTheDocument();
        expect(screen.getByText('Invalid tip percentage')).toBeInTheDocument();
        expect(bill.classList.contains('invalid')).toBe(true);
        expect(numPeople.classList.contains('invalid')).toBe(true);
        expect(customInput.classList.contains('invalid')).toBe(true);
    });
    it('gives the result with 2 digits below the decimal point', async () => {
        render(<App />);
        await user.type(screen.getByLabelText('Bill'), '100');
        await user.type(screen.getByLabelText('Number of People'), '3');
        await user.click(screen.getByLabelText('15%'));
  
        const tipAmount = screen.getByTestId('tip-amount')
        const totalAmount = screen.getByTestId('total-amount')
        
        expect(tipAmount).toBeInTheDocument();
        expect(tipAmount.textContent).toBe('7.67'); // = 23 / 3
        expect(totalAmount).toBeInTheDocument();
        expect(totalAmount.textContent).toBe('14.33'); // = 43 / 3
      });
  })
