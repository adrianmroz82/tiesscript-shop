import { redirect, useRouter } from "next/navigation";

import { FirebaseError } from "firebase/app";
import { SignInForm } from "../model/sign-in-form.model";
import { useAuth } from "../../context/auth-provider";
import { toast } from "@/components/shadcn-ui/use-toast";

export function useSignIn() {
  const { loginUser } = useAuth();
  console.log("useSignIn", loginUser);
  const router = useRouter();

  const signIn = async ({ email, password }: SignInForm) => {
    try {
      await loginUser(email, password);
      toast({
        title: "Success",
        description: "You have successfully signed in",
      });
      // redirect("/admin");
      router.push("/admin");
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        console.log(errorCode, errorMessage);
        // TODO: add snack bar to display error message
      }
    }
  };

  return signIn;
}
