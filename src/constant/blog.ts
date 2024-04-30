import {
  facebook,
  instagram,
  linkdin,
  twitter,
  youtube,
  caro1,
  caro2,
  caro3,
  caro4,
  arrow_left,
  arrow_right,
  trending_post,
} from "@/assets/Images/imageassets";
import { StaticImageData } from "next/image";
interface PostData {
  id: number;
  author_name: string;
  document: string;
  title: string;
  views: number;
  comments: number;
  likes: number;
  created_at: string;
  description: string;
}
interface ops_blog {
  insert: string;
}
interface description_blog {
  ops: ops_blog[];
}
interface blogdata {
  id: string;
  title: string;
  fk_document: string;
  views: number;
  like: number;
  comment: number;
  author_name: string;
  description: description_blog;
  document: string;
}

interface commentdata {
  id: string;
  user_name: string;
  comment: string;
  created_at: string;
  childComment: child_comment[];
}
interface child_comment {
  user_name: string;
  created_at: string;
  comment: string;
}
// "id": "2c882b64-6486-4691-8515-779e3d9e8562",
// "fk_admin": "ff1c7a67-c556-413f-a08b-56d1f755acd9",
// "author_name": "Ronak",
// "title": "Transportation",
// "views": 0,
// "fk_document": "http://res.cloudinary.com/dxcwnj1cb/image/upload/v1713338393/Blog/ch0ioplhxt4ccil6xbjj.jpg",
// "like": 0,
// "comment": 0,
// "description": {
//     "ops": [
//         {
//             "insert": "ddjdjdjd\n"
//         }
//     ]
// }
// }
export type { PostData, blogdata, commentdata };

export const blog_social_media = [
  {
    name: "Youtube",
    img: youtube,
  },
  {
    name: "Twitter",
    img: twitter,
  },
  {
    name: "Linkdin",
    img: linkdin,
  },
  {
    name: "Instagram",
    img: instagram,
  },
  {
    name: "Facebook",
    img: facebook,
  },
];
export const PORTER_BLOG = "PORTER BLOG";
export const Porter_Home = "PORTER HOME";
export const BOOK_PORTER = "BOOK PORTER";
export const slides = [caro4, caro4, caro4, caro4];
export const button_carousel = [arrow_left, arrow_right];
export const Trending_post = "TRENDING POSTS";
export const Trending_post_data = [
  {
    img: trending_post,
    desc: "Right On Time,Every Time",
  },
  {
    img: trending_post,
    desc: "Right On Time,Every Time",
  },
  {
    img: trending_post,
    desc: "Right On Time,Every Time",
  },
  {
    img: trending_post,
    desc: "Right On Time,Every Time",
  },
];

export const footer_data = [
  {
    name: "Mighty Movers Home",
    link: "/",
  },
  {
    name: "For Enterprise",
    link: "/enterprise",
  },
  {
    name: "Join Us",
    link: "/delivery-partner",
  },
  {
    name: "Contact Us",
    link: "/support",
  },
];
export const searchtitle = "SEARCH FOR:";
export const Input_data = "Input your search keywords and press Enter.";
export const some_few_blog = "Checkout Some More Blogs";
export const comment_comment = "Comments";
export const all_comments = [
  {
    id: 1,
    user: "Anne Ruiz",
    comment:
      "kasndk amsndkansd lkansdlknasd lkasndlknasdk a;sdlalsdknklansdl lasdnklkansdlkansd lkansdlknasdknasd lkansdlnasdlnasd",
    date: "2021-10-08",
  },
  {
    id: 2,
    user: "prit Ruiz",
    comment:
      "kasndk amsndkansd lkansdlknasd lkasndlknasdk a;sdlalsdknklansdl lasdnklkansdlkansd lkansdlknasdknasd lkansdlnasdlnasd",
    date: "2021-10-08",
  },
  {
    id: 3,
    user: "Utkarsh Ruiz",
    comment:
      "kasndk amsndkansd lkansdlknasd lkasndlknasdk a;sdlalsdknklansdl lasdnklkansdlkansd lkansdlknasdknasd lkansdlnasdlnasd",
    date: "2021-10-08",
  },
  {
    id: 4,
    user: "Neel Ruiz",
    comment:
      "kasndk amsndkansd lkansdlknasd lkasndlknasdk a;sdlalsdknklansdl lasdnklkansdlkansd lkansdlknasdknasd lkansdlnasdlnasd",
    date: "2021-10-08",
  },
  {
    id: 5,
    user: "Masd Ruiz",
    comment:
      "kasndk amsndkansd lkansdlknasd lkasndlknasdk a;sdlalsdknklansdl lasdnklkansdlkansd lkansdlknasdknasd lkansdlnasdlnasd",
    date: "2021-10-08",
  },
];
