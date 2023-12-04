declare namespace Response {
  // serve for pagination
  interface IPaginationResult<T> {
    count: number;
    data: T[];
    message: string;
  }

  interface ISingleResult<T> {
    data: T;
    message: string;
  }
}

declare namespace I18nType {
  type Language = 'en' | 'vi' | 'ja';
}
