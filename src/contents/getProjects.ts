import meaireImage from '../assets/dddd.png'
import infraImage from '../assets/infra.png'
import argoImage from '../assets/argocd.png'
import argoViewImage from '../assets/argo_view.png'

export default function getContent(category: string) {
    const contents = {
        infra: [
            { id: '1', name: 'Description', type: 'folder', children: {id: '1-1', title: 'HomeServer Infra', techStack:["k8s","argoCD","docker","network","wsl2"], content: `
![img](https://joojae.com/content/images/2025/10/Kubernetes-Logo.png) 
홈서버를 이용하여 서비스 구축 및 배포
synology NAS로 DB와 테스트서버 구축
Dell Workstation과 GPU를 이용한 LLM용 GPU서버를 설치, 그리고 k8s로 서비스 구축

## 아키텍처  
- 홈서버 구성도  
![img](${infraImage})   
- argoCD
![img](${argoImage}) 
argoCD 동작 구성도  
![img](${argoViewImage})  
argoCD Dashboard
![img](https://miro.medium.com/v2/resize:fit:720/format:webp/1*JBVCjQGg7ydTreYFnNsUXQ.png)  
oauth-proxy 구성도

## 구현 기능  
- traefik을 이용하여 reverse proxy구축
- 모든 서비스들 helm으로 구축
- 특정 서비스는 oauth-proxy를 이용하여 특정 사용자만 접근하도록 구성
- tls 구축
- argoCD를 이용하여 CI/CD 구현

## 현재 운영중인 서비스
- 포트폴리오 웹서비스
- 마크다운 블로그 업로더(개인접근용) 
- llm 학습용 서버(개인접근용)
- portainer 서버(개인접근용)
- vllm fastAPI 서버
- traefik 로드밸런싱용 reverse proxy 서버

## 기술스택 
- k8s
- docker
- portainer
- wsl2
- helm
- argoCD
- oauth-proxy(google provider)
- traefik


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
        tomatoagent: [
      { id: '1', name: 'Description', type: 'folder', children: {id: '1-1', title: 'TomatoAgent', techStack:["Python","LLM","React","FastAPI"], content: `
![img](https://github.com/Oldentomato/tomato_agent/raw/main/assets/logo.jpeg)  

## 아키텍쳐
![img2](https://github.com/Oldentomato/PortFolio_Next/blob/main/postsimg/post_1/img_1.png?raw=true)

## 동작 모습  
![img3](https://github.com/Oldentomato/tomatoAgentApp/raw/main/readme/Animation4.gif?raw=true)
![img4](https://github.com/Oldentomato/tomatoAgentApp/raw/main/readme/Animation.gif?raw=true)
![img5](https://github.com/Oldentomato/tomatoAgentApp/raw/main/readme/Animation2.gif?raw=true)
![img6](https://github.com/Oldentomato/tomatoAgentApp/raw/main/readme/Animation3.gif?raw=true)

## 구현 기능

- OpenAI api를 이용한 agent 구성(langchain X)
- fastAPI 서버 구성
- fastAPI middleware 구성
- docker-swarm을 이용한 오케스트레이션 서버 구현
- electron으로 프론트엔드 작성

## 핵심 기능

- 데스크탑 앱용 chatGPT
- 웹 검색 agent
- gptArchive agent(프로그래밍 코드나, url 등 컨텐츠들을 요약하여 저장한 뒤 키워드 검색이 아닌 임베딩을 이용한 뉘앙스 검색으로 컨텐츠를 찾는 agent)

## 기술스택

- docker-swarm
- mysql
- redis
- fastAPI
- electron


## 트러블 슈팅

- openAI에서 대답 form을 제공해도 일관성있게 대답하지 않은 경우
    
    순수 python코드로 agent기능과 프롬프트를 구성하다보니 답변 form이 일관적이지 않음.      시간이 지난 뒤 openAI에서 api요청에 agent를 추가할 수 있는 기능이 생겨 전체 구조를 다시 작성함. 그 결과, 지금까지 모든 대답에 오류난 일이 없음
    
- 대화내역이나 대화 리스트를 가져올때 매번 가져올 때마다 조금씩 딜레이가 걸리는 문제
    
    redis를 이용하여 캐시서버를 구축하고, 특정 대화내역을 이용할 때마다 redis에 대화내역을 저장하여 다시 그 대화를 꺼낼때마다 느려지지 않게 최적화를 시킴(로그아웃하면 모든 캐시내용은 삭제)
    
- gptArchive에서 FAISS를 이용한 RAG 구성 중 임베딩 결과들중 특정 요소만 지워야하는 경우
    
    기본적인 FAISS는 새로운 임베딩결과를 추가하는 것만 있고, 특정 요소만 지우는 기능은 없음. 그러려면 기존 임베딩결과와 새로운 결과까지 다시 새로 만들어야하는 불편함이 있음.                하지만 특정 키를 기반으로 저장하는 법을 고안하여 키 기반 저장&삭제 기능을 구현함`}
      },
      { id: '3', name: '2024-02-07.startDate', type: 'file' },
      { id: '4', name: '2024-05-17.endDate', type: 'file' }, 
      { id: '5', name: 'github 이동', link:'https://github.com/Oldentomato/tomatoAgentApp', type: 'link' },
      { id: '6', name: '서비스 구성기 게시글', link:'https://odblog.vercel.app/posts/tomatoAgent-Server-%EA%B5%AC%EC%84%B1%EA%B8%B0', type: 'link' },
      { id: '7', name: 'gptArchive 아이디어 게시글', link:'https://odblog.vercel.app/posts/GPT-Archive', type: 'link' }
    ],

///////////////////////////////////////////
    meaire: [
      { id: '1', name: 'Description', type: 'folder', children: {id: '1-1', title: 'Meaire(SK-Shieldus Rookies 프로젝트)', techStack:["Python","AWS EKS","k8s","CI/CD"], content: `

![img](${meaireImage})  
SK Shieldus 루키즈 최종 프로젝트에서 서비스 배포를 위한 AWS EKS 구축  
프론트엔드와 백엔드, 그리고 Airflow 스케줄링 서버 등을 AWS에 구축하고 CI/CD까지 구성함

## 구현 목록

- eks 구성을 위한 terraform 작성
- 서비스 아키텍쳐 설계
- 보안을 위한 internal,external alb구성
- aws vpn 구성(internal alb용)
- arcoCD를 이용한 CI/CD 구성
- 서비스 helm chart 구성

## 아키텍쳐
- aws infra
![img](https://github.com/Oldentomato/astro-paper/blob/main/src/data/images/1760978291053-infra.png?raw=true)  
- 보안을 고려한 이중 alb 구성(내부용 alb는 vpn을 통해 접속)  
- terraform과 ansible을 이용하여 배포  
- vpn을 이용하여 외부 gpu서버와 연결 구축  

## 기술 스택
- aws eks, ebs, efs, vpn, ecr
- terraform
- docker
- k8s


## 트러블 슈팅

- terraform구성에서 iam정책 문제로(dependency 순서문제) 환경이 제대로 구축안됨
    
    전체 terraform구성에서 클러스터만 terraform으로 하고 나머지는 sh스크립트로 대체함(추후에 sh에서 ansible로 변경)
    
- kibana, portainer 등 개발자만 들어가야하는 서비스를 인터넷에 공개하는 문제
    - 보안적인 문제로 인해 기존에 하나의 alb에서 하나 더 추가하여 NAT게이트웨이와 연결된 internal alb를 구성함. 이 LB는 VPN을 이용해서 네트워크를 터널링하고 접속해야함`}
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
      { id: '1', name: 'Description', type: 'folder', children: {id: '1-1', title: 'Markdown-Blog-Uploader', techStack:["React","k8s","oauth-proxy"], content: `
![img](https://github.com/Oldentomato/markdown_blog_uploader/raw/main/assets/screenShot_1.png)  
## Overview
> This project provides a Markdown upload system for a Next.js-based blog platform.  
Users can preview their posts in real time as they type, ensuring a seamless writing experience.  
To improve usability, the interface simplifies Markdown syntax input through convenient formatting buttons.  
The application is built with React for the frontend interface and includes an internal Express API server for handling image uploads.
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

///////////////////////////////////////////
    instagram: [
      { id: '1', name: 'Description', type: 'folder', children: {id: '1-1', title: 'GPS-Instagram', techStack:["React","ExpressJS","MongoDB"], content: `
사진업로드하면 해당 사진의 위치를 자동으로 맵으로 보여주게하는 사이트
`}
      },
      { id: '3', name: '2021-07-29.startDate', type: 'file' },
      { id: '4', name: '2021-11-15.endDate', type: 'file' },
      { id: '5', name: 'github 이동', link:'https://github.com/Oldentomato/WebBoard_NodeJs', type: 'link' },
    ],

    ///////////////////////////////////////////
    msgguard: [
      { id: '1', name: 'Description', type: 'folder', children: {id: '1-1', title: 'MSG Guard', techStack:["React","ExpressJS","MongoDB"], content: `
모바일 스팸메시지를 감지해주는 자연어처리AI 서비스 파이프라인
`}
      },
      { id: '3', name: '2021-07-29.startDate', type: 'file' },
      { id: '4', name: '2021-11-15.endDate', type: 'file' },
      { id: '5', name: 'github 이동', link:'https://github.com/Oldentomato/msg-guard-pipeline', type: 'link' },
    ],

    ///////////////////////////////////////////
    codeencryption: [
      { id: '1', name: 'Description', type: 'folder', children: {id: '1-1', title: 'Code Encrpytion', techStack:["Python","MongoDB","Tkinter"], content: `
코드암호화툴
`}
      },
      { id: '3', name: '2022-12-12.startDate', type: 'file' },
      { id: '4', name: '2023-01-04.endDate', type: 'file' },
      { id: '5', name: 'github 이동', link:'https://github.com/Oldentomato/Code_Encryption', type: 'link' },
    ],

    ///////////////////////////////////////////
    legacyportfolio: [
      { id: '1', name: 'Description', type: 'folder', children: {id: '1-1', title: 'Legacy Portfolio', techStack:["React","ExpressJS","MongoDB","threeJS"], content: `
MERN스택프로젝트
`}
      },
      { id: '3', name: '2021-10-11.startDate', type: 'file' },
      { id: '4', name: '2023-01-05.endDate', type: 'file' },
      { id: '5', name: 'github 이동', link:'https://github.com/Oldentomato/PortFolio', type: 'link' },
    ]
    }

    return contents[category]
}