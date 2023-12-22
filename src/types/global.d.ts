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
