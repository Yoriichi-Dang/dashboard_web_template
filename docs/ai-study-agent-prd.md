# Product Requirements Document (PRD)
# AI Study Agent

**Version:** 1.0.0  
**Last Updated:** 2025-01-31  
**Status:** Draft

---

## 1. Executive Summary

### 1.1 Product Overview

**AI Study Agent** là hệ thống AI dạy học cá nhân hóa, giúp người dùng học từ cơ bản theo lộ trình được thiết kế riêng. Người dùng nhập mục tiêu học tập (ví dụ: "tôi muốn học backend, tiếng Anh giao tiếp"), hệ thống tiến hành hỏi đáp discovery để thu thập thông tin, cho phép upload tài liệu có sẵn, rồi thiết kế roadmap, research thông tin, tạo nội dung dạy học và tổ chức quá trình học với kiểm tra bài cũ trước khi học bài mới.

### 1.2 Product Philosophy

| Nguyên tắc | Mô tả |
|------------|--------|
| **Từ cơ bản** | Ưu tiên nền tảng vững chắc trước khi nâng cao |
| **Tự chủ** | Hướng tới việc người học tự học, tự nghiên cứu sau này |
| **Tư duy giải quyết vấn đề** | Tập trung mindset tìm hiểu và xử lý vấn đề từ nguyên nhân gốc rễ |
| **Không chuyên sâu** | Phạm vi giới hạn ở mức nền tảng, không đi sâu chuyên ngành hẹp |

### 1.3 Target Users

- Người mới bắt đầu muốn học có lộ trình rõ ràng
- Sinh viên đang có giáo trình/slide cần ôn tập hoặc bổ sung
- Người tự học cần hướng dẫn từ cơ bản
- Người muốn học linh hoạt theo thời gian cá nhân

---

## 2. User Flows

### 2.1 Flow Tổng Quan

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  1. USER NHẬP MỤC TIÊU                                                      │
│     "Tôi muốn học backend, tiếng Anh giao tiếp"                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  2. DISCOVERY (Hỏi đáp + Upload file tài liệu)                              │
│     • Agent đặt câu hỏi về mục đích, trình độ, ưu/nhược điểm, thời gian...  │
│     • User có thể upload file (giáo trình, slide, tài liệu tự học)          │
│     • File Upload Module xử lý → RAG cho Agent có context                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  3. THIẾT KẾ ROADMAP                                                        │
│     • Agent phân tích intent + câu trả lời + nội dung file (nếu có)         │
│     • Tạo lộ trình học theo module/bài, có tham chiếu chương/trang cụ thể   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  4. RESEARCH & PHÂN TÍCH                                                    │
│     • Research thông tin trên web về chủ đề                                  │
│     • Phân tích keyword, concept, mối liên hệ giữa các nội dung             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  5. TẠO NỘI DUNG DẠY HỌC                                                    │
│     • Lý thuyết cơ bản → tăng dần level                                     │
│     • Hình ảnh minh họa (Gemini)                                            │
│     • Ví dụ minh họa                                                        │
│     • Bài tập thực tế theo mức độ                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  6. HỌC & KIỂM TRA                                                          │
│     • User học linh hoạt theo thời gian                                     │
│     • Trước bài mới: Kiểm tra bài cũ (nhớ & hiểu)                           │
│     • Chỉ học bài mới khi đạt ngưỡng                                        │
│     • Có thể upload file bổ sung trong quá trình học                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Flow Chi Tiết: Discovery

```
Agent: "Bạn muốn học gì?"
User: "Backend và tiếng Anh giao tiếp"

Agent: "Mục đích học của bạn là gì? (công việc, thi cử, sở thích...)"
User: [trả lời]

Agent: "Bạn có tài liệu sẵn không? (sách, slide trường, note tự học)"
User: [Có] → Upload file(s)
       ↓
       File Upload Module: Parse → Chunk → Embed → Index
       Agent có context RAG từ file
       ↓
User: [Không] → Bỏ qua

Agent: "Trình độ hiện tại của bạn?"
User: [trả lời]

Agent: "Ưu điểm / lợi thế của bạn khi học?"
User: [trả lời]

Agent: "Điểm yếu / khó khăn?"
User: [trả lời]

Agent: "Thời gian học mỗi tuần?"
User: [trả lời]

... (có thể thêm câu hỏi tùy ngữ cảnh)

Agent: [Tổng hợp] → Đề xuất roadmap + giải thích
```

---

## 3. Feature Specifications

### 3.1 Intent Parsing & Multi-Topic Handling

| ID | Feature | Mô tả | Độ ưu tiên |
|----|---------|--------|------------|
| F1.1 | Natural language intent parsing | Phân tích câu user để extract: chủ đề học, số lượng chủ đề, mức độ cụ thể | P0 |
| F1.2 | Multi-topic support | Hỗ trợ nhiều chủ đề (vd: backend + tiếng Anh). Chiến lược: song song hoặc tuần tự | P0 |
| F1.3 | Topic validation | Xác nhận với user nếu intent không rõ | P1 |

### 3.2 Discovery & Onboarding

| ID | Feature | Mô tả | Độ ưu tiên |
|----|---------|--------|------------|
| F2.1 | Structured questioning flow | Các câu hỏi theo thứ tự: mục đích, tài liệu, trình độ, ưu điểm, điểm yếu, thời gian | P0 |
| F2.2 | Dynamic follow-up questions | Câu hỏi bổ sung dựa trên câu trả lời (vd: nếu có file → hỏi thêm về nội dung) | P1 |
| F2.3 | Skip optional questions | Cho phép bỏ qua câu không bắt buộc | P1 |
| F2.4 | User profile persistence | Lưu thông tin discovery để tái sử dụng, cập nhật | P0 |

**Danh sách câu hỏi Discovery (gợi ý):**

- Mục đích học (công việc, thi cử, sở thích, chuyển ngành…)
- Bạn có tài liệu sẵn không? (sách, slide, note)
- Trình độ hiện tại (chưa biết gì / biết sơ / đã học qua)
- Ưu điểm / lợi thế (logic, trí nhớ, có background liên quan…)
- Điểm yếu / khó khăn (không kiên trì, thiếu môi trường thực hành…)
- Thời gian học mỗi tuần (giờ/ngày)
- Công cụ có sẵn (máy tính, sách, khóa học cũ…)

### 3.3 File Upload Module

| ID | Feature | Mô tả | Độ ưu tiên |
|----|---------|--------|------------|
| F3.1 | File upload UI | Giao diện upload trong discovery và trong quá trình học | P0 |
| F3.2 | Supported formats | PDF, DOCX, MD, TXT (mở rộng: hình ảnh có text qua OCR) | P0 |
| F3.3 | Parse & extract | Đọc nội dung, giữ cấu trúc (chương, mục, trang) | P0 |
| F3.4 | Chunking | Chunk theo section/page với overlap phù hợp | P0 |
| F3.5 | Embedding & indexing | Vector embedding + index vào Vector DB | P0 |
| F3.6 | RAG integration | Agent query RAG để lấy context khi discovery và học | P0 |
| F3.7 | File size limit | Giới hạn dung lượng/file (vd: 10MB/file, 50MB/session) | P1 |
| F3.8 | File count limit | Giới hạn số file (vd: 5–10 file/roadmap) | P1 |
| F3.9 | Privacy & retention | Mã hóa, không dùng train model, cho phép xóa | P0 |

**Pipeline kỹ thuật:**

```
Upload → Parse (pdf-parser, mammoth, etc.) 
      → Chunk (theo section, overlap 100–200 tokens) 
      → Embed (OpenAI/Cohere/vị trí khác) 
      → Index (Pinecone/Qdrant/pgvector)
```

### 3.4 Roadmap Generation

| ID | Feature | Mô tả | Độ ưu tiên |
|----|---------|--------|------------|
| F4.1 | Roadmap từ discovery | Tạo lộ trình từ intent + câu trả lời + context từ file | P0 |
| F4.2 | Tham chiếu tài liệu | Roadmap có link đến chương/trang cụ thể trong file đã upload | P1 |
| F4.3 | Module/lesson structure | Phân cấp: Module → Lesson → Section | P0 |
| F4.4 | Difficulty progression | Thứ tự tăng dần: cơ bản → trung bình → nâng cao | P0 |
| F4.5 | Roadmap export | Xuất PDF/Markdown (optional) | P2 |

### 3.5 Research & Content Design

| ID | Feature | Mô tả | Độ ưu tiên |
|----|---------|--------|------------|
| F5.1 | Web research | Search API (Serper, Tavily, Perplexity…) để thu thập tài liệu | P0 |
| F5.2 | Source filtering | Lọc nguồn theo độ tin cậy, loại bỏ spam | P1 |
| F5.3 | Keyword & concept extraction | Tách concept chính, prerequisite, dependency | P0 |
| F5.4 | Concept relationship mapping | Mô hình quan hệ giữa các concept (graph) | P1 |
| F5.5 | Curriculum structure | Cây kiến thức theo thứ tự logic | P0 |

### 3.6 Content Generation

| ID | Feature | Mô tả | Độ ưu tiên |
|----|---------|--------|------------|
| F6.1 | Theory content | Nội dung lý thuyết cơ bản, dễ hiểu | P0 |
| F6.2 | Progressive level | Tăng dần độ khó trong mỗi bài | P0 |
| F6.3 | Image generation | Hình minh họa qua Gemini | P1 |
| F6.4 | Example generation | Ví dụ thực tế có giải thích | P0 |
| F6.5 | Exercise generation | Bài tập theo mức: easy, medium, hard | P0 |
| F6.6 | Citation/source | Trích dẫn nguồn khi dùng research | P1 |

### 3.7 Learning Experience

| ID | Feature | Mô tả | Độ ưu tiên |
|----|---------|--------|------------|
| F7.1 | Flexible scheduling | User tự chọn thời gian học, không bắt buộc lịch cố định | P0 |
| F7.2 | Lesson UI | Hiển thị nội dung bài: lý thuyết, hình, ví dụ, bài tập | P0 |
| F7.3 | Pre-lesson quiz | Quiz kiểm tra bài cũ trước khi mở bài mới | P0 |
| F7.4 | Quiz passing threshold | Ngưỡng đạt (vd: 70–80%) để được học bài mới | P0 |
| F7.5 | Retry flow | Khi fail quiz: gợi ý ôn lại, làm lại sau | P0 |
| F7.6 | Progress tracking | Theo dõi: bài đã học, điểm quiz, thời gian | P0 |
| F7.7 | Spaced repetition (optional) | Gợi ý ôn lại theo khoảng thời gian | P2 |

### 3.8 File Upload During Learning

| ID | Feature | Mô tả | Độ ưu tiên |
|----|---------|--------|------------|
| F8.1 | Upload mid-learning | Cho phép thêm file trong quá trình học | P1 |
| F8.2 | Re-index & RAG | File mới được xử lý và đưa vào RAG | P1 |
| F8.3 | Content extension | Nội dung bài học có thể bổ sung dựa trên file mới | P1 |

---

## 4. Non-Functional Requirements

### 4.1 Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR1 | Response time (chat) | &lt; 5s cho câu trả lời discovery |
| NFR2 | RAG retrieval | &lt; 2s |
| NFR3 | Content generation | &lt; 30s cho 1 bài (có thể streaming) |
| NFR4 | File processing | &lt; 1 phút cho file 20 trang |

### 4.2 Security & Privacy

| ID | Requirement |
|----|-------------|
| NFR5 | Mã hóa file upload (at rest, in transit) |
| NFR6 | Không dùng dữ liệu user để train model |
| NFR7 | Cho phép user xóa dữ liệu (GDPR-like) |
| NFR8 | Phân quyền truy cập theo user/session |

### 4.3 Scalability

| ID | Requirement |
|----|-------------|
| NFR9 | Hỗ trợ nhiều user đồng thời |
| NFR10 | Vector DB tách biệt theo user/roadmap |
| NFR11 | Caching nội dung đã generate để giảm chi phí API |

---

## 5. System Architecture

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER INTERFACE                                     │
│   Chat UI | File Upload | Lesson View | Quiz | Progress Dashboard             │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       AI AGENT ORCHESTRATOR                                  │
│   Intent → Discovery → Roadmap → Research → Content → Quiz Logic              │
└───┬─────────────┬─────────────┬─────────────┬─────────────┬─────────────────┘
    │             │             │             │             │
    ▼             ▼             ▼             ▼             ▼
┌────────┐  ┌─────────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐
│  LLM   │  │File Upload  │  │ Research │  │ Vector   │  │ Image Gen   │
│(GPT/   │  │  Module     │  │  (Search │  │   DB     │  │  (Gemini)   │
│Claude) │  │ Parse→Chunk │  │   API)   │  │  (RAG)   │  │             │
│        │  │ →Embed→Index│  │          │  │          │  │             │
└────────┘  └─────────────┘  └──────────┘  └──────────┘  └─────────────┘
    │             │             │             │
    └─────────────┴─────────────┴─────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                                           │
│   User Profile | Roadmap | Lessons | Quizzes | Progress | File Index          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 File Upload Module (Detail)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FILE UPLOAD MODULE                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Upload] → [Parse] → [Chunk] → [Embed] → [Index] → [RAG Ready]              │
│                                                                              │
│  • Parse: pdf-parse, mammoth (DOCX), md parser                              │
│  • Chunk: 500–1000 tokens, overlap 100–200, theo section khi có             │
│  • Embed: OpenAI text-embedding-3-small / Cohere embed-v3                   │
│  • Index: Pinecone / Qdrant / pgvector (metadata: user_id, roadmap_id,      │
│           file_id, chapter, page)                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Data Models (Conceptual)

### 6.1 User Profile

```
User
├── id
├── discovery_answers (mục đích, trình độ, ưu điểm, điểm yếu, thời gian...)
├── created_at
└── updated_at
```

### 6.2 Roadmap

```
Roadmap
├── id
├── user_id
├── topics[] (chủ đề học)
├── modules[]
│   ├── id
│   ├── title
│   ├── order
│   └── lessons[]
│       ├── id
│       ├── title
│       ├── level (basic|intermediate|advanced)
│       ├── content (theory, examples, exercises)
│       ├── images[]
│       └── references[] (file_id, chapter, page)
├── created_at
└── status (draft|active|completed)
```

### 6.3 Uploaded File

```
UploadedFile
├── id
├── user_id
├── roadmap_id (nullable, nếu upload trong learning)
├── filename
├── format (pdf|docx|md|txt)
├── size_bytes
├── chunk_count
├── vector_index_ref
└── uploaded_at
```

### 6.4 Progress

```
Progress
├── user_id
├── roadmap_id
├── lesson_completions[] (lesson_id, completed_at)
├── quiz_results[] (lesson_id, score, passed, attempted_at)
└── last_activity_at
```

---

## 7. MVP Scope

### MVP 1 – Discovery + Roadmap (4–6 tuần)

- [ ] Intent parsing cho 1–2 lĩnh vực mẫu (vd: backend, tiếng Anh)
- [ ] Flow discovery với 5–7 câu hỏi cố định
- [ ] File Upload Module: PDF, DOCX, MD (parse → chunk → embed → index)
- [ ] RAG cho Agent trong discovery
- [ ] Roadmap generation dạng danh sách module + lesson (chưa có nội dung chi tiết)

### MVP 2 – Content Generation (4–6 tuần)

- [ ] Research cơ bản (1–2 nguồn/search)
- [ ] Generate lý thuyết + ví dụ
- [ ] Bài tập mức easy/medium (chưa cần hình ảnh)

### MVP 3 – Learning Loop (3–4 tuần)

- [ ] Lesson UI hiển thị nội dung
- [ ] Pre-lesson quiz (5–10 câu/bài)
- [ ] Ngưỡng pass (70%)
- [ ] Progress tracking

### MVP 4 – Enhancements (4–6 tuần)

- [ ] Image generation (Gemini)
- [ ] Upload file trong quá trình học
- [ ] Multi-topic handling rõ ràng
- [ ] Export roadmap

---

## 8. Risks & Mitigations

| Risk | Level | Mitigation |
|------|-------|------------|
| LLM hallucination | Cao | RAG + citation, fact-check cơ bản, user báo lỗi |
| API cost (LLM, embedding, image) | Cao | Cache nội dung, tier giới hạn, batch processing |
| Discovery quá dài, user bỏ cuộc | Trung bình | Giới hạn 5–7 câu, câu optional có thể skip |
| Quiz quá khó/dễ | Trung bình | Điều chỉnh theo lịch sử, A/B test |
| File parse sai (PDF phức tạp) | Trung bình | Dùng parser tốt, fallback, user review |
| Privacy/Compliance | Cao | Mã hóa, chính sách rõ, không train trên data user |

---

## 9. Success Metrics

| Metric | Target | Ghi chú |
|--------|--------|---------|
| Discovery completion rate | &gt; 60% | % user hoàn thành toàn bộ discovery |
| Roadmap acceptance rate | &gt; 70% | % user chấp nhận roadmap đề xuất |
| Lesson completion rate | &gt; 50% | % bài học được hoàn thành |
| Quiz first-pass rate | 60–80% | Không quá dễ, không quá khó |
| User retention (7-day) | &gt; 40% | User quay lại trong 7 ngày |
| File upload adoption | &gt; 30% | % user có upload ít nhất 1 file |

---

## 10. Open Questions

1. **Business model:** Freemium vs trả phí? Giới hạn lesson/ngày ở free tier?
2. **Scope chủ đề:** Lĩnh vực hỗ trợ ban đầu (backend, tiếng Anh, data, …)?
3. **Platform:** Web-first hay có mobile app?
4. **Integration:** Có tích hợp LMS, calendar, Notion không?
5. **Moderation:** Cơ chế xử lý nội dung nhạy cảm, vi phạm?

---

## 11. Appendix

### 11.1 Glossary

| Thuật ngữ | Định nghĩa |
|-----------|------------|
| Discovery | Giai đoạn hỏi đáp thu thập thông tin user |
| Roadmap | Lộ trình học gồm modules và lessons |
| RAG | Retrieval-Augmented Generation |
| Pre-lesson quiz | Bài kiểm tra trước khi học bài mới |

### 11.2 References

- PRD Analysis (internal)
- File Upload Module – RAG Pipeline Design

---

*Document maintained by product team.*
