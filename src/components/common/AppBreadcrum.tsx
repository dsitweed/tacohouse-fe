/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { useMemo } from 'react';
import { useMatches } from 'react-router-dom';

export default function AppBreadcrumb() {
  const matches = useMatches();

  const getBreadcrumbItems = useMemo(() => {
    const crumbs = matches
      // first get rid of any matches that don't have handle and crumb
      .filter((match: any) => Boolean(match.handle?.crumb))
      // now map them into an array of elements, passing the loader
      // data to each one
      .map((match: any) => match.handle.crumb(match.data, match.params));

    const items: ItemType[] = crumbs.map((crumb) => ({
      title: crumb,
    }));

    return items;
  }, [matches]);

  return <Breadcrumb items={getBreadcrumbItems} />;
}
