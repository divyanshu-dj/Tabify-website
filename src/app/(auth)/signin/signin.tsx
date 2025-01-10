"use client";

import GoogleSigninButton from "@/components/auth/loginWithGoogle";
import { Button } from "@/components/ui/button";
// import { useTransition, useState } from "react";
// import { handleEmailSignIn } from "@/src/lib/auth/emailSignInServerAction";

export const SignInPage: React.FC = () => {
    //   const [isPending, startTransition] = useTransition();
    //   const [formData, setFormData] = useState({ email: "" as string });

    //   const handleSubmit = (event: React.FormEvent) => {
    //     event.preventDefault(); // Prevents the form from submitting and reloading the page, allowing us to handle the submission in TypeScript.
    //     try {
    //       startTransition(async () => {
    //         await handleEmailSignIn(formData.email);
    //       });
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

    return (
        <div className="flex justify-center items-center h-screen bg-grey-900">
            <div className="flex flex-col justify-center items-center h-1/2 w-1/3 bg-dark-blue rounded-3xl">
                <h2 className="pb-3 font-bold text-4xl font-sans">Sign In</h2>
                <p className="pb-6 text-gray-400">Sign in to your account to continue</p>
                <div className="p-4 w-3/5">
                    {/* <form className="email-signin-form" >
                        <input
                            className="form-input"
                            type="email"
                            maxLength={320}
                            placeholder="Email Address"
                            // onChange={(
                            //     event: React.ChangeEvent<HTMLInputElement>
                            // ) => setFormData({ email: event.target.value })}
                            // disabled={isPending}
                            required
                        />
                        <Button className="">
                            Sign in with email
                        </Button>
                    </form>

                    <div className="divider">
                        <div className="line"></div>
                        <span className="or">or</span>
                        <div className="line"></div>
                    </div> */}

                    <GoogleSigninButton />
                </div>
            </div>
        </div>
    );
};
