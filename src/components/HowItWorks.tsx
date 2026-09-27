"use client";

export function HowItWorks() {
  return (
    <section id="how" className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Pons bonding curve",
              body: "GARRI launched on Pons. While the curve is open, the price moves with buys and sells against the reserves on that curve.",
            },
            {
              title: "Graduation at 4.2 ETH",
              body: "When the curve holds 4.2 ETH of real reserves, it graduates. Liquidity moves into a permanently locked Uniswap v4 pool.",
            },
            {
              title: "Same contract",
              body: "The token contract does not change after graduation. Always confirm 0xdDDF7AB756C35b4d0537825497e6932780710241 before you buy.",
            },
            {
              title: "After the pool",
              body: "Once graduated, trading continues in the locked Uniswap v4 pool on Robinhood Chain. The official Pons listing remains the reference buy link.",
            },
          ].map((card) => (
            <article key={card.title} className="rounded-3xl border border-charcoal/10 bg-white p-6">
              <h3 className="font-display text-2xl">{card.title}</h3>
              <p className="mt-3 wrap-anywhere leading-7 text-charcoal/80">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
