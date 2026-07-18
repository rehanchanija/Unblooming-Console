export const MOCK_PRODUCTS = [
  {
    id: 'prod_1',
    name: 'LuminaMug (Matte White)',
    price: 2999,
    image: '/smart-mug.png',
    gallery: [
      '/smart-mug.png'
    ],
    description: 'A beautifully designed smart mug that keeps your coffee exactly at your preferred temperature for up to 3 hours.',
    specs: {
      'Capacity': '14 oz (414 ml)',
      'Temperature Range': '120°F - 145°F',
      'Battery Life': '3 Hours',
      'Material': 'Ceramic coated stainless steel',
    },
    rating: 4.9,
    reviews: [
      { user: 'Sarah W.', comment: 'Love it! My coffee never goes cold.', rating: 5 },
      { user: 'Mike T.', comment: 'Great gift for coffee lovers.', rating: 5 }
    ]
  },
  {
    id: 'prod_2',
    name: 'R36MAX Retro Console (Red)',
    price: 4499,
    image: '/hero-r36max.png',
    gallery: [
      '/hero-r36max.png',
      '/r36max_front_1784376825798.png',
      '/r36max_back_1784376843013.png',
      '/r36max_side_1784376854209.png'
    ],
    description: 'The R36MAX is a budget-friendly, open-source handheld retro game console. It runs on a Linux-based system and is capable of emulating dozens of classic gaming systems (including GBA, PS1, and N64) on a vibrant 4-inch display.',
    specs: {
      'Display': '4.0-inch IPS fully-laminated screen (720 × 720)',
      'Processor (CPU)': 'Rockchip RK3326 64-bit quad-core @ 1.5 GHz',
      'Graphics (GPU)': 'Mali-G31 MP2',
      'RAM': '1GB DDR3',
      'Battery': '4000 mAh rechargeable (6 to 8 hours)',
      'Storage': '64GB MicroSD (18,000+ pre-loaded games)',
      'Emulators': '30+ emulators (PSP, N64, PS1, DS, GBA, Arcade)',
      'Controls': 'Dual 3D analog joysticks, D-pad, L1/L2/R1/R2',
      'Connectivity': 'USB Type-C, 3.5mm headphone jack'
    },
    rating: 4.8,
    reviews: [
      { user: 'Rahul K.', comment: 'Amazing console! Plays PS1 games flawlessly.', rating: 5 },
      { user: 'Priya M.', comment: 'Screen is bright and colors look great. Highly recommended.', rating: 4 }
    ]
  },
  {
    id: 'prod_3',
    name: 'R36MAX Carry Case',
    price: 799,
    image: '/r36max_side_1784376854209.png',
    gallery: [
      '/r36max_side_1784376854209.png'
    ],
    description: 'Keep your console safe on the go. This hardshell carry case features a soft inner lining and a mesh pocket.',
    specs: {
      'Material': 'EVA Hardshell',
      'Inner Lining': 'Microfiber',
    },
    rating: 4.5,
    reviews: [
      { user: 'Karan J.', comment: 'Sturdy and fits the console perfectly.', rating: 4 }
    ]
  }
];
