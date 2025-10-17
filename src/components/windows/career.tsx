import React from "react";
import { Briefcase, Calendar, Code2, Building } from "lucide-react";

interface CareerItem {
  company: string;
  position: string;
  period: string;
  description: string;
  techStack: string[];
}

const careers: CareerItem[] = [
  {
    company: "UINetworks",
    position: "Python Developer",
    period: "2023.09 - 2024.12",
    description:
      "빅데이터 처리 알고리즘 작성, 폐쇄망 인프라 구성에서 카프카 대체 데이터처리 시스템 구축",
    techStack: ["Python", "Sumo", "React", "RockyLinux"],
  },
  {
    company: "ETRI",
    position: "Research Trainee",
    period: "2023.06 - 2023.08",
    description:
      "VP Model 환경을 구축 및 벤치마킹, 결과 데이터 기반 영상에 적용하여 시각화",
    techStack: ["Python", "ROS2", "Computer Vision", "Ubuntu"],
  },
];

const CareerComponent: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
        경력사항
      </h2>

      <div className="max-w-4xl mx-auto space-y-8">
        {careers.map((career, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-8 flex flex-col md:flex-row items-start gap-8"
          >
            {/* 왼쪽 - 회사 및 직책 */}
            <div className="md:w-1/3 flex flex-col space-y-3">
              <div className="flex items-center gap-2 text-gray-800 font-semibold text-xl">
                <Building className="w-5 h-5 text-blue-600" />
                {career.company}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="w-4 h-4 text-gray-500" />
                {career.position}
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                {career.period}
              </div>
            </div>

            {/* 오른쪽 - 설명 및 기술스택 */}
            <div className="md:w-2/3 space-y-4">
              <p className="text-gray-700 leading-relaxed">{career.description}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {career.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-50 text-blue-600 text-sm font-medium px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1"
                  >
                    <Code2 className="w-3 h-3" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerComponent;
