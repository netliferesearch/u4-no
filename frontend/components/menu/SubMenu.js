import React from 'react';
import { SubMenuItem } from './SubMenuItem';
import { menuItems } from './menuItems';
import { SubMenuSection } from './SubMenuSection';

export const SubMenu = ({ activeItem = '', activeItemData = {} }) => {
  const item = menuItems.find(i => i.id === activeItem);
  const firstCol = menuItems[0].items.slice(0, 9);
  const secondCol = menuItems[0].items.slice(9, 18);
  const thirdCol = menuItems[0].items.slice(18);
  return (
    <div className="c-sub-menu__backdrop">
      <div className="c-sub-menu__content o-wrapper-medium">
        <h4 className="c-sub-menu__intro u-primary-heading--white">{item.headline}</h4>
        <div className="c-sub-menu__sections">
          {activeItem === 'topics' ? (
            <>
              <ul className="c-menu__list">
                {firstCol.map(topic => (
                  <SubMenuItem
                    key={topic._id}
                    label={topic.title}
                    slug={`/topics/${topic.slug.current}`}
                  />
                ))}
              </ul>
              <ul className="c-menu__list">
                {secondCol.map(topic => (
                  <SubMenuItem
                    key={topic._id}
                    label={topic.title}
                    slug={`/topics/${topic.slug.current}`}
                  />
                ))}
              </ul>
              <ul className="c-menu__list">
                {thirdCol.map(topic => (
                  <SubMenuItem
                    key={topic._id}
                    label={topic.title}
                    slug={`/topics/${topic.slug.current}`}
                  />
                ))}
              </ul>
            </>
          ) : null}
          {activeItem !== 'topics' && activeItemData && activeItemData.sections
            ? activeItemData.sections.map((s, index) => <SubMenuSection key={index} section={s} />)
            : null}
        </div>
      </div>
    </div>
  );
};
