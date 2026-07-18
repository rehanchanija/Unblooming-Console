export const MOCK_PRODUCTS = [
  {
    id: 'prod_1',
    name: 'R36MAX Console (Grey)',
    price: 4499,
    image: '/r36max_front_1784376825798.png',
    gallery: [
      '/r36max_front_1784376825798.png',
      '/r36max_back_1784376843013.png',
      '/r36max_side_1784376854209.png'
    ],
    description: 'The ultimate retro handheld gaming console. Relive your childhood memories with 18,000+ pre-loaded games, a crisp 3.5" IPS display, and ergonomic grips.',
    specs: {
      'Processor': 'RK3326 Quad-Core 1.5GHz',
      'RAM': '1GB DDR3L',
      'Screen': '3.5" IPS OCA Full Fit (640x480)',
      'Battery': '3500mAh Li-polymer (6-8 hours)',
      'Storage': '64GB MicroSD (Expandable to 256GB)',
    },
    rating: 4.8,
    reviews: [
      { user: 'Rahul K.', comment: 'Amazing console! Plays PS1 games flawlessly.', rating: 5 },
      { user: 'Amit S.', comment: 'Battery life is fantastic for long trips.', rating: 5 },
      { user: 'Priya M.', comment: 'Screen is bright and colors look great. Highly recommended.', rating: 4 }
    ]
  },
  {
    id: 'prod_2',
    name: 'R36MAX Console (Black)',
    price: 4499,
    image: '/r36max_back_1784376843013.png',
    gallery: [
      '/r36max_back_1784376843013.png',
      '/r36max_front_1784376825798.png',
      '/r36max_side_1784376854209.png'
    ],
    description: 'The stealthy black version of the ultimate retro handheld gaming console. Enjoy 18,000+ classic games in a sleek, fingerprint-resistant matte black finish.',
    specs: {
      'Processor': 'RK3326 Quad-Core 1.5GHz',
      'RAM': '1GB DDR3L',
      'Screen': '3.5" IPS OCA Full Fit (640x480)',
      'Battery': '3500mAh Li-polymer (6-8 hours)',
      'Storage': '64GB MicroSD (Expandable to 256GB)',
    },
    rating: 4.9,
    reviews: [
      { user: 'Vikram D.', comment: 'The black color looks so premium. Buttons feel great.', rating: 5 },
      { user: 'Neha R.', comment: 'Perfect gift for my brother. He loves the GBA emulator.', rating: 5 }
    ]
  },
  {
    id: 'prod_3',
    name: 'Premium Carry Case',
    price: 799,
    image: '/r36max_side_1784376854209.png', // reusing image as mock
    gallery: [
      '/r36max_side_1784376854209.png'
    ],
    description: 'Keep your console safe on the go. This hardshell carry case features a soft inner lining and a mesh pocket for your charging cable and earphones.',
    specs: {
      'Material': 'EVA Hardshell',
      'Inner Lining': 'Microfiber',
      'Compatibility': 'Fits R36MAX and similar 3.5" consoles',
    },
    rating: 4.5,
    reviews: [
      { user: 'Karan J.', comment: 'Sturdy and fits the console perfectly.', rating: 4 },
      { user: 'Sanjay P.', comment: 'Good quality zipper.', rating: 5 }
    ]
  },
  {
    id: 'prod_4',
    name: '128GB Loaded MicroSD',
    price: 1299,
    image: '/r36max_front_1784376825798.png', // reusing image as mock
    gallery: [
      '/r36max_front_1784376825798.png'
    ],
    description: 'Instantly upgrade your library. This Class-10 high-speed 128GB MicroSD comes pre-loaded with an additional 15,000 games including rare arcade titles.',
    specs: {
      'Capacity': '128GB',
      'Class': 'Class 10 / UHS-I',
      'Pre-loaded': 'Yes, Custom OS + ROMs',
    },
    rating: 4.7,
    reviews: [
      { user: 'Rohan B.', comment: 'So many PS1 and PSP games included! Totally worth it.', rating: 5 },
      { user: 'Deepak T.', comment: 'Very fast load times compared to the stock card.', rating: 4 }
    ]
  }
];
