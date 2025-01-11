"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button";
import axios from "axios";


export function PaymentHistory() {
  const [showPayments, setShowPayments] = useState(false)
  const [tableData, setTableData] = useState([])
  const [customerId, setCustomerId] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const customer = window.localStorage.getItem("customer_id");
      setCustomerId(customer);
    }
  }, []);

  const getCustomerPaymentRequests = async () => {
    setShowPayments(!showPayments)
    try {
      let response = await axios.get(
        `https://api.paystack.co/paymentrequest?customer=${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_secret_key}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTableData(response.data.data)
      alert(response.data.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">List Payment Request Api Consumption</h2>
      <Button onClick={() => getCustomerPaymentRequests() }>
        {showPayments ? 'Hide' : 'Show'} Payment History
      </Button>
      {showPayments && 
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData?.map((tableData) => (
              <TableRow key={tableData.id}>
                <TableCell>{tableData.customer.first_name}</TableCell>
                <TableCell>{tableData.customer.email}</TableCell>
                <TableCell className="text-right">NGN {tableData.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </section>
  )
}