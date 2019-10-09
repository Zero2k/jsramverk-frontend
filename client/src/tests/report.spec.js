import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from 'enzyme';

import View from '../routes/Report/View';

configure({ adapter: new Adapter() });

const report = { title: 'title', text: 'text' };

describe('Report View', () => {
  it('should render correctly', () => {
    const component = shallow(<View report={report} />);
  
    expect(component).toMatchSnapshot();
  });

  it('should have a title', () => {
    const component = mount(
      <MemoryRouter>
        <View report={report} />
      </MemoryRouter>
    );
    
    const title = component.find('h2');

    expect(title.text()).toBe('title');
  });
});
