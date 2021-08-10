
import dateToString from '../../../helpers/dateToString';
import { Tags } from '../tag/Tags';

export const Post = ({post}) => {
return     <div className="articleWithTag">
  <div>
    {/*<Image*/}
    {/*  loader={sanityImageLoader}*/}
    {/*  src={image.asset.url}*/}
    {/*  alt=""*/}
    {/*  loading="lazy"*/}
    {/*  layout="fill"*/}
    {/*  objectFit="cover"*/}
    {/*  priority="true"*/}
    {/*/>*/}
    <img className="articleImg" alt="articlepost" src={post.imageUrl} />
  </div>
  <div className="articleElemMain">
    <div className="articleElem">
      <div className="elementCategory">{post._type}</div>
      <div className="elementCategoryRectangular"></div>
      <h4>{post.title}</h4>
      <p className="articleContent">{post.standfirst}</p>
      <p className="articleDate">{dateToString({ start: post.date.utc })}</p>
    </div>
  </div>
  <Tags tags={post.topics} />
</div>
}