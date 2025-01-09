// 'use client';

// import { useForm } from 'react-hook-form';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '../ui/form';
// import * as z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import Link from 'next/link';
// import GoogleSignInButton from '../GoogleSignInButton';
// import { CreateUserSchema } from '@/lib/validations';


// const SignUpForm = () => {
//   const form = useForm<z.infer<typeof CreateUserSchema>>({
//     resolver: zodResolver(CreateUserSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit = (values: z.infer<typeof CreateUserSchema>) => {
//     console.log(values);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
//         <div className='space-y-2'>
//           <FormField
//             control={form.control}
//             name='email'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder='mail@example.com' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name='password'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     type='password'
//                     placeholder='Enter your password'
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <Button className='w-full mt-6' type='submit'>
//           Sign up
//         </Button>
//       </form>
//       <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
//         or
//       </div>
//       <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
//       <p className='text-center text-sm text-gray-600 mt-2'>
//         If you don&apos;t have an account, please&nbsp;
//         <Link className='text-blue-500 hover:underline' href='/sign-in'>
//           Sign in
//         </Link>
//       </p>
//     </Form>
//   );
// };

// export default SignUpForm;