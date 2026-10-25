import type { GalleryItem } from '../types'
// Add approved, licensed images (put files in src/assets or /public).
export const gallery: GalleryItem[] = [
  { id: 'g1', src: '/media/img1.jpg', alt: 'Portrait placeholder', caption: 'Portrait', ratio: 'portrait' },
  { id: 'g2', src: '/media/img2.jpg', alt: 'Live performance placeholder', caption: 'Live', ratio: 'landscape' },
  { id: 'g3', src: '/media/img3.jpg', alt: 'Studio session placeholder', caption: 'Studio', ratio: 'square' },
  { id: 'g4', src: '/media/img4.webp', alt: 'Portrait placeholder', caption: 'Portrait', ratio: 'portrait' },
  { id: 'g5', src: '/media/img5.jpeg', alt: 'Recording session placeholder', caption: 'Recording', ratio: 'landscape' },
  { id: 'g6', src: '/media/show1.jpg', alt: 'Promotional photograph placeholder', caption: 'Promotional', ratio: 'portrait' },
]
