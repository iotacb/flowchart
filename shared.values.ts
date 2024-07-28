import { FcGoogle } from "react-icons/fc";
import { BsDiscord, BsGithub } from "react-icons/bs";
import { IconType } from "react-icons";
import { Provider } from "@supabase/supabase-js";

export const navLinks = [
	{ title: "Home", href: "/" },
	{ title: "About", href: "/" },
	{ title: "Demo", href: "/" },
];

export type LoginProvider = {
	title: string;
	icon: IconType;
	provider: Provider;
};

export const loginProviders: LoginProvider[] = [
	{ title: "Google", icon: FcGoogle, provider: "google" },
	{ title: "Discord", icon: BsDiscord, provider: "discord" },
	{ title: "GitHub", icon: BsGithub, provider: "github" },
];
