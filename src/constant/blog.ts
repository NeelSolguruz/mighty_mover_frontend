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
  name:string
  img: StaticImageData;
  title: string;
  date: string;
  view: number;
  comment: number;
  like: number;
  desc: string;
  wholedata: string;
}
export type { PostData };

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
export const post_data: PostData[] = [
  {
    id: 1,
    name:"Myrtle Rodriquez",
    img: trending_post,
    title:
      "Shades of emotions - Berger Paints partners with Porter for Enterprise",
    date: "2021-04-02",
    view: 1537,
    comment: 11,
    like: 12,
    desc: "The famous Irish poet, Oscar Wilde once said, “Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.”",
    wholedata:
      "So when a company like Berger Paints wanted a logistics partner to instantly deliver their cans of joy to their customers, Porter for Enterprise (PFE) was brought on board. \n In the Indian paint industry, the majority of the orders are made by customers or small-scale enterprises. For these micro-scale enterprises, storing large inventories of these paint cans is not a financially viable option. With a plethora of paint manufacturers in the market , the fastest who refills his limited shelf space sells the maximum number of cans. Therefore, the most efficient way to cater to such quick demand is for brands to work closely with these small business customers and cater to their requirements on an in-time fulfillment model. Under this model, the products are delivered from the company warehouse to the retailers on a need basis. \n Under such a model, it is crucial for paint brands to deliver their product in a manner where the TAT is as low as 2 hours. When Berger paints partnered with Porter for Enterprise, it was observed that the majority of the deliveries were made within 120 mins . \n Additionally, with Porter’s helper category, where the driver doubles up as a helper for loading and unloading the goods, Berger was able to leverage the service for 83% of its trips to simplify the task of unloading at the destination point. \n Therefore by partnering with PFE, Berger has been able to increase efficiency in the movement of the products and has also improved its loading and unloading times. \n Mr Mohan, Administrative Head, Berger paints, comments “Partnering with Porter for Enterprise has been fruitful for us. Among the many features this platform provides us with, it is the ease of multi-bookings of varied vehicle kinds that helps us in catering to our audience on a wider scale. Additionally, with the OTP on delivery feature, we’ve been able to make the logistics movement more transparent. Currently, our operations are running in Bangalore and soon we would like to expand to other cities. Thank you team PFE for helping us in our mission to maximize shareholder value by developing and delivering innovative and best solutions for our customers.” \n So to all businesses out there looking to make logistics a smooth and easy affair, get on board with Porter for Enterprise and never look back. \n To consult, write to us at enterprise@theporter.in or give us a missed call at 9667309777",
  },
  {
    id: 2,
    name:"Myrtle Rodriquez",

    img: trending_post,
    title:
      "Shades of emotions - Berger Paints partners with Porter for Enterprise",
    date: "2021-04-02",
    view: 3439,
    comment: 51,
    like: 12,
    desc: "The famous Irish poet, Oscar Wilde once said, “Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.”",
    wholedata:
      "So when a company like Berger Paints wanted a logistics partner to instantly deliver their cans of joy to their customers, Porter for Enterprise (PFE) was brought on board. \n In the Indian paint industry, the majority of the orders are made by customers or small-scale enterprises. For these micro-scale enterprises, storing large inventories of these paint cans is not a financially viable option. With a plethora of paint manufacturers in the market , the fastest who refills his limited shelf space sells the maximum number of cans. Therefore, the most efficient way to cater to such quick demand is for brands to work closely with these small business customers and cater to their requirements on an in-time fulfillment model. Under this model, the products are delivered from the company warehouse to the retailers on a need basis. \n Under such a model, it is crucial for paint brands to deliver their product in a manner where the TAT is as low as 2 hours. When Berger paints partnered with Porter for Enterprise, it was observed that the majority of the deliveries were made within 120 mins . \n Additionally, with Porter’s helper category, where the driver doubles up as a helper for loading and unloading the goods, Berger was able to leverage the service for 83% of its trips to simplify the task of unloading at the destination point. \n Therefore by partnering with PFE, Berger has been able to increase efficiency in the movement of the products and has also improved its loading and unloading times. \n Mr Mohan, Administrative Head, Berger paints, comments “Partnering with Porter for Enterprise has been fruitful for us. Among the many features this platform provides us with, it is the ease of multi-bookings of varied vehicle kinds that helps us in catering to our audience on a wider scale. Additionally, with the OTP on delivery feature, we’ve been able to make the logistics movement more transparent. Currently, our operations are running in Bangalore and soon we would like to expand to other cities. Thank you team PFE for helping us in our mission to maximize shareholder value by developing and delivering innovative and best solutions for our customers.” \n So to all businesses out there looking to make logistics a smooth and easy affair, get on board with Porter for Enterprise and never look back. \n To consult, write to us at enterprise@theporter.in or give us a missed call at 9667309777",
  },
  {
    id: 3,
    img: trending_post,
    name:"Myrtle Rodriquez",

    title:
      "Shades of emotions - Berger Paints partners with Porter for Enterprise ",
    date: "2021-04-02",
    view: 7537,
    comment: 41,
    like: 12,
    desc: "The famous Irish poet, zzz Oscar Wilde once said, “Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.”",
    wholedata:
      "So when a company like Berger Paints wanted a logistics partner to instantly deliver their cans of joy to their customers, Porter for Enterprise (PFE) was brought on board. \n In the Indian paint industry, the majority of the orders are made by customers or small-scale enterprises. For these micro-scale enterprises, storing large inventories of these paint cans is not a financially viable option. With a plethora of paint manufacturers in the market , the fastest who refills his limited shelf space sells the maximum number of cans. Therefore, the most efficient way to cater to such quick demand is for brands to work closely with these small business customers and cater to their requirements on an in-time fulfillment model. Under this model, the products are delivered from the company warehouse to the retailers on a need basis. \n Under such a model, it is crucial for paint brands to deliver their product in a manner where the TAT is as low as 2 hours. When Berger paints partnered with Porter for Enterprise, it was observed that the majority of the deliveries were made within 120 mins . \n Additionally, with Porter’s helper category, where the driver doubles up as a helper for loading and unloading the goods, Berger was able to leverage the service for 83% of its trips to simplify the task of unloading at the destination point. \n Therefore by partnering with PFE, Berger has been able to increase efficiency in the movement of the products and has also improved its loading and unloading times. \n Mr Mohan, Administrative Head, Berger paints, comments “Partnering with Porter for Enterprise has been fruitful for us. Among the many features this platform provides us with, it is the ease of multi-bookings of varied vehicle kinds that helps us in catering to our audience on a wider scale. Additionally, with the OTP on delivery feature, we’ve been able to make the logistics movement more transparent. Currently, our operations are running in Bangalore and soon we would like to expand to other cities. Thank you team PFE for helping us in our mission to maximize shareholder value by developing and delivering innovative and best solutions for our customers.” \n So to all businesses out there looking to make logistics a smooth and easy affair, get on board with Porter for Enterprise and never look back. \n To consult, write to us at enterprise@theporter.in or give us a missed call at 9667309777",
  },
  {
    id: 4,
    img: trending_post,
    name:"Myrtle Rodriquez",

    title:
      "Shades of emotions - Berger Paints partners with Porter for Enterprise",
    date: "2021-04-02",
    view: 3340,
    comment: 32,
    like: 12,
    desc: "The famous Irish poet, Oscar Wilde once said, “Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.”",
    wholedata:
      "So when a company like Berger Paints wanted a logistics partner to instantly deliver their cans of joy to their customers, Porter for Enterprise (PFE) was brought on board. \n In the Indian paint industry, the majority of the orders are made by customers or small-scale enterprises. For these micro-scale enterprises, storing large inventories of these paint cans is not a financially viable option. With a plethora of paint manufacturers in the market , the fastest who refills his limited shelf space sells the maximum number of cans. Therefore, the most efficient way to cater to such quick demand is for brands to work closely with these small business customers and cater to their requirements on an in-time fulfillment model. Under this model, the products are delivered from the company warehouse to the retailers on a need basis. \n Under such a model, it is crucial for paint brands to deliver their product in a manner where the TAT is as low as 2 hours. When Berger paints partnered with Porter for Enterprise, it was observed that the majority of the deliveries were made within 120 mins . \n Additionally, with Porter’s helper category, where the driver doubles up as a helper for loading and unloading the goods, Berger was able to leverage the service for 83% of its trips to simplify the task of unloading at the destination point. \n Therefore by partnering with PFE, Berger has been able to increase efficiency in the movement of the products and has also improved its loading and unloading times. \n Mr Mohan, Administrative Head, Berger paints, comments “Partnering with Porter for Enterprise has been fruitful for us. Among the many features this platform provides us with, it is the ease of multi-bookings of varied vehicle kinds that helps us in catering to our audience on a wider scale. Additionally, with the OTP on delivery feature, we’ve been able to make the logistics movement more transparent. Currently, our operations are running in Bangalore and soon we would like to expand to other cities. Thank you team PFE for helping us in our mission to maximize shareholder value by developing and delivering innovative and best solutions for our customers.” \n So to all businesses out there looking to make logistics a smooth and easy affair, get on board with Porter for Enterprise and never look back. \n To consult, write to us at enterprise@theporter.in or give us a missed call at 9667309777",
  },
  {
    id: 5,
    img: trending_post,
    name:"Myrtle Rodriquez",

    title:
      "Shades of emotions - Berger Paints partners with Porter for Enterprise",
    date: "2021-04-02",
    view: 3340,
    comment: 32,
    like: 12,
    desc: "The famous Irish poet, Oscar Wilde once said, “Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.”",
    wholedata:
      "So when a company like Berger Paints wanted a logistics partner to instantly deliver their cans of joy to their customers, Porter for Enterprise (PFE) was brought on board. \n In the Indian paint industry, the majority of the orders are made by customers or small-scale enterprises. For these micro-scale enterprises, storing large inventories of these paint cans is not a financially viable option. With a plethora of paint manufacturers in the market , the fastest who refills his limited shelf space sells the maximum number of cans. Therefore, the most efficient way to cater to such quick demand is for brands to work closely with these small business customers and cater to their requirements on an in-time fulfillment model. Under this model, the products are delivered from the company warehouse to the retailers on a need basis. \n Under such a model, it is crucial for paint brands to deliver their product in a manner where the TAT is as low as 2 hours. When Berger paints partnered with Porter for Enterprise, it was observed that the majority of the deliveries were made within 120 mins . \n Additionally, with Porter’s helper category, where the driver doubles up as a helper for loading and unloading the goods, Berger was able to leverage the service for 83% of its trips to simplify the task of unloading at the destination point. \n Therefore by partnering with PFE, Berger has been able to increase efficiency in the movement of the products and has also improved its loading and unloading times. \n Mr Mohan, Administrative Head, Berger paints, comments “Partnering with Porter for Enterprise has been fruitful for us. Among the many features this platform provides us with, it is the ease of multi-bookings of varied vehicle kinds that helps us in catering to our audience on a wider scale. Additionally, with the OTP on delivery feature, we’ve been able to make the logistics movement more transparent. Currently, our operations are running in Bangalore and soon we would like to expand to other cities. Thank you team PFE for helping us in our mission to maximize shareholder value by developing and delivering innovative and best solutions for our customers.” \n So to all businesses out there looking to make logistics a smooth and easy affair, get on board with Porter for Enterprise and never look back. \n To consult, write to us at enterprise@theporter.in or give us a missed call at 9667309777",
  },
  {
    id: 6,
    img: trending_post,
    name:"Myrtle Rodriquez",

    title:
      "Shades of emotions - Berger Paints partners with Porter for Enterprise",
    date: "2021-04-02",
    view: 3340,
    comment: 32,
    like: 12,
    desc: "The famous Irish poet, Oscar Wilde once said, “Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.”",
    wholedata:
      "So when a company like Berger Paints wanted a logistics partner to instantly deliver their cans of joy to their customers, Porter for Enterprise (PFE) was brought on board. \n In the Indian paint industry, the majority of the orders are made by customers or small-scale enterprises. For these micro-scale enterprises, storing large inventories of these paint cans is not a financially viable option. With a plethora of paint manufacturers in the market , the fastest who refills his limited shelf space sells the maximum number of cans. Therefore, the most efficient way to cater to such quick demand is for brands to work closely with these small business customers and cater to their requirements on an in-time fulfillment model. Under this model, the products are delivered from the company warehouse to the retailers on a need basis. \n Under such a model, it is crucial for paint brands to deliver their product in a manner where the TAT is as low as 2 hours. When Berger paints partnered with Porter for Enterprise, it was observed that the majority of the deliveries were made within 120 mins . \n Additionally, with Porter’s helper category, where the driver doubles up as a helper for loading and unloading the goods, Berger was able to leverage the service for 83% of its trips to simplify the task of unloading at the destination point. \n Therefore by partnering with PFE, Berger has been able to increase efficiency in the movement of the products and has also improved its loading and unloading times. \n Mr Mohan, Administrative Head, Berger paints, comments “Partnering with Porter for Enterprise has been fruitful for us. Among the many features this platform provides us with, it is the ease of multi-bookings of varied vehicle kinds that helps us in catering to our audience on a wider scale. Additionally, with the OTP on delivery feature, we’ve been able to make the logistics movement more transparent. Currently, our operations are running in Bangalore and soon we would like to expand to other cities. Thank you team PFE for helping us in our mission to maximize shareholder value by developing and delivering innovative and best solutions for our customers.” \n So to all businesses out there looking to make logistics a smooth and easy affair, get on board with Porter for Enterprise and never look back. \n To consult, write to us at enterprise@theporter.in or give us a missed call at 9667309777",
  },
  {
    id: 7,
    img: trending_post,
    name:"Myrtle Rodriquez",

    title:
      "Shades of emotions - Berger Paints partners with Porter for Enterprise",
    date: "2021-04-02",
    view: 3340,
    comment: 32,
    like: 12,
    desc: "The famous Irish poet, Oscar Wilde once said, “Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.”",
    wholedata:
      "So when a company like Berger Paints wanted a logistics partner to instantly deliver their cans of joy to their customers, Porter for Enterprise (PFE) was brought on board. \n In the Indian paint industry, the majority of the orders are made by customers or small-scale enterprises. For these micro-scale enterprises, storing large inventories of these paint cans is not a financially viable option. With a plethora of paint manufacturers in the market , the fastest who refills his limited shelf space sells the maximum number of cans. Therefore, the most efficient way to cater to such quick demand is for brands to work closely with these small business customers and cater to their requirements on an in-time fulfillment model. Under this model, the products are delivered from the company warehouse to the retailers on a need basis. \n Under such a model, it is crucial for paint brands to deliver their product in a manner where the TAT is as low as 2 hours. When Berger paints partnered with Porter for Enterprise, it was observed that the majority of the deliveries were made within 120 mins . \n Additionally, with Porter’s helper category, where the driver doubles up as a helper for loading and unloading the goods, Berger was able to leverage the service for 83% of its trips to simplify the task of unloading at the destination point. \n Therefore by partnering with PFE, Berger has been able to increase efficiency in the movement of the products and has also improved its loading and unloading times. \n Mr Mohan, Administrative Head, Berger paints, comments “Partnering with Porter for Enterprise has been fruitful for us. Among the many features this platform provides us with, it is the ease of multi-bookings of varied vehicle kinds that helps us in catering to our audience on a wider scale. Additionally, with the OTP on delivery feature, we’ve been able to make the logistics movement more transparent. Currently, our operations are running in Bangalore and soon we would like to expand to other cities. Thank you team PFE for helping us in our mission to maximize shareholder value by developing and delivering innovative and best solutions for our customers.” \n So to all businesses out there looking to make logistics a smooth and easy affair, get on board with Porter for Enterprise and never look back. \n To consult, write to us at enterprise@theporter.in or give us a missed call at 9667309777",
  },
  {
    id: 8,
    img: trending_post,
    name:"Myrtle Rodriquez",
    title:
      "Shades of emotions - Berger Paints partners with Porter for Enterprise",
    date: "2021-04-02",
    view: 3340,
    comment: 32,
    like: 12,
    desc: "The famous Irish poet, Oscar Wilde once said, “Mere color, unspoiled by meaning, and unallied with definite form, can speak to the soul in a thousand different ways.”",
    wholedata:
      "So when a company like Berger Paints wanted a logistics partner to instantly deliver their cans of joy to their customers, Porter for Enterprise (PFE) was brought on board. \n In the Indian paint industry, the majority of the orders are made by customers or small-scale enterprises. For these micro-scale enterprises, storing large inventories of these paint cans is not a financially viable option. With a plethora of paint manufacturers in the market , the fastest who refills his limited shelf space sells the maximum number of cans. Therefore, the most efficient way to cater to such quick demand is for brands to work closely with these small business customers and cater to their requirements on an in-time fulfillment model. Under this model, the products are delivered from the company warehouse to the retailers on a need basis. \n Under such a model, it is crucial for paint brands to deliver their product in a manner where the TAT is as low as 2 hours. When Berger paints partnered with Porter for Enterprise, it was observed that the majority of the deliveries were made within 120 mins . \n Additionally, with Porter’s helper category, where the driver doubles up as a helper for loading and unloading the goods, Berger was able to leverage the service for 83% of its trips to simplify the task of unloading at the destination point. \n Therefore by partnering with PFE, Berger has been able to increase efficiency in the movement of the products and has also improved its loading and unloading times. \n Mr Mohan, Administrative Head, Berger paints, comments “Partnering with Porter for Enterprise has been fruitful for us. Among the many features this platform provides us with, it is the ease of multi-bookings of varied vehicle kinds that helps us in catering to our audience on a wider scale. Additionally, with the OTP on delivery feature, we’ve been able to make the logistics movement more transparent. Currently, our operations are running in Bangalore and soon we would like to expand to other cities. Thank you team PFE for helping us in our mission to maximize shareholder value by developing and delivering innovative and best solutions for our customers.” \n So to all businesses out there looking to make logistics a smooth and easy affair, get on board with Porter for Enterprise and never look back. \n To consult, write to us at enterprise@theporter.in or give us a missed call at 9667309777",
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
export const some_few_blog="Checkout Some More Blogs";
export const comment_comment="Comments"
export const all_comments=[
  {
    id:1,
    user:"Anne Ruiz",
    comment:"kasndk amsndkansd lkansdlknasd lkasndlknasdk a;sdlalsdknklansdl lasdnklkansdlkansd lkansdlknasdknasd lkansdlnasdlnasd",
    date:"2021-10-08"
  },
  {
    id:2,
    user:"prit Ruiz",
    comment:"kasndk amsndkansd lkansdlknasd lkasndlknasdk a;sdlalsdknklansdl lasdnklkansdlkansd lkansdlknasdknasd lkansdlnasdlnasd",
    date:"2021-10-08"
  }
  ,{
    id:3,
    user:"Utkarsh Ruiz",
    comment:"kasndk amsndkansd lkansdlknasd lkasndlknasdk a;sdlalsdknklansdl lasdnklkansdlkansd lkansdlknasdknasd lkansdlnasdlnasd",
    date:"2021-10-08"
  }
  ,{
    id:4,
    user:"Neel Ruiz",
    comment:"kasndk amsndkansd lkansdlknasd lkasndlknasdk a;sdlalsdknklansdl lasdnklkansdlkansd lkansdlknasdknasd lkansdlnasdlnasd",
    date:"2021-10-08"
  },
  {
    id:5,
    user:"Masd Ruiz",
    comment:"kasndk amsndkansd lkansdlknasd lkasndlknasdk a;sdlalsdknklansdl lasdnklkansdlkansd lkansdlknasdknasd lkansdlnasdlnasd",
    date:"2021-10-08"
  }
]