import { Button, Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";
import type { MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useState } from "react";

export const languageText: Record<I18nType.Language, string> = {
  en: "English",
  ja: "日本語",
  vi: "Tiếng Việt",
};

// export const languageOptions = Object.values([
//   'en',
//   'ja',
//   'vi',
// ] as I18nType.Language[]).map((item) => {

// });

export default function ChangeLanguage() {
  const { i18n } = useTranslation();

  const options = Object.values(["en", "ja", "vi"] as I18nType.Language[]).map(
    (item) => ({
      key: item,
      label: (
        <p onClick={() => handleChangeLanguage(item)}>{languageText[item]}</p>
      ),
    })
  );

  const handleChangeLanguage = (val: I18nType.Language) => {
    i18n.changeLanguage(val);
  };

  return (
    <Dropdown
      menu={{ items: options }}
      placement={"bottomRight"}
      trigger={["click"]}
    >
      <GlobalOutlined />
    </Dropdown>
  );
}
