"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/UI/Reveal";
import MagneticButton from "@/components/UI/MagneticButton";

const product = {
  name: "R36MAX Retro Handheld Game Console",
  price: 49,
  sku: "R36MAX",
  description:
    "A compact retro handheld built for true enthusiasts. 4.0-inch 1:1 HD IPS display, 64GB storage, dual 3D joysticks, and 18,000+ built-in games across 30+ emulators.",
  highlights: [
    "4.0-inch 720x720 IPS square display perfect for retro scaling",
    "Built-in library of over 18,000 classic titles",
    "64GB flash storage (Dual MicroSD slots for OS and Games)",
    "Rockchip RK3326 Quad-Core with 1GB RAM for smooth 60fps play",
    "Large 4000mAh battery for 6-8 hours of continuous gaming",
  ],
  features: [
    { label: "Display", value: "4.0-inch IPS Full-Fit Laminated OCA (720x720)" },
    { label: "Storage", value: "Dual MicroSD slots (64GB card included)" },
    { label: "Battery", value: "4000mAh Li-polymer (6-8 hours)" },
    { label: "Connectivity", value: "USB-C OTG, 3.5mm Jack (No internal Wi-Fi)" },
    { label: "CPU", value: "Rockchip RK3326 Quad-Core (1.5GHz)" },
  ],
  images: [
    { src: "/console-listing.png", alt: "R36MAX console listing view" },
    { src: "/console-front.png", alt: "R36MAX front console view" },
    { src: "/console-back.png", alt: "R36MAX back console view" },
  ],
};

type DeliveryForm = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

const initialDeliveryForm: DeliveryForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [delivery, setDelivery] = useState(initialDeliveryForm);
  const [status, setStatus] = useState<string>("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = useMemo(() => product.price * cartCount, [cartCount]);

  function handleAddToCart() {
    setCartCount((current) => current + Math.max(1, quantity));
    setStatus("Added to cart.");
    setOrderPlaced(false);
  }

  function handleChange(field: keyof DeliveryForm, value: string) {
    setDelivery((form) => ({ ...form, [field]: value }));
  }

  function handleOrderSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (cartCount === 0) {
      setStatus("Please add the console to your cart before placing your order.");
      return;
    }

    const missingField = Object.entries(delivery).find(([, value]) => !value.trim());
    if (missingField) {
      setStatus("Please complete all delivery fields before submitting.");
      return;
    }

    setStatus(
      "Order confirmed. Your R36MAX is reserved for Cash on Delivery, and the courier will contact you for shipment details."
    );
    setOrderPlaced(true);
  }

  return (
    <main className="bg-bg text-white">
      <section className="section-pad mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-secondary/20 px-4 py-1 text-xs uppercase tracking-[0.35em] text-secondary">
              Cash on Delivery only
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-4 max-w-2xl text-white/70">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-full bg-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/20">
              Back to Home
            </Link>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.45fr_0.9fr]">
          <div className="space-y-8">
            <Reveal>
              <div className="grid gap-5 rounded-3xl border border-borderc bg-black/60 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909] p-6">
                  <Image
                    src={product.images[selectedImage].src}
                    alt={product.images[selectedImage].alt}
                    width={720}
                    height={520}
                    className="h-auto w-full rounded-[1.5rem] object-contain"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {product.images.map((image, index) => (
                    <button
                      key={image.src}
                      onClick={() => setSelectedImage(index)}
                      className={`overflow-hidden rounded-3xl border p-2 transition-all duration-300 ${
                        selectedImage === index
                          ? "border-accent shadow-[0_0_30px_rgba(46,197,255,0.35)]"
                          : "border-borderc bg-white/5 hover:border-white/30"
                      }`}
                      type="button"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={240}
                        height={160}
                        className="h-24 w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="up">
              <div className="rounded-3xl border border-borderc bg-black/60 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <h2 className="font-display text-2xl font-bold">Why buy R36MAX?</h2>
                <ul className="mt-6 space-y-3 text-sm text-white/70">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="space-y-8">
            <Reveal>
              <div className="rounded-[2rem] border border-borderc bg-black/70 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-white/50">Price</p>
                    <p className="mt-2 text-4xl font-bold text-white">${product.price}</p>
                  </div>
                  <span className="rounded-full bg-secondary/15 px-4 py-2 text-xs uppercase tracking-[0.35em] text-secondary">
                    Ready to ship
                  </span>
                </div>

                <div className="mt-6 space-y-4 rounded-3xl bg-white/5 p-5">
                  <div className="flex items-center justify-between gap-3 rounded-3xl bg-white/5 p-4">
                    <div>
                      <p className="text-sm text-white/70">Quantity</p>
                      <p className="text-2xl font-bold text-white">{quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                        className="rounded-full bg-white/10 px-3 py-2 text-xl text-white transition hover:bg-white/15"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuantity((value) => value + 1)}
                        className="rounded-full bg-white/10 px-3 py-2 text-xl text-white transition hover:bg-white/15"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    Add to cart
                  </button>

                  <div className="rounded-3xl bg-white/5 p-4 text-sm text-white/70">
                    <p>Cart items: <span className="font-semibold text-white">{cartCount}</span></p>
                    <p className="mt-2">Order total: <span className="font-semibold text-white">${subtotal}</span></p>
                    <p className="mt-3 text-xs uppercase tracking-[0.3em] text-accent">
                      Cash on Delivery only
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up">
              <form
                onSubmit={handleOrderSubmit}
                className="rounded-[2rem] border border-borderc bg-black/70 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold">Delivery details</h2>
                    <p className="mt-2 text-sm text-white/60">
                      Enter your shipping address and place the order with Cash on Delivery.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <label className="space-y-2 text-sm text-white/70">
                    Full name
                    <input
                      value={delivery.fullName}
                      onChange={(event) => handleChange("fullName", event.target.value)}
                      className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
                      placeholder="Alex Carter"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-white/70">
                    Phone number
                    <input
                      value={delivery.phone}
                      onChange={(event) => handleChange("phone", event.target.value)}
                      className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
                      placeholder="+1 555 123 4567"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-white/70">
                    Delivery address
                    <input
                      value={delivery.address}
                      onChange={(event) => handleChange("address", event.target.value)}
                      className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
                      placeholder="123 Arcade Lane"
                    />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-white/70">
                      City
                      <input
                        value={delivery.city}
                        onChange={(event) => handleChange("city", event.target.value)}
                        className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
                        placeholder="Los Angeles"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-white/70">
                      State / region
                      <input
                        value={delivery.state}
                        onChange={(event) => handleChange("state", event.target.value)}
                        className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
                        placeholder="California"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-white/70">
                      Postal code
                      <input
                        value={delivery.zip}
                        onChange={(event) => handleChange("zip", event.target.value)}
                        className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
                        placeholder="90001"
                      />
                    </label>
                    <label className="space-y-2 text-sm text-white/70">
                      Country
                      <input
                        value={delivery.country}
                        onChange={(event) => handleChange("country", event.target.value)}
                        className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-accent"
                        placeholder="United States"
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-white/70">Payment method</p>
                    <p className="text-lg font-semibold text-white">Cash on Delivery</p>
                  </div>

                  <MagneticButton type="submit" variant="secondary">
                    Place Order
                  </MagneticButton>
                </div>

                {status && (
                  <p className={`mt-5 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm ${
                    orderPlaced ? "text-emerald-300" : "text-amber-200"
                  }`}>
                    {status}
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-borderc bg-[#060606] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-3">
              {product.features.map((feature) => (
                <div key={feature.label} className="rounded-3xl border border-borderc bg-black/60 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-white/50">{feature.label}</p>
                  <p className="mt-4 text-lg font-semibold text-white">{feature.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
