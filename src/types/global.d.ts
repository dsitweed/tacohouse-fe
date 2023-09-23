declare namespace Response {
  // serve for pagination
  interface IPaginationResult<T> {
    count: number;
    items: T[];
  }
}

declare namespace I18nType {
  type Language = 'en' | 'vi' | 'ja';
}
