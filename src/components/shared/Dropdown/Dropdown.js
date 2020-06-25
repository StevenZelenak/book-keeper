import React, { useState } from 'react';
import {
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

const Example = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Genre
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem value='genre1'>Action</DropdownItem>
        <DropdownItem value='genre2'>Adventure</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default Example;
