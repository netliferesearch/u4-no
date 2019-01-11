import React from 'react';
import moment from 'moment';
import BEMHelper from 'react-bem-helper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSearchSorting } from '../helpers/redux-store';
import { Link } from '../routes';
import buildUrl from '../helpers/buildUrl';
import itemTitle from '../helpers/itemTitle';
import itemTypeAsHeading from '../helpers/itemTypeAsHeading';

import { AuthorList, EditorList } from '../components/';

const classes = BEMHelper({
  name: 'search-results-v2',
  prefix: 'c-',
});

const toggleFilterMenu = () => {
  if (document) {
    document.querySelector('.c-filters').classList.toggle('c-filters--open');
    document.querySelector('html').classList.toggle('u-overflow-hidden');
  }
};

const SearchResultsV2 = (props) => {
  const { results = [], searchSorting = 'relevance', updateSearchSorting = () => {} } = props;
  return (
    <section {...classes()}>
      <div {...classes('topbar')}>
        <h3 {...classes('topbar-result')}>Results ({results.length})</h3>
        <button onClick={toggleFilterMenu} {...classes('topbar-filter')}>
          Filter search result
        </button>
        <div {...classes('topbar-sortby')}>
          <label>Sort by </label>
          <select
            value={searchSorting}
            onChange={e => updateSearchSorting(e.target.value)}
            {...classes('topbar-select')}
          >
            <option value="relevance">Relevance</option>
            <option value="year-desc">Year, new → old</option>
            <option value="year-asc">Year, old → new</option>
          </select>
        </div>
      </div>

      <ul {...classes('content')}>
        <li {...classes('items')}>
          <div {...classes('glossary')}>
            <span {...classes('items-type')}>
                Glossary
            </span>
            <br />
            <Link>
              <a {...classes('items-title')}>
                  Corruption
              </a>
            </Link>
            <br />
            <p>The abuse of entrusted power for private gain. Although this is the most common definition, other definitions exist. The World Bank, for example, defines corruption more narrowly as "abuse of public office for private gain". All expert/specialist variations nevertheless include three common elements: abuse (misuse, violation) of entrusted power (duty, office, etc.) and private benefit. In everyday language, the term is used more broadly to deonte a wide variety of objectionable or immoral acts, and not onlly those associate…</p>
            <a>Read more</a>
          </div>
        </li>

        <li {...classes('items')}>
          <div {...classes('topic')}>
            <span {...classes('items-type')}>
                  Topic
            </span>
            <span {...classes('items-date')}>
                  dato
            </span>
            <br />
            <Link>
              <a {...classes('items-title')}>
                    Public financial management
              </a>
            </Link>
            <br />
            <div {...classes('topic-wrapper')}>
              <div {...classes('topic-img')} >
                <img src="https://cdn.sanity.io/images/1f1lcoov/production/CDwR6nTXrees_Amh4L1anCN3erSxJfuqlhKN9-3500x2333.jpg?w=1120&fit=crop&crop=focalpoint" />
              </div>
              <div {...classes('topic-content')}>
                <p>Corruption affects all sides of public financial management. Revenues and tax collection, the budget process, public spending and procurement are at risk…</p>
                <a>Basic guide</a> <br />
                <a>Research and policy agenda</a>
              </div>
            </div>
          </div>
        </li>

        <li {...classes('items')}>
          <span {...classes('items-type')}>
                U4 Issue
          </span>
          <span {...classes('items-date')}>
                27.11.2018
          </span>
          <br />
          <Link>
            <a {...classes('items-title')}>
                  Public financial management
            </a>
          </Link>
          <br />
          <p>… especially as these apply to country level studies. Addressing these weaknesses must include recognition of <em>corruption’s</em> role in facilitating IFF generally. Donors should focus on promoting country studies of IFF and broader anti-<em>corruption</em> policies in order to have the greatest impact on curbing IFF.</p>
          <div {...classes('items-tab')}>International drivers of corruption</div>
        </li>

        <li {...classes('items')}>
          <span {...classes('items-type')}>
                U4 Issue
          </span>
          <span {...classes('items-date')}>
                04.06.2018
          </span>
          <br />
          <Link>
            <a {...classes('items-title')}>
                  The cognitive psychology of corruption
            </a>
          </Link>
          <br />
          <p>Traditional theories of <em>corruption</em> often make assumptions about motivations that may not necessarily be valid. We explored the power of an alternative theoretical paradigm to explain corrupt behaviour: cognitive psychology. We found evidence in the.. </p>
          <div {...classes('items-tab')}>Informal contexts</div>
          <div {...classes('items-tab')}>Anti-corruption basics</div>
        </li>

        <li {...classes('items')}>
          <span {...classes('items-type')}>
                Online courses
          </span>
          <span {...classes('items-date')}>
                dato
          </span>
          <br />
          <Link>
            <a {...classes('items-title')}>
                  Corruption in the justice sector
            </a>
          </Link>
          <br />
          <p>18 March – 5 April</p>
          <p>3 week, expert-led course. Learn how to integrate justice sector institutions in programming for judicial reform and rule of law. This course is for practitioners involved in the justice sector as well as general governance experts with a good understanding of the sector.</p>
        </li>

      </ul>


    </section>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  updateSearchSorting: bindActionCreators(updateSearchSorting, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultsV2);
