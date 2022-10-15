import './footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='fLists'>
        <ul className='fList'>
          <li className='fListItem'>
            <a href='./maps'>Restaurant Locations</a>
          </li>
          <li className='fListItem'>Dinner</li>
          <li className='fListItem'>Breakfast</li>
          <li className='fListItem'>Snaks</li>
          <li className='fListItem'>Beverages</li>
          <li className='fListItem'>Shorteats</li>
        </ul>
        <ul className='fList'>
          <li className='fListItem'>Home Made </li>
          <li className='fListItem'>Resturants </li>
          <li className='fListItem'>Hotels </li>
          <li className='fListItem'>Bakery</li>
          <li className='fListItem'>Small Shops</li>
          <li className='fListItem'>Guest houses</li>
        </ul>
        <ul className='fList'>
          <li className='fListItem'>Unique places to stay </li>
          <li className='fListItem'>Reviews</li>
          <li className='fListItem'>Unpacked: Travel articles </li>
          <li className='fListItem'>Travel communities </li>
          <li className='fListItem'>Seasonal and holiday deals </li>
        </ul>
        <ul className='fList'>
          <li className='fListItem'>Car rental </li>
          <li className='fListItem'>Flight Finder</li>
          <li className='fListItem'>Restaurant reservations </li>
          <li className='fListItem'>Travel Agents </li>
        </ul>
        <ul className='fList'>
          <li className='fListItem'>Curtomer Service</li>
          <li className='fListItem'>Partner Help</li>
          <li className='fListItem'>Careers</li>
          <li className='fListItem'>Sustainability</li>
          <li className='fListItem'>Press center</li>
          <li className='fListItem'>Safety Resource Center</li>
          <li className='fListItem'>Investor relations</li>
          <li className='fListItem'>Terms & conditions</li>
        </ul>
      </div>
      <div className='fText'>
        Copyright © 2022 Taste<b>Buds</b>.
      </div>
    </div>
  );
};

export default Footer;
