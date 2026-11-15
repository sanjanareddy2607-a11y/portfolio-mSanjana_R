import type { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const PortfolioChrome = ({ children }: { children: ReactNode }) => (
  <>
    <Navigation />
    <div className="relative flex min-h-full flex-col lg:pl-[86px]">
      <main id="main" className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  </>
);

export default PortfolioChrome;
