import DescktopSidebar from './DescktopSidebar';
import MobileFooter from './MobileFooter';

async function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <DescktopSidebar />
      <MobileFooter />
      <main className="h-full lg:pl-20">{children}</main>
      {children}
    </div>
  );
}

export default Sidebar;
