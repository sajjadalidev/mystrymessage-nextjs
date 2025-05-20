"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/schemas/signUpSchema";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useSession, signIn, signOut } from "next-auth/react";
export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        className="bg-orange-500 px-3 py-2 hover:cursor-pointer m-4 rounded"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}

// const SignIn = () => {
//   const [username, setUsername] = useState("");
//   const [usernameMessage, setUsernameMessage] = useState("");
//   const [isCheckingUsername, setIsCheckingUsername] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const debouncedUsername = useDebounceValue(username, 500);
//   const router = useRouter();

//   // zod implementation
//   const form = useForm({
//     resolver: zodResolver(SignUpSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
//   });

//   useEffect(() => {
//     const checkUsernameUnique = async () => {
//       try {
//         const response = await axios.get(
//           `check-username-unique?username=${debouncedUsername}`
//         );
//         setUsernameMessage(response.data.message);
//       } catch (error) {
//         setUsernameMessage("Error checking username");
//       } finally {
//         setIsCheckingUsername(false);
//       }
//     };
//     if (debouncedUsername) {
//       setIsCheckingUsername(true);
//       checkUsernameUnique();
//     } else {
//       setUsernameMessage("");
//     }
//   }, [debouncedUsername]);

//   const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post("/api/sign-up", {
//         username: data.username,
//         email: data.email,
//         password: data.password,
//       });
//       toast.success("Sign up successful");
//       router.replace(`/verify/${response.data.username}`);
//     } catch (error) {
//       toast.error("Sign up failed");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white-rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Join Mystery Message
//           </h1>
//           <p className="text-gray-600">
//             Sign up to start your anonymous adventure
//           </p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Username</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="username"
//                       {...field}
//                       onChange={(e) => {
//                         field.onChange(e);
//                         setUsername(e.target.value);
//                       }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input placeholder="email" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="Password" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? "Submitting..." : "Submit"}
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };
// export default SignIn;
