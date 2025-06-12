
export type Post = {
    title: string;
    uri: string;
    id: string;
    date: string;
    featuredImage: {
      node: {
        mediaItemUrl: string;
      } | null;
    } | null;
  };