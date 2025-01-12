"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import axios from "axios";

export function UserForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "https://api.paystack.co/customer",
        {
          email,
          first_name: firstName,
          last_name: lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_secret_key}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (typeof window !== "undefined") {
        window.localStorage.setItem("customer", response.data.data.customer_code);
        window.localStorage.setItem("customer_id", response.data.data.id);
        window.localStorage.setItem("customer_email", response.data.data.email);
      }

      if (typeof window !== "undefined") {
        window.location.reload()
      }

      alert(response.data.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}