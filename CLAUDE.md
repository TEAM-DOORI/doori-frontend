# DOORI Project Rules & Context (Customized for Expo Web App)

## 1. Project Identity & Purpose

- **Project Name:** DOORI (두리)
- **Concept:** AI-based housing mate matching & community platform for verified university students.
- **Project Goal:** Improving the efficiency of finding roommates and managing campus housing life.
- **Target Device:** APP (iOS/Android)
- **Design Base:** Figma width is **393px** (iPhone 14/15 standard).

## 2. Technical Stack & Environment

- **Framework:** Expo (React Native) with Expo Router.
- **Platform:** Priority on Web, with future expansion to iOS/Android.
- **Language:** TypeScript (Strict mode).
- **State Management:** - Server State: TanStack Query (@tanstack/react-query).
  - Client State: Zustand.
- **Styling:** React Native `StyleSheet` (Standard).
- **Icons:** `@expo/vector-icons` (Prefer Ionicons).

## 3. Directory Structure & Path Aliases

Follow the structure below and use absolute paths only:

- `@/*`: `./*` (프로젝트 루트)
- `@components/*`: `./components/*`
- `@screens/*`: `./screens/*`
- `@hooks/*`: `./hooks/*`
- `@constants`: `./constants` (barrel import)
- `@constants/*`: `./constants/*`
- `@assets/*`: `./assets/*`

## 4. UI/UX & Responsive Rules (CRITICAL)

- **393px Scaling:** Use a scaling utility based on 393px width for fonts, padding, and margins.
- **Mobile-First:** Avoid hover-specific logic unless necessary. Focus on touch interactions.
- **Safe Area:** Always use `useSafeAreaInsets` from `expo-safe-area-context` for the custom TabBar and Headers.
- **Custom TabBar:** Located in `@components/navigation/TabBar`. It should feel like a native app.

## 5. Coding Standards & Conventions

- **Component Style:** Functional components with Hooks.
- **Commit Messages:** `type: description (#issue)` (feat, fix, style, refactor, docs, chore, test).
- **Branching:** Base all PRs on the `develop` branch.
- **Testing:** - Write Unit Tests using **Jest** and **React Testing Library**.
  - All new features must include a basic test file.
- **AI Code Review:** Codes will be reviewed by CodeRabbit (AI). Keep code clean and readable.
- "특정 페이지 전용 이미지는 해당 페이지 폴더 내 assets/에 위치시키고, 공통 이미지는 루트 assets/를 사용해."
- "StyleSheet 파일도 항상 가장 가까운 폴더 내에서만 사용해"
- "기본적으로 모든 폰트는 항상 @assets/fonts 에 있는 pretandard 폰트 사용 default 값 fontWeight=Medium"

## 6. Development Workflow

- **Git Flow:** `main` (Prod) <- `develop` (Dev) <- `feat/feature-name`.
- **Default Branch:** `develop`.
- **Environment Variables:** Manage sensitive data (API keys) via `.env` (process.env).

## 7. Instructions for AI

- **Language:** All responses and comments must be in **Korean**.
- **Responsive Coding:** When creating UI, always calculate sizes relative to the **393px** design width.
- **Error Handling:** Include proper error boundaries and validation (especially for school email verification).
- **Review:** Before finalizing code, suggest potential improvements for performance (e.g., useMemo, useCallback).
- **Git Safety (no commit/push):** Never run write or share-style git commands (`git commit`, `git push`, `git merge`, `git rebase`, `gh pr create`, etc.) unless the user explicitly requests it in the current turn. Permission from previous turns does NOT carry over. Keep changes in the working tree only; confirm commit timing and message with the user.
- **Plan Workflow (task-by-task with checkboxes):** When following a plan file (e.g. `.claude/plans/<task>-plan.md`), execute the defined **task units one at a time** in order. After finishing each unit, **update the corresponding checkbox in the plan file to `- [x]` (via the Edit tool) BEFORE starting the next unit**. Do NOT batch multiple units together — the plan file must always reflect current progress.
- **Suggest commit message after each unit:** After completing each task unit (and checking the box), propose a recommended commit message in the response — following the project's Conventional Commits convention (`type: 작업 내용 (#이슈번호)`, see Section 5). Present the message as a fenced code block the user can copy. Do NOT run `git commit` yourself (see Git Safety above) — only suggest the text so the user can decide when and whether to commit.
