import { Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';

import viFlag from '@/assets/icons/VN-flag.svg';
import usFlag from '@/assets/icons/US-flag.svg';
import jpFlag from '@/assets/icons/JP-flag.svg';
import { GrLanguage } from 'react-icons/gr';

interface LanguageInterface {
  key: I18nType.Language;
  nativeName: string;
  flag: string;
}

const languages: LanguageInterface[] = [
  { key: 'vi', nativeName: 'Tiếng Việt', flag: viFlag },
  { key: 'en', nativeName: 'English', flag: usFlag },
  { key: 'ja', nativeName: '日本語', flag: jpFlag },
];

export default function ChangeLanguage() {
  const { i18n } = useTranslation();

  const options = languages.map((lang) => ({
    key: lang.key,
    label: (
      <p onClick={() => i18n.changeLanguage(lang.key)} className="flex gap-2">
        <img src={lang.flag} height={12} width={18} alt="flag" />
        {lang.nativeName}
      </p>
    ),
  }));

  return (
    <Dropdown
      menu={{ items: options }}
      placement={'bottomRight'}
      trigger={['click']}
    >
      <GrLanguage size={18} className="hover:cursor-pointer" />
    </Dropdown>
  );
}
