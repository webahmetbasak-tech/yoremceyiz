import Image from 'next/image';
type Props = { name: string; alt: string; className?: string; priority?: boolean; sizes?: string; loading?: 'lazy' | 'eager' };
export function Media({ name, alt, className = '', priority = false, sizes = '(max-width: 700px) 100vw, 60vw', loading }: Props) {
  return <div className={`media ${className}`}><Image src={`/media/${name}.webp`} alt={alt} fill sizes={sizes} priority={priority} loading={priority ? undefined : loading} quality={85}/></div>;
}
