"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

function AuthForm() {
  const router = useRouter();
  const auth = useAuth();

  const [email, setEmail] = useState("kalle@hotmail.com");
  const [passWord, setPassword] = useState("123");
  const [userName, setName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const url = isLogin ? "/api/auth/login" : "/api/auth/register";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        passWord,
        userName,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      console.log("data", data);
      localStorage.setItem("@library/token", data.token);
      auth.setToken(data.token);
      router.push("/Item");
      return;
    }
    setError("blev inte riktigt rätt där");
  }

  console.log("Auth", auth);

  return (
    <div>
      <form class="form bg-white" onSubmit={handleSubmit}>
        <div class="form__group">
          <label class="form__label">Email</label>
          <input
            class="form__input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div class="form__group">
          <label class="form__label">Password</label>
          <input
            class="form__input"
            type="password"
            value={passWord}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        {!isLogin && (
          <div class="form__group">
            <label class="form__label">Name</label>
            <input
              class="form__input"
              type="text"
              value={userName}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button class="form__button form__button--primary">
          {isLogin ? "Login" : "Register"}
        </button>
        <p class="form__text">or</p>
        <div class="form__group">
          <button
            class="form__button form__button--secondary"
            type="button"
            onClick={(e) => {
              setIsLogin(!isLogin);
            }}
          >
            {!isLogin ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
