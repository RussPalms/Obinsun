import IDesign from './IDesign';

interface IHomePageDesigns {
  latestBlog: IDesign;
  latestPortfolio: IDesign;
  featuredBlog: IDesign | null;
  featuredPortfolio: IDesign[];
}

export default IHomePageDesigns;
