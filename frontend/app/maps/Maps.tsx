'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Maximize2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import {MapType} from '@/lib/types/Map.types';

type MapProps = {
  maps: MapType[];
  error: string | null;
}


export function MapsGallery({ maps, error }: MapProps) {
    const [selectedMap, setSelectedMap] = useState<MapType | null>(null)
  

  useEffect(() => {
    if (!selectedMap) return
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setSelectedMap(null)
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedMap])

  return (
  <main className="maps-page section-shell">
    <div className="maps-heading">
        <div>
            <p className="eyebrow">maps</p>
            <h1 className='!text-[28px]'>my wonderings through space </h1>
        </div>
        <p>click map to maximize</p>
    </div>
    <div className="maps-grid">{maps.map(map => <article className="map-card" key={map.src}><button className="map-preview" type="button" aria-label={`View ${map.title} full screen`} onClick={() => setSelectedMap(map)}><span className="map-image"><Image src={map.src} alt={map.title} fill sizes="(max-width: 800px) 100vw, 33vw" loading="eager" /></span><span className="map-meta"><span><strong>{map.title}</strong><small>{map.description}</small></span><Maximize2 size={18} aria-hidden="true" /></span></button><div className="map-purchase">{map.price === 'enquire price' ? <Link className="map-order map-order-enquire" href="/#contact">enquire price</Link> : <><span className="map-price">$ {map.price}</span><Link className="map-order" href="/#contact">order</Link></>}</div></article>)}</div>
    {selectedMap && <div className="map-lightbox" role="dialog" aria-modal="true" aria-label={`${selectedMap.title} full screen view`} onClick={() => setSelectedMap(null)}><button className="map-close" type="button" aria-label="Close full screen map" onClick={() => setSelectedMap(null)}><X size={22} /></button><div className="map-full-image" onClick={event => event.stopPropagation()}><Image src={selectedMap.src} alt={selectedMap.title} fill sizes="100vw" /></div></div>}
  </main>)
}

export default MapsGallery
