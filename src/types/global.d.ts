declare namespace Response {
  // serve for pagination
  interface IPaginationResult<T> {
    data: T[];
    count?: number;
    message?: string;
  }

  interface ISingleResult<T> {
    data: T;
    message: string;
  }
}

declare namespace I18nType {
  type Language = 'en' | 'vi' | 'ja';
}

interface IImageUrl {
  uid: string; // uuid use for FE, when use Upload component of Antd
  url: string;
  fileName: string; // fileName save in firebase => use for delete file in firebase cloud
}
