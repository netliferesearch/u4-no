export default async function getMetadata({ title='', description='', image=''}) {

  return {
    title,
    description: description,
    image: image,
    metadataBase: 'https://www.u4.no',
    openGraph: {
      title,
      description,
      image: {
        url: image,
      },
      type: 'article',
      siteName: "U4 Anti-Corruption Resource Centre",
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@U4_ACRC',
    },
    other: {
      'google-site-verification': 'IuEUdfNVUT1nJ-DJUcrg99bbRIha348aLY0tC4tOIk0',
    }
  }
}