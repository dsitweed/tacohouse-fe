import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  author?: string;
  type?: string;
}

export default function SEO({
  title,
  description = defaultDescription,
  author = 'Dev Nguyen Van Ky',
  type,
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="react, meta tags, seo" />
      <meta name="author" content={author} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
}

const defaultDescription =
  `Welcome to Taco House, your all-in-one solution for efficient real estate management! \
  Whether you're a property manager, landlord, or real estate professional, \
  our application is designed to streamline and simplify your daily tasks, making property management a breeze.` +
  `Key Features:

  Property Listing and Management,
  Tenant Management,
  Financial Tracking,
  Task and Maintenance Tracking,
  Communication Hub,
  Document Management,
  User-Friendly Interface`;
