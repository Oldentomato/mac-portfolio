import React from "react";
import { Calendar, Briefcase, Award, Code } from "lucide-react";

interface Activity {
  year: string;
  items: { title: string; description: string; icon?: JSX.Element }[];
}

const activities: Activity[] = [
  {
    year: "2025",
    items: [
      {
        title: "SK Shieldus Rookies",
        description: "sk쉴더스 주관 부트캠프 참여",
        icon: <Briefcase className="text-red-500 w-5 h-5" />,
      }
    ],
  },
  {
    year: "2023",
    items: [
      {
        title: "네이버 DEVIEW",
        description: "네이버 최신 기술 설명회 참여",
        icon: <Calendar className="text-purple-500 w-5 h-5" />,
      },
      {
        title: "ETRI 연구 연수생",
        description: "ETRI에서 2개월동안 과제 수행",
        icon: <Briefcase className="text-blue-500 w-5 h-5" />,
      },
    ],
  },
  {
    year: "2022",
    items: [
      {
        title: "네이버 소프트웨어야놀자",
        description: "네이버 주관 저학년들을 위한 AI교육 멘토링",
        icon: <Calendar className="text-green-500 w-5 h-5" />,
      },
            {
        title: "춘계학술대회 수상",
        description: "한국지능시스템학회에서 주관한 학술대회에서 우수논문상으로 수상",
        icon: <Award className="text-purple-500 w-5 h-5" />,
      },
            {
        title: "CDS빅데이터 경진대회 수상",
        description: "한양대 주관 빅데이터 처리 대회에서 최우수상 수상",
        icon: <Award className="text-blue-500 w-5 h-5" />,
      },
            {
        title: "AI-X 해커톤",
        description: "AI를 활용한 아이디어 해커톤 참여",
        icon: <Calendar className="text-yellow-500 w-5 h-5" />,
      },
        {
        title: "고양시 데이터톤",
        description: "빅데이터를 활용한 AI모델 구축 해커톤 참여",
        icon: <Calendar className="text-yellow-500 w-5 h-5" />,
      },
        {
        title: "ICT한이음",
        description: "LG CNS실무자 멘토와 함께 프로젝트 진행",
        icon: <Calendar className="text-orange-500 w-5 h-5" />,
      }
    ],
  },
    {
    year: "2021",
    items: [
      {
        title: "AWS 딥레이서",
        description: "폭스러닝과 AWS에서 주관한 강화학습 기반 딥레이서 구현",
        icon: <Calendar className="text-yellow-500 w-5 h-5" />,
      },
            {
        title: "교내 게임제작 동아리",
        description: "대학교 내 게임제작 동아리 멘토 역할",
        icon: <Calendar className="text-blue-500 w-5 h-5" />,
      },
    ],
  },
    {
    year: "2016",
    items: [
      {
        title: "GIGDC 고등부 수상",
        description: "첫 1인 게임개발 동상 수상",
        icon: <Award className="text-yellow-500 w-5 h-5" />,
      },
            {
        title: "AppJam 참여",
        description: "게임개발 해커톤 AppJam 참여",
        icon: <Briefcase className="text-red-500 w-5 h-5" />,
      },
    ],
  },
];

const ActivityComponent: React.FC = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
        활동 내역
      </h2>

      <div className="relative max-w-3xl mx-auto">
        {/* 중앙 세로선 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200" />

        {/* 타임라인 항목 */}
        {activities.map((activity, index) => (
          <div key={activity.year} className="mb-16 relative flex flex-col items-center">
            {/* 년도 표시 */}
            <div className="flex items-center justify-center bg-gray-800 text-white font-bold w-20 h-20 rounded-full shadow-md z-10">
              {activity.year}
            </div>

            {/* 카드들 */}
            <div className="mt-8 w-full md:w-[70%] bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition space-y-4">
              {activity.items.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 다음 항목과의 간격 */}
            {index !== activities.length - 1 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gray-200 top-[calc(100%+10px)]" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivityComponent;
