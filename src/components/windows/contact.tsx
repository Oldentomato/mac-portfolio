import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactComponent: React.FC = () => {
  const email = "jwsjws99@gmail.com";
  const phone = "+82 10-9161-4120"; // 원하시면 추가 가능
  const location = "Seoul, South Korea"; // 원하시면 추가 가능

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
        Contact
      </h2>

      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
        >
          <Mail className="w-6 h-6 text-red-500" />
          <div>
            <p className="text-gray-700 font-medium">Email</p>
            <p className="text-gray-500">{email}</p>
          </div>
        </a>

        {/* Phone (선택 사항) */}
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
        >
          <Phone className="w-6 h-6 text-green-500" />
          <div>
            <p className="text-gray-700 font-medium">Phone</p>
            <p className="text-gray-500">{phone}</p>
          </div>
        </a>

        {/* Location (선택 사항) */}
        <div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
          <MapPin className="w-6 h-6 text-blue-500" />
          <div>
            <p className="text-gray-700 font-medium">Location</p>
            <p className="text-gray-500">{location}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactComponent;
