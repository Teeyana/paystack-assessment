'use client'

import { Button } from "@/components/ui/button"
import { UserForm } from "../components/page-components/UserForm";
import { ProductList } from '@/components/page-components/ProductList';
import { PaymentHistory } from '@/components/page-components/PaymentHistory';

export default function Page() {

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Tee's Paystack Assessment</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">Create Customer Api Consumption</h2>
        <UserForm />
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">Create Payment Request Api Consumption</h2>
        <ProductList />
      </section>
      
      <section>
        <PaymentHistory />
      </section>
    </div>
  )
}

