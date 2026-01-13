import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

/*
 * This example demonstrates how to use the AuthProvider pattern
 * to handle Outseta widgets and conditional rendering in React.
 */

const AuthPage = ({ widgetMode }: { widgetMode: string }) => {
  const { openLogin, openSignup } = useAuth();

  const registrationDefaults = {
    Subscription: {
      DiscountCouponSubscriptions: [
        {
          DiscountCoupon: {
            UniqueIdentifier: "DEMO",
          },
        },
      ],
    },
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">{widgetMode} Page</h2>

      {/* Trigger via Code (Recommended) */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          if (widgetMode === "register") {
            openSignup({
              mode: "popup",
              registrationDefaults: JSON.stringify(registrationDefaults),
            });
          } else {
            openLogin({
              mode: "popup",
              widgetMode: widgetMode,
            });
          }
        }}
      >
        Open {widgetMode} Popup
      </button>

      {/* Embed - Important to add key here so React handles each widget mode as a new component */}
      <div key={widgetMode} className="border p-4 rounded">
        <div
          data-o-auth="1"
          data-mode="embed"
          data-widget-mode={widgetMode}
          data-registration-defaults={JSON.stringify(registrationDefaults)}
        ></div>
      </div>
    </div>
  );
};

const ProfilePage = ({ tab }: { tab: string }) => {
  const { openProfile } = useAuth();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Profile Page ({tab})</h2>

      {/* Trigger via Code (Recommended) */}
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => openProfile({ mode: "popup", tab: tab })}
      >
        Open Profile Popup
      </button>

      {/* Embed - Important to add key here so React handles each widget mode as a new component */}
      <div key={tab} className="border p-4 rounded">
        <div data-o-profile="1" data-mode="embed" data-tab={tab}></div>
      </div>
    </div>
  );
};

const LogoutPage = () => {
  const { logout } = useAuth();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Logout Page</h2>
      <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => logout()}>
        Logout Now
      </button>
    </div>
  );
};

export const Layout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="flex gap-4 p-4 border-b">
        <Link to="/">Home</Link>

        {!user ? (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/my-profile">Profile</Link>
            <Link to="/my-billing">Billing</Link>
            <Link to="/logout">Logout</Link>
          </>
        )}
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

// Example usage in a router configuration:
/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <div>Welcome to the Home Page</div> },
      { path: "login", element: <AuthPage widgetMode="login" /> },
      { path: "signup", element: <AuthPage widgetMode="register" /> },
      { path: "my-profile", element: <ProfilePage tab="profile" /> },
      { path: "my-billing", element: <ProfilePage tab="billing" /> },
      { path: "logout", element: <LogoutPage /> },
    ],
  },
]);
*/
