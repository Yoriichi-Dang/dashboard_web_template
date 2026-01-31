# Product Requirements Document (PRD)
# AI-Powered Adaptive Learning Agent System

**Version:** 1.0
**Date:** January 31, 2026
**Author:** Product Team
**Status:** Draft

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Objectives](#3-goals--objectives)
4. [User Personas](#4-user-personas)
5. [User Stories & Use Cases](#5-user-stories--use-cases)
6. [Functional Requirements](#6-functional-requirements)
7. [System Architecture](#7-system-architecture)
8. [Feature Specifications](#8-feature-specifications)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Success Metrics](#10-success-metrics)
11. [Risks & Mitigations](#11-risks--mitigations)
12. [Roadmap & Milestones](#12-roadmap--milestones)
13. [Appendix](#13-appendix)

---

## 1. Executive Summary

### 1.1 Product Vision

Build an **AI-powered adaptive learning agent** that creates personalized learning roadmaps through conversational assessment, generates custom educational content with AI-generated visuals, and adapts to each learner's pace and comprehension level.

### 1.2 Value Proposition

| For | Who | Our Product | Unlike | Key Differentiator |
|-----|-----|-------------|--------|-------------------|
| Self-learners | Want to acquire new skills efficiently | Provides AI-driven personalized learning paths | Traditional courses (Udemy, Coursera) | Adaptive content generation based on individual assessment + focus on core problem-solving fundamentals |

### 1.3 Key Features Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AI Learning Agent System                         │
├─────────────────────────────────────────────────────────────────────┤
│  1. Conversational Needs Assessment                                 │
│  2. Intelligent Roadmap Generation                                  │
│  3. Dynamic Content Creation (Theory + Visuals + Examples)          │
│  4. Progressive Exercise System                                     │
│  5. Spaced Repetition & Knowledge Retention                         │
│  6. Flexible Learning Schedule                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Problem Statement

### 2.1 Current Pain Points

| Problem | Impact | Evidence |
|---------|--------|----------|
| **One-size-fits-all courses** | Low completion rates (~10-15% for MOOCs) | Users drop off when content doesn't match their level |
| **No personalization** | Wasted time on known topics or struggling with gaps | Users skip randomly or get stuck |
| **Passive learning** | Poor knowledge retention | Learners forget 70% within 24 hours without practice |
| **Fragmented resources** | Overwhelmed learners, analysis paralysis | Too many options, no clear path |
| **No focus on fundamentals** | Surface-level understanding | Learners can't apply knowledge to new problems |

### 2.2 Target Problem Statement

> "Learners struggle to find personalized, adaptive learning paths that assess their current level, teach core fundamentals effectively, and adapt to their schedule and learning pace."

---

## 3. Goals & Objectives

### 3.1 Business Goals

| Goal | Metric | Target |
|------|--------|--------|
| User Acquisition | Monthly Active Users (MAU) | 10,000 in 6 months |
| User Retention | 30-day retention rate | > 40% |
| Learning Completion | Roadmap completion rate | > 60% |
| Revenue | Premium conversion rate | > 5% |

### 3.2 Product Goals

| Goal | Description | Success Criteria |
|------|-------------|------------------|
| **Personalization** | Tailor learning to individual needs | 90% users report "relevant content" |
| **Comprehension** | Ensure deep understanding of fundamentals | 80% pass retention quizzes |
| **Engagement** | Keep users motivated and active | Average 3+ sessions/week |
| **Flexibility** | Adapt to user's schedule | Support async learning patterns |

### 3.3 User Goals

1. Learn new skills efficiently without wasting time on irrelevant content
2. Build strong foundational understanding before advancing
3. Apply knowledge to real-world problems
4. Track progress and stay motivated

---

## 4. User Personas

### 4.1 Primary Persona: The Career Switcher

```
┌─────────────────────────────────────────────────────────────────┐
│  👤 SARAH - Career Switcher                                     │
├─────────────────────────────────────────────────────────────────┤
│  Age: 28 | Marketing Manager → Backend Developer                │
│  Tech Comfort: Intermediate | Time Available: 10 hrs/week       │
├─────────────────────────────────────────────────────────────────┤
│  GOALS                          │  FRUSTRATIONS                 │
│  • Learn backend development    │  • Courses too basic or       │
│  • Build portfolio projects     │    too advanced               │
│  • Get job in 6 months          │  • No clear learning path     │
│                                 │  • Can't assess own progress  │
├─────────────────────────────────────────────────────────────────┤
│  BEHAVIORS                                                      │
│  • Learns in evenings after work                                │
│  • Prefers hands-on projects over theory                        │
│  • Needs structured guidance                                    │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Secondary Persona: The Skill Enhancer

```
┌─────────────────────────────────────────────────────────────────┐
│  👤 DAVID - Skill Enhancer                                      │
├─────────────────────────────────────────────────────────────────┤
│  Age: 35 | Current Developer → Learning English Communication  │
│  Tech Comfort: Advanced | Time Available: 5 hrs/week            │
├─────────────────────────────────────────────────────────────────┤
│  GOALS                          │  FRUSTRATIONS                 │
│  • Improve business English     │  • Generic English courses    │
│  • Communicate in meetings      │  • No tech context            │
│  • Write professional emails    │  • Boring repetitive content  │
├─────────────────────────────────────────────────────────────────┤
│  BEHAVIORS                                                      │
│  • Short learning sessions (15-30 min)                          │
│  • Wants practical, applicable skills                           │
│  • Values efficiency over comprehensiveness                     │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Tertiary Persona: The Student Learner

```
┌─────────────────────────────────────────────────────────────────┐
│  👤 MINH - University Student                                   │
├─────────────────────────────────────────────────────────────────┤
│  Age: 21 | CS Student wanting practical skills                  │
│  Tech Comfort: Beginner-Intermediate | Time: Flexible           │
├─────────────────────────────────────────────────────────────────┤
│  GOALS                          │  FRUSTRATIONS                 │
│  • Supplement university        │  • Theory-heavy courses       │
│  • Build real projects          │  • No real-world context      │
│  • Prepare for internships      │  • Outdated curriculum        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. User Stories & Use Cases

### 5.1 Epic: Needs Assessment

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| US-001 | As a learner, I want to tell the AI what I want to learn so it understands my goals | P0 | AI correctly identifies learning topic(s) |
| US-002 | As a learner, I want the AI to ask about my current knowledge level so content matches my skills | P0 | Assessment covers 5-10 key competency areas |
| US-003 | As a learner, I want to share my learning goals so the roadmap aligns with my objectives | P0 | Goals captured and reflected in roadmap |
| US-004 | As a learner, I want to indicate my available time so the schedule is realistic | P1 | Schedule adapts to time constraints |
| US-005 | As a learner, I want to share my strengths/weaknesses so the AI can optimize my path | P1 | Personalized recommendations based on profile |

### 5.2 Epic: Roadmap Generation

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| US-010 | As a learner, I want to see a personalized learning roadmap so I know what to study | P0 | Visual roadmap with milestones |
| US-011 | As a learner, I want the roadmap to show topic relationships so I understand dependencies | P0 | Prerequisite mapping displayed |
| US-012 | As a learner, I want estimated time per topic so I can plan my schedule | P1 | Time estimates for each module |
| US-013 | As a learner, I want to adjust my roadmap so it stays relevant as I progress | P1 | Drag-drop reordering, skip topics |

### 5.3 Epic: Content Generation

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| US-020 | As a learner, I want clear theory explanations so I understand fundamentals | P0 | Content rated 4+ stars by users |
| US-021 | As a learner, I want visual diagrams so I can grasp complex concepts | P0 | AI-generated images for each lesson |
| US-022 | As a learner, I want practical examples so I see real-world applications | P0 | 2+ examples per concept |
| US-023 | As a learner, I want progressive difficulty so I'm challenged appropriately | P0 | Content scales from basic → advanced |

### 5.4 Epic: Practice & Assessment

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| US-030 | As a learner, I want exercises at my level so I can practice effectively | P0 | Difficulty matches assessed level |
| US-031 | As a learner, I want feedback on my answers so I learn from mistakes | P0 | Detailed explanations for wrong answers |
| US-032 | As a learner, I want review quizzes so I retain previous knowledge | P1 | Spaced repetition algorithm |
| US-033 | As a learner, I want problem-solving exercises so I think critically | P0 | Root-cause analysis questions |

### 5.5 Epic: Flexible Learning

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| US-040 | As a learner, I want to pause and resume anytime so learning fits my life | P0 | State preserved across sessions |
| US-041 | As a learner, I want to set my own pace so I'm not rushed | P1 | No forced deadlines |
| US-042 | As a learner, I want reminders so I stay consistent | P2 | Configurable notifications |

---

## 6. Functional Requirements

### 6.1 Conversational Assessment Engine

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Assessment Flow                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   User Input          AI Processing           Output                │
│   ───────────         ─────────────           ──────                │
│                                                                     │
│   "I want to    ───►  Intent Detection  ───►  Topic Identified     │
│    learn backend"     (NLP/LLM)               [Backend Dev]         │
│                                                                     │
│         │                                                           │
│         ▼                                                           │
│   ┌─────────────────────────────────────────────────────────┐      │
│   │         Dynamic Question Generation                      │      │
│   ├─────────────────────────────────────────────────────────┤      │
│   │  Q1: What's your current experience with programming?   │      │
│   │  Q2: Have you worked with databases before?             │      │
│   │  Q3: What's your goal? (Job, project, hobby)            │      │
│   │  Q4: How many hours/week can you dedicate?              │      │
│   │  Q5: Do you prefer theory-first or hands-on?            │      │
│   │  Q6: Any specific technologies you want to learn?       │      │
│   │  Q7: What are your strengths in learning?               │      │
│   │  Q8: What challenges do you face when learning?         │      │
│   └─────────────────────────────────────────────────────────┘      │
│                                                                     │
│         │                                                           │
│         ▼                                                           │
│   ┌─────────────────────────────────────────────────────────┐      │
│   │              Learner Profile Generated                   │      │
│   ├─────────────────────────────────────────────────────────┤      │
│   │  • Topic: Backend Development                            │      │
│   │  • Current Level: Beginner (2/10)                        │      │
│   │  • Goal: Career switch in 6 months                       │      │
│   │  • Time: 10 hrs/week                                     │      │
│   │  • Style: Hands-on learner                               │      │
│   │  • Strengths: Logical thinking, persistence              │      │
│   │  • Weaknesses: Abstract concepts, time management        │      │
│   └─────────────────────────────────────────────────────────┘      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### 6.1.1 Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-001 | System shall identify learning topic(s) from natural language input | P0 | Support multi-topic (e.g., "backend and English") |
| FR-002 | System shall generate contextual follow-up questions | P0 | 5-10 questions per topic |
| FR-003 | System shall assess current knowledge level (1-10 scale) | P0 | Based on self-report + diagnostic questions |
| FR-004 | System shall capture learning goals and timeline | P0 | - |
| FR-005 | System shall identify learning style preferences | P1 | Visual, hands-on, theoretical |
| FR-006 | System shall store learner profile for personalization | P0 | Persistent storage |

### 6.2 Research & Knowledge Synthesis Engine

```
┌─────────────────────────────────────────────────────────────────────┐
│                 Research & Synthesis Pipeline                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Topic: "Backend Development"                                       │
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │
│  │   Web        │    │   Curated    │    │   Expert     │          │
│  │   Research   │    │   Sources    │    │   Knowledge  │          │
│  │   (Gemini)   │    │   (APIs)     │    │   (LLM)      │          │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘          │
│         │                   │                   │                   │
│         └───────────────────┼───────────────────┘                   │
│                             ▼                                       │
│              ┌──────────────────────────────┐                       │
│              │    Knowledge Aggregation     │                       │
│              │    & Deduplication           │                       │
│              └──────────────┬───────────────┘                       │
│                             ▼                                       │
│              ┌──────────────────────────────┐                       │
│              │    Keyword Extraction        │                       │
│              │    & Concept Mapping         │                       │
│              └──────────────┬───────────────┘                       │
│                             ▼                                       │
│              ┌──────────────────────────────┐                       │
│              │    Relationship Analysis     │                       │
│              │    (Prerequisites, Links)    │                       │
│              └──────────────┬───────────────┘                       │
│                             ▼                                       │
│              ┌──────────────────────────────┐                       │
│              │    Structured Knowledge      │                       │
│              │    Graph Output              │                       │
│              └──────────────────────────────┘                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### 6.2.1 Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-010 | System shall research topic via web APIs | P0 | Use Gemini/search APIs |
| FR-011 | System shall extract key concepts and keywords | P0 | NLP-based extraction |
| FR-012 | System shall analyze concept relationships | P0 | Build knowledge graph |
| FR-013 | System shall identify prerequisites for each topic | P0 | Dependency mapping |
| FR-014 | System shall rate topic difficulty levels | P1 | 1-5 scale |
| FR-015 | System shall cache research results | P1 | Avoid redundant API calls |

### 6.3 Roadmap Generation Engine

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Roadmap Structure                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  PHASE 1: Foundations (Week 1-4)                            │   │
│  │  ├── Module 1.1: Programming Basics                         │   │
│  │  │   ├── Lesson 1.1.1: Variables & Data Types               │   │
│  │  │   ├── Lesson 1.1.2: Control Flow                         │   │
│  │  │   └── Lesson 1.1.3: Functions                            │   │
│  │  ├── Module 1.2: Database Fundamentals                      │   │
│  │  │   ├── Lesson 1.2.1: What is a Database?                  │   │
│  │  │   ├── Lesson 1.2.2: SQL Basics                           │   │
│  │  │   └── Lesson 1.2.3: CRUD Operations                      │   │
│  │  └── 📋 Checkpoint: Foundation Assessment                   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                             │                                       │
│                             ▼                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  PHASE 2: Core Skills (Week 5-10)                           │   │
│  │  ├── Module 2.1: API Development                            │   │
│  │  ├── Module 2.2: Authentication & Security                  │   │
│  │  ├── Module 2.3: Database Design                            │   │
│  │  └── 📋 Checkpoint: Core Skills Assessment                  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                             │                                       │
│                             ▼                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  PHASE 3: Applied Learning (Week 11-16)                     │   │
│  │  ├── Module 3.1: Project - Build REST API                   │   │
│  │  ├── Module 3.2: Project - Full-Stack Integration           │   │
│  │  └── 📋 Final Assessment                                    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### 6.3.1 Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-020 | System shall generate hierarchical roadmap (Phases → Modules → Lessons) | P0 | 3-level hierarchy |
| FR-021 | System shall order topics by prerequisites | P0 | Topological sort |
| FR-022 | System shall adjust roadmap based on learner profile | P0 | Skip known topics |
| FR-023 | System shall include checkpoints/assessments | P0 | After each phase |
| FR-024 | System shall estimate time per module | P1 | Based on complexity |
| FR-025 | System shall allow roadmap modification | P1 | User can reorder/skip |

### 6.4 Content Generation Engine

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Lesson Content Structure                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  LESSON: "What is an API?"                                  │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │                                                             │   │
│  │  📖 THEORY SECTION                                          │   │
│  │  ─────────────────                                          │   │
│  │  • Clear, concise explanation of the concept                │   │
│  │  • Focus on "why" before "how"                              │   │
│  │  • Build on previous knowledge                              │   │
│  │  • Difficulty: Adapted to learner level                     │   │
│  │                                                             │   │
│  │  🖼️ VISUAL AIDS (Generated by Gemini/DALL-E)               │   │
│  │  ─────────────────                                          │   │
│  │  • Diagram: Client-Server communication                     │   │
│  │  • Infographic: API request/response flow                   │   │
│  │  • Comparison chart: REST vs GraphQL                        │   │
│  │                                                             │   │
│  │  💡 EXAMPLES                                                │   │
│  │  ─────────────────                                          │   │
│  │  • Real-world analogy: Restaurant waiter                    │   │
│  │  • Code example: Simple GET request                         │   │
│  │  • Use case: Weather API integration                        │   │
│  │                                                             │   │
│  │  ✏️ EXERCISES (Progressive Difficulty)                      │   │
│  │  ─────────────────                                          │   │
│  │  Level 1 (Basic): Identify API endpoints                    │   │
│  │  Level 2 (Intermediate): Write a GET request                │   │
│  │  Level 3 (Advanced): Debug a failing API call               │   │
│  │  Level 4 (Expert): Design an API for a use case             │   │
│  │                                                             │   │
│  │  🧠 KEY TAKEAWAYS                                           │   │
│  │  ─────────────────                                          │   │
│  │  • 3-5 bullet points summarizing core concepts              │   │
│  │  • Focus on fundamental principles                          │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### 6.4.1 Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-030 | System shall generate theory content for each lesson | P0 | LLM-generated |
| FR-031 | System shall generate visual aids using AI image generation | P0 | Gemini Imagen/DALL-E |
| FR-032 | System shall provide real-world examples | P0 | Min 2 per concept |
| FR-033 | System shall create progressive exercises (4 levels) | P0 | Basic → Expert |
| FR-034 | System shall adapt content difficulty to learner level | P0 | Dynamic adjustment |
| FR-035 | System shall focus on fundamental understanding | P0 | Root-cause thinking |
| FR-036 | System shall provide detailed feedback on exercises | P0 | Explain correct answer |

### 6.5 Knowledge Retention System

```
┌─────────────────────────────────────────────────────────────────────┐
│              Spaced Repetition & Review System                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  REVIEW ALGORITHM                                              │ │
│  │  ─────────────────                                             │ │
│  │                                                                │ │
│  │  Lesson Completed                                              │ │
│  │       │                                                        │ │
│  │       ▼                                                        │ │
│  │  ┌─────────────┐                                               │ │
│  │  │ Review at:  │                                               │ │
│  │  │ • 1 day     │ ──► If passed: extend interval                │ │
│  │  │ • 3 days    │ ──► If failed: shorten interval + remediation │ │
│  │  │ • 7 days    │                                               │ │
│  │  │ • 14 days   │                                               │ │
│  │  │ • 30 days   │                                               │ │
│  │  └─────────────┘                                               │ │
│  │                                                                │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  REVIEW QUESTION TYPES                                         │ │
│  │  ─────────────────                                             │ │
│  │                                                                │ │
│  │  1. Concept Recall: "What is the purpose of an API?"           │ │
│  │  2. Application: "Given this scenario, how would you...?"      │ │
│  │  3. Problem-Solving: "Debug this code and explain the fix"     │ │
│  │  4. Root-Cause Analysis: "Why does this approach fail?"        │ │
│  │                                                                │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │  MASTERY TRACKING                                              │ │
│  │  ─────────────────                                             │ │
│  │                                                                │ │
│  │  Concept: "REST API Design"                                    │ │
│  │  ├── Recall Score: 85%                                         │ │
│  │  ├── Application Score: 70%                                    │ │
│  │  ├── Problem-Solving Score: 60%                                │ │
│  │  └── Overall Mastery: 72% (Proficient)                         │ │
│  │                                                                │ │
│  │  Mastery Levels:                                               │ │
│  │  • 0-40%: Needs Review                                         │ │
│  │  • 40-60%: Developing                                          │ │
│  │  • 60-80%: Proficient                                          │ │
│  │  • 80-100%: Mastered                                           │ │
│  │                                                                │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### 6.5.1 Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-040 | System shall implement spaced repetition algorithm | P1 | SM-2 or similar |
| FR-041 | System shall generate review questions | P0 | Varied question types |
| FR-042 | System shall track mastery per concept | P0 | Persistent tracking |
| FR-043 | System shall prioritize weak areas in reviews | P1 | Focus on gaps |
| FR-044 | System shall test root-cause understanding | P0 | Not memorization |

### 6.6 Flexible Learning System

#### 6.6.1 Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-050 | System shall save progress at any point | P0 | Auto-save |
| FR-051 | System shall allow pause/resume learning | P0 | Seamless continuation |
| FR-052 | System shall adapt to variable schedules | P1 | No fixed deadlines |
| FR-053 | System shall send optional reminders | P2 | User-configurable |
| FR-054 | System shall support offline access | P2 | Download lessons |

---

## 7. System Architecture

### 7.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Web App   │  │ Mobile App  │  │   Desktop   │  │   API SDK   │        │
│  │  (Next.js)  │  │ (React      │  │  (Electron) │  │             │        │
│  │             │  │  Native)    │  │             │  │             │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │                │
│         └────────────────┴────────────────┴────────────────┘                │
│                                   │                                          │
│                                   ▼                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                            API GATEWAY                                       │
│                    (Authentication, Rate Limiting)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                   │                                          │
│         ┌─────────────────────────┼─────────────────────────┐               │
│         ▼                         ▼                         ▼               │
│  ┌─────────────┐           ┌─────────────┐           ┌─────────────┐        │
│  │   User      │           │   Learning  │           │   Content   │        │
│  │   Service   │           │   Service   │           │   Service   │        │
│  └─────────────┘           └─────────────┘           └─────────────┘        │
│         │                         │                         │               │
│         │                         │                         │               │
│         ▼                         ▼                         ▼               │
├─────────────────────────────────────────────────────────────────────────────┤
│                          AI/ML LAYER                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Assessment  │  │  Research   │  │  Content    │  │   Image     │        │
│  │   Agent     │  │   Agent     │  │  Generator  │  │  Generator  │        │
│  │  (Claude)   │  │  (Gemini)   │  │  (Claude)   │  │  (Imagen)   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                          DATA LAYER                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ PostgreSQL  │  │   Redis     │  │  Pinecone   │  │  S3/GCS     │        │
│  │ (User Data) │  │  (Cache)    │  │  (Vectors)  │  │  (Assets)   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 AI Agent Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AI AGENT ORCHESTRATION                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  User Input: "I want to learn backend development"                          │
│                                                                              │
│       │                                                                      │
│       ▼                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    ORCHESTRATOR AGENT                                │    │
│  │                    (Main Controller)                                 │    │
│  └───────────────────────────┬─────────────────────────────────────────┘    │
│                              │                                               │
│       ┌──────────────────────┼──────────────────────┐                       │
│       ▼                      ▼                      ▼                       │
│  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐                │
│  │ Assessment  │       │  Research   │       │  Roadmap    │                │
│  │   Agent     │       │   Agent     │       │   Agent     │                │
│  │             │       │             │       │             │                │
│  │ • Parse     │       │ • Web       │       │ • Build     │                │
│  │   intent    │       │   search    │       │   graph     │                │
│  │ • Generate  │       │ • Aggregate │       │ • Order     │                │
│  │   questions │       │   knowledge │       │   topics    │                │
│  │ • Profile   │       │ • Extract   │       │ • Estimate  │                │
│  │   learner   │       │   concepts  │       │   time      │                │
│  └─────────────┘       └─────────────┘       └─────────────┘                │
│                                                                              │
│       ┌──────────────────────┼──────────────────────┐                       │
│       ▼                      ▼                      ▼                       │
│  ┌─────────────┐       ┌─────────────┐       ┌─────────────┐                │
│  │  Content    │       │   Image     │       │  Exercise   │                │
│  │  Generator  │       │  Generator  │       │  Generator  │                │
│  │             │       │             │       │             │                │
│  │ • Theory    │       │ • Diagrams  │       │ • Questions │                │
│  │ • Examples  │       │ • Visuals   │       │ • Projects  │                │
│  │ • Summary   │       │ • Charts    │       │ • Feedback  │                │
│  └─────────────┘       └─────────────┘       └─────────────┘                │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    REVIEW/RETENTION AGENT                            │    │
│  │                    (Spaced Repetition)                               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.3 Data Models

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATA MODELS                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────┐          ┌─────────────────────┐                   │
│  │       User          │          │   LearnerProfile    │                   │
│  ├─────────────────────┤          ├─────────────────────┤                   │
│  │ id: UUID            │──────────│ id: UUID            │                   │
│  │ email: String       │          │ userId: UUID        │                   │
│  │ name: String        │          │ goals: String[]     │                   │
│  │ createdAt: DateTime │          │ currentLevel: Int   │                   │
│  │ updatedAt: DateTime │          │ learningStyle: Enum │                   │
│  └─────────────────────┘          │ availableHours: Int │                   │
│                                   │ strengths: String[] │                   │
│                                   │ weaknesses: String[]│                   │
│                                   └─────────────────────┘                   │
│                                                                              │
│  ┌─────────────────────┐          ┌─────────────────────┐                   │
│  │      Roadmap        │          │       Phase         │                   │
│  ├─────────────────────┤          ├─────────────────────┤                   │
│  │ id: UUID            │──┐       │ id: UUID            │                   │
│  │ userId: UUID        │  │       │ roadmapId: UUID     │◄──────────────────┤
│  │ topic: String       │  │       │ title: String       │                   │
│  │ status: Enum        │  │       │ order: Int          │                   │
│  │ createdAt: DateTime │  │       │ estimatedHours: Int │                   │
│  └─────────────────────┘  │       └─────────────────────┘                   │
│                           │                                                  │
│                           │       ┌─────────────────────┐                   │
│                           │       │       Module        │                   │
│                           │       ├─────────────────────┤                   │
│                           └──────►│ id: UUID            │                   │
│                                   │ phaseId: UUID       │                   │
│                                   │ title: String       │                   │
│                                   │ order: Int          │                   │
│                                   │ difficulty: Int     │                   │
│                                   └─────────────────────┘                   │
│                                            │                                 │
│                                            ▼                                 │
│  ┌─────────────────────┐          ┌─────────────────────┐                   │
│  │       Lesson        │          │      Content        │                   │
│  ├─────────────────────┤          ├─────────────────────┤                   │
│  │ id: UUID            │──────────│ id: UUID            │                   │
│  │ moduleId: UUID      │          │ lessonId: UUID      │                   │
│  │ title: String       │          │ type: Enum          │                   │
│  │ order: Int          │          │ content: JSON       │                   │
│  │ status: Enum        │          │ mediaUrls: String[] │                   │
│  └─────────────────────┘          └─────────────────────┘                   │
│                                                                              │
│  ┌─────────────────────┐          ┌─────────────────────┐                   │
│  │      Exercise       │          │      Progress       │                   │
│  ├─────────────────────┤          ├─────────────────────┤                   │
│  │ id: UUID            │          │ id: UUID            │                   │
│  │ lessonId: UUID      │          │ userId: UUID        │                   │
│  │ type: Enum          │          │ lessonId: UUID      │                   │
│  │ difficulty: Int     │          │ status: Enum        │                   │
│  │ question: String    │          │ score: Int          │                   │
│  │ answer: JSON        │          │ completedAt: DateTime│                  │
│  │ explanation: String │          │ nextReviewAt: DateTime│                 │
│  └─────────────────────┘          └─────────────────────┘                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Feature Specifications

### 8.1 Feature: Conversational Assessment

#### 8.1.1 User Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ASSESSMENT CONVERSATION FLOW                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Step 1: Topic Input                                                         │
│  ───────────────────                                                         │
│  User: "I want to learn backend development and English communication"       │
│                                                                              │
│  AI: "Great! I'll help you create personalized learning paths for both.     │
│       Let's start with a few questions to understand your needs better."    │
│                                                                              │
│  Step 2: Current Level Assessment                                            │
│  ────────────────────────────────                                            │
│  AI: "For Backend Development:                                               │
│       - Have you written code before? If yes, which languages?               │
│       - Have you built any web applications?                                 │
│       - Are you familiar with databases?"                                    │
│                                                                              │
│  User: "I know basic Python and have made a simple website with HTML/CSS"   │
│                                                                              │
│  Step 3: Goal Clarification                                                  │
│  ──────────────────────────                                                  │
│  AI: "What's your main goal for learning backend development?"               │
│       □ Career switch to software engineering                                │
│       □ Build personal projects                                              │
│       □ Enhance current job skills                                           │
│       □ Other (please specify)                                               │
│                                                                              │
│  Step 4: Time & Schedule                                                     │
│  ───────────────────────                                                     │
│  AI: "How much time can you dedicate to learning each week?"                 │
│       □ 5 hours or less                                                      │
│       □ 5-10 hours                                                           │
│       □ 10-20 hours                                                          │
│       □ 20+ hours                                                            │
│                                                                              │
│  Step 5: Learning Preferences                                                │
│  ────────────────────────────                                                │
│  AI: "How do you prefer to learn?"                                           │
│       □ Reading and theory first, then practice                              │
│       □ Hands-on projects with theory as needed                              │
│       □ Video tutorials with exercises                                       │
│       □ Mix of all approaches                                                │
│                                                                              │
│  Step 6: Profile Summary                                                     │
│  ───────────────────────                                                     │
│  AI: "Based on our conversation, here's your learner profile:                │
│                                                                              │
│       📊 Backend Development                                                 │
│       ├── Current Level: Beginner (3/10)                                     │
│       ├── Goal: Career switch                                                │
│       ├── Timeline: 6 months                                                 │
│       └── Style: Hands-on learner                                            │
│                                                                              │
│       📊 English Communication                                               │
│       ├── Current Level: Intermediate (5/10)                                 │
│       ├── Goal: Business meetings                                            │
│       ├── Timeline: Ongoing                                                  │
│       └── Style: Practical conversation                                      │
│                                                                              │
│       Does this look accurate? [Yes, proceed] [Let me adjust]"               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 8.1.2 UI Mockup

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Back                    Learning Assistant                     Profile ○ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                     ┌────────────────────────────────────┐                  │
│                     │  🤖                                │                  │
│                     │                                    │                  │
│                     │  What would you like to learn?     │                  │
│                     │                                    │                  │
│                     │  I'll create a personalized        │                  │
│                     │  learning path just for you.       │                  │
│                     │                                    │                  │
│                     └────────────────────────────────────┘                  │
│                                                                              │
│    ┌────────────────────────────────────────────────────────────────────┐   │
│    │  I want to learn backend development and improve my English...    │   │
│    └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│                     ┌────────────────────────────────────┐                  │
│                     │  🤖                                │                  │
│                     │                                    │                  │
│                     │  Great choices! Let me ask a few   │                  │
│                     │  questions to understand your      │                  │
│                     │  current level and goals.          │                  │
│                     │                                    │                  │
│                     │  First, have you written any       │                  │
│                     │  code before?                      │                  │
│                     │                                    │                  │
│                     │  ┌──────────────────────────────┐  │                  │
│                     │  │ ○ No, I'm completely new     │  │                  │
│                     │  │ ○ Yes, basic scripting       │  │                  │
│                     │  │ ○ Yes, built small projects  │  │                  │
│                     │  │ ○ Yes, professional exp.     │  │                  │
│                     │  └──────────────────────────────┘  │                  │
│                     │                                    │                  │
│                     └────────────────────────────────────┘                  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  Type your message...                                          Send  │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Feature: Interactive Roadmap

#### 8.2.1 UI Mockup

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Back                    Your Learning Roadmap                   Edit ✏️  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Backend Development                                     Progress: 23%      │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  PHASE 1: Programming Foundations                    ✓ Completed    │    │
│  │  ─────────────────────────────────────────────────────────────────  │    │
│  │                                                                     │    │
│  │  ✓ Module 1.1: Python Basics              4 hrs    ████████████    │    │
│  │  ✓ Module 1.2: Data Structures            6 hrs    ████████████    │    │
│  │  ✓ Module 1.3: Functions & Modules        4 hrs    ████████████    │    │
│  │  ✓ Checkpoint: Foundation Quiz            1 hr     ████████████    │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│       │                                                                      │
│       ▼                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  PHASE 2: Web Development Basics                     🔄 In Progress │    │
│  │  ─────────────────────────────────────────────────────────────────  │    │
│  │                                                                     │    │
│  │  ✓ Module 2.1: HTTP & Web Basics          3 hrs    ████████████    │    │
│  │  🔄 Module 2.2: REST API Concepts         4 hrs    ████████░░░░    │    │
│  │  ○ Module 2.3: Flask Framework            6 hrs    ░░░░░░░░░░░░    │    │
│  │  ○ Module 2.4: Database Integration       5 hrs    ░░░░░░░░░░░░    │    │
│  │  ○ Checkpoint: API Project                3 hrs    ░░░░░░░░░░░░    │    │
│  │                                                                     │    │
│  │                              [Continue Learning →]                  │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│       │                                                                      │
│       ▼                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  PHASE 3: Advanced Backend                           ○ Locked       │    │
│  │  ─────────────────────────────────────────────────────────────────  │    │
│  │                                                                     │    │
│  │  ○ Module 3.1: Authentication & Security  5 hrs    ░░░░░░░░░░░░    │    │
│  │  ○ Module 3.2: Database Design            6 hrs    ░░░░░░░░░░░░    │    │
│  │  ○ Module 3.3: API Best Practices         4 hrs    ░░░░░░░░░░░░    │    │
│  │  ○ Module 3.4: Testing                    5 hrs    ░░░░░░░░░░░░    │    │
│  │                                                                     │    │
│  │  🔒 Complete Phase 2 to unlock                                      │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  📅 Today's Learning Goal: Complete Module 2.2 (~45 min remaining)   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.3 Feature: Lesson Content View

#### 8.3.1 UI Mockup

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Roadmap           Module 2.2: REST API Concepts           Progress 60%  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Lesson 2.2.1: What is an API?                                      │    │
│  │  ═══════════════════════════════════════════════════════════════    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  📖 THEORY                                                                   │
│  ─────────────────────────────────────────────────────────────────────      │
│                                                                              │
│  An **API (Application Programming Interface)** is a set of rules that      │
│  allows different software applications to communicate with each other.     │
│                                                                              │
│  Think of it like a waiter in a restaurant:                                 │
│  • You (the client) tell the waiter what you want                           │
│  • The waiter takes your order to the kitchen (the server)                  │
│  • The kitchen prepares your food and gives it to the waiter                │
│  • The waiter brings your food back to you                                  │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  │     ┌────────┐         Request          ┌────────┐                 │    │
│  │     │        │ ─────────────────────►   │        │                 │    │
│  │     │ Client │                          │ Server │                 │    │
│  │     │        │ ◄─────────────────────   │        │                 │    │
│  │     └────────┘         Response         └────────┘                 │    │
│  │                                                                     │    │
│  │     [🖼️ AI-Generated Diagram: Client-Server Communication]         │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  💡 EXAMPLE                                                                  │
│  ─────────────────────────────────────────────────────────────────────      │
│                                                                              │
│  Here's a real-world example using a weather API:                           │
│                                                                              │
│  ```python                                                                   │
│  import requests                                                             │
│                                                                              │
│  # Make a request to the weather API                                        │
│  response = requests.get("https://api.weather.com/v1/current?city=tokyo")   │
│                                                                              │
│  # Get the data from the response                                           │
│  weather_data = response.json()                                             │
│  print(f"Temperature: {weather_data['temperature']}°C")                     │
│  ```                                                                         │
│                                                                              │
│  🧠 KEY TAKEAWAYS                                                            │
│  ─────────────────────────────────────────────────────────────────────      │
│                                                                              │
│  • APIs allow applications to communicate with each other                   │
│  • The client sends requests, the server sends responses                    │
│  • APIs use standard protocols (usually HTTP/HTTPS)                         │
│  • Data is typically exchanged in JSON format                               │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  ✅ Mark as Complete            [Practice Exercises →]               │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.4 Feature: Exercise System

#### 8.4.1 UI Mockup

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Lesson              Practice Exercises                    3/4 Completed │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Exercise 3 of 4                                    Level: Advanced │    │
│  │  ═══════════════════════════════════════════════════════════════    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  🧩 PROBLEM                                                                  │
│  ─────────────────────────────────────────────────────────────────────      │
│                                                                              │
│  The following API call is failing with a 401 error. Debug the issue        │
│  and explain the root cause.                                                │
│                                                                              │
│  ```python                                                                   │
│  response = requests.get(                                                    │
│      "https://api.example.com/users",                                        │
│      headers={"Authorization": "Bearer " + token}                            │
│  )                                                                           │
│  # Error: 401 Unauthorized                                                   │
│  ```                                                                         │
│                                                                              │
│  Additional info:                                                            │
│  • The token was obtained 3 hours ago                                        │
│  • Tokens expire after 1 hour                                                │
│  • The same code worked earlier today                                        │
│                                                                              │
│  ✏️ YOUR ANSWER                                                              │
│  ─────────────────────────────────────────────────────────────────────      │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  What is the root cause of this error?                               │   │
│  │                                                                       │   │
│  │  The token has expired. Since the token was obtained 3 hours ago_    │   │
│  │                                                                       │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  How would you fix this issue?                                       │   │
│  │                                                                       │   │
│  │  Implement token refresh logic before making API calls, or_          │   │
│  │                                                                       │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  💡 Need a hint?                                                             │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  [Skip]                [Submit Answer]                               │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           FEEDBACK VIEW                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ✅ CORRECT!                                                                 │
│  ─────────────────────────────────────────────────────────────────────      │
│                                                                              │
│  Your Answer:                                                                │
│  "The token has expired. Since it was obtained 3 hours ago and tokens       │
│   expire after 1 hour, the API rejects the request."                        │
│                                                                              │
│  📝 EXPLANATION                                                              │
│  ─────────────────────────────────────────────────────────────────────      │
│                                                                              │
│  Exactly right! This is a common issue in API authentication.               │
│                                                                              │
│  Root Cause Analysis:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Problem: 401 Unauthorized                                          │    │
│  │      ↓                                                              │    │
│  │  Direct Cause: Invalid/expired authentication token                 │    │
│  │      ↓                                                              │    │
│  │  Root Cause: Token lifecycle not managed (no refresh mechanism)     │    │
│  │      ↓                                                              │    │
│  │  Solution: Implement token refresh or check expiry before requests  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Best Practice:                                                              │
│  ```python                                                                   │
│  def get_valid_token():                                                      │
│      if token_is_expired():                                                  │
│          return refresh_token()                                              │
│      return current_token                                                    │
│  ```                                                                         │
│                                                                              │
│  🎯 You demonstrated good root-cause thinking! This skill is essential       │
│     for debugging production issues.                                         │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │  [Review Lesson]              [Next Exercise →]                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.5 Feature: Review & Retention

#### 8.5.1 UI Mockup

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Dashboard              Daily Review                      5 cards today  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  │  📚 Time for your daily review!                                     │    │
│  │                                                                     │    │
│  │  You have 5 concepts to review from previous lessons.              │    │
│  │  This helps strengthen your long-term memory.                       │    │
│  │                                                                     │    │
│  │  Topics:                                                            │    │
│  │  • REST API Concepts (2 cards)                                      │    │
│  │  • HTTP Methods (2 cards)                                           │    │
│  │  • Python Basics (1 card)                                           │    │
│  │                                                                     │    │
│  │  Estimated time: ~5 minutes                                         │    │
│  │                                                                     │    │
│  │                    [Start Review]                                   │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│                                                                              │
│  📊 Your Mastery Dashboard                                                   │
│  ─────────────────────────────────────────────────────────────────────      │
│                                                                              │
│  ┌───────────────────┬──────────────┬──────────────┬──────────────────┐     │
│  │     Concept       │   Recall     │  Application │    Mastery       │     │
│  ├───────────────────┼──────────────┼──────────────┼──────────────────┤     │
│  │ REST APIs         │ ████████ 85% │ ██████░░ 70% │ ⭐⭐⭐⭐░ Proficient │     │
│  │ HTTP Methods      │ ██████░░ 75% │ ████░░░░ 60% │ ⭐⭐⭐░░ Developing │     │
│  │ Python Functions  │ ████████ 90% │ ████████ 85% │ ⭐⭐⭐⭐⭐ Mastered   │     │
│  │ Database Queries  │ ████░░░░ 55% │ ████░░░░ 50% │ ⭐⭐░░░ Needs Work │     │
│  └───────────────────┴──────────────┴──────────────┴──────────────────┘     │
│                                                                              │
│  🔥 Current Streak: 7 days                                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Non-Functional Requirements

### 9.1 Performance Requirements

| Metric | Target | Notes |
|--------|--------|-------|
| Page Load Time | < 2 seconds | Initial load |
| API Response Time | < 500ms | 95th percentile |
| Content Generation | < 10 seconds | AI-generated content |
| Image Generation | < 30 seconds | AI-generated visuals |
| Concurrent Users | 10,000+ | Without degradation |

### 9.2 Scalability Requirements

| Aspect | Requirement |
|--------|-------------|
| Horizontal Scaling | Auto-scale based on load |
| Database | Support 1M+ users |
| Storage | Scale for generated content |
| CDN | Global content delivery |

### 9.3 Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| Authentication | OAuth 2.0 / JWT |
| Data Encryption | TLS 1.3, AES-256 at rest |
| PII Protection | GDPR/CCPA compliant |
| API Security | Rate limiting, input validation |
| Audit Logging | All user actions logged |

### 9.4 Reliability Requirements

| Metric | Target |
|--------|--------|
| Uptime | 99.9% SLA |
| Data Durability | 99.999999999% |
| Backup | Daily, 30-day retention |
| Disaster Recovery | RTO < 4 hours, RPO < 1 hour |

### 9.5 Accessibility Requirements

| Standard | Compliance |
|----------|------------|
| WCAG | 2.1 Level AA |
| Screen Reader | Full support |
| Keyboard Navigation | Complete coverage |
| Color Contrast | Minimum 4.5:1 |

---

## 10. Success Metrics

### 10.1 North Star Metric

> **Weekly Active Learners completing at least one lesson**

### 10.2 Key Performance Indicators (KPIs)

| Category | Metric | Target | Measurement |
|----------|--------|--------|-------------|
| **Acquisition** | New signups/week | 1,000 | Analytics |
| **Activation** | Complete assessment | 80% | Funnel |
| **Engagement** | Lessons/week/user | 3+ | Product |
| **Retention** | 30-day retention | 40% | Cohort |
| **Learning** | Module completion | 60% | Progress |
| **Satisfaction** | NPS Score | 50+ | Survey |

### 10.3 Learning Outcome Metrics

| Metric | Target | Notes |
|--------|--------|-------|
| Knowledge Retention | 80% on 7-day review | Spaced repetition effectiveness |
| Skill Application | 70% pass project exercises | Practical skill transfer |
| Concept Mastery | 60% achieve "Proficient" | Per-concept tracking |
| Goal Achievement | 50% report goal progress | Self-reported |

---

## 11. Risks & Mitigations

### 11.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| AI content quality inconsistent | Medium | High | Human review pipeline, quality scoring |
| Image generation slow/fails | Medium | Medium | Fallback to stock images, pre-generate |
| High AI API costs | High | High | Caching, batch processing, cost limits |
| Knowledge quickly outdated | Medium | Medium | Regular content refresh, user flagging |

### 11.2 Product Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Low completion rates | High | High | Gamification, reminders, short sessions |
| Content not meeting user needs | Medium | High | Continuous feedback, A/B testing |
| Users overwhelmed by assessment | Medium | Medium | Progressive disclosure, skip options |
| Competition from established players | High | Medium | Focus on personalization differentiation |

### 11.3 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Slow user acquisition | Medium | High | Content marketing, partnerships |
| Low conversion to paid | Medium | High | Optimize free tier value, clear upgrade path |
| High churn rate | Medium | High | Engagement features, outcome tracking |

---

## 12. Roadmap & Milestones

### 12.1 Development Phases

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT ROADMAP                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PHASE 1: MVP (Month 1-3)                                                   │
│  ─────────────────────────                                                  │
│  ✓ Conversational assessment (basic)                                        │
│  ✓ Roadmap generation (single topic)                                        │
│  ✓ Content generation (text only)                                           │
│  ✓ Basic exercise system                                                    │
│  ✓ Progress tracking                                                        │
│                                                                              │
│  PHASE 2: Core Features (Month 4-6)                                         │
│  ──────────────────────────────────                                         │
│  ○ AI image generation integration                                          │
│  ○ Spaced repetition system                                                 │
│  ○ Multi-topic support                                                      │
│  ○ Advanced exercise types                                                  │
│  ○ Mobile responsive design                                                 │
│                                                                              │
│  PHASE 3: Enhancement (Month 7-9)                                           │
│  ────────────────────────────────                                           │
│  ○ Gamification (streaks, badges)                                           │
│  ○ Social features (community)                                              │
│  ○ Offline mode                                                             │
│  ○ Mobile apps                                                              │
│  ○ Advanced analytics                                                       │
│                                                                              │
│  PHASE 4: Scale (Month 10-12)                                               │
│  ────────────────────────────                                               │
│  ○ Enterprise features                                                      │
│  ○ API for integrations                                                     │
│  ○ Content marketplace                                                      │
│  ○ Certification system                                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 12.2 MVP Scope

| Feature | Included | Notes |
|---------|----------|-------|
| Conversational Assessment | ✅ | 5-7 questions |
| Single Topic Roadmap | ✅ | Backend dev, English |
| Text-based Lessons | ✅ | AI-generated |
| Basic Exercises | ✅ | MCQ, short answer |
| Progress Tracking | ✅ | Per lesson |
| AI Images | ❌ | Phase 2 |
| Spaced Repetition | ❌ | Phase 2 |
| Mobile App | ❌ | Phase 3 |

---

## 13. Appendix

### 13.1 Glossary

| Term | Definition |
|------|------------|
| **Learner Profile** | Aggregated data about user's goals, level, and preferences |
| **Roadmap** | Personalized learning path with phases, modules, lessons |
| **Checkpoint** | Assessment at end of phase to verify learning |
| **Mastery Level** | User's proficiency in a concept (1-100%) |
| **Spaced Repetition** | Review algorithm that optimizes retention |
| **Root-Cause Thinking** | Skill to identify fundamental causes of problems |

### 13.2 References

- [Spaced Repetition Algorithm (SM-2)](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2)
- [Bloom's Taxonomy](https://www.bloomstaxonomy.net/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google AI Gemini API](https://ai.google.dev/)
- [Anthropic Claude API](https://docs.anthropic.com/)

### 13.3 Open Questions

1. **Monetization Model**: Freemium vs subscription vs pay-per-course?
2. **Content Moderation**: How to handle user-generated content?
3. **Multi-language Support**: Prioritize which languages first?
4. **Offline Learning**: How much content to allow downloading?
5. **Social Features**: Leaderboards, study groups, or tutoring?

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-31 | Product Team | Initial draft |

---

*This document is a living document and will be updated as the product evolves.*
