import { HeroExperience } from '@/components/hero-experience';
import { CollectionShowcase } from '@/components/collection-showcase';
import { Manifesto, StitchEmbroiderySection, HeritageSection, FinalCTA } from '@/components/editorial';
import { site } from '@/lib/site';
import { HomeColorStories } from '@/components/home-color-stories';
import './home-composition.css';
export const metadata = { alternates: site.url ? { canonical: site.url } : undefined };
export default function Home() {
  return <><HeroExperience/><Manifesto/><CollectionShowcase/><HomeColorStories/><StitchEmbroiderySection/><HeritageSection/><FinalCTA/></>;
}
