/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../client/src/components/App.jsx';
import Footer from '../client/src/components/Footer.jsx';


describe('App Unit Tests', () => {
  jest.mock('axios', () => {
    const tasks = [
      {
        id: '1000',
        name: 'Digital Feed Synthesizing Interface',
        product_url: 'http://norene.net',
        image_url: 'http://lorempixel.com/640/480/technics',
        is_prime: true,
        price: '278.00',
      },
    ];

    return {
      get: jest.fn(() => Promise.resolve(tasks)),
    };
  });

  test('should render the App Component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });

  test('should render Gallery Component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Gallery')).toHaveLength(1);
  });

  test('should invoke getAllProducts on componentDidMount', () => {
    const wrapper = shallow(<App />);
    const mock = jest.fn();
    wrapper.instance().getAllProducts = mock;
    wrapper.instance().forceUpdate();
    wrapper
      .instance()
      .componentDidMount();
    expect(mock).toHaveBeenCalled();
  });
});

describe('Unit Interaction Tests', () => {
  test('it should correctly update the state when resetCarouse is called', () => {
    const wrapper = mount(<App />);
    const mockSubmitHandler = () => {
      wrapper.setState({ feedbackVisible: true });
    };
    const header = shallow(
      <Footer
        feedbackVisible={false}
        toggleFeedback={mockSubmitHandler}
      />,
    );
    header.find('.feedbackButton').simulate('click');
    expect(wrapper.instance().state.feedbackVisible).toBe(true);
  });
});
