import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { checkSubscription } from "@/lib/subscription";
import { getApiLimitCount } from "@/lib/api-limit";

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return ( 
    <div className="min-h-screen bg-gray-100">
      <Navbar isPro={!isPro} apiLimitCount={apiLimitCount} />
      <main className="pt-16 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
   );
}
 
export default DashboardLayout;
