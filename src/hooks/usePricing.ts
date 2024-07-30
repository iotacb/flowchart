import { supabase } from "@/lib/supabse";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export function useIsPremium() {
	const [premium, setPremium] = useState(false);
	const session = useSession();

	const fetchSubscriptions = async () => {
		if (!session) {
			return false;
		}
		const { data, error } = await supabase
			.from("subscriptions")
			.select()
			.eq("user_id", session.user.id);

		if (error) {
			console.error(error);
			return false;
		}

		if (data.length === 0) {
			return false;
		}

		console.log(data);

		return data[0].status === "active";
	};

	useEffect(() => {
		fetchSubscriptions().then((subscription) => {
			console.log("done fetching premium", "data: " + subscription);
			setPremium(subscription);
		});
	}, [session]);

	return premium;
}
