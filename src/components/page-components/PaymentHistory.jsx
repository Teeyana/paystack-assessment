import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { use, useState } from 'react'
import { Button } from "@/components/ui/button";
import axios from "axios";


const payments = [
  { id: 1, date: '2023-05-01', amount: 19.99, description: 'Product 1' },
  { id: 2, date: '2023-05-15', amount: 29.99, description: 'Product 2' },
  { id: 3, date: '2023-06-01', amount: 39.99, description: 'Product 3' },
]

export function PaymentHistory() {
  const [showPayments, setShowPayments] = useState(false)
  const [tableData, setTableData] = useState([])

  const getCustomerPaymentRequests = async () => {
    setShowPayments(!showPayments)
    const customer = localStorage.getItem("customer_id");
    try {
      let response = await axios.get(
        `https://api.paystack.co/paymentrequest?${customer}`,
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

