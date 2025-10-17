import React from "react";
import { Code2, Rocket, Users, Lightbulb } from "lucide-react"; // 아이콘
import profileImage from "../../assets/profile.jpg"

const AboutComponent: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center md:flex-row gap-10 p-10 bg-gray-50 ">
      {/* 왼쪽: 프로필 이미지 */}
      <div className="flex-shrink-0">
        <img
          src={profileImage} // 👉 본인 이미지 경로로 교체
          alt="Profile"
          className="w-48 h-48 rounded-full shadow-lg object-cover border-4 border-white"
        />
      </div>

      {/* 오른쪽: 소개 */}
      <div className="max-w-xl text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-800">조우성</h1>
        <p className="text-lg text-gray-600 mb-4">DevOps Engineer / Python Backend</p>

        <p className="text-gray-700 mb-6">
            안녕하세요. <br />
            항상 새로운 것을 빠르게 배우고 응용해내는 개발자 조우성입니다. <br />
            python이 주력 언어이고, 최근 devops 관련을 공부하고 있습니다.
        </p>

        {/* 기술 스택 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["Python", "Javascript", "FastAPI", "Docker", "Kubernetes", "AWS"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
              >
                {tech}
              </span>
            )
          )}
        </div>

        {/* 장점 섹션 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <span className="font-medium text-gray-800">창의적인 문제 해결</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <Users className="w-6 h-6 text-blue-500" />
            <span className="font-medium text-gray-800">수용적 커뮤니케이션</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <Rocket className="w-6 h-6 text-red-500" />
            <span className="font-medium text-gray-800">빠른 적응력</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <Code2 className="w-6 h-6 text-green-500" />
            <span className="font-medium text-gray-800">기술 응용 능력</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;