import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { auth } from "./Firebase";
import Lottie from "react-lottie-player";
import welcomeback from "./assets/welcomeback";
export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formMethods = useForm();

  const { handleSubmit } = formMethods;

  async function onSubmit(data) {
    setIsLoading(true);
    const { email, password } = data;

    if (!email || !password) {
      alert("Please enter email and password");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Column - Lottie Animation */}
      <div className="hidden lg:block w-1/2 bg-muted items-center justify-center pt-28">
        <Lottie
          loop
          animationData={welcomeback}
          play
          className="w-full h-[70%]"
        />
        <div className="text-3xl text-primary flex items-center justify-center font-praise">
          <h1>Welcome Back !!</h1>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <FormProvider {...formMethods}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Sign in to your account</h2>
              <p className="text-muted-foreground">
                Enter your email and password to continue
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="email">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...formMethods.register("email")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="password">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="Password"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="current-password"
                      disabled={isLoading}
                      {...formMethods.register("password")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <Button disabled={isLoading} className="w-full">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
              </div>
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="w-full">
                <FcGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <FaApple className="mr-2 h-4 w-4" />
                Apple
              </Button>
              <Button variant="outline" className="w-full">
                <FaFacebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>
          </FormProvider>
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
