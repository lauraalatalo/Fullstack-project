// create-form.tsx
'use client';

import { useActionState } from 'react';
import { createInvoice } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

interface State {
  message: string;
  errors: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
}

export default function CreateInvoiceForm({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: '', errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction} aria-describedby="form-error">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer field */}
        <div className="mb-4">
          <label htmlFor="customerId" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customerId"
              name="customerId"
              defaultValue=""
              aria-describedby={(state.errors ?? {}).customerId ? 'customerId-error' : undefined}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customerId-error" aria-live="polite" aria-atomic="true">
            {(state.errors?.customerId ?? []).map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Amount field */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Amount (USD)
          </label>
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              aria-describedby={state.errors?.amount ? 'amount-error' : undefined}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter amount"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {(state.errors?.amount ?? []).map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Status field */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">Invoice status</legend>
          <div className="flex gap-4">
            <label htmlFor="pending" className="flex items-center gap-2">
              <input type="radio" id="pending" name="status" value="pending" />
              <span className="flex items-center gap-1 text-sm text-gray-600">
                Pending <ClockIcon className="h-4 w-4" />
              </span>
            </label>
            <label htmlFor="paid" className="flex items-center gap-2">
              <input type="radio" id="paid" name="status" value="paid" />
              <span className="flex items-center gap-1 text-sm text-green-700">
                Paid <CheckIcon className="h-4 w-4" />
              </span>
            </label>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {(state.errors?.status ?? []).map((error) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </fieldset>

        {state.message && (
          <p id="form-error" className="mt-2 text-sm text-red-500">
            {state.message}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/invoices"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create Invoice</Button>
        </div>
      </div>
    </form>
  );
}
