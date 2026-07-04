import { getMe } from "@/api/server-api";
import AddAddressModal from "@/components/user/AddAddressModal";
import React from "react";
export const dynamic = "force-dynamic";


export default async function Page() {
  const { user } = await getMe();

  return <AddAddressModal user={user} />;
}