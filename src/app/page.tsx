import { HeroExperience } from '@/components/hero-experience';
import { CollectionShowcase } from '@/components/collection-showcase';
import { FinalCTA } from '@/components/editorial';
import { site } from '@/lib/site';
import { HomeAtelier } from '@/components/home-atelier';
import './home-composition.css';
export const metadata = { alternates: site.url ? { canonical: site.url } : undefined };
export default function Home() {
  return <><HeroExperience/><CollectionShowcase/><HomeAtelier/><FinalCTA/></>;
}
