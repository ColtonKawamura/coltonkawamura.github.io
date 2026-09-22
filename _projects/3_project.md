---
layout: page
title: "Apple LLM Performance Tracker"
description: Which open-weight models actually run well on which Apple silicon, and through which engine — per CPU, memory and machine count, from M1 to M5 Ultra.
img: assets/img/apple-llm-performance/og-card.jpg
category: work
importance: 1
date: 2026-09-21
github: https://github.com/ColtonKawamura/apple-llm-performance
related_posts: true
---

<div class="row justify-content-sm-center">
    <div class="col-sm-10 mt-3">
       {% include figure.liquid path="assets/img/apple-llm-performance/tracker-list.png" title="The tracker configured for one M5 Ultra machine with 256 GB: per model it reports the best engine, the build size, and the memory left over for KV." loading="eager" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>The page, live.</strong> Pick a CPU model, a memory size and a machine count, and every row answers three questions: <em>does this model fit here</em>, <em>through which engine and which quant</em>, and <em>what is left over for KV</em>. Deep link with the state in the URL, e.g. <a href="https://coltonkawamura.github.io/apple-llm-performance/?chip=m5ultra&mem=256&n=1">?chip=m5ultra&amp;mem=256&amp;n=1</a>.
</div>

## The problem, in one sentence

The model cards say what a model needs; they do not say what <em>your</em> Mac can do with it. A 27B dense model and a 284B MoE model can both nominally fit in 256 GB, but only one of them is actually fast there — because the difference is bandwidth, not capacity, and the right answer changes with the engine you load it through.

## What the page does

- **Cluster picker.** Every Apple silicon generation from M1 through M5 Ultra, 96 GB to 512 GB per machine, up to six machines pooled. The pooled arithmetic is explicit: 2 × M5 Ultra is 512 GB pooled, and a model spread across machines still pays the Thunderbolt hop on every token.
- **One row per model.** Status (runs / runs degraded / purpose-built / too large), the best engine for that cluster, the build the engine should load at that memory size, and the free memory after the weights are resident.
- **One card per model.** Architecture, licence, context, a written verdict, the quant ladder with <em>measured</em> bits-per-weight, the fidelity band (with the published evidence behind each threshold), the per-token KV cost derived from the model's own `config.json`, and the tracked upstream issues — Apple-silicon ones only.
- **Ten use-case categories** (agentic, coding, terminal work, image generation, TTS, ...) with curated rankings. The rankings are explicit lists with evidence, not a computed score — Terminal-Bench 2.0 and Terminal-Bench 2.1 are different tests, and the page refuses to rank across them.

## Engines covered

| Engine                                                   | Format                               | Interface                    |
| -------------------------------------------------------- | ------------------------------------ | ---------------------------- |
| [llama.cpp](https://github.com/ggml-org/llama.cpp)       | GGUF                                 | CLI + `llama-server`         |
| [Ollama](https://github.com/ollama/ollama)               | MLX on Apple silicon, GGUF elsewhere | background server + CLI      |
| [LM Studio](https://lmstudio.ai)                         | GGUF and MLX                         | desktop app + `lms` + server |
| [oMLX](https://github.com/jundot/omlx)                   | MLX                                  | menu-bar app + server        |
| [vLLM Metal](https://github.com/vllm-project/vllm-metal) | MLX                                  | CLI + the vLLM server        |
| [vllm-mlx](https://github.com/waybarrios/vllm-mlx)       | MLX                                  | server                       |
| [mlx-lm](https://github.com/ml-explore/mlx-lm)           | MLX                                  | CLI + `mlx_lm.server`        |
| [DwarfStar / ds4](https://github.com/antirez/ds4)        | purpose-built GGUF                   | CLI + server + agent         |

Plus a separate set for generative media — [mflux](https://github.com/filipstrand/mflux), [MLX-Audio](https://github.com/Blaizzy/mlx-audio), [MLX-Video](https://github.com/Blaizzy/mlx-video), [DiffusionKit](https://github.com/argmaxinc/DiffusionKit) — because none of the text servers can load a diffusion or audio model.

## How the numbers are derived

- **Weights** are summed file sizes from the linked Hugging Face repositories — measured, not estimated.
- **Bits per weight** is `bytes * 8 / total parameters`, the effective figure rather than whatever the quant is named. Those diverge badly on MoE models: GLM-5.2's `UD-IQ1_S` is really 2.33 bpw because the non-expert tensors are carried at higher precision.
- **KV cost per token** counts only the layers whose cache actually grows with context — sliding-window layers are bounded by the window, and linear/Mamba layers hold a fixed recurrent state, so neither belongs in a per-token figure.
- **Fit** assumes a 90% wired-memory limit plus framework overhead (~10 GB for an LLM server, ~1.5 GB for an image or audio runtime). It answers "does this load", not "does this run well".

Nothing on the page has been benchmarked on the hardware by us: benchmark scores are vendor- or aggregator-reported, issue states are a twice-daily snapshot, and every memory figure is arithmetic over published specifications. Every number links to where it came from — that is the whole point of the project.

## The code

Standard-library Python only, no dependencies. The data is one record, one file (`data/models/<id>.py`, `data/engines/<id>.py`, ...), so two people adding two different models never touch the same file. `tracker/validate.py` machine-checks every record, `tracker/build.py` renders the single-file page, and a twice-daily workflow re-polls the tracked issue states from GitHub and deploys the change.

## Fork and lineage

This project is a fork of [dreamingwell/apple-llm-performance](https://github.com/dreamingwell/apple-llm-performance), the upstream that first assembled the model, engine and use-case records. It is kept in sync with upstream and is being slowly adapted to its own purpose as it diverges. The canonical home is the Pages site served from this repository; the page's Open Graph and canonical tags, and the "Open source" link in its header, point here rather than at the upstream author's Pages site.

- **Live page (canonical):** <a href="https://coltonkawamura.github.io/apple-llm-performance/">coltonkawamura.github.io/apple-llm-performance</a>
- **Fork repository:** <a href="https://github.com/ColtonKawamura/apple-llm-performance">github.com/ColtonKawamura/apple-llm-performance</a>
- **Upstream:** <a href="https://github.com/dreamingwell/apple-llm-performance">github.com/dreamingwell/apple-llm-performance</a>
