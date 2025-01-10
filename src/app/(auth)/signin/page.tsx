import { redirect } from "next/navigation";
import { SignInPage } from "./signin";
import { checkIsAuth } from "@/components/auth/checkIsAuth";

const SignIn: React.FC = async () => {
  const isAuthenticated = await checkIsAuth();

  if (isAuthenticated) {
    redirect("/dashboard");
  } else {
    return <SignInPage />;
  }
};

export default SignIn;