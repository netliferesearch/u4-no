import React from 'react';

function hasScrollBar() {
  if (document) {
    document.querySelector('.scrollable').classList.toggle('has-scroll');
  }
}

const Table = () => (
  <div>
    <div onClick={hasScrollBar} id="scrollable1" className="scrollable">
      <div>
        <table>
          <tr>
            <th>&nbsp;</th>
            <th>Knocky</th>
            <th>Flor</th>
            <th>Ella</th>
            <th>Juan</th>
          </tr>
          <tr>
            <td>Breed</td>
            <td>Jack Russell</td>
            <td>Poodle</td>
            <td>Streetdog</td>
            <td>Cocker Spaniel</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>16</td>
            <td>9</td>
            <td>10</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Owner</td>
            <td>Mother-in-law</td>
            <td>Me</td>
            <td>Me</td>
            <td>Sister-in-law</td>
          </tr>
          <tr>
            <td>Eating Habits</td>
            <td>Eats everyone's leftovers</td>
            <td>Nibbles at food</td>
            <td>Hearty eater</td>
            <td>Will eat till he explodes</td>
          </tr>
        </table>
      </div>
    </div>
    <br />

    <div className="scrollable">
      <div>
        <table>
          <caption>Data table 1</caption>
          <thead>
            <tr>
              <th scope="col">Column header 1</th>
              <th scope="col">Column header 2</th>
              <th scope="col">Column header 3</th>
              <th scope="col">Column header 4</th>
              <th scope="col">Column header 5</th>
              <th scope="col">Column header 6</th>
              <th scope="col">Column header 7</th>
              <th scope="col">Column header 8</th>
              <th scope="col">Column header 9</th>
              <th scope="col">Column header 10</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
            </tr>
            <tr>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
            </tr>
            <tr>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
            </tr>
            <tr>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
            </tr>
            <tr>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
            </tr>
            <tr>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
            </tr>
            <tr>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
            </tr>
            <tr>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
            </tr>
            <tr>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
            </tr>
            <tr>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
            </tr>
            <tr>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
              <td>Table data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br />
    <div className="scrollable">
      <div>
        <table>
          <caption>A summary of the UK's most famous punk bands</caption>
          <thead>
            <tr>
              <th scope="col">Band</th>
              <th scope="col">Year formed</th>
              <th scope="col">No. of Albums</th>
              <th scope="col">Most famous song</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Buzzcocks</th>
              <td>1976</td>
              <td>9</td>
              <td>Ever fallen in love (with someone you shouldn't've)</td>
            </tr>
            <tr>
              <th scope="row">The Clash</th>
              <td>1976</td>
              <td>6</td>
              <td>London Calling</td>
            </tr>
            <tr>
              <th scope="row">The Damned</th>
              <td>1976</td>
              <td>10</td>
              <td>Smash it up</td>
            </tr>
            <tr>
              <th scope="row">Sex Pistols</th>
              <td>1975</td>
              <td>1</td>
              <td>Anarchy in the UK</td>
            </tr>
            <tr>
              <th scope="row">Sham 69</th>
              <td>1976</td>
              <td>13</td>
              <td>If The Kids Are United</td>
            </tr>
            <tr>
              <th scope="row">Siouxsie and the Banshees</th>
              <td>1976</td>
              <td>11</td>
              <td>Hong Kong Garden</td>
            </tr>
            <tr>
              <th scope="row">Stiff Little Fingers</th>
              <td>1977</td>
              <td>10</td>
              <td>Suspect Device</td>
            </tr>
            <tr>
              <th scope="row">The Stranglers</th>
              <td>1974</td>
              <td>17</td>
              <td>No More Heroes</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan="2">Total albums</th>
              <td colSpan="2">77</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
);

export default Table;
