import { LiveDataProvider } from "@/components/LiveData";
import { SiteHeader } from "@/components/SiteHeader";
import { StatusStrip } from "@/components/StatusStrip";
import {
  Community,
  Hero,
  HowItWorks,
  HowToBuy,
  LiveMarket,
  OfficialDetails,
  RecentTrades,
  Rewards,
  SiteFooter,
} from "@/components/sections";

export default function HomePage() {
  return (
    <LiveDataProvider>
      <SiteHeader />
      <StatusStrip />
      <main>
        <Hero />
        <LiveMarket />
        <OfficialDetails />
        <HowItWorks />
        <HowToBuy />
        <Rewards />
        <RecentTrades />
        <Community />
      </main>
      <SiteFooter />
    </LiveDataProvider>
  );
}
