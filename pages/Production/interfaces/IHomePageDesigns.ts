// import IDesign from './IDesign';

import { IDesign } from './IDesign';

export interface IHomePageDesigns {
  latestBlog: IDesign;
  latestPortfolio: IDesign;
  featuredBlog: IDesign | null;
  featuredPortfolio: IDesign[];
}

export default () => {};
