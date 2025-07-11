import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";


export default function Auth() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  const login = useCallback(async () => {
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profiles",
      });

      if (response?.ok) {
        router.push("/profiles");
      } else {
        console.log("Login failed:", response?.error);
        alert("Login failed: " + response?.error); // hoặc setErrorMessage để hiển thị UI
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  }, [email, password, router]);
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div
      className="relative h-full w-full 
    bg-[url('/images/hero.jpg')]
    bg-no-repeat
    bg-cover
    bg-center"
    >
      <div className="bg-black w-full h-full bg-opacity-50 ">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(ev: any) => {
                    setName(ev.target.value);
                  }}
                  id="name"
                  type="text"
                  value={name}
                ></Input>
              )}
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              ></Input>
              <Input
                label="Password"
                onChange={(ev: any) => {
                  setPassword(ev.target.value);
                }}
                id="password"
                type="password"
                value={password}
              ></Input>
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Register"}
            </button>
            <div className="flex flex-row items-center justify-center mt-8 gap-4">
              <div onClick={()=>signIn('google',{callbackUrl:'/profiles'})}
                className="
                w-10
               h-10
              bg-white
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer"
              >
                <FcGoogle className="size-8" />
              </div>
              <div
                onClick={()=>signIn('github',{callbackUrl:'/profiles'})}
                className="
                w-10
               h-10
              bg-white
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer"
              >
                <FaGithub className="size-8" />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix ?"
                : "Already have an account ?"}

              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
