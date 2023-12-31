import { Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';

import viFlag from '@/assets/images/vi.png';
import enFlag from '@/assets/images/en.png';
import jpFlag from '@/assets/images/jp.png';
import { useAppDispatch } from '@/store/hooks';
import { languageActions } from '@/store/slices/language.slice';

interface LanguageInterface {
  key: I18nType.Language;
  nativeName: string;
  flag: string;
}

const languages: LanguageInterface[] = [
  { key: 'vi', nativeName: 'Tiếng Việt', flag: viFlag },
  { key: 'en', nativeName: 'English', flag: enFlag },
  { key: 'ja', nativeName: '日本語', flag: jpFlag },
];

export default function ChangeLanguage() {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const handleChangeLanguage = (lang: LanguageInterface) => {
    dispatch(languageActions.setLanguage(lang.key));
    i18n.changeLanguage(lang.key);
  };

  const options = languages.map((lang) => ({
    key: lang.key,
    label: (
      <p onClick={() => handleChangeLanguage(lang)} className="flex gap-2">
        <img src={lang.flag} height={24} width={24} alt="flag" />
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
      <img
        src={languages.find((item) => item.key === i18n.language)?.flag}
        height={24}
        width={24}
        alt="flag"
        className="hover:cursor-pointer"
      />
    </Dropdown>
  );
}
