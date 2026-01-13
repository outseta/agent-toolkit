import { ReactNode } from "react";
import { useAuth } from "./AuthProvider";

const PLANS = {
  PRO: { label: "Pro", uid: "yW1qbyWB" },
  BASIC: { label: "Basic", uid: "OW4pw3Wg" },
};

function hasCorrectPlan(plans: { uid: string }[], user: any) {
  if (user) {
    const planIdForUser = user.Account?.CurrentSubscription?.Plan?.Uid;
    return !!plans.find((plan) => plan.uid === planIdForUser);
  } else {
    return false;
  }
}

interface ProtectedRouteProps {
  pro?: boolean;
  children: ReactNode;
}

export default function ProtectedRoute({ pro, children }: ProtectedRouteProps) {
  const { user, openLogin, openSignup, openProfile, isLoading } = useAuth();

  // Pro routes only accessible with pro plan
  // Basic routes accessible with basic or pro plan
  const plansWithAccess = pro ? [PLANS.PRO] : [PLANS.BASIC, PLANS.PRO];
  const allowAccess = hasCorrectPlan(plansWithAccess, user);

  if (isLoading) return <p>Authenticating...</p>;

  if (allowAccess) {
    return <>{children}</>;
  } else if (user) {
    return (
      <div className="p-4 border rounded bg-yellow-50">
        <p className="mb-4">
          To access this content you need to upgrade to the{" "}
          <strong>{plansWithAccess[0].label}</strong> plan.
        </p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => openProfile({ tab: "planChange" })}
        >
          Upgrade
        </button>
      </div>
    );
  } else {
    return (
      <div className="p-4 border rounded bg-gray-50">
        <p className="mb-4">
          To access this content you need to{" "}
          <button className="text-blue-500 underline" onClick={() => openSignup()}>
            signup
          </button>{" "}
          for the <strong>{plansWithAccess[0].label}</strong> plan.
        </p>

        <p>
          Or{" "}
          <button className="text-blue-500 underline" onClick={() => openLogin()}>
            login
          </button>{" "}
          if you already have an account.
        </p>
      </div>
    );
  }
}
