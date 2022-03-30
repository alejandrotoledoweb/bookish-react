import BookDetail from './BookDetail';
import { render } from '@testing-library/react';
import toBeInTheDocument from '@testing-library/jest-dom';

describe('BookDetail', () => {
  it('renders title', () => {
    const props = {
      book: {
        name: 'Refactoring',
      },
    };

    const { container } = render(<BookDetail {...props} />);
    const title = container.querySelector('.book-title');
    expect(title.innerHTML).toEqual(props.book.name);
  });

  it('renders description', () => {
    const props = {
      book: {
        name: 'Refactoring',
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software",
      },
    };

    const { container } = render(<BookDetail {...props} />);
    const description = container.querySelector('.book-description');
    expect(description.innerHTML).toEqual(props.book.description);
  });

  it('displays the book name when no description was given', () => {
    const props = {
      book: {
        name: 'Refactoring',
      },
    };

    const { container } = render(<BookDetail {...props} />);
    const description = container.querySelector('p.book-description');
    expect(description.innerHTML).toEqual(props.book.name);
  });

  it('shows *more* when the description it too long', () => {
    const props = {
      book: {
        name: 'Refactoring',
        description:
          "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.",
      },
    };

    const { container } = render(<BookDetail {...props} />);
    const link = container.querySelector('.show-more');
    const title = container.querySelector('p.book-description');
    expect(link.innerHTML).toEqual('Show More');
    expect(title.innerHTML).toEqual(
      "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.Martin Fowler's Refact... "
    );
  });

  it('renders review form', () => {
    const props = {
      book: {
        name: 'Refactoring',
        description:
          'Martin Fowler’s Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.',
      },
    };

    const { container } = render(<BookDetail {...props} />);
    const form = container.querySelector('form');
    const nameInput = container.querySelector('input[name="name"]');
    const contentTextArea = container.querySelector('textarea[name="content"]');
    const submitButton = container.querySelector('button[name="submit"]');
    expect(form).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(contentTextArea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
