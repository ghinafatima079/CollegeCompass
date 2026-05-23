import { SignUp } from "@clerk/nextjs";

export default function Page() {

    return (

        <main className="min-h-screen bg-[#0b0d12] flex items-center justify-center">

            <SignUp />

        </main>

    );
}