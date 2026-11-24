import graphicsCard from '../assets/wh4_imgAsusDualFanGraphicsCardRender2.png'
import motherboardImage from '../assets/raw0_0.png'
import ramImage from '../assets/raw1_0.png'
import cpuImage from '../assets/raw3_0.png'
import gpuIcon from '../assets/wh1_imgGraphicsCard.svg'
import cpuIcon from '../assets/wh1_imgProcessor.svg'
import motherboardIcon from '../assets/wh1_imgMotherboard.svg'
import ramIcon from '../assets/wh2_imgRam.svg'
import storageIcon from '../assets/wh2_imgStorage.svg'
import powerIcon from '../assets/wh2_imgPowerSupply.svg'
import caseIcon from '../assets/wh3_imgPcCase.svg'
import coolingIcon from '../assets/wh3_imgCoolingFan.svg'

export const SHELF_CATALOG = [
  { code: 'A1', category: 'Graphics Cards', description: 'NVIDIA / AMD Series', icon: gpuIcon, prefix: 'GPU', image: graphicsCard },
  { code: 'A2', category: 'Processors', description: 'Intel Core / AMD Ryzen', icon: cpuIcon, prefix: 'CPU', image: cpuImage },
  { code: 'A3', category: 'Motherboards', description: 'ATX, Micro-ATX & Mini-ITX', icon: motherboardIcon, prefix: 'MBD', image: motherboardImage },
  { code: 'B1', category: 'RAM', description: 'DDR4 & DDR5 Kits', icon: ramIcon, prefix: 'RAM', image: ramImage },
  { code: 'B2', category: 'Storage', description: 'NVMe M.2 & SATA SSDs', icon: storageIcon, prefix: 'STO', image: storageIcon },
  { code: 'B3', category: 'Power Supplies', description: 'Modular & ATX 3.0 PSUs', icon: powerIcon, prefix: 'PSU', image: powerIcon },
  { code: 'C1', category: 'PC Cases', description: 'Mid-Tower & Full-Tower', icon: caseIcon, prefix: 'CAS', image: caseIcon },
  { code: 'C2', category: 'Cooling Systems', description: 'AIO Liquid & Air Coolers', icon: coolingIcon, prefix: 'COL', image: coolingIcon },
] as const

const names = {
  A1: ['GeForce RTX 4090', 'GeForce RTX 4080 Super', 'GeForce RTX 4070 Ti Super', 'Radeon RX 7900 XT', 'GeForce RTX 4060 Ti', 'Radeon RX 7800 XT', 'GeForce RTX 4070 Super', 'Radeon RX 7700 XT', 'GeForce RTX 4060', 'Radeon RX 7600', 'Radeon RX 7900 XTX', 'GeForce RTX 3060'],
  A2: ['Intel Core i9-14900K', 'Ryzen 9 7950X', 'Intel Core i7-14700K', 'Ryzen 7 7700X', 'Intel Core i5-14600K', 'Ryzen 5 7600', 'Intel Core i5-13600K', 'Ryzen 7 7800X3D', 'Ryzen 9 7900', 'Intel Core i3-14100', 'Ryzen 5 5600', 'Intel Core i7-13700K'],
  A3: ['ROG Strix Z790-E', 'PRO Z790-P', 'PRO Z790-A WiFi', 'PRO Z790-A', 'PRO B760-A WiFi', 'B650 Aorus Elite', 'MAG B650 Tomahawk', 'TUF Gaming B760', 'Prime X670-P', 'ROG Strix B650-A', 'B550 Aorus Pro', 'Prime H610M'],
  B1: ['Fury Beast DDR5 32GB', 'Vengeance DDR5 16GB', 'Trident Z5 RGB 32GB', 'Fury Beast DDR4 16GB', 'Kingston Fury Beast RGB DDR5', 'Kingston Fury Beast DDR5 16GB', 'Fury Beast RGB DDR5 64GB', 'Trident Z5 DDR5 64GB', 'Dominator Titanium 48GB', 'Corsair Vengeance RGB DDR5', 'Corsair Vengeance DDR5 32GB', 'Corsair Vengeance RGB DDR5 64GB'],
  B2: ['Samsung 990 Pro 2TB', 'Samsung 990 Pro 1TB', 'WD Black SN850X 2TB', 'Crucial T500 1TB', 'Kingston KC3000 2TB', 'Samsung 870 EVO 1TB', 'WD Blue SN580 1TB', 'Crucial MX500 2TB', 'Seagate FireCuda 530', 'Kingston NV2 1TB', 'Samsung 980 Pro 2TB', 'WD Red Plus 4TB'],
  B3: ['Corsair RM850e', 'Seasonic Focus GX-750', 'be quiet! Pure Power 12', 'ASUS ROG Strix 750W', 'Corsair HX1000i', 'MSI MAG A850GL', 'NZXT C850 Gold', 'EVGA SuperNOVA 750', 'Thermaltake Toughpower', 'Seasonic Vertex GX-1000', 'Corsair SF750', 'Cooler Master V850'],
  C1: ['NZXT H5 Flow', 'Lian Li Lancool 216', 'Corsair 4000D Airflow', 'Fractal Design North', 'NZXT H7 Flow', 'Lian Li O11 Dynamic', 'Fractal Meshify 2', 'Phanteks NV5', 'Corsair 5000D', 'be quiet! Pure Base 500', 'Hyte Y60', 'Cooler Master NR200'],
  C2: ['NZXT Kraken 240', 'Corsair iCUE H150i', 'DeepCool AK620', 'Noctua NH-D15', 'Arctic Liquid Freezer III', 'Lian Li Galahad II', 'be quiet! Dark Rock Pro', 'Cooler Master ML240L', 'Thermalright Peerless Assassin', 'NZXT F120 RGB', 'Corsair AF120 Elite', 'Noctua NF-A12x25'],
}

const initialStock: Record<string, number[]> = {
  A1: [24, 24, 18, 15, 24, 2, 0, 12, 9, 14, 20, 24],
  A2: [20, 22, 24, 16, 18, 3, 21, 0, 4, 19, 23, 17],
  A3: [2, 1, 2, 0, 2, 1, 0, 2, 2, 1, 2, 1],
  B1: [24, 18, 21, 16, 0, 6, 0, 3, 22, 0, 4, 0],
  B2: [18, 15, 12, 22, 24, 2, 19, 21, 14, 0, 16, 20],
  B3: [24, 24, 22, 20, 24, 24, 21, 24, 19, 22, 24, 23],
  C1: [24, 24, 24, 22, 24, 24, 21, 24, 24, 22, 24, 20],
  C2: Array.from({ length: 12 }, () => 0),
}

export const INVENTORY_CATALOG = SHELF_CATALOG.flatMap(shelf => names[shelf.code].map((name, index) => ({
  name,
  category: shelf.category,
  sku: `${shelf.prefix}-${String(101 + index).padStart(4, '0')}`,
  defaultBin: `${shelf.code}-L${3 - Math.floor(index / 4)}-S${index % 4 + 1}`,
  image: shelf.image,
  minimum: shelf.code === 'B1' && (index === 7 || index === 10) ? 5 : 3,
  shelf: shelf.code,
  initial: initialStock[shelf.code][index],
})))

export function catalogProduct(sku: string) {
  return INVENTORY_CATALOG.find(product => product.sku === sku)
}
