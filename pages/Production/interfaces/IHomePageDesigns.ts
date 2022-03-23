import { IDesign } from './IDesign';

export default interface IHomePageDesigns {
  latestBlog: IDesign;
  latestPortfolio: IDesign;
  featuredBlog: IDesign | null;
  featuredPortfolio: IDesign[];
}
