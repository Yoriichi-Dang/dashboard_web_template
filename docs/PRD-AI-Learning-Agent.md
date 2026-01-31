# Product Requirements Document (PRD)
# AI-Powered Adaptive Learning Agent

**Version:** 1.0
**Date:** January 31, 2026
**Status:** Draft - Ideation Phase

---

## 1. Executive Summary

### 1.1 One-Liner
> An AI agent that creates personalized learning roadmaps through conversation, generates adaptive content, and teaches users to think from first principles - not just memorize.

### 1.2 The Vision
Biến việc học bất kỳ kỹ năng nào trở thành trải nghiệm được cá nhân hóa 100%, nơi AI đóng vai trò như một gia sư riêng - hiểu bạn, dạy theo cách bạn cần, và tập trung vào việc xây dựng tư duy giải quyết vấn đề từ gốc rễ.

---

## 2. Problem Statement

### 2.1 Vấn đề hiện tại của người học

| Pain Point | Mô tả | Hậu quả |
|------------|-------|---------|
| **One-Size-Fits-All** | Khóa học Udemy/Coursera dạy giống nhau cho tất cả | Completion rate chỉ 10-15% |
| **Không biết bắt đầu từ đâu** | "Tôi muốn học backend" → 1000 kết quả Google | Bỏ cuộc trước khi bắt đầu |
| **Học xong quên sạch** | Không có hệ thống ôn tập, học passive | Quên 70% sau 24 giờ |
| **Học bề mặt** | Biết "what" nhưng không biết "why" | Không có tư duy problem-solving |
| **Thời gian không linh hoạt** | Khóa học có deadline cứng | Dropout vì không theo kịp |

### 2.2 Target Problem Statement

> **"Người học thiếu một hệ thống học tập thông minh có thể:**
> 1. Hiểu họ đang ở đâu và muốn đến đâu
> 2. Tạo lộ trình phù hợp riêng cho họ
> 3. Dạy họ HIỂU thay vì chỉ NHỚ
> 4. Thích ứng với lịch trình linh hoạt của họ"

---

## 3. Solution Overview

### 3.1 User Journey

```
User: "Tôi muốn học backend development và tiếng Anh giao tiếp"
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  PHASE 1: DISCOVERY (AI hỏi đáp)                                        │
│  ─────────────────────────────────                                      │
│  AI đặt câu hỏi để hiểu:                                                │
│  • Mục đích học? (đổi nghề, nâng cao, sở thích)                         │
│  • Trình độ hiện tại? (chưa biết gì, biết cơ bản, đã làm việc)          │
│  • Điểm mạnh? (logic tốt, kiên nhẫn, học nhanh)                         │
│  • Điểm yếu? (hay quên, mất tập trung, thiếu thời gian)                 │
│  • Thời gian có? (5h/tuần, 10h/tuần, 20h/tuần)                          │
│  • Cách học ưa thích? (đọc, video, thực hành)                           │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  PHASE 2: RESEARCH (AI nghiên cứu)                                      │
│  ──────────────────────────────────                                     │
│  AI tự động:                                                            │
│  • Search thông tin về topic trên internet                              │
│  • Phân tích các keyword và concept quan trọng                          │
│  • Xác định mối liên hệ giữa các concept                                │
│  • Xác định thứ tự học (cái nào trước, cái nào sau)                     │
│  • Đánh giá độ khó của từng phần                                        │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  PHASE 3: ROADMAP (Tạo lộ trình)                                        │
│  ────────────────────────────────                                       │
│  Tạo lộ trình học cá nhân hóa:                                          │
│  • Chia thành các Phase (giai đoạn lớn)                                 │
│  • Mỗi Phase có nhiều Module (chủ đề)                                   │
│  • Mỗi Module có nhiều Lesson (bài học)                                 │
│  • Skip những gì user đã biết                                           │
│  • Bổ sung những gì user còn thiếu                                      │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  PHASE 4: CONTENT (Tạo nội dung)                                        │
│  ────────────────────────────────                                       │
│  Cho mỗi bài học, AI tạo:                                               │
│  • Lý thuyết: Giải thích đơn giản, từ cơ bản đến nâng cao               │
│  • Hình ảnh: AI generate diagram, infographic để minh họa               │
│  • Ví dụ: Real-world examples, code samples                             │
│  • Bài tập: 4 mức độ (Basic → Intermediate → Advanced → Expert)         │
│  • Tóm tắt: Key takeaways                                               │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  PHASE 5: LEARNING & RETENTION (Học và ghi nhớ)                         │
│  ───────────────────────────────────────────────                        │
│  • User học theo lịch linh hoạt                                         │
│  • Hệ thống ôn tập thông minh (spaced repetition)                       │
│  • Focus vào root-cause thinking (hiểu gốc vấn đề)                      │
│  • Track mastery level cho từng concept                                 │
│  • Điều chỉnh độ khó dựa trên performance                               │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Triết lý dạy học

| KHÔNG LÀM | SẼ LÀM |
|-----------|--------|
| Dạy chuyên sâu chi tiết | Dạy nền tảng vững chắc |
| Nhồi nhét kiến thức | Build tư duy problem-solving |
| Học thuộc lòng | Hiểu "tại sao" trước "cách" |
| One-size-fits-all | Personalized 100% |
| Fixed schedule | Flexible timeline |

**ROOT-CAUSE THINKING:**
- Thay vì hỏi: "Code này chạy sao?"
- Sẽ hỏi: "Tại sao code này hoạt động? Nếu thay đổi X thì điều gì xảy ra?"
- Mục tiêu: User có thể tự giải quyết vấn đề MỚI, không chỉ lặp lại những gì đã học

---

## 4. Core Features

### 4.1 Feature Overview

| # | Feature | Priority | Mô tả |
|---|---------|----------|-------|
| F1 | **Conversational Assessment** | P0 - Core | AI chat để đánh giá level, goals, learning style |
| F2 | **Intelligent Research** | P0 - Core | AI search web, extract concepts, build knowledge graph |
| F3 | **Personalized Roadmap** | P0 - Core | Generate lộ trình học cá nhân hóa |
| F4 | **Content Generation (Text)** | P0 - Core | Tạo nội dung lý thuyết, ví dụ, bài tập |
| F5 | **Content Generation (Images)** | P1 | AI generate hình ảnh minh họa |
| F6 | **Spaced Repetition** | P1 | Hệ thống ôn tập thông minh |
| F7 | **Flexible Learning** | P0 - Core | Pause/resume, no deadlines |

### 4.2 Lesson Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│  LESSON: "What is an API?"                                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. THEORY (5-10 min)                                                   │
│     └─ Giải thích đơn giản, focus "why" before "how"                   │
│                                                                         │
│  2. VISUAL AIDS                                                         │
│     └─ AI-generated diagrams, infographics                             │
│                                                                         │
│  3. EXAMPLES (3-5 min)                                                  │
│     └─ Real-world analogy + code samples                               │
│                                                                         │
│  4. EXERCISES (10-15 min)                                               │
│     ├─ Level 1: Basic (nhận biết)                                      │
│     ├─ Level 2: Intermediate (áp dụng)                                 │
│     ├─ Level 3: Advanced (phân tích)                                   │
│     └─ Level 4: Expert (giải quyết vấn đề mới)                         │
│                                                                         │
│  5. KEY TAKEAWAYS (2 min)                                               │
│     └─ 3-5 điểm quan trọng cần nhớ                                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. System Architecture Overview

### 5.1 High-Level Components

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SYSTEM COMPONENTS                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                      USER INTERFACE                                │  │
│  │  • Web App (Next.js) - Main platform                              │  │
│  │  • Mobile App (React Native) - Future                             │  │
│  │  • Chat Interface - For assessment                                │  │
│  │  • Dashboard - For roadmap & progress                             │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              │                                           │
│                              ▼                                           │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                      AI AGENT LAYER                                │  │
│  │                                                                    │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │  │
│  │  │ Assessment  │  │  Research   │  │  Roadmap    │                │  │
│  │  │   Agent     │  │   Agent     │  │   Agent     │                │  │
│  │  │             │  │             │  │             │                │  │
│  │  │ Hỏi đáp và  │  │ Search web, │  │ Tạo lộ trình│                │  │
│  │  │ đánh giá    │  │ phân tích   │  │ cá nhân hóa │                │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                │  │
│  │                                                                    │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │  │
│  │  │  Content    │  │   Image     │  │  Review     │                │  │
│  │  │  Generator  │  │  Generator  │  │   Agent     │                │  │
│  │  │             │  │             │  │             │                │  │
│  │  │ Tạo nội dung│  │ Tạo hình ảnh│  │ Spaced      │                │  │
│  │  │ bài học     │  │ minh họa    │  │ repetition  │                │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                │  │
│  │                                                                    │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              │                                           │
│                              ▼                                           │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                      DATA LAYER                                    │  │
│  │  • User Profiles (thông tin người dùng)                           │  │
│  │  • Roadmaps (lộ trình học)                                        │  │
│  │  • Lessons & Content (nội dung bài học)                           │  │
│  │  • Progress & Mastery (tiến độ học)                               │  │
│  │  • Knowledge Graph (mối quan hệ concepts)                         │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                              │                                           │
│                              ▼                                           │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                   EXTERNAL SERVICES                                │  │
│  │  • LLM APIs (Claude, GPT) - conversation & content                │  │
│  │  • Search APIs (Google, Gemini) - research                        │  │
│  │  • Image Generation (Gemini Imagen, DALL-E) - visuals            │  │
│  │  • Authentication (OAuth)                                         │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 AI Agents Summary

| Agent | Input | Output | Purpose |
|-------|-------|--------|---------|
| **Assessment Agent** | User responses | Learner Profile | Hỏi đáp để hiểu user |
| **Research Agent** | Topic keywords | Knowledge Graph | Tìm kiếm & phân tích topic |
| **Roadmap Agent** | Profile + Graph | Personalized Roadmap | Tạo lộ trình học |
| **Content Agent** | Topic + Level | Lesson Content | Tạo nội dung bài học |
| **Image Agent** | Concept desc | Visual assets | Tạo hình ảnh minh họa |
| **Review Agent** | User progress | Review schedule | Quản lý ôn tập |

---

## 6. Gap Analysis & Recommendations

### 6.1 Những gì còn thiếu trong ý tưởng ban đầu

#### CRITICAL GAPS (Cần bổ sung ngay)

| Gap | Mô tả | Recommendation |
|-----|-------|----------------|
| **User Authentication** | Chưa đề cập đến đăng ký, đăng nhập | Cần: OAuth, email/password, profile management |
| **Content Quality Control** | AI-generated content có thể không chính xác | Cần: Review pipeline, user feedback, fact-checking |
| **Progress Sync** | Nếu mất mạng giữa chừng? | Cần: Local storage, sync mechanism |
| **Multi-language** | Content nên bằng tiếng nào? | Cần: Language strategy definition |

#### IMPORTANT GAPS (Nên có)

| Gap | Mô tả | Recommendation |
|-----|-------|----------------|
| **Gamification** | Thiếu motivation mechanisms | Suggest: Streaks, badges, XP points |
| **Social Features** | Học một mình có thể chán | Suggest: Study groups, discussions |
| **Progress Analytics** | User không biết mình tiến bộ thế nào | Suggest: Dashboard với charts |
| **Notification System** | Làm sao nhắc user quay lại học? | Suggest: Smart reminders |

#### NICE-TO-HAVE GAPS (Tương lai)

| Gap | Mô tả | Recommendation |
|-----|-------|----------------|
| **AI Tutor Chat** | Hỏi đáp real-time khi học | "Tôi không hiểu phần này, giải thích lại" |
| **Project-Based Learning** | Cuối mỗi phase có project thực tế | Build portfolio trong quá trình học |
| **Certification** | Cấp chứng chỉ khi hoàn thành | Có giá trị cho CV |
| **Mentor Matching** | Connect với người có kinh nghiệm | 1-on-1 guidance |

### 6.2 Recommended Additional Features

| # | Feature | Priority | Lý do |
|---|---------|----------|-------|
| 1 | **AI Tutor Chat** | P1 | User có thể stuck và cần hỏi ngay |
| 2 | **Gamification (Streaks/XP)** | P1 | Tăng retention đáng kể |
| 3 | **Progress Dashboard** | P1 | User cần thấy tiến bộ để motivated |
| 4 | **Smart Notifications** | P2 | Nhắc nhở không annoying |
| 5 | **Offline Mode** | P2 | Học trên tàu/máy bay |
| 6 | **Project-Based Learning** | P2 | Áp dụng thực tế |
| 7 | **Community/Forums** | P3 | Social learning |
| 8 | **Certification** | P3 | Thêm giá trị |

---

## 7. Open Questions

### Product Questions

| # | Question | Options |
|---|----------|---------|
| Q1 | Target audience chính là ai? | Career switchers / Students / Professionals / All |
| Q2 | Monetization model? | Freemium / Subscription / Pay-per-course / Free+ads |
| Q3 | Scope topics ban đầu? | Tech only / Languages only / Both / Broader |
| Q4 | Content language? | Vietnamese / English / Both / Auto-detect |

### Technical Questions

| # | Question | Options |
|---|----------|---------|
| Q5 | LLM provider chính? | Claude / GPT-4 / Gemini / Mix |
| Q6 | Image generation service? | Gemini Imagen / DALL-E 3 / Midjourney / Stable Diffusion |
| Q7 | Content caching strategy? | On-demand / Pre-generate popular / Hybrid |

### Business Questions

| # | Question | Options |
|---|----------|---------|
| Q8 | MVP timeline? | 1 month / 3 months / 6 months |
| Q9 | Initial user target? | 100 beta / 1,000 users / 10,000 users |
| Q10 | Competitive positioning? | Cheaper / Better personalization / Vietnam focus / Unique methodology |

---

## 8. Competitive Analysis

### 8.1 Landscape

```
                        Personalization
                             ▲
                             │
                             │    ⭐ OUR PRODUCT
                             │       (AI-powered,
                             │        personalized)
                             │
        Duolingo ●           │
        (gamified,           │
         adaptive)           │
                             │
◄────────────────────────────┼────────────────────────────────►
Static Content               │                   Dynamic Content
                             │
                             │
     ● Udemy/Coursera        │         ● ChatGPT
       (fixed courses)       │           (no structure)
                             │
                             │
                             ▼
                          Generic
```

### 8.2 Our Differentiation

| Differentiator | Mô tả |
|----------------|-------|
| **True Personalization** | Roadmap riêng cho từng người, không chỉ adaptive difficulty |
| **Root-Cause Thinking** | Dạy HIỂU chứ không dạy NHỚ |
| **Research-Backed Roadmap** | AI research real-time, không fixed curriculum |
| **AI-Generated Visuals** | Hình ảnh minh họa tạo riêng cho từng concept |
| **Truly Flexible** | Không deadline, learn at your own pace |

---

## 9. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| AI content không chính xác | Medium | High | Human review pipeline, user feedback |
| Costs quá cao (API calls) | High | High | Caching, batch processing, cost limits |
| User bỏ cuộc giữa chừng | High | High | Gamification, smart reminders |
| Content nhanh outdated | Medium | Medium | Regular refresh, user flagging |
| Cạnh tranh từ big players | Medium | Medium | Focus niche, unique methodology |

---

## 10. Success Metrics

### North Star Metric
> **Weekly Active Learners completing at least 1 lesson**

### Key Metrics

| Category | Metric | Target |
|----------|--------|--------|
| Acquisition | New signups/week | 500+ |
| Activation | Complete onboarding | 80%+ |
| Engagement | Lessons/week/user | 3+ |
| Retention | 30-day retention | 40%+ |
| Learning | Module completion | 60%+ |
| Satisfaction | NPS | 50+ |

---

## 11. MVP Scope

### In Scope (MVP)

| Feature | Description |
|---------|-------------|
| Basic Auth | Email/password signup & login |
| Topic Input | User nói muốn học gì |
| Assessment Chat | 5-7 câu hỏi đánh giá |
| Research | AI search & analyze topic |
| Roadmap Generation | Create personalized path |
| Content Generation | Text-based lessons |
| Basic Exercises | MCQ, short answer |
| Progress Tracking | Mark lessons complete |
| Responsive Web | Works on mobile browser |

### Out of Scope (Post-MVP)

| Feature | Phase |
|---------|-------|
| AI Image Generation | Phase 2 |
| Spaced Repetition | Phase 2 |
| Gamification | Phase 2 |
| AI Tutor Chat | Phase 2 |
| Mobile Apps | Phase 3 |
| Social Features | Phase 3 |
| Offline Mode | Phase 3 |
| Certification | Phase 4 |

---

## 12. Next Steps

1. **Answer Open Questions (Section 7)** → Xác định target audience, monetization, scope
2. **User Research** → Validate pain points với real users
3. **Technical Feasibility** → Test AI content quality, estimate API costs
4. **Design Wireframes** → Onboarding, roadmap, lesson views
5. **Build Prototype** → Simple version to test with users
6. **Define Success Criteria** → What metrics = success? What = pivot?

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-31 | Initial PRD - Problem & Solution clarity |

---

*This PRD focuses on clarifying the problem, solution concept, and identifying gaps. Technical design details will be addressed in separate documents after stakeholder alignment.*
