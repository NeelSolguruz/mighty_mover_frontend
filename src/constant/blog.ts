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
import { StaticImageData } from 'next/image';
interface PostData {
  img: StaticImageData;
  title: string;
  date: string;
  view: number;
  comment: number;
  desc: string;
}
export type{PostData}

export const blog_social_media = [
  {
    name: "youtube",
    img: youtube,
  },
  {
    name: "twitter",
    img: twitter,
  },
  {
    name: "linkdin",
    img: linkdin,
  },
  {
    name: "instagram",
    img: instagram,
  },
  {
    name: "facebook",
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
export const post_data:PostData[] = [
  {
    img: trending_post,
    title:
      "Shades of emotions - Berger Paints partners with Porter for Enterprise",
    date:"2021-04-02",
    view:1537,
    comment:11,
    desc: "The famous Irish poet, Oscar Wilde once said, “Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.”",
  },
  {
    img: trending_post,
    title:
      "Shades of emotions - Berger Paints partners with Porter for Enterprise",
    date: "2021-04-02",
    view:3439,
    comment:51,
    desc: "The famous Irish poet, Oscar Wilde once said, “Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.”",
  },
  {
    img: trending_post,
    title:
      "Shades of emotions - Berger Paints partners with Porter for Enterprise ",
    date: "2021-04-02",
    view:7537,
    comment:41,
    desc: "The famous Irish poet, zzz Oscar Wilde once said, “Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.”",
  },
  {
    img: trending_post,
    title:
      "Shades of emotions - Berger Paints partners with Porter for Enterprise",
    date: "2021-04-02",
    view:3340,
    comment:32,
    desc: "The famous Irish poet, Oscar Wilde once said, “Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.”",
  },
];
export const footer_data=[
  {
    name:"Mighty Movers Home",
    link:"/"
  },
  {
    name:"For Enterprise",
    link:"/enterprise"
  },
  {
    name:"Join Us",
    link:"/delivery-partner"
  },
  {
    name:"Contact Us",
    link:"/support"
  },
]
export const searchtitle="SEARCH FOR:"
export const Input_data="Input your search keywords and press Enter."