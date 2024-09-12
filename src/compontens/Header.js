"use client";
import { useAuth } from "@/context/auth";

import Link from "next/link";

function Header() {
  const auth = useAuth();

  return (
    <header class="head">
      <h2 class="inve">Inventory</h2>
      {auth.token ? (
        <Link href="/" onClick={auth.logout} class="red">
          <h2>Logout</h2>
        </Link>
      ) : (
        <Link href="/" class="blue">
          <h2>Login</h2>
        </Link>
      )}
    </header>
  );
}
export default Header;
