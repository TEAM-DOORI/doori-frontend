# 기여 가이드 (Contributing Guide)

## 개발 환경 세팅

```bash
git clone <repo-url>
cd doori-frontend
npm install
npm run web
```

---

## 워크플로우

```
이슈 생성 → 브랜치 생성 → 개발 → Draft PR → 리뷰 → 머지
```

### 1. 이슈 생성
- GitHub Issues에서 템플릿(`Feature` / `Bug Report`)으로 이슈를 생성합니다.
- 이슈가 생성되면 **Notion에 자동으로 일감이 추가**됩니다.

### 2. 브랜치 생성
이슈 번호를 포함한 브랜치명을 사용합니다.

```
feature/12-login-screen
bugfix/34-home-scroll-fix
chore/5-eslint-setup
```

### 3. 개발 & 커밋
Conventional Commits 형식을 따릅니다.

```
feat: 로그인 화면 구현
fix: 홈 화면 무한 스크롤 오류 수정
chore: ESLint 설정 추가
refactor: 인증 로직 분리
docs: README 업데이트
```

### 4. PR 생성
- PR 본문에 **`Closes #이슈번호`** 를 반드시 포함합니다. (Notion 연동 필수)
- 작업 시작 시 **Draft PR**로 올려두면 Notion 상태가 자동으로 `리뷰중`으로 변경됩니다.
- 준비가 되면 `Ready for review`로 전환합니다.

### 5. CI 확인
PR을 열면 자동으로 아래 검사가 실행됩니다.

| 항목 | 명령어 |
|------|--------|
| ESLint | `npm run lint` |
| TypeScript | `tsc --noEmit` |
| Jest | `npm test` |

CI가 통과해야 머지할 수 있습니다.

### 6. 코드 리뷰
- CodeRabbit이 자동으로 코드 리뷰 코멘트를 남깁니다.
- 팀원 최소 1명의 Approve 후 머지합니다.

### 7. 머지
- PR이 `main`에 머지되면 Notion 상태가 자동으로 `완료`로 변경됩니다.
- 연결된 이슈도 자동으로 닫힙니다.

---

## 네이밍 컨벤션

| 구분 | 형식 | 예시 |
|------|------|------|
| 이슈 | `[타입] 작업 내용` | `[Feature] 로그인 화면 구현` |
| 브랜치 | `타입/이슈번호-작업-내용` | `feature/12-login-screen` |
| PR | `[타입] 작업 내용 (#이슈번호)` | `[Feature] 로그인 화면 구현 (#12)` |
| 커밋 | `타입: 작업 내용` | `feat: 로그인 화면 구현` |

**타입 종류:** `feature` / `bugfix` / `chore` / `refactor` / `docs`

---

## Notion 상태 자동화

| 이벤트 | Notion 상태 변화 |
|--------|----------------|
| 이슈 생성 | 일감 자동 생성 (`시작전`) |
| PR 오픈 (Draft 포함) | `리뷰중` |
| PR 머지 | `완료` |
| 이슈 `not planned` 닫힘 | `취소됨` |
| 이슈 재오픈 (`취소됨` 상태) | `시작전` |
| 진행중 변경 | 수동으로 Notion에서 변경 |
