---
layout: page
title: "Proximity to Jamming Governs Acoustic Attenuation in Damped Packings"
description: A grain-scale "Jammed-Network Scattering" framework that explains the long-standing linear frequency dependence of acoustic attenuation in fluid-saturated granular media, using particle-based simulations.
img: assets/img/jns/experimentalData.png
category: work
importance: 1
date: 2026-08-31
github: https://github.com/ColtonKawamura/jammed-network-scattering
related_posts: true
---

<div class="row justify-content-sm-center">
    <div class="col-sm-10 mt-3">
       {% include figure.liquid path="assets/img/jns/experimentalData.png" title="Fig. 1 — Experimental and field measurements of acoustic attenuation coefficient vs. frequency from marine sediment studies." loading="eager" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig. 1.</strong> Measured spatial <em>attenuation</em> (how fast a sound wave weakens) versus frequency, compiled from field and lab experiments on water- and oil-saturated sediments. Over roughly a million-fold span of frequency (tens of Hz to ~1 MHz) the data follow a clean <strong>quadratic</strong> law ($\alpha \propto f^2$) at low frequency but flatten into a nearly <strong>linear</strong> law ($\alpha \propto f$) at higher frequency. No grain-scale model had previously explained that transition.
</div>

## The problem, in one sentence

When you send a sound wave through water-saturated sand, gravel, or mud, the wave grows fainter with distance. That fading — its <em>attenuation</em> — has long been observed to grow **faster** with frequency at low frequencies (quadratically) and **slower** at high frequencies (roughly linearly). Nobody had a grain-scale explanation for that crossover.

## Why it is hard

Fluid-saturated granular solids are <em>jamming</em> systems: a pile of solid grains (much stiffer than the liquid between them) held in a disordered, just-barely-stable contact network, like sand packed a little too tightly. The way such a network is jammed is known to control its vibrations, yet existing acoustic models (Biot–Stoll, Grain Shear) treat the solid skeleton as a smooth, uniform material and ignore that messy contact network. As a result they cannot, from first principles, produce the flat, high-frequency linear attenuation that the experiments show.

## What this research does

Using particle-based ("discrete element") numerical simulations, the authors modeled a fluid-saturated packing **grain by grain**, including the liquid and realistic energy loss at each grain–grain contact. They then followed sound waves — and the underlying vibrational <em>normal modes</em> — of that packing as they swept three knobs: the <em>frequency</em>, the <em>confining pressure</em>, and the <em>grain-contact damping</em>.

## The central finding: a pressure-controlled crossover

Both the vibrational modes and the propagating waves undergo a sharp, coordinated transition at one and the same <em>critical frequency</em> that is set entirely by the system's <em>proximity to jamming</em> — physically, the confining pressure:

$$\hat{\omega}_c = \hat{P}^{1/2}$$

- **Below** this frequency, grains move together in **coherent, wave-like** fashion. Attenuation is ordinary and <em>viscous</em>: it scales **quadratically** with frequency and **linearly** with grain-contact damping ($\hat{\alpha} \propto \hat{\gamma}\,\hat{\omega}^2$). This matches classical, fluid-based theory.
- **Above** this frequency, the grains move **incoherently**, scattering off one another. Attenuation instead scales **linearly** with frequency and only <em>weakly</em> (sub-linearly) with contact damping — the mysterious regime that experiments had seen but no one could explain.

The fact that the same pressure-set frequency governs <em>both</em> the modes and the waves, in <em>both</em> shear and compression waves, is the signature that the mechanism is geometric (the structure of the contact network near jamming) rather than a property of the fluid.

## Why this matters

This picture is named **Jammed-Network Scattering (JNS)**, and it makes a striking, parameter-free prediction. Plugging in realistic numbers for water-saturated silica sand, the predicted crossover comes out to

$$f_c \approx \frac{c}{2\pi d}\left[\tfrac{3}{4}(1-\nu^2)\frac{\Delta\rho\, g\, h}{E}\right]^{1/3} \;\approx\; 2.03\ \text{kHz}$$

which lands almost exactly where the experimental data switch from the quadratic to the linear regime. In other words, the long-standing $\alpha \propto f$ behavior of sediments is not an unexplained fluid mystery — it is the natural result of sound travelling near the jamming point, scattering off a disordered contact network. That reframes the acoustics of the ocean floor, soil, and granular materials, and points the way toward grain-scale, physics-based (rather than empirically fit) acoustic models.

---

## The figures

Every figure from the manuscript is shown below, grouped by the story each tells.

### The experiments this explains

**Fig. 1 — Attenuation data.** Experimental and field measurements of the spatial attenuation coefficient $\alpha$ versus frequency from marine sediment studies. At low frequency the data follow $\alpha \propto f^2$ (viscous); at higher frequency they bend over to a nearly linear $\alpha \propto f$.

{% include figure.liquid path="assets/img/jns/experimentalData.png" title="Fig. 1 — Attenuation vs. frequency from marine sediment experiments." loading="lazy" class="img-fluid rounded z-depth-1" %}

**Fig. 2 — The simulation setup.** Oscillation simulations that generate the wave-propagation data. Particles within one diameter of the wall at $x=0$ are driven sinusoidally. Panel (a) is a compression wave at large pressure; panel (b) is a shear wave at small pressure.

{% include figure.liquid path="assets/img/jns/packingOscillation_compression.png" title="Fig. 2(a) — Compression wave at high pressure." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/packingOscillation_shear.png" title="Fig. 2(b) — Shear wave at low pressure." loading="lazy" class="img-fluid rounded z-depth-1" %}

### The modes: the origin of two regimes

**Fig. 3 — Modes and the crossover.** The damped vibrational modes plotted in the attenuation–frequency plane ($\hat{\beta}_i/\hat{\gamma}$ vs. $\hat{\omega}_i$) across many pressures ($\hat{P}$, symbol color) and damping levels. The top row is raw frequency; the bottom row is scaled by $\hat{\omega}_c$, which collapses the curves. The data show a clean quadratic rise at low frequency ($\hat{\beta}_i \propto \hat{\omega}_i^2$) that bends to a flatter scaling above the crossover $\hat{\omega}_c = \hat{P}^{1/2}$.

{% include figure.liquid path="assets/img/jns/modes_first_fig.png" title="Fig. 3a — Decay rate vs. frequency at two pressures." loading="lazy" class="img-fluid rounded z-depth-1" %}

The figure also visualizes individual modes: a plane-wave-type mode (a), a mode near the transition (c), a localized "scattering" mode (d), and a plane-wave mode in a large packing (e).

{% include figure.liquid path="assets/img/jns/big_mode.png" title="Fig. 3b — A typical plane-wave-type mode." loading="lazy" class="img-fluid rounded z-depth-1" %}

**Fig. 4 — Modes across the whole parameter space.** The same attenuation–frequency plot for a wide range of damping values, with colors spanning the full pressure range so the universal crossover at $\hat{\omega}_c = \hat{P}^{1/2}$ is obvious.

{% include figure.liquid path="assets/img/jns/Fig3all_wide.png" title="Fig. 4 — Modes across all pressures and damping levels." loading="lazy" class="img-fluid rounded z-depth-1" %}

### Wave speed: a self-consistency check

**Fig. 5 — Wavespeed.** Panel (a): dimensionless wavespeed $\hat{c}$ versus grain-contact damping $\hat{\gamma}$, showing the waves are nearly insensitive to damping in the low-damping regime. Panels (b) and (c): fitted shear- and compression-wave speeds versus pressure, each recovering the well-established $P^{1/2}$ scaling of jammed packings — confirming the simulation reproduces known elastic physics before damping and scattering enter the picture.

{% include figure.liquid path="assets/img/jns/wavespeedCombined.png" title="Fig. 5(a) — Wavespeed vs. damping." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/shearModulusFit.png" title="Fig. 5(b) — Shear wavespeed vs. pressure." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/compModulusFit.png" title="Fig. 5(c) — Compression wavespeed vs. pressure." loading="lazy" class="img-fluid rounded z-depth-1" %}

### Where dissipation comes from

**Fig. 6 — Attenuation versus grain-contact damping.** Attenuation $\hat{\alpha}$ versus $\hat{\gamma}$ at moderate pressure, for (a) compression and (b) shear waves. Below $\hat{\omega}_c$ the curves are evenly spaced and grow linearly with $\hat{\gamma}$ (viscous); above $\hat{\omega}_c$ the damping dependence weakens markedly, signaling scattering-dominated attenuation.

{% include figure.liquid path="assets/img/jns/atten_gamma_medP.png" title="Fig. 6(a) — Compression attenuation vs. damping." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/atten_gamma_medP_Shear.png" title="Fig. 6(b) — Shear attenuation vs. damping." loading="lazy" class="img-fluid rounded z-depth-1" %}

**Fig. 7 — Compression waves in the two regimes.** Panel (a,b): instantaneous particle displacement along the channel (longitudinal in blue, transverse in orange) for $\hat{\omega}<\hat{\omega}_c$ (a) and $\hat{\omega}>\hat{\omega}_c$ (b). Panel (c,d): oscillation amplitude vs. position. Panel (e,f): the wrapped phase. In the viscous regime (left column) the longitudinal motion is smooth and coherent with $A_y \ll A_x$; in the scattering regime (right column) the motion becomes disordered and $A_y \sim A_x$ — with a near-complete loss of phase coherence.

{% include figure.liquid path="assets/img/jns/plotXYDisplacement_pHigh_compression_nonDisPaper.png" title="Fig. 7(a) — Compression displacement, viscous regime." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/plotXYDisplacement_pLow_compression_nonDisPaper.png" title="Fig. 7(b) — Compression displacement, scattering regime." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/plotAmpCompClass.png" title="Fig. 7(c) — Compression amplitude, viscous regime." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/plotAmpCompScatter.png" title="Fig. 7(d) — Compression amplitude, scattering regime." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/plotPhaseCompClass.png" title="Fig. 7(e) — Compression phase, viscous regime." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/plotPhaseCompScatter.png" title="Fig. 7(f) — Compression phase, scattering regime." loading="lazy" class="img-fluid rounded z-depth-1" %}

**Fig. 8 — The same diagnostics for shear waves**, at the same parameters. In the viscous regime $A_x \ll A_y$ and the transverse phase shifts coherently (with notably more attenuation than the compression case); in the scattering regime $A_x \sim A_y$ and both phase components become disordered.

{% include figure.liquid path="assets/img/jns/plotXYDisplacement_pHigh_shear_nonDisPaper.png" title="Fig. 8(a) — Shear displacement, viscous regime." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/plotXYDisplacement_pLow_shear_nonDisPaper.png" title="Fig. 8(b) — Shear displacement, scattering regime." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/plotAmpShearClass.png" title="Fig. 8(c) — Shear amplitude, viscous regime." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/plotAmpShearScatter.png" title="Fig. 8(d) — Shear amplitude, scattering regime." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/plotPhaseShearClass.png" title="Fig. 8(e) — Shear phase, viscous regime." loading="lazy" class="img-fluid rounded z-depth-1" %}

{% include figure.liquid path="assets/img/jns/plotPhaseShearScatter.png" title="Fig. 8(f) — Shear phase, scattering regime." loading="lazy" class="img-fluid rounded z-depth-1" %}

### Attenuation versus frequency

**Fig. 9 — Shear-wave attenuation vs. frequency.** Attenuation normalized by $\hat{\gamma}$ (top) and by a sublinear coefficient $\hat{\gamma}^{a}$ (bottom), plotted against $\hat{\omega}/\hat{\omega}_c$ for a range of $\hat{P}$ and $\hat{\gamma}$. Below $\hat{\omega}_c$ the data collapse onto a single slope-2 curve ($\hat{\alpha}\propto\hat{\gamma}\hat{\omega}^2$); above it they spread, indicating the breakdown of linear damping. Bracketed reference lines mark slopes 1 and 1/3.

{% include figure.liquid path="assets/img/jns/attenOmega_shear.png" title="Fig. 9 — Shear attenuation vs. frequency." loading="lazy" class="img-fluid rounded z-depth-1" %}

**Fig. 10 — Compression-wave attenuation vs. frequency.** Attenuation normalized by $\hat{\gamma}$ (top) and by $\hat{\gamma}^{b}\hat{P}^{1/4}$ (bottom) versus $\hat{\omega}/\hat{\omega}_c$. Below $\hat{\omega}_c$ the same $\hat{\alpha}\propto\hat{\gamma}\hat{\omega}^2$ behavior appears, but — unlike shear — a residual pressure dependence remains. This $P^{1/4}$ scaling is the same pressure dependence seen in the compression-wave speed above.

{% include figure.liquid path="assets/img/jns/attenOmega_comp.png" title="Fig. 10 — Compression attenuation vs. frequency." loading="lazy" class="img-fluid rounded z-depth-1" %}

---

## The simulation framework

The figures above were generated with <strong>GranMA</strong> (Granular Media Acoustics), a particle-based simulation and post-processing framework that pairs a MATLAB molecular-dynamics engine with a Julia analysis backend. It handles packing generation, wave-propagation simulation, and data analysis, and is where all of these results were produced.

- **Manuscript and figures:** [jammed-network-scattering](https://github.com/ColtonKawamura/jammed-network-scattering)
- **Simulation framework:** [GranMA](https://github.com/ColtonKawamura/GranMA)

## Read more

- **Pre-publication (arXiv):** [arXiv:2608.28157](https://arxiv.org/abs/2608.28157)
- **Related post on this site:** [An arXiv preview of this paper →](/blog/2026-08-31/acoustic-damping-granular/)
