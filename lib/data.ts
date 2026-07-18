export const MOCK_PRODUCTS = [
  {
    id: 'prod_1',
    name: 'R36MAX Retro Console (Red)',
    price: 4499,
    category: 'Consoles',
    color: 'Red',
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
    id: 'prod_2',
    name: 'R36MAX Console (Purple)',
    price: 4499,
    category: 'Consoles',
    color: 'Purple',
    image: '/console_purple.png',
    gallery: [
      '/console_purple.png'
    ],
    description: 'The R36MAX in a stunning transparent purple casing. Just like the red edition, it runs a Linux-based system capable of emulating all your favorite classics on a beautiful 4-inch display.',
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
    rating: 4.9,
    reviews: [
      { user: 'Sam J.', comment: 'The purple color is super nostalgic. Reminds me of my old GBC.', rating: 5 }
    ]
  },
  {
    id: 'prod_3',
    name: 'R36MAX Premium EVA Case',
    price: 799,
    category: 'Accessories',
    color: 'Black',
    image: '/carry_case.png',
    gallery: [
      '/carry_case.png'
    ],
    description: 'Keep your console completely safe on the go. This hardshell EVA carry case features a soft microfiber inner lining and a mesh pocket for your charging cable.',
    specs: {
      'Material': 'High-density EVA Hardshell',
      'Inner Lining': 'Anti-scratch Microfiber',
      'Extras': 'Mesh accessory pocket, Dual zippers',
      'Compatibility': 'Fits R36MAX perfectly'
    },
    rating: 4.5,
    reviews: [
      { user: 'Karan J.', comment: 'Sturdy and fits the console perfectly.', rating: 4 }
    ]
  },
  {
    id: 'prod_4',
    name: '128GB MicroSD Expansion',
    price: 1499,
    category: 'Accessories',
    color: 'Black',
    image: '/sd_card.png',
    gallery: [
      '/sd_card.png'
    ],
    description: 'Expand your library instantly. This high-speed 128GB MicroSD card comes pre-loaded with an additional 12,000 classic games, pushing your total library past 30,000 games.',
    specs: {
      'Capacity': '128GB',
      'Speed Class': 'Class 10 / UHS-I',
      'Read Speed': 'Up to 100MB/s',
      'Content': '12,000 additional retro games'
    },
    rating: 4.7,
    reviews: [
      { user: 'Amit S.', comment: 'Popped it in the second slot and it instantly worked. Great value.', rating: 5 }
    ]
  }
];
