import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React from "react";
import { LoginProvider } from "../../../shared.values";
import { BsGithub } from "react-icons/bs";

type Props = {
	children: React.ReactNode;
};

export function SignedIn({ children }: Props) {
	const session = useSession();
	return <>{session && <>{children}</>}</>;
}

export function SignedOut({ children }: Props) {
	const session = useSession();
	return <>{!session && <>{children}</>}</>;
}

export function ProviderLoginButton({ title, icon, provider }: LoginProvider) {
	const supabase = useSupabaseClient();
	function handleLogin() {
		supabase.auth.signInWithOAuth({ provider });
	}

	const IconNode = icon;

	return (
		<button
			onClick={() => handleLogin()}
			className="grid place-content-center rounded-lg border border-zinc-700 bg-zinc-800 px-6 flex-1 py-2 text-white hover:bg-zinc-700"
		>
			<IconNode className="text-2xl" />
		</button>
	);
}
