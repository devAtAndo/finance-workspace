import Image from 'next/image';
import { LoginForm } from './login-form';

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Image
          src="/ando-logo-red.png"
          alt="Ando"
          width={160}
          height={50}
          priority
          className="h-10 w-auto mb-6"
        />
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Rider Payments
        </div>
        <h1 className="text-2xl font-semibold mb-1">Sign in</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Enter your email and we&rsquo;ll send you a magic link.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
