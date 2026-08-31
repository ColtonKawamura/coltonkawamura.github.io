---
layout: post
title: arXiv preview of Scaling and Trade-offs in Multi-agent Autonomous Systems
date: 2026-08-28
description: A deep dive into designing autonomous drone swarms with dimensional analysis and scaling laws
tags: multi-agent systems autonomous systems swarms research
categories: papers
---

[Read the full paper preview →](https://arxiv.org/abs/2603.10743)


Designing a large autonomous drone swarm forces the engineer to choose across a very wide design space simultaneously: the **platform** (speed, sensing range, weapon range, mass), the **algorithmic layer** (cooperative control, path planning, target allocation), and the **numerical-strength parameters** (how many agents, how fast they move relative to one another, how quickly they are lost). Because these choices interact in nonlinear ways, there is no closed-form way to predict performance, and a brute-force search over all combinations is intractable.

## Our Approach

My collaborators and I performed large-scale **agent-based simulations** in which each drone is an autonomous agent operating under the chosen platform and algorithm. We ran these simulations across three canonical operational scenarios:

- **Swarm-on-swarm battle** — two opposing swarms engaging one another,
- **Cooperative area search with attrition** — a single swarm searching a region while agents are progressively lost, and
- **Pursuit of scattering targets** — a swarm chasing targets that move to evade it.

For each scenario we swept the key design parameters over many orders of magnitude.

## Key Findings

### Simple but counterintuitive scaling laws

By applying **dimensional analysis** and **data-scaling**, we collapsed the high-dimensional performance data onto low-dimensional **scaling functions**. These functions are mathematically compact, yet their shape is *counterintuitive* and, as far as we can tell, cannot be predicted *a priori* from first principles.

### Success–failure boundaries and "effective swarm size"

The scaling laws expose sharp **success–failure boundaries** in parameter space. At certain **break points**, performance changes abruptly. We showed that these break points can be re-expressed as a single quantity we call the **effective swarm size** — a number that folds together agent count, platform parameters, and scenario geometry into one governing variable.

### Trade-off quantification

Because the scaling functions are explicit, they let us **quantify trade-offs** directly: for a fixed mission budget, how does swapping agent count for greater velocity, sensing range, weapon range, or a lower attrition rate shift the probability of mission success? These trade-offs can be read off a single curve rather than requiring a new simulation.

### Path-planning loop

We further demonstrated that embedding an **optimal path-planning loop** inside the swarm algorithm *qualitatively improves* the governing scaling laws, shifting the effective operating regime to more favourable regions of parameter space.

## What We Propose

The methods we developed are **scenario-agnostic and highly flexible**. Taken together, they provide a route to **rapid, budget-aware sizing and algorithm selection** for large autonomous swarms: instead of simulating thousands of design variants, the designer can consult a small set of scaling functions that already encode the dominant physics of the problem and flag where the most critical performance transitions lie.

