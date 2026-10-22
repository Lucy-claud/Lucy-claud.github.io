# 신성철 경영관리·재무회계 포트폴리오 웹사이트

리멤버 프로필에 등록하기 위한 정적 포트폴리오 사이트입니다. 서버, 데이터베이스, 빌드 과정이 없습니다.

## 폴더 구조

```
portfolio_web/
├─ index.html                 본문(모든 내용은 여기 있음)
├─ assets/
│  ├─ css/style.css           디자인
│  ├─ js/config.js            공개 설정(사진·이메일·전화번호 표시 여부)
│  ├─ js/main.js              메뉴, 프로젝트 펼치기 등 동작
│  └─ img/                    프로필 사진, 화면 캡처(가림 처리본), 파비콘
├─ .github/workflows/pages.yml GitHub Pages 자동 배포
└─ .nojekyll
```

## 로컬에서 보기

`index.html`을 더블클릭해 브라우저로 열면 됩니다.

## 내용 수정

- 문구: `index.html`에서 해당 문장을 찾아 고칩니다.
- 연락처·사진 공개 여부: `assets/js/config.js`의 `true` / `false`를 바꿉니다.
  - 기본값: 사진 표시, 이메일 표시, 전화번호 숨김
  - 이메일과 전화번호를 모두 숨기면 "리멤버 프로필 메시지로 연락" 안내가 대신 표시됩니다.
- 화면 캡처를 새로 넣을 때는 이름·금액·회사명 등을 반드시 가린 이미지를 사용합니다.

## 배포 (GitHub Pages)

1. 이 폴더를 GitHub 저장소의 루트로 올립니다(`main` 브랜치).
2. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
3. `main`에 push하면 `.github/workflows/pages.yml`이 실행되어 자동 배포됩니다.
4. **Actions** 탭에서 실행이 초록색(성공)인지 확인한 뒤, **Settings → Pages**에 표시된 주소로 접속해 확인합니다.
   - 주소 형식: `https://<GitHub 사용자명>.github.io/<저장소명>/`
   - 모든 파일 경로가 상대경로라 `/저장소명/` 아래에서도 그대로 동작합니다.

### 수정 후 재배포

파일을 고친 뒤 커밋하고 `main`에 push하면 1~2분 뒤 자동으로 반영됩니다.

```
git add -A
git commit -m "포트폴리오 문구 수정"
git push
```

## 공개 전 확인 사항

- 저장소와 사이트는 누구나 볼 수 있습니다. API 키·비밀번호·회사 내부 자료·원본 문서는 넣지 않습니다.
- 글꼴(Pretendard)은 jsDelivr CDN에서 불러옵니다. 연결이 안 되면 시스템 글꼴로 대체되어 표시됩니다.
