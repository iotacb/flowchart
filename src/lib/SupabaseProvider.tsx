"use client";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import React from "react";
import { supabase } from "./supabse";

type Props = {};

export default function SupabaseProvider({
	children,
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<SessionContextProvider supabaseClient={supabase}>
			<div>{children}</div>
		</SessionContextProvider>
	);
}
