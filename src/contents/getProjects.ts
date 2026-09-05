import meaireImage from '../assets/dddd.png'
import infraImage from '../assets/infra.png'
import argoImage from '../assets/argocd.png'
import argoViewImage from '../assets/argo_view.png'

export default function getContent(category: string) {
    const contents = {
        Tomato_Board: [
          { id: '1', name: 'Description', type: 'folder', children: {id: '1-1', title: 'Tomato Board', techStack:["React","FastAPI","LangGraph","Neo4j"], content: `
![img](https://raw.githubusercontent.com/Oldentomato/tomato_board/main/screenshots/dashboard.png)

날씨로 물든 개인 워크스페이스. 일정·메모·즐겨찾기를 한 화면에 두고, 대화가 갈라져도 이어지는 AI 채팅으로 문서까지 다룬다.

## 배경
개인 일정과 메모, 자주 쓰는 링크를 한곳에 두고, 같은 공간에서 AI에게 질문하고 문서도 다루고 싶었다. 일반 채팅은 한 줄로만 이어져서 같은 주제를 여러 방향으로 나눠 보기 어려웠고, 문서는 키워드가 아니라 내용 기준으로 찾거나 Word·한글로 바꾸고 싶었다.

## 역할
개인 프로젝트로 대시보드와 AI 채팅, 문서 파이프라인까지 설계·구현했다.

## 핵심 설계
대화는 한 줄이 아니라 트리로 쌓인다. 이전 턴에서 다른 질문을 보내면 그 지점에서 가지가 생기고, 기존 맥락은 그대로 둔 채 다른 방향을 이어갈 수 있다. Google 계정으로 로그인하고, 헤더에서 대시보드와 AI 채팅을 오간다.

![img](https://raw.githubusercontent.com/Oldentomato/tomato_board/main/screenshots/ai_chat.png)

## 주요 구현
- 위치 기반 날씨가 대시보드 배경이 되고, 캘린더·마크다운 포스트잇·즐겨찾기를 한 화면에서 다룬다
- 채팅은 방 단위로 나누고, 일반 대화(시점 민감 정보는 웹 검색)와 문서관리 에이전트를 고를 수 있다
- md, txt, docx, hwp, pdf를 올린 뒤 임베딩하면 의미 검색·미리보기·Word/한글 변환이 된다

![img](https://raw.githubusercontent.com/Oldentomato/tomato_board/main/screenshots/chat_doc.png)

## 트러블슈팅
**문제** 트리형 대화를 LangGraph MemorySaver에 그대로 넣을 수 없었다.  
**원인** Neo4j가 LangGraph 기본 메모리 백엔드가 아니라, 가지가 갈라진 히스토리를 자동 저장하지 못했다.  
**결정** 그래프 시작/끝에 load·persist 노드를 두고 대화 경로를 직접 읽고 쓰게 했다.  
**결과** 같은 주제에서 가지를 나눠도 이전 맥락을 유지한 채 이어갈 수 있게 됐다.

**문제** 문서를 올리기만 하면 내용 검색이 될 것처럼 보였지만, 키워드 검색으로는 비슷한 글을 찾지 못했다.  
**원인** 업로드와 임베딩이 분리되어 있고, 인덱싱 전에는 의미 검색 대상이 없었다.  
**결정** 문서 패널에서 임베딩할 파일을 고른 뒤에만 문서관리 에이전트가 내용 기준으로 답하게 했다.  
**결과** 키워드가 달라도 비슷한 문서를 찾아 답하고, 미리보기·변환은 목록에서 따로 처리한다.

## 결과
일정·메모·즐겨찾기와 트리형 AI 채팅, 문서 작업을 한 워크스페이스에서 이어갈 수 있게 됐다.
`}
          },
          { id: '3', name: '2026-01-19.startDate', type: 'file' },
          { id: '4', name: 'still.endDate', type: 'file' },
          { id: '5', name: 'github 이동', link:'https://github.com/Oldentomato/tomato_board', type: 'link' },
        ],
        infra: [
            { id: '1', name: 'Description', type: 'folder', children: {id: '1-1', title: 'HomeServer Infra', techStack:["k3s","Argo CD","Helm","Traefik"], content: `
![img](${infraImage})

홈서버 k3s에서 개인 서비스를 GitOps로 상시 운영하고, 신규 앱은 values.yaml 하나로 붙는 배포 자동화를 만든 인프라.

## 배경
Synology NAS, Dell 워크스테이션, GPU 서버가 나뉘어 있고, 공개 서비스와 개인 도구를 한 클러스터에서 같이 돌려야 했다. 공개는 하되 관리 도구는 막아야 했고, 배포는 수동 SSH가 아니라 GitOps로 맞추고 싶었다. 서비스가 늘 때마다 AppProject와 Application YAML을 복제하는 방식은 유지 비용이 커서, 기존 앱은 건드리지 않고 신규만 공통 차트로 받는 경로가 필요했다.

## 역할
하드웨어 구성부터 네트워크, 클러스터, CI/CD, 인증, 신규 서비스 온보딩 CLI까지 혼자 설계·운영한다.

## 핵심 설계
Traefik으로 진입을 모으고, 공개 앱과 oauth-proxy 뒤 앱을 경로로 나눈다. 기존 portfolio, tomato_board 등은 원래 CI/CD·Helm·kubectl Ingress를 그대로 둔다.

신규만 applications/ + 공통 차트 charts/service + ApplicationSet을 쓴다. ApplicationSet이 GitHub localInfra의 applications/ 를 감시하고, values.yaml이 생기면 Argo CD Application을 만든다. 폴더 이름이 곧 컴포넌트 이름이다. 같은 앱 아래 front/back/worker는 모두 namespace 앱이름-system 을 공유한다.

Ingress는 Helm이 만들지 않는다. 차트는 Deployment / Service / ServiceAccount만 렌더하고, Traefik Ingress는 기존처럼 system/proxy_ingress/ YAML을 kubectl apply 한다. Argo CD prune에 안 걸린다.

![img](${argoImage})
Argo CD가 공통 차트와 values를 합쳐 워크로드를 맞춘다.

![img](${argoViewImage})

## 주요 구현
- 서비스는 Helm으로 올리고 Argo CD로 동기화한다. TLS는 Traefik과 cert-manager로 처리한다.
- 개인용 대시보드·업로더는 Google oauth-proxy 뒤로만 연다.
- 클러스터에 AppProject와 ApplicationSet은 최초 1회만 등록한다. applications/ 가 비어 있어도 에러가 아니다.
- python service.py create 로 values.yaml, Ingress YAML, 필요하면 SealedSecret을 만든다. 평문 Secret은 Git에 넣지 않는다.
- 앱 레포 GitHub Actions는 Docker 이미지를 올리고, 해당 values의 image.tag 만 바꾼다. 키 경로는 기존 서비스와 같다.

## 신규 서비스 배포 순서
앱 레포 Actions는 이미지 push와 GitOps image.tag 변경을 같이 하므로, values 파일이 없으면 tag 단계가 실패하고, 이미지가 없으면 Argo CD가 ImagePullBackOff가 난다. 그래서 파일을 먼저 만들고 이미지는 그다음에 올린다.

1. service.py create 로 values.yaml을 만들고, 이미지 tag를 Actions가 찍을 첫 버전과 맞춘다.
2. localInfra.git main 에 push한다.
3. 앱 레포 GITOPS_VALUES_PATH 를 그 파일로 맞춘다. 예: applications/order-agent/front/values.yaml
4. 앱 레포에서 Actions를 돌린다.
5. 이미지가 올라온 뒤 Ingress를 kubectl apply 한다.

단일 서비스는 applications/앱이름/values.yaml, 컴포넌트가 여러 개면 applications/앱이름/컴포넌트/values.yaml 이다. back Ingress path 기본값은 /api 다.

## 트러블슈팅
**문제** 서비스를 추가할 때마다 Argo CD Application YAML을 복사해야 했다.  
**원인** 앱마다 appProject와 applications 매니페스트가 고정돼 있었다.  
**결정** 신규만 ApplicationSet + 공통 차트로 받고, 기존 앱은 applications/ 아래로 옮기지 않았다.  
**결과** 신규는 values.yaml 추가만으로 Application이 생기고, 운영 중인 배포는 그대로다.

**문제** GitOps 파일과 컨테이너 이미지 중 하나만 있으면 배포가 깨진다.  
**원인** Actions는 values의 image.tag를 바꾸고, Argo CD는 그 태그의 이미지를 pull한다.  
**결정** values를 Git에 먼저 올리고, 그다음 Actions로 이미지를 밀어 넣는다.  
**결과** tag 변경 실패와 ImagePullBackOff를 순서 규칙으로 막는다.

**문제** Ingress를 Helm values로 켜면 기존 kubectl Ingress와 섞이고 prune 위험이 있다.  
**원인** 차트와 클러스터에 이미 있는 Traefik Ingress의 소유권이 겹친다.  
**결정** 공통 차트는 Ingress를 렌더하지 않고, proxy_ingress YAML만 kubectl apply 한다.  
**결과** 기존 서비스와 같은 방식으로 라우팅이 남고, Argo CD가 지우지 않는다.

## 현재 운영
- 포트폴리오 웹
- Tomato Board
- 마크다운 블로그 업로더 (개인용)
- Tomato Stusio (개인용)
`}
      },
      { id: '3', name: '2025-10-01.startDate', type: 'file' },
      { id: '4', name: 'still.endDate', type: 'file' }, 
      { id: '5', name: 'github 이동', link:'https://github.com/Oldentomato/localInfra', type: 'link' },
      { id: '6', name: 'oauth-proxy미들웨어', link:'https://odblog.vercel.app/posts/oauth-proxy-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-%EA%B5%AC%EC%84%B1', type: 'link' },
      { id: '7', name: 'argoCD 구축 게시글', link:'https://odblog.vercel.app/posts/CD-%EA%B5%AC%EC%84%B1', type: 'link' },
      { id: '8', name: 'wsl2 외부접속 연결법 게시글', link:'https://odblog.vercel.app/posts/wsl2%EC%99%80-%EC%99%B8%EB%B6%80%EC%A0%91%EC%86%8D-%EC%97%B0%EA%B2%B0%EB%B2%95', type: 'link' }
        ],

///////////////////////////////////////////
    meaire: [
      { id: '1', name: 'Description', type: 'folder', children: {id: '1-1', title: 'AWS EKS 인프라', techStack:["AWS EKS","Terraform","Argo CD","VPN"], content: `
![img](${meaireImage})

SK Shieldus Rookies 최종 프로젝트 Meaire를 AWS EKS에 올리고, 공개 트래픽과 운영 도구 접근을 나눈 인프라.

## 배경
프론트엔드, 백엔드, Airflow를 한 클러스터에서 배포해야 했다. Kibana·Portainer 같은 관리 도구는 인터넷에 열면 안 됐고, 외부 GPU 서버도 같은 네트워크처럼 붙여야 했다. 배포는 수동 SSH가 아니라 GitOps로 맞추고 싶었다.

## 역할
팀에서 AWS 인프라, 네트워크 보안, CI/CD를 담당했다. 아키텍처 설계부터 Terraform/Ansible 배포, Helm 차트, Argo CD 구성까지 맡았다.

## 핵심 설계
공개 앱은 External ALB, 관리 도구는 Internal ALB 뒤로 보내고 Internal은 VPN으로만 들어가게 했다. EKS를 중심으로 서비스·스토리지·CI/CD를 묶고, Site-to-Site VPN으로 외부 GPU 서버를 연결했다.

![img](https://github.com/Oldentomato/astro-paper/blob/main/src/data/images/1760978291053-infra.png?raw=true)

## 주요 구현
- EKS 클러스터는 Terraform으로 올리고, 이후 구성은 Ansible로 반복 배포
- Internal ALB는 NAT 뒤에 두고 AWS VPN 터널로만 접근
- 서비스는 Helm 차트로 패키징하고 Argo CD로 동기화

## 트러블슈팅
**문제** Terraform으로 스택 전체를 한 번에 올리다가 IAM 의존성 순서 때문에 환경이 중간에 깨졌다.  
**원인** 클러스터, 노드 그룹, IAM 역할이 서로를 참조하는데 apply 순서가 보장되지 않았다.  
**결정** Terraform 범위는 클러스터에 한정하고, 나머지는 셸 스크립트 이후 Ansible로 옮겼다.  
**결과** 의존성 순환을 피하면서 클러스터 이후 구성도 다시 실행할 수 있게 됐다.

**문제** Kibana, Portainer가 기존 ALB를 타고 인터넷에 노출됐다.  
**원인** 진입점이 ALB 하나라 공개 앱과 관리 앱의 네트워크 경계가 없었다.  
**결정** Internal ALB를 추가하고, AWS VPN으로만 접속하게 했다.  
**결과** 사용자 트래픽과 운영 트래픽이 분리됐다.

## 결과
Meaire 프론트/백엔드와 Airflow를 EKS에 배포하고, GitOps로 올리는 파이프라인까지 팀 환경에서 사용했다.
`}
      },
      { id: '3', name: '2025-08-06.startDate', type: 'file' },
      { id: '4', name: '2025-10-01.endDate', type: 'file' },
      { id: '5', name: 'github 이동', link:'https://github.com/SSR3-FinalPj', type: 'link' },
      { id: '6', name: '인프라구조 게시글', link:'https://odblog.vercel.app/posts/EKS-%EC%9D%B8%ED%94%84%EB%9D%BC-%EA%B5%AC%EC%A1%B0', type: 'link' },
      { id: '7', name: 'EKS CI/CD 구성 게시글', link:'https://odblog.vercel.app/posts/CD-%EA%B5%AC%EC%84%B1', type: 'link' },
      { id: '8', name: '아마존 vpn 터널링 게시글', link:'https://odblog.vercel.app/posts/%EC%95%84%EB%A7%88%EC%A1%B4-vpn-%ED%84%B0%EB%84%90%EB%A7%81', type: 'link' },
    ],

///////////////////////////////////////////
    bloguploader: [
      { id: '1', name: 'Description', type: 'folder', children: {id: '1-1', title: 'Markdown Blog Uploader', techStack:["React","GitHub","oauth2-proxy","k8s"], content: `
![img](https://github.com/Oldentomato/markdown_blog_uploader/raw/main/assets/screenShot_1.png)

GitHub에 올라간 블로그 저장소의 마크다운을, 로컬 pull/push 없이 웹에서 쓰고 고치고 올리는 업로더.

## 배경
블로그와 포스트가 GitHub 프로젝트 안의 md 파일이다. 글을 올리거나 고치려면 저장소를 pull 받고 수정한 뒤 다시 push 해야 해서, 짧은 수정도 로컬 작업이 필요했다. 이미지는 미리보기용 URL과 저장소 경로가 달라서, 게시할 때 경로를 손으로 맞추기 번거로웠다. 개인용 도구라 인터넷에 열어 두면 안 됐다.

## 역할
프론트 에디터, 이미지 임시 업로드, GitHub 게시 흐름, oauth2-proxy 뒤 배포까지 혼자 구성했다.

## 핵심 설계
왼쪽에서 마크다운을 쓰면 오른쪽에 실시간 미리보기가 뜬다. 이미지는 먼저 서버에 임시로 올라가고, 글을 게시할 때 저장소로 push 하면서 본문 경로를 GitHub 기준으로 바꾼다. 이미 올라간 글은 마크다운 GitHub 주소를 넣으면 내용을 가져와 고친 뒤 다시 올린다. 진입은 oauth2-proxy 미들웨어로 막아서 본인만 들어간다.

## 주요 구현
- 좌우 분할 에디터. 입력과 미리보기를 같은 화면에서 맞춘다.
- 이미지 임시 업로드 후, 게시 시 파일 push와 마크다운 경로 치환을 같이 한다.
- 포스트 GitHub URL로 기존 md를 불러와 수정하고 다시 커밋한다.
- 홈서버 k8s 앞에 oauth2-proxy를 두어 Google 로그인된 계정만 통과시킨다.

## 트러블슈팅
**문제** 한 줄만 고쳐도 블로그 저장소를 clone/pull/push 해야 했다.  
**원인** 포스트가 GitHub 안의 md라서 배포 단위가 로컬 Git 작업이었다.  
**결정** 웹에서 본문을 받아 GitHub에 바로 올리게 했다.  
**결과** 로컬 저장소 없이 초안 작성과 수정을 웹에서 끝낸다.

**문제** 미리보기 속 이미지 URL을 그대로 올리면 게시 후 깨진다.  
**원인** 편집 중에는 임시 서버 경로를 쓰고, 블로그는 저장소 안의 파일 경로를 본다.  
**결정** 게시 시점에 이미지를 저장소에 push하고, 본문의 경로를 그 위치로 치환한다.  
**결과** 미리보기와 실제 포스트가 같은 그림을 가리킨다.

**문제** 업로더를 클러스터에 올리면 누구나 글을 올릴 수 있다.  
**원인** 앱 자체에 사용자 경계가 없고, 공개 Ingress만 있으면 된다.  
**결정** oauth2-proxy를 앞에 두고 허용된 Google 계정만 통과시킨다.  
**결과** 블로그는 공개돼도, 작성 도구는 본인만 쓴다.

## 결과
GitHub 기반 블로그를 웹 에디터에서 작성·수정하고, 이미지는 게시할 때 경로까지 맞춰 올라간다. 작성 화면은 oauth2-proxy 뒤에서만 열린다.
`}
      },
      { id: '3', name: '2025-10-10.startDate', type: 'file' },
      { id: '4', name: '2025-10-14.endDate', type: 'file' },
      { id: '5', name: 'github 이동', link:'https://github.com/Oldentomato/markdown_blog_uploader', type: 'link' },
      { id: '6', name: 'oauth-proxy 게시글', link:'https://odblog.vercel.app/posts/oauth-proxy-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-%EA%B5%AC%EC%84%B1', type: 'link' }
    ],

///////////////////////////////////////////
    vpmodel: [
      { id: '1', name: 'Description', type: 'folder', children: {id: '1-1', title: '소실점 검출 모델 테스트', techStack:["Python","pytorch"], content: `


## Video reconstruction using vp detection results  
### Used sources
- [(cvpr'22)VanishingPoint_HoughTransform_GaussianSphere](https://github.com/yanconglin/VanishingPoint_HoughTransform_GaussianSphere) 
- [(neurVPS)NeurVPS](https://github.com/zhou13/neurvps)  


### Metrics  
- AA(Angular Accuracy) Graph  
    - cvpr  
    ![img1](https://raw.githubusercontent.com/Oldentomato/video_reconstruction_using_vp_detection_results/main/README_imgs/AA_graph_cvpr.png)  
    - neur  
    ![img2](https://raw.githubusercontent.com/Oldentomato/video_reconstruction_using_vp_detection_results/main/README_imgs/AA_graph_neur.png)  
   - all  
    ![img3](https://raw.githubusercontent.com/Oldentomato/detect_vp-reconstruction_vid/main/README_imgs/AA_graph.png)  

 ### SnapShot  
 - cvpr NYU Dataset Result  
   ![img4](https://raw.githubusercontent.com/Oldentomato/detect_vp-reconstruction_vid/main/README_imgs/snapshot.gif)

### Reference paper  
[(cvpr) https://arxiv.org/abs/2203.08586](https://arxiv.org/abs/2203.08586)  
[(neurVPS) https://arxiv.org/abs/1910.06316](https://arxiv.org/abs/1910.06316)
`}
      },
      { id: '3', name: '2023-07-18.startDate', type: 'file' },
      { id: '4', name: '2023-08-28.endDate', type: 'file' }, 
      { id: '5', name: 'github 이동', link:'https://github.com/Oldentomato/video_reconstruction_using_vp_detection_results', type: 'link' },
      { id: '6', name: '환경재현 방법 게시글', link:'https://odblog.vercel.app/posts/%EC%86%8C%EC%8B%A4%EC%A0%90-%EA%B2%80%EC%B6%9C-%EC%8B%A4%ED%97%98%ED%99%98%EA%B2%BD-%EC%9E%AC%ED%98%84%ED%95%98%EA%B8%B0', type: 'link' }
    ],
    }

    return contents[category as keyof typeof contents]
}