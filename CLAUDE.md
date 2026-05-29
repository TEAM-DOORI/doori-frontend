# DOORI Project Rules & Context (Expo App)

## 1. Project Identity & Purpose

- **Project Name:** DOORI (두리)
- **Concept:** AI-based housing mate matching & community platform for verified university students.
- **Project Goal:** Improving the efficiency of finding roommates and managing campus housing life.
- **Target Device:** App (iOS/Android)
- **Design Base:** Figma width is **393px** (iPhone 14/15 standard).

## 2. Technical Stack & Environment

- **Framework:** Expo (React Native) with Expo Router.
- **Platform:** App first, with future expansion to iOS/Android.
- **Language:** TypeScript (strict mode).
- **State Management:**
  - Server State: TanStack Query (`@tanstack/react-query`)
  - Client State: Zustand
- **Styling:** React Native `StyleSheet` (standard).
- **Icons:** `@expo/vector-icons` (prefer Ionicons).

## 3. Directory Structure & Path Aliases

Use absolute path aliases only:

- `@/*`: `./*` (project root)
- `@components/*`: `./components/*`
- `@screens/*`: `./screens/*`
- `@hooks/*`: `./hooks/*`
- `@constants`: `./constants` (barrel import)
- `@constants/*`: `./constants/*`
- `@assets/*`: `./assets/*`

## 4. UI/UX & Responsive Rules (CRITICAL)

- **393px Scaling:** Calculate all font sizes, padding, and margins using a scaling utility based on 393px width.
- **Mobile-First:** Avoid hover-specific logic unless necessary. Focus on touch interactions.
- **Safe Area:** Always use `useSafeAreaInsets` from `expo-safe-area-context` for custom TabBar and headers.
- **Custom TabBar:** Located in `@components/navigation/TabBar`. It must feel like a native app.

## 5. Coding Standards & Conventions

- **Component Style:** Functional components with Hooks.
- **Commit Messages:** `type: description (#issue)` (feat, fix, style, refactor, docs, chore, test). Write commit messages in **Korean**.
- **Branching:** Base all PRs on the `main` branch. Follow-up work branches off the preceding feature branch.
- **Testing:** Write unit tests with Jest and React Testing Library. All new features must include a basic test file.
- **AI Code Review:** Code is reviewed by CodeRabbit. Keep code clean and readable.
- Page-specific images go in the page folder's `assets/`. Shared images go in the root `assets/`.
- `StyleSheet` files must always stay within the closest folder to their component.
- All fonts use Pretendard from `@assets/fonts`. Default `fontWeight=Medium`.
- **Color Tokens:** Colors defined in `constants/colors.ts` (`colorStyle`) must always be referenced as tokens (e.g. `colorStyle.Sub2`). Raw hex is only allowed for one-off colors not in the token set; add to `colors.ts` immediately if the color becomes reusable.

## 6. Development Workflow

- **Git Flow:** `main` (production) ← `feat/feature-name`
- **Default Branch:** `main`
- **Environment Variables:** Manage sensitive data (API keys) via `.env` (process.env).

## 7. Instructions for AI

- **Language:** All responses and code comments must be in **Korean**.
- **Responsive Coding:** When creating UI, always calculate sizes relative to the **393px** design width.
- **Error Handling:** Include proper error boundaries and validation (especially for school email verification).
- **Review:** Before finalizing code, suggest potential improvements for performance (e.g., useMemo, useCallback).
- **Git Safety (no commit/push):** Never run write or share-style git commands (`git commit`, `git push`, `git merge`, `git rebase`, `gh pr create`, etc.) unless the user explicitly requests it in the current turn. Permission from previous turns does NOT carry over. Keep changes in the working tree only; confirm commit timing and message with the user.
- **Plan Workflow (task-by-task with checkboxes):** When following a plan file (e.g. `.claude/plans/<task>-plan.md`), execute the defined **task units one at a time** in order. After finishing each unit, **update the corresponding checkbox in the plan file to `- [x]` (via the Edit tool) BEFORE starting the next unit**. Do NOT batch multiple units together — the plan file must always reflect current progress.
- **Suggest commit message after each unit:** After completing each task unit (and checking the box), propose a recommended commit message in the response — following the project's Conventional Commits convention (`type: 작업 내용 (#이슈번호)`, see Section 5). Present the message as a fenced code block the user can copy. Do NOT run `git commit` yourself (see Git Safety above) — only suggest the text so the user can decide when and whether to commit.
