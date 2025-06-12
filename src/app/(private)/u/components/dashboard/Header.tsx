import React from 'react';
import { Linkedin } from 'lucide-react';

interface ContactInfo {
  email: string;
  phone: string;
  linkedin?: string;
}

interface HeaderProps {
  name: string;
  title: string;
  contact: ContactInfo;
  photo: string;
}

const Header: React.FC<HeaderProps> = ({ name, title, contact, photo }) => {
  const [firstName, lastName] = name.split(' ');
  
  return (
    <div className="bg-[#1e3a5f] text-white p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="relative">
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white">
          <img 
            src={photo} 
            alt={name}
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl md:text-2xl font-bold">
            <span className="text-[#0077cc] mr-2">{firstName}</span>
            <span className="text-gray-300">{lastName}</span>
          </h1>
          <div className="w-2 h-2 bg-[#e6b012] rounded-full"></div>
          <span className="text-gray-300 text-sm md:text-base uppercase">{title}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          {contact.linkedin && (
            <a href={contact.linkedin} className="flex items-center gap-1 text-gray-300 hover:text-white">
              <Linkedin size={16} />
              <span>|</span>
            </a>
          )}
          <a href={`mailto:${contact.email}`} className="text-gray-300 hover:text-white">
            {contact.email}
          </a>
          <span>|</span>
          <span className="text-gray-300">{contact.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;