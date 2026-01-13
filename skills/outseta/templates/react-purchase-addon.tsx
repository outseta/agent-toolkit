import { useAuth } from "../AuthProvider";

/**
 * This example demonstrates how to trigger the Outseta Profile widget
 * directly to the "Purchase Add-on" tab for a specific add-on.
 *
 * This is useful for "Buy Now" buttons for specific features or courses.
 */
export const PurchaseAddonButton = ({ addonUid }: { addonUid: string }) => {
  const { openProfile } = useAuth();

  const handlePurchase = () => {
    openProfile({
      mode: "popup",
      tab: "purchaseAddOn",
      stateProps: {
        addOnUid: addonUid,
        // billingRenewalTerm: 4 usually represents a one-time purchase
        // Check your Outseta configuration for the correct term ID
        billingRenewalTerm: 4,
      },
    });
  };

  return (
    <button
      onClick={handlePurchase}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
    >
      Buy Add-on
    </button>
  );
};

/**
 * Example usage in a Course Card component
 */
export const CourseCard = ({ course }: { course: any }) => {
  const { user } = useAuth();

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-bold">{course.title}</h3>
      <p className="text-muted-foreground mb-4">{course.description}</p>

      {course.isLocked ? (
        <PurchaseAddonButton addonUid={course.outseta_addon_id} />
      ) : (
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md">
          View Course
        </button>
      )}
    </div>
  );
};
