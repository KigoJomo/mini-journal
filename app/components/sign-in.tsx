"use client"

import { signIn } from 'next-auth/react';
import "@material/web"

export default function SignIn() {
  return (
    <>
      <button
        className="bg-blue-700 hover:bg-blue-800 hover:scale-[.99] transition-all duration-300 px-12 py-2 rounded cursor-pointer text-background"
        onClick={() => signIn('github')}
        aria-label="Sign in with GitHub">
        Sign in with GitHub
      </button>

      
    </>
  );
}
