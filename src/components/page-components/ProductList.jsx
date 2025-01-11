import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import axios from "axios";
import { PaystackButton } from "react-paystack";
import { Button } from "../ui/button";

const products = [
  {
    id: 1,
    name: "Hoodie Jacket",
    price: 20000,
    description: "Classic Blue jacket",
    image: "/assets/jacket.avif",
  },
  {
    id: 2,
    name: "Hand Bag",
    price: 30000,
    description: "Classic LV Handbag",
    image: "/assets/bag.jpeg",
  },
  {
    id: 3,
    name: "High Heel Shoe",
    price: 40000,
    description: "Classic designed shoe",
    image: "/assets/shoe.jpeg",
  },
];
const publicKey = process.env.NEXT_PUBLIC_public_key;
export function ProductList() {
  const customerEmail = localStorage.getItem("customer_email");

  const componentProps = {
    email: customerEmail,
    publicKey,
    text: "Make Payment",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  };

  const handlePayment = async (price) => {
    const customer = localStorage.getItem("customer");
    try {
      let response = await axios.post(
        "https://api.paystack.co/paymentrequest",
        {
          customer,
          amount: price,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_secret_key}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message, "Check bottom of the page to view payment request");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-96 object-contain"
            />
            <CardDescription className="mt-2">
              {product.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 justify-between items-center">
            <p className="font-bold">NGN {product.price}</p>
            <PaystackButton
              className="bg-black text-white p-2 px-3 rounded-md"
              {...componentProps}
              amount={product.price * 100}
            >
              Make Payment
            </PaystackButton>
            <Button onClick={()=>handlePayment(product.price)}>Request Payment</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
