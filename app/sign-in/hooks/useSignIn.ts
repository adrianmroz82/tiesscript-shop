import { useRouter } from "next/navigation";

import { FirebaseError } from "firebase/app";
import { SignInForm } from "../model/sign-in-form.model";
import { useAuth } from "../../context/auth-provider";
import { toast } from "@/components/shadcn-ui/use-toast";

export function useSignIn() {
  const { loginUser } = useAuth();
  const router = useRouter();

  const signIn = async ({ email, password }: SignInForm) => {
    try {
      await loginUser(email, password);

      toast({
        title: "Success",
        description: "You have successfully signed in",
      });

      router.push("/admin");
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast({
          title: `Error ${errorCode}`,
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };

  return signIn;
}
