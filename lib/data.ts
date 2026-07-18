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
