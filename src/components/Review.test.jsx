import Review from './Review';
import { render } from '@testing-library/react';

describe('Review', () => {
  it('renders', () => {
    const props = {
      review: {
        name: 'Juntao',
        date: '2018/06/21',
        content: 'Excellent work, really impressed by your efforts',
      },
    };
    const { container } = render(<Review {...props} />);
    const review = container.querySelector('.review');
    expect(review.querySelector('.name').innerHTML).toEqual('Juntao');
    expect(review.querySelector('.date').innerHTML).toEqual('2018/06/21');
    expect(review.querySelector('.content').innerHTML).toEqual(
      'Excellent work, really impressed by your efforts'
    );
  });
});
